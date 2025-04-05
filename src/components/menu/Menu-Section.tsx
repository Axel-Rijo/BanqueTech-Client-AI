"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  menuSection,
  menuContainer,
  menuItem,
  menuTabContent,
  menuHeader,
  menuHeaderTitle,
  menuHeaderDescription,
  menuTabsContainer,
  menuButton,
  menuCard,
  menuImage,
  menuTitle,
  menuPrice,
  menuTag,
} from "@/lib/motion-utils";
import { dishDetails } from "@/lib/dish-data";
import Link from "next/link";

// Sample menu data

const starters = dishDetails
  .filter((obj) => obj.category === "starters")
  .slice(0, 3);

const mains = dishDetails.filter((obj) => obj.category === "mains").slice(0, 3);

const desserts = dishDetails
  .filter((obj) => obj.category === "desserts")
  .slice(0, 3);

const drinks = dishDetails
  .filter((obj) => obj.category === "drinks")
  .slice(0, 3);

export default function MenuSection() {
  const [activeTab, setActiveTab] = useState("starters");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Function to render the active tab content
  const renderActiveTabContent = () => {
    switch (activeTab) {
      case "starters":
        return (
          <motion.div
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            variants={menuContainer}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
          >
            {starters.map((item) => (
              <MenuCard
                key={item.name}
                item={item}
                onClick={() => setSelectedId(item.name)}
                isSelected={selectedId === item.name}
              />
            ))}
          </motion.div>
        );
      case "mains":
        return (
          <motion.div
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            variants={menuContainer}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
          >
            {mains.map((item) => (
              <MenuCard
                key={item.name}
                item={item}
                onClick={() => setSelectedId(item.name)}
                isSelected={selectedId === item.name}
              />
            ))}
          </motion.div>
        );
      case "desserts":
        return (
          <motion.div
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            variants={menuContainer}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
          >
            {desserts.map((item) => (
              <MenuCard
                key={item.name}
                item={item}
                onClick={() => setSelectedId(item.name)}
                isSelected={selectedId === item.name}
              />
            ))}
          </motion.div>
        );
      case "drinks":
        return (
          <motion.div
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            variants={menuContainer}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
          >
            {drinks.map((item) => (
              <MenuCard
                key={item.name}
                item={item}
                onClick={() => setSelectedId(item.name)}
                isSelected={selectedId === item.name}
              />
            ))}
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.section
      ref={ref}
      className="w-full py-12 md:py-24 lg:py-32 bg-black text-white overflow-hidden"
      variants={menuSection}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      transition={{ duration: 0.7 }}
    >
      <div className="container px-4 md:px-6 mx-auto">
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center"
          variants={menuHeader}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
        >
          <div className="space-y-2">
            <motion.h2
              className="text-3xl font-bold tracking-tighter sm:text-5xl bg-gradient-to-r from-white via-white to-[#f59e0b] bg-clip-text"
              variants={menuHeaderTitle}
            >
              Our Menu
            </motion.h2>
            <motion.p
              className="max-w-[700px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
              variants={menuHeaderDescription}
            >
              Discover our carefully crafted dishes made with the finest
              ingredients
            </motion.p>
          </div>
        </motion.div>

        <div className="mt-12">
          <motion.div
            className="flex justify-center mb-8"
            variants={menuTabsContainer}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
          >
            {/* Custom tab bar with increased padding between border and tabs */}
            <div className="inline-flex rounded-md border border-[#f59e0b] p-1.5 overflow-hidden">
              {[
                { id: "starters", label: "Starters" },
                { id: "mains", label: "Main Courses" },
                { id: "desserts", label: "Desserts" },
                { id: "drinks", label: "Drinks" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setSelectedId(null); // Reset selected item when changing tabs
                  }}
                  className={`px-4 py-1.5 text-sm font-medium transition-colors mx-0.5 ${
                    activeTab === tab.id
                      ? "bg-[#f59e0b] text-black rounded-md"
                      : "text-white hover:bg-[#f59e0b]/10"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              variants={menuTabContent}
              initial="hidden"
              animate="show"
              exit="exit"
              className="space-y-8"
            >
              {renderActiveTabContent()}
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.div
          className="flex justify-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <motion.div
            variants={menuButton}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            className="relative rounded-lg"
          >
            <Link href={"/menu"}>
              <Button className="relative z-10 bg-[#f59e0b] text-black hover:bg-[#f59e0b]/90 cursor-pointer">
                View Full Menu
              </Button>
            </Link>
            <motion.div
              className="absolute inset-0 -z-10 bg-[#f59e0b]/20 rounded-md blur-xl"
              animate={{
                opacity: [0.5, 0.8, 0.5],
                scale: [0.95, 1.05, 0.95],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 4,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}

interface MenuItem {
  name: string;
  description: string;
  price: string;
  image: string;
  dietary?: string[];
}

interface MenuCardProps {
  item: MenuItem;
  onClick: () => void;
  isSelected: boolean;
}

function MenuCard({ item, onClick, isSelected }: MenuCardProps) {
  return (
    <motion.div variants={menuItem}>
      <motion.div
        onClick={onClick}
        variants={menuCard}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        animate={isSelected ? "hover" : "initial"}
        className="cursor-pointer h-full" // Added h-full for consistent height
      >
        <Card className="overflow-hidden border border-[#f59e0b]/20 bg-black h-full flex flex-col">
          {" "}
          {/* Added h-full and flex-col */}
          <motion.div
            className="aspect-video w-full overflow-hidden"
            variants={menuImage}
            initial="initial"
            whileHover="hover"
          >
            <img
              src={item.image || "/placeholder.svg"}
              alt={item.name}
              className="object-cover w-full h-full"
            />
          </motion.div>
          <CardContent className="p-4 flex flex-col flex-grow">
            {" "}
            {/* Added flex-grow to ensure content takes available space */}
            <div className="flex justify-between items-start mb-2">
              <motion.h3
                className="text-xl font-bold text-white"
                variants={menuTitle}
                initial="initial"
                whileHover="hover"
              >
                {item.name}
              </motion.h3>
              <motion.span
                className="font-bold text-[#f59e0b] text-right ml-2" // Added text-right and ml-2
                variants={menuPrice}
                initial="initial"
                whileHover="hover"
              >
                {item.price}
              </motion.span>
            </div>
            <p className="text-sm text-gray-300 mb-3 flex-grow">
              {item.description}
            </p>{" "}
            {/* Added flex-grow */}
            {item.dietary && (
              <motion.div
                className="flex gap-2 mt-auto" // Added mt-auto to push tags to bottom
                initial={{ opacity: 0.8 }}
                whileHover={{ opacity: 1 }}
              >
                {item.dietary.map((tag) => (
                  <motion.span
                    key={tag}
                    className="inline-flex items-center rounded-full border border-[#f59e0b] px-2.5 py-0.5 text-xs font-semibold text-[#f59e0b]"
                    variants={menuTag}
                    initial="initial"
                    whileHover="hover"
                  >
                    {tag}
                  </motion.span>
                ))}
              </motion.div>
            )}
            {/* Subtle glow effect on selected items */}
            <AnimatePresence>
              {isSelected && (
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="absolute inset-0 border-2 border-[#f59e0b] rounded-md" />
                  <div className="absolute inset-0 bg-[#f59e0b]/5 rounded-md" />
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
