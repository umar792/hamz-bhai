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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { insertMallSchema, type Mall } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";

export default function MallPage() {
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(insertMallSchema),
    defaultValues: {
      amount: 0,
      reason: "",
      date: new Date().toISOString().split("T")[0],
    },
  });

  const { data: malls, isLoading } = useQuery<Mall[]>({
    queryKey: ["/api/malls"],
  });

  const mutation = useMutation({
    mutationFn: async (values: any) => {
      await apiRequest("POST", "/api/malls", values);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/malls"] });
      toast({ title: "Mall added successfully" });
      form.reset();
    },
  });

  if (isLoading) {
    return (
      <div className="p-4 flex items-center justify-center min-h-screen">
        <div className="animate-pulse space-y-4 w-full">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-muted rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold">Mall Management</h1>
        <AddModal title="Add Mall" loading={mutation.isPending}>
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
                          field.onChange(parseInt(e.target.value) || 0)
                        }
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="reason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reason</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
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
              <Button type="submit" className="w-full" disabled={mutation.isPending}>
                {mutation.isPending ? "Adding..." : "Add Mall"}
              </Button>
            </form>
          </Form>
        </AddModal>
      </div>

      <div className="overflow-x-auto -mx-4 md:mx-0">
        <Table className="min-w-full md:w-auto">
          <TableHeader>
            <TableRow>
              <TableHead className="whitespace-nowrap">Date</TableHead>
              <TableHead className="whitespace-nowrap">Amount</TableHead>
              <TableHead className="whitespace-nowrap">Reason</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {malls?.map((mall) => (
              <TableRow key={mall.id}>
                <TableCell>{new Date(mall.date).toLocaleDateString()}</TableCell>
                <TableCell>₹{mall.amount.toLocaleString()}</TableCell>
                <TableCell className="break-all">{mall.reason}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}