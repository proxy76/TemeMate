import React from 'react';
import { Loader2 } from 'lucide-react';

const Loading = () => {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
            <div className="flex flex-col items-center gap-4 text-blue-600">
                <Loader2 size={48} className="animate-spin" />
                <p className="text-slate-600 font-medium animate-pulse">Se încarcă tema...</p>
            </div>
        </div>
    );
};

export default Loading;
