
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Settings, 
  Shield, 
  Users, 
  Mail, 
  Clock, 
  FileText,
  Bell,
  Key,
  Database
} from "lucide-react";

export const ConfiguracoesOuvidoria = () => {
  const [configuracoes, setConfiguracoes] = useState({
    prazosLegais: {
      primeiraAnalise: 72, // horas
      respostaFinal: 30, // dias
      manifestacaoUrgente: 24 // horas
    },
    notificacoes: {
      emailOuvidor: true,
      emailCidadao: true,
      smsLembrete: false,
      whatsappAtivo: false
    },
    politicasPrivacidade: {
      anonimizacaoAutomatica: true,
      retencaoDados: 5, // anos
      consentimentoExplicito: true
    },
    integracoes: {
      cadwebAtivo: true,
      sistemaGestaoAtivo: true,
      emailServiceAtivo: true
    }
  });

  const usuarios = [
    {
      id: '1',
      nome: 'Ana Santos',
      email: 'ana.santos@saude.gov',
      perfil: 'Ouvidor Principal',
      ativo: true,
      ultimoAcesso: new Date('2024-01-25')
    },
    {
      id: '2',
      nome: 'Carlos Silva',
      email: 'carlos.silva@saude.gov',
      perfil: 'Ouvidor Assistente',
      ativo: true,
      ultimoAcesso: new Date('2024-01-24')
    },
    {
      id: '3',
      nome: 'Maria Oliveira',
      email: 'maria.oliveira@saude.gov',
      perfil: 'Analista',
      ativo: false,
      ultimoAcesso: new Date('2024-01-20')
    }
  ];

  const handleSalvarConfiguracoes = () => {
    console.log('Configurações salvas:', configuracoes);
    alert('Configurações salvas com sucesso!');
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="prazos" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="prazos">Prazos</TabsTrigger>
          <TabsTrigger value="usuarios">Usuários</TabsTrigger>
          <TabsTrigger value="notificacoes">Notificações</TabsTrigger>
          <TabsTrigger value="privacidade">Privacidade</TabsTrigger>
          <TabsTrigger value="integracoes">Integrações</TabsTrigger>
          <TabsTrigger value="auditoria">Auditoria</TabsTrigger>
        </TabsList>

        {/* Configurações de Prazos */}
        <TabsContent value="prazos">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Prazos Legais e Operacionais
              </CardTitle>
              <CardDescription>
                Configure os prazos conforme legislação e políticas internas
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Primeira Análise (horas)
                  </label>
                  <input
                    type="number"
                    value={configuracoes.prazosLegais.primeiraAnalise}
                    onChange={(e) => setConfiguracoes(prev => ({
                      ...prev,
                      prazosLegais: {
                        ...prev.prazosLegais,
                        primeiraAnalise: parseInt(e.target.value)
                      }
                    }))}
                    className="w-full p-2 border rounded-md"
                  />
                  <p className="text-xs text-muted-foreground">
                    Prazo para análise inicial da manifestação
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Resposta Final (dias)
                  </label>
                  <input
                    type="number"
                    value={configuracoes.prazosLegais.respostaFinal}
                    onChange={(e) => setConfiguracoes(prev => ({
                      ...prev,
                      prazosLegais: {
                        ...prev.prazosLegais,
                        respostaFinal: parseInt(e.target.value)
                      }
                    }))}
                    className="w-full p-2 border rounded-md"
                  />
                  <p className="text-xs text-muted-foreground">
                    Prazo final para resposta ao cidadão
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Manifestação Urgente (horas)
                  </label>
                  <input
                    type="number"
                    value={configuracoes.prazosLegais.manifestacaoUrgente}
                    onChange={(e) => setConfiguracoes(prev => ({
                      ...prev,
                      prazosLegais: {
                        ...prev.prazosLegais,
                        manifestacaoUrgente: parseInt(e.target.value)
                      }
                    }))}
                    className="w-full p-2 border rounded-md"
                  />
                  <p className="text-xs text-muted-foreground">
                    Prazo para manifestações prioritárias
                  </p>
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-medium text-blue-900 mb-2">Alertas Automáticos</h4>
                <div className="space-y-2 text-sm text-blue-700">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span>Alerta quando 50% do prazo for atingido</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span>Alerta quando 80% do prazo for atingido</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span>Alerta quando o prazo for extrapolado</span>
                  </div>
                </div>
              </div>

              <Button onClick={handleSalvarConfiguracoes} className="w-full">
                Salvar Configurações de Prazos
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Gestão de Usuários */}
        <TabsContent value="usuarios">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Gestão de Usuários
                  </CardTitle>
                  <CardDescription>
                    Gerencie usuários e permissões do sistema de ouvidoria
                  </CardDescription>
                </div>
                <Button>
                  Novo Usuário
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {usuarios.map((usuario) => (
                  <div key={usuario.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">{usuario.nome}</div>
                        <div className="text-sm text-muted-foreground">{usuario.email}</div>
                        <div className="text-xs text-muted-foreground">
                          Último acesso: {usuario.ultimoAcesso.toLocaleDateString('pt-BR')}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={usuario.ativo ? "default" : "secondary"}>
                        {usuario.perfil}
                      </Badge>
                      <Badge variant={usuario.ativo ? "outline" : "destructive"}>
                        {usuario.ativo ? "Ativo" : "Inativo"}
                      </Badge>
                      <Button variant="outline" size="sm">
                        Editar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-muted rounded-lg">
                <h4 className="font-medium mb-3">Perfis de Acesso Disponíveis</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                  <div>
                    <div className="font-medium">Ouvidor Principal</div>
                    <div className="text-muted-foreground">Acesso completo ao sistema</div>
                  </div>
                  <div>
                    <div className="font-medium">Ouvidor Assistente</div>
                    <div className="text-muted-foreground">Gestão de manifestações</div>
                  </div>
                  <div>
                    <div className="font-medium">Analista</div>
                    <div className="text-muted-foreground">Visualização e relatórios</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Configurações de Notificações */}
        <TabsContent value="notificacoes">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Configurações de Notificações
              </CardTitle>
              <CardDescription>
                Configure como e quando as notificações são enviadas
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">Notificações para Ouvidores</h4>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3">
                    <input 
                      type="checkbox" 
                      checked={configuracoes.notificacoes.emailOuvidor}
                      onChange={(e) => setConfiguracoes(prev => ({
                        ...prev,
                        notificacoes: {
                          ...prev.notificacoes,
                          emailOuvidor: e.target.checked
                        }
                      }))}
                      className="rounded" 
                    />
                    <div>
                      <div className="font-medium">E-mail para Ouvidores</div>
                      <div className="text-sm text-muted-foreground">
                        Notificar por e-mail sobre novas manifestações
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Notificações para Cidadãos</h4>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3">
                    <input 
                      type="checkbox" 
                      checked={configuracoes.notificacoes.emailCidadao}
                      onChange={(e) => setConfiguracoes(prev => ({
                        ...prev,
                        notificacoes: {
                          ...prev.notificacoes,
                          emailCidadao: e.target.checked
                        }
                      }))}
                      className="rounded" 
                    />
                    <div>
                      <div className="font-medium">E-mail de Confirmação</div>
                      <div className="text-sm text-muted-foreground">
                        Enviar e-mail com protocolo e updates de status
                      </div>
                    </div>
                  </label>

                  <label className="flex items-center space-x-3">
                    <input 
                      type="checkbox" 
                      checked={configuracoes.notificacoes.smsLembrete}
                      onChange={(e) => setConfiguracoes(prev => ({
                        ...prev,
                        notificacoes: {
                          ...prev.notificacoes,
                          smsLembrete: e.target.checked
                        }
                      }))}
                      className="rounded" 
                    />
                    <div>
                      <div className="font-medium">SMS de Lembrete</div>
                      <div className="text-sm text-muted-foreground">
                        Lembrete por SMS para pesquisa de satisfação
                      </div>
                    </div>
                  </label>

                  <label className="flex items-center space-x-3">
                    <input 
                      type="checkbox" 
                      checked={configuracoes.notificacoes.whatsappAtivo}
                      onChange={(e) => setConfiguracoes(prev => ({
                        ...prev,
                        notificacoes: {
                          ...prev.notificacoes,
                          whatsappAtivo: e.target.checked
                        }
                      }))}
                      className="rounded" 
                    />
                    <div>
                      <div className="font-medium">WhatsApp Business</div>
                      <div className="text-sm text-muted-foreground">
                        Notificações via WhatsApp (requer configuração adicional)
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              <Button onClick={handleSalvarConfiguracoes} className="w-full">
                Salvar Configurações de Notificações
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Configurações de Privacidade */}
        <TabsContent value="privacidade">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Privacidade e LGPD
              </CardTitle>
              <CardDescription>
                Configurações para conformidade com a Lei Geral de Proteção de Dados
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-5 w-5 text-green-600" />
                  <h4 className="font-medium text-green-900">Status de Conformidade LGPD</h4>
                </div>
                <p className="text-sm text-green-700">
                  Sistema configurado em conformidade com a LGPD. Todas as políticas estão ativas.
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Políticas de Privacidade</h4>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3">
                    <input 
                      type="checkbox" 
                      checked={configuracoes.politicasPrivacidade.consentimentoExplicito}
                      onChange={(e) => setConfiguracoes(prev => ({
                        ...prev,
                        politicasPrivacidade: {
                          ...prev.politicasPrivacidade,
                          consentimentoExplicito: e.target.checked
                        }
                      }))}
                      className="rounded" 
                    />
                    <div>
                      <div className="font-medium">Consentimento Explícito Obrigatório</div>
                      <div className="text-sm text-muted-foreground">
                        Exigir consentimento explícito para tratamento de dados
                      </div>
                    </div>
                  </label>

                  <label className="flex items-center space-x-3">
                    <input 
                      type="checkbox" 
                      checked={configuracoes.politicasPrivacidade.anonimizacaoAutomatica}
                      onChange={(e) => setConfiguracoes(prev => ({
                        ...prev,
                        politicasPrivacidade: {
                          ...prev.politicasPrivacidade,
                          anonimizacaoAutomatica: e.target.checked
                        }
                      }))}
                      className="rounded" 
                    />
                    <div>
                      <div className="font-medium">Anonimização Automática</div>
                      <div className="text-sm text-muted-foreground">
                        Anonimizar dados pessoais em relatórios públicos
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Período de Retenção de Dados (anos)
                </label>
                <input
                  type="number"
                  value={configuracoes.politicasPrivacidade.retencaoDados}
                  onChange={(e) => setConfiguracoes(prev => ({
                    ...prev,
                    politicasPrivacidade: {
                      ...prev.politicasPrivacidade,
                      retencaoDados: parseInt(e.target.value)
                    }
                  }))}
                  className="w-full p-2 border rounded-md"
                />
                <p className="text-xs text-muted-foreground">
                  Após este período, dados pessoais serão automaticamente excluídos
                </p>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-medium text-blue-900 mb-2">Direitos dos Titulares</h4>
                <div className="space-y-2 text-sm text-blue-700">
                  <div>✓ Direito de acesso aos dados</div>
                  <div>✓ Direito de correção de dados</div>
                  <div>✓ Direito de exclusão de dados</div>
                  <div>✓ Direito de portabilidade</div>
                  <div>✓ Direito de revogação do consentimento</div>
                </div>
              </div>

              <Button onClick={handleSalvarConfiguracoes} className="w-full">
                Salvar Configurações de Privacidade
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Configurações de Integrações */}
        <TabsContent value="integracoes">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Integrações de Sistema
              </CardTitle>
              <CardDescription>
                Configure integrações com sistemas externos e internos
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                {[
                  {
                    id: 'cadweb',
                    nome: 'CADWEB/CNS',
                    descricao: 'Validação de usuários SUS',
                    status: configuracoes.integracoes.cadwebAtivo,
                    endpoint: 'https://servicos.saude.gov.br/cns',
                    key: 'cadwebAtivo'
                  },
                  {
                    id: 'gestao',
                    nome: 'Sistema de Gestão',
                    descricao: 'Integração com sistema principal de saúde',
                    status: configuracoes.integracoes.sistemaGestaoAtivo,
                    endpoint: 'https://sistema.saude.local/api',
                    key: 'sistemaGestaoAtivo'
                  },
                  {
                    id: 'email',
                    nome: 'Serviço de E-mail',
                    descricao: 'Envio de notificações por e-mail',
                    status: configuracoes.integracoes.emailServiceAtivo,
                    endpoint: 'smtp.servidor.gov.br:587',
                    key: 'emailServiceAtivo'
                  }
                ].map((integracao) => (
                  <div key={integracao.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <Database className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">{integracao.nome}</div>
                        <div className="text-sm text-muted-foreground">{integracao.descricao}</div>
                        <div className="text-xs text-muted-foreground font-mono">
                          {integracao.endpoint}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={integracao.status ? "outline" : "destructive"}>
                        {integracao.status ? "Ativo" : "Inativo"}
                      </Badge>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={integracao.status}
                          onChange={(e) => setConfiguracoes(prev => ({
                            ...prev,
                            integracoes: {
                              ...prev.integracoes,
                              [integracao.key]: e.target.checked
                            }
                          }))}
                          className="rounded"
                        />
                      </label>
                      <Button variant="outline" size="sm">
                        Testar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <Button onClick={handleSalvarConfiguracoes} className="w-full">
                Salvar Configurações de Integrações
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Auditoria e Logs */}
        <TabsContent value="auditoria">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Auditoria e Logs
              </CardTitle>
              <CardDescription>
                Configurações de auditoria e rastreabilidade do sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Configurações de Log</h4>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <div>
                        <div className="font-medium">Log de Acessos</div>
                        <div className="text-sm text-muted-foreground">
                          Registrar todos os acessos ao sistema
                        </div>
                      </div>
                    </label>

                    <label className="flex items-center space-x-3">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <div>
                        <div className="font-medium">Log de Modificações</div>
                        <div className="text-sm text-muted-foreground">
                          Registrar alterações em manifestações
                        </div>
                      </div>
                    </label>

                    <label className="flex items-center space-x-3">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <div>
                        <div className="font-medium">Log de Exportações</div>
                        <div className="text-sm text-muted-foreground">
                          Registrar exportação de relatórios
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Retenção de Logs</h4>
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Período de Retenção (meses)
                      </label>
                      <input
                        type="number"
                        defaultValue={24}
                        className="w-full p-2 border rounded-md"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Backup Automático
                      </label>
                      <select className="w-full p-2 border rounded-md">
                        <option>Diário</option>
                        <option>Semanal</option>
                        <option>Mensal</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-medium mb-2">Logs Recentes</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>2024-01-25 14:30 - Login: ana.santos@saude.gov</span>
                    <span className="text-muted-foreground">INFO</span>
                  </div>
                  <div className="flex justify-between">
                    <span>2024-01-25 14:25 - Manifestação OUV12345678 criada</span>
                    <span className="text-muted-foreground">INFO</span>
                  </div>
                  <div className="flex justify-between">
                    <span>2024-01-25 14:20 - Relatório exportado por carlos.silva@saude.gov</span>
                    <span className="text-muted-foreground">INFO</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="mt-3">
                  Ver Todos os Logs
                </Button>
              </div>

              <Button onClick={handleSalvarConfiguracoes} className="w-full">
                Salvar Configurações de Auditoria
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
