"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { sdgData } from "@/data/sdg-data"
import { useState, useRef, useEffect } from "react"
import { useSidebar } from "@/contexts/sidebar-context"
import { assetPath } from "@/lib/asset-path"

interface SidebarProps {
  onNavigate?: (sectionId: string) => void
}

export default function Sidebar({ onNavigate }: SidebarProps) {
  const pathname = usePathname()
  const isHomePage = pathname === "/"
  const [expandedSDGs, setExpandedSDGs] = useState<Set<string>>(new Set())
  const [sidebarWidth, setSidebarWidth] = useState(280)
  const [isResizing, setIsResizing] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [scrollRestored, setScrollRestored] = useState(false)
  const sidebarRef = useRef<HTMLDivElement>(null)
  const { isOpen, toggleSidebar } = useSidebar()
  const scrollRef = useRef<HTMLDivElement>(null)
  const isRestoringScroll = useRef(false)
  const initialScrollPosition = useRef<number | null>(null)


  const toggleSDGExpand = (sdgId: string) => {
    const newExpanded = new Set(expandedSDGs)
    if (newExpanded.has(sdgId)) {
      newExpanded.delete(sdgId)
    } else {
      newExpanded.add(sdgId)
    }
    setExpandedSDGs(newExpanded)
  }

  const startResizing = () => {
    setIsResizing(true)
  }

  
  // Load initial scroll position BEFORE mounting
  useEffect(() => {
    const savedScrollPosition = localStorage.getItem("sidebar-scroll-position")
    if (savedScrollPosition) {
      initialScrollPosition.current = parseInt(savedScrollPosition, 10)
    }
  }, [])

  // Load expanded SDGs from localStorage on mount
  useEffect(() => {
    const savedExpanded = localStorage.getItem("sidebar-expanded-sdgs")
    if (savedExpanded) {
      try {
        const expandedArray = JSON.parse(savedExpanded)
        setExpandedSDGs(new Set(expandedArray))
      } catch (e) {
        // If parsing fails, just use empty set
        console.error("Failed to parse expanded SDGs from localStorage", e)
      }
    }
    setMounted(true)
  }, [])

  // Save expanded SDGs to localStorage whenever they change
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("sidebar-expanded-sdgs", JSON.stringify(Array.from(expandedSDGs)))
    }
  }, [expandedSDGs, mounted])

  // Restore scroll position IMMEDIATELY when scrollRef is available
  useEffect(() => {
    if (scrollRef.current && initialScrollPosition.current !== null && !scrollRestored) {
      // Use requestAnimationFrame to ensure DOM is ready
      requestAnimationFrame(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTop = initialScrollPosition.current!
          setScrollRestored(true)
        }
      })
    }
  })

  // Save scroll position to localStorage whenever it changes
  useEffect(() => {
    const scrollElement = scrollRef.current
    if (!scrollElement || !mounted) return

    const handleScroll = () => {
      localStorage.setItem("sidebar-scroll-position", String(scrollElement.scrollTop))
    }

    scrollElement.addEventListener("scroll", handleScroll, { passive: true })
    return () => scrollElement.removeEventListener("scroll", handleScroll)
  }, [mounted])



  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return
      const newWidth = e.clientX
      if (newWidth >= 200 && newWidth <= 500) {
        setSidebarWidth(newWidth)
      }
    }

    const handleMouseUp = () => {
      setIsResizing(false)
    }

    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isResizing])

  return (
    <>
      {/* Menu Toggle Button - Fixed Position */}
      <button
        onClick={toggleSidebar}
        className={`fixed top-4 z-50 bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 p-2.5 hover:bg-gray-50 group ${
          isOpen ? "left-[calc(280px-3rem)]" : "left-4"
        }`}
        style={{
          left: isOpen ? `${sidebarWidth - 48}px` : "16px",
        }}
        aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
      >
        <svg
          className="w-5 h-5 text-gray-700 group-hover:text-[#f6c445] transition-colors"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`bg-white border-r border-gray-200 overflow-hidden flex flex-col relative transition-all duration-300 ease-in-out ${
          isOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
        }`}
        style={{
          width: isOpen ? `${sidebarWidth}px` : "0px",
          minWidth: isOpen ? `${sidebarWidth}px` : "0px",
        }}
      >
        <div 
          ref={scrollRef} 
          className="overflow-y-auto flex flex-col h-full"
          style={{ 
            scrollBehavior: scrollRestored ? 'smooth' : 'auto'
          }}
        >
          {/* Header */}
          <div className="p-4 border-b border-gray-200 sticky top-0 bg-white z-20">
            <div className="h-20 relative w-full max-w-40">
              <Image
                src={assetPath("/contents/T.I.P. Logo HD.png")}
                alt="T.I.P. Logo"
                fill
                className="object-contain object-left"
              />
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-3 space-y-1.5">
            {/* About Section - Only on home page */}
            {isHomePage ? (
              <button
                onClick={() => onNavigate && onNavigate("about")}
                className="w-full text-left px-3 py-2.5 rounded-lg transition-colors duration-200 text-s font-medium text-[#292929] hover:bg-gray-100 leading-tight"
              >
                Institutional Commitment to the SDGs
              </button>
            ) : (
              <Link
                href="/"
                className="block w-full text-left px-3 py-2.5 rounded-lg transition-colors duration-200 text-s font-medium text-[#292929] hover:bg-gray-100 leading-tight"
              >
                ← Back to Home
              </Link>
            )}

            {sdgData.map((sdg) => {
              const isExpanded = expandedSDGs.has(sdg.id)
              // Only indicators with published evidence appear in the sidebar
              const hasAnyTitles = sdg.targets.some((target) =>
                target.indicators.some((indicator) => indicator.link)
              )

              return (
                <div key={sdg.id}>
                  <div className="flex items-center gap-0.5">
                    <Link
                      href={`/sdg/${sdg.number}`}
                      className="flex-1 text-left px-3 py-2.5 rounded-lg transition-all duration-200 text-[13px] font-medium text-[#292929] hover:text-[#f6c445] min-w-0"
                    >
                      <span className="truncate block">{`SDG ${sdg.number}: ${sdg.title}`}</span>
                    </Link>
                    {hasAnyTitles && (
                      <button
                        onClick={() => toggleSDGExpand(sdg.id)}
                        className="px-2 py-2.5 rounded-lg transition-all duration-200 text-[#292929]/25 hover:text-[#f6c445] shrink-0"
                      >
                        <div
                          className="w-3.5 h-3.5 shrink-0 transition-transform duration-300"
                          style={{
                            transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                          }}
                        >
                          <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 14l-7 7m0 0l-7-7m7 7V3"
                            />
                          </svg>
                        </div>
                      </button>
                    )}
                  </div>

                  {isExpanded && hasAnyTitles && (
                    <div className="ml-3 mt-1 space-y-0.5 border-l border-gray-200 pl-3 animate-in fade-in duration-200">
                      {sdg.targets.map((target) => {
                        const hasIndicatorTitles = target.indicators.some((indicator) => indicator.link)

                        return (
                          <div key={target.id}>
                            {target.title && hasIndicatorTitles && (
                              <p className="text-[12px] text-[#292929]/80 py-1.5 font-semibold uppercase tracking-wide w-full text-left px-2 leading-tight wrap-break-word">
                                {target.title}
                              </p>
                            )}
                            {hasIndicatorTitles && (
                              <div className="ml-1 space-y-0.5">
                                {target.indicators.map((indicator) => {
                                  if (!indicator.link) return null
                                  return (
                                    <Link
                                      key={indicator.id}
                                      href={`/sdg/${sdg.number}/${indicator.id}`}
                                      className="text-[13px] text-[#292929]/70 py-1 px-2 hover:text-[#f6c445] hover:bg-gray-100 transition-colors w-full text-left block rounded leading-tight wrap-break-word"
                                    >
                                      • {indicator.title}
                                    </Link>
                                  )
                                })}
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}
          </nav>
        </div>

        {/* Resize Handle - Only visible when sidebar is open */}
        {isOpen && (
          <div
            onMouseDown={startResizing}
            className="absolute top-0 right-0 w-1 h-full cursor-col-resize hover:bg-[#f6c445] transition-colors z-30"
            style={{ backgroundColor: isResizing ? "#f6c445" : "transparent" }}
          />
        )}
      </div>
    </>
  )
}
