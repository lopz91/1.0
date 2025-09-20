import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Truck, Package } from "lucide-react"
import type { DeliveryGroup } from "@/lib/delivery-groups"

interface DeliveryGroupDisplayProps {
  deliveryGroups: Array<{ group: DeliveryGroup; productCount: number }>
  totalDeliveryFee: number
  language?: "en" | "es"
}

export function DeliveryGroupDisplay({ deliveryGroups, totalDeliveryFee, language = "en" }: DeliveryGroupDisplayProps) {
  if (deliveryGroups.length === 0) {
    return null
  }

  const getVehicleIcon = (vehicleType: string) => {
    switch (vehicleType) {
      case "flatbed":
      case "dump_truck":
        return <Truck className="h-4 w-4" />
      default:
        return <Package className="h-4 w-4" />
    }
  }

  const getVehicleColor = (vehicleType: string) => {
    switch (vehicleType) {
      case "flatbed":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20"
      case "dump_truck":
        return "bg-orange-500/10 text-orange-400 border-orange-500/20"
      default:
        return "bg-gray-500/10 text-gray-400 border-gray-500/20"
    }
  }

  return (
    <Card className="border-zinc-800 bg-zinc-900/50">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Truck className="h-5 w-5" />
          {language === "es" ? "Grupos de Entrega" : "Delivery Groups"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {deliveryGroups.map(({ group, productCount }) => (
          <div key={group.id} className="flex items-center justify-between p-3 rounded-lg bg-zinc-800/50">
            <div className="flex items-center gap-3">
              <Badge className={`${getVehicleColor(group.vehicle_type)} flex items-center gap-1`}>
                {getVehicleIcon(group.vehicle_type)}
                {group.vehicle_type.replace("_", " ").toUpperCase()}
              </Badge>
              <div>
                <p className="text-white font-medium">{group.name}</p>
                <p className="text-zinc-400 text-sm">
                  {productCount} {language === "es" ? "productos" : "products"}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-white font-semibold">${group.base_fee.toFixed(2)}</p>
            </div>
          </div>
        ))}

        <div className="border-t border-zinc-700 pt-3 flex items-center justify-between">
          <p className="text-white font-semibold">{language === "es" ? "Total de Entrega:" : "Total Delivery:"}</p>
          <p className="text-amber-400 font-bold text-lg">${totalDeliveryFee.toFixed(2)}</p>
        </div>
      </CardContent>
    </Card>
  )
}
