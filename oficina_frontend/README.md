# Front-end — Oficina Mecânica

Front-end React + Vite para a API Django REST Framework do projeto `oficina_mecanica`.

## Endpoints esperados

- `GET/POST /api/clientes/`
- `GET/POST /api/veiculos/`
- `GET/POST /api/funcionarios/`
- `GET/POST /api/ordens-servico/`
- `GET/PUT/PATCH/DELETE /api/<recurso>/<id>/`

## 1. Configurar o back-end Django para aceitar o front-end

No ambiente virtual do Django:

```bash
pip install django-cors-headers
```

Em `config/settings.py`, adicione:

```python
INSTALLED_APPS = [
    # ...
    'corsheaders',
    'rest_framework',
    'core',
]
```

Em `MIDDLEWARE`, deixe `CorsMiddleware` antes de `CommonMiddleware`:

```python
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    # ...
]
```

E adicione:

```python
CORS_ALLOWED_ORIGINS = [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
]
```

## 2. Rodar o Django

Na pasta que contém `manage.py`:

```bash
python manage.py runserver
```

A API deve responder em `http://127.0.0.1:8000/api/`.

## 3. Rodar o React

Abra outro terminal dentro desta pasta `oficina_frontend`:

```bash
npm install
```

Crie o arquivo `.env` copiando `.env.example`:

```env
VITE_API_URL=http://127.0.0.1:8000/api
```

Depois:

```bash
npm run dev
```

Abra o endereço mostrado pelo Vite, normalmente `http://localhost:5173`.

## Estrutura sugerida

```text
projeto_oficina/
├── oficina_mecanica/       # Django
│   ├── config/
│   ├── core/
│   ├── manage.py
│   └── db.sqlite3
│
└── oficina_frontend/       # React
    ├── src/
    ├── package.json
    ├── vite.config.js
    └── .env
```

Os dois projetos continuam independentes. O React não entra dentro do Django: ele envia requisições HTTP para a API Django.
