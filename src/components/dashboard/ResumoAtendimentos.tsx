
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Activity, 
  Calendar, 
  ClipboardCheck, 
  UserPlus, 
  Pill,
  Stethoscope,
  Users
} from "lucide-react";

export const ResumoAtendimentos = () => {
  return (
    <Tabs defaultValue="hoje" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="hoje">Hoje</TabsTrigger>
        <TabsTrigger value="semana">Semana</TabsTrigger>
        <TabsTrigger value="mes">Mês</TabsTrigger>
      </TabsList>
      
      <TabsContent value="hoje" className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <StatCard 
            icon={<Calendar className="h-6 w-6 text-blue-500" />}
            title="Agendamentos"
            value="24"
            change="+5% em relação a ontem"
            changePositive={true}
          />
          <StatCard 
            icon={<Stethoscope className="h-6 w-6 text-green-500" />}
            title="Consultas Realizadas"
            value="18"
            change="+12% em relação a ontem"
            changePositive={true}
          />
          <StatCard 
            icon={<ClipboardCheck className="h-6 w-6 text-purple-500" />}
            title="Exames Realizados"
            value="32"
            change="-3% em relação a ontem"
            changePositive={false}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard 
            icon={<Pill className="h-6 w-6 text-amber-500" />}
            title="Atendimentos Odontológicos"
            value="9"
            change="Mesmo número de ontem"
            changeNeutral={true}
          />
          <StatCard 
            icon={<UserPlus className="h-6 w-6 text-red-500" />}
            title="Novos Cadastros"
            value="5"
            change="+25% em relação a ontem"
            changePositive={true}
          />
          <StatCard 
            icon={<Users className="h-6 w-6 text-indigo-500" />}
            title="Demanda Espontânea"
            value="12"
            change="+8% em relação a ontem"
            changePositive={true}
          />
        </div>
      </TabsContent>
      
      <TabsContent value="semana" className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <StatCard 
            icon={<Calendar className="h-6 w-6 text-blue-500" />}
            title="Agendamentos"
            value="147"
            change="+8% em relação à semana anterior"
            changePositive={true}
          />
          <StatCard 
            icon={<Stethoscope className="h-6 w-6 text-green-500" />}
            title="Consultas Realizadas"
            value="112"
            change="+5% em relação à semana anterior"
            changePositive={true}
          />
          <StatCard 
            icon={<ClipboardCheck className="h-6 w-6 text-purple-500" />}
            title="Exames Realizados"
            value="185"
            change="+10% em relação à semana anterior"
            changePositive={true}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard 
            icon={<Pill className="h-6 w-6 text-amber-500" />}
            title="Atendimentos Odontológicos"
            value="58"
            change="+12% em relação à semana anterior"
            changePositive={true}
          />
          <StatCard 
            icon={<UserPlus className="h-6 w-6 text-red-500" />}
            title="Novos Cadastros"
            value="32"
            change="+15% em relação à semana anterior"
            changePositive={true}
          />
          <StatCard 
            icon={<Users className="h-6 w-6 text-indigo-500" />}
            title="Demanda Espontânea"
            value="78"
            change="+10% em relação à semana anterior"
            changePositive={true}
          />
        </div>
      </TabsContent>
      
      <TabsContent value="mes" className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <StatCard 
            icon={<Calendar className="h-6 w-6 text-blue-500" />}
            title="Agendamentos"
            value="620"
            change="+12% em relação ao mês anterior"
            changePositive={true}
          />
          <StatCard 
            icon={<Stethoscope className="h-6 w-6 text-green-500" />}
            title="Consultas Realizadas"
            value="475"
            change="+8% em relação ao mês anterior"
            changePositive={true}
          />
          <StatCard 
            icon={<ClipboardCheck className="h-6 w-6 text-purple-500" />}
            title="Exames Realizados"
            value="780"
            change="+15% em relação ao mês anterior"
            changePositive={true}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard 
            icon={<Pill className="h-6 w-6 text-amber-500" />}
            title="Atendimentos Odontológicos"
            value="245"
            change="+9% em relação ao mês anterior"
            changePositive={true}
          />
          <StatCard 
            icon={<UserPlus className="h-6 w-6 text-red-500" />}
            title="Novos Cadastros"
            value="128"
            change="+18% em relação ao mês anterior"
            changePositive={true}
          />
          <StatCard 
            icon={<Users className="h-6 w-6 text-indigo-500" />}
            title="Demanda Espontânea"
            value="342"
            change="+15% em relação ao mês anterior"
            changePositive={true}
          />
        </div>
      </TabsContent>
    </Tabs>
  );
};

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  change: string;
  changePositive?: boolean;
  changeNeutral?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ 
  icon, 
  title, 
  value, 
  change,
  changePositive = false,
  changeNeutral = false
}) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <span className="rounded-lg">{icon}</span>
          <span 
            className={`text-xs font-medium ${
              changeNeutral 
                ? "text-gray-500" 
                : changePositive 
                  ? "text-green-600" 
                  : "text-red-600"
            }`}
          >
            {change}
          </span>
        </div>
        <div className="mt-4">
          <h4 className="text-2xl font-bold">{value}</h4>
          <p className="text-sm text-muted-foreground">{title}</p>
        </div>
      </CardContent>
    </Card>
  );
};
