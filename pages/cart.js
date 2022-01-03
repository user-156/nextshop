import { useQuery } from 'react-query';
import { fetchJson } from '../lib/api';
import Head from 'next/head'
import NavBar from "../components/NavBar";
import Title from '../components/Title';

function formatCurrency(value) {
  return '$' + value.toFixed(2);
}

function buildCart(cartItems) {
  let total = 0.0;
  const items = [];
  for (const cartItem of cartItems) {
    const itemTotal = cartItem.product.price * cartItem.quantity;
    total += itemTotal;
    items.push({ ...cartItem, total: itemTotal });
  }
  return { items, total };
}

function CartTable({ cartItems }) {
  const cart = buildCart(cartItems);
  return (
    <table>
      <thead>
        <tr>
          <th className="px-4 py-2 border">
            Product
          </th>
          <th className="px-4 py-2 border">
            Price
          </th>
          <th className="px-4 py-2 border">
            Quantity
          </th>
          <th className="px-4 py-2 border">
            Total
          </th>
        </tr>
      </thead>
      <tbody>
        {cart.items.map((cartItem) => (
          <tr key={cartItem.id}>
            <td className="px-4 py-2">
              {cartItem.product.title}
            </td>
            <td className="px-4 py-2 text-right">
              {formatCurrency(cartItem.product.price)}
            </td>
            <td className="px-4 py-2 text-right">
              {cartItem.quantity}
            </td>
            <td className="px-4 py-2 text-right border">
              {formatCurrency(cartItem.total)}
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <th className="px-4 py-2 text-left border-2">
            Total
          </th>
          <th></th>
          <th></th>
          <th className="px-4 py-2 text-right border-4">
            {formatCurrency(cart.total)}
          </th>
        </tr>
      </tfoot>
    </table>
  );
}

function CartPage() {
  const query = useQuery('cartItems', () => fetchJson('/api/cart'));
  const cartItems = query.data;

  console.log('[CartPage] cartItems:', cartItems);
  return (
    <>
    <style jsx>{`
            body{
                background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(https://wallpaperaccess.com/full/2338290.jpg);
                background-repeat: no-repeat;
                background-size: cover;
                background-attachment: fixed;
              }
            `}</style>
      <body className="text-white bg-indigo-400 min-h-screen m-0 p-0">
        <Head>
          <title>Your Shopping Cart - Next Shop</title>
        </Head>
        <header>
          <NavBar />
        </header>
        <main className="px-8 py-10">
          <Title>Your Shopping Cart</Title>
          {cartItems && <CartTable cartItems={cartItems} />}
        </main>
      </body>
    </>
  );
}

export default CartPage;
