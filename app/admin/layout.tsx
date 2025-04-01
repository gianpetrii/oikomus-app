import { ReactNode } from 'react'
import { redirect } from 'next/navigation'

// Mock function to check if user is admin
const isUserAdmin = () => {
  // In a real app, this would check the user's session or make an API call
  return true // Change this to false to test the redirect
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  if (!isUserAdmin()) {
    redirect('/')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Panel de Administración</h1>
      {children}
    </div>
  )
}

