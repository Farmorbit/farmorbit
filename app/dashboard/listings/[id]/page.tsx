"use client"

import { useSupabase } from "@/components/supabase-provider"
import { useRouter } from "next/navigation"
import { useEffect, useState, use } from "react";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, CalendarIcon, DollarSign, Eye, MapPin, Pencil, Star, Trash2, Users } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Mock data for listing details
const listingDetails = {
  id: 1,
  name: "Kubota L3901 Compact Tractor",
  description:
    "Compact utility tractor with 37.5 HP diesel engine, perfect for small to medium-sized farms. Features a comfortable operator station and versatile hydraulic system.",
  price: {
    daily: 120,
    weekly: 700,
    monthly: 2400,
  },
  location: "Seattle, WA",
  images: [
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
  ],
  status: "active",
  category: "Tractors",
  specifications: [
    { name: "Horsepower", value: "37.5 HP" },
    { name: "Engine", value: "Kubota diesel engine" },
    { name: "Transmission", value: "HST Plus (3-range)" },
    { name: "PTO", value: "540 RPM" },
    { name: "Weight", value: "3,175 lbs" },
  ],
  features: [
    "Hydrostatic transmission",
    "4WD capability",
    "Comfortable operator station",
    "Versatile hydraulic system",
    "Fuel efficient engine",
  ],
  bookings: [
    {
      id: 1,
      renter: "John Smith",
      startDate: "2023-05-10",
      endDate: "2023-05-13",
      totalPrice: 360,
      status: "completed",
    },
    {
      id: 2,
      renter: "Emily Johnson",
      startDate: "2023-06-05",
      endDate: "2023-06-08",
      totalPrice: 360,
      status: "completed",
    },
    {
      id: 3,
      renter: "Michael Brown",
      startDate: "2023-07-20",
      endDate: "2023-07-23",
      totalPrice: 360,
      status: "upcoming",
    },
  ],
  stats: {
    totalBookings: 3,
    totalRevenue: 1080,
    totalViews: 45,
    averageRating: 4.8,
    reviewCount: 2,
  },
  createdAt: "2023-04-15",
  unavailableDates: [new Date(2023, 6, 20), new Date(2023, 6, 21), new Date(2023, 6, 22), new Date(2023, 6, 23)],
}

