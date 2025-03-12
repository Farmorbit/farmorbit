import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Tractor } from "lucide-react"
import Link from "next/link"

export default function VerifyEmailPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Link href="/" className="absolute left-4 top-4 md:left-8 md:top-8 flex items-center gap-2">
        <Tractor className="h-6 w-6 text-green-600" />
        <span className="text-xl font-bold">FarmOrbit</span>
      </Link>

      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Check your email</CardTitle>
            <CardDescription className="text-center">We've sent you a verification link</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center pt-6">
            <div className="mb-4 rounded-full bg-green-100 p-3">
              <Mail className="h-6 w-6 text-green-600" />
            </div>
            <p className="mb-4 text-center text-muted-foreground">
              We've sent a verification link to your email address. Please check your inbox and click the link to verify
              your account.
            </p>
            <p className="text-center text-sm text-muted-foreground">
              If you don't see the email, check your spam folder or try again.
            </p>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button asChild className="w-full bg-green-600 hover:bg-green-700">
              <Link href="/auth/login">Back to Login</Link>
            </Button>
            <div className="text-center text-sm">
              Didn't receive an email?{" "}
              <Link href="/auth/register" className="text-green-600 hover:underline">
                Try again
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

