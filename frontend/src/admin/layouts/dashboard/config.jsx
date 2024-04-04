import ChartPieIcon from "@heroicons/react/24/solid/ChartPieIcon";
import QuestionMarkCircleIcon from "@heroicons/react/24/solid/QuestionMarkCircleIcon";
import CogIcon from "@heroicons/react/24/solid/CogIcon";
import { SvgIcon } from "@mui/material";

export const items = [
  {
    href: "/dashboard",
    icon: (
      <SvgIcon>
        <QuestionMarkCircleIcon />
      </SvgIcon>
    ),
    label: "Quizzes",
  },
  {
    href: "/settings",
    icon: (
      <SvgIcon>
        <CogIcon />
      </SvgIcon>
    ),
    label: "Profile",
  },
];

const role = localStorage.getItem("role");

if (role === "admin") {
  // Add user management item for admin
  items.splice(1, 0, {
    href: "/users",
    icon: (
      <SvgIcon>
        <ChartPieIcon />
      </SvgIcon>
    ),
    label: "Users",
  });
}
