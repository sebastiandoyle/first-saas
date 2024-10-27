import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { useState } from 'react';
import { NextComponentType } from 'next';
import { AppProps } from 'next/app';

interface CustomAppProps extends AppProps {
  Component: NextComponentType;
}

export default function App({ Component, pageProps }: CustomAppProps) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  return (
    <SessionContextProvider supabaseClient={supabaseClient}>
      <Component {...pageProps} />
    </SessionContextProvider>
  );
}
