"use client"

import { useSupabase } from "@/components/supabase-provider"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, MapPin } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Mock data for bookings
const bookings = [
  {
    id: 1,
    equipment: {
      id: 1,
      name: "John Deere 5075E Tractor",
      image: "/placeholder.svg?height=100&width=150",
    },
    owner: {
      name: "Michael Johnson",
      contact: "michael@example.com",
    },
    startDate: "2023-06-15",
    endDate: "2023-06-18",
    totalPrice: 450,
    status: "completed",
    location: "Portland, OR",
  },
  {
    id: 2,
    equipment: {
      id: 4,
      name: "Irrigation System",
      image: "/placeholder.svg?height=100&width=150",
    },
    owner: {
      name: "Sarah Williams",
      contact: "sarah@example.com",
    },
    startDate: "2023-07-10",
    endDate: "2023-07-17",
    totalPrice: 595,
    status: "upcoming",
    location: "Eugene, OR",
  },
  {
    id: 3,
    equipment: {
      id: 2,
      name: "Kubota L3901 Compact Tractor",
      image: "/placeholder.svg?height=100&width=150",
    },
    owner: {
      name: "David Chen",
      contact: "david@example.com",
    },
    startDate: "2023-08-05",
    endDate: "2023-08-08",
    totalPrice: 360,
    status: "upcoming",
    location: "Seattle, WA",
  },
  {
    id: 4,
    equipment: {
      id: 5,
      name: "DJI Agras T30 Agricultural Drone",
      image: "/placeholder.svg?height=100&width=150",
    },
    owner: {
      name: "Emily Rodriguez",
      contact: "emily@example.com",
    },
    startDate: "2023-05-20",
    endDate: "2023-05-22",
    totalPrice: 400,
    status: "completed",
    location: "Sacramento, CA",
  },
]

export default function BookingsPage() {
  const { supabase, user } = useSupabase()
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      router.push("/auth/login")
    } else {
      setLoading(false)
    }
  }, [user, router])

  if (loading) {
    return (
      <div className="container flex h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    )
  }

  const upcomingBookings = bookings.filter((booking) => booking.status === "upcoming")
  const completedBookings = bookings.filter((booking) => booking.status === "completed")

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">My Bookings</h1>
        <p className="mt-2 text-muted-foreground">View and manage your equipment rentals</p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All Bookings</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="space-y-6">
            {bookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="upcoming" className="mt-6">
          {upcomingBookings.length > 0 ? (
            <div className="space-y-6">
              {upcomingBookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10 text-center">
                <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="font-semibold">No upcoming bookings</h3>
                <p className="text-sm text-muted-foreground mt-1">You don't have any upcoming equipment rentals</p>
                <Button asChild className="mt-4 bg-green-600 hover:bg-green-700">
                  <Link href="/equipment">Browse Equipment</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="completed" className="mt-6">
          {completedBookings.length > 0 ? (
            <div className="space-y-6">
              {completedBookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10 text-center">
                <Clock className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="font-semibold">No completed bookings</h3>
                <p className="text-sm text-muted-foreground mt-1">You haven't completed any equipment rentals yet</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface BookingCardProps {
  booking: (typeof bookings)[0]
}

function BookingCard({ booking }: BookingCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-4">
            <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
              <Image
                src={booking.equipment.image || "/placeholder.svg"}
                alt={booking.equipment.name}
                width={64}
                height={64}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-semibold">{booking.equipment.name}</h3>
              <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" />
                <span>{booking.location}</span>
              </div>
              <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" />
                <span>
                  {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2">
            <Badge className={booking.status === "completed" ? "bg-green-600" : "bg-blue-600"}>
              {booking.status === "completed" ? "Completed" : "Upcoming"}
            </Badge>
            <p className="font-semibold">${booking.totalPrice}</p>
            <Button variant="outline" size="sm" asChild>
              <Link href={`/dashboard/bookings/${booking.id}`}>View Details</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

