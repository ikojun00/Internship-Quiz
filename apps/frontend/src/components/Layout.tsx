import { Outlet } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { useAuth } from "@/contexts/AuthContext";
import { Toaster } from "./ui/sonner";

export function Layout() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="max-w-7xl flex-1 w-full mx-auto my-8 p-4">
        <Outlet />
      </main>
      <footer className="py-4 border-t text-center text-sm text-gray-500">
        <div className="container mx-auto">
          © {new Date().getFullYear()} Quiz App - All rights reserved
        </div>
      </footer>
      <Toaster position="top-right" />
    </div>
  );
}
