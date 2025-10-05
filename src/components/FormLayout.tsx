import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface FormLayoutProps {
  title: string;
  children: ReactNode;
}

const FormLayout = ({ title, children }: FormLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link to="/">
          <Button variant="ghost" className="mb-6 text-foreground hover:text-primary">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
        
        <Card className="p-8 border-none">
          <h1 className="text-3xl font-bold text-card-foreground mb-8"># {title}</h1>
          {children}
        </Card>
      </div>
    </div>
  );
};

export default FormLayout;
