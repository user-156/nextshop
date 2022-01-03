import { useMutation, useQuery, useQueryClient } from 'react-query';
import { fetchJson } from '../lib/api';
import { useRouter } from 'next/router';

const USER_QUERY_KEY = 'user';

export function useRegister() {
  const queryClient = useQueryClient();
  const mutation = useMutation(({ username ,email, password }) =>
      fetchJson('http://localhost:1337/auth/local/register', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ username ,email, password })
      }))
  return {
      signIn: async (username ,email, password) => {
          try{
              const user = await mutation.mutateAsync({ username ,email, password });
              queryClient.setQueryData(USER_QUERY_KEY, user);
              return true
          } catch(err) {
              return false
          }
      },
      signInError: mutation.isError,
      signInLoading: mutation.isLoading
  }
}

export function useSignIn() {
  const queryClient = useQueryClient();
  const mutation = useMutation(({ email, password }) => fetchJson('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  }));
  return {
    signIn: async (email, password) => {
      try {
        const user = await mutation.mutateAsync({ email, password });
        queryClient.setQueryData(USER_QUERY_KEY, user);
        return true;
      } catch (err) {
        return false;
      }
    },
    signInError: mutation.isError,
    signInLoading: mutation.isLoading,
  };
}

export function useSignOut() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutation = useMutation(() => fetchJson('/api/logout'));
  return async () => {
    await mutation.mutateAsync();
    queryClient.setQueryData(USER_QUERY_KEY, undefined);
    router.push('/');
  };
}

export function useUser() {
  const query = useQuery(USER_QUERY_KEY, async () => {
    try {
      return await fetchJson('/api/user');
    } catch (err) {
      return undefined;
    }
  }, {
    cacheTime: Infinity,
    staleTime: 30_000, // ms
  });
  return query.data;
}
