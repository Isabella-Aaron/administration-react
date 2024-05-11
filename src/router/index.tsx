import { createBrowserRouter } from "react-router-dom"
import Home from "@/pages/Home"
import Login from "@/pages/Login"
const routers = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        children:[]
    },
    {
        path: "/login",
        element: <Login />
    }
])

export default routers
