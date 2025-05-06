import { createBrowserRouter, RouterProvider } from "react-router";
import HomePage from "./pages/HomePage";
import RezeptePage from "./pages/RezeptePage";
import UeberUnsPage from "./pages/UeberUnsPage";
import RezeptDetailPage from "./pages/RezeptDetailPage";
import RootLayout from "./components/RootLayout";
import StandardHeaderLayout from "./components/StandardHeaderLayout";
import NeuesRezeptPage from "./pages/NeuesRezeptPage";

const router = createBrowserRouter([
    { Component: RootLayout,
        children: [{
            
                Component: StandardHeaderLayout,
                children: [
                    { path: "/", Component: HomePage },
                    { path: "/rezepte", Component: RezeptePage },
                    { path: "/ueberuns", Component: UeberUnsPage },
                    { path: "/neuesrezept", Component: NeuesRezeptPage },
                ],
            },
            { path: "/rezepte/:id", Component: RezeptDetailPage }
        ]
    }
    
    
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
