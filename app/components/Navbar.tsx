"use client"

interface NavbarProps {
  lang: "fr" | "en"
  onLangChange: (lang: "fr" | "en") => void
  activePage?: "home" | "support"
}

export function Navbar({ lang, onLangChange, activePage }: NavbarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#0d0d0d]/90 backdrop-blur-md">
      <div className="mx-auto max-w-5xl px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <a href="/" className="text-lg font-bold text-white hover:opacity-80 transition-opacity">
            Ultra <span className="text-[#39ff14]">Sports Fans</span>
          </a>
          <a
            href="/support"
            className={`text-sm font-medium transition-colors ${
              activePage === "support"
                ? "text-[#39ff14]"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {lang === "fr" ? "Assistance" : "Assistance"}
          </a>
        </div>
        <div className="flex items-center gap-1 bg-[#1a1a1a] rounded-lg p-1">
          <button
            onClick={() => onLangChange("fr")}
            className={`px-3 py-1.5 rounded-md text-sm font-semibold transition-all ${
              lang === "fr" ? "bg-[#39ff14] text-black" : "text-gray-400 hover:text-white"
            }`}
          >
            FR
          </button>
          <button
            onClick={() => onLangChange("en")}
            className={`px-3 py-1.5 rounded-md text-sm font-semibold transition-all ${
              lang === "en" ? "bg-[#39ff14] text-black" : "text-gray-400 hover:text-white"
            }`}
          >
            EN
          </button>
        </div>
      </div>
    </nav>
  )
}
