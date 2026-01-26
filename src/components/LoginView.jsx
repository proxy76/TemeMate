import React, { useState } from 'react';
import { Lock, ArrowRight, AlertCircle } from 'lucide-react';
import { homeworkRegistry } from '../homeworks/registry';

const LoginView = ({ onLogin }) => {
    const [code, setCode] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!code.trim()) {
            setError('Te rog introdu un cod de acces.');
            return;
        }

        if (homeworkRegistry[code]) {
            onLogin(homeworkRegistry[code]);
            setError('');
        } else {
            setError('Cod de acces invalid. Încearcă din nou.');
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
            <div className="bg-white max-w-md w-full rounded-2xl shadow-xl p-8 border border-slate-100">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-4">
                        <Lock size={32} />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900 mb-2">Acces Teme</h1>
                    <p className="text-slate-500">Introdu codul primit pentru a accesa tema.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="code" className="block text-sm font-medium text-slate-700 mb-1">
                            Cod Acces
                        </label>
                        <input
                            type="text"
                            id="code"
                            value={code}
                            onChange={(e) => {
                                setCode(e.target.value);
                                setError('');
                            }}
                            placeholder="ex: 123456"
                            className={`w-full px-4 py-3 rounded-xl border ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : 'border-slate-300 focus:border-blue-500 focus:ring-blue-200'} focus:outline-none focus:ring-4 transition-all`}
                        />
                        {error && (
                            <div className="flex items-center gap-2 mt-2 text-sm text-red-600">
                                <AlertCircle size={16} />
                                <span>{error}</span>
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-blue-200"
                    >
                        <span>Accesează Tema</span>
                        <ArrowRight size={20} />
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-xs text-slate-400">
                        Sistem securizat pentru elevi
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginView;
