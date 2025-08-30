export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export interface PropertyFilters {
  location?: string
  minPrice?: number
  maxPrice?: number
  propertyType?: string
  bedrooms?: number
  amenities?: string[]
}

export interface ChatbotProps {
  onFiltersUpdate?: (filters: PropertyFilters) => void
}