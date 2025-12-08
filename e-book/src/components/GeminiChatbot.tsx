import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Sparkles, Loader2, Maximize2, Minimize2, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
    sources?: Array<{ title: string; id: string; score: number }>;
}

export default function GeminiChatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [selectedText, setSelectedText] = useState<string | null>(null);
    const [isExpanded, setIsExpanded] = useState(false);

    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Handle Text Selection
    useEffect(() => {
        const handleSelection = () => {
            const selection = window.getSelection();
            if (selection && selection.toString().trim().length > 0) {
                const text = selection.toString().trim();
                // Only show button if selection is substantial
                if (text.length > 10) {
                    setSelectedText(text);
                }
            } else {
                // Optional: clear selection if clicked away, but might be annoying. 
                // Better to let user manually close the 'Ask' popup or have it disappear on next click.
            }
        };

        document.addEventListener('mouseup', handleSelection);
        return () => document.removeEventListener('mouseup', handleSelection);
    }, []);

    const handleSend = async (text: string = input, context: string | null = null) => {
        if (!text.trim()) return;

        // Reset selection state if we are sending based on it
        if (context) {
            setIsOpen(true);
            setSelectedText(null);
        }

        const newMessage: ChatMessage = { role: 'user', content: text };
        setMessages(prev => [...prev, newMessage]);
        setInput('');
        setLoading(true);

        try {
            // Use config from env in real app, hardcoded fallback for dev
            const API_URL = 'http://localhost:8000';

            const response = await fetch(`${API_URL}/ask`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    query: text,
                    selected_text: context
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to get response');
            }

            const data = await response.json();

            setMessages(prev => [...prev, {
                role: 'assistant',
                content: data.answer,
                sources: data.sources
            }]);
        } catch (error) {
            console.error('Chat error:', error);
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: `Sorry, I encountered an error: ${error.message || 'Connection failed'}`
            }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Selection Popup */}
            <AnimatePresence>
                {selectedText && !isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="fixed bottom-24 right-8 z-[1000] max-w-sm"
                    >
                        <button
                            onClick={() => handleSend("Explain this text", selectedText)}
                            className="flex items-center gap-2 px-4 py-3 bg-[#fbbf24] hover:bg-[#f59e0b] text-black font-bold rounded-xl shadow-2xl transition-all hover:scale-105"
                        >
                            <Sparkles size={18} />
                            Ask Gemini about selection
                        </button>
                        <button onClick={() => setSelectedText(null)} className="absolute -top-2 -right-2 bg-black text-white rounded-full p-1 border border-white/20">
                            <X size={12} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Chat Button */}
            {!isOpen && (
                <motion.button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-6 right-6 z-[999] p-4 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-white/10 rounded-full text-white shadow-[0_0_20px_rgba(251,191,36,0.2)] hover:shadow-[0_0_30px_rgba(251,191,36,0.4)] transition-all hover:scale-110"
                    whileHover={{ rotate: 10 }}
                >
                    <MessageSquare size={28} className="text-[#fbbf24]" />
                </motion.button>
            )}

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 50 }}
                        className={`fixed bottom-6 right-6 z-[1000] bg-[#0f0f12]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ${isExpanded ? 'w-[600px] h-[80vh]' : 'w-[400px] h-[600px]'}`}
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
                            <div className="flex items-center space-x-2 space-y-1">
                                <Sparkles size={18} className="text-[#fbbf24]" />
                                <h3 className="font-bold text-white text-sm tracking-wide">Physical AI Assistant</h3>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => setIsExpanded(!isExpanded)} className="text-white/50 bg-white/10 hover:text-[#fbbf24] transition-colors border border-white/5 rounded-xl p-2">
                                    {isExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                                </button>
                                <button onClick={() => setIsOpen(false)} className="text-white/50 bg-white/10 hover:text-[#fbbf24] transition-colors border border-white/5 rounded-xl p-2">
                                    <X size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">

                            {messages.length === 0 && (
                                <div className="text-center text-white/30 mt-10">
                                    <Sparkles size={48} className="mx-auto mb-4 opacity-20" />
                                    <p>Ask me anything about <br />Physical AI & Robotics.</p>
                                </div>
                            )}
                            {messages.map((msg, idx) => (
                                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[85%] rounded-xl p-4 ${msg.role === 'user' ? 'bg-[#fbbf24] text-black font-medium' : 'bg-white/10 text-white border border-white/5'}`}>
                                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                                        {msg.sources && msg.sources.length > 0 && (
                                            <div className="mt-3 pt-3 border-t border-white/10 text-xs">
                                                <p className="opacity-50 mb-1">Sources:</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {msg.sources.map(src => (
                                                        <span key={src.id} className="px-2 py-1 rounded bg-black/20 border border-white/10 flex items-center gap-1 hover:bg-white/10 cursor-pointer transition-colors">
                                                            <ExternalLink size={10} />
                                                            {src.title}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                            {loading && (
                                <div className="flex justify-start">
                                    <div className="bg-white/5 text-white rounded-2xl p-4 flex items-center gap-2">
                                        <Loader2 size={16} className="animate-spin text-[#fbbf24]" />
                                        <span className="text-xs opacity-70">Processing...</span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-4 border-t border-white/10 bg-white/5">
                            <div className="flex items-center gap-2 relative">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && !loading && handleSend()}
                                    placeholder="Type your question..."
                                    className="w-[calc(100%-48px)] bg-[#1a1a1a] border border-white/10 text-white rounded-xl px-4 py-3 pr-12 focus:outline-none focus:border-[#fbbf24]/50 transition-all font-light"
                                />
                                <button
                                    onClick={() => handleSend()}
                                    disabled={!input.trim() || loading}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-[#fbbf24] text-black rounded-xl hover:bg-[#f59e0b] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                >
                                    <Send size={16} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
