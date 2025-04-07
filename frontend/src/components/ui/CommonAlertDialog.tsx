import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription
} from "./AlertDialog";
import { Button } from "./Button";
import { ReactNode } from "react";

interface CommonAlertDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  title: ReactNode;
  description: ReactNode;
  confirmText: string;
  confirmBtnVariant?: "primary" | "secondary" | "danger" | undefined;
  cancelText: string;
  onConfirm: () => void;
}

export const CommonAlertDialog = ({
  isOpen,
  onOpenChange,
  title,
  description,
  confirmText,
  confirmBtnVariant = "primary",
  cancelText,
  onConfirm
}: CommonAlertDialogProps) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button variant="secondary" onClick={() => onOpenChange(false)}>
            {cancelText}
          </Button>
          <Button
            variant={confirmBtnVariant}
            onClick={() => {
              onConfirm();
              onOpenChange(false);
            }}
          >
            {confirmText}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
