import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchContex from "../Contex/SearchContex";

function AuthGuard({ component }) {
  const navigate = useNavigate();
  const { isUserLoggedIn } = useContext(SearchContex);
  useEffect(() => {
    if (!isUserLoggedIn) {
      navigate("/");
    }
  }, []);
  return <>{component}</>;
}

export default AuthGuard;
