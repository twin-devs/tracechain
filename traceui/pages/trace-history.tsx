import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Container,
  Text,
  Button,
  Flex,
  TextField,
  Table,
  RowDef,
  ColumnDef,
} from "@obolnetwork/obol-ui";
import useWeb3Library from "@hooks/useWeb3Library";
import { getTraceHistory, getPartyDetails } from "../utils/transactions";
import { BigNumber } from "ethers";
import axios from "axios";

const BignumberToDate = (bignumber) => {
  const bigNumberTimestamp = BigNumber.from(bignumber);

  // Convert the BigNumber to a JavaScript number and then to milliseconds
  const timestampInMilliseconds = bigNumberTimestamp.toNumber() * 1000;

  // Create a new Date object
  const date = new Date(timestampInMilliseconds).toLocaleDateString();
  return date;
};

const TraceHistory = () => {
  const { account, provider } = useWeb3Library();
  const [traceHistory, setTraceHistory] = useState<RowDef<any>[]>([]);
  const [partyCollectibles, setPartyCollectibles] = useState<RowDef<any>[]>([]);
  const [transactionError, setTransactionError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setTransactionError("");
      const history = await getTraceHistory(provider, data.sku);
      console.log("history", history);
      let attestations = [];
      for (let i = 0; i < history.length; i++) {
        let attesterAddr = history[i][0];
        debugger;
        let timestamp = history[i][1];
        let timeString = BignumberToDate(timestamp);

        // Get details of the attester/party
        const partyDetails = await getPartyDetails(provider, attesterAddr);
        console.log("party details", partyDetails);

        const att = {
          partyID: partyDetails[0],
          entity: partyDetails[1],

          GSTNumber: partyDetails[3],
          date: timeString,
          registeredAddress: partyDetails.registeredAddress,
          registrationNo: partyDetails.registrationNo,
        };

        attestations.push(att);
      }

      console.log(attestations);
      debugger;
      setTraceHistory(attestations);
    } catch (error) {
      console.error("Error fetching trace history:", error);
      setTransactionError(
        error.message || "An error occurred while fetching the trace history.",
      );
    }
  };

  const onSubmit2 = async (data) => {
    const x = await axios.get("https://api.hackathon.monaverse.com/collectibles");
    console.log("x", x.data.data);

    let collectibles = [];
    for (let i = 0; i < x.data.totalCount; i++) {
      const collect = {
        artist: x.data.data[i].artist,
        title: x.data.data[i].title,
        creator: x.data.data[i].creator,
        imageURL: x.data.data[i].image
      };

      collectibles.push(collect);
    }

    setPartyCollectibles(collectibles);
  }

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "partyID",
      header: "Entity",
      css: { width: "40%" },
    },
    { accessorKey: "date", header: "Date" },
    { accessorKey: "registeredAddress", header: "Registered Address" },
    { accessorKey: "registrationNo", header: "Registered Number" },
    // Add more columns as per your trace history data structure
  ];

  const columnsCollectibles: ColumnDef<any>[] = [
    {
      accessorKey: "artist",
      header: "Artist",
      css: { width: "40%" },
    },
    { accessorKey: "title", header: "Title" },
    { accessorKey: "creator", header: "Creator" },
    { accessorKey: "imageURL", header: "Image Link" },
    // Add more columns as per your trace history data structure
  ];

  return (
      <div>
        <Box
          css={{
            display: "flex",
            px: "10%",
            py: "$5xl",
            "@sm": { px: "10%", py: "$5xl" },
            "@md": { px: "15%", py: "$5xl" },
          }}
        >
          <Container>
            <form
              style={{ alignSelf: "flex-start" }}
              onSubmit={handleSubmit(onSubmit)}
            >
              <Flex
                css={{
                  gap: "$2xl",
                  alignItems: "flex-end",
                }}
              >
                <Flex direction="column" css={{ gap: "$xxs" }}>
                  <Text>SKU Code</Text>
                  <TextField id="sku" {...register("sku", { required: true })} />
                  {errors.sku && (
                    <Text variant="metadata" color="test">
                      SKU Code is required
                    </Text>
                  )}
                </Flex>

                <Button css={{ width: "400px" }} type="submit" disabled={!account}>
                  Trace History
                </Button>
              </Flex>
            </form>

            {transactionError && (
              <Text variant="metadata" color="test">
                {transactionError}
              </Text>
            )}

            <Table rows={traceHistory} columns={columns} />
          </Container>
        </Box>

        <Box
            css={{
              display: "flex",
              px: "10%",
              py: "$5xl",
              "@sm": { px: "10%", py: "$5xl" },
              "@md": { px: "15%", py: "$5xl" },
            }}
        >
          <Container>
            <form
                style={{ alignSelf: "flex-start" }}
                onSubmit={handleSubmit(onSubmit2)}
            >
              <Flex
                  css={{
                    gap: "$2xl",
                    alignItems: "flex-end",
                  }}
              >

                <Button css={{ width: "400px" }} type="submit">
                  Party collectibles
                </Button>
              </Flex>
            </form>

            <Table rows={partyCollectibles} columns={columnsCollectibles} />
          </Container>
        </Box>
      </div>
  );
};

export default TraceHistory;
