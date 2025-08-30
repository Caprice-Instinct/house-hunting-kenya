export interface Property {
  id: string
  title: string
  description: string
  price: number
  location: string
  bedrooms: number
  bathrooms: number
  area: number // in square meters
  type: "apartment" | "house" | "studio" | "bedsitter"
  amenities: string[]
  images: string[]
  landlordId: string
  isAvailable: boolean
  serviceChargeInclusive: boolean
  serviceChargeAmount?: number
  reviews: PropertyReview[]
  tenantFriendlinessScore: number // 1-5 scale
  createdAt: Date
  updatedAt: Date
}

export interface User {
  id: string
  email: string
  name: string
  role: "landlord" | "tenant"
  phone?: string
}

export interface PropertyReview {
  id: string
  tenantId: string
  tenantName: string
  houseCondition: number // 1-5 scale
  landlordRating: number // 1-5 scale
  neighborhoodRating: number // 1-5 scale
  overallRating: number // calculated average
  comment: string
  createdAt: Date
}

// Dummy users data
export const dummyUsers: User[] = [
  {
    id: "1",
    email: "john.landlord@example.com",
    name: "John Mwangi",
    role: "landlord",
    phone: "+254712345678",
  },
  {
    id: "2",
    email: "mary.tenant@example.com",
    name: "Mary Wanjiku",
    role: "tenant",
    phone: "+254723456789",
  },
  {
    id: "3",
    email: "peter.landlord@example.com",
    name: "Peter Kiprotich",
    role: "landlord",
    phone: "+254734567890",
  },
  {
    id: "4",
    email: "grace.tenant@example.com",
    name: "Grace Akinyi",
    role: "tenant",
    phone: "+254745678901",
  },
]

// Dummy properties data
export const dummyProperties: Property[] = [
  {
    id: "1",
    title: "Modern 2BR Apartment in Westlands",
    description:
      "Beautiful modern apartment with great city views, fully furnished with modern amenities. Perfect for professionals working in the CBD.",
    price: 45000,
    location: "Westlands, Nairobi",
    bedrooms: 2,
    bathrooms: 2,
    area: 85,
    type: "apartment",
    amenities: ["Parking", "Security", "Gym", "Swimming Pool", "Backup Generator"],
    images: ["/modern-apartment-westlands-nairobi.png"],
    landlordId: "1",
    isAvailable: true,
    serviceChargeInclusive: true,
    serviceChargeAmount: 5000,
    tenantFriendlinessScore: 4.2,
    reviews: [
      {
        id: "r1",
        tenantId: "2",
        tenantName: "Mary W.",
        houseCondition: 4,
        landlordRating: 5,
        neighborhoodRating: 4,
        overallRating: 4.3,
        comment: "Great apartment with responsive landlord. The gym facilities are excellent!",
        createdAt: new Date("2024-01-20"),
      },
      {
        id: "r2",
        tenantId: "4",
        tenantName: "Grace A.",
        houseCondition: 4,
        landlordRating: 4,
        neighborhoodRating: 4,
        overallRating: 4.0,
        comment: "Modern finishes and great location. Parking can be tight during peak hours.",
        createdAt: new Date("2024-01-25"),
      },
    ],
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    title: "Spacious 3BR House in Karen",
    description:
      "Family-friendly house with a large garden, perfect for families. Quiet neighborhood with excellent schools nearby.",
    price: 75000,
    location: "Karen, Nairobi",
    bedrooms: 3,
    bathrooms: 3,
    area: 150,
    type: "house",
    amenities: ["Garden", "Parking", "Security", "Backup Water", "DSQ"],
    images: ["/spacious-house-karen-nairobi-garden.png"],
    landlordId: "1",
    isAvailable: true,
    serviceChargeInclusive: false,
    serviceChargeAmount: 8000,
    tenantFriendlinessScore: 4.8,
    reviews: [
      {
        id: "r3",
        tenantId: "4",
        tenantName: "Grace A.",
        houseCondition: 5,
        landlordRating: 5,
        neighborhoodRating: 5,
        overallRating: 5.0,
        comment: "Perfect family home! The garden is amazing and the neighborhood is very safe.",
        createdAt: new Date("2024-01-18"),
      },
    ],
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-10"),
  },
  {
    id: "3",
    title: "Cozy Studio in Kilimani",
    description:
      "Perfect for young professionals, fully furnished studio apartment in the heart of Kilimani with easy access to restaurants and nightlife.",
    price: 25000,
    location: "Kilimani, Nairobi",
    bedrooms: 1,
    bathrooms: 1,
    area: 35,
    type: "studio",
    amenities: ["Furnished", "Security", "Parking", "Internet"],
    images: ["/cozy-studio-apartment-kilimani-nairobi.png"],
    landlordId: "3",
    isAvailable: true,
    serviceChargeInclusive: true,
    serviceChargeAmount: 2500,
    tenantFriendlinessScore: 3.8,
    reviews: [
      {
        id: "r4",
        tenantId: "2",
        tenantName: "Mary W.",
        houseCondition: 3,
        landlordRating: 4,
        neighborhoodRating: 4,
        overallRating: 3.7,
        comment: "Good location but the space is quite small. Furniture could use some updating.",
        createdAt: new Date("2024-01-22"),
      },
    ],
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-01-20"),
  },
  {
    id: "4",
    title: "Affordable Bedsitter in Kasarani",
    description:
      "Budget-friendly bedsitter perfect for students and young professionals. Close to public transport and shopping centers.",
    price: 12000,
    location: "Kasarani, Nairobi",
    bedrooms: 1,
    bathrooms: 1,
    area: 25,
    type: "bedsitter",
    amenities: ["Security", "Water", "Parking"],
    images: ["/affordable-bedsitter-kasarani-nairobi.png"],
    landlordId: "3",
    isAvailable: false,
    serviceChargeInclusive: false,
    serviceChargeAmount: 1500,
    tenantFriendlinessScore: 4.0,
    reviews: [
      {
        id: "r5",
        tenantId: "2",
        tenantName: "Mary W.",
        houseCondition: 4,
        landlordRating: 4,
        neighborhoodRating: 4,
        overallRating: 4.0,
        comment: "Great value for money. The landlord is very understanding and helpful.",
        createdAt: new Date("2024-01-15"),
      },
    ],
    createdAt: new Date("2024-01-05"),
    updatedAt: new Date("2024-01-25"),
  },
]

export const getPropertiesByLandlord = (landlordId: string): Property[] => {
  return dummyProperties.filter((property) => property.landlordId === landlordId)
}

export const addProperty = (property: Omit<Property, "id" | "createdAt" | "updatedAt">): Property => {
  const newProperty: Property = {
    ...property,
    id: (dummyProperties.length + 1).toString(),
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  dummyProperties.push(newProperty)
  return newProperty
}

export const updateProperty = (id: string, updates: Partial<Property>): Property | null => {
  const index = dummyProperties.findIndex((p) => p.id === id)
  if (index === -1) return null

  dummyProperties[index] = {
    ...dummyProperties[index],
    ...updates,
    updatedAt: new Date(),
  }
  return dummyProperties[index]
}

export const deleteProperty = (id: string): boolean => {
  const index = dummyProperties.findIndex((p) => p.id === id)
  if (index === -1) return false

  dummyProperties.splice(index, 1)
  return true
}

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    minimumFractionDigits: 0,
  }).format(price)
}
