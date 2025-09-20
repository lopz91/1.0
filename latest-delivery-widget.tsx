"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Truck, MapPin, Clock, ExternalLink } from "lucide-react"

interface LatestDeliveryWidgetProps {
  language: "en" | "es"
}

export function LatestDeliveryWidget({ language }: LatestDeliveryWidgetProps) {
  const latestDelivery = {
    title: language === "es" ? "🚛 Última Entrega Completada" : "🚛 Latest Delivery Completed",
    description:
      language === "es"
        ? "Entrega exitosa de materiales de paisajismo premium a nuestro cliente en Henderson."
        : "Successful delivery of premium landscaping materials to our client in Henderson.",
    image: "/placeholder-nunw8.png", // This would be uploaded by admin
    location: "Henderson, NV",
    timeAgo: language === "es" ? "hace 3 horas" : "3 hours ago",
    deliveryType: language === "es" ? "Materiales de Riego" : "Irrigation Materials",
    customerNote:
      language === "es" ? "Excelente servicio y entrega puntual!" : "Excellent service and on-time delivery!",
  }

  return (
    <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-background">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <Truck className="h-4 w-4 text-primary" />
            </div>
            {language === "es" ? "Última Entrega" : "Latest Delivery"}
          </CardTitle>
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            {language === "es" ? "Completada" : "Completed"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Delivery Image */}
        <div className="relative group cursor-pointer">
          <div className="aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-primary/20 to-muted">
            <img
              src={latestDelivery.image || "/placeholder.svg"}
              alt={latestDelivery.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors duration-300" />
          </div>
        </div>

        {/* Delivery Info */}
        <div className="space-y-3">
          <h3 className="font-semibold text-foreground leading-tight">{latestDelivery.title}</h3>
          <p className="text-sm text-muted-foreground">{latestDelivery.description}</p>

          {/* Delivery Details */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="font-medium">{latestDelivery.location}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-primary" />
              <span>{latestDelivery.timeAgo}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Truck className="h-4 w-4 text-primary" />
              <span>{latestDelivery.deliveryType}</span>
            </div>
          </div>

          {/* Customer Feedback */}
          <div className="bg-muted/50 rounded-lg p-3">
            <p className="text-sm text-muted-foreground italic">"{latestDelivery.customerNote}"</p>
            <p className="text-xs text-muted-foreground mt-1">
              - {language === "es" ? "Cliente Verificado" : "Verified Customer"}
            </p>
          </div>
        </div>

        {/* Action Button */}
        <Button size="sm" className="w-full bg-transparent" variant="outline">
          <ExternalLink className="h-3 w-3 mr-2" />
          {language === "es" ? "Ver Más Entregas" : "View More Deliveries"}
        </Button>

        {/* Service CTA */}
        <div className="bg-primary/10 rounded-lg p-3 text-center">
          <p className="text-xs text-muted-foreground mb-2">
            {language === "es" ? "¿Necesitas entrega el mismo día?" : "Need same-day delivery?"}
          </p>
          <Button size="sm" className="text-xs">
            {language === "es" ? "Solicitar Entrega" : "Request Delivery"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
