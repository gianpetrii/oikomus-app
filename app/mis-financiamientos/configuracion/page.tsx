import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

export default function ConfiguracionPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Configuración</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Información de la Empresa</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div>
                <Label htmlFor="companyName">Nombre de la Empresa</Label>
                <Input id="companyName" defaultValue="Oikomus Financiamientos" />
              </div>
              <div>
                <Label htmlFor="email">Email de Contacto</Label>
                <Input id="email" type="email" defaultValue="contacto@oikomus.com" />
              </div>
              <div>
                <Label htmlFor="phone">Teléfono</Label>
                <Input id="phone" type="tel" defaultValue="+54 11 1234-5678" />
              </div>
              <Button>Guardar Cambios</Button>
            </form>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Preferencias de Notificaciones</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="emailNotifications" />
                <Label htmlFor="emailNotifications">Notificaciones por Email</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="smsNotifications" />
                <Label htmlFor="smsNotifications">Notificaciones por SMS</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="pushNotifications" />
                <Label htmlFor="pushNotifications">Notificaciones Push</Label>
              </div>
              <Button>Guardar Preferencias</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

