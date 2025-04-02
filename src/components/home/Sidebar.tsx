// src/components/home/Sidebar.tsx
import React from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

interface ComponentItem {
  name: string;
  path: string;
}

interface SidebarProps {
  components: ComponentItem[];
  onSelectComponent: (name: string) => void;
}

const Sidebar = ({ components, onSelectComponent }: SidebarProps) => {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-4 sticky top-0">
      <h2 className="text-xl font-bold mb-4">shadcn/ui</h2>
      <Accordion type="single" collapsible defaultValue="components">
        <AccordionItem value="components">
          <AccordionTrigger>Components</AccordionTrigger>
          <AccordionContent>
            <ul className="space-y-2">
              {components.map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => onSelectComponent(item.name)}
                    className="hover:underline text-left w-full py-1 px-2 rounded hover:bg-gray-700"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Sidebar;