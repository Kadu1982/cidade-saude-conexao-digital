
// Base única de cadastro para centralizar todas as informações do sistema
export interface Paciente {
  id: string;
  nome: string;
  cpf: string;
  cartaoSus: string;
  dataNascimento: Date;
  sexo: 'M' | 'F';
  telefone?: string;
  email?: string;
  endereco: {
    logradouro: string;
    numero: string;
    complemento?: string;
    bairro: string;
    cidade: string;
    uf: string;
    cep: string;
  };
  dadosClinicos: {
    tipoSanguineo?: string;
    alergias?: string[];
    medicamentosEmUso?: string[];
    condicoesCronicas?: string[];
  };
  prioridade: 'normal' | 'prioritario' | 'urgente';
  criadoEm: Date;
  atualizadoEm: Date;
}

export interface Profissional {
  id: string;
  nome: string;
  cpf: string;
  cns: string;
  registro: string;
  especialidades: string[];
  unidades: string[];
  horarios: HorarioProfissional[];
  ativo: boolean;
  criadoEm: Date;
  atualizadoEm: Date;
}

export interface UnidadeSaude {
  id: string;
  nome: string;
  cnpj: string;
  cnes: string;
  tipo: 'UBS' | 'Hospital' | 'Policlinica' | 'CEO' | 'CAPS';
  endereco: {
    logradouro: string;
    numero: string;
    bairro: string;
    cidade: string;
    uf: string;
    cep: string;
  };
  telefone: string;
  email?: string;
  servicos: string[];
  equipamentos: string[];
  ativo: boolean;
  criadoEm: Date;
  atualizadoEm: Date;
}

export interface HorarioProfissional {
  diaSemana: number; // 0-6 (domingo-sábado)
  horaInicio: string;
  horaFim: string;
  intervalos?: { inicio: string; fim: string; }[];
}

export interface Agenda {
  id: string;
  profissionalId: string;
  unidadeId: string;
  especialidade: string;
  data: Date;
  horarios: SlotHorario[];
  cotaTotal: number;
  cotaUtilizada: number;
  cotaReservada: number;
  bloqueada: boolean;
  motivoBloqueio?: string;
  criadaEm: Date;
  atualizadaEm: Date;
}

export interface SlotHorario {
  hora: string;
  disponivel: boolean;
  agendamentoId?: string;
  reservadoAte?: Date;
  tipo: 'normal' | 'encaixe' | 'urgencia';
}

export interface Agendamento {
  id: string;
  pacienteId: string;
  agendaId: string;
  data: Date;
  hora: string;
  tipo: 'consulta' | 'exame' | 'procedimento';
  status: 'agendado' | 'confirmado' | 'realizado' | 'cancelado' | 'faltou';
  prioridade: 'normal' | 'prioritario' | 'urgente';
  observacoes?: string;
  protocoloSus?: string;
  codigoConfirmacao: string;
  qrCode?: string;
  notificacaoEnviada: boolean;
  criadoEm: Date;
  atualizadoEm: Date;
}

export interface ListaEspera {
  id: string;
  pacienteId: string;
  especialidade: string;
  unidadePreferida?: string;
  profissionalPreferido?: string;
  prioridade: number; // 1-10 (1 = mais prioritário)
  criteriosPriorizacao: string[];
  dataInclusao: Date;
  statusAtual: 'aguardando' | 'contatado' | 'agendado' | 'desistiu';
  tentativasContato: number;
  ultimoContato?: Date;
  prazoMaximo?: Date;
}

export interface Cota {
  id: string;
  unidadeId: string;
  profissionalId?: string;
  especialidade: string;
  periodo: 'mensal' | 'semanal' | 'diario';
  quantidadeTotal: number;
  quantidadeUtilizada: number;
  quantidadeReservada: number;
  vigenciaInicio: Date;
  vigenciaFim: Date;
  tipoContrato: 'SUS' | 'Particular' | 'Convenio';
  ativa: boolean;
}

// Classe principal para gerenciar a base de cadastro
export class BaseCadastroService {
  private static instance: BaseCadastroService;
  private pacientes: Map<string, Paciente> = new Map();
  private profissionais: Map<string, Profissional> = new Map();
  private unidades: Map<string, UnidadeSaude> = new Map();
  private agendas: Map<string, Agenda> = new Map();
  private agendamentos: Map<string, Agendamento> = new Map();
  private listaEspera: Map<string, ListaEspera> = new Map();
  private cotas: Map<string, Cota> = new Map();

  public static getInstance(): BaseCadastroService {
    if (!BaseCadastroService.instance) {
      BaseCadastroService.instance = new BaseCadastroService();
    }
    return BaseCadastroService.instance;
  }

  // Métodos para Pacientes
  adicionarPaciente(paciente: Paciente): void {
    this.pacientes.set(paciente.id, paciente);
  }

  buscarPaciente(id: string): Paciente | undefined {
    return this.pacientes.get(id);
  }

