import { useContext, useEffect } from "react";
import { AuthContext } from "../context";
import { useNavigate } from "react-router-dom";

export default function OnlyUnauthenticated({
  children,
}: {
  children: JSX.Element;
}) {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (authContext.token) {
      navigate("/dashboard");
    }
  }, [authContext.token]);

  if (authContext.token) return <></>;

  return children;
}
