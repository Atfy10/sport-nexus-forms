import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { 
  Users, 
  Building2, 
  UserCheck, 
  Briefcase, 
  ClipboardList, 
  CreditCard, 
  Calendar, 
  Trophy, 
  UserCircle,
  Network,
  DollarSign,
  FileText,
  BadgeCheck
} from "lucide-react";

const Dashboard = () => {
  const formCategories = [
    {
      title: "Management",
      forms: [
        { name: "Attendance", icon: ClipboardList, path: "/attendance", color: "text-blue-500" },
        { name: "Enrollments", icon: BadgeCheck, path: "/enrollment", color: "text-green-500" },
        { name: "Sessions", icon: Calendar, path: "/session", color: "text-purple-500" },
        { name: "Subscriptions", icon: FileText, path: "/subscription-details", color: "text-orange-500" },
      ]
    },
    {
      title: "Employees & Staff",
      forms: [
        { name: "Employees", icon: Briefcase, path: "/employee", color: "text-indigo-500" },
        { name: "Coaches", icon: UserCheck, path: "/coach", color: "text-cyan-500" },
      ]
    },
    {
      title: "Trainees & Sports",
      forms: [
        { name: "Trainees", icon: UserCircle, path: "/trainee", color: "text-pink-500" },
        { name: "Sports", icon: Trophy, path: "/sport", color: "text-yellow-500" },
        { name: "Sport-Trainee", icon: Network, path: "/sport-trainee", color: "text-teal-500" },
      ]
    },
    {
      title: "Facilities & Finances",
      forms: [
        { name: "Branches", icon: Building2, path: "/branch", color: "text-red-500" },
        { name: "Payments", icon: CreditCard, path: "/payment", color: "text-green-600" },
        { name: "Sport Prices", icon: DollarSign, path: "/sport-price", color: "text-emerald-500" },
      ]
    },
    {
      title: "Configuration",
      forms: [
        { name: "Sport-Branch", icon: Network, path: "/sport-branch", color: "text-violet-500" },
        { name: "Sport-Subscription", icon: Network, path: "/sport-subscription-type", color: "text-fuchsia-500" },
        { name: "Subscription Types", icon: Users, path: "/subscription-type", color: "text-rose-500" },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-2">Sport Academy Dashboard</h1>
        </div>

        <div className="space-y-8">
          {formCategories.map((category, idx) => (
            <div key={idx} className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">{category.title}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.forms.map((form, formIdx) => (
                  <Link key={formIdx} to={form.path}>
                    <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer border-none">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <form.icon className={`h-8 w-8 ${form.color}`} />
                          <span className="text-lg font-medium text-card-foreground">{form.name}</span>
                        </div>
                        <span className="text-muted-foreground">→</span>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
