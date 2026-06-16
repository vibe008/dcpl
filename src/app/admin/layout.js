"use client";

import { usePathname } from "next/navigation";
import AdminSidebar from "./components/AdminSidebar";
import { Toaster } from "react-hot-toast";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return (
      <div className="h-screen flex overflow-hidden bg-gray-50">
        <Toaster position="top-right" />
        <div className="flex-1 flex flex-col overflow-hidden">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <Toaster position="top-right" />
      <AdminSidebar />
      <div className="flex-1 min-h-0 h-full overflow-y-auto">
        {children}
      </div>
    </div>
  );
}

