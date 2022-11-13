import { createBrowserRouter } from "react-router-dom";
import Main from "../../../Layout/Main";
import Login from "../../LogSite/Login/Login";
import Register from "../../LogSite/Register/Register";
import Download from "../../Pages/Download/Download";
import Event from "../../Pages/Event/Event";
import Home from "../../Pages/Home/Home";
import Users from "../../Pages/Volunteer/Users";

export const router = createBrowserRouter([
    {
        path: '/', element: <Main></Main>,
        children: [
            {
                path: '/', element: <Home></Home>,
                loader: () => fetch('http://localhost:5000/movies')
            },

            {
                path: '/upload', element: <Event></Event>
            },

            {
                path: '/download', element: <Download></Download>
            },
            
            {
                path: '/users', element: <Users></Users>,
                loader: ()=> fetch('http://localhost:5000/users')
            },
            {
                path: '/login', element: <Login></Login>
            },
            {
                path: '/register', element: <Register></Register>
            },
        ]
    }
])