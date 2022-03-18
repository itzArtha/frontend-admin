const isAdmin = (status) => {
  if (status === 401) {
    window.location.href = "/login";
  }
};
export default isAdmin;
