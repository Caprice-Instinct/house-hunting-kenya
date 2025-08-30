import { PropertyFilters } from '../types'

export class OpenAIService {
  private apiKey: string
  private baseURL = 'https://api.openai.com/v1'

  constructor(apiKey?: string) {
    this.apiKey = apiKey || ''
  }

  async getChatResponse(message: string, context?: any): Promise<{ response: string; filters?: PropertyFilters }> {
    // Extract filters first
    const filters = this.extractFilters(message)
    
    try {
      const systemPrompt = `You are a helpful AI assistant for a house hunting platform in Kenya. 
      Help users filter and find rental properties based on their preferences. 
      When users mention specific criteria like location, price range, number of bedrooms, or amenities, 
      extract these as structured filters.
      
      Available locations: Karen, Westlands, Kilimani, Kasarani, Nairobi, Mombasa, Kisumu, Nakuru, Eldoret
      Property types: Apartment, House, Bedsitter, Studio
      Common amenities: Parking, Swimming Pool, Gym, Security, Garden, Balcony, WiFi
      
      Always be helpful and conversational. If you identify filter criteria, respond with both 
      a conversational message and the extracted filters.`

      const response = await fetch(`${this.baseURL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: message }
          ],
          max_tokens: 500,
          temperature: 0.7,
        }),
      })

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.statusText}`)
      }

      const data = await response.json()
      const aiResponse = data.choices[0]?.message?.content || 'Sorry, I could not process your request.'

      return {
        response: aiResponse,
        filters: Object.keys(filters).length > 0 ? filters : undefined
      }
    } catch (error) {
      console.error('OpenAI API error:', error)
      // Fallback response when API is not available
      const fallbackResponse = this.getFallbackResponse(message, filters)
      return {
        response: fallbackResponse,
        filters: Object.keys(filters).length > 0 ? filters : undefined
      }
    }
  }

  private getFallbackResponse(message: string, filters: PropertyFilters): string {
    const lowerMessage = message.toLowerCase()
    
    if (Object.keys(filters).length > 0) {
      let response = "Great! I've updated your search filters based on your request. "
      
      if (filters.location) {
        response += `Looking for properties in ${filters.location}. `
      }
      if (filters.minPrice || filters.maxPrice) {
        const priceRange = filters.minPrice && filters.maxPrice 
          ? `between KSh ${filters.minPrice.toLocaleString()} and KSh ${filters.maxPrice.toLocaleString()}`
          : filters.minPrice 
          ? `above KSh ${filters.minPrice.toLocaleString()}`
          : `under KSh ${filters.maxPrice?.toLocaleString()}`
        response += `Price range: ${priceRange}. `
      }
      if (filters.bedrooms) {
        response += `${filters.bedrooms} bedroom${filters.bedrooms > 1 ? 's' : ''}. `
      }
      if (filters.propertyType) {
        response += `Looking for ${filters.propertyType}${filters.propertyType === 'studio' ? 's' : filters.propertyType === 'house' ? 's' : 's'}. `
      }
      if (filters.amenities && filters.amenities.length > 0) {
        response += `With amenities: ${filters.amenities.join(', ')}. `
      }
      
      response += "The property list will update automatically with matching properties!"
      return response
    }
    
    // Generic helpful responses
    if (lowerMessage.includes('help') || lowerMessage.includes('how')) {
      return "I can help you find the perfect rental property! Try asking me about specific locations like 'Show me apartments in Nairobi', price ranges like 'under 50k', or amenities like 'with parking and security'."
    }
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return "Hello! I'm here to help you find rental properties in Kenya. What kind of place are you looking for?"
    }
    
    return "I understand you're looking for rental properties. Try being more specific about location, price range, number of bedrooms, or amenities you'd like. For example: 'Show me 2-bedroom apartments in Nairobi under 60k with parking'."
  }

  private extractFilters(message: string): PropertyFilters {
    const filters: PropertyFilters = {}
    const lowerMessage = message.toLowerCase()

    // Extract bedrooms - look for patterns like "2 bedroom", "3 bed", "two bedroom"
    const bedroomPatterns = [
      /(\d+)\s*(?:bed|bedroom|br)/i,
      /(?:one|1)\s*(?:bed|bedroom)/i,
      /(?:two|2)\s*(?:bed|bedroom)/i,
      /(?:three|3)\s*(?:bed|bedroom)/i,
      /(?:four|4)\s*(?:bed|bedroom)/i,
      /(?:five|5)\s*(?:bed|bedroom)/i
    ]
    
    for (const pattern of bedroomPatterns) {
      const match = lowerMessage.match(pattern)
      if (match) {
        let bedrooms = 1
        if (match[1]) {
          bedrooms = parseInt(match[1])
        } else if (lowerMessage.includes('two') || lowerMessage.includes('2')) {
          bedrooms = 2
        } else if (lowerMessage.includes('three') || lowerMessage.includes('3')) {
          bedrooms = 3
        } else if (lowerMessage.includes('four') || lowerMessage.includes('4')) {
          bedrooms = 4
        } else if (lowerMessage.includes('five') || lowerMessage.includes('5')) {
          bedrooms = 5
        }
        filters.bedrooms = bedrooms
        break
      }
    }

    // Extract location - look for "in [location]" patterns
    const locationMap = {
      'karen': 'Karen',
      'westlands': 'Westlands', 
      'kilimani': 'Kilimani',
      'kasarani': 'Kasarani',
      'nairobi': 'Nairobi',
      'mombasa': 'Mombasa',
      'kisumu': 'Kisumu',
      'nakuru': 'Nakuru',
      'eldoret': 'Eldoret'
    }
    
    for (const [key, value] of Object.entries(locationMap)) {
      if (lowerMessage.includes(key) || lowerMessage.includes(`in ${key}`) || lowerMessage.includes(`at ${key}`)) {
        filters.location = value
        break
      }
    }

    // Extract price range - look for various price patterns
    const pricePatterns = [
      /(\d+)k/g,
      /(\d+),000/g,
      /(\d+)\s*thousand/g
    ]
    
    const foundPrices: number[] = []
    for (const pattern of pricePatterns) {
      const matches = lowerMessage.match(pattern)
      if (matches) {
        for (const match of matches) {
          const num = parseInt(match.replace(/[^\d]/g, ''))
          const price = match.includes('k') || match.includes('thousand') ? num * 1000 : num
          foundPrices.push(price)
        }
      }
    }
    
    if (foundPrices.length > 0) {
      if (foundPrices.length >= 2) {
        filters.minPrice = Math.min(...foundPrices)
        filters.maxPrice = Math.max(...foundPrices)
      } else {
        if (lowerMessage.includes('under') || lowerMessage.includes('below') || lowerMessage.includes('max') || lowerMessage.includes('up to')) {
          filters.maxPrice = foundPrices[0]
        } else if (lowerMessage.includes('above') || lowerMessage.includes('over') || lowerMessage.includes('min') || lowerMessage.includes('from')) {
          filters.minPrice = foundPrices[0]
        } else {
          filters.maxPrice = foundPrices[0]
        }
      }
    }

    // Extract amenities - look for "with [amenity]" patterns
    const amenityMap = {
      'parking': ['parking', 'garage', 'car park'],
      'swimming pool': ['swimming pool', 'pool', 'swimming'],
      'gym': ['gym', 'fitness', 'exercise'],
      'security': ['security', 'guard', 'secure'],
      'garden': ['garden', 'yard', 'compound'],
      'balcony': ['balcony', 'terrace'],
      'wifi': ['wifi', 'internet', 'wi-fi']
    }
    
    const foundAmenities: string[] = []
    for (const [amenity, keywords] of Object.entries(amenityMap)) {
      for (const keyword of keywords) {
        if (lowerMessage.includes(keyword)) {
          foundAmenities.push(amenity)
          break
        }
      }
    }
    
    if (foundAmenities.length > 0) {
      filters.amenities = foundAmenities
    }

    // For property type, don't be too restrictive - only set if specifically mentioned
    // "house" in natural language often just means "place to live"
    const specificTypes = {
      'studio': ['studio apartment', 'studio'],
      'bedsitter': ['bedsitter', 'bed sitter']
    }
    
    for (const [type, keywords] of Object.entries(specificTypes)) {
      for (const keyword of keywords) {
        if (lowerMessage.includes(keyword)) {
          filters.propertyType = type
          break
        }
      }
      if (filters.propertyType) break
    }

    // Debug logging
    if (Object.keys(filters).length > 0) {
      console.log('Extracted filters from "' + message + '":', filters)
    }

    return filters
  }
}