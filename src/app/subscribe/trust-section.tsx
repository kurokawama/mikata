/* v0-generated — adapted from components/generated/subscribepage/app/components/trust-section.tsx */
import { Shield, Lock, Database } from 'lucide-react'

const trustPoints = [
  {
    icon: Shield,
    title: '安全な利用',
    body: 'コンテンツはすべて厳格な編集基準のもとで制作され、信頼性の高い情報だけをお届けします。誤情報への徹底した対策を実施しています。',
  },
  {
    icon: Lock,
    title: '安全なインフラ',
    body: '金融機関レベルの暗号化技術と多層防御システムにより、お客様の個人情報と決済データを安全に保護しています。',
  },
  {
    icon: Database,
    title: 'データ管理',
    body: 'GDPRおよび日本の個人情報保護法に準拠。収集するデータの種類、利用目的、保管期間をすべて透明に公開しています。',
  },
]

export function TrustSection() {
  return (
    <section className="w-full py-16" aria-label="安心してご利用いただける理由">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-lg font-semibold mb-10 text-[#4B5563] text-balance">
          高い透明性
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {trustPoints.map(({ icon: Icon, title, body }) => (
            <div key={title} className="flex flex-col gap-3">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-[#FEF3C7]">
                <Icon size={18} className="text-[#D97706]" />
              </div>
              <h3 className="text-base font-semibold text-[#1A1A2E]">{title}</h3>
              <p className="text-sm leading-relaxed text-[#4B5563]">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
