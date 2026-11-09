import Image from "next/image"
import { assetPath } from "@/lib/asset-path"

export default function AboutSection() {
  return (
    <section id="about" className="min-h-screen bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-[#292929] mb-4 text-balance">Technological Institute of the Philippines</h1>
          <div className="h-2 font-bold bg-[#f6c445] rounded-full mb-8 mx-auto"></div>
          <p className="text-3xl text-[#292929] leading-relaxed text-pretty">
            Institutional Commitment to the United Nations Sustainable Development Goals (SDGs)
          </p>
        </div>

        {/* Main Description */}
        <div className="mb-16 space-y-6">
          <p className="text-[#292929] leading-relaxed text-pretty">
            The Technological Institute of the Philippines (T.I.P.) commits to contributing actively to the achievement of the United Nations Sustainable Development Goals (SDGs) through education, research, innovation, and responsible operations.
          </p>
          <p className="text-[#292929] leading-relaxed text-pretty">
            T.I.P. recognizes that technology and education are powerful tools for sustainable transformation — and pledges to align its teaching, laboratories, facilities, and community engagement to these 17 global goals.
          </p>
        </div>

        {/* Featured Images Grid */}
        <div className="grid">
          <div className="bg-white rounded-lg border-2 border-gray-200 group cursor-pointer hover:shadow-lg hover:border-[#f6c445] hover:scale-105 transition-all duration-300">
            <Image
              src={assetPath("/contents/SDG.png")}
              alt="Sustainable Development Goals"
              width={1200}
              height={675}
              className="w-full h-auto object-contain"
              priority
            />
          </div>
          {/* <div className="aspect-video bg-white rounded-lg border-2 border-gray-200 flex items-center justify-center group cursor-pointer hover:shadow-lg hover:border-[#f6c445] transition-all">
            <div className="text-center">
              <img
                src="/sdg.jpg"
                alt=""
                className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform"
              />
            </div>
          </div>
          <div className="aspect-video bg-white rounded-lg border-2 border-gray-200 flex items-center justify-center group cursor-pointer hover:shadow-lg hover:border-[#f6c445] transition-all">
            <div className="text-center">
              <img
                src="/sdg.jpg"
                alt=""
                className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform"
              />
            </div>
          </div> */}
        </div>
      </div>
    </section>
  )
}
