# 📚 Documentación de EduTools

¡Hola! Esta es una guía súper amigable que te explica cómo funciona cada parte de nuestra aplicación EduTools. 

## 🎨 Frontend (La parte que ves en el navegador)

### 📁 Estructura de Carpetas
```
frontend/
├── src/
│   ├── app/          # Páginas de la aplicación
│   ├── components/   # Piezas pequeñas reutilizables
│   ├── lib/          # Herramientas y funciones útiles
│   └── types/        # Definiciones de tipos de datos
```

### 📱 Páginas Principales (`src/app/`)

#### 🏠 `page.tsx` (Página de Inicio)
- Es como la portada de un libro
- Muestra un mensaje de bienvenida bonito
- Tiene botones para ir a otras partes de la app

#### 👥 `careers/page.tsx` (Página de Carreras)
- Como un catálogo de carreras universitarias
- Puedes ver todas las carreras disponibles
- Los profesores pueden agregar, editar o eliminar carreras

#### 🔧 `tools/page.tsx` (Página de Herramientas)
- Una biblioteca de herramientas útiles
- Puedes descargar herramientas para tus estudios
- Algunas son gratis y otras son premium

#### 📖 `tutorials/page.tsx` (Página de Tutoriales)
- Como YouTube pero solo con tutoriales educativos
- Puedes ver videos y leer guías
- Organizados por carrera y tema

### 🧩 Componentes (`src/components/`)

#### 🎯 Carreras
- `CareerList.tsx`: Muestra la lista de carreras como tarjetas bonitas
- `CareerForm.tsx`: Un formulario para crear o editar carreras

#### 🛠️ Herramientas
- `ToolList.tsx`: Muestra las herramientas disponibles
- `ToolForm.tsx`: Para subir nuevas herramientas o editarlas

#### 📚 Tutoriales
- `TutorialList.tsx`: Lista todos los tutoriales disponibles
- `TutorialForm.tsx`: Para crear o editar tutoriales

#### 🎨 Layout
- `Layout.tsx`: Como el marco de un cuadro, da estructura a todas las páginas

### 🔧 Utilidades (`src/lib/`)

#### 🌐 `api.ts`
- Como un cartero que lleva y trae información al servidor
- Tiene funciones para:
  - Obtener listas de carreras, herramientas y tutoriales
  - Crear cosas nuevas
  - Editar cosas existentes
  - Eliminar cosas que ya no necesitamos

#### 📝 `types/index.ts`
- Define cómo debe ser cada cosa en la aplicación
- Como una receta que dice qué ingredientes necesita cada parte

## 🖥️ Backend (El cerebro detrás de todo)

### 📁 Estructura de Carpetas
```
backend/
├── config/         # Configuración general
├── core/           # El corazón de la aplicación
└── media/         # Donde se guardan los archivos
```

### ⚙️ Configuración (`config/`)

#### 🔧 `settings.py`
- Como el panel de control de la aplicación
- Define cosas importantes como:
  - Dónde se guardan los archivos
  - Quién puede acceder a la aplicación
  - Cómo se manejan los usuarios

#### 🛣️ `urls.py`
- Como un mapa que dice dónde está cada cosa
- Define las rutas de la aplicación

### 🎯 Core (`core/`)

#### 📦 `models.py`
- Define cómo se guarda la información
- Tenemos modelos para:
  - `Career`: Información de carreras
  - `Tool`: Herramientas y sus archivos
  - `Tutorial`: Videos y guías
  - `User`: Información de usuarios

#### 👀 `views.py`
- Como un bibliotecario que te ayuda a encontrar lo que buscas
- Maneja todas las peticiones de los usuarios
- Decide quién puede ver qué cosas

#### 🔄 `serializers.py`
- Traduce la información entre el frontend y el backend
- Como un intérprete que hace que todos se entiendan

## 🚀 Cómo Funciona Todo Junto

1. Cuando abres la aplicación en tu navegador:
   - El frontend pide información al backend
   - El backend revisa si tienes permiso para ver esa información
   - Si todo está bien, te muestra lo que pediste

2. Cuando subes una herramienta:
   - El formulario recoge toda la información
   - La envía al backend
   - El backend guarda el archivo y la información
   - ¡Listo! Otros pueden descargar tu herramienta

3. Cuando ves un tutorial:
   - El frontend pide la lista de tutoriales al backend
   - El backend revisa si eres usuario premium
   - Te muestra los tutoriales que puedes ver

## 🔐 Seguridad y Permisos

- Usuarios normales:
  - Pueden ver herramientas y tutoriales gratuitos
  - Pueden descargar herramientas gratuitas

- Usuarios premium:
  - Pueden ver TODO el contenido
  - Pueden descargar todas las herramientas

- Administradores:
  - Pueden crear, editar y eliminar todo
  - Manejan las carreras y el contenido

## 🎯 Consejos para Desarrolladores

1. Siempre reinicia el servidor cuando:
   - Cambias modelos en el backend
   - Modificas la configuración
   - Instalas nuevas dependencias

2. Para arreglar problemas comunes:
   - Revisa los logs del servidor
   - Asegúrate de que el frontend y backend estén corriendo
   - Verifica que las URLs sean correctas

¡Y eso es todo! Ahora sabes cómo funciona cada parte de nuestra aplicación. Si tienes preguntas, ¡no dudes en preguntar! 😊
