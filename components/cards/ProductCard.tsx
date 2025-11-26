import Image from "next/image"
import { Card, CardContent, CardHeader } from "../ui/card"

const ProductCard = ({
  image,
  title,
  price,
}: {
  image: string
  title: string
  price: number
}) => {
  return (
    <Card className="border-none p-0">
      <CardHeader>
        <Image
          src={image}
          alt={title}
          width={100}
          height={100}
          className="object-cover"
        />
      </CardHeader>
      <CardContent>
        <p className="font-bold">{title}</p>
        <p>{price}</p>
      </CardContent>
    </Card>
  )
}

export default ProductCard
