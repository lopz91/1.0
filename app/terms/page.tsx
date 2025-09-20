"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { AlertTriangle, Scale, Shield, Phone } from "lucide-react"

export default function TermsPage() {
  const [language, setLanguage] = useState<"en" | "es">("en")

  const content = {
    en: {
      title: "Terms and Conditions",
      subtitle: "Legal Agreement for Products and Services",
      lastUpdated: "Last Updated: December 2024",
      acceptance: {
        title: "Agreement Acceptance",
        content:
          "By providing your phone number, email address, or placing any order with The Landscape Center, you automatically agree to all terms and conditions outlined in this document. This agreement is legally binding and enforceable.",
      },
      liability: {
        title: "Limitation of Liability",
        content:
          "The Landscape Center shall not be held liable for any damages, injuries, losses, or claims arising from the use, delivery, installation, or application of any products purchased. The customer assumes full responsibility for all risks associated with product use and delivery.",
      },
      delivery: {
        title: "Delivery Terms",
        content:
          "The party requesting delivery takes full responsibility for all aspects of the delivery process, including but not limited to: property damage, personal injury, access issues, and product placement. The Landscape Center is not responsible for any damages that may occur during or after delivery.",
      },
      responsibility: {
        title: "Customer Responsibility",
        content:
          "The account owner and/or person placing the order takes full legal and monetary responsibility for all transactions, damages, and liabilities. This includes responsibility for payment, product use, and any consequences arising from the purchase or delivery of products.",
      },
      communication: {
        title: "Communication Agreement",
        content:
          "Text messages, emails, and phone communications between The Landscape Center and customers are considered legally binding contracts. By providing contact information, you consent to receive communications and agree that such communications constitute valid contractual agreements.",
      },
      legal: {
        title: "Legal Enforcement",
        content:
          "The Landscape Center reserves the right to pursue legal action against any customer for breach of contract, non-payment, property damage, or any other violations of these terms. Customers agree to be held legally and financially responsible for all costs associated with such legal proceedings.",
      },
      products: {
        title: "Product Disclaimer",
        content:
          "All products are sold as-is. The Landscape Center does not provide installation services and is not a contractor. Customers are responsible for proper product selection, installation, and use. No warranties are provided beyond manufacturer specifications.",
      },
      payment: {
        title: "Payment Terms",
        content:
          "All sales are final. Payment is due upon delivery or as agreed upon at time of purchase. Late payments may incur additional fees and legal action. The account holder is responsible for all charges and fees.",
      },
      indemnification: {
        title: "Indemnification",
        content:
          "Customer agrees to indemnify and hold harmless The Landscape Center from any claims, damages, losses, or expenses arising from the purchase, delivery, or use of products. This includes legal fees and court costs.",
      },
      jurisdiction: {
        title: "Governing Law",
        content:
          "These terms are governed by the laws of Nevada. Any disputes will be resolved in the courts of Clark County, Nevada. By agreeing to these terms, you consent to the jurisdiction of these courts.",
      },
    },
    es: {
      title: "Términos y Condiciones",
      subtitle: "Acuerdo Legal para Productos y Servicios",
      lastUpdated: "Última Actualización: Diciembre 2024",
      acceptance: {
        title: "Aceptación del Acuerdo",
        content:
          "Al proporcionar su número de teléfono, dirección de correo electrónico o realizar cualquier pedido con The Landscape Center, usted acepta automáticamente todos los términos y condiciones descritos en este documento. Este acuerdo es legalmente vinculante y ejecutable.",
      },
      liability: {
        title: "Limitación de Responsabilidad",
        content:
          "The Landscape Center no será responsable de ningún daño, lesión, pérdida o reclamo que surja del uso, entrega, instalación o aplicación de cualquier producto comprado. El cliente asume toda la responsabilidad por todos los riesgos asociados con el uso y entrega del producto.",
      },
      delivery: {
        title: "Términos de Entrega",
        content:
          "La parte que solicita la entrega asume toda la responsabilidad por todos los aspectos del proceso de entrega, incluyendo pero no limitado a: daños a la propiedad, lesiones personales, problemas de acceso y colocación del producto. The Landscape Center no es responsable de ningún daño que pueda ocurrir durante o después de la entrega.",
      },
      responsibility: {
        title: "Responsabilidad del Cliente",
        content:
          "El propietario de la cuenta y/o la persona que realiza el pedido asume toda la responsabilidad legal y monetaria por todas las transacciones, daños y responsabilidades. Esto incluye la responsabilidad por el pago, el uso del producto y cualquier consecuencia que surja de la compra o entrega de productos.",
      },
      communication: {
        title: "Acuerdo de Comunicación",
        content:
          "Los mensajes de texto, correos electrónicos y comunicaciones telefónicas entre The Landscape Center y los clientes se consideran contratos legalmente vinculantes. Al proporcionar información de contacto, usted consiente recibir comunicaciones y acepta que dichas comunicaciones constituyen acuerdos contractuales válidos.",
      },
      legal: {
        title: "Aplicación Legal",
        content:
          "The Landscape Center se reserva el derecho de emprender acciones legales contra cualquier cliente por incumplimiento de contrato, falta de pago, daños a la propiedad o cualquier otra violación de estos términos. Los clientes aceptan ser responsables legal y financieramente de todos los costos asociados con tales procedimientos legales.",
      },
      products: {
        title: "Descargo de Responsabilidad del Producto",
        content:
          "Todos los productos se venden tal como están. The Landscape Center no proporciona servicios de instalación y no es un contratista. Los clientes son responsables de la selección, instalación y uso adecuados del producto. No se proporcionan garantías más allá de las especificaciones del fabricante.",
      },
      payment: {
        title: "Términos de Pago",
        content:
          "Todas las ventas son finales. El pago vence al momento de la entrega o según se acuerde al momento de la compra. Los pagos tardíos pueden incurrir en tarifas adicionales y acción legal. El titular de la cuenta es responsable de todos los cargos y tarifas.",
      },
      indemnification: {
        title: "Indemnización",
        content:
          "El cliente acepta indemnizar y eximir de responsabilidad a The Landscape Center de cualquier reclamo, daño, pérdida o gasto que surja de la compra, entrega o uso de productos. Esto incluye honorarios legales y costos judiciales.",
      },
      jurisdiction: {
        title: "Ley Aplicable",
        content:
          "Estos términos se rigen por las leyes de Nevada. Cualquier disputa se resolverá en los tribunales del Condado de Clark, Nevada. Al aceptar estos términos, usted consiente a la jurisdicción de estos tribunales.",
      },
    },
  }

  const t = content[language]

  return (
    <div className="min-h-screen bg-background">
      <Header language={language} onLanguageChange={setLanguage} cartItemCount={0} isLoggedIn={false} />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4 font-playfair">{t.title}</h1>
            <p className="text-xl text-muted-foreground mb-2">{t.subtitle}</p>
            <p className="text-sm text-muted-foreground">{t.lastUpdated}</p>
          </div>

          {/* Important Notice */}
          <Card className="mb-8 border-destructive/20 bg-destructive/5">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <AlertTriangle className="h-6 w-6 text-destructive mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-destructive mb-2">
                    {language === "en" ? "IMPORTANT LEGAL NOTICE" : "AVISO LEGAL IMPORTANTE"}
                  </h3>
                  <p className="text-sm text-foreground">
                    {language === "en"
                      ? "By providing your phone number or placing an order, you agree to these legally binding terms. Please read carefully."
                      : "Al proporcionar su número de teléfono o realizar un pedido, usted acepta estos términos legalmente vinculantes. Por favor lea cuidadosamente."}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Terms Sections */}
          <div className="space-y-6">
            {/* Agreement Acceptance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary" />
                  {t.acceptance.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground leading-relaxed">{t.acceptance.content}</p>
              </CardContent>
            </Card>

            {/* Liability Limitation */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-primary" />
                  {t.liability.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground leading-relaxed">{t.liability.content}</p>
              </CardContent>
            </Card>

            {/* Delivery Terms */}
            <Card>
              <CardHeader>
                <CardTitle>{t.delivery.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground leading-relaxed">{t.delivery.content}</p>
              </CardContent>
            </Card>

            {/* Customer Responsibility */}
            <Card>
              <CardHeader>
                <CardTitle>{t.responsibility.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground leading-relaxed">{t.responsibility.content}</p>
              </CardContent>
            </Card>

            {/* Communication Agreement */}
            <Card>
              <CardHeader>
                <CardTitle>{t.communication.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground leading-relaxed">{t.communication.content}</p>
              </CardContent>
            </Card>

            {/* Legal Enforcement */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Scale className="h-5 w-5 text-primary" />
                  {t.legal.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground leading-relaxed">{t.legal.content}</p>
              </CardContent>
            </Card>

            {/* Product Disclaimer */}
            <Card>
              <CardHeader>
                <CardTitle>{t.products.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground leading-relaxed">{t.products.content}</p>
              </CardContent>
            </Card>

            {/* Payment Terms */}
            <Card>
              <CardHeader>
                <CardTitle>{t.payment.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground leading-relaxed">{t.payment.content}</p>
              </CardContent>
            </Card>

            {/* Indemnification */}
            <Card>
              <CardHeader>
                <CardTitle>{t.indemnification.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground leading-relaxed">{t.indemnification.content}</p>
              </CardContent>
            </Card>

            {/* Governing Law */}
            <Card>
              <CardHeader>
                <CardTitle>{t.jurisdiction.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground leading-relaxed">{t.jurisdiction.content}</p>
              </CardContent>
            </Card>
          </div>

          <Separator className="my-8" />

          {/* Contact Information */}
          <Card className="bg-muted/30">
            <CardContent className="p-6 text-center">
              <h3 className="font-semibold mb-2">
                {language === "en" ? "Questions About These Terms?" : "¿Preguntas Sobre Estos Términos?"}
              </h3>
              <p className="text-muted-foreground">
                {language === "en"
                  ? "Contact The Landscape Center for clarification on any terms or conditions."
                  : "Contacte a The Landscape Center para aclaración sobre cualquier término o condición."}
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer language={language} />
    </div>
  )
}
