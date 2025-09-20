"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ContractorCard } from "@/components/contractor-card"
import { ContractorFilters } from "@/components/contractor-filters"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MapPin } from "lucide-react"

interface ContractorProfile {
  id: string
  business_name: string
  description: string
  specialties: string[]
  profile_image_url?: string
  google_rating: number
  google_review_count: number
  service_areas: string[]
  years_in_business?: number
  is_verified: boolean
  is_featured: boolean
  spend_tier: string
  website_url?: string
  facebook_url?: string
  instagram_url?: string
}

const mockContractors: ContractorProfile[] = [
  {
    id: "1",
    business_name: "Desert Oasis Landscaping",
    description:
      "Specializing in drought-resistant desert landscaping and hardscaping for Las Vegas homes and businesses.",
    specialties: ["Desert Landscaping", "Hardscaping", "Irrigation"],
    profile_image_url: "/desert-landscaping-company.jpg",
    google_rating: 4.8,
    google_review_count: 127,
    service_areas: ["Las Vegas", "Henderson", "Summerlin"],
    years_in_business: 12,
    is_verified: true,
    is_featured: true,
    spend_tier: "gold",
    website_url: "https://desertoasislandscaping.com",
  },
  {
    id: "2",
    business_name: "Vegas Green Solutions",
    description: "Eco-friendly landscaping solutions with a focus on water conservation and sustainable practices.",
    specialties: ["Eco-Friendly Landscaping", "Water Conservation", "Maintenance"],
    profile_image_url: "/green-landscaping-team.jpg",
    google_rating: 4.6,
    google_review_count: 89,
    service_areas: ["Las Vegas", "North Las Vegas", "Boulder City"],
    years_in_business: 8,
    is_verified: true,
    is_featured: false,
    spend_tier: "silver",
  },
  {
    id: "3",
    business_name: "Sunset Hardscapes",
    description: "Premium hardscaping services including patios, walkways, retaining walls, and outdoor living spaces.",
    specialties: ["Hardscaping", "Patios", "Retaining Walls", "Outdoor Living"],
    profile_image_url: "/hardscape-patio-construction.jpg",
    google_rating: 4.9,
    google_review_count: 156,
    service_areas: ["Las Vegas", "Henderson", "Summerlin", "Green Valley"],
    years_in_business: 15,
    is_verified: true,
    is_featured: true,
    spend_tier: "platinum",
    website_url: "https://sunsethardscapes.com",
    facebook_url: "https://facebook.com/sunsethardscapes",
  },
  {
    id: "4",
    business_name: "Mountain View Landscaping",
    description: "Full-service landscaping company providing design, installation, and maintenance services.",
    specialties: ["Landscape Design", "Installation", "Maintenance", "Tree Services"],
    profile_image_url: "/mountain-landscaping-crew.jpg",
    google_rating: 4.4,
    google_review_count: 73,
    service_areas: ["Las Vegas", "Henderson"],
    years_in_business: 6,
    is_verified: true,
    is_featured: false,
    spend_tier: "bronze",
  },
  {
    id: "5",
    business_name: "Cactus Creek Designs",
    description: "Creative desert landscaping with native plants and artistic hardscape elements.",
    specialties: ["Desert Landscaping", "Native Plants", "Artistic Design"],
    profile_image_url: "/cactus-desert-garden-design.jpg",
    google_rating: 4.7,
    google_review_count: 94,
    service_areas: ["Las Vegas", "Summerlin", "Red Rock"],
    years_in_business: 10,
    is_verified: true,
    is_featured: false,
    spend_tier: "silver",
    instagram_url: "https://instagram.com/cactuscreekdesigns",
  },
  {
    id: "6",
    business_name: "Premier Pool & Landscape",
    description: "Luxury pool and landscape design with complete outdoor living solutions.",
    specialties: ["Pool Landscaping", "Luxury Design", "Outdoor Living", "Lighting"],
    profile_image_url: "/placeholder-jwwch.png",
    google_rating: 4.9,
    google_review_count: 203,
    service_areas: ["Las Vegas", "Henderson", "Summerlin", "Green Valley"],
    years_in_business: 18,
    is_verified: true,
    is_featured: true,
    spend_tier: "platinum",
    website_url: "https://premierpoollandscape.com",
    facebook_url: "https://facebook.com/premierpoollandscape",
  },
]

