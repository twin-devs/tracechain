import React from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Container,
  TextField,
  Flex,
  Text,
  Button,
} from "@obolnetwork/obol-ui";
import { registerParty } from "../utils/transactions";
import useWeb3Library from "@hooks/useWeb3Library";

const ManufacturerRegistration = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { account, provider } = useWeb3Library();

  const onSubmit = async (data) => {
    try {
      console.log(data);
      const txHash = await registerParty(provider, data);
      console.log("Transaction Hash:", txHash);
    } catch (error) {
      console.error("Transaction Error:", error);
    }
  };

  return (
    <Box
      css={{
        display: "flex",
        px: "25%",
        py: "$5xl",
        "@sm": { px: "10%", py: "$5xl" },
        "@md": { px: "15%", py: "$5xl" },
      }}
    >
      <Container>
        <Text variant="h3">Manufacturer Registration</Text>
        <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
          <Flex direction="column" css={{ gap: "$2xl" }}>
            <Flex direction="column" css={{ gap: "$xxs" }}>
              <Text>Registered Address</Text>
              <TextField
                id="registeredAddress"
                {...register("registeredAddress", { required: true })}
              />
              {errors.registeredAddress && (
                <Text variant="metadata" color="test">
                  This field is required
                </Text>
              )}
            </Flex>

            <Flex direction="column" css={{ gap: "$xxs" }}>
              <Text>Registration Number</Text>
              <TextField
                id="registrationNumber"
                {...register("registrationNumber", { required: true })}
              />
              {errors.registrationNumber && (
                <Text variant="metadata" color="test">
                  This field is required
                </Text>
              )}
            </Flex>

            <Flex direction="column" css={{ gap: "$xxs" }}>
              <Text>GST Number</Text>
              <TextField
                id="gstNumber"
                {...register("gstNumber", { required: true })}
              />
              {errors.gstNumber && (
                <Text variant="metadata" color="test">
                  This field is required
                </Text>
              )}
            </Flex>

            <Button type="submit" disabled={!account}>
              Register
            </Button>
          </Flex>
        </form>
      </Container>
    </Box>
  );
};

export default ManufacturerRegistration;
