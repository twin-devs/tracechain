import {
  ToggleGroup,
  ToggleCardItem,
  Card,
  Text,
  Container,
  Button,
  Box,
  Flex,
} from "@obolnetwork/obol-ui";
import { useRouter } from "next/router";

import { useState } from "react";
import useWeb3Library from "../../hooks/useWeb3Library";

export const ToggleOptions: React.FC<{
  setValue(value: string): void;
}> = ({ setValue }) => {
  return (
    <Box>
      <ToggleGroup
        css={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "$xl",
          "& .card-heading": {
            textAlign: "center",
          },
          "@md": {
            gridTemplateColumns: "repeat(2, 1fr)",
          },
          "@sm": {
            gridTemplateColumns: "1fr",
          },
          "& button:disabled:hover": {
            background: "$bg03",
          },
          "& button:disabled": {
            "& .card-heading": {
              color: "$muted",
            },
          },
        }}
        type="single"
        aria-label="Text alignment"
        onValueChange={(value) => setValue(value)}
      >
        <ToggleCardItem
          id="register-manufacturer"
          value="/manufacturer-registration"
          aria-label="Register as Manufacturer"
        >
          <Card toggle image={null} heading="Register as Manufacturer" />
        </ToggleCardItem>
        <ToggleCardItem
          id="register-item"
          value="/item-registration"
          aria-label="Register item"
        >
          <Card toggle image={null} heading="Register item" />
        </ToggleCardItem>
        <ToggleCardItem id="attest" value="/attest" aria-label="Attest">
          <Card toggle image={null} heading="Attest" />
        </ToggleCardItem>
        <ToggleCardItem
          id="trace-history"
          value="/trace-history"
          aria-label="trace-history"
        >
          <Card toggle image={null} heading="Trace History" />
        </ToggleCardItem>
      </ToggleGroup>
    </Box>
  );
};

export const SelectForm = () => {
  const [value, setValue] = useState<string>();
  const router = useRouter();
  const { account } = useWeb3Library();

  const handleOnClick = () => {
    debugger;
    router.push({
      pathname: value || "/",
    });
  };

  return (
    <Flex direction="column" css={{ gap: "$2xl" }}>
      <Text
        variant="h3"
        css={{ "@sm": { textAlign: "center", fontSize: "$8" } }}
      >
        Welcome to Tracking Chain, select the follow option to get started
      </Text>
      <Container>
        <ToggleOptions setValue={setValue} />
        <Button
          id="get-started"
          css={{ width: "394px", "@sm": { width: "auto" } }}
          color="create"
          disabled={!value || !account}
          onClick={handleOnClick}
        >
          Get Started
        </Button>
        {!account && (
          <Text variant="metadata" color="test">
            Please select an option and connect your wallet
          </Text>
        )}
      </Container>
    </Flex>
  );
};