export default function FindAProPage() {
  const [language, setLanguage] = useState<"en" | "es">("en")
  const [contractors, setContractors] = useState<ContractorProfile[]>([])
  const [filteredContractors, setFilteredContractors] = useState<ContractorProfile[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([])
  const [selectedAreas, setSelectedAreas] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchContractors()
  }, [])

  useEffect(() => {
    filterContractors()
  }, [contractors, searchTerm, selectedSpecialties, selectedAreas])

  const fetchContractors = async () => {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Filter for verified contractors and sort by featured status and rating
      const sortedContractors = mockContractors
        .filter((contractor) => contractor.is_verified)
        .sort((a, b) => {
          if (a.is_featured !== b.is_featured) {
            return b.is_featured ? 1 : -1
          }
          return b.google_rating - a.google_rating
        })

      setContractors(sortedContractors)
    } catch (error) {
      console.error("Error fetching contractors:", error)
    } finally {
      setLoading(false)
    }
  }

  const filterContractors = () => {
    let filtered = contractors

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (contractor) =>
          contractor.business_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          contractor.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          contractor.specialties.some((specialty) => specialty.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    // Specialty filter
    if (selectedSpecialties.length > 0) {
      filtered = filtered.filter((contractor) =>
        selectedSpecialties.some((specialty) => contractor.specialties.includes(specialty)),
      )
    }

    // Service area filter
    if (selectedAreas.length > 0) {
      filtered = filtered.filter((contractor) => selectedAreas.some((area) => contractor.service_areas.includes(area)))
    }

    setFilteredContractors(filtered)
  }

  return (
    <div className="min-h-screen bg-black">
      <Header language={language} onLanguageChange={setLanguage} cartItemCount={0} isLoggedIn={false} />

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            {language === "es" ? "Encuentra un Profesional" : "Find a Pro"}
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            {language === "es"
              ? "Conecta con contratistas verificados especializados en paisajismo en Las Vegas"
              : "Connect with verified landscaping contractors in Las Vegas"}
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder={language === "es" ? "Buscar contratistas..." : "Search contractors..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-900 border-gray-700 text-white placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <div className="bg-gray-900/50 rounded-lg p-4">
              <div className="text-2xl font-bold text-yellow-400">{contractors.length}</div>
              <div className="text-sm text-gray-300">{language === "es" ? "Contratistas" : "Contractors"}</div>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-4">
              <div className="text-2xl font-bold text-yellow-400">
                {contractors.filter((c) => c.is_verified).length}
              </div>
              <div className="text-sm text-gray-300">{language === "es" ? "Verificados" : "Verified"}</div>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-4">
              <div className="text-2xl font-bold text-yellow-400">
                {contractors.filter((c) => c.is_featured).length}
              </div>
              <div className="text-sm text-gray-300">{language === "es" ? "Destacados" : "Featured"}</div>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-4">
              <div className="text-2xl font-bold text-yellow-400">4.8</div>
              <div className="text-sm text-gray-300">{language === "es" ? "Calificación Promedio" : "Avg Rating"}</div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <ContractorFilters
              language={language}
              contractors={contractors}
              selectedSpecialties={selectedSpecialties}
              selectedAreas={selectedAreas}
              onSpecialtiesChange={setSelectedSpecialties}
              onAreasChange={setSelectedAreas}
            />
          </div>

          {/* Contractors Grid */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-gray-900/50 rounded-lg p-6 animate-pulse">
                    <div className="w-full h-48 bg-gray-800 rounded-lg mb-4"></div>
                    <div className="h-4 bg-gray-800 rounded mb-2"></div>
                    <div className="h-3 bg-gray-800 rounded mb-4"></div>
                    <div className="flex gap-2">
                      <div className="h-6 w-16 bg-gray-800 rounded"></div>
                      <div className="h-6 w-20 bg-gray-800 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredContractors.length > 0 ? (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredContractors.map((contractor) => (
                  <ContractorCard key={contractor.id} contractor={contractor} language={language} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">
                  {language === "es" ? "No se encontraron contratistas" : "No contractors found"}
                </h3>
                <p className="text-gray-400 mb-6">
                  {language === "es" ? "Intenta ajustar tus filtros de búsqueda" : "Try adjusting your search filters"}
                </p>
                <Button
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedSpecialties([])
                    setSelectedAreas([])
                  }}
                  className="bg-yellow-400 hover:bg-yellow-300 text-black"
                >
                  {language === "es" ? "Limpiar Filtros" : "Clear Filters"}
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Call to Action for Contractors */}
        <div className="mt-16 bg-gradient-to-r from-yellow-400/10 to-gray-600/10 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            {language === "es" ? "¿Eres un Contratista?" : "Are You a Contractor?"}
          </h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            {language === "es"
              ? "Únete a nuestra plataforma y conecta con clientes que buscan servicios de paisajismo profesionales"
              : "Join our platform and connect with customers looking for professional landscaping services"}
          </p>
          <Button className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold">
            {language === "es" ? "Crear Perfil de Contratista" : "Create Contractor Profile"}
          </Button>
        </div>
      </main>

      <Footer language={language} />
    </div>
  )
}
