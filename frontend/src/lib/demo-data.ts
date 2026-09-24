/**
 * Sample data bundled with the static GitHub Pages demo (NEXT_PUBLIC_DEMO=true).
 * Everything here is illustrative example content — it is not real usage data.
 */
import type { Career, Tool, Tutorial, User } from '@/types'

const ts = (d: string) => `${d}T10:00:00Z`

export const demoCareers: Career[] = [
  {
    id: 1,
    name: 'Ingeniería de Software',
    description: 'Programación, estructuras de datos, bases de datos y desarrollo de aplicaciones web y móviles.',
    created_at: ts('2025-01-10'),
    updated_at: ts('2025-01-10'),
  },
  {
    id: 2,
    name: 'Medicina',
    description: 'Anatomía, fisiología, farmacología y práctica clínica con recursos de repaso y guías rápidas.',
    created_at: ts('2025-01-12'),
    updated_at: ts('2025-01-12'),
  },
  {
    id: 3,
    name: 'Derecho',
    description: 'Derecho civil, constitucional y procesal: redacción jurídica, análisis de casos y plantillas.',
    created_at: ts('2025-01-14'),
    updated_at: ts('2025-01-14'),
  },
  {
    id: 4,
    name: 'Arquitectura',
    description: 'Diseño, representación gráfica, modelado 3D y cálculo estructural para proyectos de taller.',
    created_at: ts('2025-01-16'),
    updated_at: ts('2025-01-16'),
  },
  {
    id: 5,
    name: 'Administración de Empresas',
    description: 'Finanzas, marketing, contabilidad y planificación estratégica con hojas de cálculo listas para usar.',
    created_at: ts('2025-01-18'),
    updated_at: ts('2025-01-18'),
  },
  {
    id: 6,
    name: 'Psicología',
    description: 'Métodos de investigación, estadística aplicada, evaluación psicológica y redacción APA.',
    created_at: ts('2025-01-20'),
    updated_at: ts('2025-01-20'),
  },
]

type ToolSeed = [id: number, career: number, title: string, description: string, premium: boolean, date: string]

const toolSeeds: ToolSeed[] = [
  [1, 1, 'Plantilla de README profesional', 'Estructura lista para documentar tus proyectos: instalación, uso, arquitectura, capturas y licencia.', false, '2025-02-03'],
  [2, 1, 'Hoja de referencia de Git', 'Los comandos que usarás a diario: ramas, merge, rebase, stash y cómo deshacer errores sin miedo.', false, '2025-02-05'],
  [3, 1, 'Kit de diagramas UML', 'Plantillas editables de casos de uso, clases, secuencia y entidad-relación para tus entregas.', true, '2025-02-09'],
  [4, 2, 'Atlas de anatomía para repaso', 'Láminas resumidas por sistema con estructuras clave señaladas, ideales para antes del examen.', false, '2025-02-11'],
  [5, 2, 'Calculadora de dosis pediátricas', 'Hoja de cálculo para practicar el cálculo de dosis por peso con ejemplos resueltos.', true, '2025-02-14'],
  [6, 2, 'Plantilla de historia clínica', 'Formato estructurado de anamnesis y examen físico para tus prácticas hospitalarias.', false, '2025-02-18'],
  [7, 3, 'Modelos de escritos judiciales', 'Plantillas comentadas de demanda, contestación y recurso de apelación para practicar.', true, '2025-02-20'],
  [8, 3, 'Esquema de la Constitución', 'Mapa conceptual de la parte dogmática y orgánica con los artículos más consultados.', false, '2025-02-22'],
  [9, 3, 'Guía de citación jurídica', 'Cómo citar leyes, jurisprudencia y doctrina de forma correcta y consistente.', false, '2025-02-25'],
  [10, 4, 'Biblioteca de bloques CAD', 'Mobiliario, vegetación y figuras humanas en planta y alzado para tus láminas.', false, '2025-03-01'],
  [11, 4, 'Plantilla de lámina de presentación', 'Formato A1 con cajetín, retícula y jerarquía tipográfica para entregas de taller.', true, '2025-03-04'],
  [12, 4, 'Tabla de predimensionamiento', 'Referencias rápidas para estimar vigas, losas y columnas en etapas tempranas de diseño.', false, '2025-03-07'],
  [13, 5, 'Plantilla de flujo de caja', 'Proyección mensual de ingresos y egresos con gráficos y análisis de escenarios.', false, '2025-03-10'],
  [14, 5, 'Canvas de modelo de negocio', 'Lienzo editable con preguntas guía para cada bloque y un ejemplo completo.', false, '2025-03-12'],
  [15, 5, 'Modelo financiero de 3 estados', 'Estado de resultados, balance y flujo de efectivo conectados para tus casos de estudio.', true, '2025-03-15'],
  [16, 6, 'Plantilla de informe en formato APA', 'Documento con márgenes, títulos, citas y referencias según la 7.ª edición de APA.', false, '2025-03-18'],
  [17, 6, 'Guía de estadística con JASP', 'Paso a paso para pruebas t, ANOVA, correlación y regresión con capturas.', true, '2025-03-21'],
  [18, 6, 'Banco de escalas de evaluación', 'Índice de instrumentos psicométricos frecuentes con su uso, población y confiabilidad.', false, '2025-03-24'],
]

export const demoTools: Tool[] = toolSeeds.map(([id, career, title, description, is_premium, date]) => ({
  id,
  career,
  title,
  description,
  is_premium,
  file: null,
  file_url: '#',
  created_at: ts(date),
  updated_at: ts(date),
}))

type TutorialSeed = [id: number, career: number, tool: number | null, title: string, premium: boolean, date: string, content: string]

