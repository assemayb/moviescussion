import React, { Fragment } from "react";
import { Segment, List, Divider, Container } from "semantic-ui-react";
export default function Footer() {
  return (
    <Fragment>
      <Segment
        inverted
        vertical
        style={{ margin: "5em 0em 0em", padding: "5em 0em" }}
      >
        <Container textAlign="center">
          <Divider inverted section />
          {/* <Image centered size="mini" src="/logo.png" /> */}
          <List horizontal inverted divided link size="small">
            <List.Item as="a" href="/login">
              Movies and stuff
            </List.Item>
          </List>
        </Container>
      </Segment>
    </Fragment>
  );
}
