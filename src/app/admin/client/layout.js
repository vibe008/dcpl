import AdminSidebar from "../components/AdminSidebar";

export default function ProjectsLayout({ children }) {
  return (
    <div className="min-h-screen flex w-full">
      {/* Sidebar - Fixed position */}
      <div className="sticky top-0 h-screen flex-shrink-0 w-[20%]">
        <AdminSidebar />
      </div>
      
      {/* Main Content - Scrollable */}
      <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 w-[80%]">
        <div className="h-full overflow-y-auto">
          <div className="p-6 lg:p-8">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}