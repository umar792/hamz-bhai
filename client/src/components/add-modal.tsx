import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react";

interface AddModalProps {
  title: string;
  children: React.ReactNode;
  trigger?: React.ReactNode;
  loading?: boolean;
}

export function AddModal({ title, children, trigger, loading }: AddModalProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button size="sm" className="w-full sm:w-auto">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {React.cloneElement(children as React.ReactElement, {
          onSuccess: () => setOpen(false),
          loading
        })}
      </DialogContent>
    </Dialog>
  );
}