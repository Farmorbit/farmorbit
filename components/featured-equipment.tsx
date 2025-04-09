"use client";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { getData } from "@/lib/equip";

export function FeaturedEquipment() {
  const [featuredEquipment, setFeaturedEquipment] = useState<any>([]);

  useEffect(() => {
    getData().then((data) => {
      setFeaturedEquipment(data);
    });
  });

  // console.log(featuredEquipment);
  return (
    <section className="container px-4 md:px-6 py-8">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">
            Featured Equipment
          </h2>
          <Link href="/equipment" className="text-green-600 hover:underline">
            View all
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredEquipment.slice(0, 8).map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <div className="relative h-48 w-full">
                <Image
                  src={item.images[0] || "/placeholder.svg"}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
                {!item.available && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Badge
                      variant="destructive"
                      className="text-lg font-semibold px-3 py-1.5"
                    >
                      Unavailable
                    </Badge>
                  </div>
                )}
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg line-clamp-1">
                  {item.name}
                </h3>
                <div className="flex items-center gap-1 text-muted-foreground mt-1">
                  <MapPin className="h-3.5 w-3.5" />
                  <span className="text-sm">{item.location}</span>
                </div>
                <p className="font-bold text-lg mt-2">₹{item.price}/day</p>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button
                  asChild
                  className="w-full bg-green-600 hover:bg-green-700"
                  disabled={!item.available}
                >
                  <Link href={`/equipment/${item.id}`}>View Details</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
