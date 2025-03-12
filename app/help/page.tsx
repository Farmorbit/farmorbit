import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Search, HelpCircle, FileText, MessageCircle, Phone } from "lucide-react"
import Link from "next/link"

export default function HelpPage() {
  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Help Center</h1>
        <p className="mt-2 text-xl text-muted-foreground max-w-2xl mx-auto">
          Find answers to common questions and learn how to get the most out of FarmOrbit
        </p>
      </div>

      {/* Search */}
      <div className="mb-12 max-w-xl mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input type="search" placeholder="Search for answers..." className="pl-10" />
        </div>
      </div>

      {/* Quick Links */}
      <div className="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="text-center">
          <CardHeader className="pb-2">
            <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <FileText className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle>Guides & Tutorials</CardTitle>
            <CardDescription>Step-by-step instructions for using FarmOrbit</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/help/guides">View Guides</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader className="pb-2">
            <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <HelpCircle className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle>FAQs</CardTitle>
            <CardDescription>Answers to commonly asked questions</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full" asChild>
              <a href="#faqs">View FAQs</a>
            </Button>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader className="pb-2">
            <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <MessageCircle className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle>Community</CardTitle>
            <CardDescription>Join discussions with other farmers</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/community">Visit Community</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader className="pb-2">
            <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <Phone className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle>Contact Support</CardTitle>
            <CardDescription>Get help from our support team</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* FAQs */}
      <div id="faqs" className="mb-12">
        <h2 className="text-3xl font-bold tracking-tight mb-6 text-center">Frequently Asked Questions</h2>

        <Tabs defaultValue="renting" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="renting">Renting Process</TabsTrigger>
            <TabsTrigger value="listing">Listing Equipment</TabsTrigger>
            <TabsTrigger value="payment">Payment & Refunds</TabsTrigger>
            <TabsTrigger value="support">Support</TabsTrigger>
          </TabsList>

          <TabsContent value="renting" className="mt-6">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How do I rent equipment on FarmOrbit?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">
                    Renting equipment on FarmOrbit is simple. Browse our equipment listings, select the item you want to
                    rent, choose your rental dates, and complete the booking process. You'll need to create an account
                    if you don't already have one, and provide payment information to secure your booking.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>What documents do I need to rent equipment?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">
                    You'll need a valid ID, proof of insurance, and in some cases, proof of relevant certification or
                    license depending on the equipment type. These requirements will be clearly listed on the equipment
                    details page before you complete your booking.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>How is equipment delivered to me?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">
                    Equipment delivery options vary by listing. Some owners offer delivery for an additional fee, while
                    others require pickup. The delivery options and associated costs will be clearly displayed on the
                    equipment listing page before you book.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>What if the equipment breaks down during my rental period?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">
                    If equipment breaks down during normal use, contact the owner immediately through our platform. Most
                    listings include basic insurance coverage, but you should review the specific terms before renting.
                    Our support team is also available to help resolve any issues.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger>Can I extend my rental period?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">
                    Yes, you can request an extension through your dashboard. The extension is subject to the
                    equipment's availability and the owner's approval. We recommend requesting extensions as early as
                    possible to ensure availability.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>

          <TabsContent value="listing" className="mt-6">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How do I list my equipment for rent?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">
                    To list your equipment, click on "List Your Equipment" in the navigation menu. You'll need to create
                    an account if you don't have one, then follow the step-by-step process to add details, photos,
                    pricing, and availability for your equipment.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>How much should I charge for my equipment?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">
                    Pricing depends on factors like equipment type, age, condition, and local market rates. We provide
                    pricing recommendations based on similar listings in your area. You can set daily, weekly, and
                    monthly rates to encourage longer rentals.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>Is my equipment insured when I rent it out?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">
                    FarmOrbit provides basic insurance coverage for all equipment listed on our platform. This covers
                    damage during normal use, but we recommend maintaining your own insurance as well. You can review
                    our insurance policy details in the Terms of Service.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>How do I get paid for my equipment rentals?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">
                    Payments are processed securely through our platform. When a renter books your equipment, the
                    payment is held until 24 hours after the rental period begins. Funds are then released to your
                    account and can be withdrawn to your bank account.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger>What happens if my equipment is damaged?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">
                    If your equipment is damaged during a rental, document the damage immediately and report it through
                    our platform. Our insurance coverage will help cover repair costs after the renter's security
                    deposit is applied, subject to our terms and conditions.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>

          <TabsContent value="payment" className="mt-6">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>What payment methods are accepted?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">
                    We accept major credit and debit cards, including Visa, Mastercard, and American Express. In some
                    regions, we also support digital payment methods like PayPal and bank transfers for equipment
                    rentals.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>When am I charged for a rental?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">
                    You're charged when your booking is confirmed. For bookings made well in advance, we may only charge
                    a deposit initially, with the remaining balance due closer to the rental date. The specific payment
                    terms will be clearly displayed during checkout.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>What is the cancellation policy?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">
                    Cancellation policies vary by listing. Most equipment listings fall under our Standard policy, which
                    provides a full refund if cancelled 7 days before the rental start date, and a partial refund if
                    cancelled at least 3 days before. Check the specific listing for details.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>Is there a security deposit?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">
                    Yes, most equipment rentals require a security deposit, which varies based on the equipment value.
                    The deposit is fully refundable if the equipment is returned in the same condition. The deposit
                    amount is clearly displayed before you complete your booking.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger>How do refunds work?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">
                    Refunds are processed back to your original payment method. Processing times vary depending on your
                    payment provider, typically taking 5-10 business days. Security deposit refunds are initiated within
                    48 hours after the equipment is returned in good condition.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>

          <TabsContent value="support" className="mt-6">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How do I contact customer support?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">
                    You can reach our customer support team through the "Contact Us" page, by email at
                    support@farmOrbit.com, or by phone at (123) 456-7891. Our support hours are Monday-Friday, 8:00 AM -
                    6:00 PM, and Saturday, 9:00 AM - 3:00 PM.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>What should I do if there's a dispute with an owner or renter?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">
                    First, try to resolve the issue directly through our messaging system. If that doesn't work, contact
                    our support team who will mediate the dispute. We have a fair resolution process that protects both
                    parties and ensures a satisfactory outcome.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>How do I report unsafe or misrepresented equipment?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">
                    If you encounter equipment that is unsafe or significantly different from its listing, document the
                    issues with photos and contact our support team immediately. Do not use equipment that appears
                    unsafe. We take safety concerns very seriously.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>Is there 24/7 emergency support?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">
                    Yes, we offer 24/7 emergency support for urgent issues during active rentals. Our emergency support
                    line is available at (123) 456-7899. Please use this number only for genuine emergencies that
                    require immediate attention.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger>How can I provide feedback or suggestions?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">
                    We welcome your feedback and suggestions! You can submit them through the "Contact Us" page, by
                    email at feedback@farmOrbit.com, or through the feedback form in your account dashboard. We
                    regularly review user suggestions to improve our platform.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>
        </Tabs>
      </div>

      {/* Help Topics */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold tracking-tight mb-6 text-center">Popular Help Topics</h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Getting Started Guide",
              description: "Learn the basics of using FarmOrbit",
              link: "/help/getting-started",
            },
            {
              title: "Equipment Safety Guidelines",
              description: "Important safety information for all users",
              link: "/help/safety",
            },
            {
              title: "Booking and Reservation Process",
              description: "Step-by-step guide to booking equipment",
              link: "/help/booking",
            },
            {
              title: "Payment and Billing",
              description: "Understanding payments, fees, and refunds",
              link: "/help/payments",
            },
            {
              title: "Equipment Owner Resources",
              description: "Tips and guides for equipment owners",
              link: "/help/owner-resources",
            },
            {
              title: "Account Management",
              description: "Managing your profile and settings",
              link: "/help/account",
            },
          ].map((topic, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{topic.title}</CardTitle>
                <CardDescription>{topic.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full" asChild>
                  <Link href={topic.link}>Read More</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Still Need Help */}
      <div className="rounded-lg bg-muted p-8 text-center">
        <h2 className="text-2xl font-bold tracking-tight mb-4">Still Need Help?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Our support team is ready to assist you with any questions or issues you may have.
        </p>
        <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
          <Link href="/contact">Contact Support</Link>
        </Button>
      </div>
    </div>
  )
}

