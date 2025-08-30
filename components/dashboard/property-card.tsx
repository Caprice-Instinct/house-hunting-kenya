"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Edit, Trash2, Eye, MapPin, Bed, Bath, Square } from "lucide-react"
import type { Property } from "@/lib/properties"
import { formatPrice } from "@/lib/properties"
import Image from "next/image"

interface PropertyCardProps {
  property: Property
  onEdit: (property: Property) => void
  onDelete: (id: string) => void
  onView: (property: Property) => void
}

export function PropertyCard({ property, onEdit, onDelete, onView }: PropertyCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48">
        <Image
          src={property.images[0] || "/placeholder.svg?height=200&width=300&query=property"}
          alt={property.title}
          fill
          className="object-cover"
        />
        <div className="absolute top-2 right-2">
          <Badge variant={property.isAvailable ? "default" : "secondary"}>
            {property.isAvailable ? "Available" : "Rented"}
          </Badge>
        </div>
      </div>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg line-clamp-2">{property.title}</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onView(property)}>
                <Eye className="h-4 w-4 mr-2" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onEdit(property)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Property
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDelete(property.id)} className="text-destructive">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Property
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          <div className="flex items-center text-muted-foreground text-sm">
            <MapPin className="h-4 w-4 mr-1" />
            {property.location}
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Bed className="h-4 w-4 mr-1" />
              {property.bedrooms} bed{property.bedrooms !== 1 ? "s" : ""}
            </div>
            <div className="flex items-center">
              <Bath className="h-4 w-4 mr-1" />
              {property.bathrooms} bath{property.bathrooms !== 1 ? "s" : ""}
            </div>
            <div className="flex items-center">
              <Square className="h-4 w-4 mr-1" />
              {property.area}m²
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-primary">{formatPrice(property.price)}</div>
            <div className="text-sm text-muted-foreground">per month</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
