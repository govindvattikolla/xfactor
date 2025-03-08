// src/components/Auth/ProtectedRoute.js
import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { db } from "../../firebase/firebaseConfig";

import { doc, getDoc } from "firebase/firestore";
import AuthContext from "../../context/AuthContext";

const ProtectedRoute = ({ element: Element, role, ...rest }) => {
  const { user } = useContext(AuthContext);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    if (user) {
      // Fetch role from Firestore
      const fetchUserRole = async () => {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setUserRole(userDoc.data().role);
        }
      };

      fetchUserRole();
    }
  }, [user]);

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (userRole !== role) {
    return <Navigate to="/" />;
  }

  return <Element {...rest} />;
};

export default ProtectedRoute;
