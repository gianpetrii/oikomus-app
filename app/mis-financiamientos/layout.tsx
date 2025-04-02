import { ReactNode } from 'react'
import FinanciamientosSidebar from '@/components/FinanciamientosSidebar'
import FinanciamientosFooter from '@/components/FinanciamientosFooter'

export default function FinanciamientosLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-100">
      <FinanciamientosSidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            {children}
          </div>
        </main>
        <FinanciamientosFooter />
      </div>
    </div>
  )
}

