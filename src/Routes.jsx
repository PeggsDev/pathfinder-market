import React from "react";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import SourceBookDetailsPage from "./pages/SourceBookDetailsPage";
import ErrorPage from "./pages/ErrorPage";

export default function Routes() {

    const router = createBrowserRouter([
        {
            path: "/",
            element: <HomePage/>,
            errorElement: <ErrorPage/>
        },
        {
            path: "/source-book-details",
            element: <SourceBookDetailsPage/>,
            errorElement: <ErrorPage/>
        },
    ]);

    return (
        <RouterProvider router={router}/>
    )
}