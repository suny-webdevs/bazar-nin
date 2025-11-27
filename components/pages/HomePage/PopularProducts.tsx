import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { ChevronsRight } from "lucide-react"
import Link from "next/link"

const PopularProducts = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-center text-3xl text-primary font-bold">
        Popular Products
      </h1>
      <Carousel className="w-full relative">
        <CarouselContent className="mt-10">
          {Array.from({ length: 15 }).map((_, index) => (
            <CarouselItem
              key={index}
              className="pl-5 basis-1/2 md:basis-1/5 lg:basis-1/7"
            >
              <div className="p-0">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-2xl font-semibold">{index + 1}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute top-0 right-3 lg:right-14">
          <div className="w-[9rem] absolute top-0 right-0 lg:right-16 flex items-center justify-end">
            <Link
              href={"#"}
              className="flex items-center gap-2 text-primary text-sm capitalize"
            >
              View all <ChevronsRight className="size-5" />
            </Link>
          </div>
          <div className="hidden lg:block absolute top-2 right-0">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </div>
      </Carousel>
    </div>
  )
}

export default PopularProducts
