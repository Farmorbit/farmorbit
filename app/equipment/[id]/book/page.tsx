"use client"

import type React from "react"

import { useState, useEffect, use } from "react";
import { useSupabase } from "@/components/supabase-provider"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { CalendarIcon, CreditCard, Truck, Shield, ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Mock data for equipment details
const equipmentDetails = {
  id: 1,
  name: "John Deere 5075E Tractor",
  price: {
    daily: 150,
    weekly: 900,
    monthly: 3000,
  },
  location: "Portland, OR",
  image: "/placeholder.svg?height=200&width=300",
  available: true,
  category: "Tractors",
}

export default function BookEquipmentPage(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params);
  const { supabase, user } = useSupabase()
  const router = useRouter()
  const { toast } = useToast()

  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1)

  // Booking details
  const [startDate, setStartDate] = useState<Date | undefined>(new Date())
  const [endDate, setEndDate] = useState<Date | undefined>(new Date(new Date().setDate(new Date().getDate() + 3)))
  const [rentalPeriod, setRentalPeriod] = useState<"daily" | "weekly" | "monthly">("daily")
  const [deliveryOption, setDeliveryOption] = useState<"pickup" | "delivery">("pickup")
  const [specialRequests, setSpecialRequests] = useState("")

  // Payment details
  const [cardNumber, setCardNumber] = useState("")
  const [cardName, setCardName] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [cvv, setCvv] = useState("")

  // Calculate rental duration and total price
  const calculateDuration = () => {
    if (!startDate || !endDate) return 0

    const start = new Date(startDate)
    const end = new Date(endDate)
    const diffTime = Math.abs(end.getTime() - start.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    return diffDays
  }

  const calculateTotalPrice = () => {
    const duration = calculateDuration()

    if (rentalPeriod === "daily") {
      return equipmentDetails.price.daily * duration
    } else if (rentalPeriod === "weekly") {
      const weeks = Math.ceil(duration / 7)
      return equipmentDetails.price.weekly * weeks
    } else {
      const months = Math.ceil(duration / 30)
      return equipmentDetails.price.monthly * months
    }
  }

  const deliveryFee = deliveryOption === "delivery" ? 50 : 0
  const insuranceFee = 25
  const totalPrice = calculateTotalPrice() + deliveryFee + insuranceFee

  useEffect(() => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please login to book equipment",
        variant: "destructive",
      })
      router.push(`/auth/login?redirect=/equipment/${params.id}/book`)
    }
  }, [user, router, params.id, toast])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate booking process
    setTimeout(() => {
      toast({
        title: "Booking successful",
        description: "Your equipment rental has been confirmed",
      })

      router.push(`/dashboard/bookings`)
    }, 2000)
  }

  const nextStep = () => {
    if (step === 1 && (!startDate || !endDate)) {
      toast({
        title: "Missing information",
        description: "Please select your rental dates",
        variant: "destructive",
      })
      return
    }

    setStep(step + 1)
  }

  const prevStep = () => {
    setStep(step - 1)
  }

  return (
    <div className="container max-w-4xl px-4 py-8 md:px-6 md:py-12">
      <div className="mb-8">
        <Link
          href={`/equipment/${params.id}`}
          className="flex items-center text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to equipment details
        </Link>

        <h1 className="mt-4 text-3xl font-bold tracking-tight">Book Equipment</h1>
        <p className="mt-2 text-muted-foreground">Complete your booking for {equipmentDetails.name}</p>
      </div>

      <div className="mb-8">
        <div className="flex justify-between">
          <div className={`flex-1 border-t-4 ${step >= 1 ? "border-green-600" : "border-muted"} pt-2`}>
            <p className={`text-sm font-medium ${step >= 1 ? "text-green-600" : "text-muted-foreground"}`}>
              Rental Details
            </p>
          </div>
          <div className={`flex-1 border-t-4 ${step >= 2 ? "border-green-600" : "border-muted"} pt-2`}>
            <p className={`text-sm font-medium ${step >= 2 ? "text-green-600" : "text-muted-foreground"}`}>
              Review & Payment
            </p>
          </div>
          <div className={`flex-1 border-t-4 ${step >= 3 ? "border-green-600" : "border-muted"} pt-2`}>
            <p className={`text-sm font-medium ${step >= 3 ? "text-green-600" : "text-muted-foreground"}`}>
              Confirmation
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {/* Booking Form */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>
                {step === 1 && "Rental Details"}
                {step === 2 && "Review & Payment"}
                {step === 3 && "Booking Confirmation"}
              </CardTitle>
              <CardDescription>
                {step === 1 && "Select your rental dates and options"}
                {step === 2 && "Review your booking and complete payment"}
                {step === 3 && "Your booking has been confirmed"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                {/* Step 1: Rental Details */}
                {step === 1 && (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label>Rental Period</Label>
                      <Tabs
                        defaultValue={rentalPeriod}
                        onValueChange={(value) => setRentalPeriod(value as "daily" | "weekly" | "monthly")}
                        className="w-full"
                      >
                        <TabsList className="grid w-full grid-cols-3">
                          <TabsTrigger value="daily">Daily</TabsTrigger>
                          <TabsTrigger value="weekly">Weekly</TabsTrigger>
                          <TabsTrigger value="monthly">Monthly</TabsTrigger>
                        </TabsList>
                        <TabsContent value="daily" className="mt-4">
                          <div className="text-center">
                            <span className="text-2xl font-bold">${equipmentDetails.price.daily}</span>
                            <span className="text-muted-foreground"> / day</span>
                          </div>
                        </TabsContent>
                        <TabsContent value="weekly" className="mt-4">
                          <div className="text-center">
                            <span className="text-2xl font-bold">${equipmentDetails.price.weekly}</span>
                            <span className="text-muted-foreground"> / week</span>
                            <p className="text-sm text-muted-foreground mt-1">Save 14% compared to daily rate</p>
                          </div>
                        </TabsContent>
                        <TabsContent value="monthly" className="mt-4">
                          <div className="text-center">
                            <span className="text-2xl font-bold">${equipmentDetails.price.monthly}</span>
                            <span className="text-muted-foreground"> / month</span>
                            <p className="text-sm text-muted-foreground mt-1">Save 33% compared to daily rate</p>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </div>

                    <div className="space-y-2">
                      <Label>Select Dates</Label>
                      <div className="border rounded-md p-2">
                        <Calendar
                          mode="range"
                          selected={{
                            from: startDate,
                            to: endDate,
                          }}
                          onSelect={(range) => {
                            setStartDate(range?.from)
                            setEndDate(range?.to)
                          }}
                          className="w-full"
                          disabled={(date) => date < new Date()}
                        />
                      </div>
                      <div className="flex justify-between text-sm text-muted-foreground mt-2">
                        <div>Start: {startDate?.toLocaleDateString()}</div>
                        <div>End: {endDate?.toLocaleDateString()}</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Delivery Options</Label>
                      <RadioGroup
                        defaultValue={deliveryOption}
                        onValueChange={(value) => setDeliveryOption(value as "pickup" | "delivery")}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="pickup" id="pickup" />
                          <Label htmlFor="pickup">Self Pickup (Free)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="delivery" id="delivery" />
                          <Label htmlFor="delivery">Delivery ($50 fee)</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="special-requests">Special Requests (Optional)</Label>
                      <Textarea
                        id="special-requests"
                        placeholder="Any special requirements or questions..."
                        value={specialRequests}
                        onChange={(e) => setSpecialRequests(e.target.value)}
                      />
                    </div>
                  </div>
                )}

                {/* Step 2: Review & Payment */}
                {step === 2 && (
                  <div className="space-y-6">
                    <div className="rounded-lg border p-4">
                      <h3 className="font-semibold mb-2">Booking Summary</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Equipment:</span>
                          <span>{equipmentDetails.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Rental Period:</span>
                          <span>{rentalPeriod.charAt(0).toUpperCase() + rentalPeriod.slice(1)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Duration:</span>
                          <span>{calculateDuration()} days</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Dates:</span>
                          <span>
                            {startDate?.toLocaleDateString()} - {endDate?.toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Delivery Option:</span>
                          <span>{deliveryOption === "pickup" ? "Self Pickup" : "Delivery"}</span>
                        </div>
                        {specialRequests && (
                          <div className="pt-2">
                            <span className="text-muted-foreground">Special Requests:</span>
                            <p className="mt-1">{specialRequests}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-semibold">Payment Information</h3>

                      <div className="space-y-2">
                        <Label htmlFor="card-number">Card Number</Label>
                        <Input
                          id="card-number"
                          placeholder="1234 5678 9012 3456"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="card-name">Cardholder Name</Label>
                        <Input
                          id="card-name"
                          placeholder="John Doe"
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiry-date">Expiry Date</Label>
                          <Input
                            id="expiry-date"
                            placeholder="MM/YY"
                            value={expiryDate}
                            onChange={(e) => setExpiryDate(e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            placeholder="123"
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Confirmation */}
                {step === 3 && (
                  <div className="text-center space-y-6">
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-10 w-10 text-green-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold">Booking Confirmed!</h3>
                      <p className="text-muted-foreground mt-1">
                        Your booking for {equipmentDetails.name} has been confirmed.
                      </p>
                    </div>

                    <div className="rounded-lg border p-4 text-left">
                      <h4 className="font-semibold mb-2">Booking Details</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Booking ID:</span>
                          <span>BO-{Math.floor(Math.random() * 10000)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Equipment:</span>
                          <span>{equipmentDetails.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Dates:</span>
                          <span>
                            {startDate?.toLocaleDateString()} - {endDate?.toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Total Amount:</span>
                          <span className="font-semibold">${totalPrice}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-muted-foreground">
                        A confirmation email has been sent to your registered email address.
                      </p>
                      <p className="text-muted-foreground">You can view and manage your bookings in your dashboard.</p>
                    </div>
                  </div>
                )}

                <div className="mt-6 flex justify-between">
                  {step > 1 && step < 3 && (
                    <Button type="button" variant="outline" onClick={prevStep}>
                      Back
                    </Button>
                  )}
                  {step < 2 ? (
                    <Button type="button" className="ml-auto bg-green-600 hover:bg-green-700" onClick={nextStep}>
                      Continue to Payment
                    </Button>
                  ) : step === 2 ? (
                    <Button type="submit" className="ml-auto bg-green-600 hover:bg-green-700" disabled={loading}>
                      {loading ? "Processing..." : "Confirm Booking"}
                    </Button>
                  ) : (
                    <Button type="button" className="mx-auto bg-green-600 hover:bg-green-700" asChild>
                      <Link href="/dashboard/bookings">View My Bookings</Link>
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 overflow-hidden rounded-md">
                  <Image
                    src={equipmentDetails.image || "/placeholder.svg"}
                    alt={equipmentDetails.name}
                    width={64}
                    height={64}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold">{equipmentDetails.name}</h3>
                  <p className="text-sm text-muted-foreground">{equipmentDetails.location}</p>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Rental Fee:</span>
                  <span>${calculateTotalPrice()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Delivery Fee:</span>
                  <span>${deliveryFee}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Insurance:</span>
                  <span>${insuranceFee}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-semibold">
                  <span>Total:</span>
                  <span>${totalPrice}</span>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex items-center gap-2 text-sm">
                  <CalendarIcon className="h-4 w-4 text-green-600" />
                  <span>Free cancellation up to 48 hours before pickup</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="h-4 w-4 text-green-600" />
                  <span>Insurance included in the price</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CreditCard className="h-4 w-4 text-green-600" />
                  <span>Secure payment processing</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Truck className="h-4 w-4 text-green-600" />
                  <span>Delivery available for an additional fee</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

