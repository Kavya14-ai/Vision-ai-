import { Link, useLocation } from "react-router-dom";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Eye className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              Vision AI
            </span>
          </Link>

          <div className="flex items-center gap-6">
            <Link to="/">
              <Button 
                variant={isActive("/") ? "default" : "ghost"}
                className={isActive("/") ? "bg-primary hover:bg-primary/90" : ""}
              >
                Home
              </Button>
            </Link>
            <Link to="/analysis">
              <Button 
                variant={isActive("/analysis") ? "default" : "ghost"}
                className={isActive("/analysis") ? "bg-primary hover:bg-primary/90" : ""}
              >
                Live Analysis
              </Button>
            </Link>
            <a href="#about">
              <Button variant="ghost">About</Button>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
