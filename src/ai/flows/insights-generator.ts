'use server';
/**
 * @fileOverview An AI-powered insights and articles generator for Nested.
 *
 * - generateInsights - A function that generates recent tech articles.
 * - InsightArticle - The type for a single article.
 * - GenerateInsightsOutput - The return type for the generateInsights function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const InsightArticleSchema = z.object({
    title: z.string().describe("The catchy and informative title of the blog post."),
    slug: z.string().describe("A URL-friendly slug for the article title (e.g., 'the-future-of-web-apps')."),
    description: z.string().describe("A brief, one-sentence summary of the article's content."),
    content: z.string().describe("The full content of the article in Markdown format. Should be between 3 to 5 paragraphs long."),
    author: z.string().describe("The name of the author of the article. It should be either 'Abduallh' or 'Baraa'."),
    date: z.string().describe("The publication date of the article, in 'Month Day, Year' format (e.g., 'July 15, 2024')."),
    imageTopic: z.string().describe("A one or two-word topic for a relevant background image (e.g., 'mobile app', 'web design', 'app interface').")
});
export type InsightArticle = z.infer<typeof InsightArticleSchema>;


const GenerateInsightsOutputSchema = z.object({
  articles: z.array(InsightArticleSchema).length(3).describe("An array of exactly 3 tech articles."),
});
export type GenerateInsightsOutput = z.infer<typeof GenerateInsightsOutputSchema>;

export async function generateInsights(): Promise<GenerateInsightsOutput> {
  return generateInsightsFlow();
}

const prompt = ai.definePrompt({
  name: 'generateInsightsPrompt',
  output: {schema: GenerateInsightsOutputSchema},
  prompt: `You are a tech content strategist for Nested, a software development company specializing in web and mobile applications.

Your task is to generate a list of 3 recent and engaging blog posts. These articles must highlight the importance and success of web and mobile applications to showcase Nested's expertise to potential clients.

Focus on topics like:
1.  Case studies of successful web or mobile apps that transformed a business.
2.  The latest trends in web/mobile development that are driving success (e.g., PWAs, native vs. cross-platform).
3.  The critical role of UI/UX in the success of modern web and mobile applications.

For each article, provide:
- A catchy title.
- A URL-friendly slug for the title.
- A concise one-sentence description.
- The full article content in Markdown format (3-5 paragraphs).
- The author name, which should be one of 'Abduallh' or 'Baraa'. You should alternate between them.
- A recent date.
- A simple two-word topic for an accompanying image that is directly related to the article's content. For example, if the article is about a retail mobile app, the image topic could be 'retail app'. If it's about UI/UX design, it could be 'app interface'.`,
});

const generateInsightsFlow = ai.defineFlow(
  {
    name: 'generateInsightsFlow',
    outputSchema: GenerateInsightsOutputSchema,
  },
  async () => {
    const {output} = await prompt();
    return output!;
  }
);
