
# Sistema SUS - Backend API

Sistema completo de gestão municipal de saúde com módulo APAC integrado.

## 🚀 Tecnologias Utilizadas

- **Backend**: Python 3.10+ com Flask
- **Banco de Dados**: PostgreSQL 15+
- **Cache**: Redis 7+
- **Orquestração**: n8n
- **Containerização**: Docker & Docker Compose
- **Documentos**: ReportLab para PDFs
- **Autenticação**: JWT
- **Testes**: PyTest

## 📋 Funcionalidades Principais

### 🏥 Gestão de Saúde
- ✅ Cadastro de pacientes com validação CNS/CPF
- ✅ Agendamento de consultas e exames
- ✅ Gestão de unidades de saúde
- ✅ Controle de profissionais
- ✅ Lista de espera inteligente

### 📋 Módulo APAC
- ✅ Geração automática de numeração sequencial
- ✅ Validação com base SIGTAP
- ✅ Criação de PDFs conforme padrão MS
- ✅ Controle por competência
- ✅ Integração com CNES

### 🎧 Ouvidoria
- ✅ Recepção de manifestações cidadãs
- ✅ Geração automática de protocolos
- ✅ Upload de anexos
- ✅ Conformidade LGPD

### 🔐 Segurança
- ✅ Autenticação JWT
- ✅ Controle de acesso baseado em roles
- ✅ Sanitização de inputs
- ✅ Logs de auditoria
- ✅ Proteção LGPD

## 🏗️ Instalação e Configuração

### Pré-requisitos
```bash
- Docker 20.10+
- Docker Compose 2.0+
- Python 3.10+ (para desenvolvimento local)
- PostgreSQL 15+ (para desenvolvimento local)
```

### Instalação com Docker (Recomendado)

1. **Clone o repositório**
```bash
git clone https://github.com/sus-sistema/backend.git
cd sus-backend
```

2. **Configure variáveis de ambiente**
```bash
cp .env.example .env
# Edite o arquivo .env com suas configurações
```

3. **Execute com Docker Compose**
```bash
docker-compose up -d
```

4. **Execute as migrações**
```bash
docker-compose exec backend flask db upgrade
```

5. **Acesse o sistema**
```
- API: http://localhost:5000
- n8n: http://localhost:5678 (admin/admin123)
- Documentação: http://localhost:5000/docs
```

### Instalação Local (Desenvolvimento)

1. **Instale dependências**
```bash
pip install -r requirements.txt
```

2. **Configure banco de dados**
```bash
createdb sus_database
flask db upgrade
```

3. **Execute o servidor**
```bash
python run.py
```

## 📚 Documentação da API

### Autenticação
```bash
# Login
POST /api/auth/login
{
  "email": "usuario@sus.gov.br",
  "password": "senha123"
}

# Resposta
{
  "token": "jwt-token-aqui",
  "user": {
    "id": "uuid",
    "name": "Nome Usuario",
    "role": "medico"
  }
}
```

### Pacientes
```bash
# Listar pacientes
GET /api/pacientes?page=1&limit=10&search=nome

# Buscar por CPF
GET /api/pacientes/buscar?cpf=12345678901

# Criar paciente
POST /api/pacientes
{
  "nome": "João Silva",
  "cpf": "12345678901",
  "cartaoSus": "123456789012345",
  "dataNascimento": "1980-01-01",
  "sexo": "M"
}
```

### APAC
```bash
# Gerar APAC
POST /api/apac/gerar
{
  "tipo": "inicial",
  "pacienteId": "uuid-paciente",
  "cns": "123456789012345",
  "cid10": "I10",
  "procedimento": "0301010010",
  "unidadeId": "uuid-unidade",
  "profissionalId": "uuid-profissional",
  "dataInicio": "2025-01-01",
  "dataFim": "2025-01-31"
}

# Resposta
{
  "success": true,
  "data": {
    "id": "uuid",
    "numero": "12345671I012025000001",
    "tipo": "inicial",
    "competencia": "01-2025",
    "status": "gerada",
    "arquivoPdf": "/files/01-2025/12345671I012025000001.pdf"
  }
}
```

### Ouvidoria
```bash
# Criar manifestação
POST /api/ouvidoria/manifestacoes
{
  "tipo": "reclamacao",
  "categoria": "Atendimento Médico",
  "descricao": "Descrição da manifestação",
  "aceitaTermos": true
}

# Resposta
{
  "protocolo": "OUV1738000123",
  "message": "Manifestação registrada com sucesso"
}
```

