'use server';

import { addRowToSheet } from '@/services/google-sheets';
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

const contactSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters.'),
    email: z.string().email('Please enter a valid email address.'),
    phone: z.string().min(10, 'Please enter a valid phone number.'),
});

type FundOption = {
    name: string;
    description: string;
    suitability: string;
};

// Based on the provided image matrix

const funds_18_40_wealth = {
    conservative: {
        name: 'HDFC Nifty 50 Index Fund',
        description: 'An index fund that mirrors the Nifty 50, offering broad market exposure with minimal costs.',
        suitability: 'Ideal for conservative investors starting their wealth creation journey with a stable, diversified base.'
    },
    moderate: {
        name: 'Parag Parikh Flexi Cap Fund',
        description: 'A diversified equity fund investing in a mix of Indian and foreign stocks.',
        suitability: 'Perfect for moderate-risk investors seeking long-term growth and geographical diversification.'
    },
    aggressive: {
        name: 'Nippon India Small Cap Fund',
        description: 'Focuses on small-cap companies with high growth potential, aiming for significant capital appreciation.',
        suitability: 'Best for aggressive investors with a long-term view, willing to take on higher risk for potentially higher returns.'
    }
};

const funds_18_40_education = {
    conservative: {
        name: 'ICICI Pru Large & Mid Cap Fund',
        description: 'A fund that balances stability and growth by investing in both large and mid-sized companies.',
        suitability: 'Suitable for conservative investors planning for a long-term goal like child education, balancing risk and return.'
    },
    moderate: {
        name: 'Parag Parikh Flexi Cap Fund',
        description: 'A diversified equity fund investing in a mix of Indian and foreign stocks.',
        suitability: 'Its diversified nature and long-term growth potential make it a solid choice for funding education.'
    },
    aggressive: {
        name: 'Edelweiss Mid Cap Fund',
        description: 'Invests in emerging mid-cap companies poised for strong growth.',
        suitability: 'An aggressive choice for parents with a longer time horizon until their child\'s education needs arise.'
    }
};

const funds_18_40_retirement = {
    conservative: {
        name: 'Nippon India Multi Cap Fund',
        description: 'Invests across large, mid, and small-cap stocks, providing a diversified portfolio in a single fund.',
        suitability: 'A conservative way to approach long-term retirement planning, capturing growth across market segments.'
    },
    moderate: {
        name: 'Parag Parikh Flexi Cap Fund',
        description: 'A diversified equity fund investing in a mix of Indian and foreign stocks.',
        suitability: 'Excellent for long-term goals like retirement, offering growth and international exposure.'
    },
    aggressive: {
        name: 'HDFC Flexi Cap Fund',
        description: 'A fund that dynamically invests across market caps to capture opportunities wherever they arise.',
        suitability: 'For aggressive investors aiming to build a substantial retirement corpus over a long period.'
    }
};

const funds_40_plus_wealth = {
    conservative: {
        name: 'HDFC Nifty 50 Index Fund',
        description: 'An index fund that mirrors the Nifty 50, offering broad market exposure with minimal costs.',
        suitability: 'Provides stable, market-linked returns, forming a solid foundation for wealth creation at any age.'
    },
    moderate: {
        name: 'Nippon India Multi Cap Fund',
        description: 'Invests across large, mid, and small-cap stocks, providing a diversified portfolio.',
        suitability: 'A balanced approach to capture growth across the market spectrum, suitable for moderate risk profiles.'
    },
    aggressive: {
        name: 'Quant Flexi Cap Fund',
        description: 'Known for its dynamic and aggressive investment style, this fund aims to maximize returns by actively managing its portfolio.',
        suitability: 'For seasoned, aggressive investors looking to accelerate wealth creation.'
    }
};

