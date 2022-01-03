import Image from 'next/image';
import Link from 'next/link';

function ProductCard({ product }) {
  return (
    <div className="border w-80 shadow transition duration-200 hover:scale-110">
      <Link href={`/products/${product.id}`}>
        <a>
          <Image src={product.pictureUrl} alt=""
            width={320} height={240}
          />
          <div className="p-2 flex justify-between items-baseline">
            <h2 className="text-lg font-bold">
              {product.title}
            </h2>
            <span>
              {product.price}
            </span>
          </div>
        </a>
      </Link>
    </div>
  );
}

export default ProductCard;
