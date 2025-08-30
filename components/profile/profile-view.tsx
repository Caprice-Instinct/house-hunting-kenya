"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Edit, Mail, Phone, MapPin, Calendar, Building, Eye } from "lucide-react"
import type { User } from "@/lib/auth"
import { getPropertiesByLandlord, formatPrice } from "@/lib/properties"

interface ProfileViewProps {
  user: User
  onEdit: () => void
  isOwnProfile?: boolean
}

export function ProfileView({ user, onEdit, isOwnProfile = false }: ProfileViewProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const userProperties = user.role === "landlord" ? getPropertiesByLandlord(user.id) : []
  const availableProperties = userProperties.filter((p) => p.isAvailable)
  const totalRevenue = userProperties.filter((p) => !p.isAvailable).reduce((sum, p) => sum + p.price, 0)

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start space-x-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src="/abstract-profile.png" />
              <AvatarFallback className="text-xl">{getInitials(user.name)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold">{user.name}</h1>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge variant={user.role === "landlord" ? "default" : "secondary"}>
                      {user.role === "landlord" ? "Property Owner" : "Tenant"}
                    </Badge>
                    <span className="text-sm text-muted-foreground">Member since Jan 2024</span>
                  </div>
                </div>
                {isOwnProfile && (
                  <Button onClick={onEdit} variant="outline" className="bg-transparent">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                )}
              </div>
              <p className="text-muted-foreground">
                {user.role === "landlord"
                  ? "Experienced property owner committed to providing quality rental homes across Nairobi."
                  : "Looking for a comfortable and affordable place to call home in Nairobi."}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contact Information */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{user.email}</span>
              </div>
              {user.phone && (
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{user.phone}</span>
                </div>
              )}
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Nairobi, Kenya</span>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Joined January 2024</span>
              </div>
              {!isOwnProfile && (
                <>
                  <Separator />
                  <div className="space-y-2">
                    <Button className="w-full" size="sm">
                      <Mail className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent" size="sm">
                      <Phone className="h-4 w-4 mr-2" />
                      Call Now
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Statistics/Activity */}
        <div className="lg:col-span-2">
          {user.role === "landlord" ? (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Property Portfolio</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{userProperties.length}</div>
                    <div className="text-sm text-muted-foreground">Total Properties</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{availableProperties.length}</div>
                    <div className="text-sm text-muted-foreground">Available</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {userProperties.length - availableProperties.length}
                    </div>
                    <div className="text-sm text-muted-foreground">Rented</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{formatPrice(totalRevenue)}</div>
                    <div className="text-sm text-muted-foreground">Monthly Revenue</div>
                  </div>
                </div>
                {userProperties.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="font-medium">Recent Properties</h4>
                    {userProperties.slice(0, 3).map((property) => (
                      <div key={property.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div>
                          <div className="font-medium text-sm">{property.title}</div>
                          <div className="text-xs text-muted-foreground">{property.location}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-sm">{formatPrice(property.price)}</div>
                          <Badge variant={property.isAvailable ? "default" : "secondary"} className="text-xs">
                            {property.isAvailable ? "Available" : "Rented"}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">12</div>
                    <div className="text-sm text-muted-foreground">Properties Viewed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">5</div>
                    <div className="text-sm text-muted-foreground">Saved Properties</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">3</div>
                    <div className="text-sm text-muted-foreground">Inquiries Sent</div>
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="font-medium">Recent Activity</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                      <Eye className="h-4 w-4 text-muted-foreground" />
                      <div className="flex-1">
                        <div className="text-sm">Viewed Modern 2BR Apartment in Westlands</div>
                        <div className="text-xs text-muted-foreground">2 hours ago</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      <div className="flex-1">
                        <div className="text-sm">Saved Spacious 3BR House in Karen</div>
                        <div className="text-xs text-muted-foreground">1 day ago</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
