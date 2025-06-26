import { createBrowserRouter, RouterProvider } from "react-router";
import HomePage from "./pages/HomePage";
import RezeptePage from "./pages/RezeptePage";
import InfoPage from "./pages/InfoPage";
import RezeptDetailPage from "./pages/RezeptDetailPage";
import RootLayout from "./components/RootLayout";
import StandardHeaderLayout from "./components/StandardHeaderLayout";
import NeuesRezeptPage from "./pages/NeuesRezeptPage";
import LoginPage from "./pages/LoginPage";
import { AuthContextProvider } from "./context/auth-context";
import { SignupPage } from "./pages/SignupPage";
import ProfilPage from "./pages/ProfilPage";
import MeineRezeptePage from "./pages/MeineRezeptePage";

const router = createBrowserRouter([
    {
        Component: RootLayout,
        children: [
            {
                Component: StandardHeaderLayout,
                children: [
                    { path: "/", Component: HomePage },
                    { path: "/rezepte", Component: RezeptePage },
                    { path: "/info", Component: InfoPage},
                    { path: "/neuesrezept", Component: NeuesRezeptPage },
                    { path: "/login", Component: LoginPage },
                    { path: "/signup", Component: SignupPage },
                    { path: "/profil", Component: ProfilPage },
                    { path: "/meine_rezepte", Component: MeineRezeptePage },
                    { path: "/neuesrezept/:id", Component: NeuesRezeptPage },
                ],
            },
            { path: "/rezepte/:id", Component: RezeptDetailPage },
        ],
    },
]);

function App() {
    return (
        <AuthContextProvider>
            <RouterProvider router={router} />
        </AuthContextProvider>
    );
}

export default App;
