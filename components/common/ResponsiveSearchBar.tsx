"use client"
import { useState, useEffect } from "react"
import { Search } from "lucide-react"

export function ResponsiveSearch() {
  const [showSearch, setShowSearch] = useState(false)

  useEffect(() => {
    const heroHeight = window.innerHeight

    const handleScroll = () => {
      const scrollY = window.scrollY

      if (scrollY >= heroHeight / 2) {
        setShowSearch(true)
      } else {
        setShowSearch(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {showSearch && (
        <div className="w-full lg:w-[30rem] xl:w-[50rem] lg:flex items-center gap-2 bg-white rounded-full pr-1">
          <input
            type="search"
            name="search"
            placeholder="Search products (e.g. eggs, milk, potato)"
            className="w-full px-5 py-3 text-gray-900 placeholder:text-gray-500 focus:ring-0 focus:outline-0"
          />
          <button className="px-3 py-2 cursor-pointer bg-primary hover:bg-primary/90 text-white rounded-full">
            <Search />
          </button>
        </div>
      )}
    </>
  )
}
