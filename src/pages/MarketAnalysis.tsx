import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart2, TrendingUp, LineChart, PieChart } from "lucide-react";
import { LineChart as ReChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const MarketAnalysis = () => {
  const data = [
    { name: 'Jan', EUR: 0.92, GBP: 0.79, JPY: 150.45 },
    { name: 'Feb', EUR: 0.91, GBP: 0.78, JPY: 149.80 },
    { name: 'Mar', EUR: 0.93, GBP: 0.80, JPY: 151.20 },
    { name: 'Apr', EUR: 0.90, GBP: 0.77, JPY: 148.90 },
    { name: 'May', EUR: 0.94, GBP: 0.81, JPY: 152.30 },
    { name: 'Jun', EUR: 0.92, GBP: 0.79, JPY: 150.45 },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-primary mb-4">Market Analysis</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive currency market analysis tools and insights for informed decisions.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-primary mb-6">Currency Trends</h2>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <ReChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="EUR" stroke="#78184e" />
                  <Line type="monotone" dataKey="GBP" stroke="#2563eb" />
                  <Line type="monotone" dataKey="JPY" stroke="#16a34a" />
                </ReChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="transition-transform hover:scale-105">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Trend Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Advanced technical analysis tools for currency pairs</p>
              </CardContent>
            </Card>

            <Card className="transition-transform hover:scale-105">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChart className="h-5 w-5 text-primary" />
                  Historical Data
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Comprehensive historical exchange rate data</p>
              </CardContent>
            </Card>

            <Card className="transition-transform hover:scale-105">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-primary" />
                  Market Share
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Currency market distribution and volume analysis</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MarketAnalysis;