import {createHashRouter, Outlet} from "react-router";
// import IntroPage from "./pages/IntroPage";
import HomePage from "../pages/HomePage";
import CategoryPage from "../pages/CategoryPage";
import ProblemPage from "../pages/ProblemPage";
import NotFoundPage from "../pages/NotFoundPage";
import IntroPage from "../pages/IntroPage.tsx";
import Titlebar from "../titlebar.tsx";

function RootLayout() {
    return (
        <div className="bg-dark text-light">
            <Titlebar/>
            <Outlet />
        </div>
    );
}

export const router = createHashRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            { index: true, element: <IntroPage /> },
            { path: "home", element: <HomePage /> },
            { path: "category/:categoryId", element: <CategoryPage /> },
            { path: "problem/:problemId", element: <ProblemPage /> },
            { path: "*", element: <NotFoundPage /> },
        ],
    },
]);

export default router;
