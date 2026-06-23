import React, { useState, useEffect, useMemo } from 'react';
import { Lightbulb, CheckCircle, ChevronLeft, ChevronRight, Calculator, Activity } from 'lucide-react';

// --- GENERATOARE PROCEDURALE PENTRU EXERCIȚII ---

function generatePowers() {
    const exercises = [];
    for (let i = 1; i <= 200; i++) {
        const type = Math.floor(Math.random() * 6);
        let q, h, a;
        const base = Math.floor(Math.random() * 8) + 2; // 2 to 9
        const exp1 = Math.floor(Math.random() * 9) + 2; // 2 to 10
        const exp2 = Math.floor(Math.random() * 9) + 2; // 2 to 10

        if (type === 0) {
            q = String.raw`Calculează sau simplifică: $${base}^{${exp1}} \cdot ${base}^{${exp2}}$`;
            h = String.raw`Când înmulțim puteri cu aceeași bază, adunăm exponenții: $a^m \cdot a^n = a^{m+n}$.`;
            a = String.raw`Răspuns: $${base}^{${exp1 + exp2}}$`;
        } else if (type === 1) {
            const maxE = Math.max(exp1, exp2) + 2; // Asigurăm exp pozitiv
            const minE = Math.min(exp1, exp2);
            q = String.raw`Calculează sau simplifică: $\frac{${base}^{${maxE}}}{${base}^{${minE}}}$`;
            h = String.raw`Când împărțim puteri cu aceeași bază, scădem exponenții: $\frac{a^m}{a^n} = a^{m-n}$.`;
            a = String.raw`Răspuns: $${base}^{${maxE - minE}}$`;
        } else if (type === 2) {
            q = String.raw`Simplifică expresia: $(${base}^{${exp1}})^{${exp2}}$`;
            h = String.raw`La puterea unei puteri, înmulțim exponenții: $(a^m)^n = a^{m \cdot n}$.`;
            a = String.raw`Răspuns: $${base}^{${exp1 * exp2}}$`;
        } else if (type === 3) {
            q = String.raw`Exprimă sub formă de fracție: $${base}^{-${exp1}}$`;
            h = String.raw`Un exponent negativ înseamnă inversul bazei la acea putere: $a^{-n} = \frac{1}{a^n}$.`;
            a = String.raw`Răspuns: $\frac{1}{${base}^{${exp1}}}$`;
        } else if (type === 4) {
            const e1 = exp1 + 3;
            const e2 = exp1;
            q = String.raw`Simplifică fracția: $\frac{${base}^{${e1}} \cdot ${base}^{${e2}}}{${base}^{${e1 + e2 - 2}}}$`;
            h = String.raw`Combină regulile: întâi adună exponenții la numărător, apoi scade cu cel de la numitor.`;
            a = String.raw`Răspuns: $${base}^2 = ${base * base}$`;
        } else {
            const root = Math.floor(Math.random() * 3) + 2; // 2 to 4
            q = String.raw`Scrie sub formă de putere: $\sqrt[${root}]{${base}^{${exp1 * root}}}$`;
            h = String.raw`Radicalul se scrie ca exponent fracționar: $\sqrt[n]{a^m} = a^{\frac{m}{n}}$. Apoi simplifică fracția.`;
            a = String.raw`Răspuns: $${base}^{\frac{${exp1 * root}}{${root}}} = ${base}^{${exp1}}$`;
        }
        exercises.push({ id: `pow_${i}`, index: i, q, h, a });
    }
    return exercises;
}

