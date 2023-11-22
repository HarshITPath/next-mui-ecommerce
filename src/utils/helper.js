export const navItems = [
  {
    key: "Home",
    value: "/",
  },
  {
    key: "Products",
    value: "/product",
  },
  {
    key: "About",
    value: "/about",
  },
  {
    key: "Contact",
    value: "/contact",
  },
  {
    key: "Profile",
    value: "/profile",
  },
  {
    key: "Cart",  
    value: "/cart",
  },
  {
    key: "Orders",  
    value: "/order-history",
  },
];

export const getToken = async () => {
  const token = localStorage.getItem("loginToken");
  console.log("Token", token)
  return JSON.parse(token)
};


export function extractDateComponents(timestamp) {
  const date = new Date(timestamp);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const NewDate = `${day}/${month}/${year}`

  return NewDate

}