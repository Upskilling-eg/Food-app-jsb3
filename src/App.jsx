import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import ForgetPass from "./modules/AuthenticationModule/components/forgetpass/ForgetPass";
import Login from "./modules/AuthenticationModule/components/login/Login";
import Register from "./modules/AuthenticationModule/components/register/Register";
import ResetPass from "./modules/AuthenticationModule/components/resetpass/ResetPass";
import CategoriesList from "./modules/CategoriesModule/components/CategoriesList/CategoriesList";
import Dashboard from "./modules/HomeModule/components/Dashboard/Dashboard";
import RecipesList from "./modules/RecipesModule/components/RecipesList/RecipesList";
import AuthLayout from "./modules/SharedModule/components/AuthLayout/AuthLayout";
import MasterLayout from "./modules/SharedModule/components/MasterLayout/MasterLayout";
import Notfound from "./modules/SharedModule/components/Notfound/Notfound";
import ProtectedRoute from "./modules/SharedModule/components/ProtectedRoute/ProtectedRoute";
import UsersList from "./modules/UsersModule/components/UsersList/UsersList";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RecipeData from "./modules/RecipesModule/components/RecipeData/RecipeData";
import VerifyAccount from "./modules/AuthenticationModule/components/VerifyAccount/VerifyAccount";
import FavList from "./modules/FavsModule/components/FavsList/FavList";

function App() {
  let [loginData, setLoginData] = useState(null);
  let saveLoginData = () => {
    let encodedToken = localStorage.getItem("token");
    let decodedToken = jwtDecode(encodedToken);
    localStorage.setItem("userData", JSON.stringify(decodedToken));
    // console.log(decodedToken);
    setLoginData(decodedToken);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      saveLoginData();
    }
  }, []);

  let routes = createBrowserRouter([
    {
      path: "dashboard",
      element: (
        <ProtectedRoute loginData={loginData}>
          <MasterLayout loginData={loginData} />
        </ProtectedRoute>
      ),
      errorElement: <Notfound />,
      children: [
        { index: true, element: <Dashboard /> },
        // { path: "dashboard", element: <Dashboard /> },
        { path: "recipes", element: <RecipesList /> },
        { path: "recipeData", element: <RecipeData /> },
        { path: "categories", element: <CategoriesList /> },
        { path: "users", element: <UsersList /> },
        { path: "favs", element: <FavList /> },
      ],
    },
    {
      path: "/",
      element: <AuthLayout />,
      errorElement: <Notfound />,
      children: [
        { index: true, element: <Login saveLoginData={saveLoginData} /> },
        { path: "login", element: <Login saveLoginData={saveLoginData} /> },
        { path: "register", element: <Register /> },
        { path: "verifyAccount", element: <VerifyAccount /> },
        { path: "forgotpass", element: <ForgetPass /> },
        { path: "resetpass", element: <ResetPass /> },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={routes}></RouterProvider>
      <ToastContainer />
    </>
  );
}

export default App;
