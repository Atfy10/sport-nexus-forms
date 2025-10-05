import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AttendanceForm from "./pages/AttendanceForm";
import BranchForm from "./pages/BranchForm";
import CoachForm from "./pages/CoachForm";
import EmployeeForm from "./pages/EmployeeForm";
import EnrollmentForm from "./pages/EnrollmentForm";
import PaymentForm from "./pages/PaymentForm";
import SessionForm from "./pages/SessionForm";
import SportForm from "./pages/SportForm";
import TraineeForm from "./pages/TraineeForm";
import SportBranchForm from "./pages/SportBranchForm";
import SportPriceForm from "./pages/SportPriceForm";
import SportSubscriptionTypeForm from "./pages/SportSubscriptionTypeForm";
import SportTraineeForm from "./pages/SportTraineeForm";
import SubscriptionDetailsForm from "./pages/SubscriptionDetailsForm";
import SubscriptionTypeForm from "./pages/SubscriptionTypeForm";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/attendance" element={<AttendanceForm />} />
          <Route path="/branch" element={<BranchForm />} />
          <Route path="/coach" element={<CoachForm />} />
          <Route path="/employee" element={<EmployeeForm />} />
          <Route path="/enrollment" element={<EnrollmentForm />} />
          <Route path="/payment" element={<PaymentForm />} />
          <Route path="/session" element={<SessionForm />} />
          <Route path="/sport" element={<SportForm />} />
          <Route path="/trainee" element={<TraineeForm />} />
          <Route path="/sport-branch" element={<SportBranchForm />} />
          <Route path="/sport-price" element={<SportPriceForm />} />
          <Route path="/sport-subscription-type" element={<SportSubscriptionTypeForm />} />
          <Route path="/sport-trainee" element={<SportTraineeForm />} />
          <Route path="/subscription-details" element={<SubscriptionDetailsForm />} />
          <Route path="/subscription-type" element={<SubscriptionTypeForm />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
