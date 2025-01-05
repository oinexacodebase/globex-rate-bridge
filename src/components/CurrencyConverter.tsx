import { useState } from 'react';
import { ArrowLeftRight, DollarSign } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

const CurrencyConverter = () => {
  const [amount, setAmount] = useState<string>('');
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('EUR');
  const [result, setResult] = useState<string>('');
  const { toast } = useToast();

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
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg animate-fade-in">
      <div className="flex items-center justify-center mb-6">
        <DollarSign className="w-8 h-8 text-primary" />
        <h1 className="text-2xl font-bold text-primary ml-2">Currency Converter</h1>
      </div>

      <div className="space-y-4">
        <div>
          <Input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-full"
          />
        </div>

        <div className="flex items-center justify-between">
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            className="w-24 p-2 border rounded"
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
          </select>

          <Button
            onClick={handleSwap}
            variant="outline"
            size="icon"
            className="mx-2"
          >
            <ArrowLeftRight className="h-4 w-4" />
          </Button>

          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            className="w-24 p-2 border rounded"
          >
            <option value="EUR">EUR</option>
            <option value="USD">USD</option>
            <option value="GBP">GBP</option>
          </select>
        </div>

        <Button 
          onClick={handleConvert}
          className="w-full bg-primary hover:bg-primary-light"
        >
          Convert
        </Button>

        {result && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <p className="text-center text-lg">
              <span className="font-bold">{amount} {fromCurrency}</span>
              {" = "}
              <span className="font-bold text-primary">{result} {toCurrency}</span>
            </p>
          </div>
        )}
      </div>

      {/* Google Ads Container */}
      <div className="mt-8 w-full h-[250px] bg-gray-100 rounded flex items-center justify-center">
        <p className="text-gray-500">Google Ads Placeholder</p>
      </div>
    </div>
  );
};

export default CurrencyConverter;