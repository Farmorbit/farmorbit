import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { MapPin, Filter, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Mock data for equipment listings
const equipmentListings = [
  {
    id: 1,
    name: "John Deere 5075E Tractor",
    price: 150,
    location: "Punjab, India",
    image: "https://placehold.co/480x360/png?text=John+Deere+5075E",
    available: true,
    category: "Tractors",
  },
  {
    id: 2,
    name: "Kubota L3901 Compact Tractor",
    price: 120,
    location: "Maharashtra, India",
    image: "https://placehold.co/480x360/png?text=Kubota+L3901",
    available: true,
    category: "Tractors",
  },
  {
    id: 3,
    name: "Case IH Harvester",
    price: 250,
    location: "Haryana, India",
    image: "https://placehold.co/480x360/png?text=Case+IH+Harvester",
    available: false,
    category: "Harvesters",
  },
  {
    id: 4,
    name: "Modern Irrigation System",
    price: 85,
    location: "Rajasthan, India",
    image: "https://placehold.co/480x360/png?text=Irrigation",
    available: true,
    category: "Irrigation",
  },
  {
    id: 5,
    name: "DJI Agras T30 Agricultural Drone",
    price: 200,
    location: "Karnataka, India",
    image: "https://placehold.co/480x360/png?text=DJI+Agras+T30",
    available: true,
    category: "Drones",
  },
  {
    id: 6,
    name: "New Holland Tractor",
    price: 175,
    location: "Uttar Pradesh, India",
    image: "https://placehold.co/480x360/png?text=New+Holland",
    available: true,
    category: "Tractors",
  },
  {
    id: 7,
    name: "Precision Planter",
    price: 110,
    location: "Madhya Pradesh, India",
    image: "https://placehold.co/480x360/png?text=Planter",
    available: true,
    category: "Planters",
  },
  {
    id: 8,
    name: "Sprinkler Irrigation System",
    price: 95,
    location: "Tamil Nadu, India",
    image: "https://placehold.co/480x360/png?text=Sprinkler",
    available: true,
    category: "Irrigation",
  },
];

export default function EquipmentListings() {
  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Browse Equipment</h1>
        <p className="mt-2 text-muted-foreground">
          Find and rent the perfect farming equipment for your needs
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-[250px_1fr] lg:grid-cols-[300px_1fr]">
        {/* Filters sidebar */}
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
                <Select defaultValue="all">
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
                    <SelectItem value="drones">Agricultural Drones</SelectItem>
                    <SelectItem value="planters">Planters</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Price Range (per day)
                </label>
                <div className="space-y-2">
                  <Slider defaultValue={[0, 300]} min={0} max={500} step={10} />
                  <div className="flex items-center justify-between">
                    <span className="text-sm">₹0</span>
                    <span className="text-sm">₹500</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Location
                </label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="All Locations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    <SelectItem value="or">Oregon</SelectItem>
                    <SelectItem value="wa">Washington</SelectItem>
                    <SelectItem value="ca">California</SelectItem>
                    <SelectItem value="id">Idaho</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Availability
                </label>
                <div className="flex items-center space-x-2">
                  <Checkbox id="available" defaultChecked />
                  <label
                    htmlFor="available"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Show only available equipment
                  </label>
                </div>
              </div>

              <Button className="w-full bg-green-600 hover:bg-green-700">
                Apply Filters
              </Button>
            </div>
          </div>
        </div>

        {/* Equipment listings */}
        <div className="space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input type="text" placeholder="Search equipment..." />
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
            {equipmentListings.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <div className="relative h-48 w-full">
                  <Image
                    src={item.image || "/placeholder.svg"}
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
