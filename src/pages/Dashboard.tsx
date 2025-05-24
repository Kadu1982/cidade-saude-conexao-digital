
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ResumoAtendimentos } from "@/components/dashboard/ResumoAtendimentos";
import { AgendaDia } from "@/components/dashboard/AgendaDia";
import { IAAssistant } from "@/components/ia/IAAssistant";
import { useAuth } from "@/contexts/AuthContext";
import { Settings, MapPin } from "lucide-react";

const Dashboard = () => {
  const { user } = useAuth();
  const [unidadeSelecionada, setUnidadeSelecionada] = useState(user?.unidadeSaude || "todas");
  const [widgetsVisiveis, setWidgetsVisiveis] = useState({
    atendimentos: true,
    agenda: true,
    assistenteIA: true
  });

  const unidadesSaude = [
    "todas",
    "UBS Centro",
    "UBS Jardim das Flores",
    "UBS Vila Nova",
    "PSF Rural",
    "Hospital Municipal"
  ];

  const toggleWidget = (widget: keyof typeof widgetsVisiveis) => {
    setWidgetsVisiveis(prev => ({
      ...prev,
      [widget]: !prev[widget]
    }));
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Painel de Controle</h1>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <Select value={unidadeSelecionada} onValueChange={setUnidadeSelecionada}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Selecionar unidade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas as Unidades</SelectItem>
                {unidadesSaude.slice(1).map(unidade => (
                  <SelectItem key={unidade} value={unidade}>{unidade}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Personalizar
          </Button>
        </div>
      </div>

      <div className="mb-4 text-sm text-gray-600">
        <p>Dados de: <strong>{unidadeSelecionada === "todas" ? "Município Completo" : unidadeSelecionada}</strong></p>
        <p>Usuário: <strong>{user?.name}</strong> ({user?.role})</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {widgetsVisiveis.atendimentos && (
          <div className="md:col-span-2">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Visão Geral</CardTitle>
                <CardDescription>
                  Resumo das principais informações do sistema
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="atendimentos" className="w-full">
                  <TabsList className="grid grid-cols-2 mb-4">
                    <TabsTrigger value="atendimentos">Atendimentos</TabsTrigger>
                    <TabsTrigger value="agenda">Agenda do Dia</TabsTrigger>
                  </TabsList>
                  <TabsContent value="atendimentos">
                    <ResumoAtendimentos />
                  </TabsContent>
                  <TabsContent value="agenda">
                    <AgendaDia />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        )}
        
        {widgetsVisiveis.assistenteIA && (
          <div className="md:col-span-1">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Assistente IA</CardTitle>
                <CardDescription>
                  Assistência inteligente para suas tarefas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <IAAssistant />
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