const tutorialSeeds: TutorialSeed[] = [
  [1, 1, 2, 'Git desde cero: tu primer repositorio', false, '2025-04-01',
    'Aprende a inicializar un repositorio, hacer commits con mensajes claros y publicar tu trabajo en GitHub.\n\nEmpezaremos configurando tu nombre y correo, luego crearás una rama para cada cambio y aprenderás a fusionarla. Al final sabrás revisar el historial y recuperar versiones anteriores de un archivo.'],
  [2, 1, 1, 'Cómo documentar un proyecto para tu portafolio', false, '2025-04-03',
    'Un buen README es la primera impresión de tu proyecto. Veremos qué secciones incluir, cómo mostrar capturas y cómo explicar la arquitectura en pocas líneas.\n\nIncluye una guía de instalación reproducible y una lista de tecnologías usadas. Termina con los próximos pasos del proyecto.'],
  [3, 1, 3, 'Diagramas de clases que sí se entienden', true, '2025-04-06',
    'Modela un sistema pequeño (biblioteca, tienda o reservas) identificando clases, atributos y relaciones.\n\nTrabajaremos asociaciones, herencia y multiplicidad, y cómo pasar del diagrama al código sin perder el hilo.'],
  [4, 2, 4, 'Repaso del sistema cardiovascular', false, '2025-04-08',
    'Un recorrido por las cavidades del corazón, válvulas y grandes vasos, con preguntas de autoevaluación al final de cada bloque.\n\nUsa el atlas de repaso como apoyo visual mientras avanzas.'],
  [5, 2, 6, 'Cómo redactar una historia clínica completa', false, '2025-04-10',
    'Paso a paso para registrar motivo de consulta, enfermedad actual, antecedentes y examen físico de forma ordenada.\n\nIncluye errores frecuentes y cómo evitarlos durante tus rotaciones.'],
  [6, 2, 5, 'Cálculo de dosis por peso: casos resueltos', true, '2025-04-13',
    'Practica con diez casos clínicos de dificultad creciente usando la calculadora de dosis.\n\nCada caso incluye la fórmula, el resultado y una verificación de seguridad.'],
  [7, 3, 8, 'Leer la Constitución con un mapa conceptual', false, '2025-04-15',
    'Aprende a ubicar rápidamente derechos, garantías y la organización del Estado usando el esquema de la Constitución.\n\nIdeal para preparar controles de lectura y exámenes orales.'],
  [8, 3, 7, 'Estructura de una demanda civil', true, '2025-04-18',
    'Analizamos cada parte de una demanda: encabezado, hechos, fundamentos de derecho, pretensiones y anexos.\n\nCompara tu borrador con el modelo comentado incluido en las herramientas.'],
  [9, 3, 9, 'Citar jurisprudencia correctamente', false, '2025-04-20',
    'Normas prácticas para citar sentencias, leyes y doctrina, con ejemplos correctos e incorrectos.\n\nUn detalle pequeño que mejora mucho la calidad de tus trabajos escritos.'],
  [10, 4, 11, 'Composición de láminas para entregas', false, '2025-04-22',
    'Cómo organizar planos, cortes, perspectivas y textos en una lámina clara usando una retícula.\n\nVeremos jerarquía visual, grosores de línea y paletas sobrias.'],
  [11, 4, 10, 'Ambientar planos con bloques CAD', false, '2025-04-25',
    'Da escala y vida a tus plantas y alzados sin saturarlos. Aprende a insertar, escalar y organizar bloques en capas.'],
  [12, 4, 12, 'Predimensionamiento estructural rápido', true, '2025-04-28',
    'Criterios prácticos para estimar dimensiones de losas, vigas y columnas en anteproyecto, y cuándo pedir un cálculo detallado.'],
  [13, 5, 13, 'Tu primer flujo de caja mensual', false, '2025-05-01',
    'Construye un flujo de caja de doce meses, identifica meses críticos y prueba escenarios optimista y pesimista.'],
  [14, 5, 14, 'Modelo de negocio en una hoja', false, '2025-05-04',
    'Completa el canvas bloque por bloque con un ejemplo real de emprendimiento universitario y valida tus supuestos.'],
  [15, 5, 15, 'Conectar los tres estados financieros', true, '2025-05-07',
    'Entiende cómo una venta, una compra de activo o un préstamo impacta al estado de resultados, al balance y al flujo de efectivo.'],
  [16, 6, 16, 'Formato APA 7 sin complicaciones', false, '2025-05-10',
    'Configura tu documento, cita en el texto y arma la lista de referencias con la plantilla APA.\n\nIncluye una lista de verificación final antes de entregar.'],
  [17, 6, 17, 'Prueba t y ANOVA en JASP', true, '2025-05-13',
    'Carga tus datos, revisa supuestos y reporta resultados en formato APA con tablas y tamaños del efecto.'],
  [18, 6, null, 'Cómo plantear una pregunta de investigación', false, '2025-05-16',
    'De un tema amplio a una pregunta específica, medible y viable. Ejercicios guiados con ejemplos de psicología clínica y educativa.'],
]

export const demoTutorials: Tutorial[] = tutorialSeeds.map(([id, career, tool, title, is_premium, date, content]) => ({
  id,
  career,
  tool,
  title,
  content,
  is_premium,
  video_url: null,
  created_at: ts(date),
  updated_at: ts(date),
}))

export const demoUsers: Record<'admin' | 'student', User> = {
  admin: {
    id: 1,
    email: 'admin@demo.edutools',
    first_name: 'Ana',
    last_name: 'Admin',
    role: 'admin',
    is_premium: true,
  },
  student: {
    id: 2,
    email: 'estudiante@demo.edutools',
    first_name: 'Sofía',
    last_name: 'Estudiante',
    role: 'client',
    is_premium: false,
  },
}
