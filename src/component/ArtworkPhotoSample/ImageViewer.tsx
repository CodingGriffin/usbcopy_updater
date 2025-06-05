import React, { useState, useRef, useEffect } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, X, Maximize2, Minimize2 } from 'lucide-react';

interface ImageViewerProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  title: string;
}

export default function ImageViewer({ isOpen, onClose, imageUrl, title }: ImageViewerProps) {
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      // Reset state when modal closes
      setScale(1);
      setRotation(0);
      setIsFullscreen(false);
    }
  }, [isOpen]);

  const handleZoom = (delta: number) => {
    setScale(prev => Math.min(Math.max(0.5, prev + delta), 3));
  };

  const handleRotate = () => {
    setRotation(prev => (prev + 90) % 360);
  };

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      await containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      await document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 bg-black bg-opacity-90 flex flex-col z-50"
      onClick={onClose}
    >
      {/* Toolbar */}
      <div 
        className="flex items-center justify-between p-4 bg-slate-900"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold text-white">{title}</h2>
        <div className="flex items-center gap-4">
          <button
            onClick={() => handleZoom(-0.25)}
            className="p-2 hover:bg-slate-800 rounded-lg text-slate-300 hover:text-white transition-colors"
            title="Zoom Out"
          >
            <ZoomOut size={20} />
          </button>
          <span className="text-slate-300 min-w-[4rem] text-center">
            {Math.round(scale * 100)}%
          </span>
          <button
            onClick={() => handleZoom(0.25)}
            className="p-2 hover:bg-slate-800 rounded-lg text-slate-300 hover:text-white transition-colors"
            title="Zoom In"
          >
            <ZoomIn size={20} />
          </button>
          <button
            onClick={handleRotate}
            className="p-2 hover:bg-slate-800 rounded-lg text-slate-300 hover:text-white transition-colors"
            title="Rotate"
          >
            <RotateCcw size={20} />
          </button>
          <button
            onClick={toggleFullscreen}
            className="p-2 hover:bg-slate-800 rounded-lg text-slate-300 hover:text-white transition-colors"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
          </button>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-800 rounded-lg text-slate-300 hover:text-white transition-colors ml-4"
            title="Close"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Image Container */}
      <div 
        className="flex-1 overflow-auto flex items-center justify-center p-4"
        onClick={e => e.stopPropagation()}
      >
        <div 
          className="relative cursor-move touch-none"
          style={{
            transform: `scale(${scale}) rotate(${rotation}deg)`,
            transition: 'transform 0.2s ease-out',
          }}
        >
          <img
            src={imageUrl}
            alt={title}
            className="max-w-full max-h-[80vh] object-contain"
            draggable={false}
          />
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-slate-900 bg-opacity-80 px-4 py-2 rounded-lg text-slate-300 text-sm">
        Use mouse wheel or pinch to zoom • Click and drag to pan
      </div>
    </div>
  );
}