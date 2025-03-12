import { Card, CardContent } from "@/components/ui/card"
import { Search, Calendar, Truck, RotateCcw } from "lucide-react"

const steps = [
  {
    icon: Search,
    title: "Search",
    description: "Browse our extensive catalog of farming equipment",
  },
  {
    icon: Calendar,
    title: "Book",
    description: "Select your dates and complete the booking process",
  },
  {
    icon: Truck,
    title: "Receive",
    description: "Get the equipment delivered to your location",
  },
  {
    icon: RotateCcw,
    title: "Return",
    description: "Return the equipment when you're done",
  },
]

export function HowItWorks() {
  return (
    <section className="bg-muted py-16">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col gap-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight">How It Works</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <Card key={index} className="border-none bg-background shadow-md">
                <CardContent className="flex flex-col items-center gap-4 p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <step.icon className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

