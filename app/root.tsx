import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
} from "@remix-run/react";

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}



export function ErrorBoundary() {
  const error = useRouteError();

  // when true, this is what used to go to `CatchBoundary`
  if (isRouteErrorResponse(error)) {
    return (
      <html lang="de" className="bg-background text-gray-950 scroll-smooth">
        <head>
          <Meta />
          <Links />
        </head>
        <body>
          <div className="max-w-2xl px-4 mx-auto my-16 text-center xs:px-6 lg:px-8">
            <h1 className="text-3xl font-bold xxxs:text-4xl">
              {error.status === 404 ? 'Diese Seite existiert nicht' : 'Ein Fehler ist aufgetreten'}
            </h1>
            <p className="mt-2 text-lg text-gray-500 uppercase">Status: {error.status}</p>
            {error.status !== 404 && <p className="mt-8 text-xl font-medium">{error.data.message}</p>}
            <a
              className="block px-4 py-3 mt-12 font-medium text-center text-white bg-blue-500 rounded-lg shrink-0 transition-colors duration-200 hover:bg-blue-600"
              href="/"
              title="Zur Startseite"
            >
              Zur Startseite
            </a>
          </div>
          <ScrollRestoration />
          <LiveReload />
        </body>
      </html>
    );
  }

  // Don't forget to typecheck with your own logic.
  // Any value can be thrown, not just errors!
  const errorMessage =
    error && typeof error === 'object' && 'message' in error && error.message && typeof error.message === 'string'
      ? error.message
      : 'Unknown error';

  return (
    <html lang="de" className="bg-background text-gray-950 scroll-smooth">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Links />
      </head>
      <body>
        <div className="max-w-2xl px-4 mx-auto my-16 text-center xs:px-6 lg:px-8">
          <h1 className="text-3xl font-bold xxxs:text-4xl">Ein Fehler ist aufgetreten</h1>
          <p className="mt-8 text-xl font-medium">{errorMessage}</p>
          <a
            className="block px-4 py-3 mt-12 font-medium text-center text-white bg-blue-500 rounded-lg shrink-0 transition-colors duration-200 hover:bg-blue-600"
            href="/"
            title="Zur Startseite"
          >
            Zur Startseite
          </a>
        </div>
        <ScrollRestoration />
        <LiveReload />
      </body>
    </html>
  );
}
