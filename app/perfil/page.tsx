'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAuth } from '@/lib/auth-context'
import { toast } from 'sonner'
import { updateProfile as updateFirebaseProfile } from 'firebase/auth'
import { doc, updateDoc } from 'firebase/firestore'
import { auth, db } from '@/lib/firebase'
import { Loader2, User } from 'lucide-react'

export default function ProfilePage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  
  const [displayName, setDisplayName] = useState('')
  const [photoURL, setPhotoURL] = useState('')
  const [isUpdating, setIsUpdating] = useState(false)
  
  // Redireccionar si no está autenticado
  useEffect(() => {
    if (!loading && !user) {
      toast.error('Debes iniciar sesión para ver esta página')
      router.push('/login')
    }
  }, [user, loading, router])
  
  // Cargar datos del usuario
  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || '')
      setPhotoURL(user.photoURL || '')
    }
  }, [user])
  
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!user) return
    
    setIsUpdating(true)
    
    try {
      // Actualizar perfil en Firebase Auth
      const currentUser = auth.currentUser
      if (currentUser) {
        await updateFirebaseProfile(currentUser, {
          displayName,
          photoURL
        })
      }
      
      // Actualizar en Firestore
      const userRef = doc(db, 'users', user.uid)
      await updateDoc(userRef, {
        displayName,
        photoURL
      })
      
      toast.success('Perfil actualizado correctamente')
    } catch (error) {
      console.error('Error al actualizar perfil:', error)
      toast.error('Error al actualizar el perfil')
    } finally {
      setIsUpdating(false)
    }
  }
  
  // Mostrar estado de carga
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }
  
  // Si el usuario no está autenticado, no mostramos nada (el useEffect redirigirá)
  if (!user) {
    return null
  }
  
  return (
    <div className="container mx-auto py-10 px-4">
      <Tabs defaultValue="perfil" className="w-full max-w-3xl mx-auto">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="perfil">Mi Perfil</TabsTrigger>
          <TabsTrigger value="seguridad">Seguridad</TabsTrigger>
        </TabsList>
        
        <TabsContent value="perfil" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Información Personal</CardTitle>
              <CardDescription>
                Actualiza tu información personal
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="mb-6 md:mb-0 flex flex-col items-center">
                  <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden mb-4 flex items-center justify-center">
                    {user.photoURL ? (
                      <img 
                        src={user.photoURL} 
                        alt="Foto de perfil" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-16 h-16 text-gray-400" />
                    )}
                  </div>
                  <p className="text-sm text-gray-500">
                    Role: {user.role === 'admin' ? 'Administrador' : user.role === 'agent' ? 'Agente' : 'Usuario'}
                  </p>
                </div>
                
                <form onSubmit={handleUpdateProfile} className="flex-1 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      value={user.email || ''}
                      disabled
                      className="bg-gray-50"
                    />
                    <p className="text-xs text-gray-500">
                      No puedes cambiar tu correo electrónico
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="displayName">Nombre completo</Label>
                    <Input
                      id="displayName"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      placeholder="Tu nombre completo"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="photoURL">URL de la foto de perfil</Label>
                    <Input
                      id="photoURL"
                      value={photoURL}
                      onChange={(e) => setPhotoURL(e.target.value)}
                      placeholder="https://ejemplo.com/tu-foto.jpg"
                    />
                    <p className="text-xs text-gray-500">
                      Ingresa la URL de una imagen para usar como foto de perfil
                    </p>
                  </div>
                  
                  <Button type="submit" disabled={isUpdating}>
                    {isUpdating ? (
                      <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Actualizando...</>
                    ) : (
                      'Guardar cambios'
                    )}
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="seguridad" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Seguridad</CardTitle>
              <CardDescription>
                Administra la seguridad de tu cuenta
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium">Cambiar contraseña</h3>
                <p className="text-sm text-gray-500">
                  Para cambiar tu contraseña, cierra sesión y utiliza la opción "Olvidé mi contraseña" en la página de inicio de sesión.
                </p>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">Sesiones activas</h3>
                <p className="text-sm text-gray-500">
                  Tu cuenta está actualmente activa en este dispositivo.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" onClick={() => router.push('/')}>
                Volver al inicio
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 