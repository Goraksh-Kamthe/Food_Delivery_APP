import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SearchItemContext } from "../Contex/SearchContex";

function AuthGuard({ children }) {
  const navigate = useNavigate();
  const { isUserLoggedIn } = useContext(SearchItemContext);

  useEffect(() => {
    if (!isUserLoggedIn) {
      navigate("/login");
    }
  }, [isUserLoggedIn, navigate]);

  if (!isUserLoggedIn) {
    return null; // 
  }

  return <>{children}</>;
}

export default AuthGuard;