## 🔧 Configurações

### Variáveis de Ambiente Essenciais

```bash
# Flask
SECRET_KEY=sua-chave-secreta-super-forte
JWT_SECRET_KEY=sua-chave-jwt-secreta

# Banco
DATABASE_URL=postgresql://user:pass@host:5432/db

# Files
UPLOAD_FOLDER=/app/files
MAX_CONTENT_LENGTH=16777216  # 16MB

# APIs Externas
SIGTAP_API_URL=http://sigtap.datasus.gov.br/api
CNES_API_URL=http://cnes.datasus.gov.br/api
```

### Configuração n8n

1. **Acesse**: http://localhost:5678
2. **Importe workflows**: `/docs/n8n-workflow-apac.json`
3. **Configure webhooks**: 
   - APAC: `http://localhost:5678/webhook/apac-gerar`
   - Ouvidoria: `http://localhost:5678/webhook/ouvidoria`

## 🧪 Testes

### Executar testes completos
```bash
pytest
```

### Executar testes específicos
```bash
# Testes de APAC
pytest tests/test_apac.py

# Testes de Ouvidoria
pytest tests/test_ouvidoria.py

# Com coverage
pytest --cov=app tests/
```

### Testes de API com curl
```bash
# Testar geração de APAC
curl -X POST http://localhost:5000/api/apac/gerar \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "tipo": "inicial",
    "pacienteId": "uuid-aqui",
    "cns": "123456789012345",
    "cid10": "I10",
    "procedimento": "0301010010",
    "unidadeId": "uuid-unidade",
    "profissionalId": "uuid-profissional",
    "dataInicio": "2025-01-01"
  }'
```

## 📊 Monitoramento

### Logs do Sistema
```bash
# Visualizar logs em tempo real
docker-compose logs -f backend

# Logs específicos
tail -f logs/sus-backend.log
```

### Health Check
```bash
# Verificar status da API
curl http://localhost:5000/health

# Resposta esperada
{
  "status": "healthy",
  "timestamp": "2025-01-26T10:00:00Z",
  "database": "connected",
  "redis": "connected"
}
```

### Métricas Importantes
- **Response Time**: < 200ms para consultas simples
- **Database Connections**: Pool de 20 conexões
- **Memory Usage**: < 512MB por container
- **Disk Usage**: Monitorar `/files` para PDFs

## 🚨 Troubleshooting

### Problemas Comuns

1. **Erro de conexão com banco**
```bash
# Verificar se PostgreSQL está rodando
docker-compose ps postgres

# Verificar logs
docker-compose logs postgres
```

2. **Erro na geração de PDF**
```bash
# Verificar permissões da pasta
ls -la files/

# Criar diretório se necessário
mkdir -p files/01-2025
```

3. **Webhook n8n não funciona**
```bash
# Verificar se n8n está acessível
curl http://localhost:5678/webhook/apac-gerar

# Verificar logs do n8n
docker-compose logs n8n
```

## 📈 Performance

### Otimizações Implementadas
- ✅ Índices otimizados no PostgreSQL
- ✅ Cache Redis para consultas frequentes
- ✅ Paginação em todas as listagens
- ✅ Compressão gzip nas respostas
- ✅ Pool de conexões do banco

### Limites Configurados
- **Upload**: 16MB por arquivo
- **Timeout**: 30s para requests
- **Rate Limit**: 100 requests/min por IP
- **Session**: 24h de validade

## 🔒 Segurança

### Medidas Implementadas
- ✅ Validação rigorosa de inputs
- ✅ Sanitização de dados
- ✅ Proteção contra SQL Injection
- ✅ CORS configurado
- ✅ Headers de segurança
- ✅ Rate limiting
- ✅ Logs de auditoria

### Conformidade LGPD
- ✅ Consentimento explícito
- ✅ Minimização de dados
- ✅ Direito ao esquecimento
- ✅ Portabilidade de dados
- ✅ Logs de acesso

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📞 Suporte

- **Email**: dev@saudesus.gov.br
- **Issues**: GitHub Issues
- **Documentação**: `/docs`
- **API Docs**: `http://localhost:5000/docs`

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

---

**Versão**: 1.0.0  
**Última Atualização**: 2025-01-26  
**Responsável**: Equipe de Desenvolvimento SUS
```
