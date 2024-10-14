import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReactNode } from "react";

export function Modal({
  dialogTrigger,
  onConfirmButton,
  title,
  children,
  disable,
}: {
  dialogTrigger: ReactNode;
  onConfirmButton: ReactNode;
  title: string;
  children: ReactNode;
  disable?: boolean;
}) {
  return (
    <Dialog>
      <DialogTrigger disabled={disable}>{dialogTrigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{children}</DialogDescription>
        </DialogHeader>

        <DialogFooter className="sm:justify-between">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          {onConfirmButton}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
