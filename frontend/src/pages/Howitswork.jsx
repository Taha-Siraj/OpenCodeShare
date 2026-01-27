import React from 'react';
import { UploadCloud, ShieldAlert, Zap, Clock, Globe, Lock } from 'lucide-react';

const AirforceShare = () => {
    return (
        <section className="bg-[#0a0f1a] text-slate-200 py-16 px-4 font-mono">
            <div className="max-w-6xl mx-auto">

                {/* Header - No fluff, just mission focus */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-black tracking-widest uppercase border-b-2 border-blue-900 inline-block pb-2">
                        Protocol: OpenCodeShare
                    </h2>
                    <p className="mt-4 text-slate-500 max-w-2xl mx-auto">
                        Secure asset transmission across non-secure networks.
                        End-to-end encryption active. Standard limit: 50MB per packet.
                    </p>
                </div>

                {/* Top Stats - Industrial Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-0 mb-20 border border-slate-800">
                    <div className="p-6 border-r border-slate-800 flex items-center gap-4 bg-slate-900/50">
                        <Lock className="text-blue-500" size={24} />
                        <div>
                            <p className="text-xs text-slate-500 uppercase">Payload Limit</p>
                            <p className="font-bold text-xl">50 MB / File</p>
                        </div>
                    </div>
                    <div className="p-6 border-r border-slate-800 flex items-center gap-4 bg-slate-900/50">
                        <Globe className="text-blue-500" size={24} />
                        <div>
                            <p className="text-xs text-slate-500 uppercase">Network</p>
                            <p className="font-bold text-sm">Cross-Network Enabled</p>
                        </div>
                    </div>
                    <div className="p-6 flex items-center gap-4 bg-slate-900/50">
                        <Zap className="text-yellow-500" size={24} />
                        <div>
                            <p className="text-xs text-slate-500 uppercase">Latency</p>
                            <p className="font-bold text-xl">Real-Time Sync</p>
                        </div>
                    </div>
                </div>

                {/* 1-2-3 Workflow - Visualizing the Mission */}
                <div className="grid md:grid-cols-3 gap-12 text-center relative">
                    {/* Step 1 */}
                    <div className="flex flex-col items-center">
                        <div className="w-16 h-16 rounded-sm bg-blue-900/30 flex items-center justify-center border border-blue-500 mb-6">
                            <UploadCloud className="text-blue-400" />
                        </div>
                        <h3 className="text-lg font-bold uppercase mb-3 text-blue-400">1. Deploy Asset</h3>
                        <p className="text-sm text-slate-400 leading-relaxed">
                            Select technical documentation or code payloads (max 50MB).
                            Automatic hashing initiated.
                        </p>
                    </div>

                    {/* Step 2 */}
                    <div className="flex flex-col items-center">
                        <div className="w-16 h-16 rounded-sm bg-green-900/30 flex items-center justify-center border border-green-500 mb-6">
                            <ShieldAlert className="text-green-400" />
                        </div>
                        <h3 className="text-lg font-bold uppercase mb-3 text-green-400">2. Secure Relay</h3>
                        <p className="text-sm text-slate-400 leading-relaxed">
                            Files bypass standard firewalls via encrypted tunnel.
                            Works over LTE, Satcom, or Wi-Fi.
                        </p>
                    </div>

                    {/* Step 3 */}
                    <div className="flex flex-col items-center">
                        <div className="w-16 h-16 rounded-sm bg-orange-900/30 flex items-center justify-center border border-orange-500 mb-6">
                            <Clock className="text-orange-400" />
                        </div>
                        <h3 className="text-lg font-bold uppercase mb-3 text-orange-400">3. Intercept</h3>
                        <p className="text-sm text-slate-400 leading-relaxed">
                            Receiver captures transmission instantly.
                            Data is volatile: 20s window before self-destruct.
                        </p>
                    </div>
                </div>

                {/* Footer Warning - Crucial for Airforce Aesthetic */}
                <div className="mt-20 p-4 bg-red-950/20 border-l-4 border-red-600 flex items-center gap-4">
                    <Clock className="text-red-500 shrink-0" size={20} />
                    <p className="text-xs text-red-400 font-bold uppercase tracking-tighter">
                        Security Warning: All content is purged 20 seconds after last access. No logs maintained.
                    </p>
                </div>

            </div>
        </section>
    );
};

export default AirforceShare;