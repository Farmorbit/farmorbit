"use client"

import { useSupabase } from "@/components/supabase-provider"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, MapPin, Phone, Mail, ArrowLeft, MessageCircle, Star, Download } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Mock data for booking details
const bookingDetails = {
  id: 2,
  equipment: {
    id: 4,
    name: "Irrigation System",
    image: "/placeholder.svg?height=300&width=500",
    category: "Irrigation",
  },
  owner: {
    name: "Sarah Williams",
    email: "sarah@example.com",
    phone: "(123) 456-7890",
    avatar: "/placeholder.svg?height=50&width=50",
    rating: 4.8,
    responseTime: "Within 2 hours",
  },
  startDate: "2023-07-10",
  endDate: "2023-07-17",
  totalPrice: 595,
  status: "upcoming",
  location: "Eugene, OR",
  deliveryOption: "Self Pickup",
  paymentMethod: "Visa ending in 4242",
  bookingDate: "2023-06-25",
  bookingId: "BO-7890",
  specialRequests: "Please include the basic setup instructions.",
  cancellationPolicy: "Free cancellation up to 48 hours before pickup",
}

export default function BookingDetailsPage({ params }: { params: { id: string } }) {
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

  const isUpcoming = bookingDetails.status === "upcoming"

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="mb-8">
        <Link href="/dashboard/bookings" className="flex items-center text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to bookings
        </Link>

        <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{bookingDetails.equipment.name}</h1>
            <p className="mt-1 text-muted-foreground">Booking ID: {bookingDetails.bookingId}</p>
          </div>
          <Badge className={isUpcoming ? "bg-blue-600" : "bg-green-600"} className="mt-2 sm:mt-0">
            {isUpcoming ? "Upcoming" : "Completed"}
          </Badge>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2 space-y-8">
          {/* Equipment Details */}
          <Card>
            <CardHeader>
              <CardTitle>Equipment Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative h-[200px] sm:h-[300px] w-full overflow-hidden rounded-lg">
                <Image
                  src={bookingDetails.equipment.image || "/placeholder.svg"}
                  alt={bookingDetails.equipment.name}
                  fill
                  className="object-cover"
                />
                <Badge className="absolute top-2 right-2 bg-green-600">{bookingDetails.equipment.category}</Badge>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Rental Period</h3>
                  <div className="mt-1 flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-green-600" />
                    <span>
                      {new Date(bookingDetails.startDate).toLocaleDateString()} -{" "}
                      {new Date(bookingDetails.endDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Pickup/Delivery</h3>
                  <div className="mt-1 flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-green-600" />
                    <span>{bookingDetails.deliveryOption}</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Location</h3>
                  <p className="mt-1">{bookingDetails.location}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Booking Date</h3>
                  <p className="mt-1">{new Date(bookingDetails.bookingDate).toLocaleDateString()}</p>
                </div>
              </div>

              {bookingDetails.specialRequests && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Special Requests</h3>
                  <p className="mt-1 rounded-md bg-muted p-3">{bookingDetails.specialRequests}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Owner Information */}
          <Card>
            <CardHeader>
              <CardTitle>Equipment Owner</CardTitle>
              <CardDescription>Contact the owner if you have any questions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={bookingDetails.owner.avatar} alt={bookingDetails.owner.name} />
                  <AvatarFallback>
                    {bookingDetails.owner.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{bookingDetails.owner.name}</h3>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                    <span>{bookingDetails.owner.rating} rating</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Response time: {bookingDetails.owner.responseTime}
                  </p>
                </div>
              </div>

              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>{bookingDetails.owner.phone}</span>
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>{bookingDetails.owner.email}</span>
                </Button>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-green-600 hover:bg-green-700">
                <MessageCircle className="mr-2 h-4 w-4" />
                Message Owner
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="space-y-8">
          {/* Booking Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Booking Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Equipment Rental</span>
                  <span>${bookingDetails.totalPrice - 75}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Insurance Fee</span>
                  <span>$25</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Service Fee</span>
                  <span>$50</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${bookingDetails.totalPrice}</span>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Payment Method</h3>
                <p className="mt-1">{bookingDetails.paymentMethod}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Cancellation Policy</h3>
                <p className="mt-1 text-sm">{bookingDetails.cancellationPolicy}</p>
              </div>
            </CardContent>
            <CardFooter className="flex-col space-y-2">
              <Button className="w-full" variant="outline" asChild>
                <Link href="#">
                  <Download className="mr-2 h-4 w-4" />
                  Download Invoice
                </Link>
              </Button>
              {isUpcoming && (
                <Button variant="destructive" className="w-full">
                  Cancel Booking
                </Button>
              )}
            </CardFooter>
          </Card>

          {/* Actions */}
          {isUpcoming && (
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full bg-green-600 hover:bg-green-700" asChild>
                  <Link href={`/equipment/${bookingDetails.equipment.id}`}>View Equipment Details</Link>
                </Button>
                <Button variant="outline" className="w-full">
                  Modify Booking
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

