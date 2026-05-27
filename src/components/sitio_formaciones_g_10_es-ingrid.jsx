import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, BrainCircuit, Cloud, Code2, Database, GitBranch, Rocket, Sparkles, Workflow, CheckCircle2, Compass, GraduationCap, Clock, Filter, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// --- CONFIGURAÇÃO DE CORES ONE (Oracle Next Education) ---
const COLORS = {
  primary: "#1E1B18",    // Preto suave (texto/logo)
  accent: "#C8A27A",     // Dourado/Tierra (detalhes)
  bg: "#FDFCFB",         // Off-white/Creme claro (fundo)
  secondaryBg: "#F1ECE7" // Bege claro (cards/detalhes)
};

const formations = [
  {
    id: 'nivelacion',
    title: 'Nivelación',
    badge: 'Para comenzar con base sólida',
    icon: GraduationCap,
    hours: 44,
    level: 'Inicial',
    audience: ['Principiantes', 'Transición de carrera', 'Primer empleo tech'],
    bestFor: 'Estudiantes que todavía están construyendo sus fundamentos de lógica, programación, IA, Python y Git/GitHub.',
    summary:
      'Una ruta de entrada para quienes necesitan fortalecer bases antes de avanzar hacia IA, datos, back-end o automatización.',
    courses: [
      { title: 'Pensamiento Computacional: Fundamentos de la Computación y Lógica de Programación', hours: 8, tags: ['Lógica', 'Computación'] },
      { title: 'Fundamentos de IA: estructura y enfoques de los sistemas inteligentes', hours: 8, tags: ['IA', 'Agentes'] },
      { title: 'Fundamentos de IA: algoritmos y enfoques de Machine Learning', hours: 8, tags: ['Machine Learning', 'Datos'] },
      { title: 'Python: Inteligencia Artificial Aplicada', hours: 12, tags: ['Python', 'IA aplicada'] },
      { title: 'Git y GitHub: compartiendo y colaborando en proyectos', hours: 8, tags: ['Git', 'Portafolio'] },
    ],
    recommendation: 'Empieza aquí si vienes de otra área, tienes poca experiencia práctica o quieres revisar fundamentos antes del challenge.',
    color: 'from-slate-50 to-slate-100',
  },
  {
    id: 'generativa',
    title: 'Desarrollo y Orquestación con IA Generativa',
    badge: 'IA para crear, probar y mejorar código',
    icon: BrainCircuit,
    hours: 21,
    level: 'Inicial a intermedio',
    audience: ['Back-end', 'Front-end', 'Full-stack', 'Productividad dev'],
    bestFor: 'Personas que quieren usar IA para acelerar prototipos, mejorar código y entender cómo conectar LLMs con Python y LangChain.',
    summary:
      'Formación orientada al uso práctico de herramientas como ChatGPT, Gemini, Claude y Grok para desarrollo, prototipado y preparación profesional.',
    courses: [
      { title: 'IA para Desarrolladores: desarrollando códigos con ChatGPT, Grok, Claude y Gemini', hours: 5, tags: ['Prompts', 'Código'] },
      { title: 'Gemini y Python: orquestando LLMs con LangChain', hours: 8, tags: ['Python', 'LangChain'] },
      { title: 'Inteligencia Artificial: preparación para el mercado', hours: 8, tags: ['Portafolio', 'Carrera'] },
    ],
    recommendation: 'Ideal después de Nivelación o en paralelo si ya programas y quieres aplicar IA en tu flujo de trabajo.',
    color: 'from-violet-50 to-indigo-100',
  },
  {
    id: 'agentes',
    title: 'Ingeniería de Agentes y Automatización con IA',
    badge: 'Agentes, LangGraph y workflows inteligentes',
    icon: Workflow,
    hours: 26,
    level: 'Intermedio',
    audience: ['Back-end', 'Full-stack', 'Automatización', 'DevOps inicial'],
    bestFor: 'Estudiantes con base en programación que quieren construir agentes, multiagentes y automatizaciones con n8n, LangGraph y servicios externos.',
    summary:
      'Una ruta para crear sistemas que razonan, usan herramientas, automatizan procesos y conectan servicios como GitHub, Gmail, Sheets o Slack.',
    courses: [
      { title: 'Agentes de IA con LangGraph', hours: 2, tags: ['LangGraph', 'Agentes'] },
      { title: 'LangGraph: orquestación de agentes y multiagentes', hours: 10, tags: ['Multiagentes', 'Flujos'] },
      { title: 'n8n: crea automatizaciones inteligentes', hours: 4, tags: ['n8n', 'Automatización'] },
      { title: 'Automatización de flujos: integrando n8n e IA', hours: 8, tags: ['IA', 'Operaciones'] },
      { title: 'n8n para devs: construyendo workflows inteligentes', hours: 2, tags: ['GitHub', 'Dev workflow'] },
    ],
    recommendation: 'Recomendada para quienes ya tienen fundamentos y quieren construir soluciones útiles para procesos reales.',
    color: 'from-emerald-50 to-teal-100',
  },
  {
    id: 'rag',
    title: 'Inteligencia de Datos y RAG Avanzado',
    badge: 'Datos, documentos, agentes y recuperación aumentada',
    icon: Database,
    hours: 24,
    level: 'Intermedio a avanzado',
    audience: ['Ciencia de datos', 'Analítica', 'IA aplicada', 'Back-end con datos'],
    bestFor: 'Personas interesadas en crear asistentes que consultan documentos, CSVs, bases vectoriales y pipelines de recuperación de información.',
    summary:
      'Formación enfocada en RAG, embeddings, LangChain, análisis de datos con agentes, PDFs, CSVs, Streamlit y evaluación de respuestas.',
    courses: [
      { title: 'RAG y agentes de IA', hours: 2, tags: ['RAG', 'LangChain'] },
      { title: 'LangChain: técnicas avanzadas de RAG', hours: 10, tags: ['Embeddings', 'Vector DB'] },
      { title: 'LangChain: automatizando el análisis de datos con agentes', hours: 12, tags: ['CSV', 'Streamlit'] },
    ],
    recommendation: 'La ruta más indicada para perfiles de datos, IA aplicada o estudiantes que quieren crear proyectos con información propia.',
    color: 'from-sky-50 to-cyan-100',
  },
  {
    id: 'oci',
    title: 'Oracle Cloud Infrastructure',
    badge: 'Nube, despliegue e infraestructura',
    icon: Cloud,
    hours: 18,
    level: 'Intermedio',
    audience: ['Back-end', 'Full-stack', 'Cloud', 'Infraestructura'],
    bestFor: 'Estudiantes que desean aprender a desplegar aplicaciones, configurar servidores, bases de datos, redes y recursos en la nube de Oracle.',
    summary:
      'Formación orientada a llevar proyectos a la nube, trabajar con infraestructura como código, Object Storage, aplicaciones NodeJS y ambientes LAMP.',
    courses: [
      { title: 'Oracle Cloud Infrastructure: implementación de una aplicación en la nube', hours: 8, tags: ['Cloud', 'Deploy'] },
      { title: 'Oracle Cloud Infrastructure: base de datos e infraestructura como código', hours: 10, tags: ['Base de datos', 'IaC'] },
    ],
    recommendation: 'Muy útil si tu challenge necesita ser publicado, desplegado o conectado con servicios de nube.',
    color: 'from-orange-50 to-amber-100',
  },
];

