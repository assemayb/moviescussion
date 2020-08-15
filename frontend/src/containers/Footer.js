import React, { Fragment } from "react";
import { Segment, List, Divider, Container } from "semantic-ui-react";
export default function Footer() {
  return (
    <>
      <Segment
        inverted
        vertical
        style={{ padding: "2rem"}}
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
    </>
  );
}
