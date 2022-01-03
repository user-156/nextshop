import Link from 'next/dist/client/link'
import { useRouter } from 'next/router';
import { useState } from 'react';
import Head from 'next/head'
import Button from '../components/Button';
import Field from '../components/Field';
import Input from '../components/Input';
import { useSignIn } from '../hooks/user';
import NavBar from '../components/NavBar';
import Title from '../components/Title';

function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, signInError, signInLoading } = useSignIn();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const valid = await signIn(email, password);
    if (valid) {
      router.push('/');
    }
  };

  return (
    <>
      <style jsx>{`
            body{
                margin: 0px;
                background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://itbrief.com.au/uploads/story/2021/03/23/GettyImages-1177116437.webp);
                background-repeat: no-repeat;
                background-size: cover;
                background-attachment: fixed;
              }
                form{
                    background-color: rgba(27, 27, 50,0.5);
                }
            `}</style>
      <Head>
        <title>Sign In - Next Shop</title>
      </Head>
      <body className="min-w-full min-h-screen">
        <header className="text-white">
          <NavBar />
        </header>
        <main className="px-6 py-4">
          <div className="text-white text-center">
            <Title>Sign In</Title>
          </div>
          <div className="text-xl max-w-2xl m-auto rounded">
            <form onSubmit={handleSubmit} className="pt-2 m-auto pb-5 text-white">
              <Field label="Email">
                <Input type="email" required value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </Field>
              <Field label="Password">
                <Input type="password" required value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </Field>
              {signInError && (
                <p className="text-red-700 ml-10">
                  Invalid credentials
                </p>
              )}
              {signInLoading ? (
                <p className="ml-10">Loading...</p>
              ) : (
                <div className="ml-10">
                  <Button type="submit">
                    Sign In
                  </Button>
                </div>
              )}
              <br/><br/>
              <Link href="/register">
                  <a className="pl-10 inline-block
                  transition duration-500 
                  hover:translate-y-2
                  hover:text-green-300">
                      Register here
                  </a>
              </Link>
            </form>
          </div>
        </main>
      </body>
    </>
  );
}

export default SignInPage;
