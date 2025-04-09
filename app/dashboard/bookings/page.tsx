"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useSupabase } from "@/components/supabase-provider";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { getBookingData } from "@/lib/equip";

export default function BookingListPage() {
  const { supabase, user } = useSupabase();
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const allBookings = await getBookingData();
      if (user) {
        const userBookings =
          allBookings?.filter((b: any) => b.user_id === user.id) || [];
        setBookings(userBookings);
      }
      setLoading(false);
    };

    fetchBookings();
  }, [user]);

  if (loading) {
    return (
      <div className="container flex h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!bookings.length) {
    return (
      <div className="container px-4 py-8 md:px-6 md:py-12">
        <Card>
          <CardContent className="text-center">
            <h1>No Bookings Found</h1>
            <p>You don’t have any bookings yet.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {bookings.map((booking) => (
          <Card key={booking.id}>
            <CardContent className="p-6">
              <div className="flex flex-col gap-4">
                <div className="flex gap-4">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
                    <Image
                      src={booking.equipment.image}
                      alt={booking.equipment.name}
                      width={96}
                      height={96}
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
                        {new Date(booking.startDate).toLocaleDateString()} -{" "}
                        {new Date(booking.endDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-start gap-2">
                  <Badge
                    className={
                      booking.status === "completed"
                        ? "bg-green-600"
                        : "bg-blue-600"
                    }
                  >
                    {booking.status === "completed" ? "Completed" : "Upcoming"}
                  </Badge>
                  <p className="font-semibold">₹{booking.totalPrice}</p>
                  <p>
                    Owner: {booking.owner.name} ({booking.owner.contact})
                  </p>
                </div>

                <Button variant="outline" asChild>
                  <Link href={`/dashboard/bookings/${booking.id}`}>
                    View Details
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
