import { useContext } from "react";
import { AuthContext } from "../../context";
import CelebrityDashboard from "./components/CelebrityDashboard";
import OrganizationDashboard from "./components/OrganizationDashboard";

export default function Dashboard() {
  const authContext = useContext(AuthContext);

  return authContext.userType == "CELEB" ? (
    <CelebrityDashboard />
  ) : (
    <OrganizationDashboard />
  );
}
