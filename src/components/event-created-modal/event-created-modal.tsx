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

interface EventCreatedModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const EventCreatedModal: React.FC<EventCreatedModalProps> = ({
  isOpen = false,
  onClose,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} closeButton>
      <ModalContent>
        <ModalHeader>Event Created Successfully</ModalHeader>
        <ModalBody>
          <p>
            Your event has been created successfully. You can now view it on the
            home page.
          </p>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onPress={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EventCreatedModal;
