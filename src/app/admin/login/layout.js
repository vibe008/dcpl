// Login page doesn't need sidebar, so empty layout
export default function LoginLayout({ children }) {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {children}
    </div>
  );
}