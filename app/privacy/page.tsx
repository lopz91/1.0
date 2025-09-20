import type { Metadata } from "next"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Camera, Shield, Eye, Phone, Mail, MapPin, Clock, Users, Database, Lock } from "lucide-react"

export const metadata: Metadata = {
  title: "Privacy Policy | The Landscape Center",
  description:
    "Privacy policy for The Landscape Center - Learn how we collect, use, and protect your personal information.",
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="h-8 w-8 text-green-600" />
            <h1 className="text-4xl font-bold text-gray-900">Privacy Policy</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your privacy is important to us. This policy explains how The Landscape Center collects, uses, and protects
            your personal information.
          </p>
          <Badge variant="outline" className="mt-4">
            Effective Date: {new Date().toLocaleDateString()}
          </Badge>
        </div>

        {/* Language Notice */}
        <Card className="mb-8 border-blue-200 bg-blue-50">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">English</h3>
                <p className="text-blue-800">
                  This privacy policy is available in English and Spanish. By using our services, you acknowledge that
                  you have read and understood this policy.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">Español</h3>
                <p className="text-blue-800">
                  Esta política de privacidad está disponible en inglés y español. Al usar nuestros servicios, reconoces
                  que has leído y entendido esta política.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-8">
          {/* Photo Usage Rights */}
          <Card className="border-orange-200">
            <CardHeader className="bg-orange-50">
              <CardTitle className="flex items-center gap-3 text-orange-900">
                <Camera className="h-6 w-6" />
                Photo Usage and Delivery Documentation
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">English</h4>
                  <div className="space-y-3 text-gray-700">
                    <p>
                      <strong>Delivery Photography:</strong> We take photographs of all deliveries for documentation and
                      quality assurance purposes.
                    </p>
                    <p>
                      <strong>Marketing Usage:</strong> By placing an order, you grant The Landscape Center unlimited
                      rights to use delivery photos, project images, and installation photos for marketing, advertising,
                      and promotional purposes.
                    </p>
                    <p>
                      <strong>Social Media:</strong> Photos may be used on our website, social media platforms,
                      brochures, and other marketing materials without additional compensation.
                    </p>
                    <p>
                      <strong>Property Documentation:</strong> We may photograph your property before, during, and after
                      delivery to document conditions and showcase our products.
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Español</h4>
                  <div className="space-y-3 text-gray-700">
                    <p>
                      <strong>Fotografía de Entrega:</strong> Tomamos fotografías de todas las entregas para
                      documentación y propósitos de control de calidad.
                    </p>
                    <p>
                      <strong>Uso de Marketing:</strong> Al realizar un pedido, otorgas a The Landscape Center derechos
                      ilimitados para usar fotos de entrega, imágenes de proyectos y fotos de instalación para
                      marketing, publicidad y propósitos promocionales.
                    </p>
                    <p>
                      <strong>Redes Sociales:</strong> Las fotos pueden ser usadas en nuestro sitio web, plataformas de
                      redes sociales, folletos y otros materiales de marketing sin compensación adicional.
                    </p>
                    <p>
                      <strong>Documentación de Propiedad:</strong> Podemos fotografiar tu propiedad antes, durante y
                      después de la entrega para documentar condiciones y mostrar nuestros productos.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Information Collection */}
          <Card className="border-green-200">
            <CardHeader className="bg-green-50">
              <CardTitle className="flex items-center gap-3 text-green-900">
                <Database className="h-6 w-6" />
                Information We Collect
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Personal Information</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-green-600" />
                      Name and contact information
                    </li>
                    <li className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-green-600" />
                      Phone numbers and SMS preferences
                    </li>
                    <li className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-green-600" />
                      Email addresses
                    </li>
                    <li className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-green-600" />
                      Delivery and billing addresses
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Business Information</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center gap-2">
                      <Eye className="h-4 w-4 text-green-600" />
                      Purchase history and preferences
                    </li>
                    <li className="flex items-center gap-2">
                      <Camera className="h-4 w-4 text-green-600" />
                      Property photos and project details
                    </li>
                    <li className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-green-600" />
                      Delivery schedules and requirements
                    </li>
                    <li className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-green-600" />
                      Communication logs and preferences
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* How We Use Information */}
          <Card className="border-blue-200">
            <CardHeader className="bg-blue-50">
              <CardTitle className="flex items-center gap-3 text-blue-900">
                <Eye className="h-6 w-6" />
                How We Use Your Information
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">English</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Process orders and manage deliveries</li>
                    <li>• Send SMS notifications and updates</li>
                    <li>• Provide customer support and assistance</li>
                    <li>• Market our products and services</li>
                    <li>• Improve our website and user experience</li>
                    <li>• Comply with legal requirements</li>
                    <li>• Create promotional materials using project photos</li>
                    <li>• Analyze customer preferences and trends</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Español</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Procesar pedidos y gestionar entregas</li>
                    <li>• Enviar notificaciones SMS y actualizaciones</li>
                    <li>• Proporcionar soporte y asistencia al cliente</li>
                    <li>• Comercializar nuestros productos y servicios</li>
                    <li>• Mejorar nuestro sitio web y experiencia del usuario</li>
                    <li>• Cumplir con requisitos legales</li>
                    <li>• Crear materiales promocionales usando fotos de proyectos</li>
                    <li>• Analizar preferencias y tendencias de clientes</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* SMS and Communication */}
          <Card className="border-purple-200">
            <CardHeader className="bg-purple-50">
              <CardTitle className="flex items-center gap-3 text-purple-900">
                <Phone className="h-6 w-6" />
                SMS and Communication Consent
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">English</h4>
                  <div className="space-y-3 text-gray-700">
                    <p>
                      <strong>SMS Consent:</strong> By providing your phone number, you consent to receive SMS messages
                      from The Landscape Center regarding orders, deliveries, and promotional offers.
                    </p>
                    <p>
                      <strong>Message Frequency:</strong> Message frequency varies. Standard message and data rates may
                      apply.
                    </p>
                    <p>
                      <strong>Opt-Out:</strong> Reply STOP to opt out of SMS messages at any time.
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Español</h4>
                  <div className="space-y-3 text-gray-700">
                    <p>
                      <strong>Consentimiento SMS:</strong> Al proporcionar tu número de teléfono, consientes recibir
                      mensajes SMS de The Landscape Center sobre pedidos, entregas y ofertas promocionales.
                    </p>
                    <p>
                      <strong>Frecuencia de Mensajes:</strong> La frecuencia de mensajes varía. Pueden aplicar tarifas
                      estándar de mensajes y datos.
                    </p>
                    <p>
                      <strong>Cancelar:</strong> Responde STOP para cancelar mensajes SMS en cualquier momento.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Security */}
          <Card className="border-red-200">
            <CardHeader className="bg-red-50">
              <CardTitle className="flex items-center gap-3 text-red-900">
                <Lock className="h-6 w-6" />
                Data Security and Storage
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">English</h4>
                  <div className="space-y-3 text-gray-700">
                    <p>
                      We implement appropriate security measures to protect your personal information against
                      unauthorized access, alteration, disclosure, or destruction.
                    </p>
                    <p>
                      Your information is stored on secure servers and may be shared with trusted third-party service
                      providers who assist in our operations.
                    </p>
                    <p>
                      We retain your information for as long as necessary to provide services and comply with legal
                      obligations.
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Español</h4>
                  <div className="space-y-3 text-gray-700">
                    <p>
                      Implementamos medidas de seguridad apropiadas para proteger tu información personal contra acceso
                      no autorizado, alteración, divulgación o destrucción.
                    </p>
                    <p>
                      Tu información se almacena en servidores seguros y puede ser compartida con proveedores de
                      servicios de terceros confiables que asisten en nuestras operaciones.
                    </p>
                    <p>
                      Retenemos tu información durante el tiempo necesario para proporcionar servicios y cumplir con
                      obligaciones legales.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Your Rights */}
          <Card className="border-indigo-200">
            <CardHeader className="bg-indigo-50">
              <CardTitle className="flex items-center gap-3 text-indigo-900">
                <Users className="h-6 w-6" />
                Your Privacy Rights
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">English</h4>
                  <div className="space-y-2 text-gray-700">
                    <p>• Request access to your personal information</p>
                    <p>• Request correction of inaccurate information</p>
                    <p>• Request deletion of your information (subject to legal requirements)</p>
                    <p>• Opt out of marketing communications</p>
                    <p>• Request information about data sharing practices</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Español</h4>
                  <div className="space-y-2 text-gray-700">
                    <p>• Solicitar acceso a tu información personal</p>
                    <p>• Solicitar corrección de información inexacta</p>
                    <p>• Solicitar eliminación de tu información (sujeto a requisitos legales)</p>
                    <p>• Cancelar comunicaciones de marketing</p>
                    <p>• Solicitar información sobre prácticas de intercambio de datos</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="border-gray-200">
            <CardHeader className="bg-gray-50">
              <CardTitle className="flex items-center gap-3 text-gray-900">
                <Mail className="h-6 w-6" />
                Contact Us About Privacy
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">English</h4>
                  <p className="text-gray-700 mb-4">
                    If you have questions about this privacy policy or want to exercise your privacy rights, contact us:
                  </p>
                  <div className="space-y-2 text-gray-700">
                    <p className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Phone: (555) 123-4567
                    </p>
                    <p className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email: privacy@landscapecenter.com
                    </p>
                    <p className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Address: 123 Garden Way, Green Valley, CA 90210
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Español</h4>
                  <p className="text-gray-700 mb-4">
                    Si tienes preguntas sobre esta política de privacidad o quieres ejercer tus derechos de privacidad,
                    contáctanos:
                  </p>
                  <div className="space-y-2 text-gray-700">
                    <p className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Teléfono: (555) 123-4567
                    </p>
                    <p className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email: privacy@landscapecenter.com
                    </p>
                    <p className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Dirección: 123 Garden Way, Green Valley, CA 90210
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Updates */}
          <Card className="border-yellow-200">
            <CardHeader className="bg-yellow-50">
              <CardTitle className="flex items-center gap-3 text-yellow-900">
                <Clock className="h-6 w-6" />
                Policy Updates
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">English</h4>
                  <p className="text-gray-700">
                    We may update this privacy policy from time to time. We will notify you of any material changes by
                    posting the new policy on our website and updating the effective date. Your continued use of our
                    services after any changes constitutes acceptance of the updated policy.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Español</h4>
                  <p className="text-gray-700">
                    Podemos actualizar esta política de privacidad de vez en cuando. Te notificaremos de cualquier
                    cambio material publicando la nueva política en nuestro sitio web y actualizando la fecha efectiva.
                    Tu uso continuado de nuestros servicios después de cualquier cambio constituye aceptación de la
                    política actualizada.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-600">
            Last updated: {new Date().toLocaleDateString()} |
            <span className="ml-2">
              <a href="/terms" className="text-green-600 hover:text-green-700 underline">
                Terms & Conditions
              </a>
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}
