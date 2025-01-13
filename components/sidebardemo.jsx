"use client";
import React, { useState, useEffect } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
  IconMessage,
  IconPlus,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function SidebarDemo() {
  const links = [
    {
      label: "Dashboard",
      href: "#",
      icon: (
        <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Profile",
      href: "#",
      icon: (
        <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Settings",
      href: "#",
      icon: (
        <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Logout",
      href: "#",
      icon: (
        <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];
  const [open, setOpen] = useState(true);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchChatSessions();
  }, []);

  const fetchChatSessions = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/sessions");
      if (!response.ok) throw new Error("Failed to fetch sessions");
      const data = await response.json();
      console.log(data);
      setSessions(data);
    } catch (error) {
      console.error("Error fetching chat sessions:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 max-w-[200px] border border-neutral-200 dark:border-neutral-700 overflow-hidden z-50 fixed",
        "h-screen"
      )}
    >
      <Sidebar open={open} setOpen={setOpen} animate={false}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}

            {/* Chat Sessions Section */}
            <div className="mt-8 mb-4">
              <div className="flex">
                <IconMessage className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
                <h3 className="px-4 text-sm font-semibold text-neutral-700 dark:text-gray-400">
                  Chat Sessions
                </h3>
              </div>

              {loading ? (
                <div className="px-4 py-2 text-sm text-gray-500">
                  Loading...
                </div>
              ) : (
                <div className="mt-2 flex flex-col gap-1">
                  {sessions.map((session) => (
                    <Link
                      key={session.session_id}
                      href={`/gemini-chat/${session.session_id}`}
                      className={cn(
                        "flex items-center gap-2 px-4 py-2 text-sm text-neutral-700 dark:text-neutral-200",
                        "hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-lg mx-2 transition-colors",
                        "cursor-pointer"
                      )}
                    >
                      <span className="truncate">
                        {session.title || `Chat ${session.id}`}
                      </span>
                    </Link>
                  ))}
                </div>
              )}

              {/* New Chat Button */}
              <Link
                href="/gemini-chat"
                className={cn(
                  "flex items-center gap-2 px-4 py-2 mt-2 text-sm",
                  "text-blue-600 dark:text-blue-400 hover:bg-neutral-200 dark:hover:bg-neutral-700",
                  "rounded-lg mx-2 transition-colors cursor-pointer"
                )}
              >
                <IconPlus className="h-4 w-4" />
                <span>New Chat</span>
              </Link>
            </div>

            {/* Navigation Links */}
            <div className="mt-4 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>

          {/* User Profile Section */}
          <div>
            <SidebarLink
              link={{
                label: "Manu Arora",
                href: "#",
                icon: (
                  <Image
                    src="/leos-coat/public/images/leo-logo.jpg"
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
    </div>
  );
}
export const Logo = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        Acet Labs
      </motion.span>
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
};
