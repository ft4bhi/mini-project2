'use client'

import { FC, useState, useRef, useEffect } from 'react'
import { ChromePicker } from 'react-color'
import { 
  FaUndo, FaRedo, FaSave, FaEraser, FaSquare, FaCircle, 
  FaPencilAlt, FaSlash, FaPlay, FaFont, FaMousePointer,
  FaArrowsAlt, FaObjectGroup, FaObjectUngroup, FaAlignLeft,
  FaAlignCenter, FaAlignRight, FaAlignJustify
} from 'react-icons/fa'

// Define all possible tool types
type ToolType = 'select' | 'move' | 'free' | 'rectangle' | 'circle' | 'line' | 'text' | 'ellipse' | 'triangle'

// Update the Layer interface to include all possible shape types
interface Layer {
  id: string
  type: 'rectangle' | 'circle' | 'line' | 'text' | 'group' | 'path' | 'ellipse' | 'triangle'
  x: number
  y: number
  width?: number
  height?: number
  fill: string
  stroke: string
  strokeWidth: number
  data: any
  selected: boolean
}

interface PageProps {}

const Page: FC<PageProps> = () => {
  const [color, setColor] = useState<string>('#000000')
  const [brushSize, setBrushSize] = useState<number>(5)
  const [isEraser, setIsEraser] = useState<boolean>(false)
  // Update the selectedTool state to use the ToolType
  const [selectedTool, setSelectedTool] = useState<ToolType>('select')
  const [startPoint, setStartPoint] = useState<{ x: number; y: number } | null>(null)
  const [layers, setLayers] = useState<Layer[]>([])
  const [selectedLayers, setSelectedLayers] = useState<string[]>([])
  const [textValue, setTextValue] = useState<string>('')
  
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const historyRef = useRef<ImageData[]>([])
  const redoStackRef = useRef<ImageData[]>([])
  const textInputRef = useRef<HTMLInputElement | null>(null)

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    // Set canvas dimensions to match display size
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
    
    // Initial drawing
    redrawCanvas()
  }, [layers])

  const redrawCanvas = () => {
    const ctx = getCanvasContext()
    if (!ctx) return
    
    // Clear canvas
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    
    // Draw all layers
    layers.forEach(layer => {
      drawLayer(layer)
    })
  }

  const drawLayer = (layer: Layer) => {
    const ctx = getCanvasContext()
    if (!ctx) return
    
    ctx.fillStyle = layer.fill
    ctx.strokeStyle = layer.stroke
    ctx.lineWidth = layer.strokeWidth
    
    if (layer.type === 'rectangle') {
      ctx.beginPath()
      ctx.rect(layer.x, layer.y, layer.width || 0, layer.height || 0)
      ctx.fill()
      ctx.stroke()
    } else if (layer.type === 'circle') {
      ctx.beginPath()
      ctx.arc(layer.x, layer.y, layer.width || 0, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()
    } else if (layer.type === 'ellipse') {
      ctx.beginPath()
      ctx.ellipse(
        layer.x + (layer.width || 0) / 2, 
        layer.y + (layer.height || 0) / 2,
        (layer.width || 0) / 2,
        (layer.height || 0) / 2,
        0, 0, Math.PI * 2
      )
      ctx.fill()
      ctx.stroke()
    } else if (layer.type === 'triangle') {
      ctx.beginPath()
      ctx.moveTo(layer.x + (layer.width || 0) / 2, layer.y)
      ctx.lineTo(layer.x, layer.y + (layer.height || 0))
      ctx.lineTo(layer.x + (layer.width || 0), layer.y + (layer.height || 0))
      ctx.closePath()
      ctx.fill()
      ctx.stroke()
    } else if (layer.type === 'line') {
      ctx.beginPath()
      ctx.moveTo(layer.x, layer.y)
      ctx.lineTo(layer.x + (layer.width || 0), layer.y + (layer.height || 0))
      ctx.stroke()
    } else if (layer.type === 'text') {
      ctx.font = `${brushSize * 2}px Arial`
      ctx.fillText(layer.data.text, layer.x, layer.y)
    } else if (layer.type === 'path' && layer.data.points) {
      ctx.beginPath()
      const points = layer.data.points
      ctx.moveTo(points[0].x, points[0].y)
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y)
      }
      ctx.stroke()
    }
    
    // Draw selection outline if selected
    if (layer.selected) {
      ctx.strokeStyle = '#4A90E2'
      ctx.lineWidth = 2
      ctx.setLineDash([5, 5])
      
      if (layer.type === 'circle') {
        ctx.beginPath()
        ctx.arc(layer.x, layer.y, (layer.width || 0) + 2, 0, Math.PI * 2)
        ctx.stroke()
      } else {
        ctx.strokeRect(
          layer.x - 2, 
          layer.y - 2, 
          (layer.width || 0) + 4, 
          (layer.height || 0) + 4
        )
      }
      
      ctx.setLineDash([])
    }
  }

  const getCanvasContext = () => {
    const canvas = canvasRef.current
    return canvas ? canvas.getContext('2d') : null
  }

  const saveState = () => {
    const ctx = getCanvasContext()
    if (!ctx) return
    historyRef.current.push(ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height))
    redoStackRef.current = []
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current!.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    if (selectedTool === 'select') {
      // Check if clicking on a layer
      const clickedLayer = [...layers].reverse().find(layer => 
        x >= layer.x && 
        x <= layer.x + (layer.width || 0) && 
        y >= layer.y && 
        y <= layer.y + (layer.height || 0)
      )
      
      if (clickedLayer) {
        setSelectedLayers([clickedLayer.id])
        setStartPoint({ x, y })
        return
      } else {
        setSelectedLayers([])
      }
    } else if (selectedTool === 'text') {
      const newLayer: Layer = {
        id: Date.now().toString(),
        type: 'text',
        x,
        y,
        fill: color,
        stroke: color,
        strokeWidth: brushSize,
        data: { text: 'Double click to edit' },
        selected: false
      }
      setLayers([...layers, newLayer])
      setSelectedLayers([newLayer.id])
      return
    }
    
    setStartPoint({ x, y })
    saveState()
  }

  const handleMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!startPoint) return
    
    const rect = canvasRef.current!.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    if (selectedTool === 'select' || selectedTool === 'move') {
      // Move selected layers
      if (selectedLayers.length > 0) {
        const dx = x - startPoint.x
        const dy = y - startPoint.y
        
        setLayers(layers.map(layer => 
          selectedLayers.includes(layer.id) 
            ? { ...layer, x: layer.x + dx, y: layer.y + dy }
            : layer
        ))
      }
    } else if (selectedTool === 'free') {
      // For free drawing, we should create a path layer
      const newLayer: Layer = {
        id: Date.now().toString(),
        type: 'path',
        x: Math.min(startPoint.x, x),
        y: Math.min(startPoint.y, y),
        width: Math.abs(x - startPoint.x),
        height: Math.abs(y - startPoint.y),
        fill: isEraser ? '#FFFFFF' : color,
        stroke: isEraser ? '#FFFFFF' : color,
        strokeWidth: brushSize,
        data: { 
          points: [
            { x: startPoint.x, y: startPoint.y },
            { x, y }
          ] 
        },
        selected: false
      }
      setLayers([...layers, newLayer])
    } else {
      // For other shapes
      let type: Layer['type'];
      
      // Map selectedTool to layer type
      switch (selectedTool) {
        case 'rectangle':
          type = 'rectangle';
          break;
        case 'circle':
          type = 'circle';
          break;
        case 'line':
          type = 'line';
          break;
        case 'ellipse':
          type = 'ellipse';
          break;
        case 'triangle':
          type = 'triangle';
          break;
        default:
          // Default to rectangle for any unhandled tool
          type = 'rectangle';
      }
      
      const newLayer: Layer = {
        id: Date.now().toString(),
        type,
        x: Math.min(startPoint.x, x),
        y: Math.min(startPoint.y, y),
        width: Math.abs(x - startPoint.x),
        height: Math.abs(y - startPoint.y),
        fill: isEraser ? '#FFFFFF' : color,
        stroke: isEraser ? '#FFFFFF' : color,
        strokeWidth: brushSize,
        data: {},
        selected: false
      }
      
      // Special case for circle - use the distance as width (radius)
      if (type === 'circle') {
        const dx = x - startPoint.x;
        const dy = y - startPoint.y;
        const radius = Math.sqrt(dx * dx + dy * dy);
        newLayer.x = startPoint.x;
        newLayer.y = startPoint.y;
        newLayer.width = radius;
      }
      
      setLayers([...layers, newLayer])
    }
    
    setStartPoint(null)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!startPoint) return
    
    const rect = canvasRef.current!.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    if (selectedTool === 'free') {
      const ctx = getCanvasContext()
      if (!ctx) return
      
      ctx.strokeStyle = isEraser ? '#FFFFFF' : color
      ctx.lineWidth = brushSize
      
      ctx.beginPath()
      ctx.moveTo(startPoint.x, startPoint.y)
      ctx.lineTo(x, y)
      ctx.stroke()
      setStartPoint({ x, y })
    } else if ((selectedTool === 'select' || selectedTool === 'move') && selectedLayers.length > 0) {
      // Preview movement
      redrawCanvas()
      const ctx = getCanvasContext()
      if (!ctx) return
      
      const dx = x - startPoint.x
      const dy = y - startPoint.y
      
      selectedLayers.forEach(id => {
        const layer = layers.find(l => l.id === id)
        if (layer) {
          ctx.strokeStyle = '#4A90E2'
          ctx.lineWidth = 2
          ctx.setLineDash([5, 5])
          ctx.strokeRect(
            layer.x + dx - 2, 
            layer.y + dy - 2, 
            (layer.width || 0) + 4, 
            (layer.height || 0) + 4
          )
          ctx.setLineDash([])
        }
      })
    }
  }

  const handleDoubleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (selectedTool !== 'select') return
    
    const rect = canvasRef.current!.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const clickedLayer = [...layers].reverse().find(layer => 
      x >= layer.x && 
      x <= layer.x + (layer.width || 0) && 
      y >= layer.y && 
      y <= layer.y + (layer.height || 0)
    )
    
    if (clickedLayer?.type === 'text') {
      // Show text input for editing
      setTextValue(clickedLayer.data.text)
      if (textInputRef.current) {
        textInputRef.current.style.left = `${clickedLayer.x}px`
        textInputRef.current.style.top = `${clickedLayer.y - brushSize}px`
        textInputRef.current.style.display = 'block'
        textInputRef.current.focus()
      }
    }
  }

  const handleTextBlur = () => {
    if (selectedLayers.length === 1) {
      const layerId = selectedLayers[0]
      setLayers(layers.map(layer => 
        layer.id === layerId && layer.type === 'text'
          ? { ...layer, data: { ...layer.data, text: textValue } }
          : layer
      ))
    }
    if (textInputRef.current) {
      textInputRef.current.style.display = 'none'
    }
  }

  const undo = () => {
    const ctx = getCanvasContext()
    if (!ctx || historyRef.current.length === 0) return
    redoStackRef.current.push(ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height))
    const prevState = historyRef.current.pop()
    if (prevState) ctx.putImageData(prevState, 0, 0)
  }

  const redo = () => {
    const ctx = getCanvasContext()
    if (!ctx || redoStackRef.current.length === 0) return
    historyRef.current.push(ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height))
    const nextState = redoStackRef.current.pop()
    if (nextState) ctx.putImageData(nextState, 0, 0)
  }

  const clear = () => {
    const ctx = getCanvasContext()
    if (!ctx) return
    saveState()
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    setLayers([])
    setSelectedLayers([])
  }

  const saveImage = () => {
    if (!canvasRef.current) return
    const link = document.createElement('a')
    link.download = 'design.png'
    link.href = canvasRef.current.toDataURL('image/png')
    link.click()
  }

  const groupSelected = () => {
    if (selectedLayers.length < 2) return
    
    const groupLayers = layers.filter(layer => selectedLayers.includes(layer.id))
    if (groupLayers.length < 2) return
    
    // Calculate group bounds
    const minX = Math.min(...groupLayers.map(l => l.x))
    const minY = Math.min(...groupLayers.map(l => l.y))
    const maxX = Math.max(...groupLayers.map(l => l.x + (l.width || 0)))
    const maxY = Math.max(...groupLayers.map(l => l.y + (l.height || 0)))
    
    const newGroup: Layer = {
      id: Date.now().toString(),
      type: 'group',
      x: minX,
      y: minY,
      width: maxX - minX,
      height: maxY - minY,
      fill: 'transparent',
      stroke: 'transparent',
      strokeWidth: 0,
      data: { children: selectedLayers },
      selected: true
    }
    
    setLayers([...layers.filter(l => !selectedLayers.includes(l.id)), newGroup])
    setSelectedLayers([newGroup.id])
  }

  const ungroupSelected = () => {
    if (selectedLayers.length !== 1) return
    
    const groupLayer = layers.find(l => l.id === selectedLayers[0])
    if (!groupLayer || groupLayer.type !== 'group') return
    
    const childLayers = layers.filter(l => groupLayer.data.children.includes(l.id))
    const updatedLayers = [
      ...layers.filter(l => l.id !== groupLayer.id && !groupLayer.data.children.includes(l.id)),
      ...childLayers.map(l => ({ ...l, selected: true }))
    ]
    
    setLayers(updatedLayers)
    setSelectedLayers(childLayers.map(l => l.id))
  }

  const alignSelected = (alignment: 'left' | 'center' | 'right') => {
    if (selectedLayers.length < 2) return
    
    const selected = layers.filter(l => selectedLayers.includes(l.id))
    const minX = Math.min(...selected.map(l => l.x))
    const maxX = Math.max(...selected.map(l => l.x + (l.width || 0)))
    const centerX = (minX + maxX) / 2
    
    setLayers(layers.map(layer => {
      if (!selectedLayers.includes(layer.id)) return layer
      
      let newX = layer.x
      if (alignment === 'left') {
        newX = minX
      } else if (alignment === 'center') {
        newX = centerX - (layer.width || 0) / 2
      } else if (alignment === 'right') {
        newX = maxX - (layer.width || 0)
      }
      
      return { ...layer, x: newX }
    }))
  }

  return (
    <div className="w-screen h-screen bg-gray-100 flex">
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="bg-gray-800 p-2 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setSelectedTool('select')} 
              className={`p-2 rounded ${selectedTool === 'select' ? 'bg-blue-600' : 'bg-gray-700'} text-white`}
              title="Select Tool"
            >
              <FaMousePointer />
            </button>
            <button 
              onClick={() => setSelectedTool('move')} 
              className={`p-2 rounded ${selectedTool === 'move' ? 'bg-blue-600' : 'bg-gray-700'} text-white`}
              title="Move Tool"
            >
              <FaArrowsAlt />
            </button>
            <button 
              onClick={() => setSelectedTool('free')} 
              className={`p-2 rounded ${selectedTool === 'free' ? 'bg-blue-600' : 'bg-gray-700'} text-white`}
              title="Free Draw"
            >
              <FaPencilAlt />
            </button>
            <button 
              onClick={() => setSelectedTool('rectangle')} 
              className={`p-2 rounded ${selectedTool === 'rectangle' ? 'bg-blue-600' : 'bg-gray-700'} text-white`}
              title="Rectangle"
            >
              <FaSquare />
            </button>
            <button 
              onClick={() => setSelectedTool('circle')} 
              className={`p-2 rounded ${selectedTool === 'circle' ? 'bg-blue-600' : 'bg-gray-700'} text-white`}
              title="Circle"
            >
              <FaCircle />
            </button>
            <button 
              onClick={() => setSelectedTool('line')} 
              className={`p-2 rounded ${selectedTool === 'line' ? 'bg-blue-600' : 'bg-gray-700'} text-white`}
              title="Line"
            >
              <FaSlash />
            </button>
            <button 
              onClick={() => setSelectedTool('text')} 
              className={`p-2 rounded ${selectedTool === 'text' ? 'bg-blue-600' : 'bg-gray-700'} text-white`}
              title="Text"
            >
              <FaFont />
            </button>
            <button 
              onClick={() => setIsEraser(!isEraser)} 
              className={`p-2 rounded ${isEraser ? 'bg-blue-600' : 'bg-gray-700'} text-white`}
              title="Eraser"
            >
              <FaEraser />
            </button>
          </div>
          
          <div className="flex items-center space-x-4">
            <ChromePicker 
              color={color} 
              onChange={(color) => setColor(color.hex)}
              disableAlpha
              className="!shadow-none"
            />
            
            <div className="flex flex-col items-center">
              <label className="text-white text-sm mb-1">Size</label>
              <input
                type="range"
                min="1"
                max="50"
                value={brushSize}
                onChange={(e) => setBrushSize(Number(e.target.value))}
                className="w-24"
              />
            </div>
            
            <div className="flex space-x-2">
              <button onClick={undo} className="p-2 rounded bg-gray-700 text-white" title="Undo">
                <FaUndo />
              </button>
              <button onClick={redo} className="p-2 rounded bg-gray-700 text-white" title="Redo">
                <FaRedo />
              </button>
              <button onClick={clear} className="p-2 rounded bg-gray-700 text-white" title="Clear Canvas">
                Clear
              </button>
              <button onClick={saveImage} className="p-2 rounded bg-gray-700 text-white" title="Save Image">
                <FaSave />
              </button>
            </div>
          </div>
        </div>
        
        {/* Alignment Tools */}
        {selectedLayers.length > 1 && (
          <div className="bg-gray-200 p-2 flex space-x-2">
            <button onClick={() => alignSelected('left')} className="p-2 rounded bg-white" title="Align Left">
              <FaAlignLeft />
            </button>
            <button onClick={() => alignSelected('center')} className="p-2 rounded bg-white" title="Align Center">
              <FaAlignCenter />
            </button>
            <button onClick={() => alignSelected('right')} className="p-2 rounded bg-white" title="Align Right">
              <FaAlignRight />
            </button>
            <button onClick={groupSelected} className="p-2 rounded bg-white" title="Group Selected">
              <FaObjectGroup /> Group
            </button>
          </div>
        )}
        
        {selectedLayers.length === 1 && layers.find(l => l.id === selectedLayers[0] && l.type === 'group') && (
          <div className="bg-gray-200 p-2 flex space-x-2">
            <button onClick={ungroupSelected} className="p-2 rounded bg-white" title="Ungroup">
              <FaObjectUngroup /> Ungroup
            </button>
          </div>
        )}
        
        {/* Canvas Area */}
        <div className="flex-1 relative overflow-auto">
          <canvas
            ref={canvasRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onDoubleClick={handleDoubleClick}
            className="absolute bg-white shadow-lg"
            style={{ width: '100%', height: '100%' }}
          />
          
          {/* Hidden text input for editing text layers */}
          <input
            ref={textInputRef}
            type="text"
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
            onBlur={handleTextBlur}
            onKeyPress={(e) => e.key === 'Enter' && handleTextBlur()}
            className="absolute hidden bg-transparent border-none outline-none"
            style={{ font: `${brushSize * 2}px Arial`, color }}
          />
        </div>
      </div>
      
      {/* Layers Panel */}
      <div className="bg-gray-800 text-white p-4 w-64 border-l border-gray-700">
        <h3 className="font-bold mb-4">Layers</h3>
        <div className="space-y-2">
          {layers.length === 0 && (
            <div className="text-gray-400 text-sm">No layers yet</div>
          )}
          {[...layers].reverse().map(layer => (
            <div 
              key={layer.id}
              onClick={() => setSelectedLayers([layer.id])}
              className={`p-2 rounded cursor-pointer flex items-center ${selectedLayers.includes(layer.id) ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}`}
            >
              <div className="w-4 h-4 mr-2 rounded-sm" style={{ backgroundColor: layer.fill }} />
              {layer.type} ({layer.id.slice(-4)})
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Page