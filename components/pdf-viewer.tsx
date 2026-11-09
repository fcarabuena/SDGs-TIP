"use client"

import { useEffect, useRef, useState } from "react"

// Google's viewer draws PDFs about 800px wide however large its frame is, leaving black bars on
// wider frames. It can't be zoomed from outside, so the frame is loaded just wider than the
// document and scaled up to fill the available space.
const VIEWER_WIDTH = 830
// Image evidence is about this wide relative to its height. Google fits images to the frame's
// height, so the frame takes the same shape to fill its width.
const IMAGE_ASPECT_RATIO = 1.37

interface PDFViewerProps {
  pdfUrl: string
  title: string
  fileType?: "pdf" | "image"
}

/**
 * Document viewer that displays Google Drive PDFs and images
 * Converts Google Drive links to embedded view format
 * @param pdfUrl - Google Drive file link
 * @param title - Title of the document
 * @param fileType - Whether the file is a PDF (default) or an image
 */
export default function PDFViewer({ pdfUrl, title, fileType = "pdf" }: PDFViewerProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const documentLabel = fileType === "image" ? "document" : "PDF"
  const frameBoxRef = useRef<HTMLDivElement>(null)
  const [boxSize, setBoxSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const box = frameBoxRef.current
    if (!box) return
    const observer = new ResizeObserver(() => {
      setBoxSize({ width: box.clientWidth, height: box.clientHeight })
    })
    observer.observe(box)
    return () => observer.disconnect()
  }, [])

  // Narrow screens use the frame as is, because Google's viewer already fits itself to them.
  const scale = boxSize.width / VIEWER_WIDTH
  const frameStyle =
    scale > 1
      ? {
          width: `${VIEWER_WIDTH}px`,
          height: `${boxSize.height / scale}px`,
          transform: `scale(${scale})`,
          transformOrigin: "0 0",
        }
      : { width: "100%", height: "100%" }

  /**
   * Converts Google Drive sharing link to embedded preview URL with fit parameters
   * Example: https://drive.google.com/file/d/FILE_ID/view?usp=sharing
   * Converts to: https://drive.google.com/file/d/FILE_ID/preview?embedded=true&rm=minimal
   * Parameters:
   * - embedded=true: Optimizes for embedded viewing
   * - rm=minimal: Removes unnecessary controls for cleaner view
   */
  const getEmbedUrl = (url: string): string => {
    try {
      // Extract file ID from Google Drive URL
      const match = url.match(/\/d\/([^/]+)/)
      if (match && match[1]) {
        return `https://drive.google.com/file/d/${match[1]}/preview?embedded=true&rm=minimal`
      }
      return url
    } catch (error) {
      console.error("Error parsing PDF URL:", error)
      return url
    }
  }

  const embedUrl = getEmbedUrl(pdfUrl)

  const handleIframeLoad = () => {
    setIsLoading(false)
  }

  const handleIframeError = () => {
    setIsLoading(false)
    setHasError(true)
  }

  return (
    <div className="w-full space-y-4">
      {/* PDF Controls */}
      <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl">📄</span>
          <div>
            <p className="text-sm font-medium text-[#292929]">{fileType === "image" ? "Document" : "PDF Document"}</p>
            <p className="text-xs text-[#292929]/60">{title}</p>
          </div>
        </div>
        <a
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#f6c445] text-white rounded-lg hover:bg-[#e5b33e] transition-colors font-medium text-sm"
        >
          <span>Open in New Tab</span>
          <span>↗</span>
        </a>
      </div>

      {/* PDF Viewer */}
      <div
        ref={frameBoxRef}
        className="relative w-full bg-gray-100 rounded-lg overflow-hidden shadow-lg"
        style={
          fileType === "image"
            ? { aspectRatio: IMAGE_ASPECT_RATIO }
            : { height: "calc(100vh - 300px)", minHeight: "600px" }
        }
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#f6c445] mx-auto mb-4"></div>
              <p className="text-[#292929]/60">Loading {documentLabel}...</p>
            </div>
          </div>
        )}

        {hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="text-center p-8">
              <span className="text-6xl mb-4 block">⚠️</span>
              <p className="text-[#292929] font-semibold mb-2">Unable to load {documentLabel}</p>
              <p className="text-sm text-[#292929]/60 mb-4">
                The {documentLabel} could not be displayed in the browser.
              </p>
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#f6c445] text-white rounded-lg hover:bg-[#e5b33e] transition-colors font-medium"
              >
                <span>Open in Google Drive</span>
                <span>↗</span>
              </a>
            </div>
          </div>
        )}

        <iframe
          src={embedUrl}
          className="block border-0"
          style={frameStyle}
          title={title}
          onLoad={handleIframeLoad}
          onError={handleIframeError}
          allow="autoplay"
        />
      </div>

      {/* Alternative Link */}
      <div className="text-center text-sm text-[#292929]/60">
        If the {documentLabel} doesn&apos;t display correctly,{" "}
        <a
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#f6c445] hover:underline font-medium"
        >
          open it directly in Google Drive
        </a>
      </div>
    </div>
  )
}
