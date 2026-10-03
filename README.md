# Simple Stock Flow · Monorepo Integral

> **Prueba Técnica de Desempeño SDD (Spec-Driven Development)**  
> **Servicio Nacional de Aprendizaje (SENA) · Análisis y Desarrollo de Software (ADSO) · Ficha 3413974**  
> **Desarrollador:** Juan Esteban Doria ([`Doritotes444`](https://github.com/Doritotes444))  
> **Stack Implementado:** PHP 8.2 (Laravel 11) + React 18 (TypeScript + Vite) + MySQL 8.4 LTS + Docker Compose  

---

## 📌 Documentación Maestra y Entrega Técnica
Para consultar el informe completo con diagramas Mermaid (Arquitectura Onion, Modelo Entidad-Relación y Diagrama de Secuencia con Bloqueo Optimista), consulte:  
👉 **[ENTREGA-TECNICA.md](ENTREGA-TECNICA.md)**

---

## 1. ¿Qué es este repositorio y qué rol cumple en Simple Stock Flow?

Este repositorio es el **Monorepo Unificado** que consolida los 6 componentes de *Simple Stock Flow* en un único espacio de trabajo estructurado y directamente ejecutable:

```
test-simple-stock-flow/
├── docker-compose.yml          # Orquestación raíz (1 comando para levantar todo)
├── docker-compose.dev.yml      # Configuración de puertos de desarrollo
├── .env.example                # Variables de entorno preconfiguradas
├── verify.sh / verify.ps1      # Scripts de validación de sondas P-01 a P-42
├── ENTREGA-TECNICA.md          # Informe técnico con diagramas y trazabilidad
│
├── api/                        # Backend REST (Laravel 11 / PHP 8.2) - Arquitectura Onion pura
├── app/                        # Frontend SPA (React 18 + TypeScript + Vite) servido por Nginx
├── infra/                      # Configuración de infraestructura y contenedores
├── docs/                       # Especificación original SDD (Python / .NET), ADRs y constitución
├── page/                       # Sitio público estático de presentación responsivo (cero llamadas API)
└── tool/                       # Herramienta CLI en Python para sembrado idempotente vía API
```

---

## 2. ¿Cómo se ejecuta localmente? (Guía Rápida)

### Con Docker Compose (Un solo comando)
El repositorio raíz contiene el archivo `docker-compose.yml` listo para construir y levantar todo el ecosistema:

```bash
# 1. Clonar el monorepo
git clone https://github.com/Doritotes444/test-simple-stock-flow.git
cd test-simple-stock-flow

# 2. Levantar los contenedores en segundo plano
docker compose up -d --build

# 3. Comprobar el estado de salud de los servicios
docker compose ps
```

#### Puntos de Acceso del Sistema
- **Aplicación Web (SPA en React):** [http://localhost:8080](http://localhost:8080)
- **API REST (Laravel):** [http://localhost:8000](http://localhost:8000)
- **Sonda de Salud (Healthcheck):** [http://localhost:8000/health](http://localhost:8000/health)
- **Página Pública Estática:** Abrir `page/index.html` en el navegador.

#### Credenciales de Acceso Iniciales
- **Rol Administrador:** Usuario `admin@stockflow.com` (o `admin`) / Contraseña `Admin12345!`
- **Rol Vendedor:** Creado desde el panel `/vendedores/nuevo` por un administrador (DP-04).

---

## 3. Variables de entorno requeridas

El archivo `.env.example` en la raíz contiene las claves preconfiguradas:

| Variable | Descripción | Valor por Defecto |
|---|---|---|
| `DB_ROOT_PASSWORD` | Contraseña root del motor MySQL | `rootsecret` |
| `DB_DATABASE` | Base de datos del sistema | `stockflow` |
| `DB_USERNAME` | Usuario de base de datos | `stockflow` |
| `DB_PASSWORD` | Contraseña del usuario MySQL | `stockflowpass` |
| `JWT_SIGNING_KEY` | Clave secreta simétrica HS256 | `super_secret_jwt_key_stock_flow_2026_adso_3413974` |
| `ADMIN_EMAIL` | Correo del administrador inicial | `admin@stockflow.com` |
| `ADMIN_PASSWORD` | Contraseña del administrador inicial | `Admin12345!` |

*Nota (Artículo IX): En producción no se aceptan valores por defecto.*

---

## 4. ¿Cómo se ejecutan las pruebas y validación?

El repositorio incluye suites de validación automatizada de las sondas P-01 a P-42:

### En Linux / macOS / Git Bash:
```bash
./verify.sh
```

### En Windows (PowerShell):
```powershell
.\verify.ps1
```

### Pruebas Unitarias del Backend (Laravel):
```bash
docker compose exec api php artisan test
```

### Sembrado de Datos de Demostración (Opcional):
```bash
cd tool
docker build -t ssf-tool .
docker run --rm --network host ssf-tool seed
```

---

## 5. Decisiones técnicas relevantes tomadas durante la implementación

1. **Monorepo Unificado para Máxima Facilidad de Evaluación:**
   - Permite al evaluador clonar un único repositorio de GitHub y levantar todo el sistema con `docker compose up -d --build`, eliminando la necesidad de gestionar 6 clones separados o lidiar con dependencias rotas de rutas relativas.
2. **Arquitectura Onion Pura en Backend (Artículo I):**
   - El núcleo `api/app/Domain` está programado en PHP 8.2 puro, completamente desacoplado de Laravel y Eloquent.
3. **Persistencia MySQL con Bloqueo Optimista (RN-11 / 409):**
   - Manejo de condiciones de carrera con columna de versión y 3 reintentos automáticos en el caso de uso de registro de ventas.
4. **Respuestas de Error Conformantes a la Invariante D-C9:**
   - Códigos 401, 403, 404 y 405 retornan con cuerpo vacío (`Content-Length: 0`).
   - Errores 400 y 422 utilizan el estándar RFC 7807 (`application/problem+json`).
5. **Independencia del Sitio Estático (`page/`):**
   - El sitio público es 100% autónomo y responsivo, sin realizar llamadas de red a la API.

---

## 6. Repositorios Originales y Forks

Este monorepo unifica los repositorios hermanos previamente sincronizados:
* Monorepo Central: [https://github.com/Doritotes444/test-simple-stock-flow](https://github.com/Doritotes444/test-simple-stock-flow)
* Backend API: [https://github.com/Doritotes444/test-simple-stock-flow-api](https://github.com/Doritotes444/test-simple-stock-flow-api)
* Frontend SPA: [https://github.com/Doritotes444/test-simple-stock-flow-app](https://github.com/Doritotes444/test-simple-stock-flow-app)
* Infraestructura: [https://github.com/Doritotes444/test-simple-stock-flow-infra](https://github.com/Doritotes444/test-simple-stock-flow-infra)
* Documentación: [https://github.com/Doritotes444/test-simple-stock-flow-docs](https://github.com/Doritotes444/test-simple-stock-flow-docs)
* Sitio Estático: [https://github.com/Doritotes444/test-simple-stock-flow-page](https://github.com/Doritotes444/test-simple-stock-flow-page)
* Herramienta CLI: [https://github.com/Doritotes444/test-simple-stock-flow-tool](https://github.com/Doritotes444/test-simple-stock-flow-tool)
