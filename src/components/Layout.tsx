import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Users,
  Calendar,
  Stethoscope,
  Pill,
  Receipt,
  Settings,
  Menu,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const location = useLocation();

  const menuItems = [
    { href: "/", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { href: "/cadastro", label: "Cadastro", icon: <Users size={20} /> },
    { href: "/agendamento", label: "Agendamento", icon: <Calendar size={20} /> },
    { href: "/atendimento-medico", label: "Atend. Médico", icon: <Stethoscope size={20} /> },
    { href: "/atendimento-odontologico", label: "Atend. Odontológico", icon: <Pill size={20} /> },
    { href: "/faturamento", label: "Faturamento", icon: <Receipt size={20} /> },
    { href: "/configuracoes", label: "Configurações", icon: <Settings size={20} /> }
  ];

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile sidebar toggle */}
      <div className="fixed top-0 left-0 z-40 p-4 md:hidden">
        <Button variant="outline" size="icon" onClick={toggleSidebar}>
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-30 w-64 transform bg-white shadow-lg transition-transform duration-200 ease-in-out md:relative md:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-20 items-center justify-center border-b">
          <h1 className="text-xl font-bold text-primary">SaúdeGov</h1>
        </div>
        <nav className="mt-5 px-2">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.href}>
                <Link 
                  to={item.href} 
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-100",
                    location.pathname === item.href && "bg-gray-100 font-medium text-primary"
                  )}
                  onClick={() => setSidebarOpen(false)}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="bg-white shadow-sm z-20">
          <div className="px-4 py-4 flex items-center justify-end md:justify-end">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Dr. João Silva</span>
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                JS
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
