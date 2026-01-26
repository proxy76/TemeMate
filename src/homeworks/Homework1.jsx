import React, { useState } from 'react';
import { Book, Calculator, TrendingUp, Grid, Move, ArrowRight, Sigma, Menu, X } from 'lucide-react';

// Componenta helper pentru afișarea limitelor
const Limit = ({ to, func }) => (
    <span className="inline-flex items-center gap-2 align-middle">
        <span className="inline-flex flex-col items-center">
            <span className="font-serif italic leading-none text-xl">lim</span>
            <span className="text-[0.65rem] text-slate-600 font-sans -mt-1 font-semibold">{to}</span>
        </span>
        <span>{func}</span>
    </span>
);

const Homework1 = () => {
    const [activeCategory, setActiveCategory] = useState('exponentiale');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Baza de date cu exerciții
    const exerciseData = {
        exponentiale: {
            title: "Ecuații Exponențiale",
            icon: <TrendingUp size={24} />,
            color: "bg-blue-100 text-blue-700",
            description: "Rezolvați următoarele ecuații în mulțimea numerelor reale:",
            items: [
                "2ˣ = 4",
                "3ˣ = 27",
                "5ˣ = 125",
                "2ˣ⁺¹ = 16",
                "3²ˣ = 9",
                "7ˣ = 1",
                "2ˣ = 2³",
                "5ˣ⁻¹ = 25",
                "4ˣ = 64",
                "3ˣ⁺² = 3⁵",
                "2ˣ = -2 (Discuție)",
                "10ˣ = 1000",
                "(1/2)ˣ = 4",
                "3ˣ = 1/9",
                "2³ˣ⁻¹ = 32",
                "5ˣ²⁻¹ = 1",
                "2ˣ + 2ˣ⁺¹ = 12",
                "3ˣ + 3ˣ⁺² = 90",
                "4ˣ - 2 = 14",
                "2ˣ ⋅ 2³ = 2⁷"
            ]
        },
        logaritmi: {
            title: "Ecuații cu Logaritmi",
            icon: <Book size={24} />,
            color: "bg-green-100 text-green-700",
            description: "Determinați x ∈ (0, +∞) pentru următoarele ecuații:",
            items: [
                "log₂ x = 3",
                "log₃ x = 2",
                "log₅ x = 1",
                "ln x = 0",
                "log₂ (x + 1) = 1",
                "log₃ (x - 2) = 2",
                "log₂ x = log₂ 5",
                "log₅ (2x) = 2",
                "log₃ x = -1",
                "log₂ (x² - 1) = 3",
                "ln eˣ = 5",
                "log₂ x + log₂ 2 = 3",
                "log₃ x - log₃ 3 = 1",
                "log₄ x = 1/2",
                "log₂ (x + 2) = log₂ 10",
                "2 log₂ x = 4",
                "log₅ (x + 1) = 0",
                "log₃ (x + 4) = 2",
                "log₂ (3x - 1) = 3",
                "log₂ x = 4"
            ]
        },
        gradul2: {
            title: "Ecuații de Gradul 2",
            icon: <Calculator size={24} />,
            color: "bg-purple-100 text-purple-700",
            description: "Rezolvați în R ecuațiile (calculați Δ și rădăcinile):",
            items: [
                "x² - 4x + 3 = 0",
                "x² - 5x + 6 = 0",
                "x² - 3x + 2 = 0",
                "x² - 1 = 0",
                "x² - 9 = 0",
                "x² + 4x + 4 = 0",
                "x² - 6x + 9 = 0",
                "x² + x - 2 = 0",
                "x² - x - 2 = 0",
                "2x² - 8 = 0",
                "x² + 5x = 0",
                "x² - 3x = 0",
                "x² - 2x + 1 = 0",
                "x² + 2x - 3 = 0",
                "x² - 7x + 10 = 0",
                "x² + x = 0",
                "3x² - 12 = 0",
                "x² - 4x = 0",
                "x² + 3x + 2 = 0",
                "x² - 16 = 0"
            ]
        },
        derivate: {
            title: "Derivate",
            icon: <TrendingUp size={24} />,
            color: "bg-red-100 text-red-700",
            description: "Calculați f'(x) pentru funcțiile date:",
            items: [
                "f(x) = x²",
                "f(x) = x³",
                "f(x) = 3x",
                "f(x) = 5",
                "f(x) = x² + 2x",
                "f(x) = x³ + 1",
                "f(x) = eˣ",
                "f(x) = ln x",
                "f(x) = sin x",
                "f(x) = cos x",
                "f(x) = 2x + 1",
                "f(x) = x² - 4x + 3",
                "f(x) = 1/x",
                "f(x) = √x",
                "f(x) = x⁴ + x²",
                "f(x) = x ⋅ eˣ",
                "f(x) = (x + 1)²",
                "f(x) = 3x⁵",
                "f(x) = x + ln x",
                "f(x) = x / 2"
            ]
        },
        matrici: {
            title: "Matrici și Determinanți",
            icon: <Grid size={24} />,
            color: "bg-yellow-100 text-yellow-700",
            description: "Se dau matricile A și B. Calculați:",
            items: [
                "det(A) pentru A = [[1, 2], [3, 4]]",
                "det(A) pentru A = [[2, 5], [1, 3]]",
                "A + B pentru A=[[1,0],[0,1]], B=[[2,1],[1,2]]",
                "2A pentru A = [[1, -1], [2, 0]]",
                "A² pentru A = [[1, 1], [0, 1]]",
                "det(I₂)",
                "A - B pentru A=[[3,3],[3,3]], B=[[1,1],[1,1]]",
                "Tr(A) (urma) pentru A = [[2, 1], [4, 5]]",
                "A ⋅ B pentru A=[[1,0],[0,1]], B=[[3,4],[5,6]]",
                "det(A) pentru A = [[0, 0], [0, 0]]",
                "Rezolvați det(A) = 0 unde A = [[x, 1], [2, 3]]",
                "det(A) pentru A = [[1, 0, 0], [0, 1, 0], [0, 0, 1]]",
                "Suma elementelor matricei A = [[1, 2], [3, 4]]",
                "A + I₂ pentru A = [[2, 2], [2, 2]]",
                "x dacă [[x, 1], [2, 3]] = [[5, 1], [2, 3]]",
                "det(A) pentru A = [[-1, 2], [3, -4]]",
                "3A - 2A",
                "Produsul elementelor de pe diagonala principală A=[[2,1],[0,3]]",
                "A² pentru A = [[0, 1], [1, 0]]",
                "det(A) pentru A = [[x, 0], [0, 1]]"
            ]
        },
        vectori: {
            title: "Vectori",
            icon: <Move size={24} />,
            color: "bg-indigo-100 text-indigo-700",
            description: "Considerăm reperul cartezian xOy și vectorii:",
            items: [
                "Calculați lungimea vectorului v = 3i + 4j",
                "Calculați lungimea vectorului v = 6i + 8j",
                "Suma vectorilor v₁ = 2i + 3j și v₂ = i + j",
                "Suma vectorilor v₁ = i - j și v₂ = -i + j",
                "Aflați a real dacă v₁ = ai + 2j și v₂ = 4i + 2j sunt egali",
                "Calculați produsul scalar v₁ ⋅ v₂ pentru v₁=i, v₂=j",
                "Lungimea vectorului v = 5i + 12j",
                "Coordonatele vectorului AB unde A(1,1), B(3,3)",
                "Coordonatele vectorului AB unde A(0,0), B(4,2)",
                "Mijlocul segmentului AB pentru A(2,4), B(4,2)",
                "Distanța dintre punctele A(1,2) și B(1,5)",
                "v₁ = 2i + 3j. Calculați 2v₁",
                "Condiția de coliniaritate pt v₁ = 2i + j și v₂ = 4i + aj",
                "Lungimea vectorului v = -3i + 4j",
                "v = i + j. Calculați modulul |v|",
                "Punctul M(x, y) este mijlocul lui A(0,0), B(2,2). Aflați M.",
                "Dacă A(2,3) și B(2,3), vectorul AB este nul?",
                "v₁ = i + j, v₂ = i - j. Calculați v₁ + v₂",
                "Calculați 3i + 2j - (i + j)",
                "Modulul vectorului v = 1i + 1j"
            ]
        },
        limite: {
            title: "Limite de funcții",
            icon: <Sigma size={24} />,
            color: "bg-orange-100 text-orange-700",
            description: "Calculați următoarele limite:",
            items: [
                <Limit key="1" to="x→∞" func="x" />,
                <Limit key="2" to="x→∞" func="1/x" />,
                <Limit key="3" to="x→∞" func="x² + x" />,
                <Limit key="4" to="x→1" func="x + 2" />,
                <Limit key="5" to="x→2" func="x² - 1" />,
                <Limit key="6" to="x→∞" func="(2x + 1) / (x + 1)" />,
                <Limit key="7" to="x→∞" func="(x² + 1) / (2x² - x)" />,
                <Limit key="8" to="x→0" func="sin(x)/x" />,
                <Limit key="9" to="x→∞" func="(1 + 1/x)ˣ" />,
                <Limit key="10" to="x→∞" func="3ˣ" />,
                <Limit key="11" to="x→-∞" func="3ˣ" />,
                <Limit key="12" to="x→∞" func="(5x² + 1) / (x² + 3)" />,
                <Limit key="13" to="x→1" func="(x - 1) / (x² - 1)" />,
                <Limit key="14" to="x→0" func="(eˣ - 1) / x" />,
                <Limit key="15" to="x→∞" func="(x + 1) / x²" />,
                <Limit key="16" to="x→2" func="(x² - 4) / (x - 2)" />,
                <Limit key="17" to="x→∞" func="ln x" />,
                <Limit key="18" to="x→0" func="x²" />,
                <Limit key="19" to="x→∞" func="5" />,
                <Limit key="20" to="x→∞" func="(3x³ + x) / (x³ + 2)" />
            ]
        }
    };

    const categories = Object.keys(exerciseData);

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col md:flex-row">
            {/* Sidebar Navigation */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 transition-transform duration-200 ease-in-out`}>
                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                        <Calculator className="text-blue-600" />
                        <span className="text-lg">Mate Bac M2</span>
                    </h1>
                    <button onClick={() => setIsMobileMenuOpen(false)} className="md:hidden text-slate-500">
                        <X />
                    </button>
                </div>

                <nav className="p-4 space-y-2 overflow-y-auto h-[calc(100vh-80px)]">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => {
                                setActiveCategory(cat);
                                setIsMobileMenuOpen(false);
                            }}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeCategory === cat
                                    ? `${exerciseData[cat].color} ring-1 ring-inset ring-opacity-50`
                                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                }`}
                        >
                            {exerciseData[cat].icon}
                            {exerciseData[cat].title}
                        </button>
                    ))}
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 p-4 md:p-8">
                <div className="max-w-4xl mx-auto">
                    {/* Mobile Header Toggle */}
                    <div className="md:hidden mb-6 flex items-center justify-between bg-white p-4 rounded-xl shadow-sm">
                        <h2 className="font-bold text-slate-800">Culegere Digitală</h2>
                        <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 bg-slate-100 rounded-lg">
                            <Menu size={24} />
                        </button>
                    </div>

                    <header className="mb-8">
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-3 ${exerciseData[activeCategory].color.replace('text-', 'bg-').replace('100', '100').split(' ')[0]} ${exerciseData[activeCategory].color.split(' ')[1]}`}>
                            Clasa a XII-a • Nivel M2
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
                            {exerciseData[activeCategory].title}
                        </h2>
                        <p className="text-lg text-slate-600">
                            {exerciseData[activeCategory].description}
                        </p>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {exerciseData[activeCategory].items.map((item, index) => (
                            <div
                                key={index}
                                className="group relative bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-200"
                            >
                                <div className="flex items-start gap-4">
                                    <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-500 text-sm font-bold font-mono group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                        {index + 1}
                                    </span>
                                    <div className="flex-1 pt-1 font-medium font-mono text-lg text-slate-800 overflow-x-auto">
                                        {item}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 p-6 bg-blue-50 rounded-xl border border-blue-100 text-center">
                        <h3 className="text-blue-900 font-semibold mb-2">Sfaturi pentru rezolvare</h3>
                        <p className="text-blue-700 text-sm">
                            Pentru examenul de Bacalaureat, asigură-te că scrii toate condițiile de existență (la logaritmi, fracții, radicali) și verifici dacă soluțiile obținute aparțin domeniului de definiție.
                        </p>
                    </div>

                    <footer className="mt-12 text-center text-slate-400 text-sm">
                        <p>© 2024 Culegere Digitală pentru Bacalaureat</p>
                    </footer>
                </div>
            </main>
        </div>
    );
};

export default Homework1;
