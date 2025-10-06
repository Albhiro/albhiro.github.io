# 📊 FastAPI Dashboard

## 🎯 Descripción
Dashboard moderno desarrollado con **FastAPI** como backend y frontend ligero, diseñado para mostrar métricas y KPIs en tiempo real. Inspirado en los dashboards que manejo diariamente en Santander para control de horas/proyecto.

## 🛠️ Stack Tecnológico
- **Backend:** FastAPI (Python 3.9+)
- **Frontend:** HTML5, CSS3, JavaScript (Vanilla)
- **Base de Datos:** SQLite (desarrollo) / PostgreSQL (producción)
- **Visualización:** Chart.js, D3.js
- **Estilo:** Bootstrap 5, CSS Custom
- **API:** RESTful con documentación automática (Swagger)

## 🚀 Características Principales
- ✅ **API RESTful** con documentación automática
- ✅ **Dashboard responsive** para desktop y mobile
- ✅ **Gráficos interactivos** con Chart.js
- ✅ **Autenticación JWT** básica
- ✅ **Validación de datos** con Pydantic
- ✅ **Dockerización** completa
- ✅ **Tests automatizados** con pytest

## 📈 Funcionalidades
### Backend (FastAPI)
- **Endpoints CRUD** para gestión de datos
- **WebSockets** para actualizaciones en tiempo real
- **Middleware** de autenticación y CORS
- **Logging** estructurado
- **Validación** robusta de entrada

### Frontend
- **Dashboard interactivo** con múltiples vistas
- **Filtros dinámicos** por fecha, categoría, etc.
- **Exportación** a PDF/Excel
- **Modo oscuro/claro**
- **Responsive design**

## 🎨 Casos de Uso
- **Control de proyectos** (horas, recursos, progreso)
- **Métricas de equipo** (productividad, KPIs)
- **Análisis financiero** básico
- **Monitoreo de sistemas** (uptime, performance)

## 🔧 Instalación y Uso

```bash
# Clonar el repositorio
git clone https://github.com/luaoraa/fastapi-dashboard.git
cd fastapi-dashboard

# Crear entorno virtual
python -m venv venv
source venv/bin/activate  # Linux/Mac
# venv\Scripts\activate   # Windows

# Instalar dependencias
pip install -r requirements.txt

# Ejecutar en desarrollo
uvicorn main:app --reload

# Acceder al dashboard
http://localhost:8000
```

## 🐳 Docker
```bash
# Construir imagen
docker build -t fastapi-dashboard .

# Ejecutar contenedor
docker run -p 8000:8000 fastapi-dashboard
```

## 📊 Demo Data
El proyecto incluye datos de ejemplo que simulan:
- **Horas de proyecto** por empleado/departamento
- **Métricas de productividad** mensuales
- **Indicadores financieros** básicos
- **Estados de tareas** y proyectos

## 🎯 Objetivo del Proyecto
Demostrar competencias en:
- **Desarrollo full-stack** moderno
- **APIs RESTful** profesionales
- **Visualización de datos** efectiva
- **Mejores prácticas** de desarrollo
- **Dockerización** y despliegue

## 📝 Próximas Mejoras
- [ ] Integración con base de datos PostgreSQL
- [ ] Autenticación OAuth2
- [ ] Notificaciones push
- [ ] Dashboard de administración
- [ ] API rate limiting
- [ ] Métricas avanzadas con Prometheus

---

**💡 Inspirado en:** Los dashboards de control que desarrollo diariamente en Santander Digital Services para gestión de proyectos y recursos.

**🔗 Demo live:** [Próximamente en GitHub Pages]

**📧 Contacto:** luaoraa@gmail.com
