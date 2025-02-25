import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/ui/mode-toggle"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">
              UI Library
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="/components" className="transition-colors hover:text-foreground/80">Components</Link>
            <Link href="/ai-generator" className="transition-colors hover:text-foreground/80">AI Generator</Link>
            <Link href="/docs" className="transition-colors hover:text-foreground/80">Documentation</Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <Button variant="outline" asChild>
              <Link href="/cli">Install CLI</Link>
            </Button>
          </div>
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}