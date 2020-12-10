import { Grid } from "@material-ui/core";
import React from "react";

function HomePage() {
  return (
    <Grid
      item
      container
      direction="column"
      justify="center"
      alignItems="center"
      style={{ height: 800 }}
    >
      <Grid item xs={5}>
        <img
          style={{ width: "60%" }}
          src="https://png2.cleanpng.com/sh/b432fe4a1368b3606a2ecac4f2a38719/L0KzQYm3VcEyN5p4fZH0aYP2gLBuTfNwdZ5mhtY2a3X8PbT2jgB2fJZ3Rdtsb372PbT0hL1mgJYyeeJ5bHWwRbLtVcg2P2E6eqY8Y0ixQom3UsM6OWM2TaQBMEO8SYO3U8c0QF91htk=/kisspng-command-key-computer-icons-cmd-exe-apple-5af585705b43c8.2802391215260399203738.png"
          alt=""
        />
        <h1 style={{ color: "#57A5FF" }}>Welcome to Developers Dashboard</h1>
      </Grid>
    </Grid>
  );
}

export default HomePage;
