import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddModal } from "@/components/add-modal";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MetricCard } from "@/components/metric-card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import {
  insertTransactionSchema,
  type Company,
  type Transaction,
} from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Building2, ArrowDownCircle, ArrowUpCircle, Clock } from "lucide-react";

interface CompanyDetailsPageProps {
  id: number;
}

export default function CompanyDetailsPage({ id }: CompanyDetailsPageProps) {
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(insertTransactionSchema),
    defaultValues: {
      companyId: id,
      amount: 0,
      type: "mall",
      date: new Date().toISOString().split("T")[0],
    },
  });

  const { data: company } = useQuery<Company>({
    queryKey: [`/api/companies/${id}`],
  });

  const { data: transactions } = useQuery<Transaction[]>({
    queryKey: [`/api/companies/${id}/transactions`],
  });

  const mutation = useMutation({
    mutationFn: async (values: any) => {
      await apiRequest("POST", `/api/companies/${id}/transactions`, values);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`/api/companies/${id}/transactions`],
      });
      toast({ title: "Transaction added successfully" });
      // clear the form
      form.reset();
    },
  });

  const totalMall = transactions
    ?.filter((t) => t.type === "mall")
    .reduce((sum, t) => sum + t.amount, 0) || 0;

  const totalPayment = transactions
    ?.filter((t) => t.type === "payment")
    .reduce((sum, t) => sum + t.amount, 0) || 0;

  const pendingAmount = totalMall - totalPayment;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{company?.name}</h1>
        <AddModal title="Add Transaction">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((values) => mutation.mutate(values))}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value, 10))
                        }
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="mall">Mall</SelectItem>
                        <SelectItem value="payment">Payment</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Add Transaction
              </Button>
            </form>
          </Form>
        </AddModal>
      </div>

      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <MetricCard
          title="Total Mall Purchased"
          value={`₹${totalMall.toLocaleString()}`}
          icon={<ArrowDownCircle className="h-4 w-4 text-muted-foreground" />}
        />
        <MetricCard
          title="Total Amount Paid"
          value={`₹${totalPayment.toLocaleString()}`}
          icon={<ArrowUpCircle className="h-4 w-4 text-muted-foreground" />}
        />
        <MetricCard
          title="Pending Amount"
          value={`₹${pendingAmount.toLocaleString()}`}
          icon={<Clock className="h-4 w-4 text-muted-foreground" />}
        />
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-4">Transaction History</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions?.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>
                  {new Date(transaction.date).toLocaleDateString()}
                </TableCell>
                <TableCell className="capitalize">{transaction.type}</TableCell>
                <TableCell>₹{transaction.amount.toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
