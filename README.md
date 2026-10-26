# Oficina Mecânica | Aula de Back-End

Projeto didático local: Django REST Framework + SQLite, com interface React preservada.
Página inicial: http://127.0.0.1:8000/ · API: /api/ · Administração: /admin/.

## Início no VS Code (Windows / PowerShell)
Abra esta pasta inteira no VS Code. Use Python 3.12 ou 3.13.

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
python oficina_mecanica/manage.py migrate
python oficina_mecanica/manage.py test core
python oficina_mecanica/manage.py runserver
```

Se a ativação for bloqueada, substitua python por `.\.venv\Scripts\python.exe` nos comandos seguintes. Linux/macOS: `source .venv/bin/activate`.
Para acessar /admin/, crie um usuário com `python oficina_mecanica/manage.py createsuperuser`.
O banco começa vazio. Nenhum dado do banco enviado foi incluído nesta cópia.

## Estrutura
- oficina_mecanica/config: configurações e rotas principais (myproject no PDF).
- oficina_mecanica/core: modelos, serializers, viewsets, rotas, testes e template (myapp no PDF).
- oficina_mecanica/core/migrations: estrutura versionada do banco.
- oficina_frontend: aplicação React original.
- .github/workflows/ci.yml: verificações automáticas do back-end em main.
- ROTEIRO_AULA.md: falas, arquivos a abrir e comandos na ordem da aula.

## Recursos
/api/clientes/, /api/veiculos/, /api/funcionarios/, /api/ordens-servico/.
Coleções: GET e POST. Detalhes /ID/: GET, PUT, PATCH e DELETE.
Cadastre primeiro cliente, depois veículo e ordem. Funcionário é opcional na ordem.

## React opcional
Em outro terminal: `cd oficina_frontend`, `npm ci`, `npm run dev`.
Use o endereço exibido pelo Vite. Mantenha o Django em execução.

## Ajustes em relação ao material
Mantidos SQLite e nomes existentes. Não foi introduzido Djongo ou MongoDB.
Migrações entram no Git. Ambiente virtual, banco, .env e node_modules ficam fora.
Adicionados página inicial, dependências do servidor, testes e CI. Não há módulo financeiro.
CI verifica o back-end; não faz deploy e não verifica o build do React.
O projeto tem CRUD aberto e DEBUG ativo para uso local. Antes de publicar, implemente autenticação, permissões e configurações de produção. A chave local é gerada ao iniciar; em ambiente compartilhado use DJANGO_SECRET_KEY estável na configuração do processo.
A licença deve ser escolhida pelos titulares antes da distribuição pública; não foi atribuída uma licença por conta própria.
