import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tractor, Users, Globe, Award, CheckCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      {/* Hero Section */}
      <div className="mb-16 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          About FarmOrbit
        </h1>
        <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
          Connecting farmers with the equipment they need, when they need it.
        </p>
      </div>

      {/* Our Story */}
      <div className="mb-16 grid gap-8 md:grid-cols-2 md:gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight mb-4">Our Story</h2>
          <p className="text-muted-foreground mb-4">
            FarmOrbit was founded in 2022 by a team of agricultural enthusiasts
            and tech innovators who recognized a critical gap in the farming
            industry: access to modern equipment without the prohibitive costs
            of ownership.
          </p>
          <p className="text-muted-foreground mb-4">
            Our founders, having grown up in farming communities, witnessed
            firsthand how small and medium-sized farms struggled to compete due
            to limited access to advanced machinery. This inspired the creation
            of FarmOrbit - a platform that democratizes access to farming
            technology.
          </p>
          <p className="text-muted-foreground">
            Today, FarmOrbit serves thousands of farmers across the country,
            helping them increase productivity and profitability while building
            a more sustainable and efficient agricultural ecosystem.
          </p>
        </div>
        {/* <div className="relative h-[300px] md:h-[400px] w-full rounded-lg overflow-hidden">
          <Image src="/placeholder.svg?height=400&width=600" alt="FarmOrbit team" fill className="object-cover" />
        </div> */}
      </div>

      {/* Our Mission */}
      <div className="mb-16 bg-muted py-12 px-4 md:px-8 rounded-lg">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Our Mission
          </h2>
          <p className="text-xl text-muted-foreground">
            To empower farmers of all sizes by providing affordable access to
            modern agricultural equipment, fostering innovation, and promoting
            sustainable farming practices.
          </p>
        </div>
      </div>

      {/* Our Values */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold tracking-tight mb-8 text-center">
          Our Values
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 rounded-full bg-green-100 p-3">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Community</h3>
                <p className="text-muted-foreground">
                  We believe in the power of community and shared resources to
                  strengthen the agricultural sector.
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 rounded-full bg-green-100 p-3">
                  <Globe className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Sustainability</h3>
                <p className="text-muted-foreground">
                  We promote sustainable farming practices through efficient
                  resource utilization and reduced waste.
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 rounded-full bg-green-100 p-3">
                  <Award className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Excellence</h3>
                <p className="text-muted-foreground">
                  We strive for excellence in every aspect of our service, from
                  equipment quality to customer support.
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 rounded-full bg-green-100 p-3">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Reliability</h3>
                <p className="text-muted-foreground">
                  We ensure reliable equipment and service that farmers can
                  count on during critical farming seasons.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Why Choose FarmOrbit */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold tracking-tight mb-8 text-center">
          Why Choose FarmOrbit?
        </h2>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 rounded-full bg-green-100 p-2">
                <Tractor className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Extensive Equipment Selection
                </h3>
                <p className="text-muted-foreground">
                  Access to a wide range of modern farming equipment from
                  trusted manufacturers.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 rounded-full bg-green-100 p-2">
                <Tractor className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Flexible Rental Options
                </h3>
                <p className="text-muted-foreground">
                  Daily, weekly, and monthly rental plans to suit your specific
                  farming needs.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 rounded-full bg-green-100 p-2">
                <Tractor className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Quality Assurance
                </h3>
                <p className="text-muted-foreground">
                  All equipment is verified and maintained to high standards for
                  optimal performance.
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 rounded-full bg-green-100 p-2">
                <Tractor className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Transparent Pricing
                </h3>
                <p className="text-muted-foreground">
                  Clear, upfront pricing with no hidden fees or unexpected
                  charges.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 rounded-full bg-green-100 p-2">
                <Tractor className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Delivery Options</h3>
                <p className="text-muted-foreground">
                  Equipment delivery and pickup services available for your
                  convenience.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 rounded-full bg-green-100 p-2">
                <Tractor className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Dedicated Support
                </h3>
                <p className="text-muted-foreground">
                  Expert customer support team available to assist with any
                  questions or issues.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold tracking-tight mb-8 text-center">
          Meet Our Team
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              name: "Raghav Mrituanjaya",
              role: "Founder & CEO",
              bio: "Former farmer with 15 years of experience in agricultural technology.",
              image:
                "https://pbs.twimg.com/profile_images/1466716368724582402/yBS0DkQr_400x400.jpg",
            },
            {
              name: "Shobana",
              role: "Chief Operations Officer",
              bio: "Agricultural economist with expertise in farm equipment logistics.",
              image:
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300",
            },
            {
              name: "Sudharshan",
              role: "Chief Technology Officer",
              bio: "Tech innovator with a passion for applying technology to agriculture.",
              image:
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300",
            },
            {
              name: "Ravi Shankar",
              role: "Customer Success Manager",
              bio: "Dedicated to ensuring farmers get the most value from FarmOrbit.",
              image:
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=3000",
            },
            {
              name: "Monica",
              role: "Customer Success Manager",
              bio: "Dedicated to ensuring farmers get the most value from FarmOrbit.",
              image:
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=3000",
            },
          ].map((member, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              {/* <div className="mb-4 h-40 w-40 overflow-hidden rounded-full">
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  width={160}
                  height={160}
                  className="h-full w-full object-cover"
                />
              </div> */}
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-green-600 mb-2">{member.role}</p>
              <p className="text-muted-foreground">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="rounded-lg bg-green-50 p-8 text-center">
        <h2 className="text-2xl font-bold tracking-tight mb-4">
          Ready to Transform Your Farming Experience?
        </h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Join thousands of farmers who are already benefiting from FarmOrbit's
          equipment rental platform.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
            <Link href="/equipment">Browse Equipment</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
