"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Search, Filter, X, Sparkles } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { formatPrice } from "@/lib/properties"

export interface PropertyFilters {
  search: string
  location: string
  minPrice: number
  maxPrice: number
  propertyType: string
  bedrooms: string
  amenities: string[]
  aiSearch?: string
}

interface PropertyFiltersProps {
  filters: PropertyFilters
  onFiltersChange: (filters: PropertyFilters) => void
}

const locations = [
  "All Locations",
  "Westlands, Nairobi",
  "Karen, Nairobi",
  "Kilimani, Nairobi",
  "Kasarani, Nairobi",
  "Kileleshwa, Nairobi",
  "Lavington, Nairobi",
  "Runda, Nairobi",
  "Parklands, Nairobi",
]

const amenities = [
  "Parking",
  "Security",
  "Gym",
  "Swimming Pool",
  "Garden",
  "Backup Generator",
  "Backup Water",
  "Internet",
  "Furnished",
  "DSQ",
  "Elevator",
  "Balcony",
]

const houseSizeOptions = [
  { value: "any", label: "Any Size" },
  { value: "bedsitter", label: "Bedsitter" },
  { value: "1", label: "1 Bedroom" },
  { value: "2", label: "2 Bedrooms" },
  { value: "3", label: "3 Bedrooms" },
  { value: "4", label: "4+ Bedrooms" },
]

export function PropertyFilters({ filters, onFiltersChange }: PropertyFiltersProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [priceRange, setPriceRange] = useState([filters.minPrice, filters.maxPrice])

  const updateFilter = (key: keyof PropertyFilters, value: any) => {
    onFiltersChange({ ...filters, [key]: value })
  }

  const toggleAmenity = (amenity: string) => {
    const newAmenities = filters.amenities.includes(amenity)
      ? filters.amenities.filter((a) => a !== amenity)
      : [...filters.amenities, amenity]
    updateFilter("amenities", newAmenities)
  }

  const handlePriceRangeChange = (values: number[]) => {
    setPriceRange(values)
    updateFilter("minPrice", values[0])
    updateFilter("maxPrice", values[1])
  }

  const handleAiSearch = () => {
    if (!filters.aiSearch?.trim()) return

    // Mock AI search logic - in real app, this would call an AI service
    const searchTerm = filters.aiSearch.toLowerCase()
    const aiFilters = { ...filters }

    // Simple keyword matching for demo
    if (searchTerm.includes("cheap") || searchTerm.includes("affordable")) {
      aiFilters.maxPrice = 30000
    }
    if (searchTerm.includes("luxury") || searchTerm.includes("expensive")) {
      aiFilters.minPrice = 50000
    }
    if (searchTerm.includes("family")) {
      aiFilters.bedrooms = "3"
      aiFilters.amenities = [...aiFilters.amenities, "Garden", "Security"]
    }
    if (searchTerm.includes("studio") || searchTerm.includes("single")) {
      aiFilters.propertyType = "studio"
    }
    if (searchTerm.includes("westlands")) {
      aiFilters.location = "Westlands, Nairobi"
    }

    onFiltersChange(aiFilters)
  }

  const clearFilters = () => {
    setPriceRange([0, 200000])
    onFiltersChange({
      search: "",
      location: "",
      minPrice: 0,
      maxPrice: 200000,
      propertyType: "",
      bedrooms: "",
      amenities: [],
      aiSearch: "",
    })
  }

  const hasActiveFilters =
    filters.search ||
    filters.location ||
    filters.minPrice > 0 ||
    filters.maxPrice < 200000 ||
    filters.propertyType ||
    filters.bedrooms ||
    filters.amenities.length > 0

  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search Properties
          </CardTitle>
          <div className="flex items-center gap-2">
            {hasActiveFilters && (
              <Button variant="outline" size="sm" onClick={clearFilters} className="bg-transparent">
                <X className="h-4 w-4 mr-1" />
                Clear
              </Button>
            )}
            <Collapsible open={isOpen} onOpenChange={setIsOpen}>
              <CollapsibleTrigger asChild>
                <Button variant="outline" size="sm" className="bg-transparent">
                  <Filter className="h-4 w-4 mr-1" />
                  Filters
                </Button>
              </CollapsibleTrigger>
            </Collapsible>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            AI Smart Search
          </Label>
          <div className="flex gap-2">
            <Input
              placeholder="Try: 'Affordable family home in Westlands with parking'"
              value={filters.aiSearch || ""}
              onChange={(e) => updateFilter("aiSearch", e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleAiSearch} disabled={!filters.aiSearch?.trim()}>
              <Sparkles className="h-4 w-4 mr-1" />
              Search
            </Button>
          </div>
        </div>

        {/* Regular Search Bar */}
        <div className="flex gap-2">
          <div className="flex-1">
            <Input
              placeholder="Search by title, location, or description..."
              value={filters.search}
              onChange={(e) => updateFilter("search", e.target.value)}
              className="w-full"
            />
          </div>
        </div>

        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleContent className="space-y-4">
            {/* Location and Property Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Location</Label>
                <Select value={filters.location} onValueChange={(value) => updateFilter("location", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((location) => (
                      <SelectItem key={location} value={location === "All Locations" ? "all_locations" : location}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Property Type</Label>
                <Select value={filters.propertyType} onValueChange={(value) => updateFilter("propertyType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any_type">Any Type</SelectItem>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="house">House</SelectItem>
                    <SelectItem value="studio">Studio</SelectItem>
                    <SelectItem value="bedsitter">Bedsitter</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-3">
                <Label>Budget Range</Label>
                <div className="px-2">
                  <Slider
                    value={priceRange}
                    onValueChange={handlePriceRangeChange}
                    max={200000}
                    min={0}
                    step={5000}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground mt-2">
                    <span>{formatPrice(priceRange[0])}</span>
                    <span>{formatPrice(priceRange[1])}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>House Size</Label>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                  {houseSizeOptions.map((option) => (
                    <Button
                      key={option.value}
                      variant={filters.bedrooms === option.value ? "default" : "outline"}
                      size="sm"
                      onClick={() => updateFilter("bedrooms", option.value === "any" ? "" : option.value)}
                      className="text-xs"
                    >
                      {option.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div className="space-y-3">
              <Label>Amenities</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {amenities.map((amenity) => (
                  <div key={amenity} onClick={() => toggleAmenity(amenity)} className="cursor-pointer">
                    <Badge
                      variant={filters.amenities.includes(amenity) ? "default" : "outline"}
                      className="w-full justify-center py-2"
                    >
                      {amenity}
                      {filters.amenities.includes(amenity) && <X className="h-3 w-3 ml-1" />}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  )
}
