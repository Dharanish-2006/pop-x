import LandingPage from "./components/LandingPage";
import SignupPage from "./components/SignupPage";
import SigninPage from "./components/Signin";
import AccountSettings from "./components/AccountSettings";
import { createBrowserRouter , RouterProvider } from "react-router-dom"

function App() {
  const router = createBrowserRouter([
    {
      path:"/",
      element:<LandingPage />,
    },
    {
      path:"/signup",
      element:<SignupPage />,
    },
    {
      path:"/signin",
      element:<SigninPage />,
    },
    {
      path:"/account",
      element:<AccountSettings />,
    },
  ])
  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}

export default App
