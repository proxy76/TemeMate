import React, { useState } from 'react';
import { BookOpen, Calculator, FunctionSquare, Binary, PenTool, Triangle, Lightbulb, CheckCircle, List } from 'lucide-react';

// --- DATA GENERATORS (NIVEL BAC M2) ---

const problemsData = {
    subiectul1: [
        {
            id: 1,
            q: "Arătați că (√8 + 1) · (2√2 - 1) - √36 = 1.",
            hint: "√8 se scrie ca 2√2. Avem (2√2 + 1)(2√2 - 1), care este formula (a+b)(a-b) = a² - b².",
            ans: "(2√2)² - 1² - 6 = 8 - 1 - 6 = 1."
        },
        {
            id: 2,
            q: "Calculați media aritmetică a numerelor a = 2(√3 + 1) și b = 4 - 2√3.",
            hint: "Media aritmetică = (a + b) / 2. Desfaceți paranteza la a.",
            ans: "a = 2√3 + 2. Suma a + b = 2√3 + 2 + 4 - 2√3 = 6. Ma = 6 / 2 = 3."
        },
        {
            id: 3,
            q: "Arătați că numărul a = (√5 + 2)² - 4√5 este natural.",
            hint: "Ridicați la pătrat: (a+b)² = a² + 2ab + b².",
            ans: "a = (5 + 4√5 + 4) - 4√5 = 9 + 4√5 - 4√5 = 9 (număr natural)."
        },
        {
            id: 4,
            q: "Calculați √12 + √27 - √75.",
            hint: "Scoateți factorii de sub radical: √12=2√3, √27=3√3, √75=5√3.",
            ans: "2√3 + 3√3 - 5√3 = 0."
        },
        {
            id: 5,
            q: "Arătați că (1/2)⁻¹ + √49 = 9.",
            hint: "(a/b)⁻ⁿ = (b/a)ⁿ. √49 = 7.",
            ans: "2¹ + 7 = 2 + 7 = 9."
        },
        {
            id: 6,
            q: "Comparați numerele a = √26 și b = 5.",
            hint: "Introduceți 5 sub radical sau ridicați ambele numere la pătrat.",
            ans: "a² = 26, b² = 25. Deoarece 26 > 25, rezultă a > b."
        },
        {
            id: 7,
            q: "Calculați modulul numărului a = 2 - √5.",
            hint: "|x| = x dacă x>0, sau -x dacă x<0. Verificați dacă 2 < √5.",
            ans: "Deoarece √4 < √5, rezultă 2 < √5, deci a este negativ. |a| = -(2-√5) = √5 - 2."
        },
        {
            id: 8,
            q: "Calculați [√10], unde [x] reprezintă partea întreagă a lui x.",
            hint: "Găsiți pătratele perfecte vecine: 3²=9, 4²=16.",
            ans: "3 < √10 < 4, deci partea întreagă este 3."
        },
        {
            id: 9,
            q: "Arătați că (√3 - 1)(√3 + 1) - (√2)² = 0.",
            hint: "Formula diferenței de pătrate și definiția radicalului.",
            ans: "(3 - 1) - 2 = 2 - 2 = 0."
        },
        {
            id: 10,
            q: "Determinați x real știind că √x = 4.",
            hint: "Ridicați la pătrat.",
            ans: "x = 4² = 16."
        }
    ],
    subiectul2: [
        {
            id: 1,
            q: "Fie f(x) = 2x - 4. Determinați coordonatele punctului de intersecție cu axa Ox.",
            hint: "Intersecția cu Ox înseamnă f(x) = 0.",
            ans: "2x - 4 = 0 => 2x = 4 => x = 2. Punctul este A(2, 0)."
        },
        {
            id: 2,
            q: "Fie f(x) = x² - 2x. Calculați f(0) · f(1) · ... · f(2024).",
            hint: "Calculați primii termeni. Dacă unul este 0, produsul este 0.",
            ans: "f(2) = 2² - 2*2 = 4 - 4 = 0. Produsul conține factorul 0, deci rezultatul este 0."
        },
        {
            id: 3,
            q: "Determinați coordonatele vârfului parabolei pentru f(x) = x² - 4x + 3.",
            hint: "V(xv, yv). xv = -b/2a, yv = -Δ/4a.",
            ans: "xv = 4/2 = 2. yv = f(2) = 4 - 8 + 3 = -1. V(2, -1)."
        },
        {
            id: 4,
            q: "Fie f(x) = 2x + a. Determinați a știind că A(1, 3) aparține graficului.",
            hint: "A(x, y) ∈ Gf <=> f(x) = y.",
            ans: "f(1) = 3 => 2(1) + a = 3 => 2 + a = 3 => a = 1."
        },
        {
            id: 5,
            q: "Rezolvați ecuația (f ∘ f)(x) = 1, unde f(x) = x - 2.",
            hint: "(f ∘ f)(x) înseamnă f(f(x)).",
            ans: "f(f(x)) = f(x-2) = (x-2) - 2 = x - 4. x - 4 = 1 => x = 5."
        },
        {
            id: 6,
            q: "Determinați punctul de intersecție al graficelor f(x) = x + 1 și g(x) = 2x - 1.",
            hint: "Egalați f(x) = g(x).",
            ans: "x + 1 = 2x - 1 => -x = -2 => x = 2. y = f(2) = 3. Punctul A(2, 3)."
        },
        {
            id: 7,
            q: "Fie f(x) = x + 2. Calculați suma S = f(1) + f(2) + ... + f(10).",
            hint: "Este suma unei progresii aritmetice.",
            ans: "S = (1+2) + (2+2) + ... + (10+2). Suma lui Gauss 1..10 este 55. Adunăm de 10 ori 2. S = 55 + 20 = 75."
        },
        {
            id: 8,
            q: "Determinați m știind că graficul funcției f(x) = mx + 2 trece prin A(2, 6).",
            hint: "f(2) = 6.",
            ans: "2m + 2 = 6 => 2m = 4 => m = 2."
        },
        {
            id: 9,
            q: "Aflați valoarea minimă a funcției f(x) = x² - 6x + 5.",
            hint: "Minimul funcției de gradul 2 este yv = -Δ/4a.",
            ans: "yv = f(xv) = f(3) = 9 - 18 + 5 = -4."
        },
        {
            id: 10,
            q: "Rezolvați inecuația f(x) ≤ 0 pentru f(x) = x² - 9.",
            hint: "Aflați rădăcinile, apoi tabelul de semn (între rădăcini semn contrar lui a).",
            ans: "x² - 9 = 0 => x = ±3. Între -3 și 3 funcția e negativă. x ∈ [-3, 3]."
        }
    ],
    subiectul3: [
        {
            id: 1,
            q: "Rezolvați în R ecuația: √(x² + 3) = 2.",
            hint: "Ridicați la pătrat. Verificați soluțiile!",
            ans: "x² + 3 = 4 => x² = 1 => x = ±1."
        },
        {
            id: 2,
            q: "Rezolvați în R ecuația: √(2x - 1) = 3.",
            hint: "Condiție 2x-1 ≥ 0. Ridicați la pătrat.",
            ans: "2x - 1 = 9 => 2x = 10 => x = 5."
        },
        {
            id: 3,
            q: "Rezolvați în R ecuația: √(x + 4) = x + 2.",
            hint: "Ridicare la pătrat: x+4 = (x+2)². Atenție la verificarea soluțiilor.",
            ans: "x + 4 = x² + 4x + 4 => x² + 3x = 0. x(x+3)=0. x=0 (convine), x=-3 (nu convine, radical negativ)."
        },
        {
            id: 4,
            q: "Rezolvați ecuația: ∛(x³ + 7) = 2.",
            hint: "Ridicați la puterea a 3-a.",
            ans: "x³ + 7 = 8 => x³ = 1 => x = 1."
        },
        {
            id: 5,
            q: "Rezolvați ecuația: √(x² - 4x + 4) = 1.",
            hint: "Sub radical este (x-2)².",
            ans: "|x - 2| = 1 => x-2=1 sau x-2=-1. x=3 sau x=1."
        },
        {
            id: 6,
            q: "Rezolvați ecuația: √(5 - x) = 1.",
            hint: "Ridicați la pătrat.",
            ans: "5 - x = 1 => x = 4."
        },
        {
            id: 7,
            q: "Rezolvați în mulțimea numerelor reale: 3 · √(x) + 1 = 7.",
            hint: "Izolați radicalul.",
            ans: "3√x = 6 => √x = 2 => x = 4."
        },
        {
            id: 8,
            q: "Rezolvați ecuația: √(2x + 3) = √x.",
            hint: "Egalați cantitățile de sub radical. Condiție x ≥ 0.",
            ans: "2x + 3 = x => x = -3. Dar x trebuie să fie ≥0 (pentru √x). Deci nu are soluții reale."
        },
        {
            id: 9,
            q: "Rezolvați ecuația: √(x + 1) = 2.",
            hint: "Simplu: ridicare la pătrat.",
            ans: "x + 1 = 4 => x = 3."
        },
        {
            id: 10,
            q: "Rezolvați ecuația: √(x² + 1) = 1.",
            hint: "x² + 1 = 1.",
            ans: "x² = 0 => x = 0."
        }
    ],
    subiectul4: [
        {
            id: 1,
            q: "Calculați probabilitatea ca alegând un număr din A={1, 2, ..., 10}, acesta să fie prim.",
            hint: "Numerele prime din mulțime sunt 2, 3, 5, 7.",
            ans: "4 numere favorabile. 10 posibile. P = 4/10 = 2/5."
        },
        {
            id: 2,
            q: "Determinați probabilitatea ca un număr n din {1, 2, 3, 4} să verifice n² > 5.",
            hint: "Verificați pătratele: 1, 4, 9, 16.",
            ans: "3²=9 și 4²=16 verifică. 2 cazuri favorabile. P = 2/4 = 1/2."
        },
        {
            id: 3,
            q: "Într-o urnă sunt 5 bile albe și 3 negre. Care e probabilitatea de a extrage o bilă neagră?",
            hint: "Total bile = 8.",
            ans: "3 favorabile / 8 posibile. P = 3/8."
        },
        {
            id: 4,
            q: "Calculați probabilitatea ca alegând un număr de două cifre, acesta să fie multiplu de 10.",
            hint: "Numerele sunt 10, 20, ..., 90. Total numere de 2 cifre sunt 90.",
            ans: "Sunt 9 numere favorabile. P = 9/90 = 1/10."
        },
        {
            id: 5,
            q: "Determinați probabilitatea ca un element din A={0, 1, 2, 3, 4} să fie număr impar.",
            hint: "Numerele impare sunt 1, 3.",
            ans: "2 favorabile din 5 posibile. P = 2/5."
        },
        {
            id: 6,
            q: "Care este probabilitatea ca aruncând un zar să obținem un număr mai mic sau egal cu 4?",
            hint: "Fețele sunt 1, 2, 3, 4, 5, 6.",
            ans: "Favorabile: 1, 2, 3, 4. P = 4/6 = 2/3."
        },
        {
            id: 7,
            q: "Calculați C₄² (Combinări de 4 luate câte 2).",
            hint: "n! / (k!(n-k)!).",
            ans: "4! / (2! · 2!) = 24 / 4 = 6."
        },
        {
            id: 8,
            q: "Câte numere de 3 cifre distincte se pot forma cu cifrele {1, 2, 3}?",
            hint: "Permutări de 3.",
            ans: "P₃ = 3! = 6."
        },
        {
            id: 9,
            q: "Calculați probabilitatea ca alegând un număr din {10, 20, 30}, acesta să fie divizibil cu 3.",
            hint: "Suma cifrelor trebuie să fie divizibilă cu 3.",
            ans: "Doar 30 este divizibil. 1 caz favorabil din 3. P = 1/3."
        },
        {
            id: 10,
            q: "Un produs costă 100 lei. Se scumpește cu 20%. Cât costă?",
            hint: "100 + 20% din 100.",
            ans: "100 + 20 = 120 lei."
        }
    ],
    subiectul5: [
        {
            id: 1,
            q: "Determinați distanța dintre punctele A(2, 3) și B(5, 7).",
            hint: "AB = √((x₂-x₁)² + (y₂-y₁)²).",
            ans: "AB = √(3² + 4²) = √25 = 5."
        },
        {
            id: 2,
            q: "Calculați coordonatele mijlocului segmentului AB, unde A(2, -4) și B(4, 8).",
            hint: "Media aritmetică a coordonatelor.",
            ans: "xm = (2+4)/2 = 3. ym = (-4+8)/2 = 2. M(3, 2)."
        },
        {
            id: 3,
            q: "Determinați a știind că distanța de la O(0,0) la A(3, a) este 5.",
            hint: "OA = √(3² + a²) = 5.",
            ans: "9 + a² = 25 => a² = 16 => a = ±4."
        },
        {
            id: 4,
            q: "Fie A(1, 2) și B(3, 2). Calculați distanța AB.",
            hint: "Segment orizontal, diferența absciselor.",
            ans: "|3 - 1| = 2."
        },
        {
            id: 5,
            q: "Determinați ecuația dreptei ce trece prin O(0,0) și A(2, 4).",
            hint: "y = mx (trece prin origine). m = y/x.",
            ans: "m = 4/2 = 2. Ecuația: y = 2x."
        },
        {
            id: 6,
            q: "Calculați perimetrul triunghiului ABC cu A(1,1), B(4,1), C(1,5).",
            hint: "Calculați laturile. Observați că e triunghi dreptunghic (AB orizontală, AC verticală).",
            ans: "AB = 3, AC = 4. Ipotenuza BC = √(3²+4²) = 5. P = 3+4+5 = 12."
        },
        {
            id: 7,
            q: "Determinați a știind că mijlocul segmentului AB este M(2, 3), unde A(1, 1) și B(3, a).",
            hint: "yM = (yA + yB) / 2.",
            ans: "3 = (1 + a) / 2 => 6 = 1 + a => a = 5."
        },
        {
            id: 8,
            q: "Punctele A(2,3) și B(2,7) determină o dreaptă. Este aceasta verticală?",
            hint: "Dacă x este constant, dreapta e verticală.",
            ans: "Da, x=2."
        },
        {
            id: 9,
            q: "Calculați lungimea segmentului OM, unde M este mijlocul lui AB cu A(2,0) și B(0,2).",
            hint: "Aflați M, apoi distanța OM.",
            ans: "M(1, 1). OM = √(1² + 1²) = √2."
        },
        {
            id: 10,
            q: "Verificați dacă punctele A(1,1), B(2,2), C(3,3) sunt coliniare.",
            hint: "Verificați dacă pantele AB și BC sunt egale sau determinant.",
            ans: "m_AB = 1, m_BC = 1. Da, sunt coliniare."
        }
    ],
    subiectul6: [
        {
            id: 1,
            q: "Calculați sin 30° + cos 60°.",
            hint: "sin 30° = 1/2, cos 60° = 1/2.",
            ans: "1/2 + 1/2 = 1."
        },
        {
            id: 2,
            q: "Calculați sin 45° · cos 45°.",
            hint: "Ambele sunt √2/2.",
            ans: "(√2/2) · (√2/2) = 2/4 = 1/2."
        },
        {
            id: 3,
            q: "În triunghiul ABC, m(A)=90°, m(B)=30°, AC=5. Calculați BC.",
            hint: "sin B = AC / BC.",
            ans: "sin 30° = 5 / BC => 1/2 = 5 / BC => BC = 10."
        },
        {
            id: 4,
            q: "Calculați aria triunghiului ABC dacă AB=4, AC=6 și m(A)=30°.",
            hint: "Aria = (AB · AC · sin A) / 2.",
            ans: "(4 · 6 · 1/2) / 2 = 12 / 2 = 6."
        },
        {
            id: 5,
            q: "Calculați tg² 60° - 3.",
            hint: "tg 60° = √3.",
            ans: "(√3)² - 3 = 3 - 3 = 0."
        },
        {
            id: 6,
            q: "Determinați sin² 150° + cos² 150°.",
            hint: "Formula fundamentală sin²x + cos²x = 1.",
            ans: "1."
        },
        {
            id: 7,
            q: "Dacă sin x = 1/3, calculați cos x știind că x ∈ (0, 90°).",
            hint: "cos x = √(1 - sin²x).",
            ans: "cos x = √(1 - 1/9) = √(8/9) = 2√2 / 3."
        },
        {
            id: 8,
            q: "Calculați sin 60° - 2·cos 30°.",
            hint: "sin 60° = √3/2, cos 30° = √3/2.",
            ans: "√3/2 - 2(√3/2) = √3/2 - √3 = -√3/2."
        },
        {
            id: 9,
            q: "În triunghiul dreptunghic ABC cu A=90°, AB=3, AC=3, calculați măsura unghiului B.",
            hint: "Triunghiul este dreptunghic isoscel.",
            ans: "45°."
        },
        {
            id: 10,
            q: "Calculați perimetrul triunghiului ABC echilateral știind că înălțimea este h=√3.",
            hint: "h = l√3 / 2. Aflați latura l.",
            ans: "√3 = l√3 / 2 => l = 2. Perimetrul = 3 · 2 = 6."
        }
    ]
};

