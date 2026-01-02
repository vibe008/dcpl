import AdminSidebar from "../components/AdminSidebar";

export default function DashboardLayout({ children }) {
  return (
    <>
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-h-0 h-full overflow-y-auto"> {/* Change here */}
        {children}
      </div>
    </>
  );
}