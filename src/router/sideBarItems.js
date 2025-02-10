import Auth from "./middleware/Auth";
import UsrSuperAdmin from "./middleware/UsrSuperAdmin";
import UsrAdmin from "./middleware/UsrAdmin";
// import UsrUser from "./middleware/UsrUser";

export const getSideBarItems = () => {
  const side_bar_items = [
    {
      links: [
        {
          link: "home",
          title: "Inicio",
          icon: "mdi-home",
          show: Auth(),
        },
        {
          link: "users",
          title: "Usuarios",
          icon: "mdi-account-multiple",
          show: UsrSuperAdmin() || UsrAdmin(),
        },
      ],
    },
    { divider: true },
    // {
    //   links: [
    //     {
    //       link: "users.profile",
    //       title: "Mi perfil",
    //       icon: "mdi-card-account-details",
    //       show: UsrAdmin() || UsrUser(),
    //     },
    //   ],
    // },
    { divider: true },
  ];

  return side_bar_items;
};
