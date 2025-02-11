
import BackButton from "@/components/BackButton";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

const Report = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Report submitted",
      description: "Thank you for helping us improve our service.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <div className="flex-grow bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <BackButton />
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Report an Issue</h1>
          <div className="bg-white shadow-md rounded-lg p-6">
            <p className="text-gray-600 mb-6">
              Found an issue with our currency conversion service? Please let us know about it, 
              and we'll investigate as soon as possible.
            </p>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                  Issue Type
                </label>
                <select
                  id="type"
                  className="w-full rounded-md border border-input px-3 py-2"
                  required
                  style={{ backgroundColor: '#DFDFDF' }}
                >
                  <option value="">Select an issue type</option>
                  <option value="conversion">Conversion Error</option>
                  <option value="rate">Incorrect Rate</option>
                  <option value="technical">Technical Problem</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <Textarea
                  id="description"
                  placeholder="Please describe the issue in detail"
                  className="min-h-[150px]"
                  required
                  style={{ backgroundColor: '#DFDFDF' }}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Email
                </label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="your@email.com" 
                  required 
                  style={{ backgroundColor: '#DFDFDF' }}
                />
              </div>
              <Button type="submit" className="w-full">
                Submit Report
              </Button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Report;
