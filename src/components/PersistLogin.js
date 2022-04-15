import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";

const PersistLogin = () => {
  const [loading, setLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth, persist } = useAuth();

  useEffect(() => {
    let isMounted = true;
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        isMounted && setLoading(false);
      }
    };

    !auth?.accessToken && persist ? verifyRefreshToken() : setLoading(false);
    return () => (isMounted = false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log(`loading ${loading}`);
  }, [loading, auth?.accessToken]);

  return (
    <>
      {!persist 
        ? <Outlet /> 
        : loading 
          ? <p>loading...</p> 
          : <Outlet />
      }
    </>
  );
};

export default PersistLogin;
