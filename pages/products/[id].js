import Link from 'next/dist/client/link'
import Image from 'next/image';
import AddToCartWidget from '../../components/AddToCartWidget';
import Head from 'next/head'
import NavBar from "../../components/NavBar.js";
import Title from '../../components/Title';
import { useUser } from '../../hooks/user';
import { ApiError } from '../../lib/api';
import { getProduct, getProducts } from '../../lib/products';
import Button from '../../components/Button';

export async function getStaticPaths() {
  const products = await getProducts();
  return {
    paths: products.map((product) => ({
      params: { id: product.id.toString() },
    })),
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params: { id } }) {
  try {
    const product = await getProduct(id);
    return {
      props: { product },
      revalidate: parseInt(process.env.REVALIDATE_SECONDS),
    };
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) {
      return { notFound: true };
    }
    throw err;
  }
}

function ProductPage({ product }) {
  const user = useUser();

  console.log('[ProductPage] render:', product);
  return (
    <>
      <Head>
        <title>{product.title} - Next Shop</title>
      </Head>
      <body className="bg-indigo-400 min-h-screen text-white">
        <header>
          <NavBar />
        </header>
        <main className="px-6 py-4">
          <Title>{product.title}</Title>
          <div className="flex flex-col lg:flex-row">
            <div>
              <Image src={product.pictureUrl} alt=""
                width={640} height={480}
              />
            </div>
            <div className="flex-1 lg:ml-4">
              <p className="text-sm">
                {product.description}
              </p>
              <p className="text-lg font-bold mt-2">
                {product.price}
              </p>
              {
                !user && 
                <div className="py-2 text-black">
                  <Button>
                    <Link href="/sign-in">
                      <a> Buy </a>
                    </Link>
                  </Button>
                </div>
              }
              {user && <AddToCartWidget productId={product.id} />}
            </div>
          </div>
        </main>
      </body>
    </>
  );
}

export default ProductPage;
