"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock, Send, MessageSquare } from "lucide-react"

export default function ContactPage() {
  const [language, setLanguage] = useState<"en" | "es">("en")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const contactInfo = [
    {
      icon: MapPin,
      title: language === "es" ? "Ubicación" : "Location",
      details: [
        "Serving Las Vegas, NV",
        language === "es" ? "Servimos todo el área metropolitana" : "Serving the entire metro area",
      ],
    },
    {
      icon: Phone,
      title: language === "es" ? "Teléfono" : "Phone",
      details: ["(702) 899-8989", language === "es" ? "Lun-Vie 7AM-6PM, Sáb 8AM-4PM" : "Mon-Fri 7AM-6PM, Sat 8AM-4PM"],
    },
    {
      icon: Mail,
      title: language === "es" ? "Email" : "Email",
      details: ["Info@lvcenters.com", language === "es" ? "Respuesta en 24 horas" : "24-hour response"],
    },
    {
      icon: Clock,
      title: language === "es" ? "Horarios" : "Hours",
      details: [
        language === "es" ? "Lun - Vie: 7:00 AM - 6:00 PM" : "Mon - Fri: 7:00 AM - 6:00 PM",
        language === "es" ? "Sáb: 8:00 AM - 4:00 PM" : "Sat: 8:00 AM - 4:00 PM",
      ],
    },
  ]

  const products = [
    language === "es" ? "Sistemas de Riego" : "Irrigation Systems",
    language === "es" ? "Iluminación de Paisaje" : "Landscape Lighting",
    language === "es" ? "Materiales Hardscape" : "Hardscape Materials",
    language === "es" ? "Materiales a Granel" : "Bulk Materials",
    language === "es" ? "Césped Artificial" : "Artificial Turf",
    language === "es" ? "Herramientas y Equipos" : "Tools & Equipment",
    language === "es" ? "Fertilizantes y Químicos" : "Fertilizers & Chemicals",
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header language={language} onLanguageChange={setLanguage} cartItemCount={0} isLoggedIn={false} />

      <main>
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 bg-gradient-to-br from-primary/10 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                {language === "es" ? "Contáctanos" : "Contact Us"}
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                {language === "es"
                  ? "¿Listo para transformar tu espacio exterior? Nuestro equipo de expertos está aquí para ayudarte con tu proyecto de paisajismo."
                  : "Ready to transform your outdoor space? Our expert team is here to help you with your landscaping project."}
              </p>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {contactInfo.map((info, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <info.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{info.title}</h3>
                    {info.details.map((detail, detailIndex) => (
                      <p key={detailIndex} className="text-muted-foreground text-sm">
                        {detail}
                      </p>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Contact Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    {language === "es" ? "Envíanos un Mensaje" : "Send Us a Message"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          {language === "es" ? "Nombre" : "Name"} *
                        </label>
                        <Input
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder={language === "es" ? "Tu nombre completo" : "Your full name"}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          {language === "es" ? "Teléfono" : "Phone"}
                        </label>
                        <Input
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="(702) 123-4567"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email *</label>
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder={language === "es" ? "tu@email.com" : "your@email.com"}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        {language === "es" ? "Asunto" : "Subject"} *
                      </label>
                      <Input
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder={language === "es" ? "¿En qué podemos ayudarte?" : "How can we help you?"}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        {language === "es" ? "Mensaje" : "Message"} *
                      </label>
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder={
                          language === "es"
                            ? "Cuéntanos sobre tu proyecto de paisajismo..."
                            : "Tell us about your landscaping project..."
                        }
                        rows={5}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      <Send className="mr-2 h-4 w-4" />
                      {language === "es" ? "Enviar Mensaje" : "Send Message"}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Products & Additional Info */}
              <div className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>{language === "es" ? "Nuestros Productos" : "Our Products"}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 gap-3">
                      {products.map((product, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          <span className="text-sm">{product}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-4 text-primary">
                      {language === "es" ? "Experiencia Personalizada" : "Personalized Experience"}
                    </h3>
                    <p className="text-sm mb-4">
                      {language === "es"
                        ? "Nos encantaría brindarle nuestro asesoramiento experto, traer muestras y configurar demostraciones en vivo para su experiencia perfecta."
                        : "We would love to give you our expert advice, bring out samples, and set up live demos for your perfect experience."}
                    </p>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        {language === "es" ? "Asesoramiento experto personalizado" : "Personalized expert consultation"}
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        {language === "es" ? "Muestras de productos en sitio" : "On-site product samples"}
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        {language === "es" ? "Demostraciones en vivo" : "Live product demonstrations"}
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        {language === "es"
                          ? "Soluciones adaptadas a su proyecto"
                          : "Solutions tailored to your project"}
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-amber-50 border-amber-200">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-2 text-amber-800">
                      {language === "es" ? "🚀 Respuesta Rápida" : "🚀 Quick Response"}
                    </h3>
                    <p className="text-sm text-amber-700">
                      {language === "es"
                        ? "Respondemos a todos los mensajes dentro de 24 horas. Para consultas urgentes, llámanos directamente."
                        : "We respond to all messages within 24 hours. For urgent inquiries, call us directly."}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-muted/50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              {language === "es" ? "¿Listo para Comenzar?" : "Ready to Get Started?"}
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              {language === "es"
                ? "Obtén una consulta gratuita y descubre cómo podemos transformar tu espacio exterior."
                : "Get a free consultation and discover how we can transform your outdoor space."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                <Phone className="mr-2 h-5 w-5" />
                {language === "es" ? "Llamar Ahora" : "Call Now"}
              </Button>
              <Button size="lg" variant="outline">
                {language === "es" ? "Ver Nuestros Trabajos" : "View Our Work"}
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer language={language} />
    </div>
  )
}
