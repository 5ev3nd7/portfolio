"use client"

import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"

interface MobileMenuProps {
  activeSection: string
  onNavigate: (section: string) => void
}

export function MobileMenu({ activeSection, onNavigate }: MobileMenuProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="p-2 hover:bg-muted/50 rounded-md transition-colors" aria-label="Open menu">
          <Menu className="h-5 w-5" />
        </button>
      </SheetTrigger>
      <SheetContent aria-describedby="menu">
        <SheetTitle className="sr-only">
          Menu
        </SheetTitle>
        <nav className="flex flex-col gap-6 mx-8 my-18">
          {["Intro", "About", "Experience", "Projects", "Connect"].map((section) => {
            if (section === "Intro") return null
            const isActive = activeSection === section
            return (
              <SheetTrigger key={section} asChild>
                <button
                  onClick={() => onNavigate(section)}
                  className={`text-left text-lg rounded p-2 transition-colors duration-300 ${
                    // isActive ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"
                    isActive ? "bg-foreground text-background" : "hover:text-background hover:bg-foreground"
                  }`}
                  aria-label={`Navigate to ${section}`}
                >
                  {section}
                </button>
              </SheetTrigger>
            )
          })}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
