import React from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Calendar,
  Stethoscope,
  Pill,
  Receipt,
  Settings,
  Menu,
  X,
  MessageSquare,
  Leaf,
  Shield,
  TrendingUp,
  Syringe,
  Truck,
  LogOut,
  User,
  UserCheck
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

const Layout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const location = useLocation();
  const { user, logout, hasPermission } = useAuth();

  const menuItems = [
    { href: "/dashboard", label: "Dashboard", icon: <LayoutDashboard size={20} />, permission: "dashboard" },
    { href: "/recepcao", label: "Recepção", icon: <UserCheck size={20} />, permission: "recepcao" },
    { href: "/agendamento", label: "Agendamento", icon: <Calendar size={20} />, permission: "agendamento" },
    { href: "/atendimento-medico", label: "Atend. Médico", icon: <Stethoscope size={20} />, permission: "atendimento-medico" },
    { href: "/atendimento-odontologico", label: "Atend. Odontológico", icon: <Pill size={20} />, permission: "atendimento-odontologico" },
    { href: "/exames", label: "Exames", icon: <Receipt size={20} />, permission: "exames" },
    { href: "/farmacia", label: "Farmácia", icon: <Pill size={20} />, permission: "farmacia" },
    { href: "/vacinas", label: "Vacinas", icon: <Syringe size={20} />, permission: "vacinas" },
    { href: "/ouvidoria", label: "Ouvidoria", icon: <MessageSquare size={20} />, permission: "ouvidoria" },
    { href: "/vigilancia-ambiental", label: "Vig. Ambiental", icon: <Leaf size={20} />, permission: "vigilancia" },
    { href: "/vigilancia-sanitaria", label: "Vig. Sanitária", icon: <Shield size={20} />, permission: "vigilancia" },
    { href: "/epidemiologia", label: "Epidemiologia", icon: <TrendingUp size={20} />, permission: "epidemiologia" },
    { href: "/transporte", label: "Transporte", icon: <Truck size={20} />, permission: "transporte" },
    { href: "/faturamento", label: "Faturamento", icon: <Receipt size={20} />, permission: "faturamento" },
    { href: "/configuracoes", label: "Configurações", icon: <Settings size={20} />, permission: "configuracoes" }
  ];

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleLogout = () => {
    logout();
  };

  // Filter menu items based on user permissions
  const filteredMenuItems = menuItems.filter(item => 
    hasPermission(item.permission) || hasPermission('*')
  );

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
          <div className="text-center">
            <h1 className="text-xl font-bold text-primary">SaúdeGov</h1>
            <p className="text-xs text-gray-500">PNAB 2017</p>
          </div>
        </div>
        <nav className="mt-5 px-2 flex-1 overflow-y-auto">
          <ul className="space-y-2">
            {filteredMenuItems.map((item) => (
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

        {/* Footer da Sidebar com informações do usuário */}
        {user && (
          <div className="p-4 border-t bg-gray-50">
            <div className="text-xs text-gray-600">
              <p className="font-medium">{user.name}</p>
              <p>CNS: {user.cns}</p>
              {user.crmCoren && <p>{user.crmCoren}</p>}
              <p className="text-gray-400">{user.unidadeSaude}</p>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {user && (
          <header className="bg-white shadow-sm z-20">
            <div className="px-4 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{user.name}</span>
                  <span className="text-xs text-gray-500">
                    {user.role} - CNS: {user.cns}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-right text-sm">
                  <div className="font-medium">{user.name}</div>
                  <div className="text-gray-500 text-xs">{user.unidadeSaude}</div>
                </div>
                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                  {user.name?.split(' ').map(n => n[0]).join('').toUpperCase()}
                </div>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </header>
        )}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
