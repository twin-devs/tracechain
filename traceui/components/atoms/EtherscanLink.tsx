import React from "react";
import { Flex, Link, Text } from "@obolnetwork/obol-ui";
import { ellipseAddress } from "../../utils/eth";
import { chainIdToExplorer } from "@constants/index";

const EtherscanLink = ({ txHash, chainId }) => {
    const etherscanBaseUrl = `${chainIdToExplorer[chainId]}/tx`; // Base URL for Etherscan transaction pages

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