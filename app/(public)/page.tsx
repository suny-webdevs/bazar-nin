import LatestProducts from "@/components/pages/HomePage/LatestProducts"
import PopularProducts from "@/components/pages/HomePage/PopularProducts"
import Service from "@/components/pages/HomePage/Service"

const HomePage = () => {
  return (
    <div className="space-y-10">
      <div className="h-[60vh] grid grid-cols-1 lg:grid-cols-4 gap-5">
        <div className="lg:col-span-3 h-full border rounded-xl bg-[url('/landingBanner.png')]"></div>
        <div className="flex flex-col justify-center gap-5">
          <div className="border h-full bg-amber-400 rounded-xl"></div>
          <div className="border h-full bg-blue-400 rounded-xl"></div>
        </div>
      </div>
      <Service />
      <LatestProducts />
      <PopularProducts />
    </div>
  )
}

export default HomePage
