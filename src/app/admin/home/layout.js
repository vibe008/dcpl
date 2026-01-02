import AdminSidebar from "../components/AdminSidebar";

export default function DashboardLayout({ children }) {
  return (
    <>
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-h-0"> {/* Change here */}
        {children}
      </div>
    </>
  );
}