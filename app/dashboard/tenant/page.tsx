"use client"

import { useState, useEffect, useMemo } from "react"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { PropertyFilters } from "@/components/browse/property-filters"
import { PropertyBrowseCard } from "@/components/browse/property-browse-card"
import { PropertyDetailModal } from "@/components/browse/property-detail-modal"
import { TenantHeader } from "@/components/browse/tenant-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import type { Property } from "@/lib/properties"
import { dummyProperties } from "@/lib/properties"

export default function TenantDashboard() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [properties] = useState<Property[]>(dummyProperties.filter((p) => p.isAvailable))
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [favorites, setFavorites] = useState<string[]>([])
  const [filters, setFilters] = useState<PropertyFilters>({
    search: "",
    location: "",
    minPrice: 0,
    maxPrice: 200000,
    propertyType: "",
    bedrooms: "",
    amenities: [],
  })

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "tenant")) {
      router.push("/login")
      return
    }
    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem("favorites")
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }
  }, [user, isLoading, router])

  const toggleFavorite = (propertyId: string) => {
    const newFavorites = favorites.includes(propertyId)
      ? favorites.filter((id) => id !== propertyId)
      : [...favorites, propertyId]
    setFavorites(newFavorites)
    localStorage.setItem("favorites", JSON.stringify(newFavorites))
  }

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase()
        if (
          !property.title.toLowerCase().includes(searchLower) &&
          !property.location.toLowerCase().includes(searchLower) &&
          !property.description.toLowerCase().includes(searchLower)
        ) {
          return false
        }
      }

      // Location filter
      if (filters.location && property.location !== filters.location) {
        return false
      }

      // Price range filter
      if (property.price < filters.minPrice || property.price > filters.maxPrice) {
        return false
      }

      // Property type filter
      if (filters.propertyType && property.type !== filters.propertyType) {
        return false
      }

      // Bedrooms filter
      if (filters.bedrooms) {
        const bedroomCount = Number.parseInt(filters.bedrooms)
        if (bedroomCount === 4 && property.bedrooms < 4) {
          return false
        } else if (bedroomCount !== 4 && property.bedrooms !== bedroomCount) {
          return false
        }
      }

      // Amenities filter
      if (filters.amenities.length > 0) {
        if (!filters.amenities.every((amenity) => property.amenities.includes(amenity))) {
          return false
        }
      }

      return true
    })
  }, [properties, filters])

  if (isLoading) {
    return <div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>
  }

  if (!user || user.role !== "tenant") {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <TenantHeader />

      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Find Your Perfect Home</h1>
          <p className="text-muted-foreground">
            Discover amazing rental properties across Kenya. {filteredProperties.length} properties available.
          </p>
        </div>

        {/* Filters */}
        <PropertyFilters filters={filters} onFiltersChange={setFilters} />

        {/* Results */}
        {filteredProperties.length === 0 ? (
          <Card className="text-center py-12">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-4">
                <Search className="h-6 w-6 text-muted-foreground" />
              </div>
              <CardTitle>No Properties Found</CardTitle>
              <CardDescription>Try adjusting your search criteria or filters to find more properties.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() =>
                  setFilters({
                    search: "",
                    location: "",
                    minPrice: 0,
                    maxPrice: 200000,
                    propertyType: "",
                    bedrooms: "",
                    amenities: [],
                  })
                }
              >
                Clear All Filters
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">{filteredProperties.length} Properties Found</h2>
            </div>

            {/* Properties Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.map((property) => (
                <PropertyBrowseCard
                  key={property.id}
                  property={property}
                  onViewDetails={setSelectedProperty}
                  onToggleFavorite={toggleFavorite}
                  isFavorite={favorites.includes(property.id)}
                />
              ))}
            </div>
          </>
        )}
      </main>

      {/* Property Detail Modal */}
      <PropertyDetailModal
        property={selectedProperty}
        isOpen={!!selectedProperty}
        onClose={() => setSelectedProperty(null)}
        onToggleFavorite={toggleFavorite}
        isFavorite={selectedProperty ? favorites.includes(selectedProperty.id) : false}
      />
    </div>
  )
}
