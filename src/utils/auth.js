export const Auth = () => {
  const access_token = localStorage.getItem("access_token");

  const isAuthenticated = () => {
    return !!access_token;
  };

  return {
    isAuthenticated,
  };
};
