import type { NextPage } from "next";
import Head from "next/head";
import { Box } from "@obolnetwork/obol-ui";
import { DEFAULT_NETWORK_NAME } from "../constants";
import { SelectForm } from "@components/organisms/select-form";

const Home: NextPage = () => {
  const networkName = DEFAULT_NETWORK_NAME.toLocaleLowerCase();
  return (
    <div>
      <Head>
        <title>{`${networkName} - tracking trace`}</title>
        <meta
            name="description"
            content="Tracking chain for manufacturing and supply chain. "
          />
        <meta name="title" content={`${networkName} - tracking trace`} />
        <link rel="icon" href="/favicon.png" />       
      </Head>
      <Box
        as="main"
        css={{
          padding: "calc($lg * 5) calc($3xl * 2)",
          "@sm": {
            padding: "0 1rem",
          },
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "$4xl",
          mb: "$4xl",
        }}
      >
      <SelectForm />
      </Box>
    </div>
  );
};

export default Home;
