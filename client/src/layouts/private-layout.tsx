import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Sidebar from "./sidebar";
import { getCurrentUser } from "../api-service/users-service";
import { message } from "antd";
import usersGlobalStore, { usersStoreType } from "../store/users-store";
import Spinner from "../components/spinner";
function PrivateLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { setCurrentUser, currentUser }: usersStoreType =
    usersGlobalStore() as usersStoreType;
  const [showContent, setShowContent] = useState(false);
  const getData = async () => {
    try {
      setLoading(true);
      const response = await getCurrentUser();
      setCurrentUser(response.data);
    } catch (error: any) {
      message.error(error.message || error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      navigate("/login");
    } else {
      getData();
      setShowContent(true);
    }
  }, []);
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner />
      </div>
    );
  }
  return (
    showContent &&
    currentUser && (
      <div className="flex lg:flex-row flex-col gap-5 h-screen">
        <Sidebar />
        <div className="flex-1 lg:mt-14">{children}</div>
      </div>
    )
  );
}

export default PrivateLayout;
