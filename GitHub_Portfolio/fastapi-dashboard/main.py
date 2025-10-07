from fastapi import FastAPI, HTTPException, Depends, Request
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from sqlalchemy import create_engine, Column, Integer, String, Float, DateTime, func
from sqlalchemy.ext.declarative import declarative_base  
from sqlalchemy.orm import sessionmaker, Session
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime, timedelta
import sqlite3
import pandas as pd
import json
import random

# Configuración de la aplicación
app = FastAPI(
    title="Dashboard de Proyectos - Luis Alberto Oraa",
    description="Dashboard para control de horas/proyecto inspirado en mi trabajo en Santander Digital Services",
    version="1.0.0"
)

# Base de datos SQLite
SQLALCHEMY_DATABASE_URL = "sqlite:///./dashboard.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Modelos de base de datos
class ProjectHour(Base):
    __tablename__ = "project_hours"
    
    id = Column(Integer, primary_key=True, index=True)
    employee_name = Column(String, index=True)
    project_name = Column(String, index=True)
    department = Column(String)
    hours_worked = Column(Float)
    date_worked = Column(DateTime, default=datetime.utcnow)
    status = Column(String, default="completed")

# Crear tablas
Base.metadata.create_all(bind=engine)

# Schemas Pydantic
class ProjectHourBase(BaseModel):
    employee_name: str
    project_name: str
    department: str
    hours_worked: float
    status: Optional[str] = "completed"

class ProjectHourCreate(ProjectHourBase):
    pass

class ProjectHourResponse(ProjectHourBase):
    id: int
    date_worked: datetime
    
    class Config:
        from_attributes = True

# Dependency para obtener DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Configurar templates y archivos estáticos
templates = Jinja2Templates(directory="templates")
app.mount("/static", StaticFiles(directory="static"), name="static")

# Generar datos de ejemplo (simula datos reales de Santander)
def generate_sample_data(db: Session):
    # Verificar si ya hay datos
    if db.query(ProjectHour).count() > 0:
        return
    
    employees = [
        "Luis Alberto Oraa", "María González", "Carlos Rodríguez", 
        "Ana Martín", "David López", "Elena Fernández"
    ]
    
    projects = [
        "FastAPI Migration", "Dashboard Modernization", "Email Automation",
        "SSIS Portal Maintenance", "DB2 Scripts Update", "Angular Frontend"
    ]
    
    departments = ["IT Infrastructure", "Data Analysis", "Development", "Systems"]
    
    # Generar 50 registros de ejemplo
    for _ in range(50):
        project_hour = ProjectHour(
            employee_name=random.choice(employees),
            project_name=random.choice(projects),
            department=random.choice(departments),
            hours_worked=round(random.uniform(1.0, 8.0), 2),
            date_worked=datetime.now() - timedelta(days=random.randint(0, 30)),
            status=random.choice(["completed", "in-progress", "pending"])
        )
        db.add(project_hour)
    
    db.commit()

# Endpoint para la página principal
@app.get("/", response_class=HTMLResponse)
async def dashboard_home(request: Request, db: Session = Depends(get_db)):
    # Generar datos de ejemplo si no existen
    generate_sample_data(db)
    
    return templates.TemplateResponse("dashboard.html", {"request": request})

# API Endpoints
@app.get("/api/project-hours", response_model=List[ProjectHourResponse])
async def get_project_hours(db: Session = Depends(get_db)):
    hours = db.query(ProjectHour).all()
    return hours

@app.post("/api/project-hours", response_model=ProjectHourResponse)
async def create_project_hour(project_hour: ProjectHourCreate, db: Session = Depends(get_db)):
    db_hour = ProjectHour(**project_hour.dict())
    db.add(db_hour)
    db.commit()
    db.refresh(db_hour)
    return db_hour

@app.get("/api/dashboard-stats")
async def get_dashboard_stats(db: Session = Depends(get_db)):
    # Estadísticas para el dashboard
    total_hours = db.query(func.sum(ProjectHour.hours_worked)).scalar() or 0
    total_projects = db.query(ProjectHour.project_name).distinct().count()
    total_employees = db.query(ProjectHour.employee_name).distinct().count()
    
    # Horas por proyecto
    hours_by_project = db.query(
        ProjectHour.project_name,
        func.sum(ProjectHour.hours_worked).label('total_hours')
    ).group_by(ProjectHour.project_name).all()
    
    # Horas por empleado
    hours_by_employee = db.query(
        ProjectHour.employee_name,
        func.sum(ProjectHour.hours_worked).label('total_hours')
    ).group_by(ProjectHour.employee_name).all()
    
    # Horas por departamento
    hours_by_department = db.query(
        ProjectHour.department,
        func.sum(ProjectHour.hours_worked).label('total_hours')
    ).group_by(ProjectHour.department).all()
    
    return {
        "total_hours": round(total_hours, 2),
        "total_projects": total_projects,
        "total_employees": total_employees,
        "hours_by_project": [{"name": name, "hours": float(hours)} for name, hours in hours_by_project],
        "hours_by_employee": [{"name": name, "hours": float(hours)} for name, hours in hours_by_employee],
        "hours_by_department": [{"name": name, "hours": float(hours)} for name, hours in hours_by_department]
    }

@app.get("/api/recent-activities")
async def get_recent_activities(db: Session = Depends(get_db)):
    recent = db.query(ProjectHour).order_by(ProjectHour.date_worked.desc()).limit(10).all()
    return [
        {
            "id": activity.id,
            "employee": activity.employee_name,
            "project": activity.project_name,
            "hours": activity.hours_worked,
            "date": activity.date_worked.strftime("%Y-%m-%d"),
            "status": activity.status
        }
        for activity in recent
    ]

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
