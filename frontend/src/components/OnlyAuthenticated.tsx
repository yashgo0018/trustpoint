import { useContext, useEffect } from "react";
import { AuthContext } from "../context";
import { useNavigate } from "react-router-dom";

export default function OnlyAuthenticated({
  children,
}: {
  children: JSX.Element;
}) {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authContext.token) {
      navigate("/");
    }
  }, [authContext.token]);

  if (!authContext.token) return <></>;
  return children;
}
