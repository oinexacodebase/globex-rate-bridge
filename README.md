
# Globex Currency Converter

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

The application uses Supabase for backend services, including:
- Database storage for exchange rates
- User authentication (for premium features)
- Storing conversion history
- Real-time updates for currency rates

### Supabase Schema

To set up the database, execute the following SQL in your Supabase SQL editor:

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

-- Row Level Security Policies
-- Allow public read access to currencies and exchange rates
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

### Supabase Functions

To implement automatic rate updates, create the following Supabase Edge Function:

```typescript
// updateRates.ts edge function
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

Set up a cron job to run this function every hour.

## Environment Setup

To integrate with Supabase:

1. Create a Supabase project from [Supabase Dashboard](https://app.supabase.com)
2. Execute the SQL commands provided above in the SQL Editor
3. Create the Edge Function for automated rate updates
4. In the Supabase project settings, note your project URL and anon key
5. Make sure these values match the ones in `src/integrations/supabase/client.ts`

## Local Development

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd globex-currency-converter

# Install dependencies
npm install

# Start development server
npm run dev
```

The development server will be available at http://localhost:5173

## Building for Production

```bash
# Build the project
npm run build

# Preview the production build
npm run preview
```

## Further Enhancements

- Implement authentication for saving conversion history
- Add more detailed historical charts with date range selection
- Create favorite/saved currency pairs for quick access
- Implement currency alerts for specific exchange rate thresholds
- Add offline support with cached conversion rates
- Expand to include cryptocurrency conversions

## License

All rights reserved. © 2024 Globex. Powered by Avodstudio.
