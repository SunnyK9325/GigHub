import React from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import './App.scss';

import Home from './pages/home/Home.jsx'
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import Gigs from './pages/gigs/Gigs';
import MyGigs from './pages/myGigs/MyGigs';
import Orders from './pages/orders/Orders';
import Messages from './pages/messages/Messages';
import Message from './pages/message/Message';
import Add from './pages/add/Add';
import Gig from './pages/gig/Gig';
import Success from './pages/success/Success';
import Pay from './pages/pay/Pay.jsx';

import {
    QueryClient,
    QueryClientProvider,
    useQuery,
} from '@tanstack/react-query'

const App = () => {
    const queryClient = new QueryClient();

    const Layout = () => {
        return (
            <div className='app'>
                <QueryClientProvider client={queryClient}>
                    <Navbar />
                    <Outlet />
                    <Footer />
                </QueryClientProvider>
            </div>
        );
    };

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout />,
            children: [
                {
                    path: "/",
                    element: <Home />,
                },
                {
                    path: "/gigs",
                    element: <Gigs />,
                },
                {
                    path: "/myGigs",
                    element: <MyGigs />,
                },
                {
                    path: "/orders",
                    element: <Orders />,
                },
                {
                    path: "/messages",
                    element: <Messages />,
                },
                {
                    path: "/message/:id",
                    element: <Message />,
                },
                {
                    path: "/add",
                    element: <Add />,
                },
                {
                    path: "/gig/:id",
                    element: <Gig />,
                },
                {
                    path: "/register",
                    element: <Register />,
                },
                {
                    path: "/login",
                    element: <Login />,
                },
                {
                    path: "/pay/:id",
                    element: <Pay />,
                },
                {
                    path: "/success",
                    element: <Success />,
                },
            ],
        },
    ]);

    return (
        <RouterProvider router={router} />
    );
}

export default App
