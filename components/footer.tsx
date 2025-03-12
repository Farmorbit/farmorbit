import Link from "next/link"
import { Tractor, Facebook, Instagram, Linkedin, Mail, Phone } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-muted py-12 border-t">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-2">
            <Link href="/" className="flex items-center gap-2">
              <Tractor className="h-6 w-6 text-green-600" />
              <span className="text-xl font-bold">FarmOrbit</span>
            </Link>
            <p className="text-sm text-muted-foreground mt-2">
              Connecting farmers with the equipment they need, when they need it.
            </p>
            <div className="flex gap-4 mt-4">
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-foreground">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/equipment" className="text-muted-foreground hover:text-foreground">
                  Browse Equipment
                </Link>
              </li>
              <li>
                <Link href="/list-equipment" className="text-muted-foreground hover:text-foreground">
                  List Your Equipment
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Equipment Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/equipment/category/tractors" className="text-muted-foreground hover:text-foreground">
                  Tractors
                </Link>
              </li>
              <li>
                <Link href="/equipment/category/harvesters" className="text-muted-foreground hover:text-foreground">
                  Harvesters
                </Link>
              </li>
              <li>
                <Link href="/equipment/category/irrigation" className="text-muted-foreground hover:text-foreground">
                  Irrigation Systems
                </Link>
              </li>
              <li>
                <Link href="/equipment/category/drones" className="text-muted-foreground hover:text-foreground">
                  Agricultural Drones
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-green-600" />
                <span className="text-muted-foreground">(123) 456-7890</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-green-600" />
                <span className="text-muted-foreground">info@farmOrbit.com</span>
              </li>
              <li className="text-muted-foreground mt-2">
                123 Farming Lane
                <br />
                Agricultural District
                <br />
                Harvest City, HC 12345
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} FarmOrbit. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
              Terms of Service
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