const funds_40_plus_education = {
    conservative: {
        name: 'HDFC Balanced Advantage Fund',
        description: 'A hybrid fund that adjusts its equity-debt allocation based on market conditions to manage risk.',
        suitability: 'Ideal for investors nearing a financial goal, offering growth with a protective cushion against volatility.'
    },
    moderate: {
        name: 'ICICI Pru Multi Asset Allocation Fund',
        description: 'Invests in a mix of asset classes like equity, debt, and gold for diversification.',
        suitability: 'Reduces dependency on a single asset class, making it a robust choice for medium-term goals.'
    },
    aggressive: {
        name: 'Nippon India Multi Cap Fund',
        description: 'Invests across large, mid, and small-cap stocks, providing a diversified portfolio.',
        suitability: 'A growth-oriented but diversified option for those who still have a reasonable time frame for their child\'s education.'
    }
};

const funds_40_plus_retirement = {
    conservative: {
        name: 'HDFC Balanced Advantage Fund',
        description: 'A hybrid fund that adjusts its equity-debt allocation based on market conditions to manage risk.',
        suitability: 'Excellent for those closer to retirement, aiming to protect capital while still generating moderate growth.'
    },
    moderate: {
        name: 'ICICI Pru Multi Asset Allocation Fund',
        description: 'Invests in a mix of asset classes like equity, debt, and gold for diversification.',
        suitability: 'Offers a balanced risk-return profile, crucial for building a stable retirement corpus.'
    },
    aggressive: {
        name: 'Nippon India Multi Cap Fund',
        description: 'Invests across large, mid, and small-cap stocks, providing a diversified portfolio.',
        suitability: 'For investors over 40 who still have a longer working tenure and can tolerate higher risk for better returns.'
    }
};


type FundFormState = {
  error: string | null;
  data: FundOption[] | null;
}

type ContactFormState = {
    error: string | null;
    data: { name: string; email: string; phone: string; } | null;
    success: boolean;
}

const getHardcodedFunds = (age: number, riskProfile: string, financialGoal: string): FundOption[] => {
    const is_under_40 = age <= 40;
    
    let selectedFunds: { conservative: FundOption; moderate: FundOption; aggressive: FundOption; };

    if (is_under_40) {
        if (financialGoal === 'wealth_creation') {
            selectedFunds = funds_18_40_wealth;
        } else if (financialGoal === 'child_education') {
            selectedFunds = funds_18_40_education;
        } else { // retirement_planning
            selectedFunds = funds_18_40_retirement;
        }
    } else { // age 40+
        if (financialGoal === 'wealth_creation') {
            selectedFunds = funds_40_plus_wealth;
        } else if (financialGoal === 'child_education') {
            selectedFunds = funds_40_plus_education;
        } else { // retirement_planning
            selectedFunds = funds_40_plus_retirement;
        }
    }
    
    const result = [selectedFunds.conservative, selectedFunds.moderate, selectedFunds.aggressive];
    
    // The user selected risk profile should be the first suggestion
    if (riskProfile === 'moderate') {
        [result[0], result[1]] = [result[1], result[0]];
    } else if (riskProfile === 'aggressive') {
        [result[0], result[2]] = [result[2], result[0]];
    }

    return result;
}

export async function getFundsAction(prevState: FundFormState, formData: FormData): Promise<FundFormState> {
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


export async function saveContactAction(prevState: ContactFormState, formData: FormData): Promise<ContactFormState> {
    const validatedFields = contactSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
    });

    if (!validatedFields.success) {
        const fieldErrors = validatedFields.error.flatten().fieldErrors;
        const errorMessage = Object.values(fieldErrors).flat()[0] || 'Invalid data provided.';
        return {
            error: errorMessage,
            data: null,
            success: false,
        };
    }

    try {
        const { name, email, phone } = validatedFields.data;
        
        await addRowToSheet({
            Name: name,
            Email: email,
            Phone: phone
        });
        
        return { error: null, data: validatedFields.data, success: true };
    } catch (error) {
        console.error("Contact form submission error:", error);
        return { error: 'An unexpected error occurred. Please try again.', data: null, success: false };
    }
}
