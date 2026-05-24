import React, { useState } from 'react';
import { BookOpen, Calculator, Lightbulb, LightbulbOff, Info } from 'lucide-react';

// --- Helper Components for Math Rendering ---
const Frac = ({ n, d }) => (
    <span className="inline-flex flex-col items-center justify-center align-middle mx-1 text-base font-serif">
        <span className="border-b border-gray-800 px-1 pb-[1px] leading-none">{n}</span>
        <span className="px-1 pt-[1px] leading-none">{d}</span>
    </span>
);

const Sup = ({ base, exp }) => (
    <span className="font-serif">
        {base}<sup>{exp}</sup>
    </span>
);

const Root = ({ val, deg }) => (
    <span className="font-serif whitespace-nowrap">
        {deg && <sup className="text-[0.6em] relative top-[-0.5em] right-[-0.2em]">{deg}</sup>}
        &radic;<span className="border-t border-gray-800">{val}</span>
    </span>
);

const MathTxt = ({ children }) => (
    <span className="font-serif tracking-wide text-lg">{children}</span>
);

// --- Data ---
const EXERCISES = [
    // Ecuații și Proporții
    { id: 1, category: "Ecuații și Proporții", content: <MathTxt>2x + 1 = 5</MathTxt>, hint: "Mută +1 în dreapta cu semn schimbat (-1), apoi împarte totul la coeficientul lui x (care este 2)." },
    { id: 2, category: "Ecuații și Proporții", content: <MathTxt>3x - 4 = 11</MathTxt>, hint: "Mută -4 în dreapta (devine +4), apoi împarte la 3." },
    { id: 3, category: "Ecuații și Proporții", content: <MathTxt><Frac n="a" d="2" /> &middot; <Frac n="4" d="5" /> = ? (Știind că 5a = 8)</MathTxt>, hint: "Înmulțește fracțiile: (a*4)/(2*5). Simplifică și folosește relația dată." },
    { id: 4, category: "Ecuații și Proporții", content: <MathTxt><Frac n="4 + x" d="3" /> = <Frac n="5" d="2" /></MathTxt>, hint: "Folosește produsul pe diagonală (mezii cu extremii): 2 * (4 + x) = 3 * 5." },
    { id: 5, category: "Ecuații și Proporții", content: <MathTxt><Frac n="1" d="7" /> = <Frac n="5" d="x" /></MathTxt>, hint: "Produsul pe diagonală: 1 * x = 7 * 5." },
    { id: 6, category: "Ecuații și Proporții", content: <MathTxt><Frac n="4" d="7" /> = <Frac n="21" d="x" /></MathTxt>, hint: "Înmulțire în cruce: 4 * x = 7 * 21. Apoi împarte la 4." },
    { id: 7, category: "Ecuații și Proporții", content: <MathTxt><Frac n="x" d="20" /> = <Frac n="1" d="5" /></MathTxt>, hint: "Amplifică a doua fracție ca să aibă numitorul 20, sau înmulțește pe diagonală." },
    { id: 8, category: "Ecuații și Proporții", content: <MathTxt>Dacă 4 pixuri costă 21 lei, cât costă 7 pixuri?</MathTxt>, hint: "Scrie o proporție: 4 / 7 = 21 / x, unde x este prețul căutat." },

    // Fracții
    { id: 9, category: "Fracții", content: <MathTxt><Frac n="2" d="3" /> + <Frac n="4" d="5" /> = ?</MathTxt>, hint: "Numitorul comun pentru 3 și 5 este 15. Amplifică prima fracție cu 5 și a doua cu 3." },
    { id: 10, category: "Fracții", content: <MathTxt><Frac n="3" d="2" /> + <Frac n="2" d="3" /> = ?</MathTxt>, hint: "Găsește numitorul comun (6). Amplifică fracțiile corespunzător." },
    { id: 11, category: "Fracții", content: <MathTxt><Frac n="8" d="4" /> - <Frac n="5" d="7" /> - <Frac n="7" d="8" /> = ?</MathTxt>, hint: "Numitorul comun este 56 (sau simplifică 8/4 prima dată la 2/1 și apoi găsește numitorul comun pentru 1, 7, 8 care este 56)." },
    { id: 12, category: "Fracții", content: <MathTxt>Simplifică: <Frac n="4" d="20" /></MathTxt>, hint: "Găsește cel mai mare divizor comun pentru 4 și 20 (care este 4) și împarte ambii termeni la el." },
    { id: 13, category: "Fracții", content: <MathTxt><Frac n="15" d="4" /> &middot; <Frac n="8" d="25" /> : <Frac n="3" d="5" /> = ?</MathTxt>, hint: "Transformă împărțirea în înmulțire răsturnând ultima fracție, apoi simplifică pe diagonală unde e posibil." },
    { id: 14, category: "Fracții", content: <MathTxt>(<Frac n="3" d="1" /> : 2) + (<Frac n="2" d="4" /> : 3) = ?</MathTxt>, hint: "O împărțire a unei fracții la un număr este înmulțirea cu inversul acelui număr (ex: : 2 devine * 1/2)." },
    { id: 15, category: "Fracții", content: <MathTxt>3 &middot; (<Frac n="2" d="2" /> + <Frac n="1" d="2" />) - <Frac n="1" d="2" /> = ?</MathTxt>, hint: "Rezolvă întâi paranteza (unde ai deja același numitor!), apoi înmulțirea." },
    { id: 16, category: "Fracții", content: <MathTxt>4 &middot; (<Frac n="5" d={<>1 - <Frac n="4" d="5" /></>} />) + <Frac n="1" d="5" /> = ?</MathTxt>, hint: "Calculează numitorul fracției mari: 1 - 4/5 (amplifică 1 cu 5). Apoi rezolvă linia de fracție principală ca o împărțire." },

    // Radicali
    { id: 17, category: "Radicali", content: <MathTxt>2<Root val="3" /> + 4<Root val="3" /> = ?</MathTxt>, hint: "Radicalii sunt la fel (ambii sunt √3). Pur și simplu adună coeficienții din față." },
    { id: 18, category: "Radicali", content: <MathTxt>Extrage factorii: <Root val="27" /></MathTxt>, hint: "Descompune 27 în factori primi. 27 = 9 * 3 = 3^2 * 3. Ce iese de sub radical?" },
    { id: 19, category: "Radicali", content: <MathTxt>3(2 - <Root val="20" />) + <Root val="180" /> = ?</MathTxt>, hint: "Extrage factorii din √20 (4*5) și √180 (36*5). Apoi înmulțește pe 3 cu fiecare termen din paranteză." },
    { id: 20, category: "Radicali", content: <MathTxt><Root val="11" />(<Root val="11" /> + 1) - (<Root val="11" /> + 3) = ?</MathTxt>, hint: "Înmulțește √11 cu fiecare termen din prima paranteză. Fii atent că minusul din fața celei de-a doua paranteze schimbă semnele!" },
    { id: 21, category: "Radicali", content: <MathTxt>2<Root val="12" /> + 3<Root val="27" /> - <Root val="75" /> = ?</MathTxt>, hint: "Descompune 12 (4*3), 27 (9*3) și 75 (25*3). Scoate factorii și apoi calculează." },
    { id: 22, category: "Radicali", content: <MathTxt><Root val="2" /> &middot; <Root val="8" /> = ?</MathTxt>, hint: "Înmulțește numerele sub un singur radical: √(2 * 8)." },
    { id: 23, category: "Radicali", content: <MathTxt><Root val="180" /> = ?</MathTxt>, hint: "Descompune 180: se împarte la 2, la 5, la 3... Găsește pătratele perfecte ascunse în el." },
    { id: 24, category: "Radicali", content: <MathTxt><Frac n={<Root val="32" />} d={<Root val="2" />} /> = ?</MathTxt>, hint: "Poți băga totul sub un singur radical pentru o fracție de forma √(a/b), sau poți scoate factorii din √32 mai întâi." },

    // Puteri și Operații
    { id: 25, category: "Puteri și Operații", content: <MathTxt><Sup base="2" exp="4" /> &middot; <Sup base="2" exp="7" /> = ?</MathTxt>, hint: "La înmulțirea puterilor cu aceeași bază, se păstrează baza și se adună exponenții." },
    { id: 26, category: "Puteri și Operații", content: <MathTxt><Frac n={<Sup base="2" exp="7" />} d={<Sup base="2" exp="4" />} /> = ?</MathTxt>, hint: "Linia de fracție înseamnă împărțire. La împărțire, exponenții se scad." },
    { id: 27, category: "Puteri și Operații", content: <MathTxt>(<Sup base="2" exp="4" />)<Sup base="" exp="7" /> = ?</MathTxt>, hint: "La puterea unei puteri, exponenții se înmulțesc." },
    { id: 28, category: "Puteri și Operații", content: <MathTxt><Sup base="2" exp="3" /> : <Sup base="2" exp="4" /> = ?</MathTxt>, hint: "Scade exponenții: 3 - 4 = -1. Apoi amintește-ți că a^(-n) = 1/a^n." },
    { id: 29, category: "Puteri și Operații", content: <MathTxt><Frac n={<Sup base="2" exp="0" />} d={<Sup base="2" exp="1" />} /> = ?</MathTxt>, hint: "Orice număr (diferit de 0) la puterea 0 este 1." },
    { id: 30, category: "Puteri și Operații", content: <MathTxt>(<Frac n="6" d="1 + 1/2 + 1/3 + 1/6" />)<Sup base="" exp="2" /> - <Frac n="6" d="1 + 1/2 + 1/3 + 1/6" /> = ?</MathTxt>, hint: "Rezolvă mai întâi adunarea de la numitor. Găsește numitorul comun (6), adună-le și vezi ce rezultat obții pentru fracția mare." },
    { id: 31, category: "Puteri și Operații", content: <MathTxt>( 1 - 0,2 ) : 2 + 0,3 &middot; 2 = ?</MathTxt>, hint: "Rezolvă paranteza (1.0 - 0.2), apoi fă împărțirea și înmulțirea." },
    { id: 32, category: "Puteri și Operații", content: <MathTxt>Transformă: 0,82 = ?</MathTxt>, hint: "Scrie tot numărul fără virgulă la numărător (sus), iar la numitor pune 1 urmat de atâtea zerouri câte zecimale ai (2)." },
];

