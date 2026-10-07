"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// Helper text
const NO_ACCOUNT = "Don't have an account?"
const ACCOUNT = "Already have an account?"

// Button labels
const SIGN_UP = "Sign up";
const LOGIN = "Login";
const CREATE = "Create account";


export default function PublicLandingPage() {
  // form state, default login
  const [isLogin, setIsLogin] = React.useState<boolean>(true);

  return (
    <main className="flex flex-col min-h-svh items-center justify-center p-6">
      <Label className="mb-[var(--space-4)]">Welcome to Budget.jo</Label>
      
      <Card className="w-full max-w-md pt-4">
        <CardContent>
          <form className="space-y-4">
            {!isLogin ? (
              <div className="flex flex-col gap-[var(--space-2)]">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" placeholder="Alex Morgan" />
              </div>
            ) : null}
            <div className="flex flex-col gap-[var(--space-2)]">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="name@example.com" />
            </div>
            <div className="flex flex-col gap-[var(--space-2)]">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" placeholder="********" />
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <div className="w-full">
            <Button className="w-full">{isLogin ? LOGIN : CREATE}</Button>
            <span className="flex mt-[var(--space-4)] items-center justify-center gap-[var(--space-2)]">
              <p className="text-sm font-medium text-muted-foreground">{isLogin ? NO_ACCOUNT : ACCOUNT}</p>
              <Button variant="outline" className="bg-ring" onClick={() => setIsLogin((prev) => (!prev))}>{isLogin ? SIGN_UP : LOGIN}</Button>
            </span>
          </div>
        </CardFooter>
      </Card>
    </main>
  )
}