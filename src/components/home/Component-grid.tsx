import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
// import { CodeBlock } from "@/components/theme/code-block"
import { copyToClipboard } from "@/lib/utils"

interface ComponentExample {
  name: string
  preview: React.ReactNode
  code: string
}

const components: ComponentExample[] = [
  {
    name: "Button",
    preview: <Button>Click me</Button>,
    code: `<Button>Click me</Button>`,
  },
  {
    name: "Card",
    preview: (
      <Card className="p-4">
        <p>Card Content</p>
      </Card>
    ),
    code: `<Card className="p-4">
  <p>Card Content</p>
</Card>`,
  },
  {
    name: "Button Variants",
    preview: (
      <div className="flex gap-2">
        <Button variant="default">Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
      </div>
    ),
    code: `<div className="flex gap-2">
  <Button variant="default">Default</Button>
  <Button variant="secondary">Secondary</Button>
  <Button variant="outline">Outline</Button>
</div>`,
  },
]

export function ComponentGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {components.map((component) => (
        <Card key={component.name} className="p-6">
          <h3 className="text-lg font-semibold">{component.name}</h3>
          <div className="mt-4 space-y-4">
            <div className="preview rounded-lg border p-4">
              {component.preview}
            </div>
            {/* <CodeBlock code={component.code} language="tsx" /> */}
            <Button
              variant="secondary"
              className="w-full"
              onClick={() => copyToClipboard(component.code)}
            >
              Copy Code
            </Button>
          </div>
        </Card>
      ))}
    </div>
  )
}