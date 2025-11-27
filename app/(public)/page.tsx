import LatestProducts from "@/components/pages/HomePage/LatestProducts"
import PopularProducts from "@/components/pages/HomePage/PopularProducts"
import Service from "@/components/pages/HomePage/Service"
import { Search } from "lucide-react"

const HomePage = () => {
  return (
    <div className="space-y-20">
      <div className="space-y-10">
        <div className="h-[60vh] grid grid-cols-1 lg:grid-cols-4 gap-5">
          <div className="lg:col-span-3 h-full border rounded-3xl bg-[url('/landingBanner.png')]">
            <div className="bg-primary/50 size-full p-10 rounded-3xl backdrop-blur-xs flex flex-col items-center justify-center gap-5">
              <h1 className="text-4xl md:text-7xl text-center font-bold text-white uppercase">
                Bazar Nin
              </h1>
              <div className="w-full lg:w-[38rem] xl:w-[50rem] flex items-center gap-2 bg-white rounded-full pr-2">
                <input
                  type="search"
                  name="search"
                  placeholder="Search products (e.g. eggs, milk, potato)"
                  className="w-full px-5 py-4 text-xl text-gray-900 placeholder:text-gray-500 focus:ring-0 focus:outline-0"
                />
                <button className="px-5 py-3 cursor-pointer bg-primary hover:bg-primary/90 text-white rounded-full">
                  <Search />
                </button>
              </div>
            </div>
          </div>
          <div className="lg:flex lg:flex-col lg:justify-center lg:gap-5 hidden">
            <div className="border h-full text-white bg-amber-800 rounded-3xl p-10">
              <h1 className="text-3xl font-semibold">15% OFF</h1>
            </div>
            <div className="border h-full text-white bg-blue-400 rounded-3xl p-10">
              <h1 className="text-3xl font-semibold">30% OFF</h1>
            </div>
          </div>
        </div>
        <Service />
      </div>
      <LatestProducts />
      <PopularProducts />
    </div>
  )
}

export default HomePage
