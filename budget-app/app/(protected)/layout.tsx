import type { ReactNode } from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

const navItems = ["Dashboard", "Transactions", "Budgets", "Reports"]

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-svh bg-muted/30">
      <aside className="flex w-64 flex-col border-r bg-background p-4">
        <div className="space-y-2">
          {navItems.map((item) => (
            <Button
              key={item}
              variant={item === "Dashboard" ? "secondary" : "ghost"}
              className="w-full justify-start"
            >
              {item}
            </Button>
          ))}
        </div>
        <div className="mt-auto flex items-center gap-3 rounded-lg border p-3">
          <Avatar>
            <AvatarFallback>AJ</AvatarFallback>
          </Avatar>
          <div className="text-sm">
            <p className="font-medium">Alex Johnson</p>
            <p className="text-muted-foreground">Profile placeholder</p>
          </div>
        </div>
      </aside>
      <div className="flex flex-1">{children}</div>
    </div>
  )
}