function generateDerivatives() {
    const exercises = [];
    for (let i = 1; i <= 100; i++) {
        const type = Math.floor(Math.random() * 6);
        let q, h, a;
        const c1 = Math.floor(Math.random() * 8) + 2;
        const e1 = Math.floor(Math.random() * 7) + 3;

        if (type === 0) {
            q = String.raw`Calculează derivata funcției: $f(x) = ${c1}x^{${e1}}$`;
            h = String.raw`Folosește regula puterii: $(cx^n)' = c \cdot n \cdot x^{n-1}$.`;
            a = String.raw`$f'(x) = ${c1 * e1}x^{${e1 - 1}}$`;
        } else if (type === 1) {
            const c2 = Math.floor(Math.random() * 8) + 2;
            const e2 = e1 - 1;
            q = String.raw`Calculează derivata: $f(x) = ${c1}x^{${e1}} - ${c2}x^{${e2}}$`;
            h = String.raw`Folosește regula sumei și diferenței: $(u \pm v)' = u' \pm v'$, alături de regula puterii.`;
            a = String.raw`$f'(x) = ${c1 * e1}x^{${e1 - 1}} - ${c2 * e2}x^{${e2 - 1}}$`;
        } else if (type === 2) {
            q = String.raw`Calculează derivata: $f(x) = x^{${e1}} \cdot e^x$`;
            h = String.raw`Folosește regula produsului: $(uv)' = u'v + uv'$. (Aici $u = x^{${e1}}$ și $v = e^x$).`;
            a = String.raw`$f'(x) = ${e1}x^{${e1 - 1}}e^x + x^{${e1}}e^x = x^{${e1 - 1}}e^x(${e1} + x)$`;
        } else if (type === 3) {
            q = String.raw`Calculează derivata: $f(x) = \frac{x^{${e1}}}{x + 1}$`;
            h = String.raw`Folosește regula câtului: $\left(\frac{u}{v}\right)' = \frac{u'v - uv'}{v^2}$.`;
            a = String.raw`$f'(x) = \frac{${e1}x^{${e1 - 1}}(x + 1) - x^{${e1}} \cdot 1}{(x + 1)^2}$`;
        } else if (type === 4) {
            q = String.raw`Calculează derivata compusă: $f(x) = (${c1}x - 1)^{${e1}}$`;
            h = String.raw`Folosește regula lanțului: $(u^n)' = n \cdot u^{n-1} \cdot u'$.`;
            a = String.raw`$f'(x) = ${e1}(${c1}x - 1)^{${e1 - 1}} \cdot ${c1} = ${e1 * c1}(${c1}x - 1)^{${e1 - 1}}$`;
        } else {
            const subType = Math.floor(Math.random() * 3);
            if (subType === 0) {
                q = String.raw`Calculează derivata: $f(x) = \cos(${c1}x)$`;
                h = String.raw`Regula lanțului pentru cosinus: $(\cos u)' = -\sin(u) \cdot u'$.`;
                a = String.raw`$f'(x) = -${c1}\sin(${c1}x)$`;
            } else if (subType === 1) {
                q = String.raw`Calculează derivata: $f(x) = \ln(x^{${e1}})$`;
                h = String.raw`Poți folosi proprietatea $\ln(x^n) = n\ln(x)$ și apoi derivata, sau regula lanțului $(\ln u)' = \frac{u'}{u}$.`;
                a = String.raw`$f'(x) = \frac{${e1}x^{${e1 - 1}}}{x^{${e1}}} = \frac{${e1}}{x}$`;
            } else {
                q = String.raw`Calculează derivata: $f(x) = e^{${c1}x^2}$`;
                h = String.raw`Regula lanțului pentru exponențială: $(e^u)' = e^u \cdot u'$.`;
                a = String.raw`$f'(x) = e^{${c1}x^2} \cdot (${c1} \cdot 2x) = ${c1 * 2}x e^{${c1}x^2}$`;
            }
        }
        exercises.push({ id: `der_${i}`, index: i, q, h, a });
    }
    return exercises;
}

// --- COMPONENTE REACT ---

const TextWithMath = ({ text, katexLoaded }) => {
    if (!katexLoaded) return <span className="opacity-50">Se încarcă formulele...</span>;

    // Împarte textul bazat pe delimitatorul de math $...$
    const parts = text.split('$');

    return (
        <span className="leading-relaxed">
            {parts.map((part, index) => {
                // Părțile impare (index 1, 3, 5...) sunt expresii matematice
                if (index % 2 === 1) {
                    try {
                        const html = window.katex.renderToString(part, {
                            throwOnError: false,
                            displayMode: false,
                        });
                        return <span key={index} dangerouslySetInnerHTML={{ __html: html }} className="mx-1 text-indigo-900" />;
                    } catch (e) {
                        return <span key={index} className="text-red-500">{part}</span>;
                    }
                }
                return <span key={index}>{part}</span>;
            })}
        </span>
    );
};

