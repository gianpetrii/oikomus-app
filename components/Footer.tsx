import Link from 'next/link'
import { Facebook, Instagram, Youtube, Twitter } from 'lucide-react'

const footerSections = {
  oikomus: [
    { label: 'Inicio', href: '/' },
    { label: 'Comprar', href: '/comprar' },
    { label: 'Ubicaciones', href: '/barrios' },
    { label: 'Simulador', href: '/simulador' },
  ],
  anunciantes: [
    { label: 'Desarrolladoras', href: '#' },
    { label: 'Bancos', href: '#' },
    { label: 'Inmobiliarias', href: '#' },
  ],
  paises: [
    { label: 'Brasil: Imovelweb - Wimoveis - CasaMineira - QuintoAndar', href: '#' },
    { label: 'Mexico: Inmueble24 - Vivanuncios', href: '#' },
    { label: 'Perú: Urbania - Adondevivir', href: '#' },
    { label: 'Ecuador: Plusvalia', href: '#' },
    { label: 'Panamá: Compreoalquile', href: '#' },
  ],
}

const socialLinks = [
  { Icon: Facebook, href: '#' },
  { Icon: Instagram, href: '#' },
  { Icon: Youtube, href: '#' },
  { Icon: Twitter, href: '#' },
]

export default function Footer() {
  return (
    <footer className="bg-gray-100 pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="font-bold mb-4">Oikomus</h3>
            <ul className="space-y-2">
              {footerSections.oikomus.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-gray-600 hover:text-gray-900">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Anunciantes</h3>
            <ul className="space-y-2">
              {footerSections.anunciantes.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-gray-600 hover:text-gray-900">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Países</h3>
            <ul className="space-y-2">
              {footerSections.paises.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-gray-600 hover:text-gray-900">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Seguinos</h3>
            <div className="flex gap-4">
              {socialLinks.map(({ Icon, href }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-gray-600 hover:text-gray-900"
                >
                  <Icon className="h-6 w-6" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <div className="flex flex-wrap justify-between items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-4">
              <img src="/logo.svg" alt="Oikomus" className="h-8" />
              <span>© Copyright 2024 oikomus.com.ar</span>
            </div>
            <div className="flex gap-4">
              <Link href="#" className="hover:text-gray-900">Términos y Condiciones</Link>
              <Link href="#" className="hover:text-gray-900">Política de Privacidad</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