const paths = [
  {
    id: 'beginner',
    title: 'Estoy empezando o vengo de otra área',
    icon: Compass,

    totalHours: 65,
    weeklyHours: '6-8h',
    intensity: 'Moderado',
    duration: '8 semanas',

    steps: [
      'Nivelación',
      'Desarrollo y Orquestación con IA Generativa',
      'Challenge',
    ],

    note:
      'Ruta recomendada para quienes están comenzando. La combinación de Nivelación e IA Generativa ofrece una base sólida para participar del challenge con más seguridad y autonomía.',
  },

  {
    id: 'backend',
    title: 'Quiero crecer en back-end o full-stack',
    icon: Code2,

    totalHours: 65,
    weeklyHours: '7-8h',
    intensity: 'Moderado',
    duration: '8 semanas',

    steps: [
      'Desarrollo y Orquestación con IA Generativa',
      'Ingeniería de Agentes y Automatización con IA',
      'Oracle Cloud Infrastructure',
      'Challenge',
    ],

    note:
      'Una ruta orientada a quienes quieren crear aplicaciones más completas, automatizaciones inteligentes y proyectos desplegados en la nube.',
  },

  {
    id: 'data',
    title: 'Me interesa ciencia de datos o IA aplicada',
    icon: Database,

    totalHours: 89,
    weeklyHours: '10-12h',
    intensity: 'Intensivo',
    duration: '8 semanas',

    steps: [
      'Nivelación',
      'Desarrollo y Orquestación con IA Generativa',
      'Inteligencia de Datos y RAG Avanzado',
      'Challenge',
    ],

    note:
      'La ruta más intensa del programa. Recomendada para estudiantes que quieran profundizar en RAG, embeddings, análisis de datos y asistentes con información propia.',
  },

  {
    id: 'frontend',
    title: 'Tengo perfil front-end y quiero sumar IA',
    icon: Sparkles,

    totalHours: 47,
    weeklyHours: '5-6h',
    intensity: 'Ligero a moderado',
    duration: '8 semanas',

    steps: [
      'Desarrollo y Orquestación con IA Generativa',
      'Ingeniería de Agentes y Automatización con IA',
      'Challenge',
    ],

    note:
      'Ideal para desarrolladores front-end que quieren integrar IA, asistentes y automatizaciones en sus proyectos sin enfocarse profundamente en infraestructura o ciencia de datos.',
  },
];