const ExerciseCard = ({ exercise, katexLoaded }) => {
    const [showHint, setShowHint] = useState(false);
    const [showAnswer, setShowAnswer] = useState(false);

    return (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col h-full">
            <div className="flex justify-between items-center mb-4">
                <span className="bg-indigo-100 text-indigo-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                    Exercițiul {exercise.index}
                </span>
            </div>

            <div className="text-lg text-slate-800 mb-6 flex-grow font-medium">
                <TextWithMath text={exercise.q} katexLoaded={katexLoaded} />
            </div>

            <div className="space-y-3 mt-auto">
                {/* Hint Section */}
                <div>
                    <button
                        onClick={() => setShowHint(!showHint)}
                        className={`flex items-center gap-2 text-sm font-semibold transition-colors duration-200 ${showHint ? 'text-amber-600' : 'text-slate-500 hover:text-amber-500'}`}
                    >
                        <Lightbulb size={18} className={showHint ? "fill-amber-100" : ""} />
                        {showHint ? "Ascunde Indiciul" : "Arată Indiciul"}
                    </button>

                    {showHint && (
                        <div className="mt-2 p-3 bg-amber-50 border border-amber-100 rounded-xl text-amber-900 text-sm animate-fadeIn">
                            <TextWithMath text={exercise.h} katexLoaded={katexLoaded} />
                        </div>
                    )}
                </div>

                {/* Answer Section */}
                <div>
                    <button
                        onClick={() => setShowAnswer(!showAnswer)}
                        className={`flex items-center gap-2 text-sm font-semibold transition-colors duration-200 ${showAnswer ? 'text-green-600' : 'text-slate-500 hover:text-green-500'}`}
                    >
                        <CheckCircle size={18} className={showAnswer ? "fill-green-100" : ""} />
                        {showAnswer ? "Ascunde Răspunsul" : "Arată Răspunsul"}
                    </button>

                    {showAnswer && (
                        <div className="mt-2 p-4 bg-green-50 border border-green-200 rounded-xl text-green-900 font-medium animate-fadeIn text-lg">
                            <TextWithMath text={exercise.a} katexLoaded={katexLoaded} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default function App() {
    const [katexLoaded, setKatexLoaded] = useState(false);
    const [activeTab, setActiveTab] = useState('powers'); // 'powers' | 'derivatives'
    const [page, setPage] = useState(1);
    const itemsPerPage = 20;

    // Pre-generăm exercițiile pentru a menține performanța
    const powersData = useMemo(() => generatePowers(), []);
    const derivData = useMemo(() => generateDerivatives(), []);

    // Încărcăm KaTeX CSS & JS dinamic
    useEffect(() => {
        const css = document.createElement('link');
        css.rel = 'stylesheet';
        css.href = 'https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css';
        document.head.appendChild(css);

        const js = document.createElement('script');
        js.src = 'https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.js';
        js.onload = () => setKatexLoaded(true);
        document.head.appendChild(js);

        return () => {
            // Cleanup la demontare (deși în platforme unice nu e strict necesar)
            if (document.head.contains(css)) document.head.removeChild(css);
            if (document.head.contains(js)) document.head.removeChild(js);
        };
    }, []);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setPage(1); // Resetăm pagina la schimbarea categoriei
    };

    const currentData = activeTab === 'powers' ? powersData : derivData;
    const totalPages = Math.ceil(currentData.length / itemsPerPage);
    const displayedItems = currentData.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    return (
        <div className="min-h-screen bg-slate-50 font-sans flex flex-col text-slate-800">

            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}} />

            {/* Header */}
            <header className="bg-gradient-to-r from-indigo-800 to-blue-700 text-white shadow-lg sticky top-0 z-10">
                <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
                            <Calculator size={28} className="text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-extrabold tracking-tight">Algomate Practice</h1>
                            <p className="text-blue-200 text-sm font-medium">Baza de date cu exerciții (300 probleme)</p>
                        </div>
                    </div>

                    <div className="flex bg-indigo-900/40 p-1.5 rounded-2xl backdrop-blur-md">
                        <button
                            onClick={() => handleTabChange('powers')}
                            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 ${activeTab === 'powers' ? 'bg-white text-indigo-700 shadow-sm' : 'text-indigo-100 hover:text-white hover:bg-white/10'}`}
                        >
                            <Calculator size={16} />
                            Puteri (200)
                        </button>
                        <button
                            onClick={() => handleTabChange('derivatives')}
                            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 ${activeTab === 'derivatives' ? 'bg-white text-indigo-700 shadow-sm' : 'text-indigo-100 hover:text-white hover:bg-white/10'}`}
                        >
                            <Activity size={16} />
                            Derivate (100)
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow max-w-6xl mx-auto px-6 py-10 w-full">
                <div className="mb-8 text-center md:text-left">
                    <h2 className="text-3xl font-bold text-slate-800 mb-2">
                        {activeTab === 'powers' ? 'Exerciții cu Puteri și Radicali' : 'Calcul Diferențial: Derivate'}
                    </h2>
                    <p className="text-slate-500">
                        Rezolvă problemele pas cu pas. Folosește indiciile doar dacă ești blocat!
                        (Pagina {page} din {totalPages})
                    </p>
                </div>

                {/* Exercises Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {displayedItems.map((ex) => (
                        <ExerciseCard key={ex.id} exercise={ex} katexLoaded={katexLoaded} />
                    ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="mt-12 flex items-center justify-center gap-2">
                        <button
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            disabled={page === 1}
                            className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronLeft size={20} />
                        </button>

                        <div className="flex gap-1 overflow-x-auto max-w-[200px] sm:max-w-none px-2 scrollbar-hide">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                                <button
                                    key={p}
                                    onClick={() => setPage(p)}
                                    className={`w-10 h-10 rounded-xl font-medium text-sm transition-colors ${page === p ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-200'}`}
                                >
                                    {p}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                            disabled={page === totalPages}
                            className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                )}
            </main>

            {/* Footer */}
            <footer className="bg-slate-900 text-slate-400 py-8 text-center mt-auto border-t border-slate-800">
                <div className="max-w-6xl mx-auto px-6 flex flex-col items-center gap-2">
                    <div className="flex items-center gap-2 text-indigo-400 mb-2 opacity-80">
                        <Calculator size={20} />
                        <span className="font-bold text-lg">Algomate</span>
                    </div>
                    <p className="text-sm">
                        © Copyright Algomate 2025. Toate drepturile rezervate. Platformă educațională de matematică.
                    </p>
                </div>
            </footer>

        </div>
    );
}