import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import Sidebar from "@/components/side-bar"
import PDFViewer from "@/components/pdf-viewer"
import { assetPath } from "@/lib/asset-path"
import { sdgData } from "@/data/sdg-data"

/** Only indicators with published evidence get a page. */
export function generateStaticParams() {
  return sdgData.flatMap((sdg) =>
    sdg.targets.flatMap((target) =>
      target.indicators
        .filter((indicator) => indicator.link)
        .map((indicator) => ({ id: String(sdg.number), indicatorId: indicator.id }))
    )
  )
}

/**
 * Individual indicator page with document viewer
 * Displays a specific indicator and its evidence document
 */
export default async function IndicatorPage({
  params,
}: {
  params: Promise<{ id: string; indicatorId: string }>
}) {
  const { id, indicatorId } = await params
  const sdg = sdgData.find((s) => String(s.number) === id)
  const target = sdg?.targets.find((t) => t.indicators.some((i) => i.id === indicatorId))
  const indicator = target?.indicators.find((i) => i.id === indicatorId)

  if (!sdg || !target || !indicator?.link) {
    notFound()
  }

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto scroll-smooth">
        <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Breadcrumb Navigation */}
        <div className="mb-6 flex items-center gap-2 text-sm">
          <Link href="/" className="text-[#f6c445] hover:underline">
            Home
          </Link>
          <span className="text-gray-400">/</span>
          <Link href={`/sdg/${sdg.number}`} className="text-[#f6c445] hover:underline">
            SDG {sdg.number}
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-[#292929]/60">{indicator.title}</span>
        </div>

        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-lg overflow-hidden shadow-md">
              <Image
                src={assetPath(`/sdg-logos/E_WEB_INVERTED_${sdg.number.toString().padStart(2, "0")}.png`)}
                alt={`SDG ${sdg.number}: ${sdg.title}`}
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-sm text-[#292929]/60 font-medium">
                SDG {sdg.number}: {sdg.title}
              </p>
              {target.title && <p className="text-xs text-[#292929]/50">{target.title}</p>}
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-[#292929] mb-4">{indicator.title}</h1>

          <div className="h-1 w-32 bg-[#f6c445] rounded-full mt-4"></div>
        </div>

        {/* Document Viewer */}
        <PDFViewer pdfUrl={indicator.link} title={indicator.title} fileType={indicator.fileType} />

        {/* Footer */}
        <footer className="mt-16 p-8 border-t border-gray-200 bg-white">
          <div className="max-w-7xl mx-auto">
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
