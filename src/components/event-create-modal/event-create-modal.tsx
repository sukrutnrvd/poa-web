"use client";

import { Controller, useForm } from "react-hook-form";
import { Input, Textarea } from "@nextui-org/input";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import React, { useEffect, useState } from "react";
import { getLocalTimeZone, now, today } from "@internationalized/date";

import { BigNumberish } from "ethers";
import { Button } from "@nextui-org/button";
import { DateInput } from "@nextui-org/date-input";
import EventCreatedModal from "../event-created-modal/event-created-modal";
import { EventLog } from "ethers";
import MerkleTree from "merkletreejs";
import { createEvent } from "./event-create-modal.action";
import { handleContractErrors } from "@/utils/handle-contract-errors";
import { keccak256 } from "ethers";
import { triggerConfetti } from "@/utils/trigger-confetti";
import { useAppKitAccount } from "@reown/appkit/react";
import { useEventsStore } from "@/store/events.store";
import { useModalStore } from "@/store/modals.store";
import { usePoaContractStore } from "@/store/poa-contract.store";

export interface EventFormData {
  name: string;
  metadataURI: string;
  whitelist: string;
  date: Date;
}

const EventCreateModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<EventFormData>();

  const {
    state: { contract },
  } = usePoaContractStore();

  const { address } = useAppKitAccount();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { fetchEvents } = useEventsStore();

  const handleFormSubmit = async (data: EventFormData) => {
    setIsLoading(true);

    const leaves = data.whitelist
      .split("\n")
      .map((address) => keccak256(address.toLowerCase().trim()));
    const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });
    const root = tree.getRoot();

    const unixDate = new Date(data.date).getTime() / 1000;

    try {
      const contractResponse = await contract?.createEvent(
        data.name,
        data.metadataURI,
        unixDate,
        root
      );

      const receipt = await contractResponse.wait();

      if (receipt.status === 1) {
        const event: EventLog = receipt.logs?.find(
          (event: EventLog) => event.fragment.name === "EventCreated"
        );

        const eventId = event?.args[0] as BigNumberish;

        if (eventId) {
          createEvent({
            date: data.date,
            eventId: +eventId.toString(),
            metadataURI: data.metadataURI,
            name: data.name,
            owner: address!,
            whitelist: data.whitelist,
          }).then(() => {
            fetchEvents();
            triggerConfetti(5);
            onOpen();
            closeModal("createEventModal");
            setIsLoading(false);
            reset();
          });
        }
      }
    } catch (error) {
      console.log(error);
      handleContractErrors(error as Error);
      setIsLoading(false);
    }
  };

  const { modals, closeModal } = useModalStore();

  return (
    <>
      <Modal
        isOpen={isLoading ? true : modals.createEventModal.isOpen}
        onClose={() => closeModal("createEventModal")}
        classNames={{
          base: "m-0 rounded-b-none sm:rounded-lg",
        }}
        closeButton
      >
        <ModalContent>
          <ModalHeader>Create New Event</ModalHeader>
          <ModalBody>
            <form
              id="event-create-form"
              className="flex flex-col gap-4"
              onSubmit={handleSubmit(handleFormSubmit)}
            >
              <Input
                label="Event Name"
                placeholder="Enter event name"
                {...register("name", { required: "Event name is required" })}
                errorMessage={errors.name?.message}
                isInvalid={!!errors.name}
              />
              <Input
                label="Metadata URI"
                placeholder="Enter metadata URI (e.g., ipfs://...)"
                {...register("metadataURI", {
                  required: "Metadata URI is required",
                  pattern: {
                    value: /^ipfs:\/\/.+$/,
                    message: "Please enter a valid IPFS URI",
                  },
                })}
                errorMessage={errors.metadataURI?.message}
                isInvalid={!!errors.metadataURI}
              />

              <Textarea
                label="Whitelist"
                {...register("whitelist", {
                  required: "Whitelist is required",
                  validate: (value) => {
                    const addresses = value
                      .replace(/\r\n/g, "\n")
                      .split("\n")
                      .map((address) => address.trim());

                    let isValid = true;
                    addresses.forEach((address) => {
                      if (!address.match(/^(0x)?[0-9a-fA-F]{40}$/)) {
                        isValid = false;
                      }
                    });
                    return isValid || "Please enter a valid Ethereum address";
                  },
                })}
                errorMessage={errors.whitelist?.message}
                isInvalid={!!errors.whitelist}
                placeholder="Whitelist addresses"
              />
              <Controller
                control={control}
                name="date"
                rules={{ required: "Event date is required" }}
                render={({ field }) => (
                  <DateInput
                    errorMessage={errors.date?.message}
                    isInvalid={!!errors.date}
                    onChange={(date) =>
                      field.onChange(date?.toDate(getLocalTimeZone()))
                    }
                    label="Event Date"
                    granularity="minute"
                    minValue={now(getLocalTimeZone())}
                  />
                )}
              />
            </form>
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              onPress={() => closeModal("createEventModal")}
            >
              Cancel
            </Button>
            <Button
              isLoading={isLoading}
              type="submit"
              form="event-create-form"
              color="primary"
            >
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <EventCreatedModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default EventCreateModal;
