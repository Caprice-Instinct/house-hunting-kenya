"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, User } from "lucide-react"
import type { PropertyReview } from "@/lib/properties"

interface PropertyReviewsProps {
  reviews: PropertyReview[]
  tenantFriendlinessScore: number
}

export function PropertyReviews({ reviews, tenantFriendlinessScore }: PropertyReviewsProps) {
  if (reviews.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5" />
            Tenant Reviews
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-4">No reviews yet</p>
        </CardContent>
      </Card>
    )
  }

  const averageRatings = {
    houseCondition: reviews.reduce((sum, r) => sum + r.houseCondition, 0) / reviews.length,
    landlord: reviews.reduce((sum, r) => sum + r.landlordRating, 0) / reviews.length,
    neighborhood: reviews.reduce((sum, r) => sum + r.neighborhoodRating, 0) / reviews.length,
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating)
            ? "fill-yellow-400 text-yellow-400"
            : i < rating
              ? "fill-yellow-200 text-yellow-400"
              : "text-gray-300"
        }`}
      />
    ))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="h-5 w-5" />
          Tenant Reviews
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Tenant Friendliness Score */}
        <div className="text-center p-4 bg-muted rounded-lg">
          <div className="text-3xl font-bold text-primary mb-2">{tenantFriendlinessScore}</div>
          <div className="flex justify-center mb-2">{renderStars(tenantFriendlinessScore)}</div>
          <Badge variant="secondary" className="text-sm">
            Tenant Friendliness Score
          </Badge>
        </div>

        {/* Category Ratings */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-lg font-semibold">{averageRatings.houseCondition.toFixed(1)}</div>
            <div className="flex justify-center mb-1">{renderStars(averageRatings.houseCondition)}</div>
            <div className="text-sm text-muted-foreground">House Condition</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold">{averageRatings.landlord.toFixed(1)}</div>
            <div className="flex justify-center mb-1">{renderStars(averageRatings.landlord)}</div>
            <div className="text-sm text-muted-foreground">Landlord</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold">{averageRatings.neighborhood.toFixed(1)}</div>
            <div className="flex justify-center mb-1">{renderStars(averageRatings.neighborhood)}</div>
            <div className="text-sm text-muted-foreground">Neighborhood</div>
          </div>
        </div>

        {/* Individual Reviews */}
        <div className="space-y-4">
          <h4 className="font-semibold">Recent Reviews ({reviews.length})</h4>
          {reviews.slice(0, 3).map((review) => (
            <div key={review.id} className="border rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                  <User className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium">{review.tenantName}</span>
                    <div className="flex">{renderStars(review.overallRating)}</div>
                    <span className="text-sm text-muted-foreground">{review.createdAt.toLocaleDateString()}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{review.comment}</p>
                  <div className="flex gap-4 text-xs text-muted-foreground">
                    <span>Condition: {review.houseCondition}/5</span>
                    <span>Landlord: {review.landlordRating}/5</span>
                    <span>Area: {review.neighborhoodRating}/5</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
