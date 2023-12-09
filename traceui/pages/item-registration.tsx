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
import useWeb3Library from "@hooks/useWeb3Library";
import { registerItemOnChain } from "@utils/transactions";

const ItemRegistration = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { account, provider } = useWeb3Library();

  const onSubmit = async (data) => {
    try {
      console.log(data);
      const txHash = await registerItemOnChain(provider, data);
      console.log("Transaction Hash:", txHash);
    } catch (error) {
      console.error("Submission Error:", error);
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
        <Text variant="h3">Item Registration</Text>
        <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
          <Flex direction="column" css={{ gap: "$2xl" }}>
            <Flex direction="column" css={{ gap: "$xxs" }}>
              <Text>SKU Code</Text>
              <TextField
                id="skuCode"
                {...register("skuCode", { required: true })}
              />
              {errors.skuCode && (
                <Text variant="metadata" color="test">
                  This field is required
                </Text>
              )}
            </Flex>

            <Flex direction="column" css={{ gap: "$xxs" }}>
              <Text>Manufacturing Date</Text>
              <TextField
                type="date"
                id="manufacturingDate"
                {...register("manufacturingDate", { required: true })}
              />
              {errors.manufacturingDate && (
                <Text variant="metadata" color="test">
                  This field is required
                </Text>
              )}
            </Flex>

            <Flex direction="column" css={{ gap: "$xxs" }}>
              <Text>Expiry Date</Text>
              <TextField
                type="date"
                id="expiryDate"
                {...register("expiryDate", { required: true })}
              />
              {errors.expiryDate && (
                <Text variant="metadata" color="test">
                  This field is required
                </Text>
              )}
            </Flex>

            <Flex direction="column" css={{ gap: "$xxs" }}>
              <Text>Manufacturing Address</Text>
              <TextField
                id="manufacturingAddress"
                {...register("manufacturingAddress", { required: true })}
              />
              {errors.manufacturingAddress && (
                <Text variant="metadata" color="test">
                  This field is required
                </Text>
              )}
            </Flex>

            <Button type="submit" disabled={!account}>
              Register Item
            </Button>
          </Flex>
        </form>
      </Container>
    </Box>
  );
};

export default ItemRegistration;
