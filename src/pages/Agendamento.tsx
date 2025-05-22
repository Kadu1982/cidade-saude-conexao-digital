
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AgendarConsulta } from "@/components/agendamento/AgendarConsulta";
import { AgendarExame } from "@/components/agendamento/AgendarExame";
import { AgendamentoCalendario } from "@/components/agendamento/AgendamentoCalendario";

const Agendamento = () => {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Agendamento</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Gerenciamento de Agendamentos</CardTitle>
          <CardDescription>
            Agende consultas médicas e exames para os munícipes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="calendario" className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="calendario">Calendário</TabsTrigger>
              <TabsTrigger value="consulta">Agendar Consulta</TabsTrigger>
              <TabsTrigger value="exame">Agendar Exame</TabsTrigger>
            </TabsList>
            <TabsContent value="calendario">
              <AgendamentoCalendario />
            </TabsContent>
            <TabsContent value="consulta">
              <AgendarConsulta />
            </TabsContent>
            <TabsContent value="exame">
              <AgendarExame />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Agendamento;
