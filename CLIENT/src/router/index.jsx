import { createBrowserRouter } from "react-router-dom";
import Home from "../views/Home.tsx";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>
  },
  {
    path: "/",
    // element: < />,
  },
]);
