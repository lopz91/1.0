"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductFilters } from "@/components/product-filters"
import { ProductGrid } from "@/components/product-grid"
import { useTranslation } from "@/lib/i18n"
import { createBrowserClient } from "@supabase/ssr"
import { toast } from "sonner"

interface Product {
  id: string
  name: string
  description: string
  price: number
  unit?: string
  category_id: string
  subcategory?: string
  images: string[]
  is_active: boolean
  stock_quantity: number
  created_at: string
}

interface Category {
  id: number
  name: string
  name_es: string
  parent_id: number | null
  sort_order: number
}

export default function ProductsPage() {
  const [language, setLanguage] = useState<"en" | "es">("en")
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [addingToCartId, setAddingToCartId] = useState<string | null>(null)
  const [filters, setFilters] = useState<{
    search?: string
    category?: string
    sortBy?: string
  }>({})

  const t = useTranslation(language)
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories
        const { data: categoriesData, error: categoriesError } = await supabase
          .from("categories")
          .select("*")
          .order("sort_order")

        if (categoriesError) throw categoriesError
        setCategories(categoriesData || [])

        // Fetch products with filters
        let query = supabase.from("products").select("*").eq("is_active", true)

        if (filters.category) {
          query = query.eq("category_id", filters.category)
        }

        if (filters.search) {
          query = query.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`)
        }

        // Apply sorting
        switch (filters.sortBy) {
          case "price-low":
            query = query.order("price", { ascending: true })
            break
          case "price-high":
            query = query.order("price", { ascending: false })
            break
          case "name":
            query = query.order("name", { ascending: true })
            break
          default:
            query = query.order("created_at", { ascending: false })
            break
        }

        const { data: productsData, error: productsError } = await query

        if (productsError) throw productsError
        setProducts(productsData || [])
      } catch (error) {
        console.error("Error fetching data:", error)
        toast.error(language === "es" ? "Error al cargar productos" : "Error loading products")
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [filters, language, supabase])

  const handleAddToCart = async (productId: string, quantity = 1) => {
    setAddingToCartId(productId)

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        toast.error(
          language === "es" ? "Debes iniciar sesión para agregar productos" : "You must log in to add products",
        )
        return
      }

      const { error } = await supabase.from("cart_items").upsert({
        user_id: user.id,
        product_id: productId,
        quantity: quantity,
      })

      if (error) throw error

      toast.success(language === "es" ? "Producto agregado al carrito" : "Product added to cart")
    } catch (error) {
      console.error("Error adding to cart:", error)
      toast.error(language === "es" ? "Error al agregar al carrito" : "Error adding to cart")
    } finally {
      setAddingToCartId(null)
    }
  }

  const handleFiltersChange = (newFilters: typeof filters) => {
    setFilters(newFilters)
  }

  return (
    <div className="min-h-screen bg-black">
      <Header language={language} onLanguageChange={setLanguage} cartItemCount={0} isLoggedIn={false} />

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Page Header */}
          <div className="text-center space-y-4">
            <h1 className="text-3xl lg:text-4xl font-bold text-white">
              {language === "es" ? "Catálogo de Productos" : "Product Catalog"}
            </h1>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              {language === "es"
                ? "Descubre nuestra amplia selección de productos para paisajismo profesional"
                : "Discover our wide selection of professional landscaping products"}
            </p>
          </div>

          {/* Filters */}
          <ProductFilters
            categories={categories}
            language={language}
            onFiltersChange={handleFiltersChange}
            initialFilters={filters}
          />

          {/* Results Count */}
          <div className="flex items-center justify-between">
            <p className="text-zinc-400">
              {language === "es" ? `${products.length} productos encontrados` : `${products.length} products found`}
            </p>
          </div>

          {/* Product Grid */}
          <ProductGrid
            products={products}
            language={language}
            onAddToCart={handleAddToCart}
            isLoading={isLoading}
            addingToCartId={addingToCartId}
          />
        </div>
      </main>

      <Footer language={language} />
    </div>
  )
}
