import type { Metadata, Viewport } from 'next'
import { Bricolage_Grotesque, Plus_Jakarta_Sans } from 'next/font/google'
import { ClientLayout } from '@/components/ClientLayout'
import { IS_DEMO, SITE_URL } from '@/lib/config'
import './globals.css'

const sans = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-sans', display: 'swap' })
const display = Bricolage_Grotesque({ subsets: ['latin'], variable: '--font-display', display: 'swap', weight: ['600', '700', '800'] })

const description =
  'Tutoriales y herramientas descargables organizados por carrera universitaria. Next.js + Django REST, con roles y contenido Premium (pagos con Stripe en desarrollo).'

export const metadata: Metadata = {
  metadataBase: new URL(IS_DEMO ? SITE_URL : 'http://localhost:3000/'),
  title: {
    default: 'EduTools — Tutoriales y herramientas para tu carrera',
    template: '%s · EduTools',
  },
  description,
  applicationName: 'EduTools',
  authors: [{ name: 'Gustavo Larco' }],
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    siteName: 'EduTools',
    title: 'EduTools — Tutoriales y herramientas para tu carrera',
    description,
    images: [{ url: 'og-image.png', width: 1200, height: 630, alt: 'EduTools: tutoriales y herramientas por carrera' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EduTools — Tutoriales y herramientas para tu carrera',
    description,
    images: ['og-image.png'],
  },
}

export const viewport: Viewport = {
  themeColor: '#6D5DFC',
  colorScheme: 'light',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${sans.variable} ${display.variable}`} suppressHydrationWarning>
      <head>
        {/* Enables the scroll-reveal hidden state only when JS runs; a safety timer reveals everything after 2.5 s. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.classList.add('js');setTimeout(function(){document.querySelectorAll('.reveal').forEach(function(e){e.classList.add('is-visible')})},2500)",
          }}
        />
      </head>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
