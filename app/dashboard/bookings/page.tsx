"use client";

import { useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { useSupabase } from "@/components/supabase-provider";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Calendar, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "lucide-react";
import Link from "next/link";

// Mock data (replace with your actual data fetching logic)
const bookings = [
  {
    id: 1,
    equipment: {
      id: 1,
      name: "Mahindra 575 DI Tractor",
      image: "https://via.placeholder.com/150",
    },
    owner: {
      name: "Ravi Kumar",
      contact: "ravi@example.com",
    },
    startDate: "2025-03-10",
    endDate: "2025-03-12",
    totalPrice: 450,
    status: "completed",
    location: "Pune, Maharashtra",
  },
  {
    id: 2,
    equipment: {
      id: 4,
      name: "Irrigation Pump",
      image: "https://via.placeholder.com/150",
    },
    owner: {
      name: "Anita Singh",
      contact: "anita@example.com",
    },
    startDate: "2025-03-15",
    endDate: "2025-03-18",
    totalPrice: 595,
    status: "upcoming",
    location: "Jaipur, Rajasthan",
  },
  {
    id: 3,
    equipment: {
      id: 2,
      name: "Rotavator",
      image: "https://via.placeholder.com/150",
    },
    owner: {
      name: "Suresh Patil",
      contact: "suresh@example.com",
    },
    startDate: "2025-04-01",
    endDate: "2025-04-03",
    totalPrice: 360,
    status: "upcoming",
    location: "Nagpur, Maharashtra",
  },
  {
    id: 4,
    equipment: {
      id: 5,
      name: "Agricultural Drone",
      image: "https://via.placeholder.com/150",
    },
    owner: {
      name: "Priya Nair",
      contact: "priya@example.com",
    },
    startDate: "2025-03-05",
    endDate: "2025-03-06",
    totalPrice: 400,
    status: "completed",
    location: "Kochi, Kerala",
  },
];

export default function BookingDetailPage() {
  const params = useParams();
  const { id } = params as { id: string };
  const { supabase, user } = useSupabase();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState<any>(null);

  useEffect(() => {
    if (!user) {
      router.push("/auth/login");
    } else {
      setLoading(false);
    }
  }, [user, router]);

  useEffect(() => {
    if (!loading && id) {
      const foundBooking = bookings.find((b) => b.id === parseInt(id, 10));
      setBooking(foundBooking || null);
    }
  }, [loading, id]);

  if (loading) {
    return (
      <div className="container flex h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="container px-4 py-8 md:px-6 md:py-12">
        <Card>
          <CardContent className="text-center">
            <h1>Booking Not Found</h1>
            <p>The booking with ID {id} was not found.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <Card>
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
              <Link href="/dashboard/bookings">Back to Bookings</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
