export function getCurrUser() {
  const user = localStorage.getItem("ecommerceUser");
  const currUser = JSON.parse(user);
  return currUser;
}
