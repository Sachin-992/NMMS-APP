import React, { useRef, useState, useEffect, useCallback } from 'react';
import type { TeacherStroke, TeacherStrokePoint } from '../../types';
import { 
  PenTool, Eraser, RotateCcw, RotateCw, Trash2, Type, 
  Minus, ArrowRight, Square, Circle, Highlighter
} from 'lucide-react';

interface WhiteboardCanvasProps {
  initialStrokes?: TeacherStroke[];
  onChange?: (strokes: TeacherStroke[]) => void;
  readOnly?: boolean;
  className?: string;
}

export type DrawingTool = 'pen' | 'highlighter' | 'eraser' | 'text' | 'line' | 'arrow' | 'rect' | 'circle';

export const WhiteboardCanvas: React.FC<WhiteboardCanvasProps> = ({
  initialStrokes = [],
  onChange,
  readOnly = false,
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [tool, setTool] = useState<DrawingTool>('pen');
  const [color, setColor] = useState<string>('#1E293B');
  const [strokeWidth, setStrokeWidth] = useState<number>(3);

  const [strokes, setStrokes] = useState<TeacherStroke[]>(initialStrokes);
  const [undoStack, setUndoStack] = useState<TeacherStroke[][]>([]);
  const [redoStack, setRedoStack] = useState<TeacherStroke[][]>([]);

  const [isDrawing, setIsDrawing] = useState(false);
  const [currentPoints, setCurrentPoints] = useState<TeacherStrokePoint[]>([]);
  const [textInputPos, setTextInputPos] = useState<{ x: number; y: number } | null>(null);
  const [textValue, setTextValue] = useState('');

  // Sync external initialStrokes
  useEffect(() => {
    setStrokes(initialStrokes);
  }, [initialStrokes]);

  // Notify parent of updates
  const updateStrokes = (newStrokes: TeacherStroke[]) => {
    setUndoStack(prev => [...prev, strokes]);
    setRedoStack([]);
    setStrokes(newStrokes);
    if (onChange) onChange(newStrokes);
  };

  const redrawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear background to clean white
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid pattern (subtle teaching grid)
    ctx.strokeStyle = '#F1F5F9';
    ctx.lineWidth = 1;
    const gridSize = 24;
    for (let x = 0; x < canvas.width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    // Render strokes
    strokes.forEach(stroke => {
      ctx.save();
      ctx.lineWidth = stroke.strokeWidth;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      if (stroke.type === 'eraser') {
        ctx.strokeStyle = '#FFFFFF';
      } else if (stroke.type === 'highlighter') {
        ctx.strokeStyle = stroke.color;
        ctx.globalAlpha = 0.35;
      } else {
        ctx.strokeStyle = stroke.color;
        ctx.fillStyle = stroke.color;
        ctx.globalAlpha = 1.0;
      }

      if (stroke.type === 'text' && stroke.text && stroke.points.length > 0) {
        ctx.font = `${stroke.strokeWidth * 5 + 12}px sans-serif`;
        ctx.fillText(stroke.text, stroke.points[0].x, stroke.points[0].y);
      } else if (stroke.type === 'line' && stroke.points.length >= 2) {
        ctx.beginPath();
        ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
        ctx.lineTo(stroke.points[1].x, stroke.points[1].y);
        ctx.stroke();
      } else if (stroke.type === 'arrow' && stroke.points.length >= 2) {
        const p1 = stroke.points[0];
        const p2 = stroke.points[1];
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();

        // Arrow head
        const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x);
        const headLen = stroke.strokeWidth * 4;
        ctx.beginPath();
        ctx.moveTo(p2.x, p2.y);
        ctx.lineTo(p2.x - headLen * Math.cos(angle - Math.PI / 6), p2.y - headLen * Math.sin(angle - Math.PI / 6));
        ctx.lineTo(p2.x - headLen * Math.cos(angle + Math.PI / 6), p2.y - headLen * Math.sin(angle + Math.PI / 6));
        ctx.closePath();
        ctx.fill();
      } else if (stroke.type === 'rect' && stroke.points.length >= 2) {
        const p1 = stroke.points[0];
        const p2 = stroke.points[1];
        ctx.strokeRect(p1.x, p1.y, p2.x - p1.x, p2.y - p1.y);
      } else if (stroke.type === 'circle' && stroke.points.length >= 2) {
        const p1 = stroke.points[0];
        const p2 = stroke.points[1];
        const radius = Math.hypot(p2.x - p1.x, p2.y - p1.y);
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, radius, 0, Math.PI * 2);
        ctx.stroke();
      } else if (stroke.points.length > 1) {
        ctx.beginPath();
        ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
        for (let i = 1; i < stroke.points.length; i++) {
          ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
        }
        ctx.stroke();
      }
      ctx.restore();
    });

    // Render current active stroke preview
    if (isDrawing && currentPoints.length > 0) {
      ctx.save();
      ctx.lineWidth = strokeWidth;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = tool === 'eraser' ? '#FFFFFF' : tool === 'highlighter' ? color : color;
      ctx.globalAlpha = tool === 'highlighter' ? 0.35 : 1.0;

      if (tool === 'line' && currentPoints.length >= 2) {
        ctx.beginPath();
        ctx.moveTo(currentPoints[0].x, currentPoints[0].y);
        ctx.lineTo(currentPoints[currentPoints.length - 1].x, currentPoints[currentPoints.length - 1].y);
        ctx.stroke();
      } else if (tool === 'rect' && currentPoints.length >= 2) {
        const p1 = currentPoints[0];
        const p2 = currentPoints[currentPoints.length - 1];
        ctx.strokeRect(p1.x, p1.y, p2.x - p1.x, p2.y - p1.y);
      } else if (tool === 'circle' && currentPoints.length >= 2) {
        const p1 = currentPoints[0];
        const p2 = currentPoints[currentPoints.length - 1];
        const radius = Math.hypot(p2.x - p1.x, p2.y - p1.y);
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, radius, 0, Math.PI * 2);
        ctx.stroke();
      } else if (currentPoints.length > 1) {
        ctx.beginPath();
        ctx.moveTo(currentPoints[0].x, currentPoints[0].y);
        for (let i = 1; i < currentPoints.length; i++) {
          ctx.lineTo(currentPoints[i].x, currentPoints[i].y);
        }
        ctx.stroke();
      }
      ctx.restore();
    }
  }, [strokes, isDrawing, currentPoints, color, strokeWidth, tool]);

  // Handle Resize
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      redrawCanvas();
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [redrawCanvas]);

  useEffect(() => {
    redrawCanvas();
  }, [strokes, redrawCanvas]);

  // Pointer event handlers
  const getCanvasCoords = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (readOnly) return;
    const pt = getCanvasCoords(e);

    if (tool === 'text') {
      setTextInputPos(pt);
      return;
    }

    setIsDrawing(true);
    setCurrentPoints([pt]);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing || readOnly) return;
    const pt = getCanvasCoords(e);
    if (tool === 'line' || tool === 'arrow' || tool === 'rect' || tool === 'circle') {
      setCurrentPoints([currentPoints[0], pt]);
    } else {
      setCurrentPoints(prev => [...prev, pt]);
    }
  };

  const handlePointerUp = () => {
    if (!isDrawing || readOnly) return;
    setIsDrawing(false);

    if (currentPoints.length > 0) {
      const newStroke: TeacherStroke = {
        id: `stroke-${Date.now()}`,
        type: tool,
        points: currentPoints,
        color: tool === 'eraser' ? '#FFFFFF' : color,
        strokeWidth
      };
      updateStrokes([...strokes, newStroke]);
    }
    setCurrentPoints([]);
  };

  const handleAddText = (e: React.FormEvent) => {
    e.preventDefault();
    if (!textInputPos || !textValue.trim()) {
      setTextInputPos(null);
      setTextValue('');
      return;
    }

    const textStroke: TeacherStroke = {
      id: `stroke-txt-${Date.now()}`,
      type: 'text',
      points: [textInputPos],
      color,
      strokeWidth,
      text: textValue.trim()
    };

    updateStrokes([...strokes, textStroke]);
    setTextInputPos(null);
    setTextValue('');
  };

  const handleUndo = () => {
    if (undoStack.length === 0) return;
    const previous = undoStack[undoStack.length - 1];
    setUndoStack(prev => prev.slice(0, -1));
    setRedoStack(prev => [...prev, strokes]);
    setStrokes(previous);
    if (onChange) onChange(previous);
  };

  const handleRedo = () => {
    if (redoStack.length === 0) return;
    const next = redoStack[redoStack.length - 1];
    setRedoStack(prev => prev.slice(0, -1));
    setUndoStack(prev => [...prev, strokes]);
    setStrokes(next);
    if (onChange) onChange(next);
  };

  const handleClear = () => {
    updateStrokes([]);
  };

  return (
    <div ref={containerRef} className={`relative flex flex-col h-full bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden ${className}`}>
      
      {/* Top Whiteboard Control Bar */}
      {!readOnly && (
        <div className="bg-slate-50 border-b border-slate-200 px-4 py-2 flex flex-wrap items-center justify-between gap-3 text-xs z-10 select-none">
          
          {/* Drawing Tools */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setTool('pen')}
              className={`p-2 rounded-xl transition-all cursor-pointer ${
                tool === 'pen' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200'
              }`}
              title="Pen Tool"
            >
              <PenTool className="w-4 h-4" />
            </button>

            <button
              onClick={() => setTool('highlighter')}
              className={`p-2 rounded-xl transition-all cursor-pointer ${
                tool === 'highlighter' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200'
              }`}
              title="Highlighter"
            >
              <Highlighter className="w-4 h-4" />
            </button>

            <button
              onClick={() => setTool('eraser')}
              className={`p-2 rounded-xl transition-all cursor-pointer ${
                tool === 'eraser' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200'
              }`}
              title="Eraser"
            >
              <Eraser className="w-4 h-4" />
            </button>

            <button
              onClick={() => setTool('text')}
              className={`p-2 rounded-xl transition-all cursor-pointer ${
                tool === 'text' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200'
              }`}
              title="Text Box"
            >
              <Type className="w-4 h-4" />
            </button>

            <div className="w-px h-5 bg-slate-300 mx-1" />

            <button
              onClick={() => setTool('line')}
              className={`p-2 rounded-xl transition-all cursor-pointer ${
                tool === 'line' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200'
              }`}
              title="Line"
            >
              <Minus className="w-4 h-4" />
            </button>

            <button
              onClick={() => setTool('arrow')}
              className={`p-2 rounded-xl transition-all cursor-pointer ${
                tool === 'arrow' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200'
              }`}
              title="Arrow"
            >
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setTool('rect')}
              className={`p-2 rounded-xl transition-all cursor-pointer ${
                tool === 'rect' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200'
              }`}
              title="Rectangle"
            >
              <Square className="w-4 h-4" />
            </button>

            <button
              onClick={() => setTool('circle')}
              className={`p-2 rounded-xl transition-all cursor-pointer ${
                tool === 'circle' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200'
              }`}
              title="Circle"
            >
              <Circle className="w-4 h-4" />
            </button>
          </div>

          {/* Color Palette */}
          <div className="flex items-center gap-1.5">
            {['#1E293B', '#DC2626', '#2563EB', '#059669', '#D97706', '#9333EA'].map(c => (
              <button
                key={c}
                onClick={() => setColor(c)}
                style={{ backgroundColor: c }}
                className={`w-5 h-5 rounded-full border-2 transition-transform cursor-pointer ${
                  color === c ? 'scale-125 border-slate-900 shadow-xs' : 'border-white'
                }`}
              />
            ))}
          </div>

          {/* Stroke Width & Action buttons */}
          <div className="flex items-center gap-2">
            <input
              type="range"
              min="2"
              max="16"
              value={strokeWidth}
              onChange={e => setStrokeWidth(Number(e.target.value))}
              className="w-16 h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer"
              title="Stroke Thickness"
            />

            <button
              onClick={handleUndo}
              disabled={undoStack.length === 0}
              className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-200 disabled:opacity-30 cursor-pointer"
              title="Undo (Ctrl+Z)"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={handleRedo}
              disabled={redoStack.length === 0}
              className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-200 disabled:opacity-30 cursor-pointer"
              title="Redo (Ctrl+Shift+Z)"
            >
              <RotateCw className="w-4 h-4" />
            </button>

            <button
              onClick={handleClear}
              className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
              title="Clear Board"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

      {/* HTML5 Canvas */}
      <div className="flex-1 relative w-full h-full min-h-[350px]">
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          className="touch-none w-full h-full cursor-crosshair block"
        />

        {/* Text Input Popover overlay */}
        {textInputPos && (
          <form
            onSubmit={handleAddText}
            style={{ left: textInputPos.x, top: textInputPos.y }}
            className="absolute z-20 bg-white border border-blue-500 shadow-lg rounded-xl p-2 flex gap-1 -translate-y-1/2"
          >
            <input
              type="text"
              autoFocus
              placeholder="Type teacher note..."
              value={textValue}
              onChange={e => setTextValue(e.target.value)}
              className="px-2 py-1 text-xs font-semibold border rounded-lg focus:outline-none focus:border-blue-600 text-slate-900"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white font-bold text-xs px-2.5 py-1 rounded-lg"
            >
              Add
            </button>
          </form>
        )}
      </div>

    </div>
  );
};
