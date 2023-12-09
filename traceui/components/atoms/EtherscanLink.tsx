import React from "react";
import { Flex, Link, Text } from "@obolnetwork/obol-ui";
import { ellipseAddress } from "../../utils/eth";

const EtherscanLink = ({ txHash }) => {
    const etherscanBaseUrl = `${process.env.NEXT_PUBLIC_ETHERSCAN}/tx`; // Base URL for Etherscan transaction pages

    return (
        <Flex css={{ alignItems: "center", gap: "$xxxs" }}>
            <Text variant="body">Transaction Hash:</Text>
            <Link
                href={`${etherscanBaseUrl}/${txHash}`}
                target="_blank"
                rel="noopener noreferrer"
            >
                {ellipseAddress(txHash)}
            </Link>
        </Flex>
    );
};

export default EtherscanLink;