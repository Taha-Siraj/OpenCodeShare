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
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <Toaster position="bottom-right" />

            <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6">
                {/* Header */}
                <h1 className="text-2xl font-bold text-center mb-6">
                    Share Text Instantly
                </h1>

                {/* Form */}
                <form onSubmit={createText} className="flex gap-3 mb-6">
                    <input
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Enter your text..."
                        className="flex-1 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition disabled:opacity-50"
                    >
                        {loading ? "Sharing..." : "Share"}
                    </button>
                </form>

                {/* Text List */}
                <div className="space-y-4">
                    {texts.length === 0 && (
                        <p className="text-center text-gray-500">
                            No shared text yet
                        </p>
                    )}

                    {texts.map((item) => (
                        <div
                            key={item._id}
                            className="border border-gray-200 rounded-xl p-4 hover:shadow transition"
                        >
                            <p className="text-gray-800 break-words">
                                {item.content}
                            </p>

                            <div className="flex justify-between text-sm text-gray-500 mt-3">
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
