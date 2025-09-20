"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CartSummary } from "@/components/cart-summary"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useTranslation } from "@/lib/i18n"
import { createBrowserClient } from "@supabase/ssr"
import { Plus, Minus, Trash2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { toast } from "sonner"

interface CartItem {
  id: number
  product_id: number
  quantity: number
  product: {
    id: number
    name: string
    description: string
    price: number
    contractor_price: number
    wholesale_price: number
    unit: string
    images: string[]
  }
}

export default function CartPage() {
  const [language, setLanguage] = useState<"en" | "es">("en")
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [userProfile, setUserProfile] = useState<any>(null)

  const t = useTranslation(language)
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()
        setUser(user)

        if (!user) {
          setIsLoading(false)
          return
        }

        const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()
        if (profile) {
          setUserProfile(profile)
        }

        const { data, error } = await supabase
          .from("cart_items")
          .select(`
            id,
            product_id,
            quantity,
            product:products(
              id,
              name,
              description,
              price,
              contractor_price,
              wholesale_price,
              unit,
              images
            )
          `)
          .eq(
            "cart_id",
            (await supabase.from("shopping_carts").select("id").eq("user_id", user.id).single()).data?.id || "",
          )

        if (error) throw error
        setCartItems(data || [])
      } catch (error) {
        console.error("Error fetching cart items:", error)
        toast.error(language === "es" ? "Error al cargar el carrito" : "Error loading cart")
      } finally {
        setIsLoading(false)
      }
    }

    fetchCartItems()
  }, [language, supabase])

  const updateQuantity = async (cartItemId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      await removeFromCart(cartItemId)
      return
    }

    try {
      const { error } = await supabase.from("cart_items").update({ quantity: newQuantity }).eq("id", cartItemId)

      if (error) throw error

      setCartItems((items) => items.map((item) => (item.id === cartItemId ? { ...item, quantity: newQuantity } : item)))
    } catch (error) {
      console.error("Error updating quantity:", error)
      toast.error(language === "es" ? "Error al actualizar cantidad" : "Error updating quantity")
    }
  }

  const removeFromCart = async (cartItemId: number) => {
    try {
      const { error } = await supabase.from("cart_items").delete().eq("id", cartItemId)

      if (error) throw error

      setCartItems((items) => items.filter((item) => item.id !== cartItemId))
      toast.success(language === "es" ? "Producto eliminado" : "Product removed")
    } catch (error) {
      console.error("Error removing from cart:", error)
      toast.error(language === "es" ? "Error al eliminar producto" : "Error removing product")
    }
  }

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      let price = item.product.price
      if (userProfile && userProfile.role === "contractor") {
        price = item.product.contractor_price || price
      } else if (userProfile && userProfile.role === "wholesale") {
        price = item.product.wholesale_price || price
      }
      return total + price * item.quantity
    }, 0)
  }

  const handleCheckout = () => {
    // This will be handled by the CartSummary component's onCheckout prop
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-black">
        <Header language={language} onLanguageChange={setLanguage} cartItemCount={0} isLoggedIn={false} />

        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h1 className="text-3xl font-bold text-white mb-4">
              {language === "es" ? "Inicia Sesión" : "Please Log In"}
            </h1>
            <p className="text-zinc-400 mb-6">
              {language === "es" ? "Debes iniciar sesión para ver tu carrito" : "You need to log in to view your cart"}
            </p>
            <Link href="/auth/login">
              <Button className="bg-amber-400 hover:bg-amber-300 text-black">
                {language === "es" ? "Iniciar Sesión" : "Log In"}
              </Button>
            </Link>
          </div>
        </main>

        <Footer language={language} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      <Header language={language} onLanguageChange={setLanguage} cartItemCount={cartItems.length} isLoggedIn={!!user} />

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Page Header */}
          <div className="text-center space-y-4">
            <h1 className="text-3xl lg:text-4xl font-bold text-white">
              {language === "es" ? "Carrito de Compras" : "Shopping Cart"}
            </h1>
            <p className="text-zinc-400">
              {language === "es"
                ? "Revisa tus productos antes de proceder al pago"
                : "Review your items before proceeding to checkout"}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {isLoading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-400 mx-auto"></div>
                  <p className="text-zinc-400 mt-4">{language === "es" ? "Cargando carrito..." : "Loading cart..."}</p>
                </div>
              ) : cartItems.length === 0 ? (
                <div className="text-center py-12">
                  <div className="max-w-md mx-auto">
                    <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">🛒</span>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {language === "es" ? "Tu carrito está vacío" : "Your cart is empty"}
                    </h3>
                    <p className="text-zinc-400 mb-6">
                      {language === "es"
                        ? "Explora nuestros productos y agrega algunos a tu carrito"
                        : "Browse our products and add some to your cart"}
                    </p>
                    <Link href="/products">
                      <Button className="bg-amber-400 hover:bg-amber-300 text-black">
                        {language === "es" ? "Continuar Comprando" : "Continue Shopping"}
                      </Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <>
                  {cartItems.map((item) => (
                    <Card key={item.id} className="bg-zinc-900 border-zinc-800">
                      <CardContent className="p-6">
                        <div className="flex gap-4">
                          <div className="w-20 h-20 bg-zinc-800 rounded-lg flex-shrink-0 overflow-hidden">
                            <Image
                              src={item.product.images?.[0] || "/placeholder.svg"}
                              alt={item.product.name}
                              width={80}
                              height={80}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-white mb-1">{item.product.name}</h3>
                            <p className="text-sm text-zinc-400 mb-2">{item.product.description}</p>
                            <p className="text-amber-400 font-semibold">
                              ${item.product.price.toFixed(2)} {item.product.unit}
                            </p>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <div className="flex items-center gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="h-8 w-8 p-0 border-zinc-700 hover:border-amber-400"
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="text-white min-w-[2rem] text-center">{item.quantity}</span>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="h-8 w-8 p-0 border-zinc-700 hover:border-amber-400"
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => removeFromCart(item.id)}
                              className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                            <p className="text-white font-semibold">
                              ${(item.product.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </>
              )}
            </div>

            {/* Cart Summary */}
            {cartItems.length > 0 && (
              <div className="lg:col-span-1">
                <CartSummary
                  items={cartItems}
                  language={language}
                  userProfile={userProfile}
                  onCheckout={() => (window.location.href = "/checkout")}
                  isProcessing={false}
                />
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer language={language} />
    </div>
  )
}
