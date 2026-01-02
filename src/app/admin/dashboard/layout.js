import AdminSidebar from "../components/AdminSidebar";

export default function ProjectsLayout({ children }) {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar - Fixed position */}
      <div className="sticky top-0 h-screen flex-shrink-0">
        <AdminSidebar />
      </div>
      
      {/* Main Content - Scrollable */}
      <main className="flex-1 min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <div className="h-full overflow-y-auto">
          <div className="p-6 lg:p-8">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}