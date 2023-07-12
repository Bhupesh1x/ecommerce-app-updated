export function getCurrUser() {
  const user = localStorage.getItem("ecommerceUser");
  const currUser = user !== "undefined" ? JSON.parse(user) : undefined;
  return currUser;
}
