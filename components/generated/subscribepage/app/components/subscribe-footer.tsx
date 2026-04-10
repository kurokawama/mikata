import { Separator } from "../../components/ui/separator";

const footerLinks = [
  { label: "利用規約", href: "#" },
  { label: "プライバシーポリシー", href: "#" },
  { label: "特定商取引法", href: "#" },
  { label: "お問い合わせ", href: "#" },
];

export function SubscribeFooter() {
  return (
    <footer
      className="w-full py-12"
      style={{ backgroundColor: "#1A1A2E" }}
      role="contentinfo"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex flex-col items-center gap-5">
          <div
            className="text-2xl tracking-widest text-white"
            style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700 }}
          >
            MIKATA
          </div>
          <p
            className="text-sm text-[#9CA3AF] text-center text-balance"
            style={{ fontFamily: "'Work Sans', sans-serif" }}
          >
            世界のニュースを、多角的な視点で。
          </p>

          <Separator className="w-24 bg-[#E8E8F0]/10" />

          {/* Links */}
          <nav
            className="flex flex-wrap justify-center gap-x-6 gap-y-2"
            aria-label="フッターナビゲーション"
          >
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs text-[#9CA3AF] hover:text-white transition-colors"
                style={{ fontFamily: "'Work Sans', sans-serif" }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Copyright */}
          <p
            className="text-xs text-[#4B5563]"
            style={{ fontFamily: "'Work Sans', sans-serif" }}
          >
            © {new Date().getFullYear()} MIKATA Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
