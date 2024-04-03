import ChartPieIcon from "@heroicons/react/24/solid/ChartPieIcon";
import CogIcon from "@heroicons/react/24/solid/CogIcon";
import DocumentTextIcon from "@heroicons/react/24/solid/DocumentTextIcon";
import ExclamationTriangleIcon from "@heroicons/react/24/solid/ExclamationTriangleIcon";
import ShoppingCartIcon from "@heroicons/react/24/solid/ShoppingCartIcon";
import StarIcon from "@heroicons/react/24/solid/StarIcon";
import { SvgIcon } from "@mui/material";

export const items = [
  {
    href: "/quizzes",
    icon: (
      <SvgIcon>
        <ShoppingCartIcon />
      </SvgIcon>
    ),
    label: "Quizzes",
  },
  {
    href: "/dashboard",
    icon: (
      <SvgIcon>
        <ChartPieIcon />
      </SvgIcon>
    ),
    label: "Stats",
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
  // {
  //   href: "/theme",
  //   icon: (
  //     <SvgIcon>
  //       <DocumentTextIcon />
  //     </SvgIcon>
  //   ),
  //   label: "Theme",
  // },
  {
    href: "/attemptquiz",
    icon: (
      <SvgIcon>
        <StarIcon />
      </SvgIcon>
    ),
    label: "Quiz Attempt",
  },
  // {
  //   href: "/404",
  //   icon: (
  //     <SvgIcon>
  //       <ExclamationTriangleIcon />
  //     </SvgIcon>
  //   ),
  //   label: "Error",
  // },
];
