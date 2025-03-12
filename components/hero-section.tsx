import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-b from-green-50 to-white py-20 md:py-28">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Farming Made Easy – Rent Equipment On-Demand
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Access modern farming equipment without the high upfront costs.
                Rent what you need, when you need it.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button
                asChild
                size="lg"
                className="bg-green-600 hover:bg-green-700"
              >
                <Link href="/equipment">Browse Equipment</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/list-equipment">List Your Equipment</Link>
              </Button>
            </div>
            <div className="mt-4 w-full max-w-md">
              <form className="flex w-full max-w-sm items-center space-x-2">
                <Input
                  type="text"
                  placeholder="Search equipment..."
                  className="flex-1"
                />
                <Button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Search className="h-4 w-4" />
                  <span className="sr-only">Search</span>
                </Button>
              </form>
              <p className="mt-2 text-xs text-muted-foreground">
                Popular: Tractors, Harvesters, Irrigation Systems
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative h-[300px] w-[400px] sm:h-[400px] sm:w-[500px] lg:h-[500px] lg:w-[600px]">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 rounded-lg opacity-20 blur-xl"></div>
              <div className="relative h-full w-full overflow-hidden rounded-lg">
                <Image
                  src="/hero.webp?height=500&width=600"
                  alt="Modern farming equipment"
                  width={600}
                  height={500}
                  className="h-full w-full object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
