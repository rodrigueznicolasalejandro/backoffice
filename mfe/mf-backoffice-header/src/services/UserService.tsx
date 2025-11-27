// import { secureGet } from "@link/security-module";
const apiUrls = {

  account: "/api/auth/v1/private/accounts/me",

};

export const getUserAccount = async () => {
  const url = `${apiUrls.account}`;
  // return secureGet(url);
  return "null"
};
