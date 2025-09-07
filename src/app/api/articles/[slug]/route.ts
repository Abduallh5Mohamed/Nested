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
  // Use direct API key as fallback if env var not available
  const apiKey = process.env.GEMINI_API_KEY || 'AIzaSyAYUegFJOJwTYMxZMTzYs6fBX2JzMgoH0g';
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'Server missing GEMINI_API_KEY' }), { status: 500 });
  }
  try {
    const prompt = `Create a tech article for "${slug}". Respond with ONLY this exact JSON format (no additional text):
{"title":"Article Title Here","slug":"${slug}","description":"Brief description here","content":"# Article Title\\n\\nParagraph 1 content here.\\n\\n## Section 1\\n\\nParagraph 2 content here.\\n\\n## Section 2\\n\\nParagraph 3 content here.\\n\\n## Conclusion\\n\\nConclusion paragraph here.","author":"Abduallh","date":"September 7, 2025","imageTopic":"tech"}`;
    
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [ { parts: [ { text: prompt } ] } ],
        generationConfig: { 
          temperature: 0.3,
          maxOutputTokens: 1024,
          topP: 0.8,
          topK: 10
        }
      })
    });
    
    if (!res.ok) {
      // Fallback to static article if API fails
      const fallbackArticle = {
        title: slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        slug,
        description: `A comprehensive guide to ${slug.replace(/-/g, ' ')}.`,
        content: `# ${slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}

This article explores the latest developments in ${slug.replace(/-/g, ' ')}.

## Introduction
Technology is constantly evolving, and ${slug.replace(/-/g, ' ')} represents one of the most exciting areas of innovation.

## Key Benefits
- Enhanced performance and reliability
- Improved user experience
- Scalable architecture solutions

## Implementation
At Nested, we specialize in implementing cutting-edge solutions that leverage the power of modern technology.

## Conclusion
${slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} continues to shape the future of digital innovation.`,
        author: 'Nested Team',
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        imageTopic: 'technology'
      };
      return new Response(JSON.stringify({ article: fallbackArticle }), {
        status: 200,
        headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }
      });
    }
    const data = await res.json();
    const raw = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    const cleaned = cleanJSON(raw);
    
    if (!cleaned) {
      // Fallback if no valid response
      const fallbackArticle = {
        title: slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        slug,
        description: `A comprehensive guide to ${slug.replace(/-/g, ' ')}.`,
        content: `# ${slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}

This article explores ${slug.replace(/-/g, ' ')} and its impact on modern technology.

## Overview
Technology continues to evolve rapidly, and understanding ${slug.replace(/-/g, ' ')} is crucial for development teams.

## Key Features
- Modern architecture design
- Performance optimization
- User experience enhancement

## Conclusion
At Nested, we deliver innovative solutions in ${slug.replace(/-/g, ' ')}.`,
        author: 'Nested Team',
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        imageTopic: 'innovation'
      };
      return new Response(JSON.stringify({ article: fallbackArticle }), {
        status: 200,
        headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }
      });
    }
    
    let parsed: any;
    try {
      parsed = JSON.parse(cleaned);
    } catch (e) {
      // Fallback if JSON parsing fails
      const fallbackArticle = {
        title: slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        slug,
        description: `Insights about ${slug.replace(/-/g, ' ')}.`,
        content: `# ${slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}

An AI-generated article about ${slug.replace(/-/g, ' ')}.

## Introduction
This topic represents an important aspect of modern technology development.

## Analysis
Understanding the principles and applications helps in making informed decisions.

## Conclusion
Continuous learning and adaptation are key to success.`,
        author: 'AI Assistant',
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        imageTopic: 'tech'
      };
      return new Response(JSON.stringify({ article: fallbackArticle }), {
        status: 200,
        headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }
      });
    }
    if (!validateArticle(parsed)) {
      // Fallback if article validation fails
      const fallbackArticle = {
        title: slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) + ' - Tech Guide',
        slug,
        description: `A complete guide to ${slug.replace(/-/g, ' ')}.`,
        content: `# ${slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}

Welcome to this comprehensive guide about ${slug.replace(/-/g, ' ')}.

## Getting Started
This section covers the fundamentals and basic concepts.

## Advanced Topics
Explore more complex scenarios and best practices.

## Real-world Applications
See how these concepts apply in practical situations.

## Next Steps
Continue your learning journey with additional resources.`,
        author: 'Baraa',
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        imageTopic: 'guide'
      };
      return new Response(JSON.stringify({ article: fallbackArticle }), {
        status: 200,
        headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }
      });
    }
    // Ensure slug consistency
    parsed.slug = slug;
    return new Response(JSON.stringify({ article: parsed }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }
    });
  } catch (error: any) {
    // Always return a fallback article instead of error
    const fallbackArticle = {
      title: slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) + ' - Innovation',
      slug,
      description: `Innovative approaches to ${slug.replace(/-/g, ' ')}.`,
      content: `# ${slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}

Innovation drives progress in ${slug.replace(/-/g, ' ')}.

## Current Landscape
The field continues to evolve with new technologies and methodologies.

## Opportunities
There are numerous opportunities for growth and development.

## Future Outlook
The future looks promising with continued advancement.

## Conclusion
Stay updated with the latest trends and developments.`,
      author: 'Abduallh',
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      imageTopic: 'future'
    };
    return new Response(JSON.stringify({ article: fallbackArticle }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }
    });
  }
}
