
# Estrutura do Projeto Backend SUS

## Organização de Diretórios

```
sus-backend/
├── app/
│   ├── __init__.py
│   ├── config.py
│   ├── models/
│   │   ├── __init__.py
│   │   ├── user.py
│   │   ├── paciente.py
│   │   ├── unidade_saude.py
│   │   ├── agendamento.py
│   │   ├── manifestacao.py
│   │   ├── apac.py
│   │   └── base.py
│   ├── routes/
│   │   ├── __init__.py
│   │   ├── auth.py
│   │   ├── pacientes.py
│   │   ├── agendamentos.py
│   │   ├── ouvidoria.py
│   │   ├── apac.py
│   │   └── unidades.py
│   ├── services/
│   │   ├── __init__.py
│   │   ├── auth_service.py
│   │   ├── paciente_service.py
│   │   ├── agendamento_service.py
│   │   ├── ouvidoria_service.py
│   │   ├── apac_service.py
│   │   └── validation_service.py
│   ├── utils/
│   │   ├── __init__.py
│   │   ├── validators.py
│   │   ├── decorators.py
│   │   ├── exceptions.py
│   │   ├── pdf_generator.py
│   │   └── sigtap_integration.py
│   └── static/
│       ├── templates/
│       │   ├── base.html
│       │   ├── login.html
│       │   ├── historico.html
│       │   └── apac_form.html
│       └── css/
│           └── style.css
├── migrations/
│   └── alembic/
├── tests/
│   ├── test_auth.py
│   ├── test_pacientes.py
│   ├── test_ouvidoria.py
│   ├── test_apac.py
│   └── conftest.py
├── files/
│   └── competencias/
│       ├── 01-2025/
│       ├── 02-2025/
│       └── ...
├── logs/
├── n8n-workflows/
│   ├── apac-workflow.json
│   └── ouvidoria-workflow.json
├── docker/
│   ├── Dockerfile
│   ├── docker-compose.yml
│   └── nginx.conf
├── requirements.txt
├── .env.example
├── run.py
└── README.md
```

## Dependências Python (requirements.txt)

```
Flask==3.0.0
Flask-SQLAlchemy==3.1.1
Flask-Migrate==4.0.5
Flask-JWT-Extended==4.6.0
Flask-CORS==4.0.0
Flask-Session==0.5.0
SQLAlchemy==2.0.23
psycopg2-binary==2.9.9
redis==5.0.1
ReportLab==4.0.7
Pillow==10.1.0
requests==2.31.0
python-dotenv==1.0.0
Werkzeug==3.0.1
pytest==7.4.3
pytest-flask==1.3.0
marshmallow==3.20.1
webargs==8.3.0
celery==5.3.4
gunicorn==21.2.0
alembic==1.13.1
```

## Arquivo de Configuração (.env.example)

```bash
# Configurações do Flask
FLASK_APP=run.py
FLASK_ENV=development
SECRET_KEY=your-super-secret-key-here
JWT_SECRET_KEY=your-jwt-secret-key-here

# Banco de Dados
DATABASE_URL=postgresql://sus_user:sus_password@localhost:5432/sus_database

# Redis
REDIS_URL=redis://localhost:6379/0

# Upload de Arquivos
UPLOAD_FOLDER=/app/files
MAX_CONTENT_LENGTH=16777216

# APIs Externas
SIGTAP_API_URL=http://sigtap.datasus.gov.br/api
CNES_API_URL=http://cnes.datasus.gov.br/api

# n8n
N8N_WEBHOOK_URL=http://localhost:5678/webhook

# Configurações de Email
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=seu-email@gmail.com
SMTP_PASSWORD=sua-senha-app

# Configurações de Log
LOG_LEVEL=INFO
LOG_FILE=/app/logs/sus-backend.log

# LGPD
DATA_RETENTION_DAYS=2555  # 7 anos conforme legislação
```

## Principais Funcionalidades por Módulo

### 1. Autenticação (auth.py)
- Login/logout com JWT
- Controle de sessões
- Verificação de permissões por role
- Middleware de autenticação

### 2. Pacientes (pacientes.py)
- CRUD completo de pacientes
- Busca por CPF, CNS, nome
- Validação de documentos
- Integração com CNS

### 3. Agendamentos (agendamentos.py)
- Criação de agendamentos
- Gestão de agendas
- Lista de espera
- Controle de cotas

### 4. Ouvidoria (ouvidoria.py)
- Recepção de manifestações
- Geração de protocolos
- Upload de anexos
- Gestão de status

### 5. APAC (apac.py)
- Geração automática de numeração
- Validação com SIGTAP
- Criação de PDF
- Controle de competências

## Fluxos de Integração

### Fluxo APAC Completo:
1. **Frontend**: Usuário preenche formulário
2. **n8n**: Recebe webhook e valida dados
3. **Backend**: Gera número, valida, cria PDF
4. **Storage**: Salva arquivo em `/files/{competencia}/`
5. **Response**: Retorna dados da APAC criada
6. **n8n**: Notifica sucesso/erro

### Fluxo Ouvidoria:
1. **Frontend**: Cidadão envia manifestação
2. **Backend**: Gera protocolo, salva anexos
3. **Storage**: Organiza arquivos
4. **Response**: Retorna protocolo
5. **Email**: Notificação automática

## Padrões de Resposta da API

### Sucesso (200/201):
```json
{
  "success": true,
  "data": { ... },
  "message": "Operação realizada com sucesso"
}
```

### Erro (400/401/403/404/500):
```json
{
  "success": false,
  "error": "VALIDATION_ERROR",
  "message": "Dados inválidos",
  "details": {
    "field": "Descrição do erro"
  }
}
```

## Comandos de Desenvolvimento

```bash
# Instalar dependências
pip install -r requirements.txt

# Executar migrações
flask db upgrade

# Executar testes
pytest

# Executar em desenvolvimento
python run.py

# Executar em produção
gunicorn -w 4 -b 0.0.0.0:5000 run:app
```

## Segurança Implementada

- ✅ Sanitização de inputs
- ✅ Validação de tipos de arquivo
- ✅ Controle de acesso baseado em roles
- ✅ Logs de auditoria
- ✅ Proteção CSRF
- ✅ Rate limiting
- ✅ Criptografia de senhas
- ✅ Tokens JWT seguros

## Performance

- ✅ Índices otimizados no PostgreSQL
- ✅ Cache com Redis
- ✅ Paginação em listagens
- ✅ Compressão de respostas
- ✅ Pool de conexões do banco

## Monitoramento

- ✅ Logs estruturados
- ✅ Health checks
- ✅ Métricas de performance
- ✅ Alertas de erro
```
