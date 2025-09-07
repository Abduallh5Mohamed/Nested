import { NextRequest } from 'next/server';

// Avoid caching because content is generated dynamically
export const dynamic = 'force-dynamic';
export const revalidate = 0;

type InsightArticle = {
  title: string;
  slug: string;
  description: string;
  content: string;
  author: string;
  date: string;
  imageTopic: string;
};

function cleanJSON(raw: string): string | null {
  if (!raw) return null;
  // Remove Markdown code fences if model wrapped JSON
  let text = raw.trim();
  if (text.startsWith('```')) {
    // remove first line and last fence
    text = text.replace(/^```[a-zA-Z]*\n/, '').replace(/```$/, '').trim();
  }
  // Sometimes model prepends or appends commentary; try to extract JSON block
  const firstBrace = text.indexOf('{');
  const lastBrace = text.lastIndexOf('}');
  if (firstBrace !== -1 && lastBrace !== -1) {
    text = text.substring(firstBrace, lastBrace + 1);
  }
  return text;
}

function validateArticle(obj: any): obj is InsightArticle {
  return obj && typeof obj === 'object' &&
    ['title','slug','description','content','author','date','imageTopic'].every(k => typeof obj[k] === 'string');
}

export async function GET(_req: NextRequest, { params }: { params: { slug: string } }) {
  return await handle(params.slug);
}

export async function POST(req: NextRequest, { params }: { params: { slug: string } }) {
  const body = await req.json().catch(() => ({}));
  const slug = body.slug || params.slug;
  return await handle(slug);
}

async function handle(slug: string) {
  if (!slug) {
    return new Response(JSON.stringify({ error: 'Missing slug' }), { status: 400 });
  }
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'Server missing GEMINI_API_KEY' }), { status: 500 });
  }
  try {
    const prompt = `Generate ONE tech insight article for slug: ${slug}. Return ONLY strict minified JSON object keys: title, slug, description, content (markdown 3-5 paragraphs), author (Abduallh or Baraa), date (Month Day, Year), imageTopic (1-2 words). No commentary.`;
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [ { parts: [ { text: prompt } ] } ],
        generationConfig: { temperature: 0.7 }
      })
    });
    if (!res.ok) {
      const text = await res.text();
      return new Response(JSON.stringify({ error: 'Gemini API error', details: text }), { status: 502 });
    }
    const data = await res.json();
    const raw = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    const cleaned = cleanJSON(raw);
    if (!cleaned) {
      return new Response(JSON.stringify({ error: 'Empty model response' }), { status: 500 });
    }
    let parsed: any;
    try {
      parsed = JSON.parse(cleaned);
    } catch (e) {
      return new Response(JSON.stringify({ error: 'JSON parse failed', raw }), { status: 500 });
    }
    if (!validateArticle(parsed)) {
      return new Response(JSON.stringify({ error: 'Invalid article shape', parsed }), { status: 500 });
    }
    // Ensure slug consistency
    parsed.slug = slug;
    return new Response(JSON.stringify({ article: parsed }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: 'Unhandled server error', message: error?.message }), { status: 500 });
  }
}
