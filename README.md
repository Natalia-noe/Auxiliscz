# AuxilioSCZ — Plataforma Inteligente de Emergencias Vehiculares
### Santa Cruz de la Sierra, Bolivia

---

## Arquitectura del sistema

```
┌─────────────────┐    ┌─────────────────┐
│  Flutter (móvil)│    │  Angular (web)  │
│   Conductor     │    │    Taller       │
└────────┬────────┘    └────────┬────────┘
         │                     │
         └─────────┬───────────┘
                   ▼
         ┌─────────────────┐
         │  FastAPI Backend │
         │  (Python)        │
         ├─────────────────┤
         │  Motor de IA    │  ← Whisper + GPT-4o Vision
         │  Motor Asign.   │  ← Score: distancia+tipo+prio
         │  WebSockets     │  ← Tiempo real
         │  Push Notif.    │  ← Firebase FCM
         └────────┬────────┘
                  ▼
         ┌─────────────────┐
         │   PostgreSQL    │
         │   + S3 (media)  │
         └─────────────────┘
```

---

## Stack tecnológico

| Capa | Tecnología |
|------|-----------|
| App móvil (conductor) | Flutter 3.x |
| App web (taller) | Angular 17+ |
| Backend | FastAPI (Python 3.11+) |
| Base de datos | PostgreSQL 15+ |
| IA — Audio | OpenAI Whisper |
| IA — Visión | GPT-4o Vision |
| IA — Clasificación | GPT-4o-mini |
| Notificaciones push | Firebase FCM |
| Almacenamiento media | AWS S3 |
| Auth | JWT (python-jose) |

---

## Instalación rápida

### 1. Backend (FastAPI)

```bash
cd backend
python -m venv venv
source venv/bin/activate        # Linux/Mac
# venv\Scripts\activate         # Windows

pip install -r requirements.txt

# Variables de entorno
cp .env.example .env
# Editar .env con tus credenciales

# Crear tablas
alembic upgrade head

# Correr servidor
uvicorn app.main:app --reload --port 8000
```

### 2. Variables de entorno (.env)

```env
DATABASE_URL=postgresql://user:password@localhost:5432/auxilio_scz
SECRET_KEY=tu-clave-secreta-larga
OPENAI_API_KEY=sk-...
FIREBASE_CREDENTIALS_PATH=./firebase-credentials.json
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_BUCKET_NAME=auxilio-scz-media
```

### 3. App web Angular

```bash
cd frontend-angular
npm install
ng serve                        # Desarrollo: http://localhost:4200
ng build --configuration=production  # Producción
```

### 4. App móvil Flutter

```bash
cd flutter-app
flutter pub get
flutter run                     # Emulador o dispositivo físico
flutter build apk               # Android APK
flutter build ios               # iOS
```

---

## Módulos del sistema

### Módulos de IA

| Módulo | Archivo | Descripción |
|--------|---------|-------------|
| Transcripción de audio | `ai_modules/todos.py` | Whisper convierte voz a texto |
| Visión artificial | `ai_modules/todos.py` | GPT-4o analiza fotos del vehículo |
| Clasificación | `ai_modules/todos.py` | Determina tipo y prioridad del incidente |
| Generación de resumen | `ai_modules/todos.py` | Crea ficha estructurada para el taller |

### Tipos de incidente soportados

- `bateria` — Batería descargada / problemas eléctricos
- `llanta` — Pinchazo / llanta ponchada
- `motor` — Falla mecánica / sobrecalentamiento
- `choque` — Accidente / colisión
- `llave` — Pérdida de llave / llave encerrada
- `otro` — Problema no clasificado
- `incierto` — Información insuficiente (solicita más datos)

### Niveles de prioridad

| Nivel | Valor | Tipos |
|-------|-------|-------|
| Alta | 1 | choque, motor grave |
| Media | 2 | batería, llave, llanta |
| Baja | 3 | revisión, otro |

---

## API Endpoints principales

```
POST   /api/auth/register          Registro de usuario/taller
POST   /api/auth/login             Login → JWT

POST   /api/incidentes/            Crear incidente (multipart: foto+audio+GPS)
GET    /api/incidentes/{id}        Estado del incidente
PATCH  /api/incidentes/{id}/estado Actualizar estado (taller)
GET    /api/incidentes/talleres/disponibles  Solicitudes para el taller

GET    /api/talleres/cercanos      Talleres cercanos a coordenadas
POST   /api/talleres/              Registrar taller

GET    /api/ia/analisis/{id}       Ver análisis IA de un incidente
POST   /api/pagos/                 Registrar pago (genera 10% comisión)
```

---

## Modelo de comisiones

- El conductor paga el servicio directamente desde la app
- La plataforma descuenta automáticamente el **10%** como comisión
- El 90% restante va al taller
- Registro completo en la tabla `pagos`

---

## Flujo principal de emergencia

```
1. Conductor abre app → GPS activo
2. Toma foto + graba audio + escribe descripción (opcional)
3. Presiona "Solicitar emergencia" → POST /api/incidentes/
4. Backend guarda en DB → lanza tarea background (IA)
5. Whisper transcribe audio
6. GPT-4o Vision analiza foto
7. Clasificador determina: tipo="bateria", prioridad=2
8. Motor de asignación calcula puntajes de talleres cercanos
9. Selecciona el mejor taller → asigna incidente
10. Push notification al conductor: "AutoFix SCZ en camino (8 min)"
11. Push notification al taller: nueva solicitud
12. Taller acepta → actualiza estado → técnico se desplaza
13. Técnico llega → actualiza a "atendido" + ingresa costo
14. Conductor califica → se registra en historial
15. Sistema calcula comisión 10% y registra pago
```

---

## Estructura del repositorio

```
auxilio-scz/
├── backend/
│   ├── app/
│   │   ├── main.py                  # FastAPI app
│   │   ├── core/
│   │   │   ├── database.py          # SQLAlchemy + conexión
│   │   │   └── security.py          # JWT + hash contraseñas
│   │   ├── models/
│   │   │   └── models.py            # Modelos SQLAlchemy
│   │   ├── schemas/                 # Pydantic schemas
│   │   ├── api/routes/
│   │   │   ├── auth.py
│   │   │   ├── incidentes.py        # Ruta principal
│   │   │   ├── talleres.py
│   │   │   ├── ia.py
│   │   │   └── pagos.py
│   │   ├── services/
│   │   │   ├── asignacion.py        # Motor de asignación
│   │   │   └── notificaciones.py    # Firebase push
│   │   └── ai_modules/
│   │       └── todos.py             # Whisper + GPT-4o + clasificador
│   └── requirements.txt
│
├── frontend-angular/
│   └── src/
│       ├── incidente.service.ts     # Servicio HTTP Angular
│       └── ...
│
└── flutter-app/
    └── lib/
        ├── emergencia_screen.dart   # Pantalla principal conductor
        └── ...
```
