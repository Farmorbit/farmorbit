"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { MapPin, Filter, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getData } from "@/lib/equip";

const DEFAULT_PRICE_RANGE = [0, 15001];

export default function EquipmentListings() {
  const [equipmentListingsRaw, setEquipmentListingsRaw] = useState<any[]>([]);
  const [filteredListings, setFilteredListings] = useState<any[]>([]);
  const [type, setType] = useState("all");
  const [location, setLocation] = useState("all");
  const [available, setAvailable] = useState(true);
  const [priceRange, setPriceRange] = useState<number[]>(DEFAULT_PRICE_RANGE);
  const [searchQuery, setSearchQuery] = useState("");

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    getData().then((data) => {
      setEquipmentListingsRaw(data);
    });
  }, []);

  useEffect(() => {
    const urlType = searchParams.get("type")?.toLowerCase() || "all";
    const urlLocation = searchParams.get("location") || "all";
    const urlAvailable = searchParams.get("available") !== "false";
    const minPrice = parseInt(searchParams.get("minPrice") || "0");
    const maxPrice = parseInt(searchParams.get("maxPrice") || "15001");

    setType(urlType);
    setLocation(urlLocation);
    setAvailable(urlAvailable);
    setPriceRange([minPrice, maxPrice]);
  }, [searchParams]);

  useEffect(() => {
    const filtered: any[] = [];

    for (let i = 0; i < equipmentListingsRaw.length; i++) {
      const item = equipmentListingsRaw[i];
      const itemCategory = (item.category || "").toLowerCase();
      const itemLocation = item.location || "";
      const itemAvailable = item.available ?? true;
      const itemPrice = Number(item.price);

      const matchesType = type === "all" || itemCategory === type;
      const matchesLocation = location === "all" || itemLocation === location;
      const matchesAvailability = !available || itemAvailable;
      const matchesPrice =
        itemPrice >= priceRange[0] && itemPrice <= priceRange[1];

      const matchesSearch =
        searchQuery.trim() === "" ||
        item.name.includes(searchQuery.trim().toLowerCase());

      if (
        matchesType &&
        matchesLocation &&
        matchesAvailability &&
        matchesPrice &&
        matchesSearch
      ) {
        filtered.push(item);
      }
    }

    setFilteredListings(filtered);
  }, [
    equipmentListingsRaw,
    type,
    location,
    available,
    priceRange,
    searchQuery,
  ]);

  const applyFilters = () => {
    const params = new URLSearchParams();
    params.set("type", type);
    params.set("location", location);
    params.set("available", available.toString());
    params.set("minPrice", priceRange[0].toString());
    params.set("maxPrice", priceRange[1].toString());

    router.push(`/equipment?${params.toString()}`);
  };

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    setPriceRange((prev) => [value, prev[1]]);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    setPriceRange((prev) => [prev[0], value]);
  };

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Browse Equipment</h1>
        <p className="mt-2 text-muted-foreground">
          Find and rent the perfect farming equipment for your needs
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-[250px_1fr] lg:grid-cols-[300px_1fr]">
        <div className="space-y-6">
          <div className="rounded-lg border p-4">
            <h2 className="mb-4 flex items-center gap-2 font-semibold">
              <Filter className="h-4 w-4" /> Filters
            </h2>

            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Equipment Type
                </label>
                <Select value={type} onValueChange={setType}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="tractors">Tractors</SelectItem>
                    <SelectItem value="harvesters">Harvesters</SelectItem>
                    <SelectItem value="irrigation">
                      Irrigation Systems
                    </SelectItem>
                    {/* <SelectItem value="drones">Agricultural Drones</SelectItem> */}
                    <SelectItem value="planters">Planters</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Price Range with text inputs */}
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Price Range (per day)
                </label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={priceRange[0]}
                    onChange={handleMinPriceChange}
                    min={0}
                  />
                  <Input
                    type="number"
                    placeholder="Max"
                    value={priceRange[1]}
                    onChange={handleMaxPriceChange}
                    min={0}
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Location
                </label>
                <Select value={location} onValueChange={setLocation}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Locations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    {[
                      ...new Set(equipmentListingsRaw.map((i) => i.location)),
                    ].map((loc, index) => (
                      <SelectItem key={index} value={loc}>
                        {loc}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* <div>
                <label className="mb-2 block text-sm font-medium">
                  Availability
                </label>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="available"
                    checked={available}
                    onCheckedChange={(checked) => setAvailable(!!checked)}
                  />
                  <label
                    htmlFor="available"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Show only available equipment
                  </label>
                </div>
              </div> */}

              <Button
                onClick={applyFilters}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                Apply Filters
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input
                type="text"
                placeholder="Search equipment..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button
                type="submit"
                size="icon"
                className="bg-green-600 hover:bg-green-700"
              >
                <Search className="h-4 w-4" />
                <span className="sr-only">Search</span>
              </Button>
            </div>

            <Select defaultValue="newest">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="name">Name: A to Z</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredListings.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <div className="relative h-48 w-full">
                  <Image
                    src={item.images?.[0] || "/placeholder.svg"}
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
                  <Badge className="absolute top-2 right-2 bg-green-600">
                    {item.category}
                  </Badge>
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
      </div>
    </div>
  );
}
