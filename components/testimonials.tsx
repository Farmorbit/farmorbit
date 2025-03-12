import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Quote } from "lucide-react"

const testimonials = [
  {
    quote:
      "FarmOrbit saved our harvest season. We were able to rent a harvester at the last minute when ours broke down.",
    author: "Michael Johnson",
    role: "Wheat Farmer",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    quote: "The equipment was in perfect condition and the booking process was incredibly simple. Highly recommended!",
    author: "Sarah Williams",
    role: "Organic Farm Owner",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    quote:
      "As a small farm, we can't afford to buy all the equipment we need. FarmOrbit makes modern farming accessible.",
    author: "David Chen",
    role: "Small-Scale Farmer",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export function Testimonials() {
  return (
    <section className="bg-green-50 py-16">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col gap-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight">What Our Customers Say</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white">
                <CardContent className="flex flex-col gap-4 p-6">
                  <Quote className="h-8 w-8 text-green-600 opacity-50" />
                  <p className="text-muted-foreground italic">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={testimonial.avatar} alt={testimonial.author} />
                      <AvatarFallback>
                        {testimonial.author
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-left">
                      <p className="font-semibold">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