// --- COMPONENTS ---

const Navigation = ({ activeTab, setActiveTab }) => {
    const categories = [
        { id: 'subiectul1', label: '1. Radicali', icon: Binary },
        { id: 'subiectul2', label: '2. Funcții', icon: FunctionSquare },
        { id: 'subiectul3', label: '3. Ecuații', icon: Calculator },
        { id: 'subiectul4', label: '4. Probabilități', icon: BookOpen },
        { id: 'subiectul5', label: '5. Geometrie', icon: PenTool },
        { id: 'subiectul6', label: '6. Trigonometrie', icon: Triangle },
    ];

    return (
        <div className="sticky top-0 bg-gray-100 z-10 pt-3 pb-3 shadow-sm -mx-2 md:-mx-8 px-2 md:px-8">
            {/* Scrollbar-ul este acum vizibil (implicit) */}
            <div className="flex overflow-x-auto gap-3 justify-start items-center px-1 py-1 w-full pb-2">
                {categories.map((cat) => {
                    const Icon = cat.icon;
                    const isActive = activeTab === cat.id;
                    return (
                        <button
                            key={cat.id}
                            onClick={() => setActiveTab(cat.id)}
                            className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all duration-200 whitespace-nowrap border text-sm md:text-base ${isActive
                                    ? 'bg-blue-600 text-white border-blue-700 shadow-md ring-2 ring-blue-200 ring-opacity-50'
                                    : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-blue-300'
                                }`}
                        >
                            <Icon size={18} className={`${isActive ? 'text-blue-100' : 'text-gray-500'}`} />
                            <span>{cat.label}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

const ProblemItem = ({ problem }) => {
    const [showHint, setShowHint] = useState(false);
    const [showAnswer, setShowAnswer] = useState(false);

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-4 md:mb-6 transition-all hover:shadow-md">
            {/* Question Header */}
            <div className="p-4 md:p-6 border-b border-gray-100">
                <div className="flex justify-between items-start gap-4">
                    <h3 className="text-base md:text-lg font-medium text-gray-800 leading-relaxed font-serif">
                        <span className="font-bold text-blue-600 mr-2">{problem.id}.</span>
                        {problem.q}
                    </h3>
                </div>
            </div>

            {/* Action Bar */}
            <div className="bg-gray-50 px-4 py-3 md:px-6 flex gap-4">
                <button
                    onClick={() => setShowHint(!showHint)}
                    className="text-xs md:text-sm font-semibold text-amber-600 hover:text-amber-800 flex items-center gap-1 transition-colors"
                >
                    <Lightbulb size={16} />
                    {showHint ? 'Ascunde Indiciu' : 'Indiciu'}
                </button>

                <button
                    onClick={() => setShowAnswer(!showAnswer)}
                    className="text-xs md:text-sm font-semibold text-green-600 hover:text-green-800 flex items-center gap-1 transition-colors"
                >
                    <CheckCircle size={16} />
                    {showAnswer ? 'Ascunde Răspuns' : 'Răspuns'}
                </button>
            </div>

            {/* Dropdown Content */}
            {(showHint || showAnswer) && (
                <div className="px-4 py-3 md:px-6 md:py-4 bg-gray-50/50 space-y-3 border-t border-gray-100">
                    {showHint && (
                        <div className="flex gap-3 text-sm text-amber-800 bg-amber-50 p-3 rounded-lg border border-amber-100">
                            <Lightbulb size={16} className="mt-0.5 flex-shrink-0" />
                            <p><em>Indiciu:</em> {problem.hint}</p>
                        </div>
                    )}

                    {showAnswer && (
                        <div className="flex gap-3 text-sm text-green-800 bg-green-50 p-3 rounded-lg border border-green-100">
                            <CheckCircle size={16} className="mt-0.5 flex-shrink-0" />
                            <p><strong>Rezolvare:</strong> {problem.ans}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

// --- MAIN APP COMPONENT ---

export default function BacApp() {
    const [activeTab, setActiveTab] = useState('subiectul1');
    const currentProblems = problemsData[activeTab];

    return (
        <div className="min-h-screen bg-gray-100 font-sans text-gray-900">
            <div className="max-w-4xl mx-auto p-2 md:p-8">
                {/* Header */}
                <div className="text-center mb-6 md:mb-8 pt-4">
                    <h1 className="text-2xl md:text-4xl font-extrabold text-blue-900 tracking-tight mb-2">
                        Bacalaureat Matematică M2
                    </h1>
                    <p className="text-sm md:text-lg text-gray-600 flex items-center justify-center gap-2">
                        <List size={20} className="hidden md:inline" />
                        Lista completă de exerciții pe capitole
                    </p>
                </div>

                {/* Navigation */}
                <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

                {/* Problem List */}
                <div className="space-y-4 mt-6 animate-in fade-in duration-500 px-2 md:px-0">
                    <div className="flex items-center justify-between mb-2 md:mb-4">
                        <h2 className="text-lg md:text-xl font-bold text-gray-700 capitalize">
                            {activeTab.replace('subiectul', 'Subiectul ')}
                        </h2>
                        <span className="text-xs md:text-sm text-gray-500 bg-gray-200 px-2 py-1 md:px-3 rounded-full">
                            {currentProblems.length} probleme
                        </span>
                    </div>

                    {currentProblems.map((problem) => (
                        <ProblemItem key={problem.id} problem={problem} />
                    ))}
                </div>

                {/* Footer */}
                <div className="mt-12 text-center text-xs md:text-sm text-gray-500 pb-8 px-4">
                    <p>Exerciții conforme cu programa de Bacalaureat M2 (Științe ale Naturii / Tehnologic).</p>
                </div>
            </div>
        </div>
    );
}