'use client';

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-gray-700">MIKATA</span>
        </div>
        
        <nav className="hidden gap-4 sm:flex">
          <a href="#" className="text-xs text-gray-600 hover:text-gray-900">
            概要
          </a>
          <a href="#" className="text-xs text-gray-600 hover:text-gray-900">
            料金
          </a>
          <a href="#" className="text-xs text-gray-600 hover:text-gray-900">
            機能
          </a>
          <a href="#" className="text-xs text-gray-600 hover:text-gray-900">
            ブログ
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <button className="text-xs text-gray-600 hover:text-gray-900">
            ログイン
          </button>
        </div>
      </div>
    </header>
  );
}
