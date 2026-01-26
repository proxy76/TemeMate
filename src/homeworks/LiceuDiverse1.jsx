import React, { useState } from 'react';
import { Book, Calculator, TrendingUp, Grid, Move, ArrowRight, Sigma, Menu, X, ChevronDown, ChevronUp } from 'lucide-react';

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
    const [activeProblem, setActiveProblem] = useState(null);

    const toggleProblem = (index) => {
        if (activeProblem === index) {
            setActiveProblem(null);
        } else {
            setActiveProblem(index);
        }
    };

    // Baza de date cu exerciții
    const exerciseData = {
        exponentiale: {
            title: "Ecuații Exponențiale",
            icon: <TrendingUp size={24} />,
            color: "bg-blue-100 text-blue-700",
            description: "Rezolvați următoarele ecuații în mulțimea numerelor reale:",
            items: [
                { problem: "2ˣ = 4", explanation: "Încearcă să scrii 4 ca o putere a lui 2." },
                { problem: "3ˣ = 27", explanation: "Gândește-te la puterile lui 3. Cât este 3 la puterea a 3-a?" },
                { problem: "5ˣ = 125", explanation: "Scrie 125 ca putere a lui 5." },
                { problem: "2ˣ⁺¹ = 16", explanation: "Scrie 16 ca putere a lui 2, apoi egalează exponenții." },
                { problem: "3²ˣ = 9", explanation: "Scrie 9 ca putere a lui 3, apoi egalează exponenții." },
                { problem: "7ˣ = 1", explanation: "Orice număr la ce putere dă 1?" },
                { problem: "2ˣ = 2³", explanation: "Bazele sunt deja egale. Ce poți spune despre exponenți?" },
                { problem: "5ˣ⁻¹ = 25", explanation: "Scrie 25 ca putere a lui 5." },
                { problem: "4ˣ = 64", explanation: "Scrie 64 ca putere a lui 4." },
                { problem: "3ˣ⁺² = 3⁵", explanation: "Bazele sunt egale. Egalează exponenții și află x." },
                { problem: "2ˣ = -2 (Discuție)", explanation: "Funcția exponențială poate avea valori negative?" },
                { problem: "10ˣ = 1000", explanation: "10 la ce putere dă 1000?" },
                { problem: "(1/2)ˣ = 4", explanation: "Scrie 4 ca putere a lui 2 și (1/2) ca 2 la puterea -1." },
                { problem: "3ˣ = 1/9", explanation: "Scrie 1/9 ca putere a lui 3 (cu exponent negativ)." },
                { problem: "2³ˣ⁻¹ = 32", explanation: "Scrie 32 ca putere a lui 2." },
                { problem: "5ˣ²⁻¹ = 1", explanation: "1 este 5 la puterea 0. Egalează exponentul cu 0." },
                { problem: "2ˣ + 2ˣ⁺¹ = 12", explanation: "Dă factor comun pe 2ˣ." },
                { problem: "3ˣ + 3ˣ⁺² = 90", explanation: "Dă factor comun pe 3ˣ." },
                { problem: "4ˣ - 2 = 14", explanation: "Mută -2 în partea dreaptă și rezolvă ecuația simplă." },
                { problem: "2ˣ ⋅ 2³ = 2⁷", explanation: "Folosește regula de înmulțire a puterilor cu aceeași bază (se adună exponenții)." }
            ]
        },
        logaritmi: {
            title: "Ecuații cu Logaritmi",
            icon: <Book size={24} />,
            color: "bg-green-100 text-green-700",
            description: "Determinați x ∈ (0, +∞) pentru următoarele ecuații:",
            items: [
                { problem: "log₂ x = 3", explanation: "Folosește definiția logaritmului: x = 2³." },
                { problem: "log₃ x = 2", explanation: "Folosește definiția: x = 3²." },
                { problem: "log₅ x = 1", explanation: "Folosește definiția: x = 5¹." },
                { problem: "ln x = 0", explanation: "ln este logaritm în baza e. e la ce putere dă 1?" },
                { problem: "log₂ (x + 1) = 1", explanation: "x + 1 = 2¹. Nu uita Condiția de Existență: x+1 > 0." },
                { problem: "log₃ (x - 2) = 2", explanation: "x - 2 = 3². CE: x-2 > 0." },
                { problem: "log₂ x = log₂ 5", explanation: "Dacă logaritmii au aceeași bază, argumentele sunt egale." },
                { problem: "log₅ (2x) = 2", explanation: "2x = 5². CE: 2x > 0." },
                { problem: "log₃ x = -1", explanation: "x = 3⁻¹." },
                { problem: "log₂ (x² - 1) = 3", explanation: "x² - 1 = 2³. Rezolvă ecuația de gradul 2. CE: x²-1 > 0." },
                { problem: "ln eˣ = 5", explanation: "ln(eˣ) este chiar x." },
                { problem: "log₂ x + log₂ 2 = 3", explanation: "Folosește formula sumei: log a + log b = log(ab)." },
                { problem: "log₃ x - log₃ 3 = 1", explanation: "Folosește formula diferenței sau scrie log₃ 3 ca 1." },
                { problem: "log₄ x = 1/2", explanation: "x = 4^(1/2), adică radical din 4." },
                { problem: "log₂ (x + 2) = log₂ 10", explanation: "Elimină logaritmii. CE: x+2 > 0." },
                { problem: "2 log₂ x = 4", explanation: "Împarte toată ecuația la 2 mai întâi." },
                { problem: "log₅ (x + 1) = 0", explanation: "x + 1 = 5⁰." },
                { problem: "log₃ (x + 4) = 2", explanation: "x + 4 = 3²." },
                { problem: "log₂ (3x - 1) = 3", explanation: "3x - 1 = 2³. CE: 3x-1 > 0." },
                { problem: "log₂ x = 4", explanation: "x = 2⁴." }
            ]
        },
        gradul2: {
            title: "Ecuații de Gradul 2",
            icon: <Calculator size={24} />,
            color: "bg-purple-100 text-purple-700",
            description: "Rezolvați în R ecuațiile (calculați Δ și rădăcinile):",
            items: [
                { problem: "x² - 4x + 3 = 0", explanation: "Calculați Δ = b² - 4ac. Aici a=1, b=-4, c=3." },
                { problem: "x² - 5x + 6 = 0", explanation: "Găsește două numere care adunate dau 5 și înmulțite dau 6." },
                { problem: "x² - 3x + 2 = 0", explanation: "Găsește două numere care adunate dau 3 și înmulțite dau 2." },
                { problem: "x² - 1 = 0", explanation: "Folosește formula diferenței de pătrate: a² - b² = (a-b)(a+b)." },
                { problem: "x² - 9 = 0", explanation: "x² = 9. Ce numere ridicate la pătrat dau 9?" },
                { problem: "x² + 4x + 4 = 0", explanation: "Recunoști formula de binom (a+b)²?" },
                { problem: "x² - 6x + 9 = 0", explanation: "Recunoști formula de binom (a-b)²?" },
                { problem: "x² + x - 2 = 0", explanation: "Calculează Δ. a=1, b=1, c=-2." },
                { problem: "x² - x - 2 = 0", explanation: "Calculează Δ. a=1, b=-1, c=-2." },
                { problem: "2x² - 8 = 0", explanation: "Împarte la 2 mai întâi: x² - 4 = 0." },
                { problem: "x² + 5x = 0", explanation: "Dă factor comun pe x." },
                { problem: "x² - 3x = 0", explanation: "Factor comun x: x(x-3) = 0." },
                { problem: "x² - 2x + 1 = 0", explanation: "Este binomul (x-1)²." },
                { problem: "x² + 2x - 3 = 0", explanation: "Calculează Δ." },
                { problem: "x² - 7x + 10 = 0", explanation: "Suma rădăcinilor e 7, produsul e 10." },
                { problem: "x² + x = 0", explanation: "Factor comun x." },
                { problem: "3x² - 12 = 0", explanation: "Simplifică prin 3." },
                { problem: "x² - 4x = 0", explanation: "Factor comun x." },
                { problem: "x² + 3x + 2 = 0", explanation: "Suma e -3, produsul e 2." },
                { problem: "x² - 16 = 0", explanation: "x² = 16." }
            ]
        },
        derivate: {
            title: "Derivate",
            icon: <TrendingUp size={24} />,
            color: "bg-red-100 text-red-700",
            description: "Calculați f'(x) pentru funcțiile date:",
            items: [
                { problem: "f(x) = x²", explanation: "Aplică formula (xⁿ)' = n·xⁿ⁻¹ pentru n=2." },
                { problem: "f(x) = x³", explanation: "Aplică formula (xⁿ)' = n·xⁿ⁻¹ pentru n=3." },
                { problem: "f(x) = 3x", explanation: "Constanta iese în față. (x)' = 1." },
                { problem: "f(x) = 5", explanation: "Derivata oricărei constante este 0." },
                { problem: "f(x) = x² + 2x", explanation: "Derivează fiecare termen separat." },
                { problem: "f(x) = x³ + 1", explanation: "Derivata sumei este suma derivatelor." },
                { problem: "f(x) = eˣ", explanation: "Derivata lui eˣ este chiar eˣ." },
                { problem: "f(x) = ln x", explanation: "Derivata lui ln x este 1/x." },
                { problem: "f(x) = sin x", explanation: "Derivata lui sin x este cos x." },
                { problem: "f(x) = cos x", explanation: "Derivata lui cos x este -sin x (atenție la minus)." },
                { problem: "f(x) = 2x + 1", explanation: "Derivează 2x și 1 separat." },
                { problem: "f(x) = x² - 4x + 3", explanation: "Derivează termen cu termen." },
                { problem: "f(x) = 1/x", explanation: "Poți scrie ca x⁻¹ și aplică formula puterii." },
                { problem: "f(x) = √x", explanation: "Formula este 1 / (2√x)." },
                { problem: "f(x) = x⁴ + x²", explanation: "Aplică formula (xⁿ)' pentru fiecare." },
                { problem: "f(x) = x ⋅ eˣ", explanation: "Folosește regula produsului: (f·g)' = f'·g + f·g'." },
                { problem: "f(x) = (x + 1)²", explanation: "Poți dezvolta paranteza sau folosi regula funcției compuse." },
                { problem: "f(x) = 3x⁵", explanation: "3 rămâne constantă în față." },
                { problem: "f(x) = x + ln x", explanation: "Derivează x și ln x separat." },
                { problem: "f(x) = x / 2", explanation: "Este la fel cu (1/2)·x." }
            ]
        },
        matrici: {
            title: "Matrici și Determinanți",
            icon: <Grid size={24} />,
            color: "bg-yellow-100 text-yellow-700",
            description: "Se dau matricile A și B. Calculați:",
            items: [
                { problem: "det(A) pentru A = [[1, 2], [3, 4]]", explanation: "Calculați produsul diagonalei principale minus produsul diagonalei secundare: 1·4 - 2·3." },
                { problem: "det(A) pentru A = [[2, 5], [1, 3]]", explanation: "2·3 - 5·1." },
                { problem: "A + B pentru A=[[1,0],[0,1]], B=[[2,1],[1,2]]", explanation: "Adună elementele corespunzătoare: a₁₁ + b₁₁, etc." },
                { problem: "2A pentru A = [[1, -1], [2, 0]]", explanation: "Înmulțește fiecare element al matricei cu 2." },
                { problem: "A² pentru A = [[1, 1], [0, 1]]", explanation: "Calculează A · A. Înmulțirea se face linie cu coloană." },
                { problem: "det(I₂)", explanation: "Determinantul matricei unitate este mereu 1." },
                { problem: "A - B pentru A=[[3,3],[3,3]], B=[[1,1],[1,1]]", explanation: "Scade elementele corespunzătoare." },
                { problem: "Tr(A) (urma) pentru A = [[2, 1], [4, 5]]", explanation: "Adună elementele de pe diagonala principală: 2 + 5." },
                { problem: "A ⋅ B pentru A=[[1,0],[0,1]], B=[[3,4],[5,6]]", explanation: "Înmulțirea cu matricea unitate nu schimbă matricea." },
                { problem: "det(A) pentru A = [[0, 0], [0, 0]]", explanation: "Dacă toate elementele sunt 0, determinantul este 0." },
                { problem: "Rezolvați det(A) = 0 unde A = [[x, 1], [2, 3]]", explanation: "Calculează determinantul: 3x - 2. Rezolvă ecuația 3x - 2 = 0." },
                { problem: "det(A) pentru A = [[1, 0, 0], [0, 1, 0], [0, 0, 1]]", explanation: "Este matricea unitate I₃. Determinantul este 1." },
                { problem: "Suma elementelor matricei A = [[1, 2], [3, 4]]", explanation: "Adună toate cele 4 numere." },
                { problem: "A + I₂ pentru A = [[2, 2], [2, 2]]", explanation: "Adaugă 1 doar la elementele de pe diagonala principală." },
                { problem: "x dacă [[x, 1], [2, 3]] = [[5, 1], [2, 3]]", explanation: "Două matrici sunt egale dacă toate elementele corespunzătoare sunt egale." },
                { problem: "det(A) pentru A = [[-1, 2], [3, -4]]", explanation: "(-1)·(-4) - 2·3." },
                { problem: "3A - 2A", explanation: "Este egal cu A." },
                { problem: "Produsul elementelor de pe diagonala principală A=[[2,1],[0,3]]", explanation: "Înmulțește 2 cu 3." },
                { problem: "A² pentru A = [[0, 1], [1, 0]]", explanation: "Verifică prin calcul. Rezultatul ar trebui să fie I₂." },
                { problem: "det(A) pentru A = [[x, 0], [0, 1]]", explanation: "x·1 - 0·0." }
            ]
        },
        vectori: {
            title: "Vectori",
            icon: <Move size={24} />,
            color: "bg-indigo-100 text-indigo-700",
            description: "Considerăm reperul cartezian xOy și vectorii:",
            items: [
                { problem: "Calculați lungimea vectorului v = 3i + 4j", explanation: "Folosește formula L = √(3² + 4²)." },
                { problem: "Calculați lungimea vectorului v = 6i + 8j", explanation: "Folosește formula L = √(6² + 8²). Similar cu numerele pitagorice (6,8,10)." },
                { problem: "Suma vectorilor v₁ = 2i + 3j și v₂ = i + j", explanation: "Adună componentele i între ele și j între ele: (2+1)i + (3+1)j." },
                { problem: "Suma vectorilor v₁ = i - j și v₂ = -i + j", explanation: "Rezultatul va fi vectorul nul." },
                { problem: "Aflați a real dacă v₁ = ai + 2j și v₂ = 4i + 2j sunt egali", explanation: "Doi vectori sunt egali dacă au componentele egale: a = 4." },
                { problem: "Calculați produsul scalar v₁ ⋅ v₂ pentru v₁=i, v₂=j", explanation: "Produsul scalar al vectorilor ortogonali (i ⊥ j) este 0." },
                { problem: "Lungimea vectorului v = 5i + 12j", explanation: "√(5² + 12²). Este triplet pitagoric." },
                { problem: "Coordonatele vectorului AB unde A(1,1), B(3,3)", explanation: "AB = (xB-xA)i + (yB-yA)j." },
                { problem: "Coordonatele vectorului AB unde A(0,0), B(4,2)", explanation: "AB = (4-0)i + (2-0)j." },
                { problem: "Mijlocul segmentului AB pentru A(2,4), B(4,2)", explanation: "xM = (xA+xB)/2, yM = (yA+yB)/2." },
                { problem: "Distanța dintre punctele A(1,2) și B(1,5)", explanation: "Punctele au același x. Distanța este diferența y-urilor: |5-2|." },
                { problem: "v₁ = 2i + 3j. Calculați 2v₁", explanation: "Înmulțește ambele componente cu 2." },
                { problem: "Condiția de coliniaritate pt v₁ = 2i + j și v₂ = 4i + aj", explanation: "Componentele trebuie să fie proporționale: 2/4 = 1/a." },
                { problem: "Lungimea vectorului v = -3i + 4j", explanation: "√((-3)² + 4²)." },
                { problem: "v = i + j. Calculați modulul |v|", explanation: "√(1² + 1²)." },
                { problem: "Punctul M(x, y) este mijlocul lui A(0,0), B(2,2). Aflați M.", explanation: "xM = (0+2)/2, yM = (0+2)/2." },
                { problem: "Dacă A(2,3) și B(2,3), vectorul AB este nul?", explanation: "Da, dacă punctele coincid, lungimea este 0." },
                { problem: "v₁ = i + j, v₂ = i - j. Calculați v₁ + v₂", explanation: "Componentele j se reduc." },
                { problem: "Calculați 3i + 2j - (i + j)", explanation: "Scade componentele pe rând: (3-1)i + (2-1)j." },
                { problem: "Modulul vectorului v = 1i + 1j", explanation: "√(1 + 1)." }
            ]
        },
        limite: {
            title: "Limite de funcții",
            icon: <Sigma size={24} />,
            color: "bg-orange-100 text-orange-700",
            description: "Calculați următoarele limite:",
            items: [
                { problem: <Limit key="1" to="x→∞" func="x" />, explanation: "Când x crește, x tinde la +∞." },
                { problem: <Limit key="2" to="x→∞" func="1/x" />, explanation: "1 împărțit la ceva infinit este 0." },
                { problem: <Limit key="3" to="x→∞" func="x² + x" />, explanation: "Infinit plus infinit este tot infinit." },
                { problem: <Limit key="4" to="x→1" func="x + 2" />, explanation: "Înlocuiește x cu 1." },
                { problem: <Limit key="5" to="x→2" func="x² - 1" />, explanation: "Înlocuiește x cu 2. 2² - 1 = 3." },
                { problem: <Limit key="6" to="x→∞" func="(2x + 1) / (x + 1)" />, explanation: "Gradul numărătorului egal cu gradul numitorului. Rezultatul e raportul coeficienților dominanți (2/1)." },
                { problem: <Limit key="7" to="x→∞" func="(x² + 1) / (2x² - x)" />, explanation: "Raportul coeficienților lui x²: 1/2." },
                { problem: <Limit key="8" to="x→0" func="sin(x)/x" />, explanation: "Limita fundamentală: face 1." },
                { problem: <Limit key="9" to="x→∞" func="(1 + 1/x)ˣ" />, explanation: "Definiția numărului e." },
                { problem: <Limit key="10" to="x→∞" func="3ˣ" />, explanation: "Baza 3 > 1, deci tinde la +∞." },
                { problem: <Limit key="11" to="x→-∞" func="3ˣ" />, explanation: "Baza > 1 la -∞ tinde la 0." },
                { problem: <Limit key="12" to="x→∞" func="(5x² + 1) / (x² + 3)" />, explanation: "Raportul coeficienților termenilor de grad maxim: 5/1." },
                { problem: <Limit key="13" to="x→1" func="(x - 1) / (x² - 1)" />, explanation: "Caz 0/0. Descompune (x²-1) în (x-1)(x+1) și simplifică." },
                { problem: <Limit key="14" to="x→0" func="(eˣ - 1) / x" />, explanation: "Limită fundamentală: face 1." },
                { problem: <Limit key="15" to="x→∞" func="(x + 1) / x²" />, explanation: "Gradul numitorului e mai mare. Limita e 0." },
                { problem: <Limit key="16" to="x→2" func="(x² - 4) / (x - 2)" />, explanation: "Descompune x²-4 și simplifică." },
                { problem: <Limit key="17" to="x→∞" func="ln x" />, explanation: "Logaritmul tinde la ∞ (dar mai lent)." },
                { problem: <Limit key="18" to="x→0" func="x²" />, explanation: "Înlocuiește x cu 0." },
                { problem: <Limit key="19" to="x→∞" func="5" />, explanation: "Limita unei constante e constanta însăși." },
                { problem: <Limit key="20" to="x→∞" func="(3x³ + x) / (x³ + 2)" />, explanation: "Raportul coeficienților lui x³: 3/1." }
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
                                setActiveProblem(null);
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
                        {exerciseData[activeCategory].items.map((item, index) => {
                            const isString = typeof item === 'string';
                            const problemText = isString ? item : item.problem;
                            const explanation = isString ? null : item.explanation;
                            const isOpen = activeProblem === index;

                            return (
                                <div
                                    key={index}
                                    onClick={() => toggleProblem(index)}
                                    className={`group relative bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer ${isOpen ? 'ring-2 ring-blue-100 border-blue-300' : 'hover:border-blue-300'}`}
                                >
                                    <div className="flex items-start gap-4">
                                        <span className={`flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold font-mono transition-colors ${isOpen ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-blue-600 group-hover:text-white'}`}>
                                            {index + 1}
                                        </span>
                                        <div className="flex-1 pt-1 font-medium font-mono text-lg text-slate-800 overflow-x-auto">
                                            {problemText}
                                        </div>
                                        {!isString && (
                                            <div className="text-slate-400">
                                                {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                            </div>
                                        )}
                                    </div>

                                    {isOpen && explanation && (
                                        <div className="mt-4 pl-12 pt-4 border-t border-slate-100 text-slate-600 animate-in fade-in slide-in-from-top-2 duration-200">
                                            <div className="flex items-start gap-2">
                                                <div className="bg-yellow-100 text-yellow-800 text-xs font-bold px-2 py-1 rounded uppercase tracking-wide mt-1">
                                                    Indiciu
                                                </div>
                                                <div className="flex-1 text-sm leading-relaxed font-sans">
                                                    {explanation}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
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
