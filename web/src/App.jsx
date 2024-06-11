import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./Layout/RootLayout";
// import Dashboard from "./page/admin/Dashboard/Dashboard";
import {
  Dashboard,
  Category,
  Product,
  Member,
  Supplier,
  Expenses,
  Purchase,
  SalesList,
  NewTransaction,
  ActiveTransaction,
  Income,
  User,
  Setting,
} from "./page/admin/index";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "Category",
        element: <Category />,
      },
      {
        path: "Product",
        element: <Product />,
      },
      {
        path: "Member",
        element: <Member />,
      },
      {
        path: "Supplier",
        element: <Supplier />,
      },
      {
        path: "Expenses",
        element: <Expenses />,
      },
      {
        path: "Purchase",
        element: <Purchase />,
      },
      {
        path: "SalesList",
        element: <SalesList />,
      },
      {
        path: "NewTransaction",
        element: <NewTransaction />,
      },
      {
        path: "ActiveTransaction",
        element: <ActiveTransaction />,
      },
      {
        path: "Income",
        element: <Income />,
      },
      {
        path: "User",
        element: <User />,
      },
      {
        path: "Setting",
        element: <Setting />,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
