import React, { useState, useEffect, useMemo } from 'react';
import { BookOpen, CheckCircle, Circle, Search, Award, ChevronLeft, ChevronRight } from 'lucide-react';

const GeometryApp = () => {
    const [exercises, setExercises] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [solvedIds, setSolvedIds] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 10;

    // Raw data from the PDF
    const rawData = [
        "Într-un triunghi dreptunghic ABC cu m(∠A)=90°, măsura unghiului B este de 35°. Aflați măsura unghiului C.",
        "Fie ABC isoscel cu AB=AC și m(∠A)=40°. Aflați măsurile unghiurilor B și C.",
        "În ABC, AD este bisectoarea unghiului BAC, cu D∈BC. Dacă m(∠B)=70° și m(∠C)=30°, calculați m(∠ADB).",
        "Fie ABC dreptunghic în A. Fie M mijlocul ipotenuzei BC. Dacă AM=6 cm, calculați lungimea ipotenuzei BC.",
        "În ABC, fie G centrul de greutate. Dacă lungimea medianei AM este de 12 cm, calculați lungimile segmentelor AG și GM.",
        "Fie ABC echilateral. Calculați măsura unghiului format de înălțimea din A și bisectoarea unghiului B.",
        "În ABC, mediatoarele laturilor AB și AC se intersectează într-un punct O situat pe latura BC. Ce fel de triunghi este ABC?",
        "Fie ABC cu m(∠A)=60° și m(∠B)=50°. Ordonați crescător lungimile laturilor triunghiului.",
        "În triunghiul ascuțitunghic ABC, H este ortocentrul. Dacă m(∠A)=70°, aflați măsura unghiului BHC.",
        "Fie ABC dreptunghic în A, cu m(∠C)=30° și BC=20 cm. Aflați lungimea catetei AB.",
        "Suma măsurilor unghiurilor unui patrulater convex este de 360°. Dacă trei unghiuri au măsurile de 80°, 100° și 70°, aflați măsura celui de-al patrulea unghi.",
        "În paralelogramul ABCD, m(∠A)=65°. Aflați măsurile unghiurilor B, C și D.",
        "Perimetrul unui paralelogram este de 48 cm. Dacă una dintre laturi are lungimea de 10 cm, calculați lungimea celeilalte laturi.",
        "În paralelogramul ABCD, diagonalele se intersectează în O. Dacă AC=16 cm și BD=24 cm, calculați AO+BO.",
        "Fie paralelogramul ABCD. Bisectoarea unghiului A intersectează latura CD în punctul M. Arătați că triunghiul ADM este isoscel.",
        "Două laturi consecutive ale unui paralelogram sunt proporționale cu numerele 3 și 5, iar perimetrul este 64 cm. Aflați lungimile laturilor.",
        "În paralelogramul ABCD, m(∠A)=2·m(∠B). Aflați măsurile unghiurilor paralelogramului.",
        "Fie ABCD paralelogram. Dacă distanța de la intersecția diagonalelor la latura AB este de 4 cm, care este înălțimea paralelogramului corespunzătoare laturii AB?",
        "În paralelogramul ABCD, AB=2·BC, iar M este mijlocul laturii AB. Calculați măsura unghiului CMD dacă ABCD ar fi dreptunghi.",
        "Fie ABCD un patrulater convex în care AB || CD și AB≡CD. Demonstrați că ABCD este paralelogram.",
        "În dreptunghiul ABCD, diagonala AC face cu latura AB un unghi de 30°. Aflați măsura unghiului dintre diagonale.",
        "Un romb are un unghi cu măsura de 120°. Dacă diagonala mică are lungimea de 10 cm, calculați perimetrul rombului.",
        "Diagonalele unui dreptunghi se intersectează sub un unghi de 60°. Dacă lățimea dreptunghiului este de 8 cm, calculați lungimea diagonalei.",
        "Fie ABCD un pătrat cu perimetrul de 32 cm. Calculați lungimea diagonalei.",
        "În rombul ABCD, m(∠ABD)=40°. Calculați măsurile unghiurilor rombului.",
        "Fie ABCD un dreptunghi. Perpendiculara din B pe AC intersectează AC în M. Dacă m(∠BOC)=60° (unde O e intersecția diagonalelor), arătați că AC=2·AB.",
        "Un romb are diagonalele de 10 cm și 24 cm. Calculați lungimea laturii rombului.",
        "Fie ABCD un pătrat. Pe laturile AB și BC se iau punctele M, respectiv N astfel încât AM≡BN. Demonstrați că DM ⊥ AN.",
        "Perimetrul unui dreptunghi este 100 cm, iar lungimea este cu 10 cm mai mare decât lățimea. Aflați dimensiunile dreptunghiului.",
        "Dacă mijloacele laturilor unui dreptunghi sunt unite consecutiv, ce tip de patrulater se obține?",
        "Într-un trapez isoscel ABCD (AB || CD), m(∠A)=70°. Aflați celelalte unghiuri.",
        "Linia mijlocie a unui trapez are lungimea de 15 cm. Dacă baza mare este de 20 cm, aflați lungimea bazei mici.",
        "Un trapez dreptunghic ABCD are unghiul ascuțit de 45°. Dacă înălțimea este de 6 cm și baza mică de 6 cm, aflați baza mare.",
        "În trapezul isoscel ABCD cu AD=BC, diagonala AC este perpendiculară pe latura BC. Dacă m(∠D)=60°, iar baza mică CD=5 cm, aflați baza mare AB.",
        "Calculați lungimea segmentului care unește mijloacele diagonalelor unui trapez cu bazele de 24 cm și 10 cm.",
        "Fie ABCD un trapez isoscel în care baza mică este egală cu laturile neparalele. Dacă diagonala AC este bisectoarea unghiului A, aflați măsura unghiului B.",
        "În trapezul ABCD, AB || CD, AB=30 cm, CD=10 cm. Diagonalele se intersectează în O. Aflați raportul AO/OC.",
        "Un trapez isoscel are diagonalele perpendiculare. Dacă înălțimea trapezului este de 12 cm, calculați lungimea liniei mijlocii.",
        "Într-un trapez dreptunghic, baza mare este dublul bazei mici, iar latura oblică face un unghi de 60° cu baza mare. Dacă baza mică are 4 cm, calculați perimetrul.",
        "Demonstrați că într-un trapez, bisectoarele unghiurilor alăturate unei laturi neparalele sunt perpendiculare.",
        "Calculați aria unui triunghi cu o latură de 12 cm și înălțimea corespunzătoare de 8 cm.",
        "Calculați aria unui triunghi dreptunghic cu catetele de 9 cm și 12 cm.",
        "Aflați aria unui paralelogram cu baza de 15 cm și înălțimea de 6 cm.",
        "Un romb are diagonalele de 12 cm și 16 cm. Calculați aria și perimetrul rombului.",
        "Calculați aria unui trapez cu bazele de 18 cm și 12 cm, și înălțimea de 10 cm.",
        "Un pătrat are aria de 81 cm². Calculați perimetrul pătratului.",
        "În ABC, D este mijlocul lui BC. Dacă aria triunghiului ABD este 20 cm², calculați aria triunghiului ABC.",
        "Fie un dreptunghi cu aria de 48 cm² și lățimea de 6 cm. Calculați perimetrul dreptunghiului.",
        "ABC este echilateral cu latura de 10 cm. Calculați aria triunghiului.",
        "Fie trapezul dreptunghic ABCD (m(∠A)=m(∠D)=90°) cu bazele AB=20 cm, CD=12 cm și latura neparalelă BC=10 cm. Calculați aria trapezului.",
        "Fie ABC cu m(∠A)=60° și m(∠B)=45°. Dacă D este piciorul înălțimii din A pe BC, calculați raportul BD/DC.",
        "În ABC dreptunghic în A, m(∠C)=15°. Demonstrați că înălțimea AD este un sfert din ipotenuza BC.",
        "Fie ABC isoscel (AB=AC). Pe latura BC se ia punctul D astfel încât BD=AB. Dacă m(∠ADB)=100°, aflați măsurile unghiurilor ABC.",
        "În triunghiul ABC, mediana AM (M∈BC) este egală cu jumătate din latura BC. Demonstrați că triunghiul este dreptunghic în A.",
        "Fie ABC și M mijlocul lui BC. Demonstrați inegalitatea AM<(AB+AC)/2.",
        "Fie ABC dreptunghic în A și M mijlocul ipotenuzei. Dacă N este simetricul lui M față de AC, demonstrați că ABMN este trapez isoscel.",
        "În ABC, bisectoarea AD (D∈BC) este egală cu latura AB. Dacă m(∠C)=20°, aflați m(∠B).",
        "Fie ABC echilateral și D un punct pe prelungirea laturii BC (dincolo de C) astfel încât CD=BC. Demonstrați că DA ⊥ AB.",
        "În triunghiul ascuțitunghic ABC, înălțimile AD și BE se intersectează în H. Dacă BH=AC, aflați măsura unghiului ABC.",
        "Fie ABCD un paralelogram. Bisectoarele interioare ale unghiurilor A, B, C, D formează un patrulater MNPQ. Ce fel de patrulater este acesta?",
        "În paralelogramul ABCD, fie M mijlocul lui CD. Dacă AM este bisectoarea unghiului BAD, demonstrați că BC=1/2 din AB.",
        "Fie ABCD paralelogram. Perpendiculara din C pe AD intersectează perpendiculara din A pe CD în punctul H. Demonstrați proprietățile ortocentrului în triunghiul format.",
        "În paralelogramul ABCD, diagonala BD este dublul laturii AB. Fie M mijlocul lui BD și N mijlocul lui CD. Arătați că AM ⊥ AN.",
        "Fie ABCD un pătrat și E un punct în interiorul său astfel încât ABE este echilateral. Calculați măsura unghiului DEC.",
        "În pătratul ABCD, fie M mijlocul lui AB. Pe diagonala AC se ia punctul P astfel încât AP=3·PC. Demonstrați că PM ⊥ PD.",
        "Fie ABCD romb. Pe prelungirile laturilor AB și BC se iau punctele M, respectiv N astfel încât BM=CN. Demonstrați că D se află pe mediatoarea segmentului MN.",
        "Într-un trapez ABCD (AB || CD), AB>CD, suma unghiurilor de la baza mare este 90°. Calculați lungimea segmentului ce unește mijloacele bazelor în funcție de baze.",
        "Fie ABCD un trapez isoscel cu AD=BC. Dacă AC ⊥ BD și înălțimea trapezului este h, demonstrați că aria trapezului este h².",
        "În trapezul ABCD (AB || CD), bisectoarele unghiurilor A și D se intersectează într-un punct M situat pe latura BC. Demonstrați relația dintre laturi.",
        "Fie ABCD un trapez dreptunghic (m(∠A)=m(∠D)=90°). Dacă AC ⊥ BD, demonstrați că AD²=AB·CD.",
        "Fie ABC un triunghi. M este un punct pe BC. Demonstrați că raportul ariilor (Aria ABM / Aria ACM) este egal cu raportul segmentelor BM/CM.",
        "Într-un patrulater convex ABCD, diagonalele sunt perpendiculare. Demonstrați că AB²+CD²=BC²+AD².",
        "Fie G centrul de greutate al ABC. Demonstrați că Aria(GAB) = Aria(GBC) = Aria(GAC) = 1/3 Aria(ABC).",
        "În ABC dreptunghic în A, construim înălțimea AD ⊥ BC. Dacă proiecțiile catetelor pe ipotenuză sunt BD=4 cm și CD=16 cm, calculați AD.",
        "Un triunghi dreptunghic are catetele de 15 cm și 20 cm. Calculați lungimea înălțimii corespunzătoare ipotenuzei.",
        "În ABC (∠A=90°), AD ⊥ BC. Știind că AD=12 cm și BD=9 cm, calculați perimetrul triunghiului ABC.",
        "Fie ABC dreptunghic în A. Raportul catetelor este AB/AC=3/4, iar ipotenuza BC=50 cm. Aflați lungimile catetelor.",
        "Calculați lungimea diagonalei unui pătrat cu latura de 10 cm.",
        "Un dreptunghi are lungimea de 24 cm și lățimea de 7 cm. Calculați lungimea diagonalei.",
        "Un triunghi dreptunghic isoscel are ipotenuza de 8√2 cm. Aflați lungimea catetelor.",
        "În ABC dreptunghic în A, m(∠C)=30° și BC=12 cm. Calculați aria triunghiului.",
        "În trapezul dreptunghic ABCD (AB || CD, ∠A=90°), avem AB=20 cm, CD=12 cm și AD=6 cm. Calculați lungimea laturii oblice BC.",
        "Fie un romb cu latura de 13 cm și o diagonală de 10 cm. Calculați aria rombului.",
        "În paralelogramul ABCD, AB=10 cm, AD=6 cm și m(∠A)=30°. Calculați aria paralelogramului.",
        "Fie ABC cu AB=13 cm, AC=15 cm și înălțimea AD=12 cm (D∈BC). Calculați lungimea laturii BC.",
        "În ABC, mediana AM are lungimea de 10 cm. Aria triunghiului ABM este de 24 cm². Care este aria triunghiului ABC?",
        "Un trapez isoscel are bazele de 10 cm și 22 cm, iar laturile neparalele de 10 cm. Calculați aria trapezului.",
        "Într-un triunghi echilateral cu aria de 36√3 cm², calculați distanța de la centrul de greutate la o latură.",
        "Un teren are forma unui dreptunghi ABCD cu AB=40m și BC=30m, la care se adaugă un triunghi dreptunghic CDE (în exterior) cu catetele CD și DE=40m. Calculați aria totală.",
        "Aria unui romb este 96 cm², iar una dintre diagonale este 12 cm. Calculați perimetrul rombului.",
        "Dacă diagonala unui pătrat este 6 cm, calculați aria pătratului.",
        "În ABC, punctul M este pe AB astfel încât AM=2 MB. Calculați raportul dintre aria AMC și aria ABC.",
        "Aria unui triunghi ABC este de 48 cm². Punctele M, N, P sunt mijloacele laturilor. Calculați aria triunghiului MNP.",
        "În ABC dreptunghic în A, AD este înălțime. Dacă BD/CD =1/9 și AD=6 cm, calculați lungimea ipotenuzei BC.",
        "Fie un dreptunghi ABCD. Perpendiculara din A pe BD intersectează BD în E. Dacă BE=3 cm și ED=12 cm, aflați aria dreptunghiului.",
        "În ABC, m(∠B)=45°, m(∠C)=30° și AD ⊥ BC. Dacă AD=10 cm, calculați lungimea bazei BC.",
        "Un triunghi are laturile de 6 cm, 8 cm și 10 cm. Calculați raza cercului circumscris triunghiului.",
        "Fie ABC cu AB=AC=10 cm și BC=12 cm. Calculați distanța de la punctul D (mijlocul lui BC) la latura AC.",
        "Un trapez isoscel are diagonalele perpendiculare și lungimea liniei mijlocii egală cu 15 cm. Calculați înălțimea și aria trapezului.",
        "O scară de 5 m este sprijinită de un perete. Dacă baza scării este la 3 m de perete, la ce înălțime ajunge scara? (Aplicație Pitagora)."
    ];

    useEffect(() => {
        // Initialize exercises
        const loadedExercises = rawData.map((text, index) => ({
            id: index + 1,
            text: text,
            category: determineCategory(text)
        }));
        setExercises(loadedExercises);

        // Load progress from localStorage
        const savedProgress = localStorage.getItem('geometrySolvedIds');
        if (savedProgress) {
            setSolvedIds(JSON.parse(savedProgress));
        }
    }, []);

    const determineCategory = (text) => {
        const lower = text.toLowerCase();
        if (lower.includes('trapez')) return 'Trapez';
        if (lower.includes('paralelogram')) return 'Paralelogram';
        if (lower.includes('romb')) return 'Romb';
        if (lower.includes('dreptunghi')) return 'Dreptunghi';
        if (lower.includes('pătrat') || lower.includes('patrat')) return 'Pătrat';
        if (lower.includes('triunghi') || lower.includes('abc')) return 'Triunghi';
        return 'General';
    };

    const toggleSolved = (id) => {
        let newSolved;
        if (solvedIds.includes(id)) {
            newSolved = solvedIds.filter(sid => sid !== id);
        } else {
            newSolved = [...solvedIds, id];
        }
        setSolvedIds(newSolved);
        localStorage.setItem('geometrySolvedIds', JSON.stringify(newSolved));
    };

    // Filter exercises
    const filteredExercises = useMemo(() => {
        return exercises.filter(ex =>
            ex.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ex.id.toString() === searchTerm
        );
    }, [exercises, searchTerm]);

    // Pagination
    const totalPages = Math.ceil(filteredExercises.length / itemsPerPage);
    const currentExercises = filteredExercises.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
    const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

    const progressPercentage = Math.round((solvedIds.length / exercises.length) * 100);

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
            {/* Header */}
            <header className="bg-indigo-600 text-white shadow-lg">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-3">
                            <BookOpen size={32} />
                            <div>
                                <h1 className="text-2xl font-bold">Geometrie Clasa a 7-a</h1>
                                <p className="text-indigo-200 text-sm">Culegere Digitală Interactivă</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 bg-indigo-700 rounded-lg px-4 py-2">
                            <Award className="text-yellow-300" />
                            <div>
                                <p className="text-xs text-indigo-200">Progres</p>
                                <p className="font-bold">{solvedIds.length} / {exercises.length} ({progressPercentage}%)</p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">

                <div className="max-w-4xl mx-auto">

                    {/* Controls */}
                    <div className="bg-white p-4 rounded-xl shadow-sm mb-8 flex flex-col md:flex-row gap-4 justify-between items-center sticky top-4 z-10 border border-slate-100">
                        <div className="relative w-full">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                type="text"
                                placeholder="Caută (ex: 'romb', 'arie', '15')..."
                                className="w-full pl-10 pr-4 py-2 bg-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setCurrentPage(1);
                                }}
                            />
                        </div>
                    </div>

                    {/* Exercise Grid */}
                    <div className="grid gap-4">
                        {currentExercises.length > 0 ? (
                            currentExercises.map((ex) => (
                                <div
                                    key={ex.id}
                                    className={`
                    group relative bg-white p-6 rounded-xl shadow-sm border transition-all duration-300
                    ${solvedIds.includes(ex.id) ? 'border-green-200 bg-green-50/30' : 'border-slate-100 hover:border-indigo-200 hover:shadow-md'}
                  `}
                                >
                                    <div className="flex gap-4 items-start">
                                        <button
                                            onClick={() => toggleSolved(ex.id)}
                                            className="mt-1 focus:outline-none transition-colors"
                                            title={solvedIds.includes(ex.id) ? "Marchează ca nerezolvat" : "Marchează ca rezolvat"}
                                        >
                                            {solvedIds.includes(ex.id) ? (
                                                <CheckCircle className="text-green-500" size={24} />
                                            ) : (
                                                <Circle className="text-slate-300 group-hover:text-indigo-400" size={24} />
                                            )}
                                        </button>

                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-2 py-1 rounded">
                                                    #{ex.id}
                                                </span>
                                                <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                                                    {ex.category}
                                                </span>
                                            </div>
                                            <p className={`text-lg leading-relaxed ${solvedIds.includes(ex.id) ? 'text-slate-500' : 'text-slate-800'}`}>
                                                {ex.text}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-12 text-slate-400">
                                <p>Nu am găsit probleme care să corespundă căutării.</p>
                            </div>
                        )}
                    </div>

                    {/* Pagination */}
                    {filteredExercises.length > itemsPerPage && (
                        <div className="flex justify-center items-center gap-4 mt-8">
                            <button
                                onClick={prevPage}
                                disabled={currentPage === 1}
                                className="p-2 rounded-full hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <ChevronLeft />
                            </button>
                            <span className="font-medium text-slate-600">
                                Pagina {currentPage} din {totalPages}
                            </span>
                            <button
                                onClick={nextPage}
                                disabled={currentPage === totalPages}
                                className="p-2 rounded-full hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <ChevronRight />
                            </button>
                        </div>
                    )}
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-slate-800 text-slate-400 py-8 mt-12">
                <div className="container mx-auto px-4 text-center">
                    <p>© {new Date().getFullYear()} Culegere Digitală. Bazat pe fișa încărcată.</p>
                    <p className="text-sm mt-2">Rezolvând probleme îți antrenezi mintea.</p>
                </div>
            </footer>
        </div>
    );
};

export default GeometryApp;