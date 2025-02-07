import { useState, useEffect } from 'react';
import { Menu, User, Mail, Flag, Home, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate('/auth');
      toast({
        title: "Success",
        description: "You have been logged out successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An error occurred during sign out",
        variant: "destructive"
      });
    }
  };

  const menuItems = [
    { icon: Home, text: 'Home', path: '/' },
    { icon: User, text: 'About Us', path: '/' },
    { icon: Mail, text: 'Contact', path: '/' },
    { icon: Flag, text: 'Report', path: '/' },
  ];

  return (
    <nav className="bg-primary shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img 
                src="/globex-logo.png" 
                alt="Globex Logo" 
                className="h-8 w-8"
              />
              <span className="ml-2 text-white text-xl font-bold">Globex</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {menuItems.map((item) => (
              <Link
                key={item.text}
                to={item.path}
                className="text-white hover:text-gray-200 flex items-center gap-2"
              >
                <item.icon className="h-4 w-4" />
                <span>{item.text}</span>
              </Link>
            ))}
            {user ? (
              <Button
                variant="outline"
                className="text-white hover:text-primary hover:bg-white"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            ) : (
              <Link to="/auth">
                <Button
                  variant="outline"
                  className="text-white hover:text-primary hover:bg-white"
                >
                  <User className="h-4 w-4 mr-2" />
                  Login
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <button
                  className="text-white p-2 rounded-md hover:bg-primary-light focus:outline-none"
                  aria-label="Open menu"
                >
                  <Menu className="h-6 w-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-primary w-[250px] p-0">
                <div className="flex flex-col h-full">
                  <div className="flex flex-col space-y-4 p-4">
                    {menuItems.map((item) => (
                      <Link
                        key={item.text}
                        to={item.path}
                        className="text-white hover:text-gray-200 flex items-center gap-3 p-2 rounded-md hover:bg-primary-light"
                        onClick={() => setIsOpen(false)}
                      >
                        <item.icon className="h-5 w-5" />
                        <span>{item.text}</span>
                      </Link>
                    ))}
                    {user ? (
                      <Button
                        variant="outline"
                        className="text-white hover:text-primary hover:bg-white w-full"
                        onClick={() => {
                          handleLogout();
                          setIsOpen(false);
                        }}
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                      </Button>
                    ) : (
                      <Link
                        to="/auth"
                        className="w-full"
                        onClick={() => setIsOpen(false)}
                      >
                        <Button
                          variant="outline"
                          className="text-white hover:text-primary hover:bg-white w-full"
                        >
                          <User className="h-4 w-4 mr-2" />
                          Login
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;