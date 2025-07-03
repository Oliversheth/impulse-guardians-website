
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Layout from "@/components/Layout";
import Index from "./pages/Index";
import CourseDetail from "./pages/CourseDetail";
import LessonView from "./pages/LessonView";
import AccountSettings from "./pages/AccountSettings";
import LegalDisclaimer from "./pages/LegalDisclaimer";
import SampleBudgets from "./pages/SampleBudgets";
import Calculators from "./pages/Calculators";
import Dashboard from "./components/Dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/course/:courseId" element={<Layout><CourseDetail /></Layout>} />
            <Route path="/course/:courseId/lesson/:lessonId" element={<Layout><LessonView /></Layout>} />
            <Route path="/account" element={<Layout><AccountSettings /></Layout>} />
            <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
            <Route path="/calculators" element={<Layout><Calculators /></Layout>} />
            <Route path="/legal-disclaimer" element={<Layout><LegalDisclaimer /></Layout>} />
            <Route path="/sample-budgets" element={<Layout><SampleBudgets /></Layout>} />
            <Route path="*" element={<Layout><NotFound /></Layout>} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
