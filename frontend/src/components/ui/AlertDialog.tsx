import * as Dialog from "@radix-ui/react-dialog";
import { cn } from "../../lib/utils";

export const AlertDialog = Dialog.Root;
export const AlertDialogTrigger = Dialog.Trigger;
export const AlertDialogContent = ({
  children,
  className,
  ...props
}: Dialog.DialogContentProps) => (
  <>
    <Dialog.Overlay className="fixed inset-0 bg-black/50 z-40" />
    <Dialog.Content
      className={cn(
        "fixed z-50 bg-white p-6 rounded-md shadow-lg max-w-md w-full",
        "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
        className
      )}
      {...props}
    >
      {children}
    </Dialog.Content>
  </>
);
export const AlertDialogHeader = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("mb-4", className)} {...props}>
    {children}
  </div>
);
export const AlertDialogFooter = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex justify-center gap-2", className)}
    {...props}
  >
    {children}
  </div>
);
export const AlertDialogTitle = Dialog.Title;
export const AlertDialogDescription = Dialog.Description;
