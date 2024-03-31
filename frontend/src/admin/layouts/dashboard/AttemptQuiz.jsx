import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import { Footer } from "./footer";
import { SideNav } from "./side-nav";
import { TopNav } from "./top-nav";
import Page from "../../pages/index";
import OrderPage from "../../pages/orders";
import Settings from "../../pages/settings";
import ThemeTemp from "../../pages/theme";
import QuizStart from "../../pages/QuizStart";

const SIDE_NAV_WIDTH = 73;
const TOP_NAV_HEIGHT = 64;

const LayoutRoot = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  display: "flex",
  flex: "1 1 auto",
  maxWidth: "100%",
  paddingTop: TOP_NAV_HEIGHT,
  [theme.breakpoints.up("lg")]: {
    paddingLeft: SIDE_NAV_WIDTH,
  },
}));

const LayoutContainer = styled("div")({
  display: "flex",
  flex: "1 1 auto",
  flexDirection: "column",
  width: "100%",
});

export const AttemptQuiz = () => {
  return (
    <>
      <TopNav />
      <SideNav />
      <LayoutRoot>
        <LayoutContainer>
          {/* <Layout /> */}

          <QuizStart />
          <Footer />
        </LayoutContainer>
      </LayoutRoot>
    </>
  );
};

AttemptQuiz.propTypes = {
  children: PropTypes.node,
};
