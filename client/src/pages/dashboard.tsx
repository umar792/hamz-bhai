import { useQuery } from "@tanstack/react-query";
import { MetricCard } from "@/components/metric-card";
import {
  DollarSign,
  ShoppingBag,
  Building2,
  Receipt,
  TrendingDown
} from "lucide-react";
import type { Mall, Expense, Sale } from "@shared/schema";

export default function Dashboard() {
  const { data: malls, isLoading: mallsLoading } = useQuery<Mall[]>({ 
    queryKey: ["/api/malls"]
  });

  const { data: expenses, isLoading: expensesLoading } = useQuery<Expense[]>({
    queryKey: ["/api/expenses"]
  });

  const { data: sales, isLoading: salesLoading } = useQuery<Sale[]>({
    queryKey: ["/api/sales"]
  });

  const today = new Date().toISOString().split('T')[0];

  const dailySale = sales?.filter(s => s.date === today)
    .reduce((sum, sale) => sum + sale.amount, 0) || 0;

  const dailyExpense = expenses?.filter(e => e.date === today)
    .reduce((sum, exp) => sum + exp.amount, 0) || 0;

  const totalMall = malls?.reduce((sum, mall) => sum + mall.amount, 0) || 0;
  const totalSale = sales?.reduce((sum, sale) => sum + sale.amount, 0) || 0;
  const totalExpense = expenses?.reduce((sum, exp) => sum + exp.amount, 0) || 0;

  const isLoading = mallsLoading || expensesLoading || salesLoading;

  if (isLoading) {
    return (
      <div className="p-4 flex items-center justify-center min-h-screen">
        <div className="animate-pulse space-y-4 w-full">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-24 bg-muted rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <MetricCard
          title="Daily Sale"
          value={`₹${dailySale.toLocaleString()}`}
          icon={<Receipt className="h-4 w-4 text-muted-foreground" />}
        />
        <MetricCard
          title="Daily Expense"
          value={`₹${dailyExpense.toLocaleString()}`}
          icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
        />
        <MetricCard
          title="Total Mall"
          value={`₹${totalMall.toLocaleString()}`}
          icon={<ShoppingBag className="h-4 w-4 text-muted-foreground" />}
        />
        <MetricCard
          title="Total Sale"
          value={`₹${totalSale.toLocaleString()}`}
          icon={<Building2 className="h-4 w-4 text-muted-foreground" />}
        />
        <MetricCard
          title="Total Expense"
          value={`₹${totalExpense.toLocaleString()}`}
          icon={<TrendingDown className="h-4 w-4 text-muted-foreground" />}
        />
      </div>
    </div>
  );
}