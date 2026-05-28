'use client'

import { useState, useEffect } from 'react'
import { collection, getDocs, doc, updateDoc, query, orderBy } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useAuth } from '@/lib/auth-context'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'
import { Loader2, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'

type UserType = {
  uid: string
  email: string | null
  displayName: string | null
  role: string
  createdAt?: string
}

export default function AdminUsersPage() {
  const { user, loading } = useAuth()
  const [users, setUsers] = useState<UserType[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isUpdating, setIsUpdating] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  
  // Cargar usuarios
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersQuery = query(collection(db, 'users'), orderBy('email'));
        const querySnapshot = await getDocs(usersQuery);
        const usersData = querySnapshot.docs.map(doc => {
          const data = doc.data() as Omit<UserType, 'uid'> & { uid?: string };
          return {
            ...data,
            uid: doc.id // Usar el ID del documento como UID si no está presente
          } as UserType;
        });
        
        setUsers(usersData);
      } catch (error) {
        console.error('Error al cargar usuarios:', error);
        toast.error('Error al cargar usuarios');
      } finally {
        setIsLoading(false);
      }
    };

    if (!loading) {
      fetchUsers();
    }
  }, [loading]);

  // Cambiar rol de usuario
  const updateUserRole = async (userId: string, newRole: string) => {
    if (!user || user.role !== 'admin') {
      toast.error('No tienes permisos para realizar esta acción');
      return;
    }
    
    setIsUpdating(userId);
    
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, { role: newRole });
      
      // Actualizar estado local
      setUsers(prevUsers => 
        prevUsers.map(u => 
          u.uid === userId ? { ...u, role: newRole } : u
        )
      );
      
      toast.success(`Rol actualizado correctamente a: ${newRole}`);
    } catch (error) {
      console.error('Error al actualizar rol:', error);
      toast.error('Error al actualizar rol');
    } finally {
      setIsUpdating(null);
    }
  };

  // Filtrar usuarios por búsqueda
  const filteredUsers = users.filter(user => {
    if (!searchTerm) return true;
    
    const searchLower = searchTerm.toLowerCase();
    return (
      (user.email?.toLowerCase().includes(searchLower)) || 
      (user.displayName?.toLowerCase().includes(searchLower))
    );
  });

  // Si está cargando
  if (loading || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Administración de Usuarios</CardTitle>
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar usuarios..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50 font-medium">
                  <th className="py-3 px-2 text-left">Usuario</th>
                  <th className="py-3 px-2 text-left">Email</th>
                  <th className="py-3 px-2 text-left">Rol Actual</th>
                  <th className="py-3 px-2 text-left">Cambiar Rol</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-6 text-center text-muted-foreground">
                      No se encontraron usuarios
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((userData) => (
                    <tr key={userData.uid} className="border-b">
                      <td className="py-3 px-2">{userData.displayName || 'Sin nombre'}</td>
                      <td className="py-3 px-2">{userData.email}</td>
                      <td className="py-3 px-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          userData.role === 'admin' 
                            ? 'bg-red-100 text-red-800' 
                            : userData.role === 'agent' 
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {userData.role === 'admin' 
                            ? 'Administrador' 
                            : userData.role === 'agent' 
                            ? 'Agente' 
                            : 'Usuario'}
                        </span>
                      </td>
                      <td className="py-3 px-2">
                        <div className="flex items-center space-x-2">
                          <Select
                            onValueChange={(value) => updateUserRole(userData.uid, value)}
                            defaultValue={userData.role}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue placeholder="Seleccionar rol" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="user">Usuario</SelectItem>
                              <SelectItem value="agent">Agente</SelectItem>
                              <SelectItem value="admin">Administrador</SelectItem>
                            </SelectContent>
                          </Select>
                          {isUpdating === userData.uid && (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 