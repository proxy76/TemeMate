import React, { useState, useMemo } from 'react';

// Funcție ajutătoare pentru generarea de numere aleatorii
const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const BasicApp = () => {
    const [showHints, setShowHints] = useState(false);

    // Generăm cele 500 de exerciții o singură dată la încărcarea componentei
    const exercises = useMemo(() => {
        const list = [];

        for (let i = 1; i <= 500; i++) {
            let equation = '';
            let hint = '';
            // 'x' este folosit doar pentru a genera matematică corectă, dar nu îl mai salvăm nicăieri

            if (i <= 100) {
                // 1-100: Adunare
                const a = rand(1, 100);
                const x = rand(1, 50);
                const b = a + x;
                equation = i % 2 === 0 ? `x + ${a} = ${b}` : `${a} + x = ${b}`;
                hint = `Pentru a afla un termen necunoscut, scazi termenul cunoscut din sumă (${b} - ${a}).`;
            }
            else if (i <= 200) {
                // 101-200: Scădere
                if (i % 2 === 0) {
                    // x - a = b
                    const a = rand(1, 50);
                    const b = rand(1, 50);
                    const x = a + b;
                    equation = `x - ${a} = ${b}`;
                    hint = `Pentru a afla descăzutul, aduni scăzătorul cu diferența (${b} + ${a}).`;
                } else {
                    // a - x = b
                    const b = rand(1, 40);
                    const x = rand(1, 40);
                    const a = b + x;
                    equation = `${a} - x = ${b}`;
                    hint = `Pentru a afla scăzătorul, scazi diferența din descăzut (${a} - ${b}).`;
                }
            }
            else if (i <= 300) {
                // 201-300: Înmulțire
                const a = rand(2, 20);
                const x = rand(2, 20);
                const b = a * x;
                equation = i % 2 === 0 ? `x · ${a} = ${b}` : `${a} · x = ${b}`;
                hint = `Pentru a afla un factor necunoscut, împarți produsul la factorul cunoscut (${b} : ${a}).`;
            }
            else if (i <= 400) {
                // 301-400: Împărțire
                if (i % 2 === 0) {
                    // x : a = b
                    const a = rand(2, 15);
                    const b = rand(2, 15);
                    const x = a * b; // used to calculate 'x' conceptually
                    equation = `x : ${a} = ${b}`;
                    hint = `Pentru a afla deîmpărțitul, înmulțești împărțitorul cu câtul (${b} · ${a}).`;
                } else {
                    // a : x = b
                    const x = rand(2, 15);
                    const b = rand(2, 15);
                    const a = x * b;
                    equation = `${a} : x = ${b}`;
                    hint = `Pentru a afla împărțitorul, împarți deîmpărțitul la cât (${a} : ${b}).`;
                }
            }
            else if (i <= 450) {
                // 401-450: Mixt (ax + b = c)
                const a = rand(2, 10);
                const x = rand(2, 10);
                const b = rand(1, 20);
                const c = a * x + b;
                equation = `${a} · x + ${b} = ${c}`;
                hint = `Mai întâi scazi ${b} din ${c}, apoi împarți rezultatul la ${a}.`;
            }
            else {
                // 451-500: Cu radicali simpli din pătrate perfecte
                const r = rand(2, 10);
                const p = r * r;
                const x = rand(2, 15);

                if (i % 2 === 0) {
                    // √p * x = c
                    const c = r * x;
                    equation = `√${p} · x = ${c}`;
                    hint = `Calculează radicalul (√${p} = ${r}), apoi împarte produsul (${c}) la factorul găsit (${r}).`;
                } else {
                    // x + √p = c
                    const c = x + r;
                    equation = `x + √${p} = ${c}`;
                    hint = `Calculează radicalul (√${p} = ${r}), apoi scade valoarea lui din ${c}.`;
                }
            }

            list.push({ id: i, equation, hint });
        }

        return list;
    }, []); // Re-rulează doar la mount

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="bg-gray-50 text-gray-800 font-sans min-h-screen p-4 md:p-8 print:bg-white print:p-0">
            <div className="max-w-7xl mx-auto">

                {/* Header Controls (Ascunse la printare) */}
                <div className="bg-white p-6 rounded-xl shadow-md mb-8 border-t-4 border-blue-500 print:hidden">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">500 Exerciții: Aflarea Necunoscutei (x)</h1>
                    <p className="text-gray-600 mb-6">Ecuații de gradul 1 cu adunare, scădere, înmulțire, împărțire și radicali simpli.</p>

                    <div className="flex flex-wrap gap-4">
                        <button
                            onClick={() => setShowHints(!showHints)}
                            className={`font-semibold py-2 px-6 rounded-lg transition shadow-sm ${showHints
                                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                : 'bg-blue-100 hover:bg-blue-200 text-blue-700'
                                }`}
                        >
                            {showHints ? 'Ascunde Hint-uri' : 'Arată Hint-uri'}
                        </button>

                        <button
                            onClick={handlePrint}
                            className="bg-gray-800 hover:bg-gray-900 text-white font-semibold py-2 px-6 rounded-lg transition shadow-sm ml-auto flex items-center gap-2"
                        >
                            <span>🖨️</span> Printează Fișa
                        </button>
                    </div>
                </div>

                {/* Exercises Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 print:grid-cols-2 print:gap-x-6 print:gap-y-4">
                    {exercises.map((ex) => (
                        <div
                            key={ex.id}
                            className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex flex-col print:shadow-none print:border-gray-300 print:break-inside-avoid"
                        >
                            <div className="text-lg font-medium text-gray-800 flex items-center gap-2">
                                <span className="font-bold text-blue-500 text-sm bg-blue-50 px-2 py-1 rounded">#{ex.id}</span>
                                <span className="font-serif tracking-wide">{ex.equation}</span>
                            </div>

                            {/* Afișare condiționată pentru Hint-uri */}
                            {showHints && (
                                <div className="mt-3 text-sm text-yellow-700 bg-yellow-50/50 p-3 rounded-md border border-yellow-100 italic print:text-gray-600 print:bg-white print:border-none print:p-0 print:mt-2">
                                    <span className="font-semibold not-italic mr-1">💡 Hint:</span>
                                    {ex.hint}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default BasicApp;