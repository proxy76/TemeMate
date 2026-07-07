import React, { useState, useEffect, useMemo } from 'react';

export default function App() {
    // Starea pentru a ține evidența exercițiilor deschise (hint și răspuns)
    const [deschise, setDeschise] = useState({});

    // 1. Inițializare MathJax pentru formatare matematică avansată (fracții, radicali)
    useEffect(() => {
        let isMounted = true;
        const loadMathJax = () => {
            if (!window.MathJax) {
                window.MathJax = {
                    tex: { inlineMath: [['$', '$'], ['\\(', '\\)']] },
                    svg: { fontCache: 'global' }
                };
                const script = document.createElement('script');
                script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js';
                script.async = true;
                document.head.appendChild(script);
                script.onload = () => {
                    if (isMounted && window.MathJax.typesetPromise) {
                        window.MathJax.typesetPromise();
                    }
                };
            } else if (window.MathJax.typesetPromise) {
                window.MathJax.typesetPromise();
            }
        };

        loadMathJax();

        return () => { isMounted = false; };
    }, []);

    // 2. Generarea celor 100 de exerciții 
    const exercitii = useMemo(() => {
        const lista = [];

        // CATEGORIA 1: Formule de calcul prescurtat (Conjugatul) - 15 exerciții
        const conjPairs = [[2, 3], [3, 8], [4, 15], [5, 24], [6, 35], [3, 5], [4, 7], [5, 11], [6, 17], [7, 45], [8, 60], [9, 77], [10, 99], [2, 2], [3, 6]];
        conjPairs.forEach(([a, b], i) => {
            lista.push({
                id: `conj-${i}`,
                categorie: "Calcul cu radicali",
                q: `Calculați: $(${a} - \\sqrt{${b}})(${a} + \\sqrt{${b}})$`,
                hint: `Folosește formula diferenței de pătrate: $(x-y)(x+y) = x^2 - y^2$. Aici devine $${a}^2 - (\\sqrt{${b}})^2 = ${a * a} - ${b}$.`,
                ans: `$${a * a - b}$`
            });
        });

        // CATEGORIA 2: Adunări și scăderi de radicali (15 exerciții)
        const rads = [
            { q: "\\sqrt{12} + \\sqrt{27} - 5\\sqrt{3}", hint: "Scoate factorii de sub radical: $\\sqrt{12} = 2\\sqrt{3}$, $\\sqrt{27} = 3\\sqrt{3}$", ans: "$0$" },
            { q: "\\sqrt{8} + \\sqrt{18} - 5\\sqrt{2}", hint: "$\\sqrt{8} = 2\\sqrt{2}$, $\\sqrt{18} = 3\\sqrt{2}$", ans: "$0$" },
            { q: "2\\sqrt{20} - \\sqrt{45} - \\sqrt{5}", hint: "$\\sqrt{20} = 2\\sqrt{5}$, $\\sqrt{45} = 3\\sqrt{5}$", ans: "$0$" },
            { q: "\\sqrt{50} - \\sqrt{32} - \\sqrt{2}", hint: "$\\sqrt{50} = 5\\sqrt{2}$, $\\sqrt{32} = 4\\sqrt{2}$", ans: "$0$" },
            { q: "\\sqrt{48} - \\sqrt{27} - \\sqrt{3}", hint: "$\\sqrt{48} = 4\\sqrt{3}$, $\\sqrt{27} = 3\\sqrt{3}$", ans: "$0$" },
            { q: "3\\sqrt{12} - 2\\sqrt{27} + \\sqrt{3}", hint: "$3(2\\sqrt{3}) - 2(3\\sqrt{3}) + \\sqrt{3} = 6\\sqrt{3} - 6\\sqrt{3} + \\sqrt{3}$", ans: "$\\sqrt{3}$" },
            { q: "\\sqrt{24} + \\sqrt{54} - 5\\sqrt{6}", hint: "$\\sqrt{24} = 2\\sqrt{6}$, $\\sqrt{54} = 3\\sqrt{6}$", ans: "$0$" },
            { q: "\\sqrt{28} + \\sqrt{63} - 5\\sqrt{7}", hint: "$\\sqrt{28} = 2\\sqrt{7}$, $\\sqrt{63} = 3\\sqrt{7}$", ans: "$0$" },
            { q: "\\sqrt{75} - 2\\sqrt{12} - \\sqrt{3}", hint: "$\\sqrt{75} = 5\\sqrt{3}$, $\\sqrt{12} = 2\\sqrt{3}$. Adică $5\\sqrt{3} - 4\\sqrt{3} - \\sqrt{3}$", ans: "$0$" },
            { q: "\\sqrt{90} - \\sqrt{40} - \\sqrt{10}", hint: "$\\sqrt{90} = 3\\sqrt{10}$, $\\sqrt{40} = 2\\sqrt{10}$", ans: "$0$" },
            { q: "2\\sqrt{8} - \\sqrt{32} + \\sqrt{2}", hint: "$2(2\\sqrt{2}) - 4\\sqrt{2} + \\sqrt{2} = 4\\sqrt{2} - 4\\sqrt{2} + \\sqrt{2}$", ans: "$\\sqrt{2}$" },
            { q: "\\sqrt{125} - \\sqrt{20} - 3\\sqrt{5}", hint: "$\\sqrt{125} = 5\\sqrt{5}$, $\\sqrt{20} = 2\\sqrt{5}$", ans: "$0$" },
            { q: "\\sqrt{108} - \\sqrt{48} - 2\\sqrt{3}", hint: "$\\sqrt{108} = 6\\sqrt{3}$, $\\sqrt{48} = 4\\sqrt{3}$", ans: "$0$" },
            { q: "\\sqrt{200} - \\sqrt{98} - 3\\sqrt{2}", hint: "$\\sqrt{200} = 10\\sqrt{2}$, $\\sqrt{98} = 7\\sqrt{2}$", ans: "$0$" },
            { q: "\\sqrt{300} - 2\\sqrt{75} + \\sqrt{3}", hint: "$\\sqrt{300} = 10\\sqrt{3}$, $\\sqrt{75} = 5\\sqrt{3}$", ans: "$\\sqrt{3}$" }
        ];
        rads.forEach((r, i) => lista.push({ id: `rad-${i}`, categorie: "Simplificări radicali", q: `Calculați: $${r.q}$`, hint: r.hint, ans: r.ans }));

        // CATEGORIA 3: Fracții și zecimale (20 exerciții)
        const zecimale = [
            { q: "0.5 + \\frac{1}{2}", hint: "Transformă zecimala în fracție: $0.5 = \\frac{1}{2}$", ans: "$1$" },
            { q: "1.5 - \\frac{3}{2}", hint: "$1.5 = \\frac{15}{10} = \\frac{3}{2}$", ans: "$0$" },
            { q: "0.25 + \\frac{3}{4}", hint: "$0.25 = \\frac{25}{100} = \\frac{1}{4}$", ans: "$1$" },
            { q: "1.2 \\cdot 5 - 6", hint: "Efectuează întâi înmulțirea: $1.2 \\cdot 5 = 6$", ans: "$0$" },
            { q: "\\frac{1}{3} + 0.(3)", hint: "$0.(3) = \\frac{3}{9} = \\frac{1}{3}$", ans: "$\\frac{2}{3}$" },
            { q: "0.(6) - \\frac{2}{3}", hint: "$0.(6) = \\frac{6}{9} = \\frac{2}{3}$", ans: "$0$" },
            { q: "2.5 \\cdot 4 - 10", hint: "Efectuează înmulțirea: $2.5 \\cdot 4 = 10$", ans: "$0$" },
            { q: "\\frac{7}{2} - 3.5", hint: "Transformă în zecimal: $\\frac{7}{2} = 3.5$", ans: "$0$" },
            { q: "0.125 + \\frac{7}{8}", hint: "$0.125 = \\frac{125}{1000} = \\frac{1}{8}$", ans: "$1$" },
            { q: "\\frac{1}{4} - 0.25", hint: "Transformă în zecimal: $\\frac{1}{4} = 0.25$", ans: "$0$" },
            { q: "3.2 + \\frac{4}{5}", hint: "Transformă în zecimal: $\\frac{4}{5} = 0.8$, deci $3.2 + 0.8$", ans: "$4$" },
            { q: "1.(3) - \\frac{4}{3}", hint: "$1.(3) = \\frac{13-1}{9} = \\frac{12}{9} = \\frac{4}{3}$", ans: "$0$" },
            { q: "0.2 \\cdot 10 - 2", hint: "Mută virgula peste o cifră: $0.2 \\cdot 10 = 2$", ans: "$0$" },
            { q: "\\frac{5}{4} - 1.25", hint: "Amplifică pentru a obține zecimal: $\\frac{5}{4} = \\frac{125}{100} = 1.25$", ans: "$0$" },
            { q: "0.75 \\cdot 4 - 3", hint: "$0.75 = \\frac{3}{4}$, iar $\\frac{3}{4} \\cdot 4 = 3$", ans: "$0$" },
            { q: "1.1(6) - \\frac{7}{6}", hint: "$1.1(6) = \\frac{116-11}{90} = \\frac{105}{90} = \\frac{7}{6}$", ans: "$0$" },
            { q: "\\frac{1}{5} + 0.8", hint: "$\\frac{1}{5} = 0.2$, deci $0.2 + 0.8$", ans: "$1$" },
            { q: "4.5 : 1.5 - 3", hint: "$4.5 : 1.5 = 45 : 15 = 3$", ans: "$0$" },
            { q: "0.05 \\cdot 20 - 1", hint: "$0.05 \\cdot 20 = 5 \\cdot 0.2 = 1$", ans: "$0$" },
            { q: "\\frac{9}{2} - 4.5", hint: "$\\frac{9}{2} = 4.5$", ans: "$0$" }
        ];
        zecimale.forEach((z, i) => lista.push({ id: `zec-${i}`, categorie: "Fracții și zecimale", q: `Calculați: $${z.q}$`, hint: z.hint, ans: z.ans }));

        // CATEGORIA 4: Ordinea operațiilor și paranteze (20 exerciții)
        const ord = [
            { q: "2 \\cdot (3 + 4) - 14", hint: "Calculează întâi paranteza: $3 + 4 = 7$", ans: "$0$" },
            { q: "10 - 2 \\cdot 3", hint: "Înmulțirea are prioritate: $2 \\cdot 3 = 6$. Apoi $10 - 6$", ans: "$4$" },
            { q: "(10 - 2) \\cdot 3", hint: "Paranteza are prioritate: $10 - 2 = 8$", ans: "$24$" },
            { q: "15 : 3 + 2 \\cdot 4", hint: "Efectuează împărțirea și înmulțirea prima dată: $5 + 8$", ans: "$13$" },
            { q: "20 - 4 \\cdot (5 - 2)", hint: "Paranteza: $5 - 2 = 3$. Apoi înmulțirea $4 \\cdot 3 = 12$", ans: "$8$" },
            { q: "\\left(\\frac{1}{2} + \\frac{1}{3}\\right) \\cdot 6", hint: "Adu la același numitor: $\\frac{3}{6} + \\frac{2}{6} = \\frac{5}{6}$. Apoi înmulțește.", ans: "$5$" },
            { q: "\\left(\\frac{2}{3} - \\frac{1}{2}\\right) \\cdot 6", hint: "Adu la același numitor: $\\frac{4}{6} - \\frac{3}{6} = \\frac{1}{6}$", ans: "$1$" },
            { q: "\\frac{1}{2} : \\frac{1}{4} - 2", hint: "Împărțirea fracțiilor înseamnă înmulțire cu inversul: $\\frac{1}{2} \\cdot \\frac{4}{1} = 2$", ans: "$0$" },
            { q: "3 \\cdot \\left(\\frac{1}{3} + 1\\right)", hint: "$\\frac{1}{3} + 1 = \\frac{4}{3}$. Apoi $3 \\cdot \\frac{4}{3}$", ans: "$4$" },
            { q: "\\frac{3}{4} : \\frac{3}{8} - 2", hint: "Întoarce a doua fracție: $\\frac{3}{4} \\cdot \\frac{8}{3} = \\frac{8}{4} = 2$", ans: "$0$" },
            { q: "5 \\cdot (2 - 0.2 \\cdot 10)", hint: "$0.2 \\cdot 10 = 2$. Paranteza devine $2 - 2 = 0$", ans: "$0$" },
            { q: "8 : 2 \\cdot 4", hint: "Operațiile de același ordin se efectuează de la stânga la dreapta: $4 \\cdot 4$", ans: "$16$" },
            { q: "8 : (2 \\cdot 4)", hint: "Paranteza are prioritate: $2 \\cdot 4 = 8$, apoi $8 : 8$", ans: "$1$" },
            { q: "\\left(\\frac{1}{5} + \\frac{2}{5}\\right) \\cdot 10", hint: "Adună fracțiile (au același numitor): $\\frac{3}{5}$. Apoi $\\frac{3}{5} \\cdot 10$", ans: "$6$" },
            { q: "100 - 10 \\cdot (2 + 3)", hint: "Paranteza este $5$. Înmulțirea dă $50$. $100 - 50$", ans: "$50$" },
            { q: "\\left(\\frac{4}{7} \\cdot \\frac{7}{2}\\right) - 2", hint: "Se simplifică $7$ cu $7$ și $4$ cu $2$, rezultă $2$.", ans: "$0$" },
            { q: "2 + 2 \\cdot 2 - 6", hint: "Înmulțirea are prioritate: $2 + 4 = 6$. Apoi $6 - 6$", ans: "$0$" },
            { q: "\\frac{5}{6} : \\frac{1}{12} - 10", hint: "$\\frac{5}{6} \\cdot \\frac{12}{1} = 5 \\cdot 2 = 10$", ans: "$0$" },
            { q: "3.5 \\cdot 2 - 7", hint: "$3.5 \\cdot 2 = 7$", ans: "$0$" },
            { q: "\\left(1 - \\frac{1}{2}\\right)\\left(1 + \\frac{1}{2}\\right) + \\frac{1}{4}", hint: "Folosește $(a-b)(a+b)=a^2-b^2$. Obținem $1 - \\frac{1}{4} = \\frac{3}{4}$. Apoi aduni $\\frac{1}{4}$.", ans: "$1$" }
        ];
        ord.forEach((o, i) => lista.push({ id: `ord-${i}`, categorie: "Ordinea operațiilor", q: `Calculați: $${o.q}$`, hint: o.hint, ans: o.ans }));

        // CATEGORIA 5: Media aritmetică (15 exerciții)
        const medii = [
            { num: "4 \\text{ și } 6", hint: "Formula este $m_a = \\frac{x + y}{2}$. Aici: $\\frac{4 + 6}{2}$", ans: "$5$" },
            { num: "10 \\text{ și } 20", hint: "$\\frac{10 + 20}{2} = \\frac{30}{2}$", ans: "$15$" },
            { num: "-2 \\text{ și } 8", hint: "$\\frac{-2 + 8}{2} = \\frac{6}{2}$", ans: "$3$" },
            { num: "1.5 \\text{ și } 2.5", hint: "$\\frac{1.5 + 2.5}{2} = \\frac{4}{2}$", ans: "$2$" },
            { num: "\\frac{1}{2} \\text{ și } \\frac{3}{2}", hint: "$\\left(\\frac{1}{2} + \\frac{3}{2}\\right) : 2 = \\frac{4}{2} : 2 = 2 : 2$", ans: "$1$" },
            { num: "3-\\sqrt{2} \\text{ și } 3+\\sqrt{2}", hint: "Suma lor este $3 - \\sqrt{2} + 3 + \\sqrt{2} = 6$. Media este $6 : 2$.", ans: "$3$" },
            { num: "5-2\\sqrt{3} \\text{ și } 5+2\\sqrt{3}", hint: "Suma lor este $10$. Media este $10 : 2$.", ans: "$5$" },
            { num: "\\sqrt{3}-1 \\text{ și } \\sqrt{3}+1", hint: "Suma este $2\\sqrt{3}$. Media este $\\frac{2\\sqrt{3}}{2}$.", ans: "$\\sqrt{3}$" },
            { num: "0 \\text{ și } 10", hint: "$\\frac{0 + 10}{2}$", ans: "$5$" },
            { num: "\\frac{1}{3} \\text{ și } \\frac{5}{3}", hint: "$\\left(\\frac{1}{3} + \\frac{5}{3}\\right) : 2 = \\frac{6}{3} : 2 = 2 : 2$", ans: "$1$" },
            { num: "\\sqrt{2} \\text{ și } 3\\sqrt{2}", hint: "$\\frac{\\sqrt{2} + 3\\sqrt{2}}{2} = \\frac{4\\sqrt{2}}{2}$", ans: "$2\\sqrt{2}$" },
            { num: "7 \\text{ și } -7", hint: "$\\frac{7 + (-7)}{2} = \\frac{0}{2}$", ans: "$0$" },
            { num: "2.4 \\text{ și } 3.6", hint: "$\\frac{2.4 + 3.6}{2} = \\frac{6.0}{2}$", ans: "$3$" },
            { num: "\\frac{1}{4} \\text{ și } \\frac{3}{4}", hint: "$\\left(\\frac{1}{4} + \\frac{3}{4}\\right) : 2 = 1 : 2$", ans: "$\\frac{1}{2}$" },
            { num: "1+\\sqrt{5} \\text{ și } 3-\\sqrt{5}", hint: "Suma lor: $1 + \\sqrt{5} + 3 - \\sqrt{5} = 4$. Media este $4 : 2$.", ans: "$2$" }
        ];
        medii.forEach((m, i) => lista.push({ id: `med-${i}`, categorie: "Media aritmetică", q: `Calculați media aritmetică a numerelor: $${m.num}$.`, hint: m.hint, ans: m.ans }));

        // CATEGORIA 6: Mix avansat / Diverse (15 exerciții)
        const mix = [
            { q: "\\sqrt{3}(\\sqrt{3} - 1) + \\sqrt{3}", hint: "Desfășoară paranteza: $\\sqrt{3}\\cdot\\sqrt{3} - \\sqrt{3} = 3 - \\sqrt{3}$. Apoi aduni $\\sqrt{3}$.", ans: "$3$" },
            { q: "\\sqrt{2}(\\sqrt{2} + \\sqrt{8}) - 6", hint: "$\\sqrt{8} = 2\\sqrt{2}$. Paranteza este $3\\sqrt{2}$. Înmulțit cu $\\sqrt{2}$ avem $3 \\cdot 2 = 6$.", ans: "$0$" },
            { q: "(\\sqrt{5} - \\sqrt{2})^2 + 2\\sqrt{10}", hint: "Folosește $(a-b)^2 = a^2 - 2ab + b^2$. Adică $5 - 2\\sqrt{10} + 2$.", ans: "$7$" },
            { q: "(\\sqrt{7} + 1)^2 - 2\\sqrt{7}", hint: "$(a+b)^2 = a^2 + 2ab + b^2$. Adică $7 + 2\\sqrt{7} + 1$.", ans: "$8$" },
            { q: "\\frac{2}{\\sqrt{2}} - \\sqrt{2}", hint: "Raționalizează prima fracție amplificând cu $\\sqrt{2}$: obținem $\\frac{2\\sqrt{2}}{2} = \\sqrt{2}$.", ans: "$0$" },
            { q: "\\frac{3}{\\sqrt{3}} + \\sqrt{3}", hint: "Raționalizează: $\\frac{3\\sqrt{3}}{3} = \\sqrt{3}$.", ans: "$2\\sqrt{3}$" },
            { q: "\\left(\\frac{1}{\\sqrt{2}}\\right)^2 + \\frac{1}{2}", hint: "Ridicarea la pătrat: $\\left(\\frac{1}{\\sqrt{2}}\\right)^2 = \\frac{1}{2}$.", ans: "$1$" },
            { q: "10 \\cdot 0.1 + \\sqrt{1}", hint: "$10 \\cdot 0.1 = 1$. $\\sqrt{1} = 1$. Deci $1 + 1$.", ans: "$2$" },
            { q: "(1 - 0.5)(1 + 0.5) - 0.75", hint: "$(1 - 0.5)(1 + 0.5) = 1^2 - 0.5^2 = 1 - 0.25 = 0.75$.", ans: "$0$" },
            { q: "\\sqrt{144} - \\sqrt{121}", hint: "$\\sqrt{144} = 12$. $\\sqrt{121} = 11$.", ans: "$1$" },
            { q: "\\sqrt{169} + 2 \\cdot ( -3 )", hint: "$\\sqrt{169} = 13$. Iar $2 \\cdot (-3) = -6$.", ans: "$7$" },
            { q: "\\frac{1}{2} \\cdot \\frac{2}{3} \\cdot \\frac{3}{4} \\cdot 4", hint: "Se simplifică pe diagonală: $\\frac{1}{4} \\cdot 4$", ans: "$1$" },
            { q: "2^3 - 3^2 + 1", hint: "$2^3 = 8$. $3^2 = 9$. Deci $8 - 9 + 1$.", ans: "$0$" },
            { q: "\\sqrt{64} : 2^2 - 2", hint: "$\\sqrt{64} = 8$. $2^2 = 4$. $8 : 4 = 2$.", ans: "$0$" },
            { q: "\\left(2 - \\frac{1}{3}\\right) \\cdot \\frac{3}{5}", hint: "Adu la același numitor: $2 = \\frac{6}{3}$. $\\frac{6}{3} - \\frac{1}{3} = \\frac{5}{3}$. Apoi $\\frac{5}{3} \\cdot \\frac{3}{5} = 1$.", ans: "$1$" }
        ];
        mix.forEach((m, i) => lista.push({ id: `mix-${i}`, categorie: "Exerciții mixte", q: `Calculați: $${m.q}$`, hint: m.hint, ans: m.ans }));

        // CATEGORIA 7: Tipare Examen (40 exerciții extra)
        const extraEx = [
            // Tipar 1: Fracții și diferențe de produse
            { q: "\\left(7 - 7 \\cdot \\frac{1}{6} \\cdot \\frac{1}{7}\\right) \\cdot \\frac{6}{41}", hint: "Simplificăm $7$ cu $7$. Obținem $7 - \\frac{1}{6} = \\frac{42-1}{6} = \\frac{41}{6}$. Apoi $\\frac{41}{6} \\cdot \\frac{6}{41} = 1$.", ans: "$1$" },
            { q: "\\left(5 - 5 \\cdot \\frac{1}{4} \\cdot \\frac{1}{5}\\right) \\cdot \\frac{4}{19}", hint: "Simplificăm $5$ cu $5$. $5 - \\frac{1}{4} = \\frac{20-1}{4} = \\frac{19}{4}$. Înmulțind cu $\\frac{4}{19}$ obținem $1$.", ans: "$1$" },
            { q: "\\left(8 - 8 \\cdot \\frac{1}{3} \\cdot \\frac{1}{8}\\right) \\cdot \\frac{3}{23}", hint: "Simplificăm $8$ cu $8$. $8 - \\frac{1}{3} = \\frac{23}{3}$. $\\frac{23}{3} \\cdot \\frac{3}{23} = 1$.", ans: "$1$" },
            { q: "\\left(6 - 6 \\cdot \\frac{1}{5} \\cdot \\frac{1}{6}\\right) \\cdot \\frac{5}{29}", hint: "Simplificăm $6$ cu $6$. $6 - \\frac{1}{5} = \\frac{29}{5}$. $\\frac{29}{5} \\cdot \\frac{5}{29} = 1$.", ans: "$1$" },
            { q: "\\left(4 - 4 \\cdot \\frac{1}{2} \\cdot \\frac{1}{4}\\right) \\cdot \\frac{2}{7}", hint: "Simplificăm $4$ cu $4$. $4 - \\frac{1}{2} = \\frac{7}{2}$. $\\frac{7}{2} \\cdot \\frac{2}{7} = 1$.", ans: "$1$" },
            { q: "\\left(9 - 9 \\cdot \\frac{1}{4} \\cdot \\frac{1}{9}\\right) \\cdot \\frac{4}{35}", hint: "Simplificăm $9$ cu $9$. $9 - \\frac{1}{4} = \\frac{36-1}{4} = \\frac{35}{4}$. $\\frac{35}{4} \\cdot \\frac{4}{35} = 1$.", ans: "$1$" },
            { q: "\\left(3 - 3 \\cdot \\frac{1}{2} \\cdot \\frac{1}{3}\\right) \\cdot \\frac{2}{5}", hint: "Simplificăm $3$ cu $3$. $3 - \\frac{1}{2} = \\frac{5}{2}$. $\\frac{5}{2} \\cdot \\frac{2}{5} = 1$.", ans: "$1$" },
            { q: "\\left(10 - 10 \\cdot \\frac{1}{3} \\cdot \\frac{1}{10}\\right) \\cdot \\frac{3}{29}", hint: "Simplificăm $10$ cu $10$. $10 - \\frac{1}{3} = \\frac{29}{3}$. $\\frac{29}{3} \\cdot \\frac{3}{29} = 1$.", ans: "$1$" },
            { q: "\\left(7 - 7 \\cdot \\frac{1}{2} \\cdot \\frac{1}{7}\\right) \\cdot \\frac{2}{13}", hint: "Simplificăm $7$ cu $7$. $7 - \\frac{1}{2} = \\frac{13}{2}$. $\\frac{13}{2} \\cdot \\frac{2}{13} = 1$.", ans: "$1$" },
            { q: "\\left(5 - 5 \\cdot \\frac{1}{3} \\cdot \\frac{1}{5}\\right) \\cdot \\frac{3}{14}", hint: "Simplificăm $5$ cu $5$. $5 - \\frac{1}{3} = \\frac{14}{3}$. $\\frac{14}{3} \\cdot \\frac{3}{14} = 1$.", ans: "$1$" },

            // Tipar 2: Desfacere paranteze cu radicali
            { q: "\\sqrt{12}(\\sqrt{3} - 3\\sqrt{2}) + \\sqrt{8}(3\\sqrt{3} - \\sqrt{2})", hint: "Desfacem parantezele: $\\sqrt{36} - 3\\sqrt{24} + 3\\sqrt{24} - \\sqrt{16} = 6 - 4$.", ans: "$2$" },
            { q: "\\sqrt{18}(\\sqrt{2} - 2\\sqrt{3}) + \\sqrt{12}(3\\sqrt{2} - \\sqrt{3})", hint: "Desfacem: $\\sqrt{36} - 2\\sqrt{54} + 3\\sqrt{24} - \\sqrt{36}$. $\\sqrt{54} = 3\\sqrt{6}$ și $\\sqrt{24} = 2\\sqrt{6}$. Obținem $6 - 6\\sqrt{6} + 6\\sqrt{6} - 6$.", ans: "$0$" },
            { q: "\\sqrt{27}(\\sqrt{3} - 2\\sqrt{5}) + \\sqrt{20}(3\\sqrt{3} - \\sqrt{5})", hint: "Desfacem: $\\sqrt{81} - 2\\sqrt{135} + 3\\sqrt{60} - \\sqrt{100}$. Apoi $9 - 6\\sqrt{15} + 6\\sqrt{15} - 10$.", ans: "$-1$" },
            { q: "\\sqrt{8}(\\sqrt{2} - 4\\sqrt{3}) + \\sqrt{48}(2\\sqrt{2} - \\sqrt{3})", hint: "Desfacem: $\\sqrt{16} - 4\\sqrt{24} + 2\\sqrt{96} - \\sqrt{144}$. $4 - 4(2\\sqrt{6}) + 2(4\\sqrt{6}) - 12$.", ans: "$-8$" },
            { q: "\\sqrt{32}(\\sqrt{2} - 3\\sqrt{5}) + \\sqrt{45}(4\\sqrt{2} - \\sqrt{5})", hint: "Desfacem: $\\sqrt{64} - 3\\sqrt{160} + 4\\sqrt{90} - \\sqrt{225}$. $8 - 3(4\\sqrt{10}) + 4(3\\sqrt{10}) - 15$.", ans: "$-7$" },
            { q: "\\sqrt{50}(\\sqrt{2} - 2\\sqrt{7}) + \\sqrt{28}(5\\sqrt{2} - \\sqrt{7})", hint: "Desfacem: $\\sqrt{100} - 2\\sqrt{350} + 5\\sqrt{56} - \\sqrt{196}$. $10 - 2(5\\sqrt{14}) + 5(2\\sqrt{14}) - 14$.", ans: "$-4$" },
            { q: "\\sqrt{75}(\\sqrt{3} - 2\\sqrt{2}) + \\sqrt{8}(5\\sqrt{3} - \\sqrt{2})", hint: "Desfacem: $\\sqrt{225} - 2\\sqrt{150} + 5\\sqrt{24} - \\sqrt{16}$. $15 - 10\\sqrt{6} + 10\\sqrt{6} - 4$.", ans: "$11$" },
            { q: "\\sqrt{18}(\\sqrt{2} - 3\\sqrt{3}) + \\sqrt{27}(3\\sqrt{2} - \\sqrt{3})", hint: "Desfacem: $\\sqrt{36} - 3\\sqrt{54} + 3\\sqrt{54} - \\sqrt{81} = 6 - 9$.", ans: "$-3$" },
            { q: "\\sqrt{24}(\\sqrt{6} - 2\\sqrt{2}) + \\sqrt{8}(2\\sqrt{6} - \\sqrt{2})", hint: "Desfacem: $\\sqrt{144} - 2\\sqrt{48} + 2\\sqrt{48} - \\sqrt{16} = 12 - 4$.", ans: "$8$" },
            { q: "\\sqrt{12}(\\sqrt{3} - 4\\sqrt{5}) + \\sqrt{80}(2\\sqrt{3} - \\sqrt{5})", hint: "Desfacem: $\\sqrt{36} - 4\\sqrt{60} + 2\\sqrt{240} - \\sqrt{400}$. $6 - 8\\sqrt{15} + 8\\sqrt{15} - 20$.", ans: "$-14$" },

            // Tipar 3: Zecimale complexe cu ordinea operațiilor
            { q: "2 \\cdot 8.5 + 10.5 : 3.5", hint: "$2 \\cdot 8.5 = 17$. Împărțirea: $10.5 : 3.5 = 105 : 35 = 3$. Rezultat: $17 + 3 = 20$.", ans: "$20$" },
            { q: "3 \\cdot 4.5 + 12.5 : 2.5", hint: "$3 \\cdot 4.5 = 13.5$. Împărțirea: $12.5 : 2.5 = 125 : 25 = 5$. Rezultat: $13.5 + 5 = 18.5$.", ans: "$18.5$" },
            { q: "4 \\cdot 2.5 + 7.5 : 1.5", hint: "$4 \\cdot 2.5 = 10$. Împărțirea: $7.5 : 1.5 = 75 : 15 = 5$. Rezultat: $10 + 5 = 15$.", ans: "$15$" },
            { q: "5 \\cdot 1.2 + 8.4 : 2.1", hint: "$5 \\cdot 1.2 = 6$. Împărțirea: $8.4 : 2.1 = 84 : 21 = 4$. Rezultat: $6 + 4 = 10$.", ans: "$10$" },
            { q: "2 \\cdot 6.4 + 9.6 : 3.2", hint: "$2 \\cdot 6.4 = 12.8$. Împărțirea: $9.6 : 3.2 = 96 : 32 = 3$. Rezultat: $12.8 + 3 = 15.8$.", ans: "$15.8$" },
            { q: "6 \\cdot 1.5 + 14.4 : 1.2", hint: "$6 \\cdot 1.5 = 9$. Împărțirea: $14.4 : 1.2 = 144 : 12 = 12$. Rezultat: $9 + 12 = 21$.", ans: "$21$" },
            { q: "8 \\cdot 0.5 + 22.5 : 4.5", hint: "$8 \\cdot 0.5 = 4$. Împărțirea: $22.5 : 4.5 = 225 : 45 = 5$. Rezultat: $4 + 5 = 9$.", ans: "$9$" },
            { q: "10 \\cdot 2.3 + 6.4 : 0.8", hint: "$10 \\cdot 2.3 = 23$. Împărțirea: $6.4 : 0.8 = 64 : 8 = 8$. Rezultat: $23 + 8 = 31$.", ans: "$31$" },
            { q: "4 \\cdot 3.5 + 1.8 : 0.9", hint: "$4 \\cdot 3.5 = 14$. Împărțirea: $1.8 : 0.9 = 18 : 9 = 2$. Rezultat: $14 + 2 = 16$.", ans: "$16$" },
            { q: "7 \\cdot 1.1 + 15.5 : 3.1", hint: "$7 \\cdot 1.1 = 7.7$. Împărțirea: $15.5 : 3.1 = 155 : 31 = 5$. Rezultat: $7.7 + 5 = 12.7$.", ans: "$12.7$" },

            // Tipar 4: Combinație fracții cu zecimale
            { q: "\\frac{2}{3} \\cdot 0.3 + 3.2 : 4", hint: "$\\frac{2}{3} \\cdot \\frac{3}{10} = 0.2$. Împărțirea: $3.2 : 4 = 0.8$. Total: $0.2 + 0.8 = 1$.", ans: "$1$" },
            { q: "\\frac{3}{4} \\cdot 0.8 + 2.5 : 5", hint: "$\\frac{3}{4} \\cdot \\frac{8}{10} = \\frac{24}{40} = 0.6$. Împărțirea: $2.5 : 5 = 0.5$. Total: $0.6 + 0.5 = 1.1$.", ans: "$1.1$" },
            { q: "\\frac{1}{2} \\cdot 0.4 + 4.8 : 6", hint: "$\\frac{1}{2} \\cdot 0.4 = 0.2$. Împărțirea: $4.8 : 6 = 0.8$. Total: $0.2 + 0.8 = 1$.", ans: "$1$" },
            { q: "\\frac{4}{5} \\cdot 0.5 + 1.2 : 3", hint: "$\\frac{4}{5} \\cdot \\frac{1}{2} = 0.4$. Împărțirea: $1.2 : 3 = 0.4$. Total: $0.4 + 0.4 = 0.8$.", ans: "$0.8$" },
            { q: "\\frac{5}{6} \\cdot 1.2 + 6.4 : 8", hint: "$\\frac{5}{6} \\cdot \\frac{12}{10} = 1$. Împărțirea: $6.4 : 8 = 0.8$. Total: $1 + 0.8 = 1.8$.", ans: "$1.8$" },
            { q: "\\frac{2}{5} \\cdot 1.5 + 2.7 : 9", hint: "$\\frac{2}{5} \\cdot \\frac{15}{10} = 0.6$. Împărțirea: $2.7 : 9 = 0.3$. Total: $0.6 + 0.3 = 0.9$.", ans: "$0.9$" },
            { q: "\\frac{3}{2} \\cdot 0.6 + 1.4 : 2", hint: "$\\frac{3}{2} \\cdot \\frac{6}{10} = 0.9$. Împărțirea: $1.4 : 2 = 0.7$. Total: $0.9 + 0.7 = 1.6$.", ans: "$1.6$" },
            { q: "\\frac{7}{4} \\cdot 0.8 + 3.6 : 6", hint: "$\\frac{7}{4} \\cdot \\frac{8}{10} = 1.4$. Împărțirea: $3.6 : 6 = 0.6$. Total: $1.4 + 0.6 = 2$.", ans: "$2$" },
            { q: "\\frac{1}{3} \\cdot 0.9 + 5.5 : 11", hint: "$\\frac{1}{3} \\cdot \\frac{9}{10} = 0.3$. Împărțirea: $5.5 : 11 = 0.5$. Total: $0.3 + 0.5 = 0.8$.", ans: "$0.8$" },
            { q: "\\frac{5}{2} \\cdot 0.4 + 4.2 : 7", hint: "$\\frac{5}{2} \\cdot \\frac{4}{10} = 1$. Împărțirea: $4.2 : 7 = 0.6$. Total: $1 + 0.6 = 1.6$.", ans: "$1.6$" }
        ];
        extraEx.forEach((e, i) => lista.push({ id: `extra-${i}`, categorie: "Tipare Examen", q: `Calculați: $${e.q}$`, hint: e.hint, ans: e.ans }));

        return lista;
    }, []);

    // 3. Funcții de gestiune a stării de "Deschis/Închis"
    const toggleExercitiu = (id) => {
        setDeschise(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const setToate = (stare) => {
        const newState = {};
        if (stare) {
            exercitii.forEach(ex => {
                newState[ex.id] = true;
            });
        }
        setDeschise(newState);
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-16">
            {/* Antet */}
            <header className="bg-white shadow-sm border-b border-slate-200 p-6 md:p-10 mb-8 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-2xl md:text-4xl font-extrabold text-blue-900 text-center mb-3">
                        Matematică Bac M2 - 140 Exerciții
                    </h1>
                    <p className="text-center text-slate-600 text-sm md:text-base font-medium">
                        Subiectul I: radicali, fracții, zecimale, media aritmetică. <br className="md:hidden" />
                        Click pe exercițiu pentru a vedea hint-ul și rezultatul!
                    </p>

                    <div className="mt-6 flex justify-center gap-4">
                        <button
                            onClick={() => setToate(true)}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow transition-colors text-sm"
                        >
                            Arată toate răspunsurile
                        </button>
                        <button
                            onClick={() => setToate(false)}
                            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold rounded-lg shadow transition-colors text-sm"
                        >
                            Ascunde toate
                        </button>
                    </div>
                </div>
            </header>

            {/* Grila de exerciții */}
            <main className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {exercitii.map((ex, index) => {
                        const isDeschis = !!deschise[ex.id];

                        return (
                            <div
                                key={ex.id}
                                onClick={() => toggleExercitiu(ex.id)}
                                className={`
                  cursor-pointer bg-white rounded-xl p-5 border flex flex-col justify-start
                  transition-all duration-200 transform hover:-translate-y-1 hover:shadow-lg
                  ${isDeschis ? 'border-blue-400 shadow-md' : 'border-slate-200 shadow-sm'}
                `}
                            >
                                <div className="flex justify-between items-center mb-3">
                                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                        Exercițiul {index + 1}
                                    </span>
                                    <span className="text-[10px] font-semibold bg-blue-50 text-blue-600 py-1 px-2 rounded-full">
                                        {ex.categorie}
                                    </span>
                                </div>

                                {/* Enunțul */}
                                <div className="text-lg font-medium text-slate-900 min-h-[3rem] flex items-center">
                                    {ex.q}
                                </div>

                                {/* Secțiunea expandabilă (Hint + Răspuns) */}
                                <div className={`mt-4 pt-4 border-t border-slate-100 ${isDeschis ? 'block' : 'hidden'}`}>
                                    <div className="text-sm text-slate-700 bg-slate-50 p-3 rounded-lg mb-3 border border-slate-100">
                                        <span className="font-bold text-blue-700 block mb-1">Indiciu:</span>
                                        <span>{ex.hint}</span>
                                    </div>
                                    <div className="text-base text-green-700 font-bold bg-green-50 p-3 rounded-lg border border-green-100 flex items-center gap-2">
                                        <span>Răspuns final:</span>
                                        <span className="text-lg">{ex.ans}</span>
                                    </div>
                                </div>

                                {/* Mesaj mic cand e inchis */}
                                {!isDeschis && (
                                    <div className="mt-4 text-xs text-slate-400 font-medium text-center italic">
                                        Click pentru rezolvare
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </main>

            { }
            <div className="fixed bottom-4 right-6 pointer-events-none select-none z-50 flex flex-col items-end opacity-70">
                <span className="text-slate-500 font-semibold text-[10px] tracking-widest uppercase mb-0.5">Powered by</span>
                <span className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500 drop-shadow-md tracking-tight">
                    Algomate
                </span>
            </div>
        </div>
    );
}