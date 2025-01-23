import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, RefreshCw } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const POPULAR_PAIRS = [
  { from: "USD", to: "EUR", name: "Euro" },
  { from: "USD", to: "GBP", name: "British Pound" },
  { from: "USD", to: "JPY", name: "Japanese Yen" },
  { from: "USD", to: "AUD", name: "Australian Dollar" },
  { from: "USD", to: "CAD", name: "Canadian Dollar" },
  { from: "USD", to: "CHF", name: "Swiss Franc" },
];

const LiveRates = () => {
  const { toast } = useToast();

  const { data: rates, isLoading } = useQuery({
    queryKey: ["live-rates"],
    queryFn: async () => {
      // Simulated API call - replace with actual API integration
      return {
        EUR: 0.92,
        GBP: 0.79,
        JPY: 150.45,
        AUD: 1.53,
        CAD: 1.36,
        CHF: 0.89,
      };
    },
    refetchInterval: 60000, // Refresh every minute
    onError: () => {
      toast({
        title: "Error fetching rates",
        description: "Unable to fetch latest rates. Please try again later.",
        variant: "destructive",
      });
    },
  });

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-primary">Live Exchange Rates</h2>
          <div className="flex items-center text-sm text-gray-500">
            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            Auto-refreshing
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {POPULAR_PAIRS.map(({ from, to, name }) => (
            <Card key={to} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-gray-500">USD to {name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold">1.00</span>
                    <span className="text-lg text-gray-500">{from}</span>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400" />
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-primary">
                      {isLoading ? "..." : rates?.[to]?.toFixed(2)}
                    </span>
                    <span className="text-lg text-gray-500">{to}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LiveRates;