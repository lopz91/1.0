export interface KnowledgeEntry {
  id: string
  question: string
  answer: string
  category: string
  tags: string[]
  language: "en" | "es"
}

export const landscapeKnowledgeBase: KnowledgeEntry[] = [
  // English Entries
  {
    id: "irrigation-basics-en",
    question: "How do I design an irrigation system for my yard?",
    answer:
      "Start by mapping your landscape zones based on sun exposure, plant types, and soil conditions. Calculate water requirements for each zone, then design a system with appropriate sprinkler heads, drip emitters, and controllers. Consider factors like water pressure, flow rate, and local water restrictions.",
    category: "irrigation",
    tags: ["design", "sprinklers", "drip", "zones"],
    language: "en",
  },
  {
    id: "hardscape-materials-en",
    question: "What hardscape materials work best in Las Vegas climate?",
    answer:
      "For Las Vegas, choose materials that handle extreme heat and UV exposure. Natural stone like travertine and flagstone stay cooler. Concrete pavers with light colors reflect heat. Avoid dark materials that absorb heat. Consider permeable options for drainage during monsoons.",
    category: "hardscape",
    tags: ["materials", "climate", "heat", "stone", "pavers"],
    language: "en",
  },
  {
    id: "plant-selection-en",
    question: "What plants are drought-tolerant for desert landscaping?",
    answer:
      "Excellent drought-tolerant plants include: Desert Willow, Palo Verde, Mexican Sage, Lantana, Desert Marigold, and various agaves and cacti. These plants require minimal water once established and thrive in desert conditions. Group plants with similar water needs together.",
    category: "plants",
    tags: ["drought", "desert", "native", "water-wise"],
    language: "en",
  },
  {
    id: "soil-preparation-en",
    question: "How do I prepare desert soil for planting?",
    answer:
      "Desert soil often needs amendment. Add compost to improve drainage and nutrients. For clay soil, add sand and organic matter. Test pH levels - most plants prefer 6.0-7.0. Create raised beds or berms for better drainage. Mulch to retain moisture and regulate temperature.",
    category: "soil",
    tags: ["preparation", "amendment", "drainage", "pH", "mulch"],
    language: "en",
  },
  {
    id: "lighting-design-en",
    question: "How do I design landscape lighting for safety and beauty?",
    answer:
      "Layer your lighting with path lights for safety, accent lights for features, and ambient lighting for atmosphere. Use LED fixtures for energy efficiency. Place lights 6-8 feet apart along pathways. Highlight architectural features and mature plants. Consider timers and smart controls.",
    category: "lighting",
    tags: ["design", "safety", "LED", "pathways", "accent"],
    language: "en",
  },
  {
    id: "maintenance-schedule-en",
    question: "What is a good landscape maintenance schedule?",
    answer:
      "Spring: Prune, fertilize, check irrigation. Summer: Deep water, pest control, deadhead flowers. Fall: Plant new trees/shrubs, overseed grass, clean gutters. Winter: Protect sensitive plants, maintain equipment, plan next year. Adjust timing based on your specific climate zone.",
    category: "maintenance",
    tags: ["schedule", "seasonal", "pruning", "fertilizing"],
    language: "en",
  },

  // Spanish Entries
  {
    id: "irrigation-basics-es",
    question: "¿Cómo diseño un sistema de riego para mi jardín?",
    answer:
      "Comience mapeando las zonas de su paisaje según la exposición al sol, tipos de plantas y condiciones del suelo. Calcule los requisitos de agua para cada zona, luego diseñe un sistema con aspersores, emisores de goteo y controladores apropiados. Considere factores como presión de agua, caudal y restricciones locales de agua.",
    category: "irrigation",
    tags: ["diseño", "aspersores", "goteo", "zonas"],
    language: "es",
  },
  {
    id: "hardscape-materials-es",
    question: "¿Qué materiales de paisajismo duro funcionan mejor en el clima de Las Vegas?",
    answer:
      "Para Las Vegas, elija materiales que manejen el calor extremo y la exposición UV. La piedra natural como travertino y laja se mantienen más frescas. Los adoquines de concreto con colores claros reflejan el calor. Evite materiales oscuros que absorben calor. Considere opciones permeables para drenaje durante monzones.",
    category: "hardscape",
    tags: ["materiales", "clima", "calor", "piedra", "adoquines"],
    language: "es",
  },
  {
    id: "plant-selection-es",
    question: "¿Qué plantas son resistentes a la sequía para paisajismo desértico?",
    answer:
      "Excelentes plantas resistentes a la sequía incluyen: Sauce del Desierto, Palo Verde, Salvia Mexicana, Lantana, Caléndula del Desierto, y varios agaves y cactus. Estas plantas requieren agua mínima una vez establecidas y prosperan en condiciones desérticas. Agrupe plantas con necesidades similares de agua.",
    category: "plants",
    tags: ["sequía", "desierto", "nativas", "ahorro-agua"],
    language: "es",
  },
  {
    id: "soil-preparation-es",
    question: "¿Cómo preparo el suelo desértico para plantar?",
    answer:
      "El suelo desértico a menudo necesita enmiendas. Agregue compost para mejorar drenaje y nutrientes. Para suelo arcilloso, agregue arena y materia orgánica. Pruebe niveles de pH - la mayoría de plantas prefieren 6.0-7.0. Cree camas elevadas para mejor drenaje. Use mantillo para retener humedad y regular temperatura.",
    category: "soil",
    tags: ["preparación", "enmienda", "drenaje", "pH", "mantillo"],
    language: "es",
  },
  {
    id: "lighting-design-es",
    question: "¿Cómo diseño iluminación paisajística para seguridad y belleza?",
    answer:
      "Estratifique su iluminación con luces de sendero para seguridad, luces de acento para características, e iluminación ambiental para atmósfera. Use accesorios LED para eficiencia energética. Coloque luces cada 6-8 pies a lo largo de senderos. Resalte características arquitectónicas y plantas maduras. Considere temporizadores y controles inteligentes.",
    category: "lighting",
    tags: ["diseño", "seguridad", "LED", "senderos", "acento"],
    language: "es",
  },
  {
    id: "maintenance-schedule-es",
    question: "¿Cuál es un buen horario de mantenimiento del paisaje?",
    answer:
      "Primavera: Podar, fertilizar, revisar riego. Verano: Riego profundo, control de plagas, quitar flores muertas. Otoño: Plantar nuevos árboles/arbustos, resembrar césped, limpiar canaletas. Invierno: Proteger plantas sensibles, mantener equipo, planear próximo año. Ajuste según su zona climática específica.",
    category: "maintenance",
    tags: ["horario", "estacional", "poda", "fertilización"],
    language: "es",
  },
]

export function searchKnowledge(query: string, language: "en" | "es"): KnowledgeEntry[] {
  const searchTerms = query.toLowerCase().split(" ")

  return landscapeKnowledgeBase
    .filter((entry) => entry.language === language)
    .filter((entry) => {
      const searchableText = `${entry.question} ${entry.answer} ${entry.tags.join(" ")}`.toLowerCase()
      return searchTerms.some((term) => searchableText.includes(term))
    })
    .slice(0, 3) // Return top 3 matches
}

export function getRandomTips(language: "en" | "es", count = 3): KnowledgeEntry[] {
  const entries = landscapeKnowledgeBase.filter((entry) => entry.language === language)
  const shuffled = entries.sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}
