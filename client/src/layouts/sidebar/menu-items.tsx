import {
  BookCheck,
  CandlestickChart,
  Home,
  List,
  LogOut,
  User,
  UsersRound,
} from "lucide-react";

import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { message } from "antd";
import usersGlobalStore, { usersStoreType } from "../../store/users-store";
function MenuItems() {
  const location = useLocation();
  const currentPath = location.pathname;
  const iconSize = 20;
  const navigate = useNavigate();
  const { currentUser }: usersStoreType = usersGlobalStore() as usersStoreType;
  const userMenu = [
    {
      name: "Home",
      path: "/",
      icon: <Home size={iconSize} />,
      isActive: currentPath === "/",
    },
    {
      name: "Profile",
      path: "/profile",
      icon: <User size={iconSize} />,
      isActive: currentPath === "/profile",
    },
    {
      name: "Bookings",
      path: "/bookings",
      icon: <List size={iconSize} />,
      isActive: currentPath === "/bookings",
    },
    {
      name: "Reports",
      path: "/reports",
      icon: <CandlestickChart size={iconSize} />,
      isActive: currentPath === "/reports",
    },
    {
      name: "Logout",
      path: "/logout",
      icon: <LogOut size={iconSize} />,
    },
  ];
  const adminMenu = [
    {
      name: "Home",
      path: "/",
      icon: <Home size={iconSize} />,
      isActive: currentPath === "/",
    },
    {
      name: "Events",
      path: "/admin/events",
      icon: <List size={iconSize} />,
      isActive: currentPath.includes("/admin/events"),
    },
    {
      name: "Bookings",
      path: "/admin/bookings",
      icon: <BookCheck size={iconSize} />,
      isActive: currentPath.includes("/admin/bookings"),
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: <UsersRound size={iconSize} />,
      isActive: currentPath.includes("/admin/users"),
    },
    {
      name: "Reports",
      path: "/admin/reports",
      icon: <CandlestickChart size={iconSize} />,
      isActive: currentPath.includes("/admin/reports"),
    },
    {
      name: "Logout",
      path: "/logout",
      icon: <LogOut size={iconSize} />,
    },
  ];
  const onLogout = () => {
    Cookies.remove("token");
    navigate("/login");
    message.success("LogOut Successfully ");
  };
  const menuToRender = currentUser?.isAdmin ? adminMenu : userMenu;
  return (
    <div className="lg:bg-gray-200 h-full p-5 w-full">
      <div className="flex flex-col gap-2 mt-10">
        <h1 className="text-2xl font-bold text-info">
          WEBKNOT<b className="text-primary font-bold pl-2">EVENTS</b>
        </h1>
        <span className="text-sm text-gray-1000">{currentUser?.name}</span>
      </div>
      <div className="flex flex-col gap-5 mt-5">
        {menuToRender.map((item: any) => (
          <div
            className={`cursor-pointer px-5 py-3 rounded flex gap-5 text-xl items-center ${
              item.isActive ? `bg-info text-white` : ""
            }`}
            key={item.name}
            onClick={() => {
              if (item.name === "Logout") {
                onLogout();
              } else {
                navigate(item.path);
              }
            }}
          >
            <span>{item.icon}</span>
            <span>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MenuItems;
