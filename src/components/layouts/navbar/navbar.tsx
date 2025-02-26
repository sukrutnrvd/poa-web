"use client";

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import { useAppKit, useAppKitAccount } from "@reown/appkit/react";

import { Button } from "@nextui-org/button";
import { FaEthereum } from "react-icons/fa";
import Link from "next/link";
import { useModalStore } from "@/store/modals.store";

const AppNavbar = () => {
  const { open } = useAppKit();

  const { isConnected } = useAppKitAccount();

  const { openModal } = useModalStore();

  return (
    <Navbar className="bg-zinc-900">
      <NavbarBrand>
        <p className="font-bold text-inherit">POA</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {isConnected ? (
          <>
            {/* <NavbarItem>
              <Button as={Link} href="/" variant="light">
                Home
              </Button>
            </NavbarItem> */}
            {/* <NavbarItem isActive>
              <Button as={Link} href="/events" variant="light">
                My Events
              </Button>
            </NavbarItem> */}
            <NavbarItem>
              <Button
                onPress={() => openModal("createEventModal")}
                variant="light"
              >
                Create Event
              </Button>
            </NavbarItem>

            <NavbarItem>
              {/* @ts-ignore */}
              <appkit-button />
            </NavbarItem>
          </>
        ) : (
          <NavbarItem>
            <Button onPress={() => open({ view: "Connect" })} variant="light">
              Connect Wallet
            </Button>
          </NavbarItem>
        )}
      </NavbarContent>

      <NavbarContent className="flex sm:hidden" justify="center">
        {isConnected && (
          <NavbarItem>
            {/* @ts-ignore */}
            <appkit-button />
          </NavbarItem>
        )}

        <Dropdown>
          <DropdownTrigger>
            <Button isIconOnly variant="light">
              <FaEthereum />
            </Button>
          </DropdownTrigger>

          <DropdownMenu>
            {isConnected ? (
              <>
                {/* <DropdownItem as={Link} href="/" key="home">
                  Home
                </DropdownItem>
                <DropdownItem as={Link} href="/events" key="events">
                  My Events
                </DropdownItem> */}

                <DropdownItem
                  onPress={() => openModal("createEventModal")}
                  key="create-event"
                >
                  Create Event
                </DropdownItem>
              </>
            ) : (
              <DropdownItem key="connect-wallet">
                <Button
                  onPress={() => open({ view: "Connect" })}
                  variant="light"
                >
                  Connect Wallet
                </Button>
              </DropdownItem>
            )}
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
};

export default AppNavbar;
