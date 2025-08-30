"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { MapPin, Bed, Bath, Square, Calendar, Heart, Phone, Mail } from "lucide-react"
import type { Property } from "@/lib/properties"
import { formatPrice, dummyUsers } from "@/lib/properties"
import Image from "next/image"

interface PropertyDetailModalProps {
  property: Property | null
  isOpen: boolean
  onClose: () => void
  onToggleFavorite?: (propertyId: string) => void
  isFavorite?: boolean
}

export function PropertyDetailModal({
  property,
  isOpen,
  onClose,
  onToggleFavorite,
  isFavorite,
}: PropertyDetailModalProps) {
  if (!property) return null

  const landlord = dummyUsers.find((user) => user.id === property.landlordId)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{property.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Property Image */}
          <div className="relative h-64 md:h-80 rounded-lg overflow-hidden">
            <Image
              src={property.images[0] || "/placeholder.svg?height=400&width=600&query=property"}
              alt={property.title}
              fill
              className="object-cover"
            />
            <div className="absolute top-4 left-4">
              <Badge variant="secondary" className="bg-background/90 text-foreground">
                {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
              </Badge>
            </div>
          </div>

          {/* Price and Actions */}
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-primary">{formatPrice(property.price)}</div>
              <div className="text-muted-foreground">per month</div>
            </div>
            <div className="flex gap-2">
              {onToggleFavorite && (
                <Button variant="outline" onClick={() => onToggleFavorite(property.id)} className="bg-transparent">
                  <Heart className={`h-4 w-4 mr-2 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                  {isFavorite ? "Saved" : "Save"}
                </Button>
              )}
              <Button>Contact Landlord</Button>
            </div>
          </div>

          {/* Property Details */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2">
              <Bed className="h-5 w-5 text-muted-foreground" />
              <div>
                <div className="font-medium">{property.bedrooms}</div>
                <div className="text-sm text-muted-foreground">Bedroom{property.bedrooms !== 1 ? "s" : ""}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Bath className="h-5 w-5 text-muted-foreground" />
              <div>
                <div className="font-medium">{property.bathrooms}</div>
                <div className="text-sm text-muted-foreground">Bathroom{property.bathrooms !== 1 ? "s" : ""}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Square className="h-5 w-5 text-muted-foreground" />
              <div>
                <div className="font-medium">{property.area}m²</div>
                <div className="text-sm text-muted-foreground">Area</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div>
                <div className="font-medium">Available</div>
                <div className="text-sm text-muted-foreground">Now</div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Location */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Location</h3>
            <div className="flex items-center text-muted-foreground">
              <MapPin className="h-4 w-4 mr-2" />
              {property.location}
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-muted-foreground leading-relaxed">{property.description}</p>
          </div>

          {/* Amenities */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Amenities</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {property.amenities.map((amenity) => (
                <Badge key={amenity} variant="outline" className="justify-start">
                  {amenity}
                </Badge>
              ))}
            </div>
          </div>

          {/* Landlord Info */}
          {landlord && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Contact Information</h3>
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{landlord.name}</div>
                    <div className="text-sm text-muted-foreground">Property Owner</div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="bg-transparent">
                      <Phone className="h-4 w-4 mr-1" />
                      Call
                    </Button>
                    <Button size="sm" variant="outline" className="bg-transparent">
                      <Mail className="h-4 w-4 mr-1" />
                      Email
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
