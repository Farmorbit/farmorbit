"use client";

import { useSupabase } from "@/components/supabase-provider";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, DollarSign, Tractor } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getBookingData, getData } from "@/lib/equip";

export default function DashboardPage() {
  const { user } = useSupabase();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [recentBookings, setRecentBookings] = useState([]);
  const [myListings, setMyLisings] = useState([]);

  useEffect(() => {
    getData().then((d) =>
      setMyLisings(d.find((dd) => dd.user_id === user?.id))
    );
    getBookingData().then((d) =>
      setRecentBookings(d?.find((dd) => dd.user_id === user?.id))
    );
  }, [user]);

  // Mock data for dashboard
  // const recentBookings = [
  //   {
  //     id: 1,
  //     equipment: "John Deere 5075E Tractor",
  //     startDate: "2023-06-15",
  //     endDate: "2023-06-18",
  //     totalPrice: 450,
  //     status: "completed",
  //   },
  //   {
  //     id: 2,
  //     equipment: "Irrigation System",
  //     startDate: "2023-07-10",
  //     endDate: "2023-07-17",
  //     totalPrice: 595,
  //     status: "upcoming",
  //   },
  // ]

  // const myListings = [
  //   {
  //     id: 1,
  //     name: "Kubota L3901 Compact Tractor",
  //     price: 120,
  //     image: "/placeholder.svg?height=100&width=150",
  //     bookings: 3,
  //     revenue: 1080,
  //     status: "active",
  //   },
  //   {
  //     id: 2,
  //     name: "DJI Agras T30 Agricultural Drone",
  //     price: 200,
  //     image: "/placeholder.svg?height=100&width=150",
  //     bookings: 1,
  //     revenue: 600,
  //     status: "active",
  //   },
  // ]

  // useEffect(() => {
  //   if (!user) {
  //     router.push("/auth/login");
  //   } else {
  //     setLoading(false);
  //   }
  // }, [user, router]);

  // if (loading) {
  //   return (
  //     <div className="container flex h-screen items-center justify-center">
  //       <p>Loading...</p>
  //     </div>
  //   );
  // }

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="mt-2 text-muted-foreground">
          Welcome back, {user?.email}
        </p>
      </div>
      {/* 
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Bookings
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Active Listings
            </CardTitle>
            <Tractor className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Same as last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,680</div>
            <p className="text-xs text-muted-foreground">
              +$600 from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Response Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.5 hrs</div>
          </CardContent>
          <CardContent>
            <div className="text-2xl font-bold">1.5 hrs</div>
            <p className="text-xs text-muted-foreground">
              -0.5 hrs from last month
            </p>
          </CardContent>
        </Card>
      </div> */}

      <div className="mt-8">
        <Tabs defaultValue="bookings" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="bookings">My Bookings</TabsTrigger>
            <TabsTrigger value="listings">My Listings</TabsTrigger>
          </TabsList>
          <TabsContent value="bookings" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Bookings</CardTitle>
                <CardDescription>
                  View and manage your equipment rentals
                </CardDescription>
              </CardHeader>
              <CardContent>
                {recentBookings?.length > 0 ? (
                  <div className="space-y-4">
                    {recentBookings?.map((booking: any) => (
                      <div
                        key={booking.id}
                        className="flex items-center justify-between rounded-lg border p-4"
                      >
                        <div>
                          <h3 className="font-semibold">{booking.equipment}</h3>
                          <p className="text-sm text-muted-foreground">
                            {new Date(booking.startDate).toLocaleDateString()} -{" "}
                            {new Date(booking.endDate).toLocaleDateString()}
                          </p>
                          <p className="text-sm font-medium mt-1">
                            ${booking.totalPrice}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            className={
                              booking.status === "completed"
                                ? "bg-green-600"
                                : "bg-blue-600"
                            }
                          >
                            {booking.status === "completed"
                              ? "Completed"
                              : "Upcoming"}
                          </Badge>
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/dashboard/bookings/${booking.id}`}>
                              View
                            </Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="font-semibold">No bookings yet</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Start renting equipment to see your bookings here
                    </p>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button
                  asChild
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  <Link href="/dashboard/bookings">View All Bookings</Link>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="listings" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>My Equipment Listings</CardTitle>
                <CardDescription>
                  Manage your equipment available for rent
                </CardDescription>
              </CardHeader>
              <CardContent>
                {myListings?.length > 0 ? (
                  <div className="space-y-4">
                    {myListings?.map((listing: any) => (
                      <div
                        key={listing.id}
                        className="flex items-center gap-4 rounded-lg border p-4"
                      >
                        <div className="h-16 w-16 overflow-hidden rounded-md">
                          <Image
                            src={listing.image || "/placeholder.svg"}
                            alt={listing.name}
                            width={64}
                            height={64}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold">{listing.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            ${listing.price}/day
                          </p>
                          <div className="mt-1 flex items-center gap-4 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {listing.bookings} bookings
                            </span>
                            <span className="flex items-center gap-1">
                              <DollarSign className="h-3 w-3" />$
                              {listing.revenue} revenue
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-green-600">Active</Badge>
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/dashboard/listings/${listing.id}`}>
                              Manage
                            </Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <Tractor className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="font-semibold">No listings yet</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      List your equipment to start earning
                    </p>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button
                  asChild
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  <Link href="/list-equipment">Add New Listing</Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/dashboard/listings">View All Listings</Link>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
