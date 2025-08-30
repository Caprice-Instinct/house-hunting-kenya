export interface User {
  id: string
  email: string
  name: string
  role: "landlord" | "tenant"
  phone?: string
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

export const authenticateUser = (email: string, password: string): User | null => {
  // Simple authentication - in real app, this would check hashed passwords
  const user = dummyUsers.find((u) => u.email === email)
  if (user && password === "password123") {
    return user
  }
  return null
}

export const registerUser = (
  email: string,
  password: string,
  name: string,
  role: "landlord" | "tenant",
  phone?: string,
): User => {
  const newUser: User = {
    id: (dummyUsers.length + 1).toString(),
    email,
    name,
    role,
    phone,
  }
  dummyUsers.push(newUser)
  return newUser
}
