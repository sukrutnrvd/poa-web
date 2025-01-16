import toast from "react-hot-toast";

export const handleContractErrors = (error: Error) => {
  if (error.message.includes("End time must be in the future")) {
    return toast.error("End time must be in the future");
  }

  if (error.message.includes("Already minted for this event")) {
    return toast.error("Already minted for this event");
  }

  if (error.message.includes("You are not on the whitelist")) {
    return toast.error("You are not on the whitelist");
  }

  if (error.message.includes("Event is not active")) {
    return toast.error("Event is not active");
  }

  if (error.message.includes("Event has ended")) {
    return toast.error("Event has ended");
  }

  return toast.error("An error occurred. Please try again later.");
};
