"use server";

import { EventFormData } from "./event-create-modal";
import { handleContractErrors } from "@/utils/handle-contract-errors";

interface Event extends EventFormData {
  eventId: number;
  owner: string;
}

export const createEvent = async (data: Event) => {
  try {
    const response = await fetch(`${process.env.API_ENDPOINT}/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.API_KEY || "",
      },
      body: JSON.stringify({
        name: data.name,
        type: "OTHER",
        date: data.date,
        metadataUri: data.metadataURI,
        eventId: data.eventId,
        owner: data.owner,
        whitelist: data.whitelist
          .replace(/\r\n/g, "\n")
          .split("\n")
          .map((address) => address.toLowerCase().trim()),
      }),
    });
    if (!response.ok) {
      throw new Error("Failed to create event");
    }
    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.log(error);

    handleContractErrors(error as Error);
  }
};
