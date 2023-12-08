// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract Tracking {
    // att contains the details of attestation by a party.
    struct att {
        address attester; // Address of attester
        uint256 timestamp; // Timestamp when the attestation was performed
    }

    // partyDetails contains all details relevant to a party.
    struct partyDetails {
        string partyID;
        string registeredAddress;
        string registrationNo;
        string GSTNumber;
    }

    // Mapping from UPC code to a list of intermediary atts.
    mapping(string => att[]) attestations;

    // Mapping from UPC code to content hash ID.
    mapping(string => string) metadata;

    // Mapping from party ETH address to party details.
    // Party is either an intermediary or a manufacturer.
    mapping(address => partyDetails) partyProfiles;
    mapping(address => bool) partyRegistered;

    // Setters

    // Only callable by parties in the supply chain.
    // This should be called once per party.
    function registerParty(
        string memory partyID,
        string memory registeredAddress,
        string memory registrationNo,
        string memory GSTNumber
    ) public {
        partyDetails memory p = partyDetails({
            partyID: partyID,
            registeredAddress: registeredAddress,
            registrationNo: registrationNo,
            GSTNumber: GSTNumber
        });

        partyProfiles[msg.sender] = p;
        partyRegistered[msg.sender] = true;
    }

    // Only callable by the manufacturer.
    function registerItem(
        string memory upcCode,
        string memory contentID
    ) public {
        if (partyRegistered[msg.sender] == false) {
            return;
        }

        att memory a = att({
            attester: msg.sender,
            timestamp: block.timestamp
        });

        attestations[upcCode].push(a);

        // Also store the content identifier (ipfs, lighthouse storage).
        metadata[upcCode] = contentID;
    }

    // Callable by intermediaries in the supply chain.
    function attest(
        string memory upcCode
    ) public {
        if (partyRegistered[msg.sender] == false) {
            return;
        }

        if (attestations[upcCode].length == 0) {
            return;
        }

        att memory a = att({
            attester: msg.sender,
            timestamp: block.timestamp
        });

        attestations[upcCode].push(a);
    }

    // Getters

    // Get history of product changing hands.
    function getHistory(string memory upcCode) public view returns (att[] memory) {
        return attestations[upcCode];
    }

    // Get content hash ID of the metadata of a product.
    function getMetadata(string memory upcCode) public view returns (string memory) {
        return metadata[upcCode];
    }

    function getPartyDetails(address partyEthAddress) public view returns (partyDetails memory) {
        return partyProfiles[partyEthAddress];
    }
}
