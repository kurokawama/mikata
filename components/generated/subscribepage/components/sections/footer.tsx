'use client';

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 md:grid-cols-4 sm:grid-cols-2">
          {/* Brand */}
          <div>
            <h3 className="mb-4 font-bold text-gray-900">MIKATA</h3>
            <p className="text-xs text-gray-600">
              世界の情報を、深く、正確に。
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-gray-900">プロダクト</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-xs text-gray-600 hover:text-gray-900">
                  料金プラン
                </a>
              </li>
              <li>
                <a href="#" className="text-xs text-gray-600 hover:text-gray-900">
                  機能
                </a>
              </li>
              <li>
                <a href="#" className="text-xs text-gray-600 hover:text-gray-900">
                  ブログ
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-gray-900">会社</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-xs text-gray-600 hover:text-gray-900">
                  お問い合わせ
                </a>
              </li>
              <li>
                <a href="#" className="text-xs text-gray-600 hover:text-gray-900">
                  利用規約
                </a>
              </li>
              <li>
                <a href="#" className="text-xs text-gray-600 hover:text-gray-900">
                  プライバシー
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-gray-900">フォロー</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-xs text-gray-600 hover:text-gray-900">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="text-xs text-gray-600 hover:text-gray-900">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="text-xs text-gray-600 hover:text-gray-900">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 border-t border-gray-200 pt-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-gray-600">
              © 2024 MIKATA. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-xs text-gray-600 hover:text-gray-900">
                利用規約
              </a>
              <a href="#" className="text-xs text-gray-600 hover:text-gray-900">
                プライバシーポリシー
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
