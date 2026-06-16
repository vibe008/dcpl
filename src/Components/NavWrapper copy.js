"use client";

import { usePathname } from "next/navigation";

export default function NavWrapper({ children }) {
    const pathname = usePathname();

    const hideNav = pathname.startsWith("/admin");

    if (hideNav) return null;

    return <>{children}</>;
}
