import React, { useState, useRef } from 'react';
import { 
  ExternalLink, ChevronLeft, ChevronRight, 
  Layers, RefreshCw, AlertTriangle, BookOpen, Check
} from 'lucide-react';

interface PDFViewerPanelProps {
  pdfUrl: string;
  title: string;
  totalPages?: number;
  initialPage?: number;
  onPageChange?: (page: number) => void;
  className?: string;
}

export const PDFViewerPanel: React.FC<PDFViewerPanelProps> = ({
  pdfUrl,
  title,
  totalPages = 12,
  initialPage = 1,
  onPageChange,
  className = ''
}) => {
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [showPageDrawer, setShowPageDrawer] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement | null>(null);

  // Sync page changes to parent callback
  const handlePageJump = (page: number) => {
    setCurrentPage(page);
    setShowPageDrawer(false);
    if (onPageChange) onPageChange(page);
  };

  const encodedPdfUrl = encodeURIComponent(pdfUrl);
  const googleDocsViewerUrl = `https://docs.google.com/viewer?url=${encodedPdfUrl}&embedded=true`;

  return (
    <div className={`relative flex flex-col h-full bg-slate-900 rounded-3xl border border-slate-800 shadow-md overflow-hidden ${className}`}>
      
      {/* Top PDF Context Bar */}
      <div className="bg-slate-950 border-b border-slate-800 px-4 py-2.5 flex items-center justify-between gap-3 text-xs select-none shrink-0">
        
        <div className="flex items-center gap-2 text-slate-300 font-bold truncate">
          <BookOpen className="w-4 h-4 text-purple-400 shrink-0" />
          <span className="truncate">Page {currentPage} of {totalPages}</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Pages Drawer Toggle */}
          <button
            onClick={() => setShowPageDrawer(!showPageDrawer)}
            className={`px-3 py-1 rounded-xl font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
              showPageDrawer ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Pages</span>
          </button>

          {/* Open Original PDF Link */}
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl transition-colors flex items-center gap-1"
            title="Open Original DGE PDF in New Tab"
          >
            <span className="hidden sm:inline">View Original</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>

      {/* Pages Thumbnail Drawer Popover */}
      {showPageDrawer && (
        <div className="absolute top-12 left-4 right-4 z-30 bg-slate-950/95 border border-purple-800/60 backdrop-blur-md rounded-2xl p-4 shadow-2xl space-y-3 max-h-72 overflow-y-auto">
          <div className="flex items-center justify-between text-xs font-bold text-slate-300 border-b border-slate-800 pb-2">
            <span>Jump to PDF Page</span>
            <button onClick={() => setShowPageDrawer(false)} className="text-slate-500 hover:text-white">✕</button>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
            {Array.from({ length: totalPages }, (_, idx) => idx + 1).map(pNum => (
              <button
                key={pNum}
                onClick={() => handlePageJump(pNum)}
                className={`py-2 rounded-xl font-mono text-xs font-bold border transition-all cursor-pointer flex flex-col items-center justify-center gap-0.5 ${
                  currentPage === pNum
                    ? 'bg-purple-600 border-purple-500 text-white shadow-md'
                    : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-purple-800'
                }`}
              >
                <span>Page {pNum}</span>
                {currentPage === pNum && <Check className="w-3 h-3 text-white" />}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Vertical Continuous Scrolling Container */}
      <div ref={containerRef} className="flex-1 relative w-full h-full bg-slate-950 overflow-y-auto">
        
        {/* Loading State */}
        {isLoading && (
          <div className="absolute inset-0 z-10 bg-slate-950/90 flex flex-col items-center justify-center space-y-3 p-6 text-center">
            <RefreshCw className="w-8 h-8 text-purple-400 animate-spin" />
            <div className="font-extrabold text-white text-sm">Loading Official Question Paper...</div>
            <div className="text-xs font-bold text-slate-400 font-tamil">அதிகாரப்பூர்வ வினாத்தாள் ஏற்றப்படுகிறது...</div>
          </div>
        )}

        {/* Error State */}
        {hasError ? (
          <div className="h-full flex flex-col items-center justify-center p-6 text-center space-y-4">
            <AlertTriangle className="w-10 h-10 text-amber-400" />
            <div>
              <h3 className="font-extrabold text-white text-base">Official PDF Couldn't Be Embedded Directly</h3>
              <p className="text-xs text-slate-400 max-w-sm mt-1">
                You can still view the full official document directly from the Tamil Nadu DGE repository.
              </p>
            </div>
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors inline-flex items-center gap-2"
            >
              <span>Open Original DGE PDF</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        ) : (
          /* PDF Embed Viewer Container */
          <iframe
            src={googleDocsViewerUrl}
            title={title}
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setIsLoading(false);
              setHasError(true);
            }}
            className="w-full h-full min-h-[500px] border-none block bg-slate-900"
          />
        )}

      </div>

      {/* Bottom Page Navigation Controls */}
      <div className="bg-slate-950 border-t border-slate-800 px-4 py-2.5 flex items-center justify-between gap-3 text-xs select-none shrink-0">
        <button
          onClick={() => handlePageJump(Math.max(1, currentPage - 1))}
          disabled={currentPage <= 1}
          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 font-bold rounded-xl transition-colors inline-flex items-center gap-1 cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous Page</span>
        </button>

        <span className="font-mono text-xs font-bold text-purple-300">
          {currentPage} / {totalPages}
        </span>

        <button
          onClick={() => handlePageJump(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage >= totalPages}
          className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 disabled:opacity-40 text-white font-bold rounded-xl transition-colors inline-flex items-center gap-1 cursor-pointer"
        >
          <span>Next Page</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
