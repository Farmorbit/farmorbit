"use client";

import { useSupabase } from "@/components/supabase-provider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import {
  Calendar,
  DollarSign,
  Eye,
  Pencil,
  Trash2,
  Tractor,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface Equipment {
  id: string;
  name: string;
  price: number;
  image_url: string;
  bookings: number;
  revenue: number;
  status: string;
  location: string;
  category: string;
  views: number;
  created_at: string;
}

export default function ListingsPage() {
  const { supabase, user } = useSupabase();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState<Equipment[]>([]);

  useEffect(() => {
    if (!user) {
      router.push("/auth/login");
    } else {
      fetchListings();
    }
  }, [user]);

  const fetchListings = async () => {
    const { data, error } = await supabase
      .from("equipment")
      .select("*")
      .eq("user_id", user?.id);

    if (error) {
      console.error("Error fetching listings:", error);
    } else {
      setListings(data as Equipment[]);
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <div className="container flex h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  const activeListings = listings.filter(
    (listing) => listing.status === "active"
  );
  const inactiveListings = listings.filter(
    (listing) => listing.status === "inactive"
  );

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Listings</h1>
          <p className="mt-2 text-muted-foreground">
            Manage your equipment available for rent
          </p>
        </div>
        <Button
          asChild
          className="mt-4 sm:mt-0 bg-green-600 hover:bg-green-700"
        >
          <Link href="/list-equipment">
            <Tractor className="mr-2 h-4 w-4" />
            Add New Listing
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All Listings</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="inactive">Inactive</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="space-y-6">
            {listings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="active" className="mt-6">
          {activeListings.length > 0 ? (
            <div className="space-y-6">
              {activeListings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10 text-center">
                <Tractor className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="font-semibold">No active listings</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  You don't have any active equipment listings
                </p>
                <Button
                  asChild
                  className="mt-4 bg-green-600 hover:bg-green-700"
                >
                  <Link href="/list-equipment">Add New Listing</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="inactive" className="mt-6">
          {inactiveListings.length > 0 ? (
            <div className="space-y-6">
              {inactiveListings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10 text-center">
                <Tractor className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="font-semibold">No inactive listings</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  You don't have any inactive equipment listings
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface ListingCardProps {
  listing: Equipment;
}

function ListingCard({ listing }: ListingCardProps) {
  const [status, setStatus] = useState(listing.status === "active");

  const handleStatusChange = (checked: boolean) => {
    setStatus(checked);
    // TODO: Update in Supabase
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-4">
            <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
              <Image
                src={listing.image_url || "/placeholder.svg"}
                alt={listing.name}
                width={80}
                height={80}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-semibold">{listing.name}</h3>
              <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                <Badge variant="outline">{listing.category}</Badge>
                <span className="mx-1">•</span>
                <span>${listing.price}/day</span>
              </div>
              <div className="mt-1 flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {listing.bookings ?? 0} bookings
                </span>
                <span className="flex items-center gap-1">
                  <DollarSign className="h-3.5 w-3.5" />${listing.revenue ?? 0}{" "}
                  revenue
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="h-3.5 w-3.5" />
                  {listing.views ?? 0} views
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {status ? "Active" : "Inactive"}
              </span>
              <Switch checked={status} onCheckedChange={handleStatusChange} />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link href={`/dashboard/listings/${listing.id}`}>
                  <Eye className="mr-1 h-3.5 w-3.5" />
                  View
                </Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href={`/dashboard/listings/${listing.id}/edit`}>
                  <Pencil className="mr-1 h-3.5 w-3.5" />
                  Edit
                </Link>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
