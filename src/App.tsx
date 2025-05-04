import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Resources from "./pages/Resources";
import Blog from "./pages/Blog";
import Book from "./pages/Book";
import Contact from "./pages/Contact";
import Enquiry from "./pages/Enquiry";
import NotFound from "./pages/NotFound";
import BlogPost from "./pages/BlogPost";
import RevenueStreamDetail from "./pages/RevenueStreamDetail";
import Checkout from "./pages/Checkout";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFailure from "./pages/PaymentFailure";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import EmailVerification from "./pages/EmailVerification";
import { AuthProvider } from "./contexts/AuthContext";
import MobileAppWrapper from "./components/MobileAppWrapper";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <MobileAppWrapper>
              <Routes>
                {/* Authentication routes - no protection needed */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/verify-email" element={<EmailVerification />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                
                {/* Main routes - will require auth only on mobile */}
                <Route path="/" element={
                  <ProtectedRoute requireAuth={false}>
                    <Home />
                  </ProtectedRoute>
                } />
                <Route path="/about" element={
                  <ProtectedRoute requireAuth={false}>
                    <About />
                  </ProtectedRoute>
                } />
                <Route path="/services" element={
                  <ProtectedRoute requireAuth={false}>
                    <Services />
                  </ProtectedRoute>
                } />
                <Route path="/resources" element={
                  <ProtectedRoute requireAuth={false}>
                    <Resources />
                  </ProtectedRoute>
                } />
                <Route path="/blog" element={
                  <ProtectedRoute requireAuth={false}>
                    <Blog />
                  </ProtectedRoute>
                } />
                <Route path="/blog/:slug" element={
                  <ProtectedRoute requireAuth={false}>
                    <BlogPost />
                  </ProtectedRoute>
                } />
                <Route path="/book" element={
                  <ProtectedRoute requireAuth={false}>
                    <Book />
                  </ProtectedRoute>
                } />
                <Route path="/checkout" element={
                  <ProtectedRoute requireAuth={false}>
                    <Checkout />
                  </ProtectedRoute>
                } />
                <Route path="/payment-success" element={
                  <ProtectedRoute requireAuth={false}>
                    <PaymentSuccess />
                  </ProtectedRoute>
                } />
                <Route path="/payment-failure" element={
                  <ProtectedRoute requireAuth={false}>
                    <PaymentFailure />
                  </ProtectedRoute>
                } />
                <Route path="/contact" element={
                  <ProtectedRoute requireAuth={false}>
                    <Contact />
                  </ProtectedRoute>
                } />
                <Route path="/enquiry" element={
                  <ProtectedRoute requireAuth={false}>
                    <Enquiry />
                  </ProtectedRoute>
                } />
                <Route path="/revenue-streams/:streamId" element={
                  <ProtectedRoute requireAuth={false}>
                    <RevenueStreamDetail />
                  </ProtectedRoute>
                } />
                <Route path="*" element={
                  <ProtectedRoute requireAuth={false}>
                    <NotFound />
                  </ProtectedRoute>
                } />
              </Routes>
            </MobileAppWrapper>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
