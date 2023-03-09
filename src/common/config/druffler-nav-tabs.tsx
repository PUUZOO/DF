import staffIcon from "@/images/staff.svg";
import statisticsIcon from "@/images/statistics-black.svg";
import orderIcon from "@/images/order.svg";
import hotelIcon from "@/images/hotel-services-black.svg";

export default [
  {
    title: "accounts",
    name: "Аккаунты",
    urlPath: "/druffler/accounts",
    icon: staffIcon,
    type: "root",
  },
  // {
  //   title: "admins",
  //   name: "Администраторы",
  //   urlPath: "/druffler/admins",
  //   icon: staffIcon,
  //   type: "root",
  // },
  // {
  //   title: "stats",
  //   name: "Статистика",
  //   urlPath: "/druffler/stats",
  //   icon: statistics,
  //   type: "root",
  // },
  {
    title: "orders",
    name: "Заказы",
    urlPath: "/druffler/orders",
    icon: orderIcon,
    type: "main",
  },
  {
    title: "hotels",
    name: "Услуги и отель",
    urlPath: "/druffler/hotels",
    icon: hotelIcon,
    type: "main",
  },
  {
    title: "stuff",
    name: "Сотрудники",
    urlPath: "/druffler/staff",
    icon: staffIcon,
    type: "main",
  },
  {
    title: "statistics",
    name: "Статистика",
    urlPath: "/druffler/statistics",
    icon: statisticsIcon,
    type: "main",
  },
  {
    title: "allHotels",
    name: "Отели",
    urlPath: "/druffler/all-hotels",
    icon: hotelIcon,
    type: "main",
  },
];
