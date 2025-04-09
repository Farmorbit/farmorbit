"use client";

import Link from "next/link";

import type React from "react";

import { useState } from "react";
import { useSupabase } from "@/components/supabase-provider";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Calendar } from "@/components/ui/calendar";
import { Upload, Info } from "lucide-react";
import { supabase as s } from "@/lib/supabase";

export default function ListEquipmentPage() {
  const { supabase, user } = useSupabase();
  const router = useRouter();
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  // Equipment details
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [dailyPrice, setDailyPrice] = useState("");
  const [weeklyPrice, setWeeklyPrice] = useState("");
  const [monthlyPrice, setMonthlyPrice] = useState("");
  const [location, setLocation] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  // Handle image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setImages([...images, ...filesArray]);

      // Create preview URLs
      const newImageUrls = filesArray.map((file) => URL.createObjectURL(file));
      setImageUrls([...imageUrls, ...newImageUrls]);
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);

    const newImageUrls = [...imageUrls];
    URL.revokeObjectURL(newImageUrls[index]);
    newImageUrls.splice(index, 1);
    setImageUrls(newImageUrls);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please login to list your equipment",
        variant: "destructive",
      });
      router.push("/auth/login");
      return;
    }

    setLoading(true);

    try {
      const uploadedUrls: string[] = [];

      for (const image of images) {
        const fileExt = image.name.split(".").pop();
        const fileName = `${user.id}/${Date.now()}-${Math.random()
          .toString(36)
          .substring(2)}.${fileExt}`;

        const { data, error } = await s.storage
          .from("images")
          .upload(fileName, image, {
            cacheControl: "3600",
            upsert: false,
          });

        if (error) {
          console.log("Unable to upload Image");
          throw error;
        }

        const { data: publicUrlData } = s.storage
          .from("images")
          .getPublicUrl(fileName);

        if (publicUrlData?.publicUrl) {
          uploadedUrls.push(publicUrlData.publicUrl);
        }
      }

      const { error: insertError } = await s.from("equipment").insert({
        user_id: user.id,
        name,
        category,
        description,
        daily_price: dailyPrice,
        weekly_price: weeklyPrice || null,
        monthly_price: monthlyPrice || null,
        location,
        image_urls: uploadedUrls,
      });

      if (insertError) throw insertError;

      toast({
        title: "Equipment listed successfully",
        description: "Your equipment is now available for rent",
      });

      router.push("/dashboard/listings");
    } catch (error: any) {
      console.error(error);
      toast({
        title: "An error occurred",
        description: error.message || "Please try again later",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (step === 1 && (!name || !category || !description)) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (step === 2 && (!dailyPrice || !location)) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (step === 3 && images.length === 0) {
      toast({
        title: "Images required",
        description: "Please upload at least one image of your equipment",
        variant: "destructive",
      });
      return;
    }

    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  return (
    <div className="container max-w-3xl px-4 py-8 md:px-6 md:py-12">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">
          List Your Equipment
        </h1>
        <p className="mt-2 text-muted-foreground">
          Rent out your farming equipment and earn extra income
        </p>
      </div>

      <div className="mb-8">
        <div className="flex justify-between">
          <div
            className={`flex-1 border-t-4 ${
              step >= 1 ? "border-green-600" : "border-muted"
            } pt-2`}
          >
            <p
              className={`text-sm font-medium ${
                step >= 1 ? "text-green-600" : "text-muted-foreground"
              }`}
            >
              Basic Details
            </p>
          </div>
          <div
            className={`flex-1 border-t-4 ${
              step >= 2 ? "border-green-600" : "border-muted"
            } pt-2`}
          >
            <p
              className={`text-sm font-medium ${
                step >= 2 ? "text-green-600" : "text-muted-foreground"
              }`}
            >
              Pricing & Location
            </p>
          </div>
          <div
            className={`flex-1 border-t-4 ${
              step >= 3 ? "border-green-600" : "border-muted"
            } pt-2`}
          >
            <p
              className={`text-sm font-medium ${
                step >= 3 ? "text-green-600" : "text-muted-foreground"
              }`}
            >
              Images
            </p>
          </div>
          <div
            className={`flex-1 border-t-4 ${
              step >= 4 ? "border-green-600" : "border-muted"
            } pt-2`}
          >
            <p
              className={`text-sm font-medium ${
                step >= 4 ? "text-green-600" : "text-muted-foreground"
              }`}
            >
              Review & Submit
            </p>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            {step === 1 && "Equipment Details"}
            {step === 2 && "Pricing & Location"}
            {step === 3 && "Upload Images"}
            {step === 4 && "Review & Submit"}
          </CardTitle>
          <CardDescription>
            {step === 1 && "Provide basic information about your equipment"}
            {step === 2 && "Set your rental rates and location"}
            {step === 3 && "Upload clear photos of your equipment (minimum 1)"}
            {step === 4 && "Review your listing before submitting"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            {/* Step 1: Basic Details */}
            {step === 1 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Equipment Name *</Label>
                  <Input
                    id="name"
                    placeholder="e.g., John Deere 5075E Tractor"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select value={category} onValueChange={setCategory} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tractors">Tractors</SelectItem>
                      <SelectItem value="harvesters">Harvesters</SelectItem>
                      <SelectItem value="irrigation">
                        Irrigation Systems
                      </SelectItem>
                      <SelectItem value="drones">
                        Agricultural Drones
                      </SelectItem>
                      <SelectItem value="planters">Planters</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your equipment, including specifications, features, and condition"
                    rows={5}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>
              </div>
            )}

            {/* Step 2: Pricing & Location */}
            {step === 2 && (
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="daily-price">Daily Rate (₹) *</Label>
                    <Input
                      id="daily-price"
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="0.00"
                      value={dailyPrice}
                      onChange={(e) => setDailyPrice(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="weekly-price">Weekly Rate (₹)</Label>
                    <Input
                      id="weekly-price"
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="0.00"
                      value={weeklyPrice}
                      onChange={(e) => setWeeklyPrice(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Recommended:{" "}
                      {dailyPrice
                        ? `₹${(Number.parseFloat(dailyPrice) * 6).toFixed(2)}`
                        : "Set daily rate first"}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="monthly-price">Monthly Rate (₹)</Label>
                    <Input
                      id="monthly-price"
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="0.00"
                      value={monthlyPrice}
                      onChange={(e) => setMonthlyPrice(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Recommended:{" "}
                      {dailyPrice
                        ? `₹${(Number.parseFloat(dailyPrice) * 20).toFixed(2)}`
                        : "Set daily rate first"}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    placeholder="City, State"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Availability Calendar</Label>
                  <div className="border rounded-md p-2">
                    <Calendar mode="multiple" className="w-full" />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Select dates when your equipment is NOT available
                  </p>
                </div>
              </div>
            )}

            {/* Step 3: Images */}
            {step === 3 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="images">Upload Images *</Label>
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="images"
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                        <p className="mb-2 text-sm text-muted-foreground">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-muted-foreground">
                          PNG, JPG or WEBP (MAX. 5MB each)
                        </p>
                      </div>
                      <Input
                        id="images"
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={handleImageChange}
                      />
                    </label>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Upload at least 1 image of your equipment. Clear, well-lit
                    photos increase rental chances.
                  </p>
                </div>

                {imageUrls.length > 0 && (
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 mt-4">
                    {imageUrls.map((url, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={url || "/placeholder.svg"}
                          alt={`Equipment preview ${index + 1}`}
                          className="h-24 w-full object-cover rounded-md"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 rounded-md transition-opacity"
                        >
                          <span className="text-white text-sm">Remove</span>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Step 4: Review & Submit */}
            {step === 4 && (
              <div className="space-y-6">
                <div className="rounded-lg border p-4">
                  <h3 className="font-semibold mb-2">Equipment Details</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-muted-foreground">Name:</div>
                    <div>{name}</div>
                    <div className="text-muted-foreground">Category:</div>
                    <div>{category}</div>
                    <div className="text-muted-foreground">Description:</div>
                    <div className="line-clamp-3">{description}</div>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <h3 className="font-semibold mb-2">Pricing & Location</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-muted-foreground">Daily Rate:</div>
                    <div>₹{dailyPrice}</div>
                    {weeklyPrice && (
                      <>
                        <div className="text-muted-foreground">
                          Weekly Rate:
                        </div>
                        <div>₹{weeklyPrice}</div>
                      </>
                    )}
                    {monthlyPrice && (
                      <>
                        <div className="text-muted-foreground">
                          Monthly Rate:
                        </div>
                        <div>₹{monthlyPrice}</div>
                      </>
                    )}
                    <div className="text-muted-foreground">Location:</div>
                    <div>{location}</div>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <h3 className="font-semibold mb-2">Images</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {imageUrls.map((url, index) => (
                      <img
                        key={index}
                        src={url || "/placeholder.svg"}
                        alt={`Equipment preview ${index + 1}`}
                        className="h-20 w-full object-cover rounded-md"
                      />
                    ))}
                  </div>
                </div>

                <div className="flex items-start gap-2 rounded-lg border p-4 bg-muted/50">
                  <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium">Before submitting:</p>
                    <ul className="list-disc pl-5 mt-1 space-y-1 text-muted-foreground">
                      <li>Ensure all information is accurate</li>
                      <li>
                        Verify that your contact information is up-to-date
                      </li>
                      <li>
                        Review our{" "}
                        <Link
                          href="/terms"
                          className="text-green-600 hover:underline"
                        >
                          Terms of Service
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-6 flex justify-between">
              {step > 1 && (
                <Button type="button" variant="outline" onClick={prevStep}>
                  Back
                </Button>
              )}
              {step < 4 ? (
                <Button
                  type="button"
                  className="ml-auto bg-green-600 hover:bg-green-700"
                  onClick={nextStep}
                >
                  Continue
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="ml-auto bg-green-600 hover:bg-green-700"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit Listing"}
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
