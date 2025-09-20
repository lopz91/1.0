"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ShoppingCart, Package, Tag, Truck, AlertTriangle } from "lucide-react"
import { PromotionalBanner } from "@/components/promotional-banner"
import { CouponInput } from "@/components/coupon-input"

interface SaleProduct {
  id: string
  name_en: string
  name_es: string
  description_en: string
  description_es: string
  price: number
  sale_price: number
  discount_percentage: number
  images: string[]
  category: string
  stock_quantity: number
}

interface ProductBundle {
  id: string
  name_en: string
  name_es: string
  description_en: string
  description_es: string
  bundle_price: number
  original_price: number
  discount_percentage: number
  items: {
    product: {
      name_en: string
      name_es: string
      images: string[]
    }
    quantity: number
  }[]
}

export default function SalesPage() {
  const [language, setLanguage] = useState<"en" | "es">("en")
  const [saleProducts, setSaleProducts] = useState<SaleProduct[]>([])
  const [bundles, setBundles] = useState<ProductBundle[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("products")

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        // Mock sale products data
        const mockSaleProducts: SaleProduct[] = [
          {
            id: "1",
            name_en: "Premium River Rock",
            name_es: "Piedra de Río Premium",
            description_en: "Beautiful river rock perfect for landscaping and drainage",
            description_es: "Hermosa piedra de río perfecta para paisajismo y drenaje",
            price: 45.99,
            sale_price: 32.19,
            discount_percentage: 30,
            images: ["/placeholder-imf5k.png"],
            category: "Bulk Materials",
            stock_quantity: 25,
          },
          {
            id: "2",
            name_en: "Decorative Flagstone",
            name_es: "Losa Decorativa",
            description_en: "Natural flagstone for patios and walkways",
            description_es: "Losa natural para patios y senderos",
            price: 89.99,
            sale_price: 62.99,
            discount_percentage: 30,
            images: ["/placeholder-5di7g.png"],
            category: "Hardscape",
            stock_quantity: 15,
          },
          {
            id: "3",
            name_en: "Mulch Blend",
            name_es: "Mezcla de Mantillo",
            description_en: "Organic mulch blend for garden beds",
            description_es: "Mezcla orgánica de mantillo para jardines",
            price: 28.99,
            sale_price: 20.29,
            discount_percentage: 30,
            images: ["/placeholder-a9pzt.png"],
            category: "Bulk Materials",
            stock_quantity: 8,
          },
        ]

        // Mock bundles data
        const mockBundles: ProductBundle[] = [
          {
            id: "bundle1",
            name_en: "Complete Patio Package",
            name_es: "Paquete Completo de Patio",
            description_en: "Everything you need for a beautiful patio",
            description_es: "Todo lo que necesitas para un hermoso patio",
            bundle_price: 299.99,
            original_price: 399.99,
            discount_percentage: 25,
            items: [
              {
                product: {
                  name_en: "Flagstone Pavers",
                  name_es: "Adoquines de Losa",
                  images: ["/placeholder-n7sj1.png"],
                },
                quantity: 50,
              },
              {
                product: {
                  name_en: "Paver Sand",
                  name_es: "Arena para Adoquines",
                  images: ["/placeholder-usnci.png"],
                },
                quantity: 10,
              },
              {
                product: {
                  name_en: "Edge Restraint",
                  name_es: "Borde de Contención",
                  images: ["/placeholder-z0c3r.png"],
                },
                quantity: 100,
              },
            ],
          },
          {
            id: "bundle2",
            name_en: "Garden Starter Kit",
            name_es: "Kit Inicial de Jardín",
            description_en: "Perfect starter package for new gardens",
            description_es: "Paquete perfecto para jardines nuevos",
            bundle_price: 149.99,
            original_price: 199.99,
            discount_percentage: 25,
            items: [
              {
                product: {
                  name_en: "Premium Soil",
                  name_es: "Tierra Premium",
                  images: ["/placeholder-tlbp4.png"],
                },
                quantity: 5,
              },
              {
                product: {
                  name_en: "Organic Compost",
                  name_es: "Compost Orgánico",
                  images: ["/placeholder-nvc6u.png"],
                },
                quantity: 3,
              },
              {
                product: {
                  name_en: "Mulch",
                  name_es: "Mantillo",
                  images: ["/placeholder-d9fp3.png"],
                },
                quantity: 4,
              },
            ],
          },
        ]

        setSaleProducts(mockSaleProducts)
        setBundles(mockBundles)
      } catch (error) {
        console.error("Error loading sales data:", error)
        setSaleProducts([])
        setBundles([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchSalesData()
  }, [])

  const addToCart = async (productId: string, quantity = 1) => {
    console.log(`Added product ${productId} (qty: ${quantity}) to cart`)
    // Show success message in real implementation
  }

  const addBundleToCart = async (bundleId: string) => {
    console.log(`Added bundle ${bundleId} to cart`)
    // Show success message in real implementation
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
        <div className="text-white">Loading sales...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-900/20 to-amber-900/20 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                {language === "es" ? "Ofertas Especiales" : "Special Offers"}
              </h1>
              <p className="text-zinc-300 text-lg">
                {language === "es"
                  ? "Descuentos exclusivos en materiales de paisajismo - Solo materiales, no instalación"
                  : "Exclusive discounts on landscaping materials - Materials only, no installation"}
              </p>
            </div>
            <Button
              onClick={() => setLanguage(language === "en" ? "es" : "en")}
              variant="outline"
              className="border-zinc-700 text-zinc-300 hover:border-amber-400 hover:text-amber-400"
            >
              {language === "en" ? "Español" : "English"}
            </Button>
          </div>
        </div>
      </div>

      {/* Important Notice */}
      <div className="bg-amber-900/20 border-b border-amber-700/30">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3 text-amber-200">
            <AlertTriangle className="h-5 w-5 text-amber-400" />
            <p className="text-sm">
              {language === "es"
                ? "Importante: Vendemos solo materiales. No proporcionamos instalación ni somos contratistas."
                : "Important: We sell materials only. We do not provide installation and are not contractors."}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Promotional Banners */}
        <div className="mb-8">
          <PromotionalBanner language={language} />
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-zinc-800 border-zinc-700">
            <TabsTrigger value="products" className="data-[state=active]:bg-amber-600">
              <Tag className="h-4 w-4 mr-2" />
              {language === "es" ? "Productos en Oferta" : "Sale Products"}
            </TabsTrigger>
            <TabsTrigger value="bundles" className="data-[state=active]:bg-amber-600">
              <Package className="h-4 w-4 mr-2" />
              {language === "es" ? "Paquetes Especiales" : "Special Packages"}
            </TabsTrigger>
          </TabsList>

          {/* Sale Products Tab */}
          <TabsContent value="products" className="mt-8">
            {saleProducts.length === 0 ? (
              <Card className="bg-zinc-800 border-zinc-700">
                <CardContent className="p-8 text-center">
                  <Tag className="h-12 w-12 text-zinc-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-zinc-300 mb-2">
                    {language === "es" ? "No hay ofertas activas" : "No active sales"}
                  </h3>
                  <p className="text-zinc-500">
                    {language === "es"
                      ? "Revisa pronto para nuevas ofertas especiales"
                      : "Check back soon for new special offers"}
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {saleProducts.map((product) => (
                  <Card
                    key={product.id}
                    className="bg-zinc-800 border-zinc-700 hover:border-amber-400/50 transition-colors"
                  >
                    <CardHeader className="p-0">
                      <div className="relative">
                        <img
                          src={product.images[0] || "/placeholder.svg?height=200&width=300&query=landscape material"}
                          alt={language === "es" ? product.name_es : product.name_en}
                          className="w-full h-48 object-cover rounded-t-lg"
                        />
                        <Badge className="absolute top-2 right-2 bg-red-600 text-white">
                          -{product.discount_percentage}%
                        </Badge>
                        {product.stock_quantity < 10 && (
                          <Badge className="absolute top-2 left-2 bg-orange-600 text-white">
                            {language === "es" ? "Pocas unidades" : "Low stock"}
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-white mb-2">
                        {language === "es" ? product.name_es : product.name_en}
                      </h3>
                      <p className="text-zinc-400 text-sm mb-4 line-clamp-2">
                        {language === "es" ? product.description_es : product.description_en}
                      </p>

                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-2xl font-bold text-amber-400">${product.sale_price.toFixed(2)}</span>
                        <span className="text-lg text-zinc-500 line-through">${product.price.toFixed(2)}</span>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-zinc-500 mb-4">
                        <Truck className="h-3 w-3" />
                        {language === "es" ? "Solo materiales - Sin instalación" : "Materials only - No installation"}
                      </div>

                      <Button
                        onClick={() => addToCart(product.id)}
                        className="w-full bg-amber-600 hover:bg-amber-500 text-black font-semibold"
                        disabled={product.stock_quantity === 0}
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        {product.stock_quantity === 0
                          ? language === "es"
                            ? "Agotado"
                            : "Out of Stock"
                          : language === "es"
                            ? "Agregar al Carrito"
                            : "Add to Cart"}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Bundles Tab */}
          <TabsContent value="bundles" className="mt-8">
            {bundles.length === 0 ? (
              <Card className="bg-zinc-800 border-zinc-700">
                <CardContent className="p-8 text-center">
                  <Package className="h-12 w-12 text-zinc-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-zinc-300 mb-2">
                    {language === "es" ? "No hay paquetes disponibles" : "No packages available"}
                  </h3>
                  <p className="text-zinc-500">
                    {language === "es"
                      ? "Estamos preparando paquetes especiales para ti"
                      : "We're preparing special packages for you"}
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {bundles.map((bundle) => (
                  <Card
                    key={bundle.id}
                    className="bg-zinc-800 border-zinc-700 hover:border-amber-400/50 transition-colors"
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-white">
                          {language === "es" ? bundle.name_es : bundle.name_en}
                        </CardTitle>
                        <Badge className="bg-green-600 text-white">{language === "es" ? "Paquete" : "Bundle"}</Badge>
                      </div>
                      <p className="text-zinc-400">
                        {language === "es" ? bundle.description_es : bundle.description_en}
                      </p>
                    </CardHeader>
                    <CardContent>
                      {/* Bundle Items */}
                      <div className="space-y-3 mb-6">
                        <h4 className="font-semibold text-zinc-300">{language === "es" ? "Incluye:" : "Includes:"}</h4>
                        {bundle.items.map((item, index) => (
                          <div key={index} className="flex items-center gap-3 p-2 bg-zinc-900 rounded">
                            <img
                              src={item.product.images[0] || "/placeholder.svg?height=40&width=40&query=product"}
                              alt={language === "es" ? item.product.name_es : item.product.name_en}
                              className="w-10 h-10 object-cover rounded"
                            />
                            <div className="flex-1">
                              <p className="text-sm text-white">
                                {language === "es" ? item.product.name_es : item.product.name_en}
                              </p>
                              <p className="text-xs text-zinc-500">
                                {language === "es" ? "Cantidad:" : "Quantity:"} {item.quantity}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Pricing */}
                      <div className="border-t border-zinc-700 pt-4 mb-6">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-zinc-400">
                            {language === "es" ? "Precio individual:" : "Individual price:"}
                          </span>
                          <span className="text-zinc-500 line-through">${bundle.original_price.toFixed(2)}</span>
                        </div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-zinc-400">
                            {language === "es" ? "Precio del paquete:" : "Bundle price:"}
                          </span>
                          <span className="text-2xl font-bold text-amber-400">${bundle.bundle_price.toFixed(2)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-green-400 font-semibold">
                            {language === "es" ? "Ahorras:" : "You save:"}
                          </span>
                          <span className="text-green-400 font-semibold">
                            ${(bundle.original_price - bundle.bundle_price).toFixed(2)} ({bundle.discount_percentage}%)
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-zinc-500 mb-4">
                        <Truck className="h-3 w-3" />
                        {language === "es" ? "Solo materiales - Sin instalación" : "Materials only - No installation"}
                      </div>

                      <Button
                        onClick={() => addBundleToCart(bundle.id)}
                        className="w-full bg-amber-600 hover:bg-amber-500 text-black font-semibold"
                      >
                        <Package className="h-4 w-4 mr-2" />
                        {language === "es" ? "Agregar Paquete al Carrito" : "Add Bundle to Cart"}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Coupon Section */}
        <div className="mt-12">
          <Card className="bg-zinc-800 border-zinc-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Tag className="h-5 w-5 text-amber-400" />
                {language === "es" ? "¿Tienes un código de descuento?" : "Have a discount code?"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CouponInput
                language={language}
                orderTotal={0}
                onCouponApplied={(coupon) => console.log("Coupon applied:", coupon)}
                onCouponRemoved={() => console.log("Coupon removed")}
              />
            </CardContent>
          </Card>
        </div>

        {/* Delivery Information */}
        <div className="mt-8">
          <Card className="bg-zinc-800 border-zinc-700">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
                    <Truck className="h-5 w-5 text-amber-400" />
                    {language === "es" ? "Información de Entrega" : "Delivery Information"}
                  </h3>
                  <ul className="text-zinc-400 text-sm space-y-1">
                    <li>• {language === "es" ? "Entrega de camión volquete: $80" : "Dump truck delivery: $80"}</li>
                    <li>• {language === "es" ? "Entrega de plataforma: $160" : "Flatbed delivery: $160"}</li>
                    <li>
                      • {language === "es" ? "Solo área metropolitana de Las Vegas" : "Las Vegas metro area only"}
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-amber-400" />
                    {language === "es" ? "Importante Recordar" : "Important to Remember"}
                  </h3>
                  <ul className="text-zinc-400 text-sm space-y-1">
                    <li>• {language === "es" ? "Solo vendemos materiales" : "We only sell materials"}</li>
                    <li>• {language === "es" ? "No proporcionamos instalación" : "We do not provide installation"}</li>
                    <li>• {language === "es" ? "No somos contratistas" : "We are not contractors"}</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
