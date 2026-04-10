'use client';

import Link from 'next/link';

export function PageFooter() {
  return (
    <footer className="bg-primary text-primary-foreground border-t border-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Footer Content */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 mb-8">
          <div>
            <h3 className="font-montserrat font-bold mb-4 text-sm sm:text-base">
              について
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:opacity-80 transition-opacity">
                  私たちについて
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:opacity-80 transition-opacity">
                  お問い合わせ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-montserrat font-bold mb-4 text-sm sm:text-base">
              カテゴリー
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:opacity-80 transition-opacity">
                  野球
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:opacity-80 transition-opacity">
                  サッカー
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-montserrat font-bold mb-4 text-sm sm:text-base">
              法務
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:opacity-80 transition-opacity">
                  プライバシー
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:opacity-80 transition-opacity">
                  利用規約
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-montserrat font-bold mb-4 text-sm sm:text-base">
              フォロー
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:opacity-80 transition-opacity">
                  Twitter
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:opacity-80 transition-opacity">
                  Facebook
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-primary-foreground/20 pt-8">
          <p className="text-sm text-center text-primary-foreground/80">
            © 2025 MIKATA. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
