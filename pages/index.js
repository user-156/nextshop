import ProductCard from '../components/ProductCard';
import { getProducts } from '../lib/products';
import Head from 'next/head'
import NavBar from "../components/NavBar";

export async function getStaticProps() {
  console.log('[HomePage] getStaticProps()');
  const products = await getProducts();
  return {
    props: { products },
    revalidate: parseInt(process.env.REVALIDATE_SECONDS),
  };
}

function HomePage({ products }) {
  console.log('[HomePage] render:', products);
  return (
    <>
    <style jsx>{`
            header{
                background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://cdn-www.tiempodev.com/wp-content/uploads/2021/04/19102610/software-development-project-approval-01.png);
                background-repeat: no-repeat;
                background-size: cover;
                background-attachment: fixed;
              }
            `}</style>
    <Head>
          <title>Software - Next Shop</title>
    </Head>
    <body className="bg-indigo-300">
      <header className="w-full h-screen">
        <div>
          <NavBar />
        </div>
        <div className="w-full h-5/6 flex flex-col  items-center justify-evenly text-white">
          <p className="text-7xl text-center">
            online store website made by Next.js
          </p>
          <p className="text-6xl text-center">
            Software product Keys
          </p>
        </div>
      </header>
      <div className="text-white text-center pt-6 text-4xl">
        Available Software Keys
      </div>
      <main className="px-6 pb-4 ml-10"
      >
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-16"
        >
          {products.map((product) => (
            <li key={product.id} className="min-w-fit">
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </main>
    </body>
    </>
  );
}

export default HomePage;