const filters = ['Todas', 'Principiantes', 'Back-end', 'Datos', 'Full-stack', 'Automatización', 'Cloud'];

function totalHours(items) {
  return items.reduce((sum, item) => sum + item.hours, 0);
}

export default function FormacionesG10Site() {
  const [activeFilter, setActiveFilter] = useState('Todas');

  const visibleFormations = useMemo(() => {
    if (activeFilter === 'Todas') return formations;
    if (activeFilter === 'Datos') return formations.filter((f) => f.audience.some((a) => a.includes('datos') || a.includes('Analítica') || a.includes('IA aplicada')) || f.id === 'rag');
    return formations.filter((f) => f.audience.some((a) => a.toLowerCase().includes(activeFilter.toLowerCase())) || f.title.toLowerCase().includes(activeFilter.toLowerCase()));
  }, [activeFilter]);

  const programHours = totalHours(formations);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="relative overflow-hidden px-6 py-16 sm:px-10 lg:px-20">
        <div className="absolute inset-0 opacity-30" aria-hidden="true">
          <div className="absolute left-10 top-10 h-72 w-72 rounded-full bg-indigo-500 blur-3xl" />
          <div className="absolute bottom-0 right-10 h-80 w-80 rounded-full bg-cyan-500 blur-3xl" />
        </div>

        {/* ÁREA DA LOGO ATUALIZADA */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-6 mb-12 border-l-4 border-[#1E1B18] pl-6"
        >
          <div className="flex flex-col">
            <span className="text-3xl font-black tracking-tighter uppercase leading-none">ONE</span>
            <span className="text-[10px] font-medium leading-tight">Oracle Next<br />Education</span>
          </div>

          <div className="h-12 w-px bg-slate-300" />

          <div className="flex flex-col">
            <span className="text-3xl font-black tracking-tighter uppercase leading-none">AI FOR TECH</span>
          </div>
        </motion.div>

        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-cyan-100 backdrop-blur">
              <Rocket className="h-4 w-4" /> Programa educativo gratuito
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Elige tu ruta de aprendizaje para prepararte mejor para el challenge
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Las formaciones son conjuntos de cursos pensados para ayudarte a avanzar según tu perfil: nivel inicial, back-end, datos, full-stack, automatización, IA generativa o nube. Ninguna formación es obligatoria: el único contenido obligatorio será el challenge individual.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#rutas"><Button className="rounded-2xl px-5 py-6 text-base">Descubrir mi ruta</Button></a>
              <a href="#formaciones"><Button variant="outline" className="rounded-2xl border-white/20 bg-white/5 px-5 py-6 text-base text-white hover:bg-white/10">Ver formaciones</Button></a>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.55, delay: 0.1 }}>
            <Card className="rounded-[2rem] border-white/10 bg-white/10 text-white shadow-2xl backdrop-blur">
              <CardContent className="p-7">
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-3xl bg-white/10 p-5">
                    <p className="text-sm text-slate-300">Formaciones</p>
                    <p className="mt-2 text-4xl font-bold">5</p>
                  </div>
                  <div className="rounded-3xl bg-white/10 p-5">
                    <p className="text-sm text-slate-300">Cursos sugeridos</p>
                    <p className="mt-2 text-4xl font-bold">18</p>
                  </div>
                  <div className="rounded-3xl bg-white/10 p-5">
                    <p className="text-sm text-slate-300">Carga total</p>
                    <p className="mt-2 text-4xl font-bold">{programHours}h</p>
                  </div>
                  <div className="rounded-3xl bg-white/10 p-5">
                    <p className="text-sm text-slate-300">Obligatorio</p>
                    <p className="mt-2 text-4xl font-bold">1</p>
                    <p className="mt-1 text-xs text-slate-300">Challenge individual</p>
                  </div>
                </div>
                <div className="mt-5 rounded-3xl border border-cyan-200/20 bg-cyan-300/10 p-5">
                  <p className="flex items-center gap-2 font-semibold text-cyan-100"><CheckCircle2 className="h-5 w-5" /> Cómo usar este sitio</p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">Revisa primero la ruta recomendada para tu perfil. Después, elige la formación que más te ayude a construir tu proyecto y fortalecer tu portafolio.</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <section id="rutas" className="bg-slate-50 px-6 py-16 text-slate-900 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">Orientación por perfil</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">¿Cuál formación debería elegir?</h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">No necesitas hacer todo. Elige una secuencia realista según tu momento, tu área de interés y el tipo de proyecto que quieres crear para el challenge.</p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {paths.map((path, index) => {
              const Icon = path.icon;
              return (
                <motion.div key={path.id} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.35, delay: index * 0.05 }}>
                  <Card className="h-full rounded-3xl border-slate-200 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                    <CardContent className="p-6">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="text-xl font-bold">{path.title}</h3>
                      <div className="mt-5 space-y-3">
                        {path.steps.map((step, stepIndex) => (
                          <div key={step} className="flex items-start gap-3">
                            <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700">{stepIndex + 1}</div>
                            <p className="text-sm font-medium text-slate-700">{step}</p>
                          </div>
                        ))}
                      </div>
                      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                        <div className="rounded-2xl bg-slate-100 p-3">
                          <p className="text-xs text-slate-500">Carga total</p>
                          <p className="text-lg font-bold">{path.totalHours}h</p>
                        </div>

                        <div className="rounded-2xl bg-slate-100 p-3">
                          <p className="text-xs text-slate-500">Semanal</p>
                          <p className="text-lg font-bold">{path.weeklyHours}</p>
                        </div>

                        <div className="rounded-2xl bg-slate-100 p-3">
                          <p className="text-xs text-slate-500">Duración</p>
                          <p className="text-lg font-bold">{path.duration}</p>
                        </div>

                        <div className="rounded-2xl bg-slate-100 p-3">
                          <p className="text-xs text-slate-500">Ritmo</p>
                          <p className="text-sm font-bold">{path.intensity}</p>
                        </div>
                      </div>
                      <p className="mt-5 rounded-2xl bg-slate-100 p-4 text-sm leading-6 text-slate-600">{path.note}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="challenge" className="bg-white px-6 py-16 text-slate-900 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <Card className="overflow-hidden rounded-[2rem] border-indigo-100 shadow-sm">
            <CardContent className="grid gap-8 p-0 lg:grid-cols-[0.8fr_1.2fr]">
              <div className="bg-slate-900 p-8 text-white sm:p-10">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
                  <GitBranch className="h-7 w-7" />
                </div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-200">Contenido obligatorio</p>
                <h2 className="mt-3 text-3xl font-bold">Challenge individual</h2>
                <p className="mt-4 leading-7 text-slate-300">Este será el proyecto que cada estudiante deberá crear individualmente. Las formaciones funcionan como apoyo para llegar con más claridad, práctica y confianza.</p>
              </div>
              <div className="p-8 sm:p-10">
                <div className="rounded-3xl border-2 border-dashed border-slate-300 bg-slate-50 p-8 text-center">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Espacio reservado</p>
                  <h3 className="mt-3 text-2xl font-bold">Aquí se insertará la información del challenge</h3>
                  <p className="mx-auto mt-3 max-w-2xl leading-7 text-slate-600">Agrega más adelante el objetivo del proyecto, criterios de entrega, fechas, tecnologías sugeridas, rúbrica de evaluación y ejemplos de entregables.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="formaciones" className="bg-slate-50 px-6 py-16 text-slate-900 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">Catálogo de formaciones</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Explora los conjuntos de cursos disponibles</h2>
              <p className="mt-4 text-lg leading-8 text-slate-600">Filtra por interés y revisa qué aprenderás, para quién está pensada cada formación y cómo puede ayudarte en tu proyecto.</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="mr-1 inline-flex items-center gap-2 text-sm font-medium text-slate-500"><Filter className="h-4 w-4" /> Filtrar:</span>
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${activeFilter === filter ? 'bg-slate-900 text-white shadow' : 'bg-white text-slate-600 hover:bg-slate-100'}`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-6">
            {visibleFormations.map((formation, index) => {
              const Icon = formation.icon;
              return (
                <motion.article key={formation.id} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.35, delay: index * 0.04 }}>
                  <Card className={`overflow-hidden rounded-[2rem] border-slate-200 bg-gradient-to-br ${formation.color} shadow-sm`}>
                    <CardContent className="grid gap-6 p-6 lg:grid-cols-[0.9fr_1.1fr] lg:p-8">
                      <div>
                        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm">
                          <Icon className="h-7 w-7 text-slate-900" />
                        </div>
                        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">{formation.badge}</p>
                        <h3 className="mt-3 text-2xl font-bold sm:text-3xl">{formation.title}</h3>
                        <p className="mt-4 leading-7 text-slate-700">{formation.summary}</p>
                        <div className="mt-5 grid gap-3 sm:grid-cols-2">
                          <div className="rounded-2xl bg-white/70 p-4">
                            <p className="flex items-center gap-2 text-sm font-semibold text-slate-500"><Clock className="h-4 w-4" /> Carga horaria</p>
                            <p className="mt-1 text-2xl font-bold">{formation.hours}h</p>
                          </div>
                          <div className="rounded-2xl bg-white/70 p-4">
                            <p className="text-sm font-semibold text-slate-500">Nivel sugerido</p>
                            <p className="mt-1 text-lg font-bold">{formation.level}</p>
                          </div>
                        </div>
                        <div className="mt-5 rounded-2xl bg-white/80 p-4 text-sm leading-6 text-slate-700">
                          <strong>Recomendación:</strong> {formation.recommendation}
                        </div>
                      </div>

                      <div className="rounded-3xl bg-white/80 p-5 shadow-sm">
                        <p className="mb-4 flex items-center gap-2 font-bold text-slate-900"><BookOpen className="h-5 w-5" /> Cursos de la formación</p>
                        <div className="space-y-3">
                          {formation.courses.map((course) => (
                            <div key={course.title} className="rounded-2xl border border-slate-200 bg-white p-4">
                              <div className="flex gap-3">
                                <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-indigo-600" />
                                <div className="flex-1">
                                  <h4 className="font-semibold leading-6">{course.title}</h4>
                                  <div className="mt-3 flex flex-wrap items-center gap-2">
                                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">{course.hours}h</span>
                                    {course.tags.map((tag) => (
                                      <span key={tag} className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">{tag}</span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-5 rounded-2xl bg-slate-900 p-4 text-white">
                          <p className="text-sm font-semibold">¿Para quién es mejor?</p>
                          <p className="mt-2 text-sm leading-6 text-slate-300">{formation.bestFor}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#FDFCFB] px-6 py-20 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-5">

            {/* Bloco de Conselho - FOCO EM LEGIBILIDADE */}
            <div className="lg:col-span-3 relative overflow-hidden rounded-[2.5rem] bg-white border-2 border-[#1E1B18] p-8 sm:p-12 shadow-2xl">
              <div className="relative">
                <span className="inline-block mb-4 px-4 py-1 rounded-full bg-[#C8A27A] text-[#1E1B18] text-xs font-bold uppercase tracking-widest">
                  Tip de Ouro
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-[#1E1B18] leading-tight">
                  Consejo final para <br />estudiantes
                </h2>
                <p className="mt-6 text-xl leading-relaxed text-[#5B5550]">
                  No elijas la formación más larga: <span className="text-[#1E1B18] font-bold border-b-4 border-[#C8A27A]">elige la más útil para tu objetivo.</span>
                </p>

                {/* AQUI ESTAVA O ERRO: Corrigido para texto escuro em fundo bege */}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#F1ECE7] border border-[#E9E0D6]">
                    <div className="w-3 h-3 rounded-full bg-[#C8A27A] shrink-0" />
                    <p className="text-sm font-bold text-[#3C2F25]">Prioriza Nivelación si estás empezando.</p>
                  </div>
                  <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#F1ECE7] border border-[#E9E0D6]">
                    <div className="w-3 h-3 rounded-full bg-[#C8A27A] shrink-0" />
                    <p className="text-sm font-bold text-[#3C2F25]">Suma OCI para publicar tu proyecto.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bloco de Recordatorio - ALTO CONTRASTE (Preto e Dourado) */}
            <div className="lg:col-span-2 flex flex-col justify-center rounded-[2.5rem] bg-[#1E1B18] p-8 sm:p-12 text-white">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#C8A27A]">
                IMPORTANTE
              </p>
              <h3 className="mt-4 text-3xl font-black leading-tight text-white">
                Las formaciones <span className="text-[#C8A27A]">no son</span> obligatorias
              </h3>
              <p className="mt-6 text-lg text-slate-300 leading-relaxed">
                Son rutas de apoyo para que llegues al <span className="text-white font-bold border-b border-[#C8A27A]">challenge</span> con más recursos e ideas.
              </p>
            </div>

          </div>
        </div>
      </section>

      <footer className="bg-[#1E1B18] text-white px-6 py-12 sm:px-10 lg:px-20 border-t border-[#C8A27A]/20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 items-start">

            {/* Coluna 1: Logo e Marca */}
            <div className="space-y-4">
              <div className="flex items-center gap-4 border-l-2 border-[#C8A27A] pl-4">
                <div className="flex flex-col">
                  <span className="text-xl font-black tracking-tighter uppercase leading-none">ONE</span>
                  <span className="text-[8px] font-medium leading-tight opacity-70">Oracle Next Education</span>
                </div>
                <div className="h-8 w-px bg-white/20" />
                <span className="text-xl font-bold tracking-tighter text-[#C8A27A]">AI FOR TECH</span>
              </div>
              <p className="text-sm text-slate-400 max-w-xs leading-relaxed">
                Un programa de educación tecnológica enfocado en la empleabilidad y el dominio de la Inteligencia Artificial.
              </p>
            </div>

            {/* Coluna 2: Contato (Destaque) */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-[#C8A27A]">
                Soporte y Contacto
              </h4>
              <div className="flex flex-col gap-2">
                <p className="text-xs text-slate-400">¿Tienes dudas sobre el programa?</p>
                <a
                  href="mailto:contacto-one@aluracursos.com"
                  className="text-lg font-semibold hover:text-[#C8A27A] transition-colors flex items-center gap-2 group"
                >
                  contacto-one@aluracursos.com
                  <div className="h-1 w-1 rounded-full bg-[#C8A27A] opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>
            </div>

        

          </div>

          {/* Linha Inferior: Copyright */}
          <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-[10px] uppercase tracking-widest text-slate-500">
              © 2026 AI FOR TECH - Todos los derechos reservados
            </p>
            <div className="flex gap-6">
              {/* Espaço para ícones de redes sociais se houver */}
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