const FORMULAS = [
    {
        id: 1,
        title: "Ordinea efectuării operațiilor",
        content: (
            <ol className="list-decimal pl-5 space-y-1 mt-2 text-gray-700 text-sm md:text-base">
                <li>Parantezele (întâi rotunde, apoi pătrate, apoi acolade).</li>
                <li>Ridicarea la putere și extragerea radicalilor.</li>
                <li>Înmulțirile și împărțirile.</li>
                <li>Adunările și scăderile.</li>
            </ol>
        )
    },
    {
        id: 2,
        title: "Regulile Puterilor",
        content: (
            <div className="space-y-3 mt-2 text-center text-lg">
                <p><MathTxt><Sup base="a" exp="m" /> &middot; <Sup base="a" exp="n" /> = <Sup base="a" exp="m+n" /></MathTxt></p>
                <p><MathTxt><Sup base="a" exp="m" /> : <Sup base="a" exp="n" /> = <Sup base="a" exp="m-n" /></MathTxt></p>
                <p><MathTxt>(<Sup base="a" exp="m" />)<Sup base="" exp="n" /> = <Sup base="a" exp="m&middot;n" /></MathTxt></p>
                <p><MathTxt><Sup base="a" exp="0" /> = 1</MathTxt> <span className="text-sm text-gray-500">(a &ne; 0)</span></p>
                <p><MathTxt><Sup base="a" exp="-n" /> = <Frac n="1" d={<Sup base="a" exp="n" />} /></MathTxt></p>
            </div>
        )
    },
    {
        id: 3,
        title: "Reguli de bază pentru Radicali",
        content: (
            <div className="space-y-3 mt-2 text-center text-lg">
                <p><MathTxt><Root val="a &middot; b" /> = <Root val="a" /> &middot; <Root val="b" /></MathTxt></p>
                <p><MathTxt><Root val={<Frac n="a" d="b" />} /> = <Frac n={<Root val="a" />} d={<Root val="b" />} /></MathTxt></p>
                <p><MathTxt><Root val={<Sup base="a" exp="2" />} /> = a</MathTxt> <span className="text-sm text-gray-500">(pt a &ge; 0)</span></p>
                <p><MathTxt>a<Root val="r" /> &plusmn; c<Root val="r" /> = (a &plusmn; c)<Root val="r" /></MathTxt></p>
            </div>
        )
    },
    {
        id: 4,
        title: "Mulțimi de Numere",
        content: (
            <div className="space-y-2 mt-2 text-gray-700 text-sm md:text-base">
                <p><strong>N (Naturale):</strong> {'{0, 1, 2, 3, 4, ...}'}</p>
                <p><strong>Z (Întregi):</strong> {'{..., -3, -2, -1, 0, 1, 2, ...}'}</p>
                <p><strong>Q (Raționale):</strong> Fracții de tipul a/b (ex: 1/2, 4/5)</p>
                <p><strong>R (Reale):</strong> Q + Iraționale (ex: &radic;2, &pi;, e)</p>
            </div>
        )
    },
    {
        id: 5,
        title: "Adunarea și Scăderea Fracțiilor",
        content: (
            <div className="mt-2 text-gray-700 text-sm md:text-base">
                <p className="mb-2">Se face doar dacă au același numitor. Dacă nu, se folosește:</p>
                <ul className="list-disc pl-5 space-y-1">
                    <li><strong>Amplificarea:</strong> Înmulțirea numărătorului și a numitorului cu același număr.</li>
                    <li><strong>Simplificarea:</strong> Împărțirea lor la un divizor comun.</li>
                </ul>
                <p className="mt-2 text-center"><MathTxt><Frac n="a" d="b" /> &plusmn; <Frac n="c" d="b" /> = <Frac n="a &plusmn; c" d="b" /></MathTxt></p>
            </div>
        )
    },
    {
        id: 6,
        title: "Înmulțirea și Împărțirea Fracțiilor",
        content: (
            <div className="space-y-3 mt-2 text-center text-lg">
                <p><strong>Înm.:</strong> <MathTxt><Frac n="a" d="b" /> &middot; <Frac n="c" d="d" /> = <Frac n="a &middot; c" d="b &middot; d" /></MathTxt></p>
                <p className="pt-2"><strong>Împ.:</strong> <MathTxt><Frac n="a" d="b" /> : <Frac n="c" d="d" /> = <Frac n="a" d="b" /> &middot; <Frac n="d" d="c" /></MathTxt></p>
                <p className="text-sm text-gray-600">Împărțirea devine înmulțire cu a doua fracție răsturnată.</p>
            </div>
        )
    },
    {
        id: 7,
        title: "Regula Semnelor",
        content: (
            <div className="mt-2 text-gray-700 text-sm md:text-base">
                <p><strong>Minusul în fața parantezei:</strong> Schimbă toate semnele din paranteză.</p>
                <p className="mt-3 text-center bg-gray-50 p-2 rounded border border-gray-200">
                    Exemplu: <br /> <MathTxt><Root val="11" /> - (<Root val="11" /> + 3) = <Root val="11" /> - <Root val="11" /> - 3</MathTxt>
                </p>
            </div>
        )
    },
    {
        id: 8,
        title: "Zecimale în Ordinare",
        content: (
            <div className="mt-2 text-gray-700 text-sm md:text-base">
                <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Sus:</strong> Se scrie numărul format, ignorând virgula.</li>
                    <li><strong>Jos:</strong> 1 urmat de atâtea zerouri câte zecimale ai.</li>
                </ul>
                <p className="mt-3 text-center bg-gray-50 p-2 rounded border border-gray-200">
                    Exemplu: <MathTxt>0,02 = <Frac n="2" d="100" /> ; 8,2 = <Frac n="82" d="10" /></MathTxt>
                </p>
            </div>
        )
    }
];

// --- Sub-components ---
const ExerciseCard = ({ exercise }) => {
    const [showHint, setShowHint] = useState(false);

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col h-full">
            <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 flex items-center gap-2">
                <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded-full">
                    Exercițiul {exercise.id}
                </span>
                <span className="text-sm text-slate-600 font-medium">{exercise.category}</span>
            </div>

            <div className="p-6 flex-grow flex items-center justify-center min-h-[120px]">
                {exercise.content}
            </div>

            <div className="p-4 border-t border-slate-100 bg-slate-50/50">
                <button
                    onClick={() => setShowHint(!showHint)}
                    className={`flex items-center gap-2 text-sm font-medium transition-colors ${showHint ? 'text-amber-600' : 'text-slate-500 hover:text-blue-600'
                        }`}
                >
                    {showHint ? <LightbulbOff size={16} /> : <Lightbulb size={16} />}
                    {showHint ? 'Ascunde indiciul' : 'Ai nevoie de un indiciu?'}
                </button>

                {showHint && (
                    <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800 animate-in fade-in slide-in-from-top-2">
                        <strong>Indiciu: </strong> {exercise.hint}
                    </div>
                )}
            </div>
        </div>
    );
};

const FormulaCard = ({ formula }) => (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:border-blue-300 transition-colors duration-300 h-full">
        <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-100">
            <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                <Info size={20} />
            </div>
            <h3 className="font-bold text-slate-800 text-lg">{formula.title}</h3>
        </div>
        {formula.content}
    </div>
);

