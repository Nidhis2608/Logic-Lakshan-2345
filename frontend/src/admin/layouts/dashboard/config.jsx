import ChartPieIcon from "@heroicons/react/24/solid/ChartPieIcon";
import QuestionMarkCircleIcon from "@heroicons/react/24/solid/QuestionMarkCircleIcon";

import CogIcon from "@heroicons/react/24/solid/CogIcon";
import DocumentTextIcon from "@heroicons/react/24/solid/DocumentTextIcon";
import ExclamationTriangleIcon from "@heroicons/react/24/solid/ExclamationTriangleIcon";
import ShoppingCartIcon from "@heroicons/react/24/solid/ShoppingCartIcon";
import StarIcon from "@heroicons/react/24/solid/StarIcon";
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
    href: "/users",
    icon: (
      <SvgIcon>
        <ChartPieIcon />
      </SvgIcon>
    ),
    label: "Users",
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
