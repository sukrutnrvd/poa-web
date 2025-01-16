"use server";

export const getEvents = async () => {
  try {
    const response = await fetch(`${process.env.API_ENDPOINT}/events`, {
      headers: {
        "x-api-key": process.env.API_KEY || "",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch events");
    }
    const events = await response.json();
    return events;
  } catch (error) {
    console.error("Error fetching events:", error);
  }
};

export const getEvent = async (id: number) => {
  try {
    const response = await fetch(`${process.env.API_ENDPOINT}/events/${id}`, {
      headers: {
        "x-api-key": process.env.API_KEY || "",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch event");
    }
    const events = await response.json();
    return events;
  } catch (error) {
    console.error("Error fetching event:", error);
  }
};
