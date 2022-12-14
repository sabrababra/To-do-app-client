import { createBrowserRouter } from "react-router-dom";
import Login from "../Pages/Login";
import Main from "../Pages/Main";
import Todo from "../Pages/Todo";
import PrivateRoute from "./PrivateRoute";


export const router= createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Login></Login>
            },
            {
                path: '/todo',
                element: <PrivateRoute><Todo></Todo></PrivateRoute>
            },
        ]
    }
])