import { Grid, Typography } from "@material-ui/core";
import React from "react";

function HomePage() {
  return (
    <Grid
      container
      direction="row"
      justify="space-between"
      alignItems="center"
      // style={{ height: "calc(100vh - 200px)" }}
    >
      <Grid item xs={12} lg={12} style={{ margin: "100px auto" }}>
        <img
          style={{ width: "50%", maxWidth: 300 }}
          src="https://png2.cleanpng.com/sh/b432fe4a1368b3606a2ecac4f2a38719/L0KzQYm3VcEyN5p4fZH0aYP2gLBuTfNwdZ5mhtY2a3X8PbT2jgB2fJZ3Rdtsb372PbT0hL1mgJYyeeJ5bHWwRbLtVcg2P2E6eqY8Y0ixQom3UsM6OWM2TaQBMEO8SYO3U8c0QF91htk=/kisspng-command-key-computer-icons-cmd-exe-apple-5af585705b43c8.2802391215260399203738.png"
          alt="WelcomeDevs.png"
        />
        <Typography
          variant="h3"
          style={{ color: "#57A5FF", marginTop: "40px" }}
        >
          Welcome to Developers Dashboard
        </Typography>
      </Grid>
      <Grid
        item
        container
        justify="flex-end"
        style={{ padding: "0 10px 0 10px", position: "absolute", bottom: 0 }}
      >
        <Typography variant="h6" style={{ color: "#57A5FF" }}>
          Made with love by Alex, Oliver & Tim ❤️ - Amsterdam 2020
        </Typography>
      </Grid>
    </Grid>
  );
}

export default HomePage;
