// Dados de teste baseados nas diretrizes PNAB
export interface Paciente {
  id: string;
  nome: string;
  cpf: string;
  cns: string; // Cartão Nacional de Saúde
  dataNascimento: string;
  telefone: string;
  endereco: string;
  unidadeSaude: string;
  microarea: string;
  equipeESF: string;
  acs?: string; // Agente Comunitário de Saúde
  condicoesCronicas?: string[];
  ultimaConsulta?: string;
  // Novos campos para validação de duplicatas
  nomeMae?: string;
  cpfMae?: string;
}

// Unidades de Saúde baseadas na PNAB
export const unidadesSaude = [
  {
    id: 'ubs001',
    nome: 'UBS Centro',
    tipo: 'UBS',
    endereco: 'Rua Central, 100 - Centro',
    populacaoAdscrita: 12000,
    microareas: 6,
    equipesESF: 3
  },
  {
    id: 'ubs002',
    nome: 'UBS Jardim das Flores',
    tipo: 'UBS',
    endereco: 'Av. das Flores, 250 - Jardim das Flores',
    populacaoAdscrita: 15000,
    microareas: 8,
    equipesESF: 4
  },
  {
    id: 'ubs003',
    nome: 'UBS Vila Nova',
    tipo: 'UBS',
    endereco: 'Rua Nova, 300 - Vila Nova',
    populacaoAdscrita: 10000,
    microareas: 5,
    equipesESF: 2
  },
  {
    id: 'psf001',
    nome: 'PSF Rural',
    tipo: 'PSF',
    endereco: 'Estrada Rural, km 5',
    populacaoAdscrita: 3000,
    microareas: 3,
    equipesESF: 1
  },
  {
    id: 'hospital001',
    nome: 'Hospital Municipal',
    tipo: 'Hospital',
    endereco: 'Av. Principal, 500 - Centro',
    populacaoAdscrita: 0,
    microareas: 0,
    equipesESF: 0
  }
];

