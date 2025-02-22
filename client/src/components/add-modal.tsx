
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusCircle, X } from "lucide-react";

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
      <DialogContent className="sm:max-w-[425px] h-[90vh] sm:h-auto overflow-y-auto">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle>{title}</DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 sm:hidden"
            onClick={() => setOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        {React.cloneElement(children as React.ReactElement, {
          onSuccess: () => setOpen(false),
          loading
        })}
      </DialogContent>
    </Dialog>
  );
}
