import { TiThSmallOutline } from "react-icons/ti";
import { MdFreeBreakfast, MdOutlineSoupKitchen, MdLocalPizza, MdFastfood, MdIcecream, MdLocalCafe } from "react-icons/md";
import { FaPizzaSlice, FaHamburger, FaFish, FaLeaf, FaDrumstickBite } from "react-icons/fa";
import { GiNoodles, GiHotMeal, GiCupcake, GiChopsticks } from "react-icons/gi";

export const Categories = [
  {
    id: 1,
    name: "All",
    icon: TiThSmallOutline
  },
  {
    id: 2,
    name: "Breakfast",
    icon: MdFreeBreakfast
  },
  {
    id: 3,
    name: "Soups",
    icon: MdOutlineSoupKitchen
  },
  {
    id: 4,
    name: "Pasta",
    icon: GiNoodles // ✅ Changed from GiSpaghetti
  },
  {
    id: 5,
    name: "Main Course",
    icon: GiHotMeal
  },
  {
    id: 6,
    name: "Pizza",
    icon: FaPizzaSlice
  },
  {
    id: 7,
    name: "Burger",
    icon: FaHamburger
  }
];
