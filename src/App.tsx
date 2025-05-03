import { createBrowserRouter, RouterProvider } from "react-router";
import HomePage from "./pages/HomePage";
import RezeptePage from "./pages/RezeptePage";
import UeberUnsPage from "./pages/UeberUnsPage";
import RezeptDetailPage from "./pages/RezeptDetailPage";
import RootLayout from "./components/RootLayout";
import RecipesDetailsLayout from "./components/RecipesDetailsLayout";

const router = createBrowserRouter([
    {
        Component: RootLayout,
        children: [
            { path: "/", Component: HomePage },
            { path: "/rezepte", Component: RezeptePage },
            { path: "/ueberuns", Component: UeberUnsPage },
        ],
    },
    {
      Component: RecipesDetailsLayout,
        children: [
         { path: "/rezepte/:id", Component: RezeptDetailPage },
      ],
  },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
