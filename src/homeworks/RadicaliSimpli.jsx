import React, { useState, useEffect } from 'react';
import { Calculator, ChevronDown, ChevronUp, Lightbulb, Brain, Sigma, X, Hammer } from 'lucide-react';

const ExerciseApp = () => {
    const [activeCategory, setActiveCategory] = useState('all');
    const [revealedState, setRevealedState] = useState({}); // Stores which cards are open

    // Funcție pentru a gestiona starea deschiderii cardurilor
    const toggleCard = (id) => {
        setRevealedState(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    // Efect 1: Inițializare MathJax (Script Loader) - Se execută o singură dată la pornire
    useEffect(() => {
        // Configurare MathJax
        window.MathJax = {
            tex: {
                inlineMath: [['$', '$'], ['\\(', '\\)']],
                displayMath: [['$$', '$$'], ['\\[', '\\]']]
            },
            svg: { fontCache: 'global' }
        };

        // Verificăm dacă scriptul există deja, dacă nu, îl creăm manual
        const scriptId = 'mathjax-script';
        if (!document.getElementById(scriptId)) {
            const script = document.createElement('script');
            script.id = scriptId;
            script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js';
            script.async = true;
            script.onload = () => {
                // Forțăm o randare imediat ce s-a încărcat
                if (window.MathJax && window.MathJax.typesetPromise) {
                    window.MathJax.typesetPromise();
                }
            };
            document.head.appendChild(script);
        }
    }, []);

    // Efect 2: Re-randare simboluri matematice la fiecare schimbare de stare
    useEffect(() => {
        if (window.MathJax && window.MathJax.typesetPromise) {
            // Folosim setTimeout pentru a permite React să termine desenarea DOM-ului
            setTimeout(() => {
                window.MathJax.typesetPromise().catch((err) => console.log('MathJax error:', err));
            }, 10);
        }
    });

    const categories = [
        { id: 'all', label: 'Toate', icon: Calculator },
        { id: 'scoatere', label: 'Scoatere Factori', icon: Brain },
        { id: 'adunare', label: 'Adunări & Scăderi', icon: Sigma },
        { id: 'inmultire', label: 'Înmulțiri', icon: X },
        { id: 'rationalizare', label: 'Raționalizări', icon: ChevronUp },
        { id: 'formule', label: 'Formule', icon: Brain },
        { id: 'mix', label: 'Mix Avansat', icon: Calculator },
        { id: 'avansat', label: 'Muncitorești', icon: Hammer, special: true },
    ];

    // Baza de date cu 110 exerciții
    const exercises = [
        // --- SCOATERE FACTORI (1-10) ---
        { id: 1, category: 'scoatere', q: "\\sqrt{8}", hint: "\\sqrt{4 \\cdot 2}", ans: "2\\sqrt{2}" },
        { id: 2, category: 'scoatere', q: "\\sqrt{12}", hint: "\\sqrt{4 \\cdot 3}", ans: "2\\sqrt{3}" },
        { id: 3, category: 'scoatere', q: "\\sqrt{18}", hint: "\\sqrt{9 \\cdot 2}", ans: "3\\sqrt{2}" },
        { id: 4, category: 'scoatere', q: "\\sqrt{20}", hint: "\\sqrt{4 \\cdot 5}", ans: "2\\sqrt{5}" },
        { id: 5, category: 'scoatere', q: "\\sqrt{24}", hint: "\\sqrt{4 \\cdot 6}", ans: "2\\sqrt{6}" },
        { id: 6, category: 'scoatere', q: "\\sqrt{27}", hint: "\\sqrt{9 \\cdot 3}", ans: "3\\sqrt{3}" },
        { id: 7, category: 'scoatere', q: "\\sqrt{32}", hint: "\\sqrt{16 \\cdot 2}", ans: "4\\sqrt{2}" },
        { id: 8, category: 'scoatere', q: "\\sqrt{45}", hint: "\\sqrt{9 \\cdot 5}", ans: "3\\sqrt{5}" },
        { id: 9, category: 'scoatere', q: "\\sqrt{50}", hint: "\\sqrt{25 \\cdot 2}", ans: "5\\sqrt{2}" },
        { id: 10, category: 'scoatere', q: "\\sqrt{72}", hint: "\\sqrt{36 \\cdot 2}", ans: "6\\sqrt{2}" },

        // --- ADUNĂRI & SCĂDERI (11-30) ---
        { id: 11, category: 'adunare', q: "2\\sqrt{3} + 5\\sqrt{3}", hint: "(2+5)\\sqrt{3}", ans: "7\\sqrt{3}" },
        { id: 12, category: 'adunare', q: "7\\sqrt{5} - 3\\sqrt{5}", hint: "(7-3)\\sqrt{5}", ans: "4\\sqrt{5}" },
        { id: 13, category: 'adunare', q: "\\sqrt{8} + \\sqrt{18}", hint: "2\\sqrt{2} + 3\\sqrt{2}", ans: "5\\sqrt{2}" },
        { id: 14, category: 'adunare', q: "\\sqrt{12} + \\sqrt{27}", hint: "2\\sqrt{3} + 3\\sqrt{3}", ans: "5\\sqrt{3}" },
        { id: 15, category: 'adunare', q: "\\sqrt{50} - \\sqrt{32}", hint: "5\\sqrt{2} - 4\\sqrt{2}", ans: "\\sqrt{2}" },
        { id: 16, category: 'adunare', q: "3\\sqrt{2} + \\sqrt{8} - \\sqrt{18}", hint: "3\\sqrt{2} + 2\\sqrt{2} - 3\\sqrt{2}", ans: "2\\sqrt{2}" },
        { id: 17, category: 'adunare', q: "\\sqrt{20} + \\sqrt{45} - \\sqrt{80}", hint: "2\\sqrt{5} + 3\\sqrt{5} - 4\\sqrt{5}", ans: "\\sqrt{5}" },
        { id: 18, category: 'adunare', q: "2\\sqrt{12} - 3\\sqrt{3} + \\sqrt{75}", hint: "4\\sqrt{3} - 3\\sqrt{3} + 5\\sqrt{3}", ans: "6\\sqrt{3}" },
        { id: 19, category: 'adunare', q: "\\sqrt{18} + \\sqrt{50} - \\sqrt{98}", hint: "3\\sqrt{2} + 5\\sqrt{2} - 7\\sqrt{2}", ans: "\\sqrt{2}" },
        { id: 20, category: 'adunare', q: "5\\sqrt{24} - 2\\sqrt{54}", hint: "5(2\\sqrt{6}) - 2(3\\sqrt{6})", ans: "4\\sqrt{6}" },
        { id: 21, category: 'adunare', q: "\\sqrt{28} + \\sqrt{63} - \\sqrt{112}", hint: "2\\sqrt{7} + 3\\sqrt{7} - 4\\sqrt{7}", ans: "\\sqrt{7}" },
        { id: 22, category: 'adunare', q: "3\\sqrt{20} - 2\\sqrt{45} + \\sqrt{5}", hint: "6\\sqrt{5} - 6\\sqrt{5} + \\sqrt{5}", ans: "\\sqrt{5}" },
        { id: 23, category: 'adunare', q: "\\sqrt{75} + \\sqrt{48} - \\sqrt{108}", hint: "5\\sqrt{3} + 4\\sqrt{3} - 6\\sqrt{3}", ans: "3\\sqrt{3}" },
        { id: 24, category: 'adunare', q: "2\\sqrt{40} - \\sqrt{90} + \\sqrt{10}", hint: "4\\sqrt{10} - 3\\sqrt{10} + \\sqrt{10}", ans: "2\\sqrt{10}" },
        { id: 25, category: 'adunare', q: "0,5\\sqrt{16} + \\sqrt{9}", hint: "0,5 \\cdot 4 + 3", ans: "5" },
        { id: 26, category: 'adunare', q: "\\sqrt{150} - \\sqrt{54} + \\sqrt{24}", hint: "5\\sqrt{6} - 3\\sqrt{6} + 2\\sqrt{6}", ans: "4\\sqrt{6}" },
        { id: 27, category: 'adunare', q: "3\\sqrt{8} - 2\\sqrt{18} + 4\\sqrt{2}", hint: "6\\sqrt{2} - 6\\sqrt{2} + 4\\sqrt{2}", ans: "4\\sqrt{2}" },
        { id: 28, category: 'adunare', q: "\\sqrt{300} - \\sqrt{27} - \\sqrt{12}", hint: "10\\sqrt{3} - 3\\sqrt{3} - 2\\sqrt{3}", ans: "5\\sqrt{3}" },
        { id: 29, category: 'adunare', q: "2\\sqrt{80} - 3\\sqrt{20} + \\sqrt{125}", hint: "8\\sqrt{5} - 6\\sqrt{5} + 5\\sqrt{5}", ans: "7\\sqrt{5}" },
        { id: 30, category: 'adunare', q: "\\sqrt{169} - \\sqrt{144} + \\sqrt{25}", hint: "13 - 12 + 5", ans: "6" },

        // --- ÎNMULȚIRI & DISTRIBUTIVITATE (31-50) ---
        { id: 31, category: 'inmultire', q: "\\sqrt{2} \\cdot \\sqrt{8}", hint: "\\sqrt{16}", ans: "4" },
        { id: 32, category: 'inmultire', q: "\\sqrt{3} \\cdot \\sqrt{12}", hint: "\\sqrt{36}", ans: "6" },
        { id: 33, category: 'inmultire', q: "\\sqrt{5} \\cdot \\sqrt{20}", hint: "\\sqrt{100}", ans: "10" },
        { id: 34, category: 'inmultire', q: "2\\sqrt{3} \\cdot 3\\sqrt{2}", hint: "(2\\cdot3)\\sqrt{3\\cdot2}", ans: "6\\sqrt{6}" },
        { id: 35, category: 'inmultire', q: "\\sqrt{2}(\\sqrt{2} + 1)", hint: "\\sqrt{4} + \\sqrt{2}", ans: "2 + \\sqrt{2}" },
        { id: 36, category: 'inmultire', q: "\\sqrt{3}(\\sqrt{3} - 2)", hint: "3 - 2\\sqrt{3}", ans: "3 - 2\\sqrt{3}" },
        { id: 37, category: 'inmultire', q: "\\sqrt{2}(\\sqrt{8} + \\sqrt{18})", hint: "\\sqrt{16} + \\sqrt{36} \\text{ sau } \\sqrt{2}(2\\sqrt{2}+3\\sqrt{2})", ans: "10" },
        { id: 38, category: 'inmultire', q: "2(\\sqrt{12} - \\sqrt{3})", hint: "2(2\\sqrt{3} - \\sqrt{3})", ans: "2\\sqrt{3}" },
        { id: 39, category: 'inmultire', q: "\\sqrt{5}(\\sqrt{20} - \\sqrt{5})", hint: "\\sqrt{100} - \\sqrt{25}", ans: "5" },
        { id: 40, category: 'inmultire', q: "\\sqrt{6}(\\sqrt{2} + \\sqrt{3})", hint: "\\sqrt{12} + \\sqrt{18}", ans: "2\\sqrt{3} + 3\\sqrt{2}" },
        { id: 41, category: 'inmultire', q: "(\\sqrt{3} + 1)(\\sqrt{3} + 2)", hint: "3 + 2\\sqrt{3} + \\sqrt{3} + 2", ans: "5 + 3\\sqrt{3}" },
        { id: 42, category: 'inmultire', q: "(\\sqrt{2} - 1)(\\sqrt{2} + 3)", hint: "2 + 3\\sqrt{2} - \\sqrt{2} - 3", ans: "2\\sqrt{2} - 1" },
        { id: 43, category: 'inmultire', q: "\\sqrt{3} \\cdot \\sqrt{2} \\cdot \\sqrt{6}", hint: "\\sqrt{36}", ans: "6" },
        { id: 44, category: 'inmultire', q: "2\\sqrt{5} \\cdot \\sqrt{5} - 3", hint: "2 \\cdot 5 - 3", ans: "7" },
        { id: 45, category: 'inmultire', q: "\\sqrt{10}(\\sqrt{2} + \\sqrt{5})", hint: "\\sqrt{20} + \\sqrt{50}", ans: "2\\sqrt{5} + 5\\sqrt{2}" },
        { id: 46, category: 'inmultire', q: "\\sqrt{8} \\cdot (\\sqrt{2} - 1)", hint: "\\sqrt{16} - \\sqrt{8}", ans: "4 - 2\\sqrt{2}" },
        { id: 47, category: 'inmultire', q: "(\\sqrt{3} + \\sqrt{2})(\\sqrt{3} - \\sqrt{2})", hint: "Formula (a+b)(a-b) = a^2 - b^2", ans: "1" },
        { id: 48, category: 'inmultire', q: "(\\sqrt{5} - \\sqrt{2})(\\sqrt{5} + \\sqrt{2})", hint: "5 - 2", ans: "3" },
        { id: 49, category: 'inmultire', q: "(2\\sqrt{3} - 1)(2\\sqrt{3} + 1)", hint: "(2\\sqrt{3})^2 - 1^2", ans: "11" },
        { id: 50, category: 'inmultire', q: "\\sqrt{75} : \\sqrt{3}", hint: "\\sqrt{25}", ans: "5" },

        // --- RAȚIONALIZĂRI (51-70) ---
        { id: 51, category: 'rationalizare', q: "\\frac{1}{\\sqrt{2}}", hint: "\\text{Amplifică cu } \\sqrt{2}", ans: "\\frac{\\sqrt{2}}{2}" },
        { id: 52, category: 'rationalizare', q: "\\frac{3}{\\sqrt{3}}", hint: "\\frac{3\\sqrt{3}}{3}", ans: "\\sqrt{3}" },
        { id: 53, category: 'rationalizare', q: "\\frac{10}{\\sqrt{5}}", hint: "\\frac{10\\sqrt{5}}{5}", ans: "2\\sqrt{5}" },
        { id: 54, category: 'rationalizare', q: "\\frac{6}{\\sqrt{2}}", hint: "\\frac{6\\sqrt{2}}{2}", ans: "3\\sqrt{2}" },
        { id: 55, category: 'rationalizare', q: "\\frac{4}{\\sqrt{8}}", hint: "\\frac{4}{2\\sqrt{2}} = \\frac{2}{\\sqrt{2}}", ans: "\\sqrt{2}" },
        { id: 56, category: 'rationalizare', q: "\\frac{1}{\\sqrt{2}} + \\frac{1}{\\sqrt{8}}", hint: "\\frac{\\sqrt{2}}{2} + \\frac{\\sqrt{2}}{4}", ans: "\\frac{3\\sqrt{2}}{4}" },
        { id: 57, category: 'rationalizare', q: "\\frac{2}{\\sqrt{3}} + \\sqrt{3}", hint: "\\frac{2\\sqrt{3}}{3} + \\frac{3\\sqrt{3}}{3}", ans: "\\frac{5\\sqrt{3}}{3}" },
        { id: 58, category: 'rationalizare', q: "\\frac{9}{\\sqrt{3}} - \\sqrt{12}", hint: "3\\sqrt{3} - 2\\sqrt{3}", ans: "\\sqrt{3}" },
        { id: 59, category: 'rationalizare', q: "\\frac{14}{\\sqrt{7}} - \\sqrt{28}", hint: "2\\sqrt{7} - 2\\sqrt{7}", ans: "0" },
        { id: 60, category: 'rationalizare', q: "\\frac{5}{\\sqrt{5}} + \\sqrt{20} - \\sqrt{45}", hint: "\\sqrt{5} + 2\\sqrt{5} - 3\\sqrt{5}", ans: "0" },
        { id: 61, category: 'rationalizare', q: "\\frac{1}{2+\\sqrt{3}}", hint: "\\text{Amplifică cu } 2-\\sqrt{3}", ans: "2-\\sqrt{3}" },
        { id: 62, category: 'rationalizare', q: "\\frac{1}{\\sqrt{5}-\\sqrt{2}}", hint: "\\text{Amplifică cu } \\sqrt{5}+\\sqrt{2}", ans: "\\frac{\\sqrt{5}+\\sqrt{2}}{3}" },
        { id: 63, category: 'rationalizare', q: "\\frac{12}{\\sqrt{6}} + \\sqrt{6}", hint: "2\\sqrt{6} + \\sqrt{6}", ans: "3\\sqrt{6}" },
        { id: 64, category: 'rationalizare', q: "\\frac{3}{\\sqrt{18}} + \\frac{5}{\\sqrt{50}}", hint: "\\frac{3}{3\\sqrt{2}} + \\frac{5}{5\\sqrt{2}}", ans: "\\sqrt{2}" },
        { id: 65, category: 'rationalizare', q: "\\frac{8}{\\sqrt{2}} - \\sqrt{32}", hint: "4\\sqrt{2} - 4\\sqrt{2}", ans: "0" },
        { id: 66, category: 'rationalizare', q: "\\frac{15}{2\\sqrt{3}} - \\frac{\\sqrt{27}}{2}", hint: "\\frac{5\\sqrt{3}}{2} - \\frac{3\\sqrt{3}}{2}", ans: "\\sqrt{3}" },
        { id: 67, category: 'rationalizare', q: "\\frac{1}{\\sqrt{2}-1} - \\sqrt{2}", hint: "(\\sqrt{2}+1) - \\sqrt{2}", ans: "1" },
        { id: 68, category: 'rationalizare', q: "\\frac{2}{\\sqrt{5}} + \\frac{6}{\\sqrt{45}}", hint: "\\frac{2\\sqrt{5}}{5} + \\frac{6\\sqrt{5}}{15}", ans: "\\frac{4\\sqrt{5}}{5}" },
        { id: 69, category: 'rationalizare', q: "\\frac{4}{\\sqrt{3}+1}", hint: "\\text{Amplifică cu } \\sqrt{3}-1", ans: "2(\\sqrt{3}-1)" },
        { id: 70, category: 'rationalizare', q: "\\frac{6}{\\sqrt{12}} \\cdot \\sqrt{3}", hint: "\\frac{6}{2\\sqrt{3}} \\cdot \\sqrt{3} = \\frac{3}{\\sqrt{3}} \\cdot \\sqrt{3}", ans: "3" },

        // --- FORMULE (71-85) ---
        { id: 71, category: 'formule', q: "(\\sqrt{3} + 1)^2", hint: "(\\sqrt{3})^2 + 2\\sqrt{3} + 1^2", ans: "4 + 2\\sqrt{3}" },
        { id: 72, category: 'formule', q: "(\\sqrt{2} - 1)^2", hint: "2 - 2\\sqrt{2} + 1", ans: "3 - 2\\sqrt{2}" },
        { id: 73, category: 'formule', q: "(\\sqrt{5} + \\sqrt{2})^2", hint: "5 + 2\\sqrt{10} + 2", ans: "7 + 2\\sqrt{10}" },
        { id: 74, category: 'formule', q: "(2\\sqrt{3} + 1)^2", hint: "12 + 4\\sqrt{3} + 1", ans: "13 + 4\\sqrt{3}" },
        { id: 75, category: 'formule', q: "(\\sqrt{7} - \\sqrt{3})^2", hint: "7 - 2\\sqrt{21} + 3", ans: "10 - 2\\sqrt{21}" },
        { id: 76, category: 'formule', q: "(3\\sqrt{2} - 2)^2", hint: "18 - 12\\sqrt{2} + 4", ans: "22 - 12\\sqrt{2}" },
        { id: 77, category: 'formule', q: "(\\sqrt{5} + 2)^2 - 4\\sqrt{5}", hint: "(5 + 4\\sqrt{5} + 4) - 4\\sqrt{5}", ans: "9" },
        { id: 78, category: 'formule', q: "(\\sqrt{3} - 1)^2 + 2\\sqrt{3}", hint: "(3 - 2\\sqrt{3} + 1) + 2\\sqrt{3}", ans: "4" },
        { id: 79, category: 'formule', q: "(\\sqrt{6} + 1)(\\sqrt{6} - 1)", hint: "6 - 1", ans: "5" },
        { id: 80, category: 'formule', q: "(2\\sqrt{5} - 3)(2\\sqrt{5} + 3)", hint: "20 - 9", ans: "11" },
        { id: 81, category: 'formule', q: "(\\sqrt{10} - \\sqrt{2})^2", hint: "10 - 2\\sqrt{20} + 2", ans: "12 - 4\\sqrt{5}" },
        { id: 82, category: 'formule', q: "(1 + \\sqrt{2})^2 + (1 - \\sqrt{2})^2", hint: "(1+2\\sqrt{2}+2) + (1-2\\sqrt{2}+2)", ans: "6" },
        { id: 83, category: 'formule', q: "(\\sqrt{3} + \\sqrt{2})^2 - (\\sqrt{3} - \\sqrt{2})^2", hint: "Diferență de pătrate sau calcul", ans: "4\\sqrt{6}" },
        { id: 84, category: 'formule', q: "\\sqrt{(3 - \\sqrt{5})^2}", hint: "|3 - \\sqrt{5}| = 3 - \\sqrt{5} \\text{ (pozitiv)}", ans: "3 - \\sqrt{5}" },
        { id: 85, category: 'formule', q: "\\sqrt{(1 - \\sqrt{2})^2}", hint: "|1 - \\sqrt{2}| = \\sqrt{2} - 1 \\text{ (inversăm!)}", ans: "\\sqrt{2} - 1" },

        // --- MIX AVANSAT (86-100) ---
        { id: 86, category: 'mix', q: "\\sqrt{3}(\\sqrt{12} - \\sqrt{3}) + \\sqrt{4}", hint: "\\sqrt{36} - 3 + 2", ans: "5" },
        { id: 87, category: 'mix', q: "2\\sqrt{18} - 3\\sqrt{8} + \\sqrt{200}", hint: "6\\sqrt{2} - 6\\sqrt{2} + 10\\sqrt{2}", ans: "10\\sqrt{2}" },
        { id: 88, category: 'mix', q: "\\frac{1}{\\sqrt{2}} \\cdot (\\sqrt{8} + \\sqrt{2})", hint: "\\frac{1}{\\sqrt{2}} \\cdot 3\\sqrt{2}", ans: "3" },
        { id: 89, category: 'mix', q: "(\\sqrt{72} + \\sqrt{32}) : \\sqrt{2}", hint: "(6\\sqrt{2} + 4\\sqrt{2}) : \\sqrt{2}", ans: "10" },
        { id: 90, category: 'mix', q: "\\sqrt{3} \\cdot \\sqrt{27} - \\sqrt{2} \\cdot \\sqrt{8}", hint: "\\sqrt{81} - \\sqrt{16}", ans: "5" },
        { id: 91, category: 'mix', q: "3\\sqrt{12} - 2(\\sqrt{27} - \\sqrt{3})", hint: "6\\sqrt{3} - 2(2\\sqrt{3})", ans: "2\\sqrt{3}" },
        { id: 92, category: 'mix', q: "\\frac{\\sqrt{24} - \\sqrt{6}}{\\sqrt{6}}", hint: "\\frac{\\sqrt{6}}{\\sqrt{6}}", ans: "1" },
        { id: 93, category: 'mix', q: "(\\sqrt{5} + 2)(\\sqrt{5} - 2) + \\sqrt{9}", hint: "1 + 3", ans: "4" },
        { id: 94, category: 'mix', q: "\\sqrt{196} - \\sqrt{169} + \\sqrt{225}", hint: "14 - 13 + 15", ans: "16" },
        { id: 95, category: 'mix', q: "5\\sqrt{3} - \\sqrt{12} + \\frac{6}{\\sqrt{3}}", hint: "5\\sqrt{3} - 2\\sqrt{3} + 2\\sqrt{3}", ans: "5\\sqrt{3}" },
        { id: 96, category: 'mix', q: "|2\\sqrt{3} - 4| + 4", hint: "2\\sqrt{3} \\approx 3.46 < 4 \\Rightarrow 4 - 2\\sqrt{3} + 4", ans: "8 - 2\\sqrt{3}" },
        { id: 97, category: 'mix', q: "\\sqrt{8} \\cdot \\sqrt{3} - \\sqrt{6}", hint: "2\\sqrt{6} - \\sqrt{6}", ans: "\\sqrt{6}" },
        { id: 98, category: 'mix', q: "(\\frac{1}{2}\\sqrt{20} + \\sqrt{45}) : \\sqrt{5}", hint: "(\\sqrt{5} + 3\\sqrt{5}) : \\sqrt{5}", ans: "4" },
        { id: 99, category: 'mix', q: "\\sqrt{2} \\cdot (\\sqrt{2} + 1) - \\sqrt{2}", hint: "2 + \\sqrt{2} - \\sqrt{2}", ans: "2" },
        { id: 100, category: 'mix', q: "(3 + \\sqrt{2})^2 - 6\\sqrt{2}", hint: "9 + 6\\sqrt{2} + 2 - 6\\sqrt{2}", ans: "11" },

        // --- MUNCITOREȘTI / AVANSAT (101-110) ---
        { id: 101, category: 'avansat', q: "3\\sqrt{20} + 4\\sqrt{45} - 2\\sqrt{80} - \\sqrt{125}", hint: "6\\sqrt{5} + 12\\sqrt{5} - 8\\sqrt{5} - 5\\sqrt{5}", ans: "5\\sqrt{5}" },
        { id: 102, category: 'avansat', q: "(\\sqrt{32} - \\sqrt{18} + \\sqrt{50}) \\cdot \\sqrt{2}", hint: "(4\\sqrt{2} - 3\\sqrt{2} + 5\\sqrt{2}) \\cdot \\sqrt{2}", ans: "12" },
        { id: 103, category: 'avansat', q: "\\frac{6}{\\sqrt{3}} + \\frac{10}{\\sqrt{75}} - \\sqrt{12}", hint: "2\\sqrt{3} + \\frac{2\\sqrt{3}}{3} - 2\\sqrt{3}", ans: "\\frac{2\\sqrt{3}}{3}" },
        { id: 104, category: 'avansat', q: "(2\\sqrt{3} - 1)^2 + (2\\sqrt{3} + 1)^2", hint: "(13 - 4\\sqrt{3}) + (13 + 4\\sqrt{3})", ans: "26" },
        { id: 105, category: 'avansat', q: "2\\sqrt{3}(\\sqrt{27} + 2\\sqrt{3}) - \\sqrt{144}", hint: "2\\sqrt{3}(3\\sqrt{3} + 2\\sqrt{3}) - 12", ans: "18" },
        { id: 106, category: 'avansat', q: "\\frac{2}{\\sqrt{2}} + \\frac{4}{\\sqrt{8}} + \\frac{8}{\\sqrt{32}}", hint: "\\sqrt{2} + \\sqrt{2} + \\sqrt{2}", ans: "3\\sqrt{2}" },
        { id: 107, category: 'avansat', q: "\\sqrt{3}(\\sqrt{12} + \\sqrt{75} - \\sqrt{27})", hint: "\\sqrt{3}(2\\sqrt{3} + 5\\sqrt{3} - 3\\sqrt{3})", ans: "12" },
        { id: 108, category: 'avansat', q: "(\\sqrt{5} + 2)^2 - \\sqrt{80}", hint: "(9 + 4\\sqrt{5}) - 4\\sqrt{5}", ans: "9" },
        { id: 109, category: 'avansat', q: "\\frac{\\sqrt{54} - \\sqrt{24}}{\\sqrt{6}} + \\sqrt{4}", hint: "\\frac{3\\sqrt{6} - 2\\sqrt{6}}{\\sqrt{6}} + 2", ans: "3" },
        { id: 110, category: 'avansat', q: "5\\sqrt{12} - 3\\sqrt{27} + 2\\sqrt{48} - \\frac{12}{\\sqrt{3}}", hint: "10\\sqrt{3} - 9\\sqrt{3} + 8\\sqrt{3} - 4\\sqrt{3}", ans: "5\\sqrt{3}" },
    ];

    const filteredExercises = activeCategory === 'all'
        ? exercises
        : exercises.filter(ex => ex.category === activeCategory);

    return (
        <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-800">
            <div className="max-w-5xl mx-auto">
                <header className="mb-10 text-center">
                    <h1 className="text-4xl font-extrabold text-indigo-700 mb-4 tracking-tight">
                        100+ Exerciții cu Radicali
                    </h1>
                    <p className="text-slate-600 text-lg">
                        Clasa a VII-a • De la simplu la avansat • Apasă pe carduri pentru indicii
                    </p>
                </header>

                {/* Filters */}
                <div className="flex flex-wrap gap-2 justify-center mb-10">
                    {categories.map((cat) => {
                        const Icon = cat.icon;
                        const isSpecial = cat.special;
                        const isActive = activeCategory === cat.id;

                        let buttonClass = `flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all shadow-sm border `;

                        if (isSpecial) {
                            buttonClass += isActive
                                ? 'bg-rose-600 text-white shadow-rose-200 shadow-lg scale-105 border-rose-600'
                                : 'bg-white text-rose-600 border-rose-200 hover:bg-rose-50';
                        } else {
                            buttonClass += isActive
                                ? 'bg-indigo-600 text-white shadow-indigo-200 shadow-lg scale-105 border-indigo-600'
                                : 'bg-white text-slate-600 border-slate-200 hover:bg-indigo-50';
                        }

                        return (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className={buttonClass}
                            >
                                <Icon size={18} />
                                {cat.label}
                            </button>
                        );
                    })}
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredExercises.map((ex) => {
                        const isAdvanced = ex.category === 'avansat';
                        return (
                            <div
                                key={ex.id}
                                onClick={() => toggleCard(ex.id)}
                                className={`relative rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden group
                  ${isAdvanced
                                        ? 'border-l-8 border-rose-500 bg-rose-50 xl:col-span-2 shadow-rose-100 hover:shadow-rose-200'
                                        : 'border-l-4 border-slate-300 bg-white hover:border-indigo-300'}
                  ${revealedState[ex.id]
                                        ? (isAdvanced ? 'ring-2 ring-rose-200' : 'border-indigo-500 ring-2 ring-indigo-100')
                                        : ''}
                `}
                            >
                                {/* Card Number */}
                                <div className={`absolute top-2 right-2 text-xs font-bold group-hover:opacity-100 opacity-60
                  ${isAdvanced ? 'text-rose-300 group-hover:text-rose-500' : 'text-slate-300 group-hover:text-indigo-200'}`}>
                                    #{ex.id}
                                </div>

                                {isAdvanced && (
                                    <div className="absolute top-0 left-0 bg-rose-500 text-white text-[10px] uppercase font-bold px-2 py-1 rounded-br-lg">
                                        Muncitorești
                                    </div>
                                )}

                                <div className="p-6 flex flex-col items-center justify-center min-h-[160px] text-center">
                                    {/* Question */}
                                    <div className="mb-4">
                                        <span className={`text-2xl font-serif font-bold tracking-wide ${isAdvanced ? 'text-rose-900' : 'text-slate-800'}`}>
                                            $${ex.q}$$
                                        </span>
                                    </div>

                                    {/* Hint Section (Only Hint, no Answer) */}
                                    <div className={`transition-all duration-500 ease-in-out w-full
                    ${revealedState[ex.id] ? 'opacity-100 max-h-40' : 'opacity-0 max-h-0 overflow-hidden'}`}>

                                        <div className={`flex flex-col gap-2 mt-4 pt-4 border-t w-full ${isAdvanced ? 'border-rose-200' : 'border-slate-100'}`}>
                                            {/* Hint */}
                                            <div className={`flex items-center justify-center gap-2 text-sm py-1 px-3 rounded-lg mx-auto
                        ${isAdvanced ? 'text-rose-700 bg-rose-100' : 'text-amber-600 bg-amber-50'}`}>
                                                <Lightbulb size={14} />
                                                <span className="font-semibold">Indiciu:</span>
                                                <span className="font-mono">
                                                    $${ex.hint}$$
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Click instruction (only visible if closed) */}
                                    {!revealedState[ex.id] && (
                                        <div className={`absolute bottom-3 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1
                      ${isAdvanced ? 'text-rose-400' : 'text-slate-400'}`}>
                                            Vezi indiciul <ChevronDown size={12} />
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Footer */}
                <footer className="mt-16 text-center text-slate-400 text-sm pb-8">
                    <p>Creat pentru exercițiu și consolidarea cunoștințelor.</p>
                </footer>
            </div>
        </div>
    );
};

export default ExerciseApp;