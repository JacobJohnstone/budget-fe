"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import { login, signup } from "@/api/authentication"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { getErrorMessage } from "@/api"

// Helper text
const NO_ACCOUNT = "Don't have an account?"
const ACCOUNT = "Already have an account?"

// Button labels
const SIGN_UP = "Sign up";
const LOGIN = "Login";
const CREATE = "Create account";
const LOADING = "Please wait...";

const FORM_ID = "auth-form";
const WARNING_ID = "auth-validation-warning";
const DASHBOARD_ROUTE = "/dashboard";

/**
 * The public landing page, rendering a sign in/sign up form for new or returning users.
 * Handles sign up and login requests.
 */
export default function PublicLandingPage() {
  const router = useRouter();

  // form state, default login
  const [isLogin, setIsLogin] = React.useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const [warning, setWarning] = React.useState<{ field: string; message: string } | null>(null);

  // handlers
  const handleToggle = () => {
    setError(null);
    setWarning(null);
    setIsLogin((prev) => !prev);
  }

  // prevent ugly default form validation pop-over to use clean warning text
  // validates things like email format and password length
  const handleInvalid = (event: React.InvalidEvent<HTMLFormElement>) => {
    event.preventDefault();

    const input = event.target;
    if (input instanceof HTMLInputElement && input === event.currentTarget.querySelector("input:invalid")) {
      setError(null);
      setWarning({ field: input.id, message: input.validationMessage });
      input.focus();
    }
  }

  /**
   * Handles submitting the sign in or login form, calling the backend and passing credentials.
   * @param event the event triggered from form submission
   */
  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    // prevent auto page reload as no action is present
    event.preventDefault();
    
    // reset error state, start loading state
    setError(null);
    setWarning(null);
    setIsSubmitting(true);

    // get the form object
    const formData = new FormData(event.currentTarget);

    // extract the details based on form field DOM names and remove any whitespace
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const firstName = String(formData.get("firstName") ?? "").trim();
    const lastName = String(formData.get("lastName") ?? "").trim();

    // submit POST request on sign up/login
    try {
      if (!isLogin) {
        await signup({
          firstName,
          lastName,
          email,
          password,
        });
      } else {
        await login({ email, password });
      }

      router.push(DASHBOARD_ROUTE);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="flex flex-col min-h-svh items-center justify-center p-6">
      <Label className="mb-[var(--space-4)]">Welcome to Budget.jo</Label>
      
      <Card className="w-full max-w-md pt-4">
        <CardContent>
          <form id={FORM_ID} className="space-y-4" onSubmit={handleSubmit} onInvalid={handleInvalid} onInput={() => setWarning(null)}>
            {!isLogin ? (
              <div className="flex gap-[var(--space-2)]">
                <div className="flex flex-1 flex-col gap-[var(--space-2)]">
                  <Label htmlFor="firstName">First name</Label>
                  <Input id="firstName" name="firstName" placeholder="Alex" autoComplete="given-name" required maxLength={50} aria-describedby={warning?.field === "firstName" ? WARNING_ID : undefined} />
                </div>
                <div className="flex flex-1 flex-col gap-[var(--space-2)]">
                  <Label htmlFor="lastName">Last name</Label>
                  <Input id="lastName" name="lastName" placeholder="Morgan" autoComplete="family-name" required maxLength={50} aria-describedby={warning?.field === "lastName" ? WARNING_ID : undefined} />
                </div>
              </div>
            ) : null}
            <div className="flex flex-col gap-[var(--space-2)]">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="name@example.com" autoComplete="email" required maxLength={50} aria-describedby={warning?.field === "email" ? WARNING_ID : undefined} />
            </div>
            <div className="flex flex-col gap-[var(--space-2)]">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="********"
                autoComplete={isLogin ? "current-password" : "new-password"}
                required
                minLength={8}
                maxLength={50}
                aria-describedby={warning?.field === "password" ? WARNING_ID : undefined}
              />
            </div>
            {warning ? (
              <p id={WARNING_ID} role="alert" className="text-sm font-medium text-amber-700 dark:text-amber-400">{warning.message}</p>
            ) : null}
            {error ? (
              <p role="alert" className="text-sm font-medium text-destructive">{error}</p>
            ) : null}
          </form>
        </CardContent>
        <CardFooter>
          <div className="w-full">
            <Button type="submit" form={FORM_ID} className="w-full" disabled={isSubmitting}>
              {isSubmitting ? LOADING : isLogin ? LOGIN : CREATE}
            </Button>
            <span className="flex mt-[var(--space-4)] items-center justify-center gap-[var(--space-2)]">
              <p className="text-sm font-medium text-muted-foreground">{isLogin ? NO_ACCOUNT : ACCOUNT}</p>
              <Button type="button" variant="outline" className="bg-ring" onClick={handleToggle} disabled={isSubmitting}>{isLogin ? SIGN_UP : LOGIN}</Button>
            </span>
          </div>
        </CardFooter>
      </Card>
    </main>
  )
}