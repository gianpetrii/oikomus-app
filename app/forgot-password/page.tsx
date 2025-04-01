'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para enviar el correo de restablecimiento
    console.log('Enviando correo de restablecimiento a:', email)
    setIsSubmitted(true)
  }

  return (
    <div className="container mx-auto flex items-center justify-center min-h-screen px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Restablecer Contraseña</CardTitle>
        </CardHeader>
        <CardContent>
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Enviar correo de restablecimiento
              </Button>
            </form>
          ) : (
            <div className="text-center">
              <p className="mb-4">
                Se ha enviado un correo con instrucciones para restablecer tu contraseña.
                Por favor, revisa tu bandeja de entrada.
              </p>
              <Link href="/login" className="text-primary hover:underline">
                Volver al inicio de sesión
              </Link>
            </div>
          )}
        </CardContent>
        <CardFooter className="justify-center">
          <Link href="/login" className="text-sm text-gray-500 hover:underline">
            Volver al inicio de sesión
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

