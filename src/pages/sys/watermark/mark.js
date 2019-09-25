import React from "react";
import GitHub from "./components/github";
import Block from "dxc-flex";
import Main from "./components/content";
// import Donation from "./components/Donation";

export default class Index extends React.Component {
  render() {
    return (
      <div style={{ padding: 15 }}>
        {/* <Block vertical="center" horizontal="center">
          <GitHub />
        </Block> */}
        <Main />
        {/* <Donation /> */}
      </div>
    );
  }
}
