import React, { useState } from 'react';
import { Sparkles, Languages, Check, X, Copy, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ChapterActions() {
    const [loading, setLoading] = useState<string | null>(null);
    const [result, setResult] = useState<{ type: 'personalize' | 'translate', content: string } | null>(null);

    const getChapterContent = () => {
        const article = document.querySelector('article');
        return article ? article.innerText : '';
    };

    const handleAction = async (action: 'personalize' | 'translate') => {
        const content = getChapterContent() || document.querySelector('.markdown')?.textContent || document.body.innerText;
        if (!content) {
            alert("No content found to process.");
            return;
        }

        setLoading(action);

        try {
            const endpoint = action === 'personalize'
                ? 'http://localhost:8000/personalize'
                : 'http://localhost:8000/translate';

            // Truncate text to avoid token limits
            const cleanContent = content.slice(0, 5000);

            const body = action === 'personalize'
                ? { text: cleanContent }
                : { text: cleanContent, target_language: 'Urdu' };

            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.detail || "Request failed");
            }

            const data = await response.json();
            setResult({ type: action, content: typeof data === 'string' ? data : data.content || JSON.stringify(data) });

        } catch (error: any) {
            console.error("Action Failed:", error);
            alert(`Error: ${error.message}`);
            setResult(null);
        } finally {
            setLoading(null);
        }
    };


    return (
        <>
            <div className="flex flex-wrap gap-4 mb-8">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAction('personalize')}
                    className="relative group overflow-hidden flex items-center gap-2 px-6 py-3 rounded-full bg-[#1a1f2e] text-white font-medium shadow-xl border border-white/10"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-20 transition-opacity" />
                    <div className="absolute inset-0 rounded-full ring-1 ring-white/20 group-hover:ring-purple-500/50 transition-all" />

                    {loading === 'personalize' ? (
                        <RefreshCw className="animate-spin text-purple-400" size={18} />
                    ) : (
                        <Sparkles className="text-purple-400 group-hover:text-purple-300 transition-colors" size={18} />
                    )}
                    <span className="relative z-10 group-hover:text-purple-100 transition-colors">Personalize Chapter</span>
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAction('translate')}
                    className="relative group overflow-hidden flex items-center gap-2 px-6 py-3 rounded-full bg-[#1a1f2e] text-white font-medium shadow-xl border border-white/10"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 opacity-0 group-hover:opacity-20 transition-opacity" />
                    <div className="absolute inset-0 rounded-full ring-1 ring-white/20 group-hover:ring-green-500/50 transition-all" />

                    {loading === 'translate' ? (
                        <RefreshCw className="animate-spin text-green-400" size={18} />
                    ) : (
                        <Languages className="text-green-400 group-hover:text-green-300 transition-colors" size={18} />
                    )}
                    <span className="relative z-10 group-hover:text-green-100 transition-colors">Translate to Urdu</span>
                </motion.button>
            </div>

            {/* Result Modal */}
            <AnimatePresence>
                {result && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
                        onClick={() => setResult(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-[#0f1115] border border-white/10 rounded-2xl w-full max-w-3xl max-h-[80vh] flex flex-col shadow-2xl relative overflow-hidden"
                        >
                            {/* Decorative gradients */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-green-500" />
                            <div className="absolute -top-[100px] -right-[100px] w-[300px] h-[300px] bg-blue-600/20 blur-[100px] rounded-full pointer-events-none" />

                            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
                                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                    {result.type === 'personalize' ? <Sparkles className="text-purple-400" /> : <Languages className="text-green-400" />}
                                    {result.type === 'personalize' ? 'Personalized Content' : 'Translation (Urdu)'}
                                </h3>
                                <button
                                    onClick={() => setResult(null)}
                                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                                >
                                    <X className="text-white/70" />
                                </button>
                            </div>

                            <div className="p-8 overflow-y-auto custom-scrollbar font-serif text-lg leading-relaxed text-gray-200">
                                {result.content.split('\n').map((line, i) => (
                                    <p key={i} className="mb-4">{line}</p>
                                ))}
                            </div>

                            <div className="p-4 border-t border-white/10 bg-white/5 flex justify-end gap-3">
                                <button
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm transition-colors"
                                    onClick={() => navigator.clipboard.writeText(result.content)}
                                >
                                    <Copy size={16} /> Copy Text
                                </button>
                                <button
                                    onClick={() => setResult(null)}
                                    className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm transition-colors"
                                >
                                    Close
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
