import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import {
  Avatar,
  Box,
  Container,
  Grid,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import OverviewLatestCustomers from "../../admin/sections/overview/overview-latest-customers";
import { OverviewSummary } from "../../admin/sections/overview/overview-summary";

const Page = () => {
  // const [userCount, setUserCount] = useState(0);

  // useEffect(() => {
  //   const fetchUserCount = async () => {
  //     try {
  //       const response = await fetch(
  //         "https://gray-wandering-nematode.cyclic.app/users"
  //       );
  //       const data = await response.json();
  //       setUserCount(data.length); // Count the number of users in the response array
  //     } catch (error) {
  //       console.error("Error fetching user count: ", error);
  //     }
  //   };

  //   fetchUserCount();
  // }, []);

  return (
    <>
      <Helmet>
        <title>DashBoard</title>
      </Helmet>
      <Box
        sx={{
          flexGrow: 1,
          py: 8,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Grid container spacing={3}>
              {/* <Grid item xs={12} md={4}>
                <OverviewSummary
                  icon={
                    <Avatar
                      sx={{
                        backgroundColor: "primary.main",
                        color: "primary.contrastText",
                        height: 56,
                        width: 56,
                      }}
                    >
                      <SvgIcon>
                        <PersonIcon />
                      </SvgIcon>
                    </Avatar>
                  }
                  label="Users"
                  value="5610"
                  users={userCount}
                />
              </Grid> */}

              <Grid item xs={12}>
                <OverviewLatestCustomers />
              </Grid>
            </Grid>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Page;
