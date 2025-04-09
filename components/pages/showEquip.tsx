import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Truck, Shield, Star, Info } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function EquipmentDetails() {
  const [equipmentDetails, setEquipmentDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();

  useEffect(() => {
    setIsLoading(true);
    import("@/lib/equip").then((d) => {
      d.getData().then((d) => {
        const data = d.find((d) => d.id === params.id);
        setEquipmentDetails(data);
        setIsLoading(false);
      });
    });
  }, [params]);
  if (isLoading) return <div>Loading...</div>;
  if (!equipmentDetails) return <div>Equipment not found</div>;

  if (typeof window === "undefined") return null;
  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
        {/* Equipment images and details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Equipment images carousel */}
          <Carousel className="w-full">
            <CarouselContent>
              {equipmentDetails?.images?.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="relative h-[300px] sm:h-[400px] w-full overflow-hidden rounded-lg">
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${equipmentDetails?.name} - Image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>

          {/* Equipment details */}
          <div>
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold sm:text-3xl">
                {equipmentDetails?.name}
              </h1>
              <Badge className="bg-green-600">
                {equipmentDetails?.category}
              </Badge>
            </div>
            <div className="mt-2 flex items-center gap-1 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{equipmentDetails?.location}</span>
            </div>

            <Tabs defaultValue="description" className="mt-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="specifications">Specifications</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
              </TabsList>
              <TabsContent
                value="description"
                className="mt-4 text-muted-foreground"
              >
                <p>{equipmentDetails?.description}</p>
              </TabsContent>
              <TabsContent value="specifications" className="mt-4">
                <ul className="grid gap-2 sm:grid-cols-2">
                  {equipmentDetails?.specifications.map((spec, index) => (
                    <li
                      key={index}
                      className="flex justify-between border-b pb-2"
                    >
                      <span className="font-medium">{spec.name}</span>
                      <span className="text-muted-foreground">
                        {spec.value}
                      </span>
                    </li>
                  ))}
                </ul>
              </TabsContent>
              <TabsContent value="features" className="mt-4">
                <ul className="grid gap-2 list-disc pl-5">
                  {equipmentDetails?.features.map((feature, index) => (
                    <li key={index} className="text-muted-foreground">
                      {feature}
                    </li>
                  ))}
                </ul>
              </TabsContent>
            </Tabs>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Delivery Available
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex items-center gap-2 text-muted-foreground">
                  <Truck className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Within 50 miles</span>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Insurance Included
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex items-center gap-2 text-muted-foreground">
                  <Shield className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Basic coverage</span>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Technical Support
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex items-center gap-2 text-muted-foreground">
                  <Info className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Phone assistance</span>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Booking and owner info */}
        <div className="space-y-6">
          {/* Pricing and booking card */}
          <Card>
            <CardHeader>
              <CardTitle>Rental Pricing</CardTitle>
              <CardDescription>
                Select your preferred rental period
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="daily" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="daily">Daily</TabsTrigger>
                  <TabsTrigger value="weekly">Weekly</TabsTrigger>
                  <TabsTrigger value="monthly">Monthly</TabsTrigger>
                </TabsList>
                <TabsContent value="daily" className="mt-4">
                  <div className="text-center">
                    <span className="text-3xl font-bold">
                      ${equipmentDetails?.price.daily}
                    </span>
                    <span className="text-muted-foreground"> / day</span>
                  </div>
                </TabsContent>
                <TabsContent value="weekly" className="mt-4">
                  <div className="text-center">
                    <span className="text-3xl font-bold">
                      ${equipmentDetails?.price.weekly}
                    </span>
                    <span className="text-muted-foreground"> / week</span>
                    <p className="text-sm text-muted-foreground mt-1">
                      Save 14% compared to daily rate
                    </p>
                  </div>
                </TabsContent>
                <TabsContent value="monthly" className="mt-4">
                  <div className="text-center">
                    <span className="text-3xl font-bold">
                      ${equipmentDetails?.price.monthly}
                    </span>
                    <span className="text-muted-foreground"> / month</span>
                    <p className="text-sm text-muted-foreground mt-1">
                      Save 33% compared to daily rate
                    </p>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="mt-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Select Dates
                  </label>
                  <div className="border rounded-md p-2">
                    <Calendar mode="range" className="w-full" />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              <Button
                className="w-full bg-green-600 hover:bg-green-700"
                asChild
              >
                <Link href={`/equipment/${params.id}/book`}>Book Now</Link>
              </Button>
              <Button variant="outline" className="w-full">
                Contact Owner
              </Button>
            </CardFooter>
          </Card>

          {/* Owner information */}
          <Card>
            <CardHeader>
              <CardTitle>Equipment Owner</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    src={equipmentDetails?.owner.avatar}
                    alt={equipmentDetails?.owner.name}
                  />
                  <AvatarFallback>
                    {equipmentDetails?.owner.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">
                    {equipmentDetails?.owner.name}
                  </h3>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                    <span>
                      {equipmentDetails?.owner.rating} (
                      {equipmentDetails?.owner.reviews} reviews)
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Response time: {equipmentDetails?.owner.responseTime}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
