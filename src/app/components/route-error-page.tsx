import { isRouteErrorResponse, useRouteError, Link } from "react-router";

export function RouteErrorPage() {
  const error = useRouteError();

  let title = "Something went wrong";
  let message = "An unexpected error happened while loading this page.";

  if (isRouteErrorResponse(error)) {
    title = `${error.status} ${error.statusText}`;
    message =
      typeof error.data === "string" && error.data
        ? error.data
        : "This route failed to load.";
  } else if (error instanceof Error && error.message) {
    message = error.message;
  }

  return (
    <main
      className="min-h-screen flex items-center justify-center px-6"
      style={{ background: "#f8f8f8", color: "#111111" }}
    >
      <section className="max-w-xl w-full rounded-2xl border border-black/10 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
        <p className="mt-3 text-base leading-relaxed text-black/75">{message}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/"
            className="rounded-lg border border-black/15 px-4 py-2 text-sm font-medium hover:bg-black/5"
          >
            Go Home
          </Link>
          <Link
            to="/projets"
            className="rounded-lg border border-black/15 px-4 py-2 text-sm font-medium hover:bg-black/5"
          >
            View Projects
          </Link>
        </div>
      </section>
    </main>
  );
}