export default function ListingDetailsPage(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params);
  const { supabase, user } = useSupabase()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState(listingDetails.status === "active")

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

  const handleStatusChange = (checked: boolean) => {
    setStatus(checked)
    // In a real implementation, you would update the listing status in the database
  }

  const upcomingBookings = listingDetails.bookings.filter((booking) => booking.status === "upcoming")
  const completedBookings = listingDetails.bookings.filter((booking) => booking.status === "completed")

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="mb-8">
        <Link href="/dashboard/listings" className="flex items-center text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to listings
        </Link>

        <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{listingDetails.name}</h1>
            <div className="mt-1 flex items-center gap-1 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{listingDetails.location}</span>
            </div>
          </div>
          <div className="mt-4 sm:mt-0 flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">{status ? "Active" : "Inactive"}</span>
              <Switch checked={status} onCheckedChange={handleStatusChange} />
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href={`/equipment/${params.id}`}>
                <Eye className="mr-2 h-4 w-4" />
                View Public Listing
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2 space-y-8">
          {/* Listing Details */}
          <Card>
            <CardHeader>
              <CardTitle>Listing Details</CardTitle>
              <div className="flex justify-between items-center">
                <CardDescription>Created on {new Date(listingDetails.createdAt).toLocaleDateString()}</CardDescription>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/dashboard/listings/${params.id}/edit`}>
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit Listing
                    </Link>
                  </Button>
                  <Button variant="destructive" size="sm">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Image Gallery */}
              <div className="grid gap-4 sm:grid-cols-3">
                {listingDetails.images.map((image, index) => (
                  <div key={index} className="relative h-[150px] overflow-hidden rounded-lg">
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${listingDetails.name} - Image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>

              {/* Description */}
              <div>
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-muted-foreground">{listingDetails.description}</p>
              </div>

              {/* Pricing */}
              <div>
                <h3 className="font-semibold mb-2">Pricing</h3>
                <div className="grid gap-4 sm:grid-cols-3">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <p className="text-sm text-muted-foreground">Daily Rate</p>
                      <p className="text-xl font-bold">${listingDetails.price.daily}</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <p className="text-sm text-muted-foreground">Weekly Rate</p>
                      <p className="text-xl font-bold">${listingDetails.price.weekly}</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <p className="text-sm text-muted-foreground">Monthly Rate</p>
                      <p className="text-xl font-bold">${listingDetails.price.monthly}</p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Specifications & Features */}
              <Tabs defaultValue="specifications" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="specifications">Specifications</TabsTrigger>
                  <TabsTrigger value="features">Features</TabsTrigger>
                </TabsList>
                <TabsContent value="specifications" className="mt-4">
                  <ul className="grid gap-2 sm:grid-cols-2">
                    {listingDetails.specifications.map((spec, index) => (
                      <li key={index} className="flex justify-between border-b pb-2">
                        <span className="font-medium">{spec.name}</span>
                        <span className="text-muted-foreground">{spec.value}</span>
                      </li>
                    ))}
                  </ul>
                </TabsContent>
                <TabsContent value="features" className="mt-4">
                  <ul className="grid gap-2 list-disc pl-5">
                    {listingDetails.features.map((feature, index) => (
                      <li key={index} className="text-muted-foreground">
                        {feature}
                      </li>
                    ))}
                  </ul>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Bookings */}
          <Card>
            <CardHeader>
              <CardTitle>Bookings</CardTitle>
              <CardDescription>Manage your equipment rental bookings</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="upcoming" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                </TabsList>
                <TabsContent value="upcoming" className="mt-4">
                  {upcomingBookings.length > 0 ? (
                    <div className="space-y-4">
                      {upcomingBookings.map((booking) => (
                        <div key={booking.id} className="flex items-center justify-between rounded-lg border p-4">
                          <div>
                            <h3 className="font-semibold">{booking.renter}</h3>
                            <p className="text-sm text-muted-foreground">
                              {new Date(booking.startDate).toLocaleDateString()} -{" "}
                              {new Date(booking.endDate).toLocaleDateString()}
                            </p>
                            <p className="text-sm font-medium mt-1">${booking.totalPrice}</p>
                          </div>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <CalendarIcon className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="font-semibold">No upcoming bookings</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        You don't have any upcoming bookings for this equipment
                      </p>
                    </div>
                  )}
                </TabsContent>
                <TabsContent value="completed" className="mt-4">
                  {completedBookings.length > 0 ? (
                    <div className="space-y-4">
                      {completedBookings.map((booking) => (
                        <div key={booking.id} className="flex items-center justify-between rounded-lg border p-4">
                          <div>
                            <h3 className="font-semibold">{booking.renter}</h3>
                            <p className="text-sm text-muted-foreground">
                              {new Date(booking.startDate).toLocaleDateString()} -{" "}
                              {new Date(booking.endDate).toLocaleDateString()}
                            </p>
                            <p className="text-sm font-medium mt-1">${booking.totalPrice}</p>
                          </div>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <CalendarIcon className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="font-semibold">No completed bookings</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        You don't have any completed bookings for this equipment
                      </p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          {/* Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Listing Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <Users className="h-5 w-5 text-muted-foreground mx-auto mb-1" />
                    <p className="text-sm text-muted-foreground">Bookings</p>
                    <p className="text-xl font-bold">{listingDetails.stats.totalBookings}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <DollarSign className="h-5 w-5 text-muted-foreground mx-auto mb-1" />
                    <p className="text-sm text-muted-foreground">Revenue</p>
                    <p className="text-xl font-bold">${listingDetails.stats.totalRevenue}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <Eye className="h-5 w-5 text-muted-foreground mx-auto mb-1" />
                    <p className="text-sm text-muted-foreground">Views</p>
                    <p className="text-xl font-bold">{listingDetails.stats.totalViews}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <Star className="h-5 w-5 text-muted-foreground mx-auto mb-1" />
                    <p className="text-sm text-muted-foreground">Rating</p>
                    <p className="text-xl font-bold">{listingDetails.stats.averageRating}</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* Availability Calendar */}
          <Card>
            <CardHeader>
              <CardTitle>Availability</CardTitle>
              <CardDescription>Manage when your equipment is available for rent</CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar mode="multiple" selected={listingDetails.unavailableDates} className="w-full" />
              <p className="mt-2 text-xs text-muted-foreground text-center">
                Selected dates indicate when the equipment is NOT available
              </p>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-green-600 hover:bg-green-700">Update Availability</Button>
            </CardFooter>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full" variant="outline" asChild>
                <Link href={`/dashboard/listings/${params.id}/edit`}>Edit Listing</Link>
              </Button>
              <Button className="w-full" variant="outline">
                Promote Listing
              </Button>
              <Button className="w-full" variant="outline">
                Download Analytics
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

