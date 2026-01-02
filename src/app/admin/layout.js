export const dynamic = "force-dynamic";

export default function AdminLayout({ children }) {
  return (
    <div className="h-screen flex">
      {children}
    </div>
  );
}
