import React, { useState } from 'react';
import { DairyApi } from '../services/api';
import { Bot, Sparkles, Send, Lightbulb, AlertCircle, CheckCircle } from 'lucide-react';

export default function AiAdvisorPage() {
  const [topic, setTopic] = useState('FEED');
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [advice, setAdvice] = useState(null);

  const predefinedTopics = [
    { id: 'FEED', label: '🌾 Feed & Ration', desc: 'Optimal fodder, dry matter & protein balance' },
    { id: 'MILK_YIELD', label: '🥛 Milk & Fat % Boost', desc: 'Increasing lactation yields and SNF percentage' },
    { id: 'HEALTH', label: '🩺 Disease & Mastitis', desc: 'Preventative veterinary protocols and symptoms' },
    { id: 'GENERAL', label: '💡 Farm Profitability', desc: 'Breeding cycles, dry periods, farm optimization' },
  ];

  const handleAsk = async (customTopic = null, customQuestion = null) => {
    setLoading(true);
    try {
      const activeTopic = customTopic || topic;
      const activeQuestion = customQuestion || question;
      const res = await DairyApi.getAiAdvice({
        topic: activeTopic,
        question: activeQuestion || 'General best practices advice',
      });
      setAdvice(res);
    } catch (err) {
      alert('Error fetching AI advice: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-800 rounded-2xl p-6 text-white shadow-md">
        <div className="flex items-center gap-2.5 mb-2">
          <span className="p-2 rounded-xl bg-white/20 backdrop-blur-md text-emerald-100">
            <Bot className="w-5 h-5" />
          </span>
          <span className="text-xs uppercase font-bold tracking-wider text-emerald-200">
            AI-Powered Smart Dairy Assistant
          </span>
        </div>
        <h2 className="text-2xl font-black">Dairy Veterinary & Nutrition Advisory</h2>
        <p className="text-sm text-emerald-100 mt-1 max-w-2xl leading-relaxed">
          Ask questions or get instant veterinarian-aligned recommendations for feed formulation, milk yield maximization, and cattle health alerts.
        </p>
      </div>

      {/* Quick Topic Chips */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {predefinedTopics.map((t) => (
          <button
            key={t.id}
            onClick={() => {
              setTopic(t.id);
              handleAsk(t.id, t.desc);
            }}
            className={`p-4 rounded-2xl border text-left transition-all ${
              topic === t.id 
                ? 'bg-emerald-50 border-emerald-500 shadow-sm ring-2 ring-emerald-500/20' 
                : 'bg-white border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="font-bold text-sm text-slate-900">{t.label}</div>
            <div className="text-xs text-slate-500 mt-1 line-clamp-2">{t.desc}</div>
          </button>
        ))}
      </div>

      {/* Input Search / Query Box */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-3">
        <input
          type="text"
          placeholder="Ask a specific question (e.g., 'How to increase milk fat in Gir cows?' or 'What to do for teat swelling?')..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
          className="w-full text-sm outline-none text-slate-800 placeholder-slate-400"
        />
        <button
          onClick={() => handleAsk()}
          disabled={loading}
          className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow flex items-center gap-2 transition disabled:opacity-50"
        >
          {loading ? <Sparkles className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          Ask AI
        </button>
      </div>

      {/* Advice Result Card */}
      {advice && (
        <div className="bg-white rounded-2xl border border-emerald-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-emerald-800 font-bold text-base border-b border-slate-100 pb-3">
            <Lightbulb className="w-5 h-5 text-emerald-600" />
            {advice.summary}
          </div>

          <div className="p-4 bg-emerald-50/70 rounded-xl text-sm font-medium text-emerald-950 leading-relaxed border border-emerald-100">
            {advice.recommendation}
          </div>

          {advice.actionableTips && advice.actionableTips.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Actionable Checklist for Farm Helper:
              </h4>
              <ul className="space-y-2">
                {advice.actionableTips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {advice.disclaimer && (
            <div className="flex items-center gap-2 pt-3 border-t border-slate-100 text-[11px] text-slate-400">
              <AlertCircle className="w-4 h-4 shrink-0 text-slate-400" />
              <span>{advice.disclaimer}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
