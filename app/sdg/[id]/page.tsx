import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import Sidebar from "@/components/side-bar"
import { assetPath } from "@/lib/asset-path"
import { evidenceStatusLabels, sdgData } from "@/data/sdg-data"

export function generateStaticParams() {
  return sdgData.map((sdg) => ({ id: String(sdg.number) }))
}

/**
 * Individual SDG page component
 * Displays the SDG's commitment statement, targets, and indicators
 */
export default async function SDGPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const sdg = sdgData.find((s) => String(s.number) === id)

  if (!sdg) {
    notFound()
  }

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto scroll-smooth">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        {/* SDG Header */}
        <div className="mb-12">
          <div className="flex items-center gap-6 mb-8">
            <div className="shrink-0">
              <div className="w-32 h-32 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={assetPath(`/sdg-logos/E_WEB_INVERTED_${sdg.number.toString().padStart(2, "0")}.png`)}
                  alt={`SDG ${sdg.number}: ${sdg.title}`}
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="flex-1">
              <h1 className="text-4xl md:text-6xl font-bold text-[#292929]">{sdg.title}</h1>
            </div>
          </div>
          <div className="h-1 w-32 bg-[#f6c445] rounded-full"></div>
        </div>

        {/* Commitment Statement */}
        <div className="bg-gray-50 rounded-lg p-6 mb-16">
          <p className="text-[#292929] leading-relaxed text-lg">{sdg.statement}</p>
        </div>

        {/* Targets and Indicators */}
        <div className="space-y-16">
          {sdg.targets.map((target) => (
            <div key={target.id} className="space-y-8">
              {/* Target Title */}
              {target.title && (
                <h2 className="text-2xl md:text-3xl font-bold text-[#292929]">{target.title}</h2>
              )}

              {/* Indicators */}
              {target.indicators.map((indicator) => (
                <div
                  key={indicator.id}
                  className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-wrap items-center gap-4">
                    <h3 className="text-lg font-semibold text-[#292929]">{indicator.title}</h3>
                    {indicator.link ? (
                      <Link
                        href={`/sdg/${sdg.number}/${indicator.id}`}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-[#f6c445] text-white rounded-lg hover:bg-[#e5b33e] transition-colors font-medium"
                      >
                        <span>{indicator.fileType === "image" ? "View Document" : "View PDF"}</span>
                        <span>📄</span>
                      </Link>
                    ) : (
                      indicator.status && (
                        <span className="inline-flex items-center px-3 py-1 bg-gray-200 text-[#292929]/70 rounded-lg text-sm">
                          {evidenceStatusLabels[indicator.status]}
                        </span>
                      )
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-16 p-8 border-t border-gray-200 bg-white">
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
    </div>
  )
}
