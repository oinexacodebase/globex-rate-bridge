import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Gauge, Clock, Cpu } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BackButton from "@/components/BackButton";

const FastPerformance = () => {
  const metrics = [
    {
      title: "Response Time",
      value: "<100ms",
      icon: Clock,
      description: "Lightning-fast currency conversions",
    },
    {
      title: "Update Frequency",
      value: "60sec",
      icon: Gauge,
      description: "Regular rate updates",
    },
    {
      title: "Server Load",
      value: "Optimal",
      icon: Cpu,
      description: "Balanced performance",
    },
    {
      title: "Success Rate",
      value: "99.9%",
      icon: Zap,
      description: "Reliable conversions",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BackButton />
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-primary mb-4">Fast Performance</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience lightning-fast currency conversions with our optimized platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {metrics.map((metric) => {
              const Icon = metric.icon;
              return (
                <Card key={metric.title} className="transition-transform hover:scale-105">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon className="h-5 w-5 text-primary" />
                      {metric.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-primary mb-2">{metric.value}</div>
                    <p className="text-gray-600">{metric.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-primary mb-6">Performance Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-start">
                <Zap className="h-6 w-6 text-primary mr-3 mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">Real-time Processing</h3>
                  <p className="text-gray-600">
                    Instant currency conversions with minimal latency
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <Gauge className="h-6 w-6 text-primary mr-3 mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">Load Balancing</h3>
                  <p className="text-gray-600">
                    Optimized server distribution for consistent performance
                  </p>
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

export default FastPerformance;
