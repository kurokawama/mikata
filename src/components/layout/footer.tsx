import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-navy-800 text-navy-100">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <span className="text-xl font-heading font-bold text-white">
              MI<span className="text-amber-500">KA</span>TA
            </span>
            <p className="mt-2 text-sm text-navy-300">
              AIが各国メディアの論調を分析し、多視点でニュースを提供
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">コンテンツ</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/" className="text-navy-300 hover:text-amber-400 transition-colors">
                  ホーム
                </Link>
              </li>
              <li>
                <Link href="/sources" className="text-navy-300 hover:text-amber-400 transition-colors">
                  メディアソース
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">サービス</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/signup" className="text-navy-300 hover:text-amber-400 transition-colors">
                  無料トライアル
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-navy-300 hover:text-amber-400 transition-colors">
                  お問い合わせ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">法的情報</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/terms" className="text-navy-300 hover:text-amber-400 transition-colors">
                  利用規約
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-navy-300 hover:text-amber-400 transition-colors">
                  プライバシーポリシー
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-navy-700 pt-8 text-center text-xs text-navy-400">
          &copy; {new Date().getFullYear()} MIKATA. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
