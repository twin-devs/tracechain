/* eslint-disable @next/next/google-font-display */
import React from "react";
import NextDocument, { Html, Head, Main, NextScript } from "next/document";
import { getCssText, styled } from "@obolnetwork/obol-ui";

const Body = styled("body", {
  fontFamily: "'DM Sans', sans-serif",
});

export default class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head>
          <style id="obol" dangerouslySetInnerHTML={{ __html: getCssText() }} />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400;1,500&display=block"
            rel="stylesheet"
          />
        </Head>
        <Body>
          <Main />
          <NextScript />
        </Body>
      </Html>
    );
  }
}
