import { createContext } from "react";
import { ethers, Signer } from "ethers";
import { Celeb, Organization } from "./interfaces/Database";

export const AuthContext = createContext<{
  signer: Signer | null;
  account: string | null;
  token: string | null;
  userType: "ORG" | "CELEB" | null;
  org: Organization | null;
  celeb: Celeb | null;
  provider: ethers.providers.Web3Provider | null;
  setAccount: React.Dispatch<React.SetStateAction<string | null>> | any;
  setSigner: React.Dispatch<React.SetStateAction<Signer | null>> | any;
  setToken: React.Dispatch<React.SetStateAction<string | null>> | any;
  setUserType:
    | React.Dispatch<React.SetStateAction<"ORG" | "CELEB" | null>>
    | any;
  setOrg: React.Dispatch<React.SetStateAction<Organization | null>> | any;
  setCeleb: React.Dispatch<React.SetStateAction<Celeb | null>> | any;
}>({
  account: null,
  signer: null,
  token: null,
  userType: null,
  org: null,
  celeb: null,
  provider: null,
  setAccount: null,
  setSigner: null,
  setToken: null,
  setUserType: null,
  setOrg: null,
  setCeleb: null,
});
