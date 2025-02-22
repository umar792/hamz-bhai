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

  const { data: malls } = useQuery<Mall[]>({
    queryKey: ["/api/malls"],
  });

  const mutation = useMutation({
    mutationFn: async (values: any) => {
      await apiRequest("POST", "/api/malls", values);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/malls"] });
      toast({ title: "Mall added successfully" });
    },
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Mall Management</h1>
        <AddModal title="Add Mall">
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
              <Button type="submit" className="w-full">
                Add Mall
              </Button>
            </form>
          </Form>
        </AddModal>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Reason</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {malls?.map((mall) => (
            <TableRow key={mall.id}>
              <TableCell>{new Date(mall.date).toLocaleDateString()}</TableCell>
              <TableCell>₹{mall.amount.toLocaleString()}</TableCell>
              <TableCell>{mall.reason}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
