"use client";
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ComponentsList } from "@/components/home/Component-grid"
import { ImageUploader } from "@/components/home/Image-uploader"

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-black">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center text-white">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                UI Component Library
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl dark:text-gray-400">
                Beautiful UI components with instant code access and AI-powered generation
              </p>
            </div>
            <div className="space-x-4">
              <Link href="/components">
                {/* Primary button with teal background and dark text */}
                <Button
                  size="lg"
                  className="bg-teal-500 hover:bg-teal-600 text-black font-semibold"
                >
                  Browse Components
                </Button>
              </Link>
              <Link href="/ai-generator">
                {/* Outline button with teal border/text */}
                <Button
                  variant="outline"
                  size="lg"
                  className="border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-black"
                >
                  Try AI Generator
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>


      {/* Features Grid */}
      <section className="w-full h-full   bg-gray-100 dark:bg-gray-800">


        <ComponentsList />

      </section>


      {/* AI Generation Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-black text-white">
        <div className="container px-4 md:px-6">
          <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter text-teal-400">
                AI-Powered Code Generation
              </h2>
              <p className="text-gray-300">
                Upload a UI design image and get instant, production-ready code. Our AI
                understands your design and generates clean, maintainable code.
              </p>
            </div>
            <div className="mx-auto w-full max-w-[500px]">
              <ImageUploader />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

