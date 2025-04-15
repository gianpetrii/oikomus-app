'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArrowLeft, Save, Upload } from 'lucide-react'
import Link from 'next/link'

export default function NuevaPropiedadPage() {
  const router = useRouter()
  
  const [formData, setFormData] = useState({
    titulo: '',
    tipo: '',
    precio: '',
    descripcion: '',
    superficie: '',
    habitaciones: '',
    baños: '',
    provincia: '',
    ciudad: '',
    barrio: '',
    direccion: '',
    caracteristicas: {
      garage: false,
      piscina: false,
      jardin: false,
      seguridad: false,
      amueblado: false,
    },
    servicios: {
      agua: true,
      electricidad: true,
      gas: true,
      internet: false,
      calefaccion: false,
    },
    imagenes: [],
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleCheckboxChange = (category, name, checked) => {
    setFormData({
      ...formData,
      [category]: {
        ...formData[category],
        [name]: checked,
      },
    })
  }

  const handleSelectChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Aquí iría la lógica para enviar los datos a Firebase
    console.log('Datos enviados:', formData)
    
    // Simulación de guardado exitoso
    alert('Propiedad guardada correctamente')
    router.push('/admin/propiedades')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/propiedades">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Nueva Propiedad</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general">Información General</TabsTrigger>
            <TabsTrigger value="ubicacion">Ubicación</TabsTrigger>
            <TabsTrigger value="caracteristicas">Características</TabsTrigger>
            <TabsTrigger value="imagenes">Imágenes</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-4 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="titulo">Título de la propiedad</Label>
                <Input
                  id="titulo"
                  name="titulo"
                  value={formData.titulo}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="tipo">Tipo de propiedad</Label>
                <Select 
                  onValueChange={(value) => handleSelectChange('tipo', value)}
                  value={formData.tipo}
                >
                  <SelectTrigger id="tipo">
                    <SelectValue placeholder="Seleccionar tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="casa">Casa</SelectItem>
                    <SelectItem value="apartamento">Apartamento</SelectItem>
                    <SelectItem value="oficina">Oficina</SelectItem>
                    <SelectItem value="local">Local Comercial</SelectItem>
                    <SelectItem value="terreno">Terreno</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="precio">Precio (USD)</Label>
                <Input
                  id="precio"
                  name="precio"
                  type="number"
                  value={formData.precio}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="superficie">Superficie (m²)</Label>
                <Input
                  id="superficie"
                  name="superficie"
                  type="number"
                  value={formData.superficie}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="habitaciones">Habitaciones</Label>
                <Input
                  id="habitaciones"
                  name="habitaciones"
                  type="number"
                  value={formData.habitaciones}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="baños">Baños</Label>
                <Input
                  id="baños"
                  name="baños"
                  type="number"
                  value={formData.baños}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="descripcion">Descripción</Label>
              <Textarea
                id="descripcion"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleInputChange}
                className="min-h-32"
              />
            </div>
          </TabsContent>
          
          <TabsContent value="ubicacion" className="space-y-4 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="provincia">Provincia</Label>
                <Select 
                  onValueChange={(value) => handleSelectChange('provincia', value)}
                  value={formData.provincia}
                >
                  <SelectTrigger id="provincia">
                    <SelectValue placeholder="Seleccionar provincia" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="buenosaires">Buenos Aires</SelectItem>
                    <SelectItem value="cordoba">Córdoba</SelectItem>
                    <SelectItem value="santafe">Santa Fe</SelectItem>
                    <SelectItem value="mendoza">Mendoza</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="ciudad">Ciudad</Label>
                <Select 
                  onValueChange={(value) => handleSelectChange('ciudad', value)}
                  value={formData.ciudad}
                >
                  <SelectTrigger id="ciudad">
                    <SelectValue placeholder="Seleccionar ciudad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="buenosaires">Buenos Aires</SelectItem>
                    <SelectItem value="laplata">La Plata</SelectItem>
                    <SelectItem value="mardelplata">Mar del Plata</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="barrio">Barrio</Label>
                <Select 
                  onValueChange={(value) => handleSelectChange('barrio', value)}
                  value={formData.barrio}
                >
                  <SelectTrigger id="barrio">
                    <SelectValue placeholder="Seleccionar barrio" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="palermo">Palermo</SelectItem>
                    <SelectItem value="recoleta">Recoleta</SelectItem>
                    <SelectItem value="belgrano">Belgrano</SelectItem>
                    <SelectItem value="santelmo">San Telmo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="direccion">Dirección</Label>
                <Input
                  id="direccion"
                  name="direccion"
                  value={formData.direccion}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            
            <div className="h-64 bg-gray-100 rounded-md flex items-center justify-center">
              <p className="text-gray-500">Mapa para seleccionar ubicación</p>
            </div>
          </TabsContent>
          
          <TabsContent value="caracteristicas" className="space-y-6 pt-4">
            <div>
              <h3 className="text-lg font-medium mb-4">Características</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="garage" 
                    checked={formData.caracteristicas.garage}
                    onCheckedChange={(checked) => 
                      handleCheckboxChange('caracteristicas', 'garage', checked)
                    }
                  />
                  <Label htmlFor="garage">Garage</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="piscina" 
                    checked={formData.caracteristicas.piscina}
                    onCheckedChange={(checked) => 
                      handleCheckboxChange('caracteristicas', 'piscina', checked)
                    }
                  />
                  <Label htmlFor="piscina">Piscina</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="jardin" 
                    checked={formData.caracteristicas.jardin}
                    onCheckedChange={(checked) => 
                      handleCheckboxChange('caracteristicas', 'jardin', checked)
                    }
                  />
                  <Label htmlFor="jardin">Jardín</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="seguridad" 
                    checked={formData.caracteristicas.seguridad}
                    onCheckedChange={(checked) => 
                      handleCheckboxChange('caracteristicas', 'seguridad', checked)
                    }
                  />
                  <Label htmlFor="seguridad">Seguridad</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="amueblado" 
                    checked={formData.caracteristicas.amueblado}
                    onCheckedChange={(checked) => 
                      handleCheckboxChange('caracteristicas', 'amueblado', checked)
                    }
                  />
                  <Label htmlFor="amueblado">Amueblado</Label>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">Servicios</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="agua" 
                    checked={formData.servicios.agua}
                    onCheckedChange={(checked) => 
                      handleCheckboxChange('servicios', 'agua', checked)
                    }
                  />
                  <Label htmlFor="agua">Agua</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="electricidad" 
                    checked={formData.servicios.electricidad}
                    onCheckedChange={(checked) => 
                      handleCheckboxChange('servicios', 'electricidad', checked)
                    }
                  />
                  <Label htmlFor="electricidad">Electricidad</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="gas" 
                    checked={formData.servicios.gas}
                    onCheckedChange={(checked) => 
                      handleCheckboxChange('servicios', 'gas', checked)
                    }
                  />
                  <Label htmlFor="gas">Gas</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="internet" 
                    checked={formData.servicios.internet}
                    onCheckedChange={(checked) => 
                      handleCheckboxChange('servicios', 'internet', checked)
                    }
                  />
                  <Label htmlFor="internet">Internet</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="calefaccion" 
                    checked={formData.servicios.calefaccion}
                    onCheckedChange={(checked) => 
                      handleCheckboxChange('servicios', 'calefaccion', checked)
                    }
                  />
                  <Label htmlFor="calefaccion">Calefacción</Label>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="imagenes" className="space-y-4 pt-4">
            <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
              <div className="flex flex-col items-center">
                <Upload className="h-10 w-10 text-gray-400 mb-2" />
                <h3 className="text-lg font-medium">Arrastra y suelta imágenes aquí</h3>
                <p className="text-sm text-gray-500 mt-1">O haz clic para seleccionar archivos</p>
                <input
                  type="file"
                  multiple
                  className="hidden"
                  id="file-upload"
                  accept="image/*"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('file-upload').click()}
                  className="mt-4"
                >
                  Seleccionar Archivos
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6">
              {/* Aquí se mostrarían las imágenes seleccionadas */}
              <div className="bg-gray-200 aspect-square rounded-md flex items-center justify-center text-gray-400">
                Vista previa
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-end gap-4">
          <Link href="/admin/propiedades">
            <Button type="button" variant="outline">Cancelar</Button>
          </Link>
          <Button type="submit">
            <Save className="mr-2 h-4 w-4" />
            Guardar Propiedad
          </Button>
        </div>
      </form>
    </div>
  )
}

