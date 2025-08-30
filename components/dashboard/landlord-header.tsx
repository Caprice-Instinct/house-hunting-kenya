"use client"

import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import { Home, LogOut, Plus, User } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

interface LandlordHeaderProps {
  onAddProperty: () => void
}

export function LandlordHeader({ onAddProperty }: LandlordHeaderProps) {
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <header className="border-b border-border bg-background">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Home className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-primary">Keja Hunter</h1>
            </div>
            <div className="hidden md:block">
              <span className="text-muted-foreground">Welcome back, {user?.name}</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button onClick={onAddProperty} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Property
            </Button>
            <Link href="/profile">
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Profile</span>
              </Button>
            </Link>
            <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2 bg-transparent">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
