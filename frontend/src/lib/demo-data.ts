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


/** Longer bodies for a few flagship tutorials, so the reader shows real structure (headings, lists, code). */
const longContent: Record<number, string> = {
  1: "Aprende a inicializar un repositorio, hacer commits con mensajes claros y publicar tu trabajo en GitHub. Al final sabrás revisar el historial y recuperar versiones anteriores de un archivo.\n\n## 1. Configura tu identidad\n\nGit firma cada commit con tu nombre y correo. Configúralos una sola vez por computadora:\n\n```\ngit config --global user.name \"Tu Nombre\"\ngit config --global user.email \"tu@correo.com\"\ngit config --global init.defaultBranch main\n```\n\n## 2. Crea tu primer repositorio\n\nEntra a la carpeta de tu proyecto y conviértela en un repositorio. Git creará una carpeta oculta `.git` donde guarda todo el historial.\n\n```\ncd mi-proyecto\ngit init\ngit status\n```\n\n`git status` es el comando que más usarás: te dice qué archivos cambiaron, cuáles están preparados y cuáles Git todavía no conoce.\n\n## 3. El ciclo básico: modificar, preparar, confirmar\n\n1. Edita tus archivos como siempre.\n2. Prepara los cambios que quieres guardar con `git add archivo.py` (o `git add .` para todo).\n3. Confírmalos con un mensaje que explique el porqué: `git commit -m \"Agrega validación del formulario de registro\"`.\n\nUn buen mensaje de commit empieza con un verbo en presente y cabe en una línea. Evita mensajes como \"cambios\" o \"arreglos\": dentro de un mes no sabrás qué significan.\n\n## 4. Trabaja en ramas\n\nLas ramas te permiten probar ideas sin romper la versión estable. Crea una rama por cada funcionalidad o corrección:\n\n```\ngit switch -c feature/login\n# ... trabajas y haces commits ...\ngit switch main\ngit merge feature/login\n```\n\nSi Git encuentra cambios incompatibles en las mismas líneas, marcará un conflicto. Abre el archivo, elige qué versión conservar, borra los marcadores `<<<<<<<`, `=======` y `>>>>>>>`, y confirma el resultado.\n\n## 5. Publica en GitHub\n\nCrea un repositorio vacío en GitHub, copia su URL y conéctalo como remoto:\n\n```\ngit remote add origin https://github.com/usuario/mi-proyecto.git\ngit push -u origin main\n```\n\nA partir de ahí, `git push` sube tus commits y `git pull` trae los de tus compañeros.\n\n## 6. Revisa y recupera el historial\n\n- `git log --oneline --graph` muestra el historial compacto con las ramas.\n- `git diff` compara tu trabajo actual con el último commit.\n- `git restore archivo.py` descarta cambios que aún no confirmaste.\n- `git restore --source=<commit> archivo.py` recupera un archivo tal como estaba en un commit anterior.\n\n## Lista de verificación\n\n- Agrega un `.gitignore` antes del primer commit (dependencias, archivos `.env`, carpetas de compilación).\n- Haz commits pequeños y frecuentes.\n- Nunca subas contraseñas ni claves de API al repositorio.",
  2: "Un buen README es la primera impresión de tu proyecto. Quien lo abra (un profesor, un compañero o un reclutador) debería entender en menos de un minuto qué hace, cómo se ve y cómo ejecutarlo.\n\n## Las secciones que no pueden faltar\n\n1. **Título y una frase de propósito.** Qué problema resuelve y para quién.\n2. **Captura o GIF.** Una imagen vale más que tres párrafos de descripción.\n3. **Tecnologías.** Lista corta del stack: lenguaje, framework, base de datos, servicios externos.\n4. **Cómo ejecutarlo.** Comandos exactos, en orden, que funcionen en una máquina limpia.\n5. **Arquitectura.** Un diagrama simple o un párrafo que explique cómo se conectan las piezas.\n6. **Estado y próximos pasos.** Qué está terminado, qué está en desarrollo y qué planeas agregar.\n\n## Escribe instrucciones reproducibles\n\nPrueba tus propias instrucciones clonando el repositorio en otra carpeta. Si tuviste que hacer algo que no está escrito, agrégalo. Un bloque típico se ve así:\n\n```\ngit clone https://github.com/usuario/proyecto.git\ncd proyecto\ncp .env.example .env\nnpm install\nnpm run dev\n```\n\nIncluye siempre un archivo `.env.example` con las variables necesarias, pero sin valores secretos.\n\n## Muestra, no solo cuentes\n\n- Guarda las capturas en una carpeta `docs/` y enlázalas con rutas relativas.\n- Si el proyecto tiene una demo en línea, pon el enlace arriba, junto al título.\n- Una tabla con los endpoints principales de la API ayuda a entender el backend rápidamente.\n\n## Sé honesto con el alcance\n\nSi una funcionalidad está a medias (por ejemplo, pagos o notificaciones), dilo. Marcarla como \"en desarrollo\" genera más confianza que prometer algo que no funciona cuando alguien lo prueba.\n\n## Errores frecuentes\n\n- README vacío o con la plantilla por defecto del framework.\n- Instrucciones que asumen herramientas instaladas sin mencionarlas.\n- Capturas desactualizadas que no coinciden con la interfaz actual.\n- Enlaces rotos a demos que ya no existen.",
  5: "La historia clínica es el documento central de la atención médica: ordena la información del paciente, respalda tus decisiones y permite que otros profesionales continúen el cuidado. Esta guía sigue el orden clásico que usarás en tus rotaciones.\n\n## 1. Datos de identificación\n\nNombre, edad, sexo, ocupación, procedencia, fecha y hora de la atención y fuente de la información (el propio paciente, un familiar o un acompañante). Indica si la fuente es confiable.\n\n## 2. Motivo de consulta\n\nEscríbelo en una frase, idealmente con las palabras del paciente y el tiempo de evolución. Por ejemplo: \"dolor en el pecho desde hace dos horas\".\n\n## 3. Enfermedad actual\n\nEs la sección más importante. Describe el síntoma principal de forma cronológica y detallada:\n\n- Inicio: súbito o progresivo, y en qué circunstancias.\n- Localización e irradiación.\n- Características, intensidad y duración.\n- Factores que lo agravan o lo alivian.\n- Síntomas acompañantes y tratamientos que ya recibió.\n\n## 4. Antecedentes\n\n1. Personales patológicos: enfermedades crónicas, cirugías, hospitalizaciones, alergias y medicación habitual.\n2. Personales no patológicos: hábitos, consumo de tabaco o alcohol, actividad física.\n3. Familiares: enfermedades relevantes en padres y hermanos.\n4. Gineco-obstétricos cuando corresponda.\n\n## 5. Revisión por sistemas\n\nPregunta de forma breve por cada aparato o sistema para detectar síntomas que el paciente no mencionó. Registra también los hallazgos negativos importantes.\n\n## 6. Examen físico\n\nEmpieza por los signos vitales y el aspecto general, y luego avanza de la cabeza a los pies. Describe lo que observas, no tu interpretación: \"murmullo vesicular disminuido en base derecha\" es más útil que \"pulmón alterado\".\n\n## 7. Impresión diagnóstica y plan\n\nEnumera los diagnósticos probables en orden de prioridad y, para cada uno, los estudios y el tratamiento que propones.\n\n## Errores frecuentes\n\n- Mezclar la enfermedad actual con los antecedentes.\n- Usar abreviaturas que no son estándar.\n- Olvidar las alergias o la medicación habitual.\n- No registrar la hora de la atención.",
  13: "Un flujo de caja muestra cuánto dinero entra y sale de un negocio mes a mes. A diferencia del estado de resultados, no mide si ganas o pierdes, sino si tendrás efectivo disponible para pagar tus obligaciones a tiempo.\n\n## 1. Arma la estructura\n\nUsa una hoja de cálculo con los doce meses en columnas y estas filas:\n\n1. Saldo inicial de caja.\n2. Ingresos: ventas al contado, cobros de ventas a crédito, otros ingresos.\n3. Egresos: compras, sueldos, alquiler, servicios, impuestos, cuotas de préstamos.\n4. Flujo neto del mes (ingresos menos egresos).\n5. Saldo final, que será el saldo inicial del mes siguiente.\n\n## 2. Registra cuándo se cobra y cuándo se paga\n\nEl error más común es anotar las ventas en el mes en que se facturan. Si vendes a 30 días, el dinero entra el mes siguiente. Lo mismo ocurre con los proveedores que te dan crédito.\n\n## 3. Identifica los meses críticos\n\nMarca con formato condicional los meses en los que el saldo final queda por debajo de tu colchón mínimo. Esos son los meses en los que necesitarás:\n\n- Adelantar cobros o negociar plazos con proveedores.\n- Posponer compras que no son urgentes.\n- Tramitar con anticipación una línea de crédito.\n\n## 4. Prueba escenarios\n\nDuplica la hoja y cambia los supuestos principales:\n\n- Escenario optimista: ventas un 15 % por encima de lo previsto.\n- Escenario pesimista: ventas un 20 % por debajo y cobros con un mes de retraso.\n\nCompara los saldos finales. Si el escenario pesimista deja la caja en negativo durante varios meses, el plan necesita ajustes antes de empezar.\n\n## Lista de verificación\n\n- Cada cifra tiene un supuesto explicado en una nota.\n- Los impuestos aparecen en el mes en que realmente se pagan.\n- El saldo final de diciembre coincide con la suma de todos los flujos más el saldo inicial.",
  16: "El estilo APA 7 es el formato más usado en psicología y en muchas carreras de ciencias sociales. Esta guía cubre lo que necesitas para entregar un trabajo sin observaciones de formato.\n\n## 1. Configura el documento\n\n- Márgenes de 2,54 cm en los cuatro lados.\n- Fuente legible y consistente, por ejemplo Calibri 11, Arial 11 o Times New Roman 12.\n- Interlineado doble en todo el texto, incluidas las referencias.\n- Sangría de 1,27 cm en la primera línea de cada párrafo.\n- Número de página en la esquina superior derecha.\n\nLa plantilla APA incluida en las herramientas ya trae estos ajustes.\n\n## 2. Cita en el texto\n\nAPA usa el sistema autor-fecha. Hay dos formas:\n\n- Narrativa: García (2021) encontró que…\n- Parentética: …según estudios recientes (García, 2021).\n\nCon dos autores, cita siempre ambos: (Pérez y Soto, 2020). Con tres o más, usa solo el primero seguido de \"et al.\": (Ramírez et al., 2019). En las citas textuales agrega la página: (García, 2021, p. 45).\n\n## 3. Arma la lista de referencias\n\n1. Empieza en una página nueva con el título \"Referencias\" centrado y en negrita.\n2. Ordena las entradas alfabéticamente por el apellido del primer autor.\n3. Aplica sangría francesa de 1,27 cm.\n4. Incluye el DOI como enlace cuando el artículo lo tenga.\n\nFormato básico de un artículo de revista:\n\n```\nApellido, A. A., y Apellido, B. B. (Año). Título del artículo.\n    Nombre de la Revista, volumen(número), páginas.\n    https://doi.org/xxxx\n```\n\n## 4. Tablas y figuras\n\nNuméralas en orden de aparición, con el número en negrita y el título en cursiva sobre la tabla o figura. Menciónalas en el texto antes de que aparezcan.\n\n## Lista de verificación final\n\n- Cada cita del texto aparece en las referencias, y viceversa.\n- Los años coinciden entre la cita y la referencia.\n- No hay referencias a fuentes que no leíste.\n- El interlineado doble se mantiene en todo el documento.",
}

export const demoTutorials: Tutorial[] = tutorialSeeds.map(([id, career, tool, title, is_premium, date, content]) => ({
  id,
  career,
  tool,
  title,
  content: longContent[id] ?? content,
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
