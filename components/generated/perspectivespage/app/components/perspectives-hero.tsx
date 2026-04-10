import { Globe } from "lucide-react"
import { Badge } from "../components/ui/badge"

export function PerspectivesHero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #1A1A2E 0%, #16213E 60%, #1a2744 100%)" }}
      aria-labelledby="hero-heading"
    >
      {/* Subtle grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <Badge
              className="mb-5 bg-[#F59E0B]/15 text-[#F59E0B] border border-[#F59E0B]/30 text-xs font-medium px-3 py-1 rounded-full"
              style={{ fontFamily: "'Work Sans', sans-serif" }}
            >
              世界のミカタ — 多視点ニュース
            </Badge>

            <h1
              id="hero-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white leading-tight text-balance"
              style={{ fontFamily: "'Newsreader', Georgia, serif" }}
            >
              国別の視点で
              <br />
              ニュースを探索
            </h1>

            <p
              className="mt-5 text-[#9CA3AF] text-base sm:text-lg leading-relaxed max-w-xl"
              style={{ fontFamily: "'Work Sans', sans-serif" }}
            >
              複数のメディアプラットフォームにまたがって「同じニュース」を異なる国の視点で読み比べる。国際情勢や社会問題に対する多角的なインテリジェンスを。
            </p>

            <div
              className="mt-6 flex flex-wrap items-center gap-4 text-sm text-[#9CA3AF]"
              style={{ fontFamily: "'Work Sans', sans-serif" }}
            >
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#22C55E] inline-block" aria-hidden="true" />
                <span>50カ国以上の視点</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#F59E0B] inline-block" aria-hidden="true" />
                <span>毎日更新</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#9CA3AF] inline-block" aria-hidden="true" />
                <span>AI翻訳対応</span>
              </div>
            </div>
          </div>

          {/* Globe illustration */}
          <div
            className="hidden lg:flex items-center justify-center w-36 h-36 rounded-full border border-[#F59E0B]/20 bg-[#F59E0B]/5 flex-shrink-0"
            aria-hidden="true"
          >
            <div className="flex items-center justify-center w-24 h-24 rounded-full border border-[#F59E0B]/30 bg-[#F59E0B]/10">
              <Globe className="w-12 h-12 text-[#F59E0B]" strokeWidth={1.2} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
