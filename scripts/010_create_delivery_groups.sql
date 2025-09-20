-- Create delivery groups system for flatbed and dump truck deliveries

-- Create delivery_groups table
CREATE TABLE IF NOT EXISTS public.delivery_groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  vehicle_type TEXT NOT NULL CHECK (vehicle_type IN ('flatbed', 'dump_truck', 'standard')),
  base_fee DECIMAL(10,2) NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create category_delivery_groups table to link categories to delivery groups
CREATE TABLE IF NOT EXISTS public.category_delivery_groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES public.categories(id) ON DELETE CASCADE,
  delivery_group_id UUID REFERENCES public.delivery_groups(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(category_id, delivery_group_id)
);

-- Enable Row Level Security
ALTER TABLE public.delivery_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.category_delivery_groups ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for delivery_groups (public read access)
CREATE POLICY "Anyone can view active delivery groups" ON public.delivery_groups FOR SELECT USING (is_active = true);

-- Create RLS policies for category_delivery_groups (public read access)
CREATE POLICY "Anyone can view category delivery groups" ON public.category_delivery_groups FOR SELECT USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_delivery_groups_vehicle_type ON public.delivery_groups(vehicle_type);
CREATE INDEX IF NOT EXISTS idx_category_delivery_groups_category_id ON public.category_delivery_groups(category_id);
CREATE INDEX IF NOT EXISTS idx_category_delivery_groups_delivery_group_id ON public.category_delivery_groups(delivery_group_id);

-- Create trigger for updated_at
CREATE TRIGGER update_delivery_groups_updated_at BEFORE UPDATE ON public.delivery_groups FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert delivery groups
INSERT INTO public.delivery_groups (name, description, vehicle_type, base_fee) VALUES
('Flatbed Delivery', 'Flatbed truck delivery for hardscape materials, pavers, and large items', 'flatbed', 160.00),
('Dump Truck Delivery', 'Dump truck delivery for bulk materials, aggregates, and loose materials', 'dump_truck', 80.00),
('Standard Delivery', 'Standard delivery for smaller items and bagged products', 'standard', 25.00)
ON CONFLICT (name) DO NOTHING;

-- Link categories to delivery groups
-- First, get the delivery group IDs
DO $$
DECLARE
    flatbed_group_id UUID;
    dump_truck_group_id UUID;
    standard_group_id UUID;
    hardscape_category_id UUID;
    bulk_materials_category_id UUID;
    category_record RECORD;
BEGIN
    -- Get delivery group IDs
    SELECT id INTO flatbed_group_id FROM public.delivery_groups WHERE name = 'Flatbed Delivery';
    SELECT id INTO dump_truck_group_id FROM public.delivery_groups WHERE name = 'Dump Truck Delivery';
    SELECT id INTO standard_group_id FROM public.delivery_groups WHERE name = 'Standard Delivery';
    
    -- Get main category IDs
    SELECT id INTO hardscape_category_id FROM public.categories WHERE slug = 'hardscape-materials';
    SELECT id INTO bulk_materials_category_id FROM public.categories WHERE slug = 'bulk-materials';
    
    -- Link hardscape materials to flatbed delivery
    IF hardscape_category_id IS NOT NULL AND flatbed_group_id IS NOT NULL THEN
        INSERT INTO public.category_delivery_groups (category_id, delivery_group_id) 
        VALUES (hardscape_category_id, flatbed_group_id)
        ON CONFLICT (category_id, delivery_group_id) DO NOTHING;
        
        -- Link all hardscape subcategories to flatbed delivery
        FOR category_record IN 
            SELECT id FROM public.categories WHERE parent_id = hardscape_category_id
        LOOP
            INSERT INTO public.category_delivery_groups (category_id, delivery_group_id) 
            VALUES (category_record.id, flatbed_group_id)
            ON CONFLICT (category_id, delivery_group_id) DO NOTHING;
        END LOOP;
    END IF;
    
    -- Link bulk materials to dump truck delivery
    IF bulk_materials_category_id IS NOT NULL AND dump_truck_group_id IS NOT NULL THEN
        INSERT INTO public.category_delivery_groups (category_id, delivery_group_id) 
        VALUES (bulk_materials_category_id, dump_truck_group_id)
        ON CONFLICT (category_id, delivery_group_id) DO NOTHING;
        
        -- Link all bulk material subcategories to dump truck delivery
        FOR category_record IN 
            SELECT id FROM public.categories WHERE parent_id = bulk_materials_category_id
        LOOP
            INSERT INTO public.category_delivery_groups (category_id, delivery_group_id) 
            VALUES (category_record.id, dump_truck_group_id)
            ON CONFLICT (category_id, delivery_group_id) DO NOTHING;
        END LOOP;
    END IF;
    
    -- Link other categories to standard delivery (optional - for future use)
    FOR category_record IN 
        SELECT id FROM public.categories 
        WHERE id NOT IN (
            SELECT DISTINCT category_id FROM public.category_delivery_groups
        ) AND parent_id IS NULL
    LOOP
        INSERT INTO public.category_delivery_groups (category_id, delivery_group_id) 
        VALUES (category_record.id, standard_group_id)
        ON CONFLICT (category_id, delivery_group_id) DO NOTHING;
    END LOOP;
    
END $$;
