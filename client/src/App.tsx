import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import Home from "./pages/Home";
import Experience from "./pages/Experience";
import Cases from "./pages/Cases";
import ThoughtLeadership from "./pages/ThoughtLeadership";
import Contact from "./pages/Contact";
import NewsInsights from "./pages/NewsInsights";
import Layout from "./components/Layout";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/experience" component={Experience} />
        <Route path="/cases" component={Cases} />
        <Route path="/thought-leadership" component={ThoughtLeadership} />
        <Route path="/contact" component={Contact} />
        <Route path="/news-insights" component={NewsInsights} />
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
