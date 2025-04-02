// src/components/page.tsx
'use client';
import React, { useState } from 'react';
import  Sidebar  from "@/components/home/Sidebar";


import  Card  from "@/components/compo/card/Card";
import Avatar from "@/components/compo/avatar/Avatar"; // Import your Avatar component
import { Button } from '@/components/compo/button/Button'; // Import your Button component
import CustomDatePicker from '@/components/compo/datepicker/Datepicker';
import CodeSnippet from '@/components/home/CodeSnippet';

const Page = () => {
  const [selectedComponent, setSelectedComponent] = useState<string>("");

  const components = [
    { 
      name: "Avatar", 
      path: "/components/avatar",
    },
    { 
      name: "Button", 
      path: "/components/button",
    },
    { 
      name: "Card", 
      path: "/components/card",
    },
    { 
      name: "DatePicker", 
      path: "/components/DatePicker",
    },
    { 
      name: "ErrorMessage", 
      path: "/components/ErrorMessage",
    },
    { 
      name: "FeatureList", 
      path: "/components/FeatureList",
    },
    { 
      name: "Footer", 
      path: "/components/Footer",
    },
    { 
      name: "Header", 
      path: "/components/Header",
    },
    { 
      name: "InputFeild", 
      path: "/components/InputFeild",
    },
    
  ];

  const renderComponentDemo = () => {
    switch (selectedComponent) {
      case "Avatar":
        return (
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-bold mb-4">Default Avatar</h2>
              <div className="flex gap-4 items-center">
                <Avatar />
                <Avatar name="John Doe" />
                <Avatar src="/git.jpeg" alt="shadcn" />
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">Sizes</h2>
              <div className="flex gap-4 items-center">
                <Avatar size="small" name="JD" />
                <Avatar size="medium" name="JD" />
                <Avatar size="large" name="JD" />
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">Status Indicator</h2>
              <div className="flex gap-4 items-center">
                <Avatar name="Online" status="online" />
                <Avatar name="Offline" status="offline" />
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">Props</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full border">
                  <thead>
                    <tr className="border-b">
                      <th className="px-4 py-2 text-left">Prop</th>
                      <th className="px-4 py-2 text-left">Type</th>
                      <th className="px-4 py-2 text-left">Default</th>
                      <th className="px-4 py-2 text-left">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="px-4 py-2">src</td>
                      <td className="px-4 py-2">string</td>
                      <td className="px-4 py-2">undefined</td>
                      <td className="px-4 py-2">Image source URL</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-2">alt</td>
                      <td className="px-4 py-2">string</td>
                      <td className="px-4 py-2">undefined</td>
                      <td className="px-4 py-2">Alt text for the image</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-2">size</td>
                      <td className="px-4 py-2">"small" | "medium" | "large"</td>
                      <td className="px-4 py-2">"medium"</td>
                      <td className="px-4 py-2">Size of the avatar</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-2">name</td>
                      <td className="px-4 py-2">string</td>
                      <td className="px-4 py-2">undefined</td>
                      <td className="px-4 py-2">Name for generating initials</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-2">status</td>
                      <td className="px-4 py-2">"online" | "offline"</td>
                      <td className="px-4 py-2">undefined</td>
                      <td className="px-4 py-2">Status indicator</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
            <h1 className="text-xl font-bold mb-4">Install the following dependencies:</h1>
<CodeSnippet code='npx @ft4bhi/ui-cli init'/>
<h1 className="text-xl font-bold mb-4">Install the following component:</h1>
<CodeSnippet code='npx @ft4bhi/ui-cli add avatar'/>
            <section>
              <h2 className="text-xl font-bold mb-4">Usage</h2>
              <pre className="bg-gray-800 p-4 rounded-md overflow-x-auto">
                {`import Avatar from "@/components/ui/avatar";

// With image
<Avatar src="https://example.com/avatar.jpg" alt="User" />

// With initials
<Avatar name="John Doe" size="large" />

// With status
<Avatar name="Jane Smith" status="online" />`}
              </pre>
            </section>
          </div>
        );
        case "Button":
          return (
            <div className="space-y-8">
              <section>
                <h2 className="text-xl font-bold mb-4">Variants</h2>
                <div className="flex flex-wrap gap-4 items-center">
                  <Button variant="default">Default</Button>
                  
                  <Button variant="destructive">Destructive</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="link">Link</Button>
                  
                </div>
              </section>
        
              <section>
                <h2 className="text-xl font-bold mb-4">Sizes</h2>
                <div className="flex flex-wrap gap-4 items-center">
                  <Button size="sm">Small</Button>
                  <Button size="default">Default</Button>
                  <Button size="lg">Large</Button>
                  <Button size="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </Button>
                </div>
              </section>
        
              <section>
                <h2 className="text-xl font-bold mb-4">With Icons</h2>
                <div className="flex flex-wrap gap-4 items-center">
                  <Button>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2"
                    >
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                    Profile
                  </Button>
                  <Button variant="outline">
                    Download
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="ml-2"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                  </Button>
                </div>
              </section>
        
              <section>
                <h2 className="text-xl font-bold mb-4">Disabled State</h2>
                <div className="flex flex-wrap gap-4 items-center">
                  <Button disabled variant="default">
                    Default
                  </Button>
                  <Button disabled variant="destructive">
                    Destructive
                  </Button>
                  <Button disabled variant="outline">
                    Outline
                  </Button>
                </div>
              </section>
        
              <section>
                <h2 className="text-xl font-bold mb-4">Props</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full border">
                    <thead>
                      <tr className="border-b">
                        <th className="px-4 py-2 text-left">Prop</th>
                        <th className="px-4 py-2 text-left">Type</th>
                        <th className="px-4 py-2 text-left">Default</th>
                        <th className="px-4 py-2 text-left">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="px-4 py-2">variant</td>
                        <td className="px-4 py-2">"default" | "destructive" | "outline" | "secondary" | "ghost" | "link"</td>
                        <td className="px-4 py-2">"default"</td>
                        <td className="px-4 py-2">Button visual style variant</td>
                      </tr>
                      <tr className="border-b">
                        <td className="px-4 py-2">size</td>
                        <td className="px-4 py-2">"default" | "sm" | "lg" | "icon"</td>
                        <td className="px-4 py-2">"default"</td>
                        <td className="px-4 py-2">Button size</td>
                      </tr>
                      <tr className="border-b">
                        <td className="px-4 py-2">asChild</td>
                        <td className="px-4 py-2">boolean</td>
                        <td className="px-4 py-2">false</td>
                        <td className="px-4 py-2">Render as child component</td>
                      </tr>
                      <tr className="border-b">
                        <td className="px-4 py-2">className</td>
                        <td className="px-4 py-2">string</td>
                        <td className="px-4 py-2">undefined</td>
                        <td className="px-4 py-2">Additional CSS classes</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
              <h1 className="text-xl font-bold mb-4">Install the following dependencies:</h1>
<CodeSnippet code='npx @ft4bhi/ui-cli init'/>
<h1 className="text-xl font-bold mb-4">Install the following component:</h1>
<CodeSnippet code='npx @ft4bhi/ui-cli add button'/>
              <section>
                <h2 className="text-xl font-bold mb-4">Usage</h2>
                <pre className="bg-gray-700 p-4 rounded-md overflow-x-auto">
                  {`import { Button } from "@/components/ui/button";
        
        // Default button
        <Button>Click me</Button>
        
        // Destructive button
        <Button variant="destructive">Delete</Button>
        
        // Outline button with icon
        <Button variant="outline">
          <svg className="mr-2" ... />
          Download
        </Button>
        
        // Icon button
        <Button size="icon" variant="ghost">
          <svg ... />
        </Button>`}
                </pre>
              </section>
        
              <section>
                <h2 className="text-xl font-bold mb-4">Composition</h2>
                <p className="mb-4">
                  The Button component uses <code className="bg-gray-700 px-1 rounded">class-variance-authority</code> (cva) for
                  variant management. You can import the button variants directly:
                </p>
                <pre className="bg-gray-700 p-4 rounded-md overflow-x-auto">
                  {`import { buttonVariants } from "@/components/ui/button";
        
        // Use the variants directly
        <button className={buttonVariants({ variant: "outline", size: "lg" })}>
          Custom Button
        </button>`}
                </pre>
              </section>
            </div>
          );
          case "Card":
            return (
              <div className="space-y-8">
                <section>
                  <h2 className="text-xl font-bold mb-4">Default Card</h2>
                  <div className="flex gap-4 items-center">
                    <Card 
                      title="Sample Card" 
                      description="This is a sample card without an image or button."
                    />
                  </div>
                </section>
          
                <section>
                  <h2 className="text-xl font-bold mb-4">Card with Image</h2>
                  <div className="flex gap-4 items-center">
                    <Card 
                      title="Card with Image" 
                      description="This card displays an image."
                      image="/git.jpeg" 
                    />
                  </div>
                </section>
          
                <section>
                  <h2 className="text-xl font-bold mb-4">Card with Button</h2>
                  <div className="flex gap-4 items-center">
                    <Card 
                      title="Card with Button" 
                      description="This card includes a button."
                      buttonText="Click Me" 
                      onButtonClick={() => alert("Button clicked!")}
                    />
                  </div>
                </section>
                <h1 className="text-xl font-bold mb-4">Install the following dependencies:</h1>
<CodeSnippet code='npx @ft4bhi/ui-cli init'/>
<h1 className="text-xl font-bold mb-4">Install the following component:</h1>
<CodeSnippet code='npx @ft4bhi/ui-cli add card'/>
                <section>
                  <h2 className="text-xl font-bold mb-4">Usage</h2>
                  <pre className="bg-gray-800 p-4 rounded-md overflow-x-auto">
          {`import Card from "@/components/compo/card/Card";
          
          // Default Card
          <Card 
            title="Sample Card" 
            description="This is a sample card without an image or button." 
          />
          
          // Card with Image
          <Card 
            title="Card with Image" 
            description="This card displays an image."
            image="https://via.placeholder.com/300x160"
          />
          
          // Card with Button
          <Card 
            title="Card with Button" 
            description="This card includes a button."
            buttonText="Click Me" 
            onButtonClick={() => alert("Button clicked!")}
          />`}
                  </pre>
                </section>
              </div>
            );
            case "DatePicker":
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl font-bold mb-4">Variants</h2>
        <div className="flex flex-wrap gap-4 items-center">
          <CustomDatePicker />
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4">Sizes</h2>
        <div className="flex flex-wrap gap-4 items-center">
          <div className="w-40">
            <CustomDatePicker />
          </div>
          <div className="w-60">
            <CustomDatePicker />
          </div>
          <div className="w-80">
            <CustomDatePicker />
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4">With Icons</h2>
        <div className="flex flex-wrap gap-4 items-center">
          <CustomDatePicker />
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4">Disabled State</h2>
        <div className="flex flex-wrap gap-4 items-center">
          <div className="opacity-50 pointer-events-none">
            <CustomDatePicker />
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4">Props</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead>
              <tr className="border-b">
                <th className="px-4 py-2 text-left">Prop</th>
                <th className="px-4 py-2 text-left">Type</th>
                <th className="px-4 py-2 text-left">Default</th>
                <th className="px-4 py-2 text-left">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-2">selected</td>
                <td className="px-4 py-2">Date | null</td>
                <td className="px-4 py-2">null</td>
                <td className="px-4 py-2">Selected date value</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2">onChange</td>
                <td className="px-4 py-2">(date: Date) ={'>'} void</td>
                <td className="px-4 py-2">-</td>
                <td className="px-4 py-2">Callback function when date is selected</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2">className</td>
                <td className="px-4 py-2">string</td>
                <td className="px-4 py-2">undefined</td>
                <td className="px-4 py-2">Additional CSS classes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <h1 className="text-xl font-bold mb-4">Install the following dependencies:</h1>
      <CodeSnippet code='npm install react-datepicker' />

      <h1 className="text-xl font-bold mb-4">Install the following component:</h1>
      <CodeSnippet code='npx @ft4bhi/ui-cli add datepicker' />

      <section>
        <h2 className="text-xl font-bold mb-4">Usage</h2>
        <pre className="bg-gray-700 p-4 rounded-md overflow-x-auto text-white">
          {`import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Calendar } from "lucide-react";

const CustomDatePicker: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <div className="relative w-full max-w-sm">
      <div className="flex items-center border rounded-md p-2 shadow-sm bg-white">
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          className="w-full outline-none bg-transparent text-gray-700"
          placeholderText="Select a date"
        />
        <Calendar className="w-5 h-5 text-gray-500" />
      </div>
    </div>
  );
};

export default CustomDatePicker;`}
        </pre>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4">Composition</h2>
        <p className="mb-4">
          The DatePicker component is based on{" "}
          <code className="bg-gray-700 px-1 rounded">react-datepicker</code>. You can modify it by passing props like `minDate`, `maxDate`, and custom styles.
        </p>
        <pre className="bg-gray-700 p-4 rounded-md overflow-x-auto text-white">
          {`<DatePicker
  selected={selectedDate}
  onChange={setSelectedDate}
  minDate={new Date()}
  maxDate={new Date(2025, 11, 31)}
  className="border p-2 rounded-md"
/>`}
        </pre>
      </section>
    </div>
  );
              
          case "ErrorMessage":
            return(
              <div>
              <h1 className="text-xl font-bold mb-4">Install the following dependencies:</h1>
      <CodeSnippet code='npm install react-datepicker' />

      <h1 className="text-xl font-bold mb-4">Install the following component:</h1>
      <CodeSnippet code='npx @ft4bhi/ui-cli add errormessage' />
      </div>
            )
            case "FeatureList":
            return(
              <div>
              <h1 className="text-xl font-bold mb-4">Install the following dependencies:</h1>
      <CodeSnippet code='npm install react-datepicker' />

      <h1 className="text-xl font-bold mb-4">Install the following component:</h1>
      <CodeSnippet code='npx @ft4bhi/ui-cli add featurelist' />
      </div>
            )
            case "Footer":
            return(
              <div>
              <h1 className="text-xl font-bold mb-4">Install the following dependencies:</h1>
      <CodeSnippet code='npm install react-datepicker' />

      <h1 className="text-xl font-bold mb-4">Install the following component:</h1>
      <CodeSnippet code='npx @ft4bhi/ui-cli add footer' />
      </div>
            )
            case "Header":
            return(
              <div>
              <h1 className="text-xl font-bold mb-4">Install the following dependencies:</h1>
      <CodeSnippet code='npm install react-datepicker' />

      <h1 className="text-xl font-bold mb-4">Install the following component:</h1>
      <CodeSnippet code='npx @ft4bhi/ui-cli add header' />
      </div>
            )
            case "InputFeild":
            return(
              <div>
              <h1 className="text-xl font-bold mb-4">Install the following dependencies:</h1>
      <CodeSnippet code='npm install react-datepicker' />

      <h1 className="text-xl font-bold mb-4">Install the following component:</h1>
      <CodeSnippet code='npx @ft4bhi/ui-cli add inputfeild' />
      </div>
            )
      default:
        return (
          <div className="text-gray-500">
            <h2 className="text-2xl font-bold mb-4">Component Gallery</h2>
            <p>Select a component from the sidebar to view its documentation</p>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar 
        components={components} 
        onSelectComponent={(name) => setSelectedComponent(name)} 
      />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">{selectedComponent || "Components"}</h1>
        {renderComponentDemo()}
      </div>
    </div>
  );
};

export default Page;