'use server';

/**
 * @fileOverview An AI agent that suggests personalized mutual fund options based on user's age.
 *
 * - getPersonalizedFundOptions - A function that handles the fund option suggestion process.
 * - PersonalizedFundOptionsInput - The input type for the getPersonalizedFundOptions function.
 * - PersonalizedFundOptionsOutput - The return type for the getPersonalizedFundOptions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedFundOptionsInputSchema = z.object({
  age: z
    .number()
    .describe('The age of the user.')
    .min(18, 'Age must be at least 18.')
    .max(100, 'Age must be no more than 100.'),
});
export type PersonalizedFundOptionsInput = z.infer<
  typeof PersonalizedFundOptionsInputSchema
>;

const PersonalizedFundOptionsOutputSchema = z.object({
  fundOptions: z.array(
    z.object({
      name: z.string().describe('The name of the mutual fund.'),
      description: z.string().describe('A brief description of the fund.'),
      suitability: z
        .string()
        .describe('Why this fund is suitable for the user.'),
    })
  ),
});
export type PersonalizedFundOptionsOutput = z.infer<
  typeof PersonalizedFundOptionsOutputSchema
>;

export async function getPersonalizedFundOptions(
  input: PersonalizedFundOptionsInput
): Promise<PersonalizedFundOptionsOutput> {
  return personalizedFundOptionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedFundOptionsPrompt',
  input: {schema: PersonalizedFundOptionsInputSchema},
  output: {schema: PersonalizedFundOptionsOutputSchema},
  prompt: `You are a financial advisor specializing in mutual fund recommendations.

  Based on the user's age, provide a curated list of mutual fund options.

  The first option should be the most recommended and fully visible.
  Subsequent options should be slightly blurred to encourage users to contact Wealth Rakshak for more details.

  Consider the following:
  - Investment horizon based on age.
  - Risk tolerance typically associated with different age groups.

  User's Age: {{{age}}}
  Instructions: Provide an array of 3 mutual fund options, with name, description and suitability for the user.
  `,
});

const personalizedFundOptionsFlow = ai.defineFlow(
  {
    name: 'personalizedFundOptionsFlow',
    inputSchema: PersonalizedFundOptionsInputSchema,
    outputSchema: PersonalizedFundOptionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
