import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Box, Container, Text, Button, Flex, TextField } from "@obolnetwork/obol-ui";
import useWeb3Library from "@hooks/useWeb3Library";
import { ConnectWalletButton } from "@components/atoms/ConnectWalletButton";
import { intermediaryAttestation, isPartyRegistered } from "@utils/transactions";

const Attest = () => {
  const { account, provider } = useWeb3Library();
  const [isManufacturer, setIsManufacturer] = useState(false);
  const [transactionError, setTransactionError] = useState('');
  const { register, handleSubmit, formState: { errors } } = useForm();

//   const checkManufacturerStatus = async () => {
//     if (account) {
//       // Call your smart contract method to verify if the account is a Manufacturer/Distributor
//       const status = await isPartyRegistered(provider, account);
//       setIsManufacturer(status);
//     }
//   };

//   useEffect(() => {
//     checkManufacturerStatus();
//   }, [account]);

  const onSubmit = async (data) => {
    try {
      if (account) {
        // Implement your logic to sign the SKU
        console.log("Signing SKU with data:", data);

        const attest = await intermediaryAttestation(provider, data.skuCode);
        // Clear any previous transaction errors
        setTransactionError('');
        console.log("Transaction Hash:", attest);
      }
    } catch (error) {
      console.error("Transaction Error:", error);
      setTransactionError(error.message || 'An error occurred during the transaction.');
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
        {account ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Flex direction="column" css={{ gap: "$2xl" }}>
              <Text variant="h3">
                {isManufacturer ? "Manufacturer/Distributor" : "Not a Manufacturer/Distributor"}
              </Text>

              <Flex direction="column" css={{ gap: "$xxs" }}>
                <Text>SKU Code</Text>
                <TextField
                  id="skuCode"
                  {...register("skuCode", { required: true })}
                />
                {errors.skuCode && <Text variant="metadata" color="test">SKU Code is required</Text>}
              </Flex>

              {transactionError && <Text variant="metadata" color="test">{transactionError}</Text>}

              <Button type="submit" disabled={!account}>
                Sign SKU
              </Button>
            </Flex>
          </form>
        ) : (
          <ConnectWalletButton />
        )}
      </Container>
    </Box>
  );
};

export default Attest;