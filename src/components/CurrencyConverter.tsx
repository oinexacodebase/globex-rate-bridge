
import { useState } from 'react';
import { ArrowLeftRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CURRENCIES = {
  USD: "US Dollar",
  EUR: "Euro",
  GBP: "British Pound",
  JPY: "Japanese Yen",
  AUD: "Australian Dollar",
  CAD: "Canadian Dollar",
  CHF: "Swiss Franc",
  CNY: "Chinese Yuan",
  HKD: "Hong Kong Dollar",
  NZD: "New Zealand Dollar",
  SEK: "Swedish Krona",
  KRW: "South Korean Won",
  SGD: "Singapore Dollar",
  NOK: "Norwegian Krone",
  MXN: "Mexican Peso",
  INR: "Indian Rupee",
  RUB: "Russian Ruble",
  ZAR: "South African Rand",
  BRL: "Brazilian Real",
  TRY: "Turkish Lira"
};

const CurrencyConverter = () => {
  const [amount, setAmount] = useState<string>('');
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('EUR');
  const [result, setResult] = useState<string>('');
  const { toast } = useToast();

  const chartData = [
    { date: '2024-01', rate: 0.82 },
    { date: '2024-02', rate: 0.83 },
    { date: '2024-03', rate: 0.85 },
    { date: '2024-04', rate: 0.84 },
    { date: '2024-05', rate: 0.86 },
    { date: '2024-06', rate: 0.85 },
  ];

  const handleConvert = async () => {
    if (!amount || isNaN(Number(amount))) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid number",
        variant: "destructive",
      });
      return;
    }

    try {
      // For demo purposes, using a fixed rate. In production, you'd use a real API
      const rate = 0.85;
      const converted = (Number(amount) * rate).toFixed(2);
      setResult(converted);
      
      toast({
        title: "Conversion successful",
        description: `${amount} ${fromCurrency} = ${converted} ${toCurrency}`,
      });
    } catch (error) {
      toast({
        title: "Conversion failed",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  };

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setResult('');
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-8 bg-white rounded-xl shadow-xl animate-fade-in">
      <div className="flex flex-col items-center justify-center mb-4 sm:mb-8 text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-2 sm:mb-4">
          Smart and Powerful Converter
        </h1>
        <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl px-2 sm:px-0">
          Effortlessly convert currencies with real-time rates and a user-friendly interface designed for convenience and accuracy.
        </p>
      </div>

      <div className="space-y-4 sm:space-y-6 max-w-2xl mx-auto">
        <div className="bg-gray-50 p-3 sm:p-6 rounded-lg">
          <Input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="text-base sm:text-lg h-12 sm:h-14 mb-3 sm:mb-4 focus:ring-gray-300 focus-visible:ring-gray-300"
          />

          <div className="flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="w-full md:w-[40%] p-2 sm:p-3 text-base sm:text-lg border rounded-lg focus:ring-gray-300 focus:border-gray-300 focus-visible:ring-gray-300"
            >
              {Object.entries(CURRENCIES).map(([code, name]) => (
                <option key={code} value={code}>
                  {code} - {name}
                </option>
              ))}
            </select>

            <Button
              onClick={handleSwap}
              variant="outline"
              size="icon"
              className="h-10 w-10 sm:h-14 sm:w-14"
            >
              <ArrowLeftRight className="h-4 w-4 sm:h-6 sm:w-6" />
            </Button>

            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="w-full md:w-[40%] p-2 sm:p-3 text-base sm:text-lg border rounded-lg focus:ring-gray-300 focus:border-gray-300 focus-visible:ring-gray-300"
            >
              {Object.entries(CURRENCIES).map(([code, name]) => (
                <option key={code} value={code}>
                  {code} - {name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <Button 
          onClick={handleConvert}
          className="w-full h-12 sm:h-14 text-base sm:text-lg bg-primary hover:bg-primary-light text-white"
        >
          Convert
        </Button>

        {result && (
          <div className="mt-4 sm:mt-6 p-4 sm:p-6 bg-gray-50 rounded-lg">
            <p className="text-center text-lg sm:text-xl md:text-2xl">
              <span className="font-bold">{amount} {fromCurrency}</span>
              {" = "}
              <span className="font-bold text-primary">{result} {toCurrency}</span>
            </p>
          </div>
        )}
      </div>

      {/* Google Ads Container */}
      <div className="mt-8 sm:mt-12 w-full h-[200px] sm:h-[300px] bg-gray-100 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">Google Ads Placeholder</p>
      </div>

      {/* Currency Rate Chart */}
      <div className="mt-8 sm:mt-12">
        <h2 className="text-xl sm:text-2xl font-semibold text-primary mb-4 sm:mb-6">Exchange Rate History</h2>
        <div className="w-full h-[300px] sm:h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                stroke="#666"
                tick={{ fill: '#666' }}
              />
              <YAxis 
                stroke="#666"
                tick={{ fill: '#666' }}
                domain={['auto', 'auto']}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white',
                  border: '1px solid #ccc'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="rate" 
                stroke="#16a34a" 
                strokeWidth={2}
                dot={{ fill: '#16a34a' }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <p className="text-xs sm:text-sm text-gray-500 mt-3 sm:mt-4 text-center">
          6-month exchange rate history for {fromCurrency}/{toCurrency}
        </p>
      </div>
    </div>
  );
};

export default CurrencyConverter;
