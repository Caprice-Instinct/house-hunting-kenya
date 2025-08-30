"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { PropertyCard } from "@/components/dashboard/property-card"
import { AddPropertyForm } from "@/components/dashboard/add-property-form"
import { LandlordHeader } from "@/components/dashboard/landlord-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { Plus, Building, Eye, TrendingUp } from "lucide-react"
import type { Property } from "@/lib/properties"
import { getPropertiesByLandlord, deleteProperty, formatPrice } from "@/lib/properties"

export default function LandlordDashboard() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [properties, setProperties] = useState<Property[]>([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingProperty, setEditingProperty] = useState<Property | null>(null)
  const [viewingProperty, setViewingProperty] = useState<Property | null>(null)
  const [deletingPropertyId, setDeletingPropertyId] = useState<string | null>(null)

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "landlord")) {
      router.push("/login")
      return
    }
    if (user) {
      setProperties(getPropertiesByLandlord(user.id))
    }
  }, [user, isLoading, router])

  const handleAddProperty = () => {
    setShowAddForm(true)
    setEditingProperty(null)
  }

  const handleEditProperty = (property: Property) => {
    setEditingProperty(property)
    setShowAddForm(true)
  }

  const handleDeleteProperty = (id: string) => {
    setDeletingPropertyId(id)
  }

  const confirmDelete = () => {
    if (deletingPropertyId) {
      deleteProperty(deletingPropertyId)
      setProperties((prev) => prev.filter((p) => p.id !== deletingPropertyId))
      setDeletingPropertyId(null)
    }
  }

  const handleFormSuccess = () => {
    setShowAddForm(false)
    setEditingProperty(null)
    if (user) {
      setProperties(getPropertiesByLandlord(user.id))
    }
  }

  const availableProperties = properties.filter((p) => p.isAvailable)
  const rentedProperties = properties.filter((p) => !p.isAvailable)
  const totalRevenue = rentedProperties.reduce((sum, p) => sum + p.price, 0)

  if (isLoading) {
    return <div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>
  }

  if (!user || user.role !== "landlord") {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <LandlordHeader onAddProperty={handleAddProperty} />

      <main className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{properties.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{availableProperties.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rented</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{rentedProperties.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{formatPrice(totalRevenue)}</div>
            </CardContent>
          </Card>
        </div>

        {/* Properties Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold">My Properties</h2>
            <Button onClick={handleAddProperty} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Property
            </Button>
          </div>

          {properties.length === 0 ? (
            <Card className="text-center py-12">
              <CardHeader>
                <CardTitle>No Properties Listed</CardTitle>
                <CardDescription>Start by adding your first property to attract tenants.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={handleAddProperty} className="flex items-center gap-2 mx-auto">
                  <Plus className="h-4 w-4" />
                  Add Your First Property
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  onEdit={handleEditProperty}
                  onDelete={handleDeleteProperty}
                  onView={setViewingProperty}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Add/Edit Property Dialog */}
      <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingProperty ? "Edit Property" : "Add New Property"}</DialogTitle>
          </DialogHeader>
          <AddPropertyForm
            property={editingProperty || undefined}
            onSuccess={handleFormSuccess}
            onCancel={() => setShowAddForm(false)}
          />
        </DialogContent>
      </Dialog>

      {/* View Property Dialog */}
      <Dialog open={!!viewingProperty} onOpenChange={() => setViewingProperty(null)}>
        <DialogContent className="max-w-2xl">
          {viewingProperty && (
            <div className="space-y-4">
              <DialogHeader>
                <DialogTitle>{viewingProperty.title}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <img
                  src={viewingProperty.images[0] || "/placeholder.svg"}
                  alt={viewingProperty.title}
                  className="w-full h-64 object-cover rounded-lg"
                />
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong>Location:</strong> {viewingProperty.location}
                  </div>
                  <div>
                    <strong>Price:</strong> {formatPrice(viewingProperty.price)}/month
                  </div>
                  <div>
                    <strong>Bedrooms:</strong> {viewingProperty.bedrooms}
                  </div>
                  <div>
                    <strong>Bathrooms:</strong> {viewingProperty.bathrooms}
                  </div>
                  <div>
                    <strong>Area:</strong> {viewingProperty.area}m²
                  </div>
                  <div>
                    <strong>Type:</strong> {viewingProperty.type}
                  </div>
                </div>
                <div>
                  <strong>Description:</strong>
                  <p className="mt-1 text-muted-foreground">{viewingProperty.description}</p>
                </div>
                <div>
                  <strong>Amenities:</strong>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {viewingProperty.amenities.map((amenity) => (
                      <Badge key={amenity} variant="outline">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <strong>Status:</strong>
                  <Badge variant={viewingProperty.isAvailable ? "default" : "secondary"}>
                    {viewingProperty.isAvailable ? "Available" : "Rented"}
                  </Badge>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deletingPropertyId} onOpenChange={() => setDeletingPropertyId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Property</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this property? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
