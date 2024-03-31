// import { Outlet } from "react-router-dom";
// import { Layout as DashboardLayout } from "./layouts/dashboard/layout";
// import IconsPage from "../admin/pages/icons";

// import NotFoundPage from "../admin/pages/404";
// import OrdersPage from "../admin/pages/orders";
// import ReportsPage from "../admin/pages";
// import SettingsPage from "../admin/pages/settings";
// import ThemePage from "../admin/pages/theme";

// export const croute = [
//   {
//     element: (
//       <DashboardLayout>
//         <Outlet />
//       </DashboardLayout>
//     ),
//     children: [
//       {
//         index: true,
//         element: <ReportsPage />,
//       },
//       {
//         path: "orders",
//         element: <OrdersPage />,
//       },
//       {
//         path: "settings",
//         element: <SettingsPage />,
//       },
//       {
//         path: "theme",
//         element: <ThemePage />,
//       },
//       {
//         path: "icons",
//         element: <IconsPage />,
//       },
//     ],
//   },
//   {
//     path: "404",
//     element: <NotFoundPage />,
//   },
//   {
//     path: "*",
//     element: <NotFoundPage />,
//   },
// ];
// import { Outlet } from "react-router-dom";
// import { Layout as DashboardLayout } from "./layouts/dashboard/layout";
// import IconsPage from "../admin/pages/icons";
// import NotFoundPage from "../admin/pages/404";
// import OrdersPage from "../admin/pages/orders";
// import ReportsPage from "../admin/pages";
// import SettingsPage from "../admin/pages/settings";
// import ThemePage from "../admin/pages/theme";

// export const croute = [
//   {
//     path: "/admin", // Adjust the path to include "/admin"
//     element: (
//       <DashboardLayout>
//         <Outlet />
//       </DashboardLayout>
//     ),
//     children: [
//       {
//         index: true,
//         element: <ReportsPage />,
//       },
//       {
//         path: "orders",
//         element: <OrdersPage />,
//       },
//       {
//         path: "settings",
//         element: <SettingsPage />,
//       },
//       {
//         path: "theme",
//         element: <ThemePage />,
//       },
//       {
//         path: "icons",
//         element: <IconsPage />,
//       },
//     ],
//   },
//   {
//     path: "/admin/404", // Adjust the path to include "/admin"
//     element: <NotFoundPage />,
//   },
//   {
//     path: "/admin/*", // Adjust the path to include "/admin"
//     element: <NotFoundPage />,
//   },
// ];
