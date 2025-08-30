"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Bed, Bath, Square, Heart, Star } from "lucide-react"
import type { Property } from "@/lib/properties"
import { formatPrice } from "@/lib/properties"
import Image from "next/image"

interface PropertyBrowseCardProps {
  property: Property
  onViewDetails: (property: Property) => void
  onToggleFavorite?: (propertyId: string) => void
  isFavorite?: boolean
}

export function PropertyBrowseCard({ property, onViewDetails, onToggleFavorite, isFavorite }: PropertyBrowseCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer group">
      <div className="relative h-48" onClick={() => onViewDetails(property)}>
        <Image
          src={property.images[0] || "/placeholder.svg?height=200&width=300&query=property"}
          alt={property.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-200"
        />
        <div className="absolute top-2 left-2 flex gap-2">
          <Badge variant="secondary" className="bg-background/90 text-foreground">
            {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
          </Badge>
          <Badge variant={property.serviceChargeInclusive ? "default" : "destructive"} className="bg-background/90">
            Service: {property.serviceChargeInclusive ? "Inclusive" : "Exclusive"}
          </Badge>
        </div>
        {onToggleFavorite && (
          <div className="absolute top-2 right-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                onToggleFavorite(property.id)
              }}
              className="bg-background/90 hover:bg-background"
            >
              <Heart className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : "text-muted-foreground"}`} />
            </Button>
          </div>
        )}
      </div>
      <CardHeader className="pb-3" onClick={() => onViewDetails(property)}>
        <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
          {property.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0" onClick={() => onViewDetails(property)}>
        <div className="space-y-3">
          <div className="flex items-center text-muted-foreground text-sm">
            <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
            <span className="line-clamp-1">{property.location}</span>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Bed className="h-4 w-4 mr-1" />
              {property.bedrooms}
            </div>
            <div className="flex items-center">
              <Bath className="h-4 w-4 mr-1" />
              {property.bathrooms}
            </div>
            <div className="flex items-center">
              <Square className="h-4 w-4 mr-1" />
              {property.area}m²
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{property.tenantFriendlinessScore}</span>
              <span className="text-xs text-muted-foreground">({property.reviews.length} reviews)</span>
            </div>
            {!property.serviceChargeInclusive && property.serviceChargeAmount && (
              <div className="text-xs text-muted-foreground">+{formatPrice(property.serviceChargeAmount)} service</div>
            )}
          </div>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-primary">{formatPrice(property.price)}</div>
            <div className="text-sm text-muted-foreground">per month</div>
          </div>
          <div className="flex flex-wrap gap-1">
            {property.amenities.slice(0, 3).map((amenity) => (
              <Badge key={amenity} variant="outline" className="text-xs">
                {amenity}
              </Badge>
            ))}
            {property.amenities.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{property.amenities.length - 3} more
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
