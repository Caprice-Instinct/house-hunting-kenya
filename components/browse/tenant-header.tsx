"use client"

import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import { Home, LogOut, Heart, User } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export function TenantHeader() {
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <header className="border-b border-border bg-background sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/dashboard/tenant" className="flex items-center space-x-2">
            <Home className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-primary">Keja Hunter</h1>
          </Link>
          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              <span className="text-muted-foreground">Welcome, {user?.name}</span>
            </div>
            <Button variant="ghost" size="sm" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              <span className="hidden sm:inline">Saved</span>
            </Button>
            <Link href="/profile">
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Profile</span>
              </Button>
            </Link>
            <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2 bg-transparent">
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
