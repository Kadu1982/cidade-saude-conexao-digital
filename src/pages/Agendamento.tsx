
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AgendarConsulta } from "@/components/agendamento/AgendarConsulta";
import { AgendarExame } from "@/components/agendamento/AgendarExame";
import { AgendamentoCalendario } from "@/components/agendamento/AgendamentoCalendario";
import { GestaoAgendas } from "@/components/agendamento/GestaoAgendas";
import { ListaEsperaInteligente } from "@/components/agendamento/ListaEsperaInteligente";

const Agendamento = () => {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Sistema Integrado de Agendamento SUS</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Gerenciamento Completo de Agendamentos</CardTitle>
          <CardDescription>
            Sistema automatizado com IA, validações SUS, regulação ambulatorial e integração com sistemas do Ministério da Saúde
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="calendario" className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="calendario">Calendário</TabsTrigger>
              <TabsTrigger value="agendar-consulta">Agendar Consulta</TabsTrigger>
              <TabsTrigger value="agendar-exame">Agendar Exame</TabsTrigger>
            </TabsList>
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="gestao-agendas">Gestão de Agendas</TabsTrigger>
              <TabsTrigger value="lista-espera">Lista de Espera IA</TabsTrigger>
            </TabsList>
            
            <TabsContent value="calendario">
              <AgendamentoCalendario />
            </TabsContent>
            <TabsContent value="agendar-consulta">
              <AgendarConsulta />
            </TabsContent>
            <TabsContent value="agendar-exame">
              <AgendarExame />
            </TabsContent>
            <TabsContent value="gestao-agendas">
              <GestaoAgendas />
            </TabsContent>
            <TabsContent value="lista-espera">
              <ListaEsperaInteligente />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Agendamento;
