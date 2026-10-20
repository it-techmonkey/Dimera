import { formatPrice } from "@/lib/data";

/** Live price, with the post-launch price struck through while it differs. */
export default function Price({
  price,
  comparePrice,
}: {
  price: string;
  comparePrice?: string;
}) {
  return (
    <>
      {comparePrice && comparePrice !== price && (
        <s className="mr-2 opacity-50">
          <span className="sr-only">Was </span>
          {formatPrice(comparePrice)}
        </s>
      )}
      {comparePrice && comparePrice !== price && (
        <span className="sr-only">now </span>
      )}
      {formatPrice(price)}
    </>
  );
}
