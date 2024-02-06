import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div
      style={{
        fontFamily: "system-ui, sans-serif",
        lineHeight: "1.8",
        maxWidth: "30em",
        margin: "auto",
      }}
    >
      <h1>Welcome to Remix</h1>
      <p>
        <Link to="/test#:~:text=Highlight">Go to test route</Link>
      </p>
      <p>
        Clicking on the link above should take you to the test route and
        highlight the word "Highlight" on the page. If not visible in the
        viewport, it should also scroll to the highlighted word.
      </p>
    </div>
  );
}
