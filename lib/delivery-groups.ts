import { createClient } from "@/lib/supabase/server"

export interface DeliveryGroup {
  id: string
  name: string
  description: string | null
  vehicle_type: "flatbed" | "dump_truck" | "standard"
  base_fee: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface CategoryDeliveryGroup {
  id: string
  category_id: string
  delivery_group_id: string
  created_at: string
  delivery_group?: DeliveryGroup
}

export async function getDeliveryGroups(): Promise<DeliveryGroup[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("delivery_groups")
    .select("*")
    .eq("is_active", true)
    .order("base_fee", { ascending: true })

  if (error) {
    console.error("Error fetching delivery groups:", error)
    return []
  }

  return data || []
}

export async function getDeliveryGroupForCategory(categoryId: string): Promise<DeliveryGroup | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("category_delivery_groups")
    .select(`
      *,
      delivery_group:delivery_groups(*)
    `)
    .eq("category_id", categoryId)
    .single()

  if (error) {
    console.error("Error fetching delivery group for category:", error)
    return null
  }

  return data?.delivery_group || null
}

export async function getDeliveryGroupForProduct(productId: string): Promise<DeliveryGroup | null> {
  const supabase = await createClient()

  // First get the product's category
  const { data: product, error: productError } = await supabase
    .from("products")
    .select("category_id")
    .eq("id", productId)
    .single()

  if (productError || !product) {
    console.error("Error fetching product:", productError)
    return null
  }

  // Then get the delivery group for that category
  return getDeliveryGroupForCategory(product.category_id)
}

export async function calculateDeliveryFee(cartItems: Array<{ product_id: string; quantity: number }>): Promise<{
  deliveryGroups: Array<{ group: DeliveryGroup; productCount: number }>
  totalDeliveryFee: number
}> {
  const supabase = await createClient()

  if (cartItems.length === 0) {
    return { deliveryGroups: [], totalDeliveryFee: 0 }
  }

  // Get all products with their categories
  const productIds = cartItems.map((item) => item.product_id)
  const { data: products, error: productsError } = await supabase
    .from("products")
    .select("id, category_id")
    .in("id", productIds)

  if (productsError || !products) {
    console.error("Error fetching products for delivery calculation:", productsError)
    return { deliveryGroups: [], totalDeliveryFee: 0 }
  }

  // Get delivery groups for all categories
  const categoryIds = [...new Set(products.map((p) => p.category_id))]
  const { data: categoryDeliveryGroups, error: categoryError } = await supabase
    .from("category_delivery_groups")
    .select(`
      category_id,
      delivery_group:delivery_groups(*)
    `)
    .in("category_id", categoryIds)

  if (categoryError) {
    console.error("Error fetching category delivery groups:", categoryError)
    return { deliveryGroups: [], totalDeliveryFee: 0 }
  }

  // Group products by delivery group
  const deliveryGroupMap = new Map<string, { group: DeliveryGroup; productCount: number }>()

  for (const product of products) {
    const categoryDeliveryGroup = categoryDeliveryGroups?.find((cdg) => cdg.category_id === product.category_id)

    if (categoryDeliveryGroup?.delivery_group) {
      const group = categoryDeliveryGroup.delivery_group
      const cartItem = cartItems.find((item) => item.product_id === product.id)
      const quantity = cartItem?.quantity || 0

      if (deliveryGroupMap.has(group.id)) {
        const existing = deliveryGroupMap.get(group.id)!
        existing.productCount += quantity
      } else {
        deliveryGroupMap.set(group.id, {
          group,
          productCount: quantity,
        })
      }
    }
  }

  const deliveryGroups = Array.from(deliveryGroupMap.values())
  const totalDeliveryFee = deliveryGroups.reduce((total, { group }) => total + group.base_fee, 0)

  return { deliveryGroups, totalDeliveryFee }
}
