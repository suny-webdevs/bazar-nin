import LatestProducts from "@/components/pages/HomePage/LatestProducts"
import PopularProducts from "@/components/pages/HomePage/PopularProducts"
import Service from "@/components/pages/HomePage/Service"

const HomePage = () => {
  return (
    <div className="space-y-10">
      <div className="h-[60vh] grid grid-cols-1 lg:grid-cols-4 gap-5">
        <div className="lg:col-span-3 h-full border rounded-3xl bg-[url('/landingBanner.png')]">
          <div className="bg-amber-400/50 size-full p-10 rounded-3xl backdrop-blur-xs flex items-center justify-center">
            <h1 className="text-center font-bold text-white uppercase">
              <span className="text-7xl">Bazar Nin</span> <br />
              <span className="text-4xl tracking-wider">in your door step</span>
            </h1>
          </div>
        </div>
        <div className="flex flex-col justify-center gap-5">
          <div className="border h-full text-white bg-amber-800 rounded-3xl p-10">
            <h1 className="text-3xl font-semibold">15% OFF</h1>
          </div>
          <div className="border h-full text-white bg-blue-400 rounded-3xl p-10">
            <h1 className="text-3xl font-semibold">30% OFF</h1>
          </div>
        </div>
      </div>
      <Service />
      <LatestProducts />
      <PopularProducts />
    </div>
  )
}

export default HomePage
