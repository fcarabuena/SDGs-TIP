"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import Sidebar from "@/components/side-bar"
import { sdgData } from "@/data/sdg-data"
import AboutSection from "@/components/about-section"
import { assetPath } from "@/lib/asset-path"

export default function Home() {
  const mainContentRef = useRef<HTMLDivElement>(null)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      {/* Sidebar Navigation */}
      <Sidebar onNavigate={scrollToSection} />

      {/* Main Content Area */}
      <div ref={mainContentRef} className="flex-1 overflow-y-auto scroll-smooth">
        {/* About Section */}
        <AboutSection />

        {/* SDG Grid */}
        <section id="sdgs" className="bg-white border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
            <h2 className="text-3xl md:text-4xl font-bold text-[#292929] mb-12">
              Sustainable Development Goals
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sdgData.map((sdg) => (
                <Link
                  key={sdg.id}
                  href={`/sdg/${sdg.number}`}
                  className="group bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-[#f6c445] hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-lg overflow-hidden shadow-md shrink-0">
                      <Image
                        src={assetPath(`/sdg-logos/E_WEB_INVERTED_${sdg.number.toString().padStart(2, "0")}.png`)}
                        alt={`SDG ${sdg.number}`}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <span className="text-sm font-bold text-[#f6c445]">SDG {sdg.number}</span>
                      <h3 className="text-lg font-bold text-[#292929] group-hover:text-[#f6c445] transition-colors line-clamp-2">
                        {sdg.title}
                      </h3>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-[#292929]/60 group-hover:text-[#f6c445] transition-colors">
                    <span>View Details</span>
                    <span className="ml-1">→</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
        
        {/* Institutional Summary Statement */}
        <section className="bg-white border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
            <h2 className="text-3xl md:text-4xl font-bold text-[#292929] mb-8">
              Institutional Summary Statement
            </h2>
            <p className="text-md text-[#292929]/70 leading-relaxed max-w-4xl">
              At T.I.P., sustainability is more than compliance — it is a shared responsibility.
              Through our education, facilities, research, and community engagement, we aim to nurture professionals who innovate responsibly, lead with integrity, and act with compassion for people and the planet.
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-auto p-8 border-t border-gray-200 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="h-26 relative w-48">
              <Image 
                src={assetPath("/contents/T.I.P. Logo HD.png")}
                alt="T.I.P. Logo" 
                fill
                className="object-contain object-left"
              />
            </div>
            <p className="mt-4 text-xs text-[#292929]/60">
              © 2023 Technological Institute of the Philippines. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}
