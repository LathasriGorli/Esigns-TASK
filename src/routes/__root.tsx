import { HeadContent, Outlet, Scripts, createRootRoute } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from "sonner";
import appCss from '../styles.css?url'

const queryclient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      staleTime: 1000 * 60 * 5,
      retry: false,
    },
  },
});

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Esigns',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),

  shellComponent: RootComponent,
})

function RootComponent() {
    return (
      <RootDocument>
        <QueryClientProvider client={queryclient}>
            <Outlet />
        </QueryClientProvider>
      </RootDocument>
    );
  }

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className='bg-gray-50'>
        {children}
        <Scripts />
        <Toaster position='top-center' richColors closeButton/>
      </body>
    </html>
  )
}
