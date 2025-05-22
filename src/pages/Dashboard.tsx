
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResumoAtendimentos } from "@/components/dashboard/ResumoAtendimentos";
import { AgendaDia } from "@/components/dashboard/AgendaDia";
import { IAAssistant } from "@/components/ia/IAAssistant";

const Dashboard = () => {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Painel de Controle</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
      </div>
    </div>
  );
};

export default Dashboard;
