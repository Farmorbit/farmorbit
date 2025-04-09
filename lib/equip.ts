import { supabase } from "./supabase";
const data = [
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
export const equipmentDetails = {
  id: 1,
  name: "John Deere 5075E Tractor",
  price: {
    daily: 150,
    weekly: 900,
    monthly: 3000,
  },
  location: "Portland, OR",
  images: [
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
  ],
  available: true,
  category: "Tractors",
  description:
    "The John Deere 5075E utility tractor is perfect for small to medium-sized farms. With 75 horsepower and a comfortable operator station, this tractor can handle a variety of tasks from mowing to loading.",
  specifications: [
    { name: "Horsepower", value: "75 HP" },
    { name: "Engine", value: "PowerTech™ diesel engine" },
    { name: "Transmission", value: "9F/3R SyncShuttle™" },
    { name: "Hydraulics", value: "Open center hydraulic system" },
    { name: "PTO", value: "540 RPM independent" },
    { name: "Weight", value: "5,765 lbs (2,615 kg)" },
  ],
  features: [
    "Powerful and fuel-efficient engine",
    "Comfortable operator station with ergonomic controls",
    "Versatile for various farming applications",
    "Easy to operate and maintain",
    "Reliable performance in tough conditions",
  ],
  owner: {
    name: "Michael Johnson",
    rating: 4.8,
    reviews: 24,
    responseTime: "Within 2 hours",
    avatar: "/placeholder.svg?height=50&width=50",
  },
};
export const getData = async () => {
  const { data, error } = await supabase.from("equipment").select("*");
  let d: any[] = [];

  for (let i = 0; i < (data as any).length; i++) {
    d.push({
      id: (data as any)[i].id,
      name: (data as any)[i].name,
      price: (data as any)[i].daily_price,
      daily_price: (data as any)[i].daily_price,
      weekly_price: (data as any)[i].weekly_price,
      monthly_price: (data as any)[i].monthly_price,
      location: (data as any)[i].location,
      images: (data as any)[i].image_urls,
      available: (data as any)[i].status === "active" || true,
      category: (data as any)[i].category,
      specifications: [
        { name: "Horsepower", value: "75 HP" },
        { name: "Engine", value: "PowerTech™ diesel engine" },
        { name: "Transmission", value: "9F/3R SyncShuttle™" },
        { name: "Hydraulics", value: "Open center hydraulic system" },
        { name: "PTO", value: "540 RPM independent" },
        { name: "Weight", value: "5,765 lbs (2,615 kg)" },
      ],
      features: [
        "Powerful and fuel-efficient engine",
        "Comfortable operator station with ergonomic controls",
        "Versatile for various farming applications",
        "Easy to operate and maintain",
        "Reliable performance in tough conditions",
      ],
      owner: {
        name: "Michael Johnson",
        rating: 4.8,
        reviews: 24,
        responseTime: "Within 2 hours",
        avatar: "/placeholder.svg?height=50&width=50",
      },
    });
  }
  return d;
};

const getBookingData = async () => {
  const { data, error } = await supabase.from("bookings").select("*");
  // let d: any[] = [];

  // for (let i = 0; i < (data as any).length; i++) {
  //   d.push({
  //     id: (data as any)[i].id,
  //     equipment: (data as any)[i].equipment_id,
  //     user: (data as any)[i].user_id,
  //     startDate: (data as any)[i].start_date,
  //     endDate: (data as any)[i].end_date,
  //     status: (data as any)[i].status,
  //   });
  // }
  return data;
};

export default data;
