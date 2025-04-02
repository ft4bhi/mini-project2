import React from "react"

export function ComponentsList() {
  // Example category data
  const categories = [
    "Article",
    "Avatar",
    "Banner",
    "Blog",
    "Breadcrumb",
    "Button",
    "Call to action",
    "Card",
    "Carousel",
    "Contact",
    "Error",
    "Faq",
    "Feature",
    "Footer",
    "Form",
    "Gallery",
    "Header",
    "Hero",
    "Input",
    "Loading",
    "Login",
    "Modal",
    "News",
    "Pagination",
    "Pricing",
    "Profile",
    "Review",
    "Shopping cart",
    "Sidebar",
    "Skeleton loader",
    "Slider",
    "Snackbar",
    "Stats",
    "Steps",
    "Table",
    "Tabs",
    "Team",
    "Testimonial",
    "Timeline",
    "Toggle",
    "Weather",
  ]

  const totalComponents = 157
  const totalCategories = 41

  return (
    <section className="w-full h-full bg-black px-4 py-8 text-white md:py-12">
      {/* Header row: Title + Subtext + Filter */}
      <h1 className="text-3xl font-bold tracking-tighter text-center mb-12">
        Featured Components
      </h1>
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h1 className="text-3xl font-bold text-teal-400 sm:text-4xl">
            Components
          </h1>
          <p className="mt-1 text-gray-300">
            {totalComponents} components in {totalCategories} categories
          </p>
        </div>
        <div className="w-full max-w-xs md:w-auto">
          <input
            type="text"
            placeholder="Filter categories..."
            className="w-full rounded-md border border-teal-600 bg-black 
                   px-3 py-2 text-sm text-white placeholder-gray-400
                   focus:outline-none focus:ring-2 focus:ring-teal-600"
          />
        </div>
      </div>

      {/* Category chips (styled like buttons) */}
      <div className="mt-6 flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            className="inline-flex items-center justify-center rounded-md
                   border border-teal-500 px-3 py-1 text-sm text-teal-400
                   transition-colors hover:bg-teal-500 hover:text-black"
          >
            {category}
          </button>
        ))}
      </div>
    </section>

  )
}
