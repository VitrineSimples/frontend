"use client";
import { cn } from "@/lib/utils";
import Link, { LinkProps } from "next/link";
import React, { useState, createContext, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconMenu2, IconX } from "@tabler/icons-react";

interface Links {
  label: string;
  href: string;
  icon: React.JSX.Element | React.ReactNode;
}

interface SideBarContextProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  animate: boolean;
}

const SideBarContext = createContext<SideBarContextProps | undefined>(
  undefined
);

export const useSideBar = () => {
  const context = useContext(SideBarContext);
  if (!context) {
    throw new Error("useSideBar must be used within a SideBarProvider");
  }
  return context;
};

export const SideBarProvider = ({
  children,
  open: openProp,
  setOpen: setOpenProp,
  animate = true,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  const [openState, setOpenState] = useState(false);

  const open = openProp !== undefined ? openProp : openState;
  const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;

  return (
    <SideBarContext.Provider value={{ open, setOpen, animate: animate }}>
      {children}
    </SideBarContext.Provider>
  );
};

export const SideBar = ({
  children,
  open,
  setOpen,
  animate,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  return (
    <SideBarProvider open={open} setOpen={setOpen} animate={animate}>
      {children}
    </SideBarProvider>
  );
};

export const SideBarBody = (props: React.ComponentProps<typeof motion.div>) => {
  return (
    <>
      <DesktopSideBar {...props} />
      <MobileSideBar {...(props as React.ComponentProps<"div">)} />
    </>
  );
};

export const DesktopSideBar = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof motion.div>) => {
  const { open, setOpen, animate } = useSideBar();
  return (
    <>
      <motion.div
        className={cn(
          "h-screen px-4 py-4 hidden fixed top-0 left-0 md:flex md:flex-col bg-neutral-100 w-[300px] flex-shrink-0 border-r border-neutral-800/30 z-[999]",
          className
        )}
        animate={{
          width: animate ? (open ? "300px" : "60px") : "300px",
        }}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        {...props}
      >
        {children}
      </motion.div>
    </>
  );
};

export const MobileSideBar = ({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) => {
  const { open, setOpen } = useSideBar();
  return (
    <>
      <div
        className={cn(
          "h-10 px-4 py-4 flex flex-row md:hidden items-center justify-end bg-neutral-100 w-full"
        )}
        {...props}
      >
        <div className="flex justify-end z-20 w-fit">
          <IconMenu2
            className="text-neutral-800"
            onClick={() => setOpen(!open)}
          />
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
              className={cn(
                "fixed h-full w-full inset-0 bg-white p-10 z-[100] flex flex-col justify-between",
                className
              )}
            >
              <div
                className="absolute right-10 top-10 z-50 text-neutral-800"
                onClick={() => setOpen(!open)}
              >
                <IconX />
              </div>
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export const SideBarLink = ({
  link,
  className,
  ...props
}: {
  link: Links;
  className?: string;
  props?: LinkProps;
}) => {
  const { open, animate } = useSideBar();
  return (
    <Link
      href={link.href}
      className={cn(
        "flex items-center justify-start gap-2  group/sideBar py-2",
        className
      )}
      {...props}
    >
      {link.icon}

      <motion.span
        animate={{
          display: animate ? (open ? "inline-block" : "none") : "inline-block",
          opacity: animate ? (open ? 1 : 0) : 1,
        }}
        className="text-neutral-700 text-sm group-hover/sideBar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0"
      >
        {link.label}
      </motion.span>
    </Link>
  );
};
