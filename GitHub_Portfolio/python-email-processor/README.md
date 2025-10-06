# 📧 Python Email Processor

## 🎯 Descripción
Sistema de automatización para procesamiento masivo de emails, inspirado en el proceso real que desarrollo en Santander. Automatiza la lectura de correos, descarga de adjuntos, matching de datos, generación de reportes y envío automatizado.

## 🛠️ Stack Tecnológico
- **Python 3.9+**
- **imaplib** - Conexión con servidores de email
- **pandas** - Procesamiento y análisis de datos
- **openpyxl** - Generación de archivos Excel
- **smtplib** - Envío automatizado de emails
- **zipfile** - Compresión de archivos
- **logging** - Sistema de logs detallado
- **configparser** - Gestión de configuración

## 🚀 Características Principales
- ✅ **Lectura automática** de emails desde Outlook/Gmail
- ✅ **Descarga inteligente** de adjuntos (filtros por tipo/tamaño)
- ✅ **Matching de datos** entre diferentes fuentes
- ✅ **Generación automática** de reportes Excel
- ✅ **Compresión y envío** automatizado
- ✅ **Logging completo** de todas las operaciones
- ✅ **Gestión de errores** robusta
- ✅ **Configuración flexible** vía archivos

## 📈 Funcionalidades Detalladas

### 📥 Procesamiento de Emails
- **Conexión IMAP** segura con autenticación OAuth2
- **Filtrado avanzado** por remitente, asunto, fecha
- **Descarga selectiva** de adjuntos (PDF, Excel, CSV)
- **Marcado automático** de emails procesados

### 📊 Análisis de Datos
- **Matching inteligente** entre datasets
- **Validación de datos** con reglas personalizables
- **Detección de duplicados** y inconsistencias
- **Generación de métricas** automáticas

### 📄 Generación de Reportes
- **Templates Excel** personalizables
- **Gráficos automáticos** con openpyxl
- **Formato condicional** para destacar anomalías
- **Múltiples hojas** con datos segregados

### 📤 Distribución Automática
- **Compresión ZIP** con contraseña
- **Envío programado** a listas de distribución
- **Plantillas HTML** para emails profesionales
- **Confirmaciones de recepción**

## 🎨 Casos de Uso Reales
- **Procesamiento diario** de ~130 emails corporativos
- **Consolidación** de reportes departamentales
- **Automatización** de informes de cierre mensual
- **Distribución** de dashboards a stakeholders

## 🔧 Instalación y Configuración

```bash
# Clonar repositorio
git clone https://github.com/luaoraa/python-email-processor.git
cd python-email-processor

# Crear entorno virtual
python -m venv venv
source venv/bin/activate  # Linux/Mac
# venv\Scripts\activate   # Windows

# Instalar dependencias
pip install -r requirements.txt

# Configurar credenciales
cp config/config.example.ini config/config.ini
# Editar config.ini con tus credenciales
```

## ⚙️ Configuración
```ini
[EMAIL]
server = outlook.office365.com
port = 993
username = tu_email@empresa.com
use_oauth = true

[PROCESSING]
download_path = ./downloads
output_path = ./output
max_file_size = 10MB
allowed_extensions = .pdf,.xlsx,.csv

[REPORTING]
template_path = ./templates
auto_send = true
recipients = team@empresa.com
```

## 🚀 Uso Básico

```python
from email_processor import EmailProcessor

# Inicializar procesador
processor = EmailProcessor('config/config.ini')

# Procesar emails del día
results = processor.process_daily_emails()

# Generar reporte consolidado
report = processor.generate_report(results)

# Enviar automáticamente
processor.send_report(report, 'Informe Diario')
```

## 📊 Métricas de Rendimiento
- **Procesamiento:** ~130 emails en 5-10 minutos
- **Throughput:** 15-20 emails/minuto
- **Precisión:** 99.5% en matching de datos
- **Uptime:** 24/7 con reintentos automáticos

## 🛡️ Seguridad y Robustez
- **Autenticación OAuth2** para máxima seguridad
- **Encriptación** de credenciales almacenadas
- **Validación** de archivos descargados
- **Backup automático** de configuraciones
- **Rate limiting** para prevenir bloqueos

## 🎯 Valor Empresarial
- **Ahorro de tiempo:** De 2 horas manuales → 10 minutos automatizados
- **Reducción de errores:** Eliminación de errores humanos
- **Escalabilidad:** Procesamiento de volúmenes crecientes  
- **Trazabilidad:** Logs completos de todas las operaciones

## 📝 Próximas Mejoras
- [ ] Interfaz web para configuración
- [ ] Machine Learning para clasificación automática
- [ ] Integración con APIs corporativas
- [ ] Dashboard de monitoreo en tiempo real
- [ ] Alertas inteligentes por Slack/Teams

## 🔗 Integración con Otros Sistemas
- **SharePoint** - Carga automática de documentos
- **Power BI** - Alimentación de dashboards
- **Teams** - Notificaciones automáticas
- **SSIS** - Integración con pipelines existentes

---

**💡 Inspirado en:** El proceso real de migración Access→Python que desarrollo en Santander, automatizando el procesamiento de 130+ emails diarios.

**⚡ Impacto:** Automatización 100% del proceso manual, liberando recursos para tareas de mayor valor.

**📧 Contacto:** luaoraa@gmail.com
