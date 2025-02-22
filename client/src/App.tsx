import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { useAuth } from "./lib/auth";
import { NavSidebar } from "./components/nav-sidebar";
import NotFound from "@/pages/not-found";
import Login from "@/pages/login";
import Dashboard from "@/pages/dashboard";
import MallPage from "@/pages/mall";
import ExpensesPage from "@/pages/expenses";
import SalesPage from "@/pages/sales";
import CompaniesPage from "@/pages/companies";
import CompanyDetailsPage from "@/pages/company-details";

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [, setLocation] = useLocation();

  if (!user) {
    setLocation("/login");
    return null;
  }

  return (
    <div className="flex min-h-screen">
      <NavSidebar />
      <main className="flex-1 overflow-y-auto mt-[80px]">{children}</main>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/login" component={Login} />

      <Route path="/">
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      </Route>

      <Route path="/mall">
        <PrivateRoute>
          <MallPage />
        </PrivateRoute>
      </Route>

      <Route path="/expenses">
        <PrivateRoute>
          <ExpensesPage />
        </PrivateRoute>
      </Route>

      <Route path="/sales">
        <PrivateRoute>
          <SalesPage />
        </PrivateRoute>
      </Route>

      <Route path="/companies">
        <PrivateRoute>
          <CompaniesPage />
        </PrivateRoute>
      </Route>

      <Route path="/companies/:id">
        {(params) => (
          <PrivateRoute>
            <CompanyDetailsPage id={parseInt(params.id)} />
          </PrivateRoute>
        )}
      </Route>

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
