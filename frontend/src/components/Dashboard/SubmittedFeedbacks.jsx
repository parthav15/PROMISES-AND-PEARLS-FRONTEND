import { useState } from 'react';
import { Gem, Sparkles, AlertCircle, Check, X, Clock } from 'lucide-react';

const SubmittedFeedbacks = () => {
  const [feedbacks] = useState([
    {
      id: 1,
      title: 'Feature Request: Night Mode',
      content: 'It would be great to have a dark mode option...',
      status: 'pending',
      date: '3 days ago'
    },
    {
      id: 2,
      title: 'Bug Report: Camera Feed Issue',
      content: 'Experiencing lag in the camera feed...',
      status: 'resolved',
      date: '1 week ago'
    },
    {
      id: 3,
      title: 'Suggestion: Mobile App',
      content: 'Would love to see a mobile version...',
      status: 'reviewing',
      date: '2 weeks ago'
    }
  ]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'resolved':
        return <Check className="w-5 h-5 text-green-400" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-amber-400" />;
      case 'reviewing':
        return <AlertCircle className="w-5 h-5 text-purple-400" />;
      default:
        return <X className="w-5 h-5 text-red-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'resolved':
        return 'bg-green-400/10 text-green-400';
      case 'pending':
        return 'bg-amber-400/10 text-amber-400';
      case 'reviewing':
        return 'bg-purple-400/10 text-purple-400';
      default:
        return 'bg-red-400/10 text-red-400';
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-purple-400 bg-clip-text text-transparent">
        <Gem className="inline-block w-8 h-8 mr-2" />
        Submitted Feedbacks
      </h2>

      <div className="space-y-6">
        {feedbacks.map((feedback) => (
          <div key={feedback.id} className="bg-white/5 p-6 rounded-xl border border-white/20 shadow-lg hover:border-amber-400/30 transition-colors">
            <div className="flex items-center justify-between">
              <h3 className="text-white font-semibold text-lg">{feedback.title}</h3>
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${getStatusColor(feedback.status)}`}>
                {getStatusIcon(feedback.status)}
                <span className="text-sm capitalize">{feedback.status}</span>
              </div>
            </div>

            <p className="text-purple-300 text-sm mt-3">{feedback.content}</p>

            <div className="flex items-center justify-between mt-4">
              <span className="text-purple-400 text-xs">{feedback.date}</span>
              <button className="text-amber-400 hover:text-amber-300 text-sm flex items-center gap-1 group">
                View Details
                <Sparkles className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        {[
          { label: 'Total Feedbacks', value: '12', color: 'text-white' },
          { label: 'Resolved', value: '8', color: 'text-green-400' },
          { label: 'Pending', value: '3', color: 'text-amber-400' },
          { label: 'In Review', value: '1', color: 'text-purple-400' },
        ].map((stat, index) => (
          <div key={index} className="bg-white/5 p-6 rounded-xl border border-white/20 shadow-lg">
            <p className="text-purple-300 text-sm mb-2">{stat.label}</p>
            <p className={`text-3xl font-bold ${stat.color} flex items-center gap-2`}>
              {stat.value}
              <Sparkles className="w-5 h-5 text-current opacity-50" />
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubmittedFeedbacks;