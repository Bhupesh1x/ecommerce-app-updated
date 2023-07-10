export function getCurrUser() {
  const currUser = JSON.parse(localStorage.getItem("ecommerceUser"));
  return currUser;
}