  buscarPacientePorCpf(cpf: string): Paciente | undefined {
    return Array.from(this.pacientes.values()).find(p => p.cpf === cpf);
  }

  buscarPacientePorCartaoSus(cartaoSus: string): Paciente | undefined {
    return Array.from(this.pacientes.values()).find(p => p.cartaoSus === cartaoSus);
  }

  buscarPacientesPorNome(nome: string): Paciente[] {
    const nomeMinusculo = nome.toLowerCase();
    return Array.from(this.pacientes.values())
      .filter(p => p.nome.toLowerCase().includes(nomeMinusculo));
  }

  // Métodos para Profissionais
  adicionarProfissional(profissional: Profissional): void {
    this.profissionais.set(profissional.id, profissional);
  }

  buscarProfissional(id: string): Profissional | undefined {
    return this.profissionais.get(id);
  }

  buscarProfissionaisPorEspecialidade(especialidade: string): Profissional[] {
    return Array.from(this.profissionais.values())
      .filter(p => p.especialidades.includes(especialidade) && p.ativo);
  }

  buscarProfissionaisPorUnidade(unidadeId: string): Profissional[] {
    return Array.from(this.profissionais.values())
      .filter(p => p.unidades.includes(unidadeId) && p.ativo);
  }

  // Métodos para Unidades
  adicionarUnidade(unidade: UnidadeSaude): void {
    this.unidades.set(unidade.id, unidade);
  }

  buscarUnidade(id: string): UnidadeSaude | undefined {
    return this.unidades.get(id);
  }

  buscarUnidadesPorTipo(tipo: UnidadeSaude['tipo']): UnidadeSaude[] {
    return Array.from(this.unidades.values())
      .filter(u => u.tipo === tipo && u.ativo);
  }

  // Métodos para Agendas
  adicionarAgenda(agenda: Agenda): void {
    this.agendas.set(agenda.id, agenda);
  }

  buscarAgenda(id: string): Agenda | undefined {
    return this.agendas.get(id);
  }

  buscarAgendasDisponiveis(especialidade: string, data: Date): Agenda[] {
    return Array.from(this.agendas.values())
      .filter(a => 
        a.especialidade === especialidade &&
        a.data.toDateString() === data.toDateString() &&
        !a.bloqueada &&
        a.cotaUtilizada < a.cotaTotal
      );
  }

  // Métodos para Agendamentos
  adicionarAgendamento(agendamento: Agendamento): void {
    this.agendamentos.set(agendamento.id, agendamento);
    
    // Atualizar cota da agenda
    const agenda = this.buscarAgenda(agendamento.agendaId);
    if (agenda) {
      agenda.cotaUtilizada++;
      agenda.atualizadaEm = new Date();
    }
  }

  buscarAgendamento(id: string): Agendamento | undefined {
    return this.agendamentos.get(id);
  }

  buscarAgendamentosPorPaciente(pacienteId: string): Agendamento[] {
    return Array.from(this.agendamentos.values())
      .filter(a => a.pacienteId === pacienteId)
      .sort((a, b) => b.data.getTime() - a.data.getTime());
  }

  buscarAgendamentosPorData(data: Date): Agendamento[] {
    return Array.from(this.agendamentos.values())
      .filter(a => a.data.toDateString() === data.toDateString());
  }

  // Métodos para Lista de Espera
  adicionarListaEspera(item: ListaEspera): void {
    this.listaEspera.set(item.id, item);
  }

  buscarListaEsperaPorEspecialidade(especialidade: string): ListaEspera[] {
    return Array.from(this.listaEspera.values())
      .filter(l => l.especialidade === especialidade && l.statusAtual === 'aguardando')
      .sort((a, b) => a.prioridade - b.prioridade);
  }

  // Métodos para Cotas
  adicionarCota(cota: Cota): void {
    this.cotas.set(cota.id, cota);
  }

  buscarCotasPorUnidade(unidadeId: string): Cota[] {
    return Array.from(this.cotas.values())
      .filter(c => c.unidadeId === unidadeId && c.ativa);
  }

  verificarDisponibilidadeCota(unidadeId: string, especialidade: string): boolean {
    const cotas = this.buscarCotasPorUnidade(unidadeId)
      .filter(c => c.especialidade === especialidade);
    
    return cotas.some(c => c.quantidadeUtilizada < c.quantidadeTotal);
  }

  // Métodos de busca avançada
  buscarDadosCompletos() {
    return {
      pacientes: Array.from(this.pacientes.values()),
      profissionais: Array.from(this.profissionais.values()),
      unidades: Array.from(this.unidades.values()),
      agendas: Array.from(this.agendas.values()),
      agendamentos: Array.from(this.agendamentos.values()),
      listaEspera: Array.from(this.listaEspera.values()),
      cotas: Array.from(this.cotas.values())
    };
  }
}

// Singleton para acesso global
export const baseCadastro = BaseCadastroService.getInstance();
