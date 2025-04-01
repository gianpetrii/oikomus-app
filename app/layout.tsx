import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import './globals.css'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <Script id="firebase-analytics" strategy="afterInteractive">
          {`
            // Firebase Analytics Initialization
            document.addEventListener('DOMContentLoaded', function() {
              if (typeof window !== 'undefined' && window.firebase) {
                const analytics = window.firebase.analytics();
                analytics.logEvent('page_view');
              }
            });
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}