// Médicos por unidade (5 por unidade conforme solicitado)
export const medicos: Medico[] = [
  // UBS Centro
  {
    id: 'med001',
    nome: 'Dr. João Silva',
    especialidade: 'Clínica Geral',
    crm: 'CRM/SP 123456',
    cns: '234567890123456',
    unidadeSaude: 'UBS Centro',
    cargaHoraria: 40,
    equipeESF: 'Equipe Alpha',
    diasAtendimento: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'],
    horariosAtendimento: '07:00 às 16:00'
  },
  {
    id: 'med002',
    nome: 'Dra. Maria Oliveira',
    especialidade: 'Pediatria',
    crm: 'CRM/SP 234567',
    cns: '345678901234567',
    unidadeSaude: 'UBS Centro',
    cargaHoraria: 40,
    equipeESF: 'Equipe Beta',
    diasAtendimento: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'],
    horariosAtendimento: '07:00 às 16:00'
  },
  {
    id: 'med003',
    nome: 'Dr. Paulo Santos',
    especialidade: 'Ginecologia',
    crm: 'CRM/SP 345678',
    cns: '456789012345678',
    unidadeSaude: 'UBS Centro',
    cargaHoraria: 30,
    diasAtendimento: ['Segunda', 'Quarta', 'Sexta'],
    horariosAtendimento: '13:00 às 19:00'
  },
  {
    id: 'med004',
    nome: 'Dra. Ana Lima',
    especialidade: 'Cardiologia',
    crm: 'CRM/SP 456789',
    cns: '567890123456789',
    unidadeSaude: 'UBS Centro',
    cargaHoraria: 20,
    diasAtendimento: ['Terça', 'Quinta'],
    horariosAtendimento: '07:00 às 12:00'
  },
  {
    id: 'med005',
    nome: 'Dr. Carlos Ferreira',
    especialidade: 'Dermatologia',
    crm: 'CRM/SP 567890',
    cns: '678901234567890',
    unidadeSaude: 'UBS Centro',
    cargaHoraria: 20,
    diasAtendimento: ['Segunda', 'Quarta'],
    horariosAtendimento: '13:00 às 18:00'
  },

  // UBS Jardim das Flores
  {
    id: 'med006',
    nome: 'Dr. Roberto Mendes',
    especialidade: 'Clínica Geral',
    crm: 'CRM/SP 678901',
    cns: '789012345678901',
    unidadeSaude: 'UBS Jardim das Flores',
    cargaHoraria: 40,
    equipeESF: 'Equipe Gamma',
    diasAtendimento: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'],
    horariosAtendimento: '07:00 às 16:00'
  },
  {
    id: 'med007',
    nome: 'Dra. Fernanda Costa',
    especialidade: 'Pediatria',
    crm: 'CRM/SP 789012',
    cns: '890123456789012',
    unidadeSaude: 'UBS Jardim das Flores',
    cargaHoraria: 40,
    equipeESF: 'Equipe Delta',
    diasAtendimento: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'],
    horariosAtendimento: '07:00 às 16:00'
  },
  {
    id: 'med008',
    nome: 'Dr. Marcos Almeida',
    especialidade: 'Ortopedia',
    crm: 'CRM/SP 890123',
    cns: '901234567890123',
    unidadeSaude: 'UBS Jardim das Flores',
    cargaHoraria: 30,
    diasAtendimento: ['Segunda', 'Quarta', 'Sexta'],
    horariosAtendimento: '13:00 às 19:00'
  },
  {
    id: 'med009',
    nome: 'Dra. Luciana Rocha',
    especialidade: 'Oftalmologia',
    crm: 'CRM/SP 901234',
    cns: '012345678901234',
    unidadeSaude: 'UBS Jardim das Flores',
    cargaHoraria: 20,
    diasAtendimento: ['Terça', 'Quinta'],
    horariosAtendimento: '07:00 às 12:00'
  },
  {
    id: 'med010',
    nome: 'Dr. Guilherme Pinto',
    especialidade: 'Psiquiatria',
    crm: 'CRM/SP 012345',
    cns: '123456789012347',
    unidadeSaude: 'UBS Jardim das Flores',
    cargaHoraria: 20,
    diasAtendimento: ['Segunda', 'Quarta'],
    horariosAtendimento: '13:00 às 18:00'
  },

  // UBS Vila Nova
  {
    id: 'med011',
    nome: 'Dra. Patricia Dias',
    especialidade: 'Clínica Geral',
    crm: 'CRM/SP 123457',
    cns: '234567890123458',
    unidadeSaude: 'UBS Vila Nova',
    cargaHoraria: 40,
    equipeESF: 'Equipe Epsilon',
    diasAtendimento: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'],
    horariosAtendimento: '07:00 às 16:00'
  },
  {
    id: 'med012',
    nome: 'Dr. Eduardo Barbosa',
    especialidade: 'Pediatria',
    crm: 'CRM/SP 234568',
    cns: '345678901234569',
    unidadeSaude: 'UBS Vila Nova',
    cargaHoraria: 40,
    diasAtendimento: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'],
    horariosAtendimento: '07:00 às 16:00'
  },
  {
    id: 'med013',
    nome: 'Dra. Camila Souza',
    especialidade: 'Ginecologia',
    crm: 'CRM/SP 345679',
    cns: '456789012345670',
    unidadeSaude: 'UBS Vila Nova',
    cargaHoraria: 30,
    diasAtendimento: ['Segunda', 'Quarta', 'Sexta'],
    horariosAtendimento: '13:00 às 19:00'
  },
  {
    id: 'med014',
    nome: 'Dr. Rafael Moreira',
    especialidade: 'Neurologia',
    crm: 'CRM/SP 456780',
    cns: '567890123456781',
    unidadeSaude: 'UBS Vila Nova',
    cargaHoraria: 20,
    diasAtendimento: ['Terça', 'Quinta'],
    horariosAtendimento: '07:00 às 12:00'
  },
  {
    id: 'med015',
    nome: 'Dra. Bruna Nascimento',
    especialidade: 'Endocrinologia',
    crm: 'CRM/SP 567891',
    cns: '678901234567892',
    unidadeSaude: 'UBS Vila Nova',
    cargaHoraria: 20,
    diasAtendimento: ['Segunda', 'Quarta'],
    horariosAtendimento: '13:00 às 18:00'
  },

  // PSF Rural
  {
    id: 'med016',
    nome: 'Dr. José Pereira',
    especialidade: 'Médico de Família',
    crm: 'CRM/SP 678902',
    cns: '789012345678903',
    unidadeSaude: 'PSF Rural',
    cargaHoraria: 40,
    equipeESF: 'Equipe Rural',
    diasAtendimento: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'],
    horariosAtendimento: '07:00 às 16:00'
  },
  {
    id: 'med017',
    nome: 'Dra. Silvia Campos',
    especialidade: 'Clínica Geral',
    crm: 'CRM/SP 789013',
    cns: '890123456789014',
    unidadeSaude: 'PSF Rural',
    cargaHoraria: 30,
    diasAtendimento: ['Segunda', 'Quarta', 'Sexta'],
    horariosAtendimento: '07:00 às 13:00'
  },
  {
    id: 'med018',
    nome: 'Dr. Antonio Ribeiro',
    especialidade: 'Pediatria',
    crm: 'CRM/SP 890124',
    cns: '901234567890125',
    unidadeSaude: 'PSF Rural',
    cargaHoraria: 20,
    diasAtendimento: ['Terça', 'Quinta'],
    horariosAtendimento: '13:00 às 18:00'
  },
  {
    id: 'med019',
    nome: 'Dra. Claudia Martins',
    especialidade: 'Ginecologia',
    crm: 'CRM/SP 901235',
    cns: '012345678901236',
    unidadeSaude: 'PSF Rural',
    cargaHoraria: 16,
    diasAtendimento: ['Segunda', 'Sexta'],
    horariosAtendimento: '07:00 às 15:00'
  },
  {
    id: 'med020',
    nome: 'Dr. Luiz Gomes',
    especialidade: 'Geriatria',
    crm: 'CRM/SP 012346',
    cns: '123456789012348',
    unidadeSaude: 'PSF Rural',
    cargaHoraria: 12,
    diasAtendimento: ['Quarta'],
    horariosAtendimento: '07:00 às 19:00'
  },

  // Hospital Municipal
  {
    id: 'med021',
    nome: 'Dr. Alexandre Torres',
    especialidade: 'Emergência',
    crm: 'CRM/SP 234569',
    cns: '345678901234570',
    unidadeSaude: 'Hospital Municipal',
    cargaHoraria: 60,
    diasAtendimento: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    horariosAtendimento: '24h'
  },
  {
    id: 'med022',
    nome: 'Dra. Helena Borges',
    especialidade: 'Cirurgia Geral',
    crm: 'CRM/SP 345680',
    cns: '456789012345681',
    unidadeSaude: 'Hospital Municipal',
    cargaHoraria: 40,
    diasAtendimento: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'],
    horariosAtendimento: '07:00 às 16:00'
  },
  {
    id: 'med023',
    nome: 'Dr. Sergio Lima',
    especialidade: 'Anestesia',
    crm: 'CRM/SP 456791',
    cns: '567890123456792',
    unidadeSaude: 'Hospital Municipal',
    cargaHoraria: 40,
    diasAtendimento: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'],
    horariosAtendimento: '07:00 às 16:00'
  },
  {
    id: 'med024',
    nome: 'Dra. Daniela Freitas',
    especialidade: 'UTI',
    crm: 'CRM/SP 567892',
    cns: '678901234567893',
    unidadeSaude: 'Hospital Municipal',
    cargaHoraria: 60,
    diasAtendimento: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    horariosAtendimento: '24h'
  },
  {
    id: 'med025',
    nome: 'Dr. Ricardo Viana',
    especialidade: 'Radiologia',
    crm: 'CRM/SP 678903',
    cns: '789012345678904',
    unidadeSaude: 'Hospital Municipal',
    cargaHoraria: 40,
    diasAtendimento: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'],
    horariosAtendimento: '07:00 às 16:00'
  }
];

