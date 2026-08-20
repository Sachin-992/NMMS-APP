import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { getSubjects, getTopics, getConcepts } from '../../services/storage';
import { EmptyState } from '../../components/ui/EmptyState';
import { ArrowLeft, BookOpen, ChevronRight, ShieldCheck } from 'lucide-react';

export const TopicListPage: React.FC = () => {
  const { subjectCode } = useParams<{ subjectCode: string }>();
  const { language } = useLanguage();
  const navigate = useNavigate();

  const subjects = getSubjects();
  const subject = subjects.find(s => s.code === subjectCode);

  if (!subject) {
    return (
      <EmptyState
        title="Subject Not Found"
        description="The requested subject code is invalid."
        action={{ label: 'Back to Subjects', onClick: () => navigate('/learn') }}
      />
    );
  }

  const topics = getTopics(subject.id);

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
        <Link to="/learn" className="hover:text-blue-600 transition-colors">Subjects</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-900 font-bold">{language === 'ta' ? subject.name_ta : subject.name_en}</span>
      </div>

      {/* Page Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {language === 'ta' ? subject.name_ta : subject.name_en}
          </h1>
          <p className="mt-1 text-sm text-slate-500 font-medium">
            {language === 'ta' ? subject.description_ta : subject.description_en}
          </p>
        </div>

        <button
          onClick={() => navigate('/learn')}
          className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-xs px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
      </div>

      {/* Topics List */}
      {topics.length === 0 ? (
        <EmptyState
          icon={BookOpen}
          title="No Topics Added Yet"
          description="Topics for this subject will be published soon."
        />
      ) : (
        <div className="space-y-4">
          {topics.map(topic => {
            const concepts = getConcepts(topic.id);
            return (
              <div
                key={topic.id}
                onClick={() => navigate(`/concept/${topic.id}`)}
                className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-md hover:border-blue-300 transition-all cursor-pointer space-y-4 group"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h2 className="text-lg font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {language === 'ta' ? topic.title_ta : topic.title_en}
                  </h2>
                  <span className="text-xs font-extrabold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-100 self-start sm:self-auto">
                    {concepts.length} {concepts.length === 1 ? 'Concept' : 'Concepts'}
                  </span>
                </div>

                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  {language === 'ta' ? topic.description_ta : topic.description_en}
                </p>

                {topic.source_evidence && (
                  <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Evidence: {topic.source_evidence}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
