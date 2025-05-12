
# Globex Rate bridge - Currency Converter WPA

A modern currency converter web application built with React, TypeScript, and Tailwind CSS, with Supabase as the backend service.

## Project Overview

Globex Currency Converter is a responsive web application that allows users to convert between different currencies with real-time exchange rates. The application features a clean and intuitive user interface, live rate updates, and historical exchange rate data visualization.

## Tech Stack

- **Frontend**:
  - React 18.3+
  - TypeScript
  - Tailwind CSS
  - shadcn/ui components
  - Recharts for data visualization
  - React Router for navigation
  - TanStack Query for data fetching

- **Backend/Services**:
  - Supabase for database, authentication, and backend functionality
  - Supabase PostgreSQL database for storing currency rates and conversion history

## Features

- Real-time currency conversion between 20+ major global currencies
- Interactive currency swap functionality
- Historical exchange rate visualization
- Live rate updates for popular currency pairs
- Responsive design for all device sizes
- Comprehensive market analysis and reports
- Global currency coverage

## Developer Setup Guide

### Prerequisites

- Node.js (v18+)
- npm/yarn/bun
- Supabase account

### Installation

1. Clone the repository:
   ```bash
  Download Project
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   bun install
   ```

3. Create a Supabase project from the [Supabase Dashboard](https://app.supabase.com)

4. Set up the database schema and functions (instructions below)

5. Update the Supabase URL and key in `src/integrations/supabase/client.ts`

6. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   bun dev
   ```

## Project Structure

```
src/
├── components/           # UI components
│   ├── ui/               # shadcn/ui components
│   ├── CurrencyConverter.tsx  # Main conversion component
│   ├── LiveRates.tsx     # Real-time rates display
│   ├── Features.tsx      # Features showcase
│   ├── Navigation.tsx    # Navigation header
│   └── Footer.tsx        # Page footer
├── pages/                # Application pages
│   ├── Index.tsx         # Home page
│   ├── RealTimeConversion.tsx
│   ├── MarketAnalysis.tsx
│   ├── GlobalCoverage.tsx
│   ├── FastPerformance.tsx
│   ├── AboutUs.tsx
│   ├── Contact.tsx
│   └── Report.tsx
├── hooks/                # Custom React hooks
├── integrations/         # Third-party integrations
│   └── supabase/         # Supabase client and types
├── lib/                  # Utility functions
└── main.tsx              # Application entry point
```

## Supabase Integration

### Database Schema

To set up your Supabase database, run the following SQL in the Supabase SQL Editor:

```sql
-- Currency Table
CREATE TABLE currencies (
  code TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  symbol TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Exchange Rates Table
CREATE TABLE exchange_rates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  base_currency TEXT REFERENCES currencies(code),
  target_currency TEXT REFERENCES currencies(code),
  rate DECIMAL NOT NULL,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(base_currency, target_currency)
);

-- Historical Rates Table
CREATE TABLE historical_rates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  base_currency TEXT REFERENCES currencies(code),
  target_currency TEXT REFERENCES currencies(code),
  rate DECIMAL NOT NULL,
  date DATE NOT NULL,
  UNIQUE(base_currency, target_currency, date)
);

-- Conversion History Table (requires authentication)
CREATE TABLE conversion_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  from_currency TEXT REFERENCES currencies(code),
  to_currency TEXT REFERENCES currencies(code),
  amount_from DECIMAL NOT NULL,
  amount_to DECIMAL NOT NULL,
  rate DECIMAL NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert initial currency data
INSERT INTO currencies (code, name, symbol) VALUES 
('USD', 'US Dollar', '$'),
('EUR', 'Euro', '€'), 
('GBP', 'British Pound', '£'),
('JPY', 'Japanese Yen', '¥'),
('AUD', 'Australian Dollar', 'A$'),
('CAD', 'Canadian Dollar', 'C$'),
('CHF', 'Swiss Franc', 'Fr'),
('CNY', 'Chinese Yuan', '¥'),
('HKD', 'Hong Kong Dollar', 'HK$'),
('NZD', 'New Zealand Dollar', 'NZ$'),
('SEK', 'Swedish Krona', 'kr'),
('KRW', 'South Korean Won', '₩'),
('SGD', 'Singapore Dollar', 'S$'),
('NOK', 'Norwegian Krone', 'kr'),
('MXN', 'Mexican Peso', '$'),
('INR', 'Indian Rupee', '₹'),
('RUB', 'Russian Ruble', '₽'),
('ZAR', 'South African Rand', 'R'),
('BRL', 'Brazilian Real', 'R$'),
('TRY', 'Turkish Lira', '₺');
```

### Row Level Security (RLS)

To secure your Supabase tables, run the following SQL:

```sql
-- Row Level Security Policies
ALTER TABLE currencies ENABLE ROW LEVEL SECURITY;
ALTER TABLE exchange_rates ENABLE ROW LEVEL SECURITY;
ALTER TABLE historical_rates ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversion_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to currencies"
  ON currencies FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public read access to exchange rates"
  ON exchange_rates FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public read access to historical rates"
  ON historical_rates FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users to view their conversion history"
  ON conversion_history FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Allow authenticated users to insert their conversion history"
  ON conversion_history FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);
