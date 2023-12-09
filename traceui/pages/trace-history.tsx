import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Box, Container, Text, Button, Flex, TextField, Table, RowDef, ColumnDef  } from "@obolnetwork/obol-ui";
import useWeb3Library from "@hooks/useWeb3Library";
import { getTraceHistory } from "../utils/transactions";

const TraceHistory = () => {
  const { account, provider } = useWeb3Library();
  const [traceHistory, setTraceHistory] = useState<RowDef<any>[]>([]);
  const [transactionError, setTransactionError] = useState('');
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      setTransactionError('');
      const history = await getTraceHistory(provider, data.sku);
      setTraceHistory(history);
    } catch (error) {
      console.error("Error fetching trace history:", error);
      setTransactionError(error.message || 'An error occurred while fetching the trace history.');
    }
  };

  const columns: ColumnDef<any>[] = [
    { accessorKey: "entity", header: "Entity" },
    { accessorKey: "date", header: "Date" },
    { accessorKey: "details", header: "Details" },
    // Add more columns as per your trace history data structure
  ];

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
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex direction="column" css={{ gap: "$2xl" }}>
            <Flex direction="column" css={{ gap: "$xxs" }}>
              <Text>SKU Code</Text>
              <TextField
                id="sku"
                {...register("sku", { required: true })}
              />
              {errors.sku && <Text variant="metadata" color="test">SKU Code is required</Text>}
            </Flex>

            <Button type="submit" disabled={!account}>
              Trace History
            </Button>
          </Flex>
        </form>

        {transactionError && <Text variant="metadata" color="test">{transactionError}</Text>}

        <Table rows={traceHistory} columns={columns} />
      </Container>
    </Box>
  );
};

export default TraceHistory;
