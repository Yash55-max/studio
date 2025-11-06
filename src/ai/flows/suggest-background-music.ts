'use server';

/**
 * @fileOverview AI flow for suggesting background music for uploaded images.
 *
 * - suggestBackgroundMusic - A function that suggests background music for an image.
 * - SuggestBackgroundMusicInput - The input type for the suggestBackgroundMusic function.
 * - SuggestBackgroundMusicOutput - The return type for the suggestBackgroundMusic function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestBackgroundMusicInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo to analyze, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  description: z.string().optional().describe('Optional description of the image.'),
});
export type SuggestBackgroundMusicInput = z.infer<typeof SuggestBackgroundMusicInputSchema>;

const SuggestBackgroundMusicOutputSchema = z.object({
  musicSuggestion: z.string().describe('A suggestion for background music suitable for the image.'),
});
export type SuggestBackgroundMusicOutput = z.infer<typeof SuggestBackgroundMusicOutputSchema>;

export async function suggestBackgroundMusic(input: SuggestBackgroundMusicInput): Promise<SuggestBackgroundMusicOutput> {
  return suggestBackgroundMusicFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestBackgroundMusicPrompt',
  input: {schema: SuggestBackgroundMusicInputSchema},
  output: {schema: SuggestBackgroundMusicOutputSchema},
  prompt: `You are an AI assistant that suggests background music for images.

  Based on the image (and the optional description), suggest ONE suitable background music. Just provide the music suggestion. The music suggestion should be a descriptive sentence, rather than a music title.

  {% if description %}
  Description: {{{description}}}
  {% endif %}

  Image: {{media url=photoDataUri}}
  `,
});

const suggestBackgroundMusicFlow = ai.defineFlow(
  {
    name: 'suggestBackgroundMusicFlow',
    inputSchema: SuggestBackgroundMusicInputSchema,
    outputSchema: SuggestBackgroundMusicOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
