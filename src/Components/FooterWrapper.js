"use client";

import { usePathname } from "next/navigation";

export default function FooterWrapper({ children }) {
  const pathname = usePathname();

  const hideFooter = pathname.startsWith("/admin");

  if (hideFooter) return null;

  return <>{children}</>;
}
