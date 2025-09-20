import { createClient } from "@/lib/supabase/server"
import type { Product, Category } from "@/lib/types"
import { calculateDeliveryFee } from "@/lib/delivery-groups"

export async function getCategories(): Promise<Category[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true })

  if (error) {
    console.error("Error fetching categories:", error)
    return []
  }

  return data || []
}

export async function getProducts(filters?: {
  categoryId?: string
  search?: string
  zipCode?: string
  limit?: number
  offset?: number
}): Promise<{ products: Product[]; total: number }> {
  const supabase = await createClient()

  let query = supabase.from("products").select("*", { count: "exact" }).eq("is_active", true)

  if (filters?.categoryId) {
    query = query.eq("category_id", filters.categoryId)
  }

  if (filters?.search) {
    query = query.or(
      `name_en.ilike.%${filters.search}%,name_es.ilike.%${filters.search}%,description_en.ilike.%${filters.search}%,description_es.ilike.%${filters.search}%,sku.ilike.%${filters.search}%`,
    )
  }

  if (filters?.limit) {
    query = query.limit(filters.limit)
  }

  if (filters?.offset) {
    query = query.range(filters.offset, filters.offset + (filters.limit || 20) - 1)
  }

  query = query.order("created_at", { ascending: false })

  const { data, error, count } = await query

  if (error) {
    console.error("Error fetching products:", error)
    return { products: [], total: 0 }
  }

  let products = data || []

  // Filter by zip code if provided
  if (filters?.zipCode && products.length > 0) {
    const productIds = products.map((p) => p.id)

    const { data: restrictions } = await supabase
      .from("zip_code_restrictions")
      .select("product_id, is_available")
      .in("product_id", productIds)
      .eq("zip_code", filters.zipCode)

    if (restrictions && restrictions.length > 0) {
      const availableProductIds = new Set(restrictions.filter((r) => r.is_available).map((r) => r.product_id))

      const restrictedProductIds = new Set(restrictions.filter((r) => !r.is_available).map((r) => r.product_id))

      // If a product has restrictions for this zip code, only show if available
      products = products.filter((product) => {
        const hasRestrictions = restrictions.some((r) => r.product_id === product.id)
        if (hasRestrictions) {
          return availableProductIds.has(product.id)
        }
        // If no restrictions exist for this product in this zip code, show it
        return true
      })
    }
  }

  return { products, total: count || 0 }
}

export async function getProductById(id: string): Promise<Product | null> {
  const supabase = await createClient()

  const { data, error } = await supabase.from("products").select("*").eq("id", id).eq("is_active", true).single()

  if (error) {
    console.error("Error fetching product:", error)
    return null
  }

  return data
}

export async function checkProductAvailability(
  productId: string,
  zipCode: string,
): Promise<{
  isAvailable: boolean
  deliveryFee?: number
}> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("zip_code_restrictions")
    .select("is_available, delivery_fee_override")
    .eq("product_id", productId)
    .eq("zip_code", zipCode)
    .single()

  if (error || !data) {
    // No restrictions found, product is available
    return { isAvailable: true }
  }

  return {
    isAvailable: data.is_available,
    deliveryFee: data.delivery_fee_override || undefined,
  }
}

export async function getCartWithDelivery(userId: string): Promise<{
  items: any[]
  subtotal: number
  deliveryFee: number
  deliveryGroups: any[]
  total: number
}> {
  const supabase = await createClient()

  const { data: cartItems, error } = await supabase
    .from("cart_items")
    .select(`
      *,
      product:products(*)
    `)
    .eq("cart_id", (await supabase.from("shopping_carts").select("id").eq("user_id", userId).single()).data?.id || "")

  if (error || !cartItems) {
    console.error("Error fetching cart:", error)
    return { items: [], subtotal: 0, deliveryFee: 0, deliveryGroups: [], total: 0 }
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  // Calculate delivery fees using the new delivery groups system
  const deliveryCalculation = await calculateDeliveryFee(
    cartItems.map((item) => ({ product_id: item.product_id, quantity: item.quantity })),
  )

  const total = subtotal + deliveryCalculation.totalDeliveryFee

  return {
    items: cartItems,
    subtotal,
    deliveryFee: deliveryCalculation.totalDeliveryFee,
    deliveryGroups: deliveryCalculation.deliveryGroups,
    total,
  }
}
