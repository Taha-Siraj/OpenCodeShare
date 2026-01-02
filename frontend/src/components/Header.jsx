import { useState } from "react";
import { Link } from "react-router-dom";
import { UploadCloud, FileText, File } from "lucide-react";

export default function Header() {
  const [activeTab, setActiveTab] = useState("text");

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">

        {/* 🔷 Logo */}
        <Link to="/" className="group flex items-center gap-3">
          <div className="relative">
            <UploadCloud className="w-7 h-7 text-indigo-600 group-hover:scale-110 transition-transform duration-300" />
            <span className="absolute inset-0 rounded-full bg-indigo-400 opacity-20 blur-lg group-hover:opacity-40 transition" />
          </div>

          <div>
            <h1 className="text-lg font-semibold tracking-tight">
              OpenShare
            </h1>
            <p className="text-xs text-gray-500 -mt-0.5">
              Share text & files instantly
            </p>
          </div>
        </Link>

        {/* 🔗 Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link
            to="/how-it-works"
            className="text-gray-600 hover:text-gray-900 transition"
          >
            How it works
          </Link>
          <Link
            to="/feedback"
            className="text-gray-600 hover:text-gray-900 transition"
          >
            Feedback
          </Link>
        </nav>

        {/* ⚙️ Actions */}
        <div className="flex items-center gap-4">

          {/* Tabs */}
          <div className="flex items-center bg-gray-100 rounded-full p-1 shadow-inner">
            <button
              onClick={() => setActiveTab("text")}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300
                ${
                  activeTab === "text"
                    ? "bg-white shadow text-gray-900 scale-[1.02]"
                    : "text-gray-500 hover:text-gray-700"
                }`}
            >
              <FileText className="w-4 h-4" />
              Text
            </button>

            <button
              onClick={() => setActiveTab("file")}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300
                ${
                  activeTab === "file"
                    ? "bg-white shadow text-gray-900 scale-[1.02]"
                    : "text-gray-500 hover:text-gray-700"
                }`}
            >
              <File className="w-4 h-4" />
              File
            </button>
          </div>

          {/* Upload Button */}
          <button className="group relative overflow-hidden rounded-full bg-indigo-600 px-6 py-2 text-sm font-semibold text-white shadow-lg transition hover:scale-105">
            <span className="relative z-10 flex items-center gap-2">
              <UploadCloud className="w-4 h-4 group-hover:animate-bounce" />
              Upload
            </span>
            <span className="absolute inset-0 bg-indigo-500 opacity-0 group-hover:opacity-100 transition" />
          </button>
        </div>
      </div>
    </header>
  );
}
