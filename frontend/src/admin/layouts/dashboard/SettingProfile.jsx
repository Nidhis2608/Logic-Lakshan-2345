import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import { Footer } from "./footer";
import { SideNav } from "./side-nav";
import { TopNav } from "./top-nav";

import { Helmet } from "react-helmet-async";
import { Avatar, Box, Container, Typography, Paper } from "@mui/material";

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

const ProfileContainer = styled(Paper)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(4),
  boxShadow: theme.shadows[5],
  borderRadius: theme.shape.borderRadius,
  margin: theme.spacing(2),
}));

export const SettingProfile = () => {
  // Get user info from localStorage
  const username = localStorage.getItem("username");
  const email = localStorage.getItem("email");

  return (
    <>
      <TopNav />
      <SideNav />
      <LayoutRoot>
        <LayoutContainer>
          <Helmet>
            <title>Settings | Profile</title>
          </Helmet>
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "center",
              py: 8,
            }}
          >
            <Container maxWidth="sm">
              <ProfileContainer>
                <Avatar
                  src="/assets/avatars/dummy-profile-pic.jpg" // Placeholder path for dummy profile pic
                  sx={{ width: 128, height: 128, mb: 2 }}
                />
                <Typography variant="h6" gutterBottom>
                  {username}
                </Typography>
                <Typography color="text.secondary">{email}</Typography>
              </ProfileContainer>
            </Container>
          </Box>
          <Footer />
        </LayoutContainer>
      </LayoutRoot>
    </>
  );
};

SettingProfile.propTypes = {
  children: PropTypes.node,
};
