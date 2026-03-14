import { RouterProvider } from "react-router";
import { ThemeProvider } from "./components/theme-context";
import { LangProvider } from "./components/lang-context";
import { CustomCursor } from "./components/custom-cursor";
import { router } from "./routes";

export default function App() {
  return (
    <ThemeProvider>
      <LangProvider>
        <CustomCursor />
        <RouterProvider router={router} />
      </LangProvider>
    </ThemeProvider>
  );
}
