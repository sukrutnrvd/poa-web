"use client";

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/modal";

import { Button } from "@nextui-org/button";
import React from "react";
import { useModalStore } from "@/store/modals.store";

const NftMintedModal = ({}) => {
  const { closeModal, modals } = useModalStore();
  return (
    <Modal
      isOpen={modals.nftMintedModal.isOpen}
      onClose={() => {
        closeModal("nftMintedModal");
      }}
      closeButton
    >
      <ModalContent>
        <ModalHeader>NFT Minted Successfully</ModalHeader>
        <ModalBody>
          <p>
            Your NFT has been minted successfully. Don't forget you can only
            mint one NFT per event.
          </p>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onPress={() => {
              closeModal("nftMintedModal");
            }}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NftMintedModal;
