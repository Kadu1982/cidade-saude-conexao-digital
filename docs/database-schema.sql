
-- Estrutura do Banco de Dados SUS
-- PostgreSQL 15+

-- Extensões necessárias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Schema principal
CREATE SCHEMA IF NOT EXISTS sus;
SET search_path TO sus, public;

-- Tabela de Usuários
CREATE TABLE usuarios (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'medico', 'enfermeiro', 'recepcionista', 'ouvidor')),
    cns VARCHAR(15),
    crm_coren VARCHAR(20),
    unidade_saude_id UUID,
    ativo BOOLEAN DEFAULT true,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Unidades de Saúde
CREATE TABLE unidades_saude (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nome VARCHAR(255) NOT NULL,
    cnpj VARCHAR(14) UNIQUE NOT NULL,
    cnes VARCHAR(7) UNIQUE NOT NULL,
    tipo VARCHAR(20) NOT NULL CHECK (tipo IN ('UBS', 'Hospital', 'Policlinica', 'CEO', 'CAPS')),
    logradouro VARCHAR(255) NOT NULL,
    numero VARCHAR(10) NOT NULL,
    complemento VARCHAR(100),
    bairro VARCHAR(100) NOT NULL,
    cidade VARCHAR(100) NOT NULL,
    uf CHAR(2) NOT NULL,
    cep CHAR(8) NOT NULL,
    telefone VARCHAR(15),
    email VARCHAR(255),
    servicos TEXT[],
    equipamentos TEXT[],
    ativo BOOLEAN DEFAULT true,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Pacientes
CREATE TABLE pacientes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nome VARCHAR(255) NOT NULL,
    cpf CHAR(11) UNIQUE NOT NULL,
    cartao_sus CHAR(15) UNIQUE NOT NULL,
    data_nascimento DATE NOT NULL,
    sexo CHAR(1) NOT NULL CHECK (sexo IN ('M', 'F')),
    telefone VARCHAR(15),
    email VARCHAR(255),
    logradouro VARCHAR(255),
    numero VARCHAR(10),
    complemento VARCHAR(100),
    bairro VARCHAR(100),
    cidade VARCHAR(100),
    uf CHAR(2),
    cep CHAR(8),
    tipo_sanguineo VARCHAR(3),
    alergias TEXT[],
    medicamentos_em_uso TEXT[],
    condicoes_cronicas TEXT[],
    prioridade VARCHAR(20) DEFAULT 'normal' CHECK (prioridade IN ('normal', 'prioritario', 'urgente')),
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Profissionais
CREATE TABLE profissionais (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nome VARCHAR(255) NOT NULL,
    cpf CHAR(11) UNIQUE NOT NULL,
    cns VARCHAR(15) UNIQUE NOT NULL,
    registro VARCHAR(20) NOT NULL,
    especialidades TEXT[] NOT NULL,
    unidades UUID[] NOT NULL,
    horarios JSONB,
    ativo BOOLEAN DEFAULT true,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Agendas
CREATE TABLE agendas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profissional_id UUID NOT NULL REFERENCES profissionais(id),
    unidade_id UUID NOT NULL REFERENCES unidades_saude(id),
    especialidade VARCHAR(100) NOT NULL,
    data DATE NOT NULL,
    horarios JSONB NOT NULL,
    cota_total INTEGER NOT NULL,
    cota_utilizada INTEGER DEFAULT 0,
    cota_reservada INTEGER DEFAULT 0,
    bloqueada BOOLEAN DEFAULT false,
    motivo_bloqueio TEXT,
    criada_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizada_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Agendamentos
CREATE TABLE agendamentos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    paciente_id UUID NOT NULL REFERENCES pacientes(id),
    agenda_id UUID NOT NULL REFERENCES agendas(id),
    data DATE NOT NULL,
    hora TIME NOT NULL,
    tipo VARCHAR(20) NOT NULL CHECK (tipo IN ('consulta', 'exame', 'procedimento')),
    status VARCHAR(20) DEFAULT 'agendado' CHECK (status IN ('agendado', 'confirmado', 'realizado', 'cancelado', 'faltou')),
    prioridade VARCHAR(20) DEFAULT 'normal' CHECK (prioridade IN ('normal', 'prioritario', 'urgente')),
    observacoes TEXT,
    protocolo_sus VARCHAR(50),
    codigo_confirmacao VARCHAR(10),
    qr_code TEXT,
    notificacao_enviada BOOLEAN DEFAULT false,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Lista de Espera
CREATE TABLE lista_espera (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    paciente_id UUID NOT NULL REFERENCES pacientes(id),
    especialidade VARCHAR(100) NOT NULL,
    unidade_preferida UUID REFERENCES unidades_saude(id),
    profissional_preferido UUID REFERENCES profissionais(id),
    prioridade INTEGER DEFAULT 5 CHECK (prioridade BETWEEN 1 AND 10),
    criterios_priorizacao TEXT[],
    data_inclusao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status_atual VARCHAR(20) DEFAULT 'aguardando' CHECK (status_atual IN ('aguardando', 'contatado', 'agendado', 'desistiu')),
    tentativas_contato INTEGER DEFAULT 0,
    ultimo_contato TIMESTAMP,
    prazo_maximo DATE
);

-- Tabela de Manifestações da Ouvidoria
CREATE TABLE manifestacoes_ouvidoria (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    protocolo VARCHAR(20) UNIQUE NOT NULL,
    tipo VARCHAR(20) NOT NULL CHECK (tipo IN ('reclamacao', 'sugestao', 'elogio', 'denuncia', 'informacao')),
    categoria VARCHAR(100) NOT NULL,
    descricao TEXT NOT NULL,
    unidade_relacionada UUID REFERENCES unidades_saude(id),
    paciente_id UUID REFERENCES pacientes(id),
    status VARCHAR(20) DEFAULT 'RECEBIDA' CHECK (status IN ('RECEBIDA', 'EM_ANALISE', 'RESPONDIDA', 'ENCERRADA')),
    anexos TEXT[],
    resposta TEXT,
    data_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_resposta TIMESTAMP,
    responsavel_resposta UUID REFERENCES usuarios(id),
    aceita_termos BOOLEAN NOT NULL DEFAULT false
);

-- Tabela de APACs
CREATE TABLE apacs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    numero VARCHAR(50) UNIQUE NOT NULL,
    tipo VARCHAR(20) NOT NULL CHECK (tipo IN ('inicial', 'continuacao', 'unica')),
    paciente_id UUID NOT NULL REFERENCES pacientes(id),
    cns VARCHAR(15) NOT NULL,
    cid10 VARCHAR(10) NOT NULL,
    procedimento VARCHAR(20) NOT NULL,
    unidade_id UUID NOT NULL REFERENCES unidades_saude(id),
    cnes VARCHAR(7) NOT NULL,
    profissional_id UUID NOT NULL REFERENCES profissionais(id),
    data_inicio DATE NOT NULL,
    data_fim DATE,
    competencia VARCHAR(7) NOT NULL, -- MM-AAAA
    status VARCHAR(20) DEFAULT 'gerada' CHECK (status IN ('gerada', 'validada', 'enviada', 'rejeitada')),
    observacoes TEXT,
    arquivo_pdf VARCHAR(255),
    validacoes JSONB,
    criada_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizada_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Controle de Numeração APAC
CREATE TABLE controle_numeracao_apac (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    unidade_id UUID NOT NULL REFERENCES unidades_saude(id),
    cnes VARCHAR(7) NOT NULL,
    tipo VARCHAR(20) NOT NULL,
    competencia VARCHAR(7) NOT NULL,
    ultimo_numero INTEGER DEFAULT 0,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(cnes, tipo, competencia)
);

-- Tabela de Cotas
CREATE TABLE cotas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    unidade_id UUID NOT NULL REFERENCES unidades_saude(id),
    profissional_id UUID REFERENCES profissionais(id),
    especialidade VARCHAR(100) NOT NULL,
    periodo VARCHAR(20) NOT NULL CHECK (periodo IN ('mensal', 'semanal', 'diario')),
    quantidade_total INTEGER NOT NULL,
    quantidade_utilizada INTEGER DEFAULT 0,
    quantidade_reservada INTEGER DEFAULT 0,
    vigencia_inicio DATE NOT NULL,
    vigencia_fim DATE NOT NULL,
    tipo_contrato VARCHAR(20) DEFAULT 'SUS' CHECK (tipo_contrato IN ('SUS', 'Particular', 'Convenio')),
    ativa BOOLEAN DEFAULT true,
    criada_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Logs do Sistema
CREATE TABLE logs_sistema (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    usuario_id UUID REFERENCES usuarios(id),
    acao VARCHAR(100) NOT NULL,
    tabela VARCHAR(50),
    registro_id UUID,
    dados_antes JSONB,
    dados_depois JSONB,
    ip_address INET,
    user_agent TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices para Performance
CREATE INDEX idx_pacientes_cpf ON pacientes(cpf);
CREATE INDEX idx_pacientes_cartao_sus ON pacientes(cartao_sus);
CREATE INDEX idx_pacientes_nome ON pacientes USING gin(nome gin_trgm_ops);
CREATE INDEX idx_agendamentos_data ON agendamentos(data);
CREATE INDEX idx_agendamentos_paciente ON agendamentos(paciente_id);
CREATE INDEX idx_manifestacoes_protocolo ON manifestacoes_ouvidoria(protocolo);
CREATE INDEX idx_manifestacoes_data ON manifestacoes_ouvidoria(data_registro);
CREATE INDEX idx_apacs_numero ON apacs(numero);
CREATE INDEX idx_apacs_competencia ON apacs(competencia);
CREATE INDEX idx_apacs_paciente ON apacs(paciente_id);

-- Triggers para atualização automática de timestamps
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.atualizado_em = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_usuarios_timestamp BEFORE UPDATE ON usuarios
    FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_unidades_timestamp BEFORE UPDATE ON unidades_saude
    FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_pacientes_timestamp BEFORE UPDATE ON pacientes
    FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_agendamentos_timestamp BEFORE UPDATE ON agendamentos
    FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_apacs_timestamp BEFORE UPDATE ON apacs
    FOR EACH ROW EXECUTE FUNCTION update_timestamp();

-- Função para gerar protocolo da ouvidoria
CREATE OR REPLACE FUNCTION gerar_protocolo_ouvidoria()
RETURNS TRIGGER AS $$
BEGIN
    NEW.protocolo = 'OUV' || LPAD(EXTRACT(EPOCH FROM CURRENT_TIMESTAMP)::TEXT, 10, '0');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_gerar_protocolo BEFORE INSERT ON manifestacoes_ouvidoria
    FOR EACH ROW EXECUTE FUNCTION gerar_protocolo_ouvidoria();

-- Função para gerar numeração APAC
CREATE OR REPLACE FUNCTION gerar_numero_apac()
RETURNS TRIGGER AS $$
DECLARE
    novo_numero INTEGER;
    numero_formatado VARCHAR(50);
BEGIN
    -- Incrementar o controle de numeração
    INSERT INTO controle_numeracao_apac (unidade_id, cnes, tipo, competencia, ultimo_numero)
    VALUES (NEW.unidade_id, NEW.cnes, NEW.tipo, NEW.competencia, 1)
    ON CONFLICT (cnes, tipo, competencia)
    DO UPDATE SET 
        ultimo_numero = controle_numeracao_apac.ultimo_numero + 1,
        atualizado_em = CURRENT_TIMESTAMP
    RETURNING ultimo_numero INTO novo_numero;

    -- Formato: CNES + TIPO + COMPETENCIA + NUMERO
    numero_formatado = NEW.cnes || 
                      CASE NEW.tipo 
                          WHEN 'inicial' THEN 'I'
                          WHEN 'continuacao' THEN 'C'
                          WHEN 'unica' THEN 'U'
                      END ||
                      REPLACE(NEW.competencia, '-', '') ||
                      LPAD(novo_numero::TEXT, 6, '0');
    
    NEW.numero = numero_formatado;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_gerar_numero_apac BEFORE INSERT ON apacs
    FOR EACH ROW EXECUTE FUNCTION gerar_numero_apac();

-- Dados iniciais (seeds)
INSERT INTO unidades_saude (nome, cnpj, cnes, tipo, logradouro, numero, bairro, cidade, uf, cep, telefone) VALUES
('UBS Central', '12345678000123', '1234567', 'UBS', 'Rua Principal', '100', 'Centro', 'São Paulo', 'SP', '01234567', '11999999999'),
('Hospital Municipal', '98765432000198', '9876543', 'Hospital', 'Avenida Saúde', '500', 'Jardim', 'São Paulo', 'SP', '04321987', '11888888888');

INSERT INTO usuarios (nome, email, senha_hash, role, unidade_saude_id) VALUES
('Admin Sistema', 'admin@sus.gov.br', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LrEktOr9b7gFeKROy', 'admin', (SELECT id FROM unidades_saude LIMIT 1)),
('Dr. João Silva', 'joao@sus.gov.br', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LrEktOr9b7gFeKROy', 'medico', (SELECT id FROM unidades_saude LIMIT 1));

-- Comentários nas tabelas
COMMENT ON TABLE usuarios IS 'Usuários do sistema com diferentes roles';
COMMENT ON TABLE pacientes IS 'Cadastro de pacientes do SUS';
COMMENT ON TABLE unidades_saude IS 'Unidades de saúde cadastradas no sistema';
COMMENT ON TABLE agendamentos IS 'Agendamentos de consultas, exames e procedimentos';
COMMENT ON TABLE manifestacoes_ouvidoria IS 'Manifestações recebidas pela ouvidoria';
COMMENT ON TABLE apacs IS 'Autorizações de Procedimentos Ambulatoriais de Alta Complexidade';
COMMENT ON TABLE controle_numeracao_apac IS 'Controle sequencial da numeração das APACs';