// Pacientes por unidade (5 por unidade conforme solicitado)
export const pacientes: Paciente[] = [
  // UBS Centro
  {
    id: 'pac001',
    nome: 'José da Silva',
    cpf: '123.456.789-01',
    cns: '123456789012345',
    dataNascimento: '1975-03-15',
    telefone: '(11) 98765-4321',
    endereco: 'Rua das Palmeiras, 123 - Centro',
    unidadeSaude: 'UBS Centro',
    microarea: '001',
    equipeESF: 'Equipe Alpha',
    acs: 'ACS Maria',
    condicoesCronicas: ['Hipertensão', 'Diabetes'],
    ultimaConsulta: '2024-05-15',
    nomeMae: 'Maria da Silva',
    cpfMae: '111.222.333-44'
  },
  {
    id: 'pac002',
    nome: 'Maria Santos',
    cpf: '234.567.890-12',
    cns: '234567890123456',
    dataNascimento: '1982-07-22',
    telefone: '(11) 98765-4322',
    endereco: 'Av. Central, 456 - Centro',
    unidadeSaude: 'UBS Centro',
    microarea: '002',
    equipeESF: 'Equipe Beta',
    acs: 'ACS João',
    condicoesCronicas: ['Asma'],
    ultimaConsulta: '2024-05-10',
    nomeMae: 'Ana Santos',
    cpfMae: '222.333.444-55'
  },
  {
    id: 'pac003',
    nome: 'Pedro Oliveira',
    cpf: '345.678.901-23',
    cns: '345678901234567',
    dataNascimento: '1990-12-05',
    telefone: '(11) 98765-4323',
    endereco: 'Rua do Comércio, 789 - Centro',
    unidadeSaude: 'UBS Centro',
    microarea: '001',
    equipeESF: 'Equipe Alpha',
    acs: 'ACS Maria',
    ultimaConsulta: '2024-05-08',
    nomeMae: 'Carmen Oliveira',
    cpfMae: '333.444.555-66'
  },
  {
    id: 'pac004',
    nome: 'Ana Costa',
    cpf: '456.789.012-34',
    cns: '456789012345678',
    dataNascimento: '1968-09-18',
    telefone: '(11) 98765-4324',
    endereco: 'Praça da República, 321 - Centro',
    unidadeSaude: 'UBS Centro',
    microarea: '003',
    equipeESF: 'Equipe Gamma',
    acs: 'ACS Carlos',
    condicoesCronicas: ['Artrite', 'Osteoporose'],
    ultimaConsulta: '2024-05-12',
    nomeMae: 'Helena Costa',
    cpfMae: '444.555.666-77'
  },
  {
    id: 'pac005',
    nome: 'Carlos Ferreira',
    cpf: '567.890.123-45',
    cns: '567890123456789',
    dataNascimento: '2010-04-30',
    telefone: '(11) 98765-4325',
    endereco: 'Rua da Escola, 654 - Centro',
    unidadeSaude: 'UBS Centro',
    microarea: '002',
    equipeESF: 'Equipe Beta',
    acs: 'ACS João',
    ultimaConsulta: '2024-05-20',
    nomeMae: 'Fernanda Ferreira',
    cpfMae: '555.666.777-88'
  },

  // UBS Jardim das Flores - 5 pacientes
  {
    id: 'pac006',
    nome: 'Luiza Mendes',
    cpf: '678.901.234-56',
    cns: '678901234567890',
    dataNascimento: '1978-11-12',
    telefone: '(11) 98765-4326',
    endereco: 'Rua das Flores, 111 - Jardim das Flores',
    unidadeSaude: 'UBS Jardim das Flores',
    microarea: '004',
    equipeESF: 'Equipe Delta',
    acs: 'ACS Ana',
    condicoesCronicas: ['Hipertensão'],
    ultimaConsulta: '2024-05-14',
    nomeMae: 'Rita Mendes',
    cpfMae: '666.777.888-99'
  },
  {
    id: 'pac007',
    nome: 'Roberto Dias',
    cpf: '789.012.345-67',
    cns: '789012345678901',
    dataNascimento: '1985-06-25',
    telefone: '(11) 98765-4327',
    endereco: 'Av. das Rosas, 222 - Jardim das Flores',
    unidadeSaude: 'UBS Jardim das Flores',
    microarea: '005',
    equipeESF: 'Equipe Epsilon',
    acs: 'ACS Pedro',
    ultimaConsulta: '2024-05-11',
    nomeMae: 'Cleusa Dias',
    cpfMae: '777.888.999-00'
  },
  {
    id: 'pac008',
    nome: 'Fernanda Silva',
    cpf: '890.123.456-78',
    cns: '890123456789012',
    dataNascimento: '1992-01-08',
    telefone: '(11) 98765-4328',
    endereco: 'Rua dos Lírios, 333 - Jardim das Flores',
    unidadeSaude: 'UBS Jardim das Flores',
    microarea: '006',
    equipeESF: 'Equipe Zeta',
    acs: 'ACS Lucia',
    ultimaConsulta: '2024-05-18',
    nomeMae: 'Sonia Silva',
    cpfMae: '888.999.000-11'
  },
  {
    id: 'pac009',
    nome: 'Marcos Almeida',
    cpf: '901.234.567-89',
    cns: '901234567890123',
    dataNascimento: '1973-08-14',
    telefone: '(11) 98765-4329',
    endereco: 'Praça das Violetas, 444 - Jardim das Flores',
    unidadeSaude: 'UBS Jardim das Flores',
    microarea: '004',
    equipeESF: 'Equipe Delta',
    acs: 'ACS Ana',
    condicoesCronicas: ['Diabetes', 'Colesterol Alto'],
    ultimaConsulta: '2024-05-16',
    nomeMae: 'Valéria Almeida',
    cpfMae: '999.000.111-22'
  },
  {
    id: 'pac010',
    nome: 'Juliana Rocha',
    cpf: '012.345.678-90',
    cns: '012345678901234',
    dataNascimento: '2008-10-03',
    telefone: '(11) 98765-4330',
    endereco: 'Rua das Margaridas, 555 - Jardim das Flores',
    unidadeSaude: 'UBS Jardim das Flores',
    microarea: '005',
    equipeESF: 'Equipe Epsilon',
    acs: 'ACS Pedro',
    ultimaConsulta: '2024-05-19',
    nomeMae: 'Beatriz Rocha',
    cpfMae: '000.111.222-33'
  },

  // UBS Vila Nova - 5 pacientes
  {
    id: 'pac011',
    nome: 'Antonio Barbosa',
    cpf: '123.456.789-02',
    cns: '123456789012346',
    dataNascimento: '1965-05-20',
    telefone: '(11) 98765-4331',
    endereco: 'Rua Nova, 777 - Vila Nova',
    unidadeSaude: 'UBS Vila Nova',
    microarea: '007',
    equipeESF: 'Equipe Eta',
    acs: 'ACS Roberto',
    condicoesCronicas: ['Hipertensão', 'Artrite'],
    ultimaConsulta: '2024-05-13',
    nomeMae: 'Dulce Barbosa',
    cpfMae: '111.222.333-45'
  },
  {
    id: 'pac012',
    nome: 'Patricia Souza',
    cpf: '234.567.890-13',
    cns: '234567890123457',
    dataNascimento: '1987-02-28',
    telefone: '(11) 98765-4332',
    endereco: 'Av. dos Pioneiros, 888 - Vila Nova',
    unidadeSaude: 'UBS Vila Nova',
    microarea: '008',
    equipeESF: 'Equipe Theta',
    acs: 'ACS Fernanda',
    ultimaConsulta: '2024-05-17',
    nomeMae: 'Lúcia Souza',
    cpfMae: '222.333.444-56'
  },
  {
    id: 'pac013',
    nome: 'Eduardo Lima',
    cpf: '345.678.901-24',
    cns: '345678901234568',
    dataNascimento: '1996-12-15',
    telefone: '(11) 98765-4333',
    endereco: 'Rua dos Trabalhadores, 999 - Vila Nova',
    unidadeSaude: 'UBS Vila Nova',
    microarea: '007',
    equipeESF: 'Equipe Eta',
    acs: 'ACS Roberto',
    ultimaConsulta: '2024-05-09',
    nomeMae: 'Aparecida Lima',
    cpfMae: '333.444.555-67'
  },
  {
    id: 'pac014',
    nome: 'Camila Moreira',
    cpf: '456.789.012-35',
    cns: '456789012345679',
    dataNascimento: '1980-07-07',
    telefone: '(11) 98765-4334',
    endereco: 'Praça da Liberdade, 101 - Vila Nova',
    unidadeSaude: 'UBS Vila Nova',
    microarea: '009',
    equipeESF: 'Equipe Iota',
    acs: 'ACS Marcos',
    condicoesCronicas: ['Asma', 'Rinite'],
    ultimaConsulta: '2024-05-21',
    nomeMae: 'Celia Moreira',
    cpfMae: '444.555.666-78'
  },
  {
    id: 'pac015',
    nome: 'Rafael Nascimento',
    cpf: '567.890.123-46',
    cns: '567890123456780',
    dataNascimento: '2012-03-12',
    telefone: '(11) 98765-4335',
    endereco: 'Rua da Esperança, 202 - Vila Nova',
    unidadeSaude: 'UBS Vila Nova',
    microarea: '008',
    equipeESF: 'Equipe Theta',
    acs: 'ACS Fernanda',
    ultimaConsulta: '2024-05-22',
    nomeMae: 'Gabriela Nascimento',
    cpfMae: '555.666.777-89'
  },

  // PSF Rural - 5 pacientes
  {
    id: 'pac016',
    nome: 'João Pereira',
    cpf: '678.901.234-57',
    cns: '678901234567891',
    dataNascimento: '1955-09-30',
    telefone: '(11) 98765-4336',
    endereco: 'Sítio Bela Vista, s/n - Zona Rural',
    unidadeSaude: 'PSF Rural',
    microarea: '010',
    equipeESF: 'Equipe Rural',
    acs: 'ACS Silvia',
    condicoesCronicas: ['Hipertensão', 'Diabetes', 'DPOC'],
    ultimaConsulta: '2024-05-06',
    nomeMae: 'Joana Pereira',
    cpfMae: '666.777.888-90'
  },
  {
    id: 'pac017',
    nome: 'Silvia Campos',
    cpf: '789.012.345-68',
    cns: '789012345678902',
    dataNascimento: '1963-04-18',
    telefone: '(11) 98765-4337',
    endereco: 'Fazenda São José, km 8 - Zona Rural',
    unidadeSaude: 'PSF Rural',
    microarea: '011',
    equipeESF: 'Equipe Rural',
    acs: 'ACS Antonio',
    condicoesCronicas: ['Artrose', 'Hipertensão'],
    ultimaConsulta: '2024-05-07',
    nomeMae: 'Benedita Campos',
    cpfMae: '777.888.999-01'
  },
  {
    id: 'pac018',
    nome: 'Manuel Ribeiro',
    cpf: '890.123.456-79',
    cns: '890123456789013',
    dataNascimento: '1948-11-25',
    telefone: '(11) 98765-4338',
    endereco: 'Chácara da Paz, km 12 - Zona Rural',
    unidadeSaude: 'PSF Rural',
    microarea: '010',
    equipeESF: 'Equipe Rural',
    acs: 'ACS Silvia',
    condicoesCronicas: ['Diabetes', 'Cardiopatia'],
    ultimaConsulta: '2024-05-05',
    nomeMae: 'Conceição Ribeiro',
    cpfMae: '888.999.000-12'
  },
  {
    id: 'pac019',
    nome: 'Claudia Martins',
    cpf: '901.234.567-80',
    cns: '901234567890124',
    dataNascimento: '1971-12-02',
    telefone: '(11) 98765-4339',
    endereco: 'Estrada do Campo, km 15 - Zona Rural',
    unidadeSaude: 'PSF Rural',
    microarea: '012',
    equipeESF: 'Equipe Rural',
    acs: 'ACS Claudia',
    ultimaConsulta: '2024-05-04',
    nomeMae: 'Francisca Martins',
    cpfMae: '999.000.111-23'
  },
  {
    id: 'pac020',
    nome: 'Luiz Gomes',
    cpf: '012.345.678-91',
    cns: '012345678901235',
    dataNascimento: '1945-06-10',
    telefone: '(11) 98765-4340',
    endereco: 'Rancho Alegre, km 20 - Zona Rural',
    unidadeSaude: 'PSF Rural',
    microarea: '011',
    equipeESF: 'Equipe Rural',
    acs: 'ACS Antonio',
    condicoesCronicas: ['Alzheimer', 'Hipertensão', 'Diabetes'],
    ultimaConsulta: '2024-05-03',
    nomeMae: 'Antonia Gomes',
    cpfMae: '000.111.222-34'
  },

  // Hospital Municipal - 5 pacientes
  {
    id: 'pac021',
    nome: 'Alexandre Torres',
    cpf: '123.456.789-03',
    cns: '123456789012347',
    dataNascimento: '1988-08-17',
    telefone: '(11) 98765-4341',
    endereco: 'Rua Hospital, 505 - Centro',
    unidadeSaude: 'Hospital Municipal',
    microarea: '013',
    equipeESF: 'Sem Equipe',
    ultimaConsulta: '2024-05-23',
    nomeMae: 'Isabel Torres',
    cpfMae: '111.222.333-46'
  },
  {
    id: 'pac022',
    nome: 'Helena Borges',
    cpf: '234.567.890-14',
    cns: '234567890123458',
    dataNascimento: '1979-01-26',
    telefone: '(11) 98765-4342',
    endereco: 'Av. da Saúde, 606 - Centro',
    unidadeSaude: 'Hospital Municipal',
    microarea: '014',
    equipeESF: 'Sem Equipe',
    condicoesCronicas: ['Câncer de Mama'],
    ultimaConsulta: '2024-05-24',
    nomeMae: 'Terezinha Borges',
    cpfMae: '222.333.444-57'
  },
  {
    id: 'pac023',
    nome: 'Sergio Lima',
    cpf: '345.678.901-25',
    cns: '345678901234569',
    dataNascimento: '1952-10-09',
    telefone: '(11) 98765-4343',
    endereco: 'Rua da Emergência, 707 - Centro',
    unidadeSaude: 'Hospital Municipal',
    microarea: '015',
    equipeESF: 'Sem Equipe',
    condicoesCronicas: ['IAM', 'Diabetes'],
    ultimaConsulta: '2024-05-23',
    nomeMae: 'Sebastiana Lima',
    cpfMae: '333.444.555-68'
  },
  {
    id: 'pac024',
    nome: 'Daniela Freitas',
    cpf: '456.789.012-36',
    cns: '456789012345670',
    dataNascimento: '1994-03-21',
    telefone: '(11) 98765-4344',
    endereco: 'Praça do Hospital, 808 - Centro',
    unidadeSaude: 'Hospital Municipal',
    microarea: '016',
    equipeESF: 'Sem Equipe',
    ultimaConsulta: '2024-05-22',
    nomeMae: 'Rosana Freitas',
    cpfMae: '444.555.666-79'
  },
  {
    id: 'pac025',
    nome: 'Ricardo Viana',
    cpf: '567.890.123-47',
    cns: '567890123456781',
    dataNascimento: '1966-05-14',
    telefone: '(11) 98765-4345',
    endereco: 'Rua dos Médicos, 909 - Centro',
    unidadeSaude: 'Hospital Municipal',
    microarea: '017',
    equipeESF: 'Sem Equipe',
    condicoesCronicas: ['AVC', 'Hipertensão'],
    ultimaConsulta: '2024-05-21',
    nomeMae: 'Marlene Viana',
    cpfMae: '555.666.777-80'
  }
];

// Dados estatísticos para o Dashboard baseados na PNAB
export const indicadoresPNAB = {
  coberturaTerritorial: 85.5, // % de cobertura da ESF
  cadastrosAtivos: 45234,
  atendimentosDemandaEspontanea: 1250, // Pacientes sem agendamento
  consultasAgendadas: 890,
  procedimentosRealizados: 2340,
  medicamentosDispensados: 1560,
  vacinasAplicadas: 450,
  visitasDomiciliares: 320,
  gruposEducativos: 15,
  encaminhamentosEspecializados: 180
};
