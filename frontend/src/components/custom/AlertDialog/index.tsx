import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export function AlertDialogModal({
  isOpen,
  onChange,
  title,
  text,
  onCofirm,
}: {
  isOpen: boolean;
  onChange: () => void;
  title?: string;
  text: string;
  onCofirm: () => void;
}) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title ?? ""}</AlertDialogTitle>
          <AlertDialogDescription>{text ?? ""}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <AlertDialogCancel>Annulla</AlertDialogCancel>
          <AlertDialogAction onClick={onCofirm}>Conferma</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