// --- Main App ---
export default function App() {
    const [activeTab, setActiveTab] = useState('exercitii');
    const [filterCategory, setFilterCategory] = useState('Toate');

    const categories = ['Toate', 'Ecuații și Proporții', 'Fracții', 'Radicali', 'Puteri și Operații'];

    const filteredExercises = filterCategory === 'Toate'
        ? EXERCISES
        : EXERCISES.filter(ex => ex.category === filterCategory);

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-12">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
                <div className="max-w-5xl mx-auto px-4 py-4 md:py-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                                Mate<span className="text-blue-600">Practic</span>
                            </h1>
                            <p className="text-sm text-slate-500 mt-1">
                                Exersează conceptele din notițele tale
                            </p>
                        </div>

                        {/* Tab Navigation */}
                        <nav className="flex bg-slate-100 p-1 rounded-xl">
                            <button
                                onClick={() => setActiveTab('exercitii')}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'exercitii'
                                        ? 'bg-white text-blue-700 shadow-sm'
                                        : 'text-slate-600 hover:text-slate-900'
                                    }`}
                            >
                                <Calculator size={18} />
                                Exerciții
                            </button>
                            <button
                                onClick={() => setActiveTab('formule')}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'formule'
                                        ? 'bg-white text-blue-700 shadow-sm'
                                        : 'text-slate-600 hover:text-slate-900'
                                    }`}
                            >
                                <BookOpen size={18} />
                                Formule
                            </button>
                        </nav>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-5xl mx-auto px-4 pt-8">
                {activeTab === 'exercitii' ? (
                    <div className="animate-in fade-in duration-500">
                        <div className="mb-6">
                            <h2 className="text-xl font-bold text-slate-800">Set de exerciții</h2>
                            <p className="text-slate-600 text-sm">
                                Incearcă să rezolvi pe hârtie. Apasă pe butonul de indiciu dacă te blochezi.
                            </p>

                            {/* Category Filter */}
                            <div className="mt-4 flex flex-wrap gap-2">
                                {categories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setFilterCategory(cat)}
                                        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${filterCategory === cat
                                                ? 'bg-blue-600 text-white shadow-sm'
                                                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {filteredExercises.map((ex) => (
                                <ExerciseCard key={ex.id} exercise={ex} />
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="animate-in fade-in duration-500">
                        <div className="mb-6">
                            <h2 className="text-xl font-bold text-slate-800">Recapitulare Formule</h2>
                            <p className="text-slate-600 text-sm">
                                Baza teoretică extrasă din notițele tale.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {FORMULAS.map((form) => (
                                <FormulaCard key={form.id} formula={form} />
                            ))}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}