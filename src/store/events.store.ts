import { getEvents } from "@/actions/home.action";
import { type EventCardProps } from "@/components/event-card/event-card";
import { create } from "zustand";

interface IEventState {
  events: EventCardProps[];
  isLoading?: boolean;
}

interface IEventStore {
  state: IEventState;
  fetchEvents: () => void;
}

const initailState: IEventState = {
  events: [
    {
      name: "Event 1",
      metadataUri: "https://google.com",
      eventId: "1",
      type: "Type 1",
      owner: "Owner 1",
      date: new Date(),
    },
    {
      name: "Event 2",
      metadataUri: "https://google.com",
      eventId: "2",
      type: "Type 2",
      owner: "Owner 2",
      date: new Date(),
    },
    {
      name: "Event 3",
      metadataUri: "https://google.com",
      eventId: "3",
      type: "Type 3",
      owner: "Owner 3",
      date: new Date(),
    },
    {
      name: "Event 4",
      metadataUri: "https://google.com",
      eventId: "4",
      type: "Type 4",
      owner: "Owner 4",
      date: new Date(),
    },
  ],
  isLoading: true,
};

export const useEventsStore = create<IEventStore>((set) => ({
  state: initailState,
  fetchEvents: async () => {
    const events: any = await getEvents();
    console.log(events);

    set({ state: { ...initailState, events, isLoading: false } });
  },
}));
