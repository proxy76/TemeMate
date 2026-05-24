import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, ArrowRight, AlertCircle, Sparkles } from 'lucide-react';
import { homeworkRegistry } from '../homeworks/registry';
import { cn } from '../lib/utils';

// Orb Component for the background
const GlowingOrb = ({ className, delay = 0, duration = 10 }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
            opacity: [0.4, 0.6, 0.4],
            scale: [1, 1.1, 1],
            x: [0, 30, -20, 0],
            y: [0, -40, 20, 0]
        }}
        transition={{
            duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay
        }}
        className={cn("absolute rounded-full mix-blend-screen filter blur-[100px] opacity-50", className)}
    />
);

const LoginView = ({ onLogin }) => {
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const [isHovered, setIsHovered] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!code.trim()) {
            setError('Te rog introdu un cod de acces.');
            return;
        }

        setIsLoading(true);
        // Simulate a tiny delay for the slick animation effect
        await new Promise(resolve => setTimeout(resolve, 600));

        if (homeworkRegistry[code]) {
            onLogin(homeworkRegistry[code]);
            setError('');
        } else {
            setError('Cod de acces invalid. Încearcă din nou.');
        }
        setIsLoading(false);
    };

    return (
        <div className="relative min-h-screen bg-neutral-950 flex items-center justify-center p-4 font-sans overflow-hidden selection:bg-indigo-500/30">
            {/* Dynamic Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
                <GlowingOrb className="bg-indigo-600 w-[500px] h-[500px] top-[-10%] left-[-10%]" duration={12} delay={0} />
                <GlowingOrb className="bg-violet-600 w-[400px] h-[400px] bottom-[-20%] right-[-10%]" duration={15} delay={2} />
                <GlowingOrb className="bg-fuchsia-600 w-[600px] h-[600px] top-[20%] right-[10%]" duration={18} delay={5} />
                <GlowingOrb className="bg-blue-600 w-[450px] h-[450px] bottom-[10%] left-[20%]" duration={14} delay={1} />
            </div>

            {/* Main Content Container */}
            <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 w-full max-w-md group"
            >
                {/* Glossy Card */}
                <div className="relative bg-neutral-900/40 backdrop-blur-3xl rounded-[2rem] p-8 border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] overflow-hidden">

                    {/* Inner subtle glow from top */}
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[2px] bg-indigo-500/30 blur-[2px]"></div>

                    {/* Branding */}
                    <div className="text-center mb-10 relative">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
                            className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-600 p-[1px] mb-6 shadow-lg shadow-indigo-500/20"
                        >
                            <div className="w-full h-full bg-neutral-950/80 rounded-full flex items-center justify-center backdrop-blur-md">
                                <Sparkles className="text-indigo-300" size={28} />
                            </div>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="text-3xl font-bold tracking-tight text-white mb-2"
                        >
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-neutral-200 to-neutral-400">
                                TEME
                            </span>
                            <span className="text-indigo-400 font-black">.</span>
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-fuchsia-300">
                                ALGOMATE
                            </span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="text-neutral-400 text-sm font-medium"
                        >
                            Introdu codul de acces primit.
                        </motion.p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6 relative">
                        <div>
                            <div className="relative group/input">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-500 group-focus-within/input:text-indigo-400 transition-colors">
                                    <Lock size={18} />
                                </div>
                                <input
                                    type="text"
                                    id="code"
                                    value={code}
                                    onChange={(e) => {
                                        setCode(e.target.value);
                                        setError('');
                                    }}
                                    placeholder="ex: 123456"
                                    className={cn(
                                        "w-full pl-11 pr-4 py-4 bg-black/20 border border-white/5 rounded-2xl",
                                        "text-white placeholder:text-neutral-600 font-medium tracking-wide",
                                        "focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 focus:bg-black/40",
                                        "transition-all duration-300 ease-out",
                                        error && "border-rose-500/50 focus:ring-rose-500/50 focus:border-rose-500/50"
                                    )}
                                    autoComplete="off"
                                />
                                {/* Bottom animated border for input */}
                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-indigo-500 to-fuchsia-500 group-focus-within/input:w-full transition-all duration-500 rounded-b-2xl opacity-50"></div>
                            </div>

                            <AnimatePresence>
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0, y: -10 }}
                                        animate={{ opacity: 1, height: 'auto', y: 0 }}
                                        exit={{ opacity: 0, height: 0, y: -10 }}
                                        className="flex items-center gap-2 mt-3 text-sm text-rose-400 bg-rose-500/10 py-2 px-3 rounded-xl border border-rose-500/20"
                                    >
                                        <AlertCircle size={16} className="shrink-0" />
                                        <span>{error}</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <motion.button
                            type="submit"
                            disabled={isLoading}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={cn(
                                "relative w-full overflow-hidden rounded-2xl p-[1px] group/btn",
                                "transition-all duration-300"
                            )}
                        >
                            {/* Animated glowing border for button */}
                            <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-indigo-500 opacity-70 group-hover/btn:opacity-100 transition-opacity duration-300"></span>

                            <div className="relative flex items-center justify-center gap-2 bg-neutral-950/90 backdrop-blur-xl px-4 py-4 rounded-2xl w-full">
                                <span className={cn(
                                    "font-semibold tracking-wide text-white transition-all duration-300",
                                    isLoading ? "opacity-0" : "opacity-100"
                                )}>
                                    Accesează
                                </span>

                                {!isLoading ? (
                                    <motion.div
                                        animate={{ x: isHovered ? 4 : 0 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    >
                                        <ArrowRight size={18} className="text-white" />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        className="absolute inset-0 flex items-center justify-center"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                    >
                                        <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                                    </motion.div>
                                )}

                                {/* Hover shine effect inside button */}
                                <div className="absolute inset-0 -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"></div>
                            </div>
                        </motion.button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-white/5 text-center">
                        <p className="text-xs text-neutral-500 font-medium tracking-wide uppercase flex items-center justify-center gap-2">
                            <Lock size={12} /> Sistem Securizat Algomate
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default LoginView;
