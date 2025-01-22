import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe2, Map, Languages, Building2 } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const GlobalCoverage = () => {
  const regions = [
    {
      name: "Americas",
      currencies: ["USD", "CAD", "MXN", "BRL"],
      icon: Globe2,
    },
    {
      name: "Europe",
      currencies: ["EUR", "GBP", "CHF", "SEK"],
      icon: Building2,
    },
    {
      name: "Asia Pacific",
      currencies: ["JPY", "CNY", "AUD", "SGD"],
      icon: Map,
    },
    {
      name: "Middle East & Africa",
      currencies: ["AED", "SAR", "ZAR", "ILS"],
      icon: Languages,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-primary mb-4">Global Coverage</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Access real-time exchange rates for currencies worldwide with our comprehensive coverage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {regions.map((region) => {
              const Icon = region.icon;
              return (
                <Card key={region.name} className="transition-transform hover:scale-105">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon className="h-6 w-6 text-primary" />
                      {region.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      {region.currencies.map((currency) => (
                        <div
                          key={currency}
                          className="bg-gray-50 p-3 rounded-lg text-center"
                        >
                          <span className="font-semibold text-primary">{currency}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>

          <div className="mt-12 bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-primary mb-6">Coverage Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start">
                <Globe2 className="h-6 w-6 text-primary mr-3 mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">170+ Countries</h3>
                  <p className="text-gray-600">Comprehensive coverage across the globe</p>
                </div>
              </div>
              <div className="flex items-start">
                <Building2 className="h-6 w-6 text-primary mr-3 mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">Major Financial Centers</h3>
                  <p className="text-gray-600">Direct access to primary currency markets</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GlobalCoverage;