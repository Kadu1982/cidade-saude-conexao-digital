
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, Users, AlertTriangle, Settings, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { baseCadastro, Agenda, Profissional, UnidadeSaude } from "@/services/baseCadastro";
import { agendamentoIA } from "@/services/agendamentoIA";

export const GestaoAgendas = () => {
  const { toast } = useToast();
  const [agendas, setAgendas] = useState<Agenda[]>([]);
  const [profissionais, setProfissionais] = useState<Profissional[]>([]);
  const [unidades, setUnidades] = useState<UnidadeSaude[]>([]);
  const [filtroEspecialidade, setFiltroEspecialidade] = useState("");
  const [filtroUnidade, setFiltroUnidade] = useState("");

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = () => {
    const dados = baseCadastro.buscarDadosCompletos();
    setAgendas(dados.agendas);
    setProfissionais(dados.profissionais);
    setUnidades(dados.unidades);
  };

  const agendasFiltradas = agendas.filter(agenda => {
    return (!filtroEspecialidade || agenda.especialidade.includes(filtroEspecialidade)) &&
           (!filtroUnidade || agenda.unidadeId === filtroUnidade);
  });

  const criarNovaAgenda = () => {
    toast({
      title: "Funcionalidade em desenvolvimento",
      description: "A criação de agendas será implementada na próxima versão",
    });
  };

  const bloquearAgenda = (agendaId: string) => {
    const agenda = baseCadrastro.buscarAgenda(agendaId);
    if (agenda) {
      agenda.bloqueada = !agenda.bloqueada;
      agenda.motivoBloqueio = agenda.bloqueada ? "Bloqueio manual" : undefined;
      agenda.atualizadaEm = new Date();
      
      toast({
        title: agenda.bloqueada ? "Agenda bloqueada" : "Agenda desbloqueada",
        description: `Agenda ${agenda.bloqueada ? "bloqueada" : "liberada"} com sucesso`,
      });
      
      carregarDados();
    }
  };

  const getStatusBadge = (agenda: Agenda) => {
    if (agenda.bloqueada) {
      return <Badge variant="destructive">Bloqueada</Badge>;
    }
    
    const ocupacao = agenda.cotaTotal > 0 ? (agenda.cotaUtilizada / agenda.cotaTotal) * 100 : 0;
    
    if (ocupacao >= 90) {
      return <Badge variant="destructive">Lotada</Badge>;
    } else if (ocupacao >= 70) {
      return <Badge className="bg-amber-100 text-amber-800">Alta demanda</Badge>;
    } else if (ocupacao >= 40) {
      return <Badge className="bg-green-100 text-green-800">Disponível</Badge>;
    } else {
      return <Badge variant="secondary">Baixa demanda</Badge>;
    }
  };

  const calcularOcupacao = (agenda: Agenda) => {
    return agenda.cotaTotal > 0 ? Math.round((agenda.cotaUtilizada / agenda.cotaTotal) * 100) : 0;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Gestão de Agendas</h2>
          <p className="text-muted-foreground">
            Gerencie agendas por profissional, especialidade e unidade
          </p>
        </div>
        <Button onClick={criarNovaAgenda} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Nova Agenda
        </Button>
      </div>

      <Tabs defaultValue="visao-geral" className="w-full">
        <TabsList className="grid grid-cols-4">
          <TabsTrigger value="visao-geral">Visão Geral</TabsTrigger>
          <TabsTrigger value="por-profissional">Por Profissional</TabsTrigger>
          <TabsTrigger value="por-especialidade">Por Especialidade</TabsTrigger>
          <TabsTrigger value="configuracoes">Configurações</TabsTrigger>
        </TabsList>

        <TabsContent value="visao-geral" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">Total de Agendas</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{agendas.length}</div>
                <p className="text-xs text-muted-foreground">
                  {agendas.filter(a => !a.bloqueada).length} ativas
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">Ocupação Média</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {agendas.length > 0 
                    ? Math.round(agendas.reduce((acc, a) => acc + calcularOcupacao(a), 0) / agendas.length)
                    : 0}%
                </div>
                <p className="text-xs text-muted-foreground">
                  Últimos 30 dias
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">Agendas Bloqueadas</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {agendas.filter(a => a.bloqueada).length}
                </div>
                <p className="text-xs text-muted-foreground">
                  Requer atenção
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">Horários Disponíveis</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {agendas.reduce((acc, a) => acc + (a.cotaTotal - a.cotaUtilizada), 0)}
                </div>
                <p className="text-xs text-muted-foreground">
                  Próximos 7 dias
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Agendas por Status</CardTitle>
              <CardDescription>
                Visualize o status atual de todas as agendas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {agendasFiltradas.map((agenda) => {
                  const profissional = profissionais.find(p => p.id === agenda.profissionalId);
                  const unidade = unidades.find(u => u.id === agenda.unidadeId);
                  
                  return (
                    <Card key={agenda.id} className="border">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-sm">{agenda.especialidade}</CardTitle>
                            <CardDescription className="text-xs">
                              {profissional?.nome}
                            </CardDescription>
                          </div>
                          {getStatusBadge(agenda)}
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Unidade:</span>
                          <span className="font-medium">{unidade?.nome}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Data:</span>
                          <span className="font-medium">
                            {agenda.data.toLocaleDateString('pt-BR')}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Ocupação:</span>
                          <span className="font-medium">
                            {agenda.cotaUtilizada}/{agenda.cotaTotal} ({calcularOcupacao(agenda)}%)
                          </span>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => bloquearAgenda(agenda.id)}
                            className="flex-1"
                          >
                            {agenda.bloqueada ? 'Desbloquear' : 'Bloquear'}
                          </Button>
                          <Button size="sm" variant="outline">
                            <Settings className="h-3 w-3" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="por-profissional">
          <Card>
            <CardHeader>
              <CardTitle>Agendas por Profissional</CardTitle>
              <CardDescription>
                Visualize e gerencie agendas organizadas por profissional
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {profissionais.map((profissional) => {
                  const agendasProfissional = agendas.filter(a => a.profissionalId === profissional.id);
                  
                  if (agendasProfissional.length === 0) return null;
                  
                  return (
                    <Card key={profissional.id} className="border">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-lg">{profissional.nome}</CardTitle>
                            <CardDescription>
                              CNS: {profissional.cns} • Registro: {profissional.registro}
                            </CardDescription>
                          </div>
                          <Badge variant="secondary">
                            {agendasProfissional.length} agenda(s)
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                          {agendasProfissional.map((agenda) => {
                            const unidade = unidades.find(u => u.id === agenda.unidadeId);
                            
                            return (
                              <div key={agenda.id} className="p-3 border rounded-lg">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="font-medium text-sm">{agenda.especialidade}</span>
                                  {getStatusBadge(agenda)}
                                </div>
                                <div className="space-y-1 text-xs text-muted-foreground">
                                  <div>📍 {unidade?.nome}</div>
                                  <div>📅 {agenda.data.toLocaleDateString('pt-BR')}</div>
                                  <div>👥 {agenda.cotaUtilizada}/{agenda.cotaTotal}</div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="por-especialidade">
          <Card>
            <CardHeader>
              <CardTitle>Agendas por Especialidade</CardTitle>
              <CardDescription>
                Análise de demanda e disponibilidade por especialidade médica
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Array.from(new Set(agendas.map(a => a.especialidade))).map((especialidade) => {
                  const agendasEspecialidade = agendas.filter(a => a.especialidade === especialidade);
                  const totalVagas = agendasEspecialidade.reduce((acc, a) => acc + a.cotaTotal, 0);
                  const vagasUtilizadas = agendasEspecialidade.reduce((acc, a) => acc + a.cotaUtilizada, 0);
                  const ocupacaoMedia = totalVagas > 0 ? Math.round((vagasUtilizadas / totalVagas) * 100) : 0;
                  
                  return (
                    <Card key={especialidade} className="border">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{especialidade}</CardTitle>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary">{agendasEspecialidade.length} agenda(s)</Badge>
                            <Badge className={ocupacaoMedia >= 80 ? "bg-red-100 text-red-800" : ocupacaoMedia >= 60 ? "bg-amber-100 text-amber-800" : "bg-green-100 text-green-800"}>
                              {ocupacaoMedia}% ocupação
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Total de Vagas:</span>
                            <div className="font-bold text-lg">{totalVagas}</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Vagas Utilizadas:</span>
                            <div className="font-bold text-lg">{vagasUtilizadas}</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Vagas Disponíveis:</span>
                            <div className="font-bold text-lg">{totalVagas - vagasUtilizadas}</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="configuracoes">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Agenda</CardTitle>
              <CardDescription>
                Configure parâmetros globais do sistema de agendamento
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Parâmetros de Agendamento</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Antecedência mínima (dias)</label>
                      <input type="number" className="w-full p-2 border rounded-md" defaultValue={1} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Antecedência máxima (dias)</label>
                      <input type="number" className="w-full p-2 border rounded-md" defaultValue={60} />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Configurações de Notificação</h3>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked />
                      <span className="text-sm">Enviar lembrete 24h antes</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked />
                      <span className="text-sm">Enviar lembrete 2h antes</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" />
                      <span className="text-sm">Notificação por WhatsApp</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Regras de Cancelamento</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Antecedência mínima para cancelamento (horas)</label>
                      <input type="number" className="w-full p-2 border rounded-md" defaultValue={2} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Máximo de faltas permitidas</label>
                      <input type="number" className="w-full p-2 border rounded-md" defaultValue={3} />
                    </div>
                  </div>
                </div>

                <Button className="w-full">Salvar Configurações</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
