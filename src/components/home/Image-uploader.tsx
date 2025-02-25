"use client";
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
// import { CodeBlock } from "@/components/theme/code-block"
import { copyToClipboard } from "@/lib/utils"

export function ImageUploader() {
  const [code, setCode] = useState("")

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <label htmlFor="image" className="text-sm font-medium">
            Upload UI Design
          </label>
          <input
            id="image"
            type="file"
            className="file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 file:border-0 file:rounded-lg file:px-4 file:py-2 file:mr-4 file:cursor-pointer"
            accept="image/*"
            onChange={(e) => {
              // Handle image upload and AI processing
            }}
          />
        </div>
        {code && (
          <div className="mt-4">
            {/* <CodeBlock code={code} language="tsx" /> */}
            <Button
              variant="secondary"
              className="w-full mt-2"
              onClick={() => copyToClipboard(code)}
            >
              Copy Generated Code
            </Button>
          </div>
        )}
      </div>
    </Card>
  )
}