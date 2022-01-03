import Link from 'next/link';
import { useSignOut, useUser } from '../hooks/user';

function NavBar() {
  const user = useUser();
  const signOut = useSignOut();

  console.log('[NavBar] user:', user);
  return (
    <nav className="px-2 py-1 text-sm h-1/6 text-green-100">
      <ul className="flex gap-2">
        <li className="text-4xl font-extrabold">
          <Link href="/">
            <a className="m-3 ml-4 inline-block
                  transition duration-500 
                  hover:scale-125
                  hover:text-green-400">
              Next Shop
            </a>
          </Link>
        </li>
        <li role="separator" className="flex-1" />
        {user ? (
          <>
            <li>
              <Link href="/cart">
                <a className="text-3xl inline-block m-3 font-semibold
                transition duration-500 
                hover:scale-125
                hover:text-green-300">Cart</a>
              </Link>
            </li>
            <li>
              <button onClick={signOut} 
                className="text-3xl m-3 transition duration-500 font-semibold
                hover:scale-125
                hover:text-red-300">
                Sign out
              </button>
            </li>
          </>
        ) : (
          <li>
              <Link href="/sign-in">
                <a className="text-3xl m-3 inline-block font-semibold
                      transition duration-500 
                      hover:scale-125
                      hover:text-green-300">
                  Sign In
                </a>
              </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;
