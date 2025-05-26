
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ResumoAtendimentos } from "@/components/dashboard/ResumoAtendimentos";
import { AgendaDia } from "@/components/dashboard/AgendaDia";
import { IAAssistant } from "@/components/ia/IAAssistant";
import { useAuth } from "@/contexts/AuthContext";
import { indicadoresPNAB, unidadesSaude } from "@/data/mockData";
import { Settings, MapPin, Users, Calendar, Activity, Pill, Syringe, Home, TrendingUp, Eye, EyeOff } from "lucide-react";

const Dashboard = () => {
  const { user } = useAuth();
  const [unidadeSelecionada, setUnidadeSelecionada] = useState(user?.unidadeSaude || "todas");
  const [modoPersonalizacao, setModoPersonalizacao] = useState(false);
  const [widgetsVisiveis, setWidgetsVisiveis] = useState({
    cadastrosAtivos: true,
    demandaEspontanea: true,
    consultasAgendadas: true,
    coberturaTerritorial: true,
    medicamentosDispensados: true,
    vacinasAplicadas: true,
    visitasDomiciliares: true,
    gruposEducativos: true,
    encaminhamentosEspecializados: true,
    atendimentos: true,
    agenda: true,
    assistenteIA: user?.perfis?.includes('ia') || false
  });

  const toggleWidget = (widget: keyof typeof widgetsVisiveis) => {
    setWidgetsVisiveis(prev => ({
      ...prev,
      [widget]: !prev[widget]
    }));
  };

  const unidadeAtual = unidadesSaude.find(u => u.nome === unidadeSelecionada) || unidadesSaude[0];

  // Verificar se usuário tem perfil de IA
  const temPerfilIA = user?.perfis?.includes('ia') || false;

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Painel de Controle</h1>
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
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setModoPersonalizacao(!modoPersonalizacao)}
          >
            <Settings className="h-4 w-4 mr-2" />
            {modoPersonalizacao ? 'Salvar' : 'Personalizar'}
          </Button>
        </div>
      </div>

      <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p><strong>Unidade:</strong> {unidadeSelecionada === "todas" ? "Município Completo" : unidadeSelecionada}</p>
            <p><strong>Usuário:</strong> {user?.name} ({user?.role})</p>
          </div>
          <div>
            <p><strong>Perfis:</strong> {user?.perfis?.join(', ') || 'Básico'}</p>
            <p><strong>Registro:</strong> {user?.crmCoren}</p>
          </div>
        </div>
      </div>

      {/* Modo de Personalização */}
      {modoPersonalizacao && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Personalizar Dashboard</CardTitle>
            <CardDescription>Escolha quais indicadores deseja visualizar</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <Switch 
                  id="cadastros" 
                  checked={widgetsVisiveis.cadastrosAtivos}
                  onCheckedChange={() => toggleWidget('cadastrosAtivos')}
                />
                <Label htmlFor="cadastros">Novos Cadastros</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch 
                  id="demanda" 
                  checked={widgetsVisiveis.demandaEspontanea}
                  onCheckedChange={() => toggleWidget('demandaEspontanea')}
                />
                <Label htmlFor="demanda">Demanda Espontânea</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch 
                  id="consultas" 
                  checked={widgetsVisiveis.consultasAgendadas}
                  onCheckedChange={() => toggleWidget('consultasAgendadas')}
                />
                <Label htmlFor="consultas">Consultas Agendadas</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch 
                  id="medicamentos" 
                  checked={widgetsVisiveis.medicamentosDispensados}
                  onCheckedChange={() => toggleWidget('medicamentosDispensados')}
                />
                <Label htmlFor="medicamentos">Medicamentos</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch 
                  id="vacinas" 
                  checked={widgetsVisiveis.vacinasAplicadas}
                  onCheckedChange={() => toggleWidget('vacinasAplicadas')}
                />
                <Label htmlFor="vacinas">Vacinas</Label>
              </div>
              {temPerfilIA && (
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="ia" 
                    checked={widgetsVisiveis.assistenteIA}
                    onCheckedChange={() => toggleWidget('assistenteIA')}
                  />
                  <Label htmlFor="ia">Assistente IA</Label>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Indicadores Principais */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {widgetsVisiveis.cadastrosAtivos && (
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
        )}

        {widgetsVisiveis.demandaEspontanea && (
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
        )}

        {widgetsVisiveis.consultasAgendadas && (
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
        )}

        {widgetsVisiveis.coberturaTerritorial && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cobertura Territorial</CardTitle>
              <Home className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{indicadoresPNAB.coberturaTerritorial}%</div>
              <p className="text-xs text-muted-foreground">Cobertura da unidade</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Indicadores Secundários */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        {widgetsVisiveis.medicamentosDispensados && (
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
        )}

        {widgetsVisiveis.vacinasAplicadas && (
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
        )}

        {widgetsVisiveis.visitasDomiciliares && (
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
        )}

        {widgetsVisiveis.gruposEducativos && (
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
        )}

        {widgetsVisiveis.encaminhamentosEspecializados && (
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
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {widgetsVisiveis.atendimentos && (
          <div className="md:col-span-2">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Gestão da Atenção Primária</CardTitle>
                <CardDescription>
                  Resumo dos atendimentos e agenda do dia
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
        
        {widgetsVisiveis.assistenteIA && temPerfilIA && (
          <div className="md:col-span-1">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Assistente IA - Relatórios</CardTitle>
                <CardDescription>
                  Suporte inteligente para geração de relatórios
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
