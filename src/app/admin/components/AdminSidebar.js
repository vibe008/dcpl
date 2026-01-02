"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  FolderKanban,
  Mail,
  FileText,
  Settings,
  Users,
  User,
  Building2,
  Award,
  Menu,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Home,
  ShieldCheck
} from "lucide-react";

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  // Don't show sidebar on login page
  if (pathname === '/admin/login') {
    return null;
  }

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        router.push('/admin/login');
      }
    } catch (error) {
      console.error('Logout failed:', error);
      router.push('/admin/login');
    }
  };

  const menuItems = [
    {
      href: "/admin/dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      href: "/admin/projects",
      label: "Projects",
      icon: <FolderKanban className="w-5 h-5" />,
    },
    {
      href: "/admin/inquiries",
      label: "Inquiries",
      icon: <Mail className="w-5 h-5" />,
    },
    {
      href: "/admin/applications",
      label: "Applications",
      icon: <FileText className="w-5 h-5" />,
    },
    {
      href: "/admin/services",
      label: "Services",
      icon: <Settings className="w-5 h-5" />,
    },
    {
      href: "/admin/careers",
      label: "Careers",
      icon: <Users className="w-5 h-5" />,
    },
    {
      href: "/admin/team",
      label: "Team",
      icon: <User className="w-5 h-5" />,
    },
    {
      href: "/admin/client",
      label: "Clients",
      icon: <Building2 className="w-5 h-5" />,
    },
    {
      href: "/admin/empanelments",
      label: "Empanelments",
      icon: <Award className="w-5 h-5" />,
    },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="lg:hidden fixed top-6 left-6 z-50 p-2.5 rounded-lg bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
      >
        <Menu className="w-5 h-5 text-gray-600" />
      </button>

      {/* Sidebar */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={`h-screen flex flex-col bg-white border-r border-gray-100 transition-all duration-300 ease-in-out fixed lg:relative z-40 ${isCollapsed ? 'w-20' : 'w-64'
          }`}
      >

        {/* Logo Section */}
        <div className="px-6 py-5 border-b border-gray-100">
          <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
            {!isCollapsed ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-3"
              >
                <div className="w-10 h-10 relative">
                  <img
                    src='/assets/logo.png'
                    alt="DERA Logo"
                    className="w-full h-full object-contain rounded-lg"
                  />
                </div>
                <div>
                  <h1 className="text-lg font-semibold text-gray-900 tracking-tight">DCPL Admin</h1>
                  <p className="text-xs text-gray-500 font-light">Management Console</p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="w-10 h-10"
              >
                <img
                  src='/assets/logo.png'
                  alt="DERA Logo"
                  className="w-full h-full object-contain rounded-lg"
                />
              </motion.div>
            )}

            {/* Desktop Toggle Button */}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className={`hidden lg:flex items-center justify-center w-8 h-8 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors ${isCollapsed ? 'absolute -right-4 top-8 bg-white shadow-sm' : ''
                }`}
            >
              <ChevronLeft className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''
                }`} />
            </button>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          <div className="space-y-1">
            {menuItems.map((item, index) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/');

              return (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.03 }}
                  onMouseEnter={() => setHoveredItem(item.href)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <Link
                    href={item.href}
                    className={`relative flex items-center ${isCollapsed ? 'justify-center px-0 py-3' : 'justify-start px-4 py-3'
                      } rounded-lg transition-all duration-200 group ${isActive
                        ? "text-gray-900 bg-gray-50"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                      }`}
                  >
                    {/* Active Indicator Line */}
                    {isActive && !isCollapsed && (
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: 3 }}
                        className="absolute left-0 top-1/2 -translate-y-1/2 h-6 bg-gray-900 rounded-r-full"
                      />
                    )}

                    {/* Icon */}
                    <div className={`relative flex items-center justify-center ${isActive ? 'text-gray-900' : 'text-gray-500'
                      }`}>
                      <div className={`transition-transform duration-200 group-hover:scale-110 ${isCollapsed ? '' : 'mr-3'
                        }`}>
                        {item.icon}
                      </div>
                    </div>

                    {/* Label */}
                    <AnimatePresence>
                      {!isCollapsed && (
                        <motion.span
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          className={`text-sm font-medium flex-1 ${isActive ? "font-semibold" : ""
                            }`}
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>

                    {/* Hover Arrow */}
                    {!isCollapsed && hoveredItem === item.href && !isActive && (
                      <motion.div
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="ml-auto"
                      >
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      </motion.div>
                    )}

                    {/* Tooltip for Collapsed State */}
                    {isCollapsed && hoveredItem === item.href && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute left-full ml-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg whitespace-nowrap z-50"
                      >
                        {item.label}
                        <div className="absolute right-full top-1/2 -translate-y-1/2 w-0 h-0 border-y-[6px] border-l-[6px] border-y-transparent border-l-gray-900" />
                      </motion.div>
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Logout Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-8"
          >
            <button
              onClick={handleLogout}
              className={`relative flex items-center w-full ${isCollapsed ? 'justify-center px-0 py-3' : 'justify-start px-4 py-3'
                } rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200 group`}
            >
              <div className={`flex items-center justify-center ${isCollapsed ? '' : 'mr-3'
                }`}>
                <LogOut className="w-5 h-5 text-gray-500 group-hover:scale-110 transition-transform duration-200" />
              </div>
              
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm font-medium"
                >
                  Logout
                </motion.span>
              )}

              {isCollapsed && hoveredItem === 'logout' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute left-full ml-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg whitespace-nowrap z-50"
                >
                  Logout
                  <div className="absolute right-full top-1/2 -translate-y-1/2 w-0 h-0 border-y-[6px] border-l-[6px] border-y-transparent border-l-gray-900" />
                </motion.div>
              )}
            </button>
          </motion.div>
        </nav>

        {/* User Profile */}
        <div className="px-4 py-4 border-t border-gray-100">
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="flex items-center gap-3"
              >
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                  <span className="text-white text-sm font-medium">A</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">Admin User</p>
                  <p className="text-xs text-gray-500 truncate">Super Administrator</p>
                </div>
                <ShieldCheck className="w-4 h-4 text-green-500" />
              </motion.div>
            )}
          </AnimatePresence>

          {isCollapsed && (
            <div className="flex justify-center">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                <span className="text-white text-sm font-medium">A</span>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Overlay for Mobile */}
      {!isCollapsed && (
        <div
          className="fixed inset-0 bg-black/10 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsCollapsed(true)}
        />
      )}
    </>
  );
}