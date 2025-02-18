# EduTools - Plataforma Educativa

Una plataforma web que proporciona herramientas y tutoriales educativos para estudiantes universitarios.

## Características

- Herramientas específicas por carrera
- Tutoriales y guías
- Videos educativos
- Sistema de suscripción premium
- API REST con Django
- Frontend moderno con Next.js

## Requisitos

- Python 3.8+
- Node.js 16+
- PostgreSQL
- Cuenta de AWS S3 (para almacenamiento)
- Cuenta de Stripe (para pagos)

## Configuración del Backend

1. Crear un entorno virtual:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # En Windows: .\venv\Scripts\activate
```

2. Instalar dependencias:
```bash
pip install -r requirements.txt
```

3. Configurar variables de entorno:
Crear un archivo `.env` en la carpeta `backend`:
```
DEBUG=True
SECRET_KEY=your-secret-key
DATABASE_URL=postgresql://user:password@localhost:5432/edutools_db
AWS_ACCESS_KEY_ID=your-aws-key
AWS_SECRET_ACCESS_KEY=your-aws-secret
AWS_STORAGE_BUCKET_NAME=your-bucket-name
STRIPE_SECRET_KEY=your-stripe-secret
```

4. Ejecutar migraciones:
```bash
python manage.py migrate
```

5. Crear superusuario:
```bash
python manage.py createsuperuser
```

6. Iniciar servidor:
```bash
python manage.py runserver
```

## Configuración del Frontend

1. Instalar dependencias:
```bash
cd frontend
npm install
```

2. Configurar variables de entorno:
Crear un archivo `.env.local` en la carpeta `frontend`:
```
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=your-stripe-public-key
```

3. Iniciar servidor de desarrollo:
```bash
npm run dev
```

## Despliegue

### Backend
- Se recomienda usar AWS Elastic Beanstalk o Heroku para el backend
- Configurar un bucket S3 para almacenamiento de archivos
- Usar RDS para PostgreSQL

### Frontend
- Se recomienda usar Vercel para el frontend
- Configurar variables de entorno en el panel de Vercel

## Contribuir

1. Fork el repositorio
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT.
