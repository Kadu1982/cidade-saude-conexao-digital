
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ResumoAtendimentos } from "@/components/dashboard/ResumoAtendimentos";
import { AgendaDia } from "@/components/dashboard/AgendaDia";
import { IAAssistant } from "@/components/ia/IAAssistant";
import { useAuth } from "@/contexts/AuthContext";
import { indicadoresPNAB, unidadesSaude } from "@/data/mockData";
import { Settings, MapPin, Users, Calendar, Activity, Pill, Syringe, Home, TrendingUp } from "lucide-react";

const Dashboard = () => {
  const { user } = useAuth();
  const [unidadeSelecionada, setUnidadeSelecionada] = useState(user?.unidadeSaude || "todas");
  const [widgetsVisiveis, setWidgetsVisiveis] = useState({
    indicadoresPNAB: true,
    atendimentos: true,
    agenda: true,
    assistenteIA: true,
    territorial: true
  });

  const toggleWidget = (widget: keyof typeof widgetsVisiveis) => {
    setWidgetsVisiveis(prev => ({
      ...prev,
      [widget]: !prev[widget]
    }));
  };

  const unidadeAtual = unidadesSaude.find(u => u.nome === unidadeSelecionada) || unidadesSaude[0];

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Painel de Controle - PNAB</h1>
          <p className="text-sm text-gray-600">Sistema de Gestão da Atenção Primária à Saúde</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <Select value={unidadeSelecionada} onValueChange={setUnidadeSelecionada}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Selecionar unidade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Município Completo</SelectItem>
                {unidadesSaude.map(unidade => (
                  <SelectItem key={unidade.id} value={unidade.nome}>{unidade.nome}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <Button variant="outline" size="sm" onClick={() => toggleWidget('indicadoresPNAB')}>
            <Settings className="h-4 w-4 mr-2" />
            Personalizar
          </Button>
        </div>
      </div>

      <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <p><strong>Unidade:</strong> {unidadeSelecionada === "todas" ? "Município Completo" : unidadeSelecionada}</p>
            <p><strong>Usuário:</strong> {user?.name} ({user?.role})</p>
          </div>
          <div>
            <p><strong>CNS:</strong> {user?.cns}</p>
            <p><strong>Registro:</strong> {user?.crmCoren}</p>
          </div>
          <div>
            {unidadeAtual && unidadeSelecionada !== "todas" && (
              <>
                <p><strong>População Adscrita:</strong> {unidadeAtual.populacaoAdscrita.toLocaleString()}</p>
                <p><strong>Equipes ESF:</strong> {unidadeAtual.equipesESF}</p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Indicadores PNAB */}
      {widgetsVisiveis.indicadoresPNAB && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Novos Cadastros</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{indicadoresPNAB.cadastrosAtivos.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Cadastros ativos no território</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Demanda Espontânea</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{indicadoresPNAB.atendimentosDemandaEspontanea}</div>
              <p className="text-xs text-muted-foreground">Atendimentos sem agendamento</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Consultas Agendadas</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{indicadoresPNAB.consultasAgendadas}</div>
              <p className="text-xs text-muted-foreground">Consultas programadas</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cobertura ESF</CardTitle>
              <Home className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{indicadoresPNAB.coberturaTerritorial}%</div>
              <p className="text-xs text-muted-foreground">Estratégia Saúde da Família</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Indicadores Secundários PNAB */}
      {widgetsVisiveis.territorial && (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Medicamentos</CardTitle>
              <Pill className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold">{indicadoresPNAB.medicamentosDispensados}</div>
              <p className="text-xs text-muted-foreground">Dispensados</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Vacinas</CardTitle>
              <Syringe className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold">{indicadoresPNAB.vacinasAplicadas}</div>
              <p className="text-xs text-muted-foreground">Aplicadas</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Visitas Domiciliares</CardTitle>
              <Home className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold">{indicadoresPNAB.visitasDomiciliares}</div>
              <p className="text-xs text-muted-foreground">Realizadas</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Grupos Educativos</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold">{indicadoresPNAB.gruposEducativos}</div>
              <p className="text-xs text-muted-foreground">Ativos</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Encaminhamentos</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold">{indicadoresPNAB.encaminhamentosEspecializados}</div>
              <p className="text-xs text-muted-foreground">Especializados</p>
            </CardContent>
          </Card>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {widgetsVisiveis.atendimentos && (
          <div className="md:col-span-2">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Gestão da Atenção Primária</CardTitle>
                <CardDescription>
                  Indicadores baseados na PNAB - Política Nacional de Atenção Básica
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
                <CardTitle>Assistente IA - PNAB</CardTitle>
                <CardDescription>
                  Suporte inteligente baseado nas diretrizes da Atenção Primária
                </CardDescription>
              </CardHeader>
              <CardContent>
                <IAAssistant />
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Resumo Normativo PNAB */}
      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Diretrizes PNAB em Vigor</CardTitle>
            <CardDescription>
              Principais normativas da Política Nacional de Atenção Básica
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-semibold mb-2">Normativas Principais:</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• Portaria nº 2.436/GM/MS 2017 (PNAB vigente)</li>
                  <li>• Portaria nº 2.979/GM/MS 2019 (Previne Brasil)</li>
                  <li>• Lei nº 8.080/1990 (Lei Orgânica da Saúde)</li>
                  <li>• Constituição Federal 1988 (Art. 196)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Princípios Fundamentais:</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• Universalidade, equidade e integralidade</li>
                  <li>• Territorialização e adstrição</li>
                  <li>• Coordenação do cuidado nas RAS</li>
                  <li>• Participação social</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
