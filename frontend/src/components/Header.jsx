import { useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [activeTab, setActiveTab] = useState("text");

  return (
    <header className="w-full border-b bg-white">
      <div className="mx-auto max-w-6xl px-4 py-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        {/* Left */}
        <div>
          <Link to="/" className="text-xl font-semibold flex items-center gap-2">
            📤 <span>OpenShare</span>
          </Link>
          <p className="text-sm text-gray-500">
            Share text & files instantly
          </p>
        </div>

        {/* Center nav */}
        <nav className="flex gap-4 text-sm font-medium">
          <Link to="/how-it-works" className="text-gray-600 hover:text-gray-900">
            How it works
          </Link>
          <Link to="/feedback" className="text-gray-600 hover:text-gray-900">
            Feedback
          </Link>
        </nav>

        {/* Tabs + button */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab("text")}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition ${
                activeTab === "text"
                  ? "bg-white shadow text-gray-900"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Text
            </button>

            <button
              onClick={() => setActiveTab("file")}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition ${
                activeTab === "file"
                  ? "bg-white shadow text-gray-900"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              File
            </button>
          </div>

          <button className="bg-indigo-600 hover:bg-indigo-700 transition text-white px-5 py-2 rounded-xl text-sm font-medium">
            + Upload
          </button>
        </div>

      </div>
    </header>
  );
}