```

### Supabase Edge Function

Create an Edge Function to automatically update currency rates:

1. Install the Supabase CLI
2. Create a new Edge Function:
   ```bash
   supabase functions new updateRates
   ```

3. Add the following code to `supabase/functions/updateRates/index.ts`:

```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = Deno.env.get("SUPABASE_URL") as string;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") as string;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: corsHeaders,
      status: 204,
    });
  }
  
  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Fetch exchange rates from an external API
    const response = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
    const data = await response.json();
    
    // Get all currencies from our database
    const { data: currencies } = await supabase.from("currencies").select("code");
    
    // Prepare batch insert data for exchange rates
    const updates = [];
    const historicalUpdates = [];
    const today = new Date().toISOString().split("T")[0];
    
    for (const currency of currencies) {
      if (data.rates[currency.code]) {
        // Update current rates
        updates.push({
          base_currency: "USD",
          target_currency: currency.code,
          rate: data.rates[currency.code],
          last_updated: new Date().toISOString()
        });
        
        // Add to historical data
        historicalUpdates.push({
          base_currency: "USD",
          target_currency: currency.code,
          rate: data.rates[currency.code],
          date: today
        });
      }
    }
    
    // Update exchange rates using upsert
    const { error: ratesError } = await supabase
      .from("exchange_rates")
      .upsert(updates, { onConflict: "base_currency,target_currency" });
    
    // Insert historical data using upsert
    const { error: historicalError } = await supabase
      .from("historical_rates")
      .upsert(historicalUpdates, { onConflict: "base_currency,target_currency,date" });
    
    if (ratesError || historicalError) {
      throw new Error(ratesError?.message || historicalError?.message);
    }
    
    return new Response(JSON.stringify({ success: true, updated: updates.length }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});
```

4. Deploy the function:
   ```bash
   supabase functions deploy updateRates
   ```

5. Set up a scheduled CRON job in the Supabase dashboard to run this function daily.

## API Integration

The application integrates with Supabase for database operations and can be extended to use external currency API services like:

- [ExchangeRate-API](https://www.exchangerate-api.com/)
- [Open Exchange Rates](https://openexchangerates.org/)
- [Fixer.io](https://fixer.io/)

To implement a real API integration:

1. Obtain an API key from your chosen provider
2. Store the API key in Supabase secrets
3. Update the Edge Function to use your API key
4. Modify the `LiveRates.tsx` and `CurrencyConverter.tsx` components to fetch real data

## Component Architecture

Each component in the project follows a single responsibility principle:

- **CurrencyConverter.tsx**: Core conversion functionality
- **LiveRates.tsx**: Display of current exchange rates
- **Features.tsx**: Marketing features showcase
- **Navigation.tsx**: Main navigation header
- **Footer.tsx**: Page footer with copyright information

## Testing

### Unit Testing

1. Install testing dependencies:
   ```bash
   npm install --save-dev vitest @testing-library/react @testing-library/jest-dom
   ```

2. Create test files in a `__tests__` folder or with `.test.tsx` suffix

3. Run tests:
   ```bash
   npm run test
   ```

### End-to-End Testing

1. Install Playwright:
   ```bash
   npm install --save-dev @playwright/test
   ```

2. Create E2E tests in the `e2e` directory

3. Run E2E tests:
   ```bash
   npx playwright test
   ```

## Build and Deployment

### Build for Production

```bash
npm run build
# or
yarn build
# or
bun build
```

The build output will be in the `dist` directory.

### Deployment Options

1. **Vercel/Netlify**: Connect your repository for CI/CD deployment
2. **Static Hosting**: Upload the `dist` directory to any static hosting service
3. **Docker**: A Dockerfile is provided to containerize the application

## Environment Variables

Create a `.env` file in the project root with the following variables:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_CURRENCY_API_KEY=your_currency_api_key (optional)
```

## Contributing Guidelines

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## Future Enhancements

- Implement authentication for saving conversion history
- Add more detailed historical charts with date range selection
- Create favorite/saved currency pairs for quick access
- Implement currency alerts for specific exchange rate thresholds
- Add offline support with cached conversion rates
- Expand to include cryptocurrency conversions

## License

All rights reserved. © 2024 Globex. Powered by Avodstudio, developed by Mohamed Frank.
