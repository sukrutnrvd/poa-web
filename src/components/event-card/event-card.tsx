"use client";

import {
  AiOutlineBank,
  AiOutlineCalendar,
  AiOutlineCrown,
  AiOutlineGift,
  AiOutlineRocket,
  AiOutlineTeam,
  AiOutlineTool,
  AiOutlineUsergroupAdd,
  AiOutlineVideoCamera,
} from "react-icons/ai";
import { Card, CardFooter, CardHeader } from "@nextui-org/card";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@nextui-org/button";
import Countdown from "react-countdown";
import { Image } from "@nextui-org/image";
import MerkleTree from "merkletreejs";
import dayjs from "dayjs";
import { getEvent } from "@/actions/home.action";
import { getLocalTimeZone } from "@internationalized/date";
import { handleContractErrors } from "@/utils/handle-contract-errors";
import { keccak256 } from "ethers";
import timezone from "dayjs/plugin/timezone";
import { useModalStore } from "@/store/modals.store";
import { usePoaContractStore } from "@/store/poa-contract.store";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);

export interface EventCardProps {
  name: string;
  metadataUri: string;
  eventId: string;
  type: string;
  owner: string;
  date: Date;
  isOwner?: boolean;
}

const EventCard: React.FC<EventCardProps> = ({
  date,
  eventId,
  name,
  owner,
  type,
  isOwner,
}) => {
  const now = dayjs();
  const eventDate = dayjs(date).tz(getLocalTimeZone());
  const hoursRemaining = eventDate.diff(now, "hour");
  const isLessThanOneDay = hoursRemaining < 24;

  const { address, isConnected } = useAppKitAccount();

  const { open } = useAppKit();

  const [isLoading, setIsLoading] = useState(false);

  const {
    state: { contract },
  } = usePoaContractStore();

  const countdownRef = useRef<Countdown | null>(null);

  const handleMint = async () => {
    setIsLoading(true);
    try {
      const { whitelist } = await getEvent(+eventId);

      const leaves = whitelist.map((x: string) =>
        keccak256(x.toLowerCase().trim())
      );
      const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });
      const leaf = keccak256(address?.toLowerCase() ?? "");
      const proof = tree.getHexProof(leaf);
      const tx = await contract?.mint(eventId, proof);
      const receipt = await tx.wait();

      if (receipt.status === 1) {
        openModal("nftMintedModal");
      }
    } catch (error) {
      console.log(error);

      handleContractErrors(error as Error);
    } finally {
      setIsLoading(false);
    }
  };

  const { modals, openModal } = useModalStore();

  useEffect(() => {
    if (modals.nftMintedModal.isOpen) {
      setIsLoading(false);
    }
  }, [modals.nftMintedModal.isOpen]);

  useEffect(() => {
    if (countdownRef.current) {
      countdownRef.current.start();
    }
  }, [eventDate]);

  return (
    <>
      <Card className=" h-[300px]">
        <CardHeader className="absolute z-10 top-1 justify-between ">
          <div>
            <div className="flex gap-2">
              <p className="text-tiny text-white/60 uppercase font-bold">
                {name}
              </p>
              <Popover showArrow>
                <PopoverTrigger>
                  <button>
                    {type === "Conference" && <AiOutlineTeam />}
                    {type === "Workshop" && <AiOutlineTool />}
                    {type === "Webinar" && <AiOutlineVideoCamera />}
                    {type === "Meetup" && <AiOutlineUsergroupAdd />}
                    {type === "NFT Drop" && <AiOutlineGift />}
                    {type === "Token Launch" && <AiOutlineRocket />}
                    {type === "DAO Meeting" && <AiOutlineBank />}
                  </button>
                </PopoverTrigger>
                <PopoverContent>
                  {type} by {owner.slice(0, 5)}...{owner.slice(-5)}
                </PopoverContent>
              </Popover>
            </div>
          </div>
          {isOwner && <AiOutlineCrown size={24} />}
        </CardHeader>

        <CardFooter className="absolute z-10 bottom-0 flex justify-between">
          {isLessThanOneDay ? (
            <Countdown
              ref={countdownRef}
              autoStart
              date={eventDate.toDate()}
              renderer={({ days, hours, minutes, seconds }) => (
                <div>
                  {hours}h {minutes}m {seconds}s
                </div>
              )}
            />
          ) : (
            <Popover>
              <PopoverTrigger>
                <button>
                  <AiOutlineCalendar />
                </button>
              </PopoverTrigger>
              <PopoverContent>
                Mint ends: {eventDate.format("MMMM D, YYYY h:mm A")}
              </PopoverContent>
            </Popover>
          )}

          <Button
            onPress={isConnected ? handleMint : () => open({ view: "Connect" })}
            isLoading={isLoading}
            variant="light"
          >
            {isConnected ? "Mint" : "Connect"}
          </Button>
        </CardFooter>
        <Image
          removeWrapper
          alt="Card background"
          className="z-0 w-full h-full object-cover"
          src="/monad-hero.jpeg"
        />
      </Card>
    </>
  );
};

export default EventCard;
