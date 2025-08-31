'use server';

import { z } from 'zod';

const suggestionSchema = z.object({
  age: z.coerce.number().min(18, 'You must be at least 18 years old.').max(100, 'Age must be 100 or less.'),
  riskProfile: z.enum(['conservative', 'moderate', 'aggressive'], {
    errorMap: () => ({ message: 'Please select a valid risk profile.' }),
  }),
  financialGoal: z.enum(['wealth_creation', 'child_education', 'retirement_planning'], {
    errorMap: () => ({ message: 'Please select a valid financial goal.' }),
  }),
});

const fundOptions = [
    {
      name: 'Parag Parikh Flexi Cap Fund',
      description: 'A diversified equity fund that invests in a mix of Indian and foreign stocks, suitable for long-term growth.',
      suitability: 'Ideal for investors with a long-term horizon and moderate to high risk tolerance, offering geographical diversification.',
    },
    {
      name: 'UTI Nifty 50 Index Fund',
      description: 'An index fund that tracks the Nifty 50 index, offering exposure to India\'s top 50 companies.',
      suitability: 'A great starting point for new investors, providing market-equivalent returns with low costs.',
    },
    {
      name: 'Mirae Asset Large Cap Fund',
      description: 'Focuses on established, large-cap companies with a track record of stable growth and performance.',
      suitability: 'Suitable for conservative equity investors looking for stability and steady returns from blue-chip companies.',
    },
];

const fundOptions2 = [
    {
        name: 'Kotak Small Cap Fund',
        description: 'Invests in small-cap companies with high growth potential, aiming for significant capital appreciation.',
        suitability: 'Best for aggressive investors with a long investment horizon who can tolerate higher market volatility for potentially higher returns.',
    },
    {
        name: 'ICICI Prudential Bluechip Fund',
        description: 'A large-cap fund that invests in top-rated companies, focusing on long-term capital growth and stability.',
        suitability: 'A core portfolio holding for investors seeking reliable growth from India\'s leading businesses.',
    },
    {
        name: 'Axis Midcap Fund',
        description: 'Invests in mid-cap stocks, balancing the growth potential of small caps and the stability of large caps.',
        suitability: 'Perfect for investors wanting to capture the growth of emerging companies with a moderate risk profile.',
    },
];

const fundOptions3 = [
    {
        name: 'HDFC Balanced Advantage Fund',
        description: 'A dynamic asset allocation fund that shifts between equity and debt based on market conditions to balance risk and return.',
        suitability: 'Excellent for investors nearing retirement or those with a lower risk appetite, providing growth with a cushion against market downturns.',
    },
    {
        name: 'SBI Bluechip Fund',
        description: 'A large-cap equity fund investing in a portfolio of blue-chip Indian companies for long-term growth.',
        suitability: 'Ideal for investors looking for steady, long-term capital appreciation with a focus on market leaders.',
      },
    {
        name: 'DSP Tax Saver Fund',
        description: 'An Equity Linked Savings Scheme (ELSS) that offers tax benefits under Section 80C along with equity growth.',
        suitability: 'A smart choice for salaried individuals looking to save on taxes while investing for long-term wealth creation.',
    },
];


type FundOption = {
    name: string;
    description: string;
    suitability: string;
};

type FormState = {
  error: string | null;
  data: FundOption[] | null;
}

const getHardcodedFunds = (age: number, riskProfile: string, financialGoal: string): FundOption[] => {
    // This is a simple example. A real implementation would have more complex logic.
    if (riskProfile === 'aggressive' || financialGoal === 'wealth_creation') {
        return fundOptions2;
    } else if (age > 40 || riskProfile === 'conservative' || financialGoal === 'retirement_planning') {
        return fundOptions3;
    } else {
        return fundOptions;
    }
}

export async function getFundsAction(prevState: FormState, formData: FormData): Promise<FormState> {
  const validatedFields = suggestionSchema.safeParse({
    age: formData.get('age'),
    riskProfile: formData.get('riskProfile'),
    financialGoal: formData.get('financialGoal'),
  });

  if (!validatedFields.success) {
    const fieldErrors = validatedFields.error.flatten().fieldErrors;
    const errorMessage = Object.values(fieldErrors).flat()[0] || 'Invalid data provided.';
    return {
      error: errorMessage,
      data: null,
    };
  }

  try {
    const { age, riskProfile, financialGoal } = validatedFields.data;
    const result = getHardcodedFunds(age, riskProfile, financialGoal);

    if (!result || result.length === 0) {
        return { error: 'Could not generate fund options at this time. Please try again later.', data: null };
    }
    return { error: null, data: result };
  } catch (error) {
    console.error("Fund selection error:", error);
    return { error: 'An unexpected error occurred while fetching suggestions. Please try again.', data: null };
  }
}
