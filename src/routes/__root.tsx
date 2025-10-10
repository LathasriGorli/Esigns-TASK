import { HeadContent, Outlet, Scripts, createRootRoute } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import appCss from '../styles.css?url'

const queryclient = new QueryClient();

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
      </body>
    </html>
  )
}
