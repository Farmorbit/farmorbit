import { Card, CardContent } from "@/components/ui/card"
import { DollarSign, Package, Clock, Shield } from "lucide-react"

const benefits = [
  {
    icon: DollarSign,
    title: "Cost-Effective",
    description: "Save money by renting equipment only when you need it",
  },
  {
    icon: Package,
    title: "Wide Selection",
    description: "Access to a diverse range of modern farming equipment",
  },
  {
    icon: Clock,
    title: "Flexible Rentals",
    description: "Daily, weekly, or monthly rental options to suit your needs",
  },
  {
    icon: Shield,
    title: "Secure & Reliable",
    description: "All equipment is verified and maintained to high standards",
  },
]

export function Benefits() {
  return (
    <section className="container px-4 md:px-6 py-8">
      <div className="flex flex-col gap-8 text-center">
        <h2 className="text-3xl font-bold tracking-tight">Why Choose FarmOrbit</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => (
            <Card key={index} className="border-green-100">
              <CardContent className="flex flex-col items-center gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                  <benefit.icon className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

