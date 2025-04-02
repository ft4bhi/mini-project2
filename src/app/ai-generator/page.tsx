"use client"

import React, { useState, useCallback } from 'react'
import Image from 'next/image'
const { GoogleGenerativeAI } = require("@google/generative-ai");
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function UIConverter() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [codeType, setCodeType] = useState<'HTML' | 'JSX' | 'TSX'>('HTML')
  const [generatedCode, setGeneratedCode] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }, [])

  const generateCode = useCallback(async () => {
    if (!selectedFile) {
      alert('Please upload an image first')
      return
    }

    setIsLoading(true)
    try {
      const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '')
      const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash",
        generationConfig: {
          temperature: 0.4,
          topK: 32,
          topP: 1,
        },
      })

      const base64Image = await fileToBase64(selectedFile)
      const imageInput = {
        inlineData: {
          mimeType: selectedFile.type,
          data: base64Image
        }
      }

      const descriptionPrompt = `Describe this UI image in detail. Identify key UI elements, their positions, colors, and overall layout.`
      const descriptionResult = await model.generateContent([descriptionPrompt, imageInput])
      const description = descriptionResult.response.text()

      const codePrompt = `Based on the following UI description, create a ${codeType} code snippet that accurately represents the UI:
${description}

Requirements:
- Use modern web design practices
- Ensure responsiveness
- Match the original design as closely as possible
- Include all necessary imports if generating JSX/TSX
- Use semantic HTML elements where appropriate
- Add comments for important sections`

      const codeResult = await model.generateContent([codePrompt, imageInput])
      setGeneratedCode(codeResult.response.text())
    } catch (error) {
      console.error('Error generating code:', error)
      alert('Failed to generate code. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }, [selectedFile, codeType])

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve((reader.result as string).split(',')[1])
      reader.onerror = error => reject(error)
    })
  }

  const downloadCode = useCallback(() => {
    if (!generatedCode) return
    const blob = new Blob([generatedCode], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `ui_converter.${codeType.toLowerCase()}`
    link.click()
    URL.revokeObjectURL(url)
  }, [generatedCode, codeType])

  return (
    <div className="container mx-auto max-w-6xl p-6">
      <Card className="shadow-lg">
        <CardHeader className="border-b">
          <CardTitle className="text-2xl font-bold">UI to Code Converter</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column - Input Section */}
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="file-upload">Upload UI Image</Label>
                <Input 
                  id="file-upload"
                  type="file" 
                  accept="image/*"
                  onChange={handleFileChange}
                  className="cursor-pointer"
                />
              </div>

              {imagePreview && (
                <div className="relative w-full aspect-video rounded-lg overflow-hidden border">
                  <Image 
                    src={imagePreview} 
                    alt="UI Preview"
                    fill
                    className="object-contain bg-gray-50"
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label>Output Format</Label>
                <Select value={codeType} onValueChange={(value) => setCodeType(value as 'HTML' | 'JSX' | 'TSX')}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select code type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="HTML">HTML</SelectItem>
                    <SelectItem value="JSX">JSX</SelectItem>
                    <SelectItem value="TSX">TSX</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button 
                onClick={generateCode}
                disabled={!selectedFile || isLoading}
                className="w-full h-12 text-lg"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin">↻</span>
                    Generating...
                  </span>
                ) : 'Generate Code'}
              </Button>
            </div>

            {/* Right Column - Output Section */}
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Generated Code</Label>
                <Textarea
                  value={generatedCode}
                  readOnly
                  placeholder="Generated code will appear here..."
                  className="min-h-[400px] font-mono text-sm resize-none bg-gray-50"
                />
              </div>
              
              <Button 
                onClick={downloadCode}
                disabled={!generatedCode}
                variant="secondary"
                className="w-full h-12 text-lg"
              >
                Download {codeType} Code
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}