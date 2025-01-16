"use client";

import { Button } from "@nextui-org/button";
import EventCard from "@/components/event-card/event-card";
import { FaRegCalendarPlus } from "react-icons/fa";
import { Skeleton } from "@nextui-org/skeleton";
import { useAppKitAccount } from "@reown/appkit/react";
import { useEffect } from "react";
import { useEventsStore } from "@/store/events.store";
import { useModalStore } from "@/store/modals.store";

export default function Home() {
  const {
    state: { events, isLoading },
    fetchEvents,
  } = useEventsStore();

  const { openModal } = useModalStore();

  useEffect(() => {
    fetchEvents();
  }, []);

  const { address } = useAppKitAccount();

  return (
    <>
      {events && events.length > 0 ? (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {events.map((event: any) => (
            <Skeleton
              className="rounded-xl"
              key={event.eventId}
              isLoaded={!isLoading}
            >
              <EventCard
                isOwner={address === event.owner}
                eventId={event.eventId}
                metadataUri={event.metadataUri}
                name={event.name}
                owner={event.owner}
                type={event.type}
                date={new Date(event.date)}
              />
            </Skeleton>
          ))}
        </div>
      ) : (
        <div className="flex flex-col mt-10 items-center justify-center h-full">
          <FaRegCalendarPlus size={48} className="text-gray-500 mb-4" />
          <p className="text-gray-500 mb-4">
            No active events found. Make it happen!
          </p>
          <Button onPress={() => openModal("createEventModal")}>
            Create Event
          </Button>
        </div>
      )}
    </>
  );
}
