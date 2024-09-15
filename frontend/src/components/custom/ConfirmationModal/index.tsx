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

export function ConfirmationModal({
  children,
  onConfirmButton,
  title,
  confirmationData,
}: {
  children: ReactNode;
  onConfirmButton: ReactNode;
  title: string;
  confirmationData: string;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
        {/* <Button variant="outline">Share</Button> */}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Sei sicuro di voler confermare la tua prenotazione per{" "}
            {confirmationData}?
          </DialogDescription>
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
