import Link from 'next/link'
import Layout from '@/components/Layout'

const features = [
  {
    name: 'Tutoriales Especializados',
    description: 'Accede a tutoriales diseñados específicamente para tu carrera universitaria.',
  },
  {
    name: 'Herramientas Prácticas',
    description: 'Descarga herramientas y recursos que te ayudarán en tus estudios.',
  },
  {
    name: 'Contenido Premium',
    description: 'Accede a contenido exclusivo y recursos avanzados con una suscripción premium.',
  },
  {
    name: 'Comunidad Activa',
    description: 'Forma parte de una comunidad de estudiantes y profesionales.',
  },
]

export default function Home() {
  return (
    <Layout>
      <div className="relative isolate overflow-hidden bg-white">
        <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
            <div className="mt-24 sm:mt-32 lg:mt-16">
              <Link href="/careers" className="inline-flex space-x-6">
                <span className="rounded-full bg-indigo-600/10 px-3 py-1 text-sm font-semibold leading-6 text-indigo-600 ring-1 ring-inset ring-indigo-600/10">
                  ¿Qué hay de nuevo?
                </span>
              </Link>
            </div>
            <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Herramientas educativas para estudiantes universitarios
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              EduTools te ofrece recursos, tutoriales y herramientas especializadas para ayudarte en tu carrera universitaria.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Link
                href="/careers"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Explora por Carrera
              </Link>
              <Link href="/tutorials" className="text-sm font-semibold leading-6 text-gray-900">
                Ver Tutoriales <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
          <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
            <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
              <div className="relative">
                <img
                  src="/images/hero-image.jpg"
                  alt="Estudiantes colaborando con herramientas educativas"
                  width={2432}
                  height={1442}
                  className="w-[76rem] rounded-md bg-white/5 shadow-2xl ring-1 ring-white/10"
                />
                <div className="absolute inset-0 rounded-md bg-gradient-to-tr from-indigo-500/30 to-purple-500/30 mix-blend-multiply" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature section */}
      <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-56 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">Aprende más rápido</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Todo lo que necesitas para tener éxito en tu carrera
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Nuestra plataforma está diseñada para ayudarte a alcanzar tus metas académicas con recursos de calidad y herramientas prácticas.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* CTA section */}
      <div className="relative isolate mt-32 px-6 py-32 sm:mt-56 sm:py-40 lg:px-8">
        <div className="absolute inset-x-0 top-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Mejora tu experiencia universitaria
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
            Únete a nuestra comunidad de estudiantes y accede a recursos exclusivos que te ayudarán a destacar en tu carrera.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/auth/register"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Regístrate Gratis
            </Link>
            <Link href="/careers" className="text-sm font-semibold leading-6 text-gray-900">
              Explora Recursos <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}
