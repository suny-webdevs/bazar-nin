import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const LatestProducts = () => {
  return (
    <div>
      <h1 className="text-center text-xl text-primary font-bold">
        Latest Products
      </h1>
      <Carousel className="w-full relative">
        <CarouselContent className="mt-10">
          {Array.from({ length: 15 }).map((_, index) => (
            <CarouselItem
              key={index}
              className="pl-5 md:basis-1/5 lg:basis-1/7"
            >
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-2xl font-semibold">{index + 1}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute top-0 right-14">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </Carousel>
    </div>
  )
}

export default LatestProducts
