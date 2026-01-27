import { API } from "@/api";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import moment from "moment";

const Text = () => {
    const [inputText, setInputText] = useState("");
    const [texts, setTexts] = useState([]);
    const [loading, setLoading] = useState(false);

    const createText = async (e) => {
        e.preventDefault();

        if (!inputText.trim()) {
            return toast.error("Please enter your text");
        }

        try {
            setLoading(true);
            await API.post("/create", { text: inputText });
            toast.success("Text shared successfully");
            setInputText("");
            getText();
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const getText = async () => {
        try {
            const res = await API.get("/get");
            setTexts(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getText();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
            <Toaster position="bottom-right" />

            <div className="w-full max-w-3xl bg-white rounded-xl border border-gray-200 p-6">
                {/* Header */}
                <div className="flex items-center gap-2 mb-4">
                    <span className="text-xl">↗</span>
                    <h1 className="text-2xl font-semibold">Share Text Snippet</h1>
                </div>

                {/* Form */}
                <form onSubmit={createText}>
                    <div className="relative">
                        <textarea
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder="Paste your text here..."
                            className="
                w-full
                h-56
                resize-none
                border-2
                border-black
                rounded-lg
                p-4
                font-mono
                text-sm
                focus:outline-none
              "
                        />

                        {/* character count */}
                        <span className="absolute bottom-3 right-4 text-sm text-gray-500">
                            {inputText.length} characters
                        </span>
                    </div>

                    {/* Button */}
                    <div className="flex justify-end mt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="
                bg-black
                text-white
                px-6
                py-2.5
                rounded-lg
                font-medium
                hover:bg-gray-900
                transition
                disabled:opacity-50
              "
                        >
                            {loading ? "Publishing..." : "Publish Snippet"}
                        </button>
                    </div>
                </form>

                {/* List */}
                <div className="mt-8 space-y-4">
                    {texts.map((item) => (
                        <div
                            key={item._id}
                            className="border border-gray-200 rounded-lg p-4"
                        >
                            <p className="text-gray-800 break-words font-mono text-sm">
                                {item.content}
                            </p>

                            <div className="flex justify-between text-xs text-gray-500 mt-2">
                                <span>{moment(item.createdAt).fromNow()}</span>
                                <span>{item.content.length} chars</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Text;
