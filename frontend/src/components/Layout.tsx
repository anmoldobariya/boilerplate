import { LogOut, TriangleAlert } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { cn } from "../lib/utils";
import { authApi } from "../redux/api/auth";
import { actions, RootState } from "../redux/store";
import { Button } from "./ui/Button";
import { CommonAlertDialog } from "./ui/CommonAlertDialog";

interface LayoutProps {
  children: React.ReactNode;
}

const apiArray = [authApi];

export const Layout = ({ children }: LayoutProps) => {
  const { currentUser } = useSelector((state: RootState) => state.auth);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const dispatch = useDispatch();

  const handleLogout = () => {
    apiArray.forEach(api => {
      dispatch(api.util.resetApiState());
    });
    actions.auth.clearToken(null);
    toast.success("Logged out successfully");
  };

  return (
    <div className="h-[100dvh] w-[100dvw] overflow-hidden flex flex-col bg-gray-100">
      {currentUser && (
        <header className="flex justify-between px-12 items-center bg-white text-center py-4 shadow-md">
          <span className="text-3xl font-sans">Project</span>
          <Button variant="secondary" onClick={() => setIsDialogOpen(true)}>
            <p className="flex gap-3 items-center">
              <LogOut /> Logout
            </p>
          </Button>
          <CommonAlertDialog
            isOpen={isDialogOpen}
            onOpenChange={setIsDialogOpen}
            title={
              <div className="flex justify-center items-center gap-2 pb-3">
                <TriangleAlert /> Confirm Logout
              </div>
            }
            description="Are you sure you want to log out?"
            confirmText="Logout"
            confirmBtnVariant="danger"
            cancelText="Cancel"
            onConfirm={handleLogout}
          />
        </header>
      )}
      <main
        className={cn(
          "flex-1 min-h-0 flex justify-center items-center",
          currentUser ? "px-6 py-6" : "p-0"
        )}
      >
        <div className="h-full w-full">{children}</div>
      </main>
    </div>
  );
};
