'use server';

import { getPersonalizedFundOptions } from '@/ai/flows/personalized-fund-options';
import { z } from 'zod';

const ageSchema = z.object({
  age: z.coerce.number().min(18, 'You must be at least 18 years old to get suggestions.').max(100, 'Age must be 100 or less.'),
});

type FormState = {
    error: string | null;
    data: Awaited<ReturnType<typeof getPersonalizedFundOptions>>['fundOptions'] | null;
}

export async function getFundsAction(prevState: FormState, formData: FormData): Promise<FormState> {
  const validatedFields = ageSchema.safeParse({
    age: formData.get('age'),
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors.age?.[0] || 'Invalid age provided.',
      data: null,
    };
  }

  try {
    const result = await getPersonalizedFundOptions({ age: validatedFields.data.age });
    if (!result || !result.fundOptions || result.fundOptions.length === 0) {
        return { error: 'Could not generate fund options at this time. Please try again later.', data: null };
    }
    return { error: null, data: result.fundOptions };
  } catch (error) {
    console.error("AI Flow Error:", error);
    return { error: 'An unexpected error occurred while fetching suggestions. Please try again.', data: null };
  }
}
