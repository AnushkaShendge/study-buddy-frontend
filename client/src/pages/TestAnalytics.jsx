import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';

function TestAnalytics() {
  const [performance, setPerformance] = useState(null);
  const [weakAreas, setWeakAreas] = useState([]);
  const [mistakes, setMistakes] = useState([]);
  const [timeManagement, setTimeManagement] = useState([]);
  const [topicAnalysis, setTopicAnalysis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      setError('');
      try {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };
        const [perf, weak, mistakes, time, topic] = await Promise.all([
          axios.get(`${API_BASE_URL}/api/v1/testseries/analysis/performance/`, { headers }),
          axios.get(`${API_BASE_URL}/api/v1/testseries/analysis/weak_areas/`, { headers }),
          axios.get(`${API_BASE_URL}/api/v1/testseries/analysis/mistakes/`, { headers }),
          axios.get(`${API_BASE_URL}/api/v1/testseries/analysis/time_management/`, { headers }),
          axios.get(`${API_BASE_URL}/api/v1/testseries/analysis/topic/`, { headers }),
        ]);
        setPerformance(perf.data);
        setWeakAreas(weak.data);
        setMistakes(mistakes.data);
        setTimeManagement(time.data);
        setTopicAnalysis(topic.data);
      } catch (err) {
        setError('Failed to fetch analytics.');
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Test Analytics</h2>
      {loading && <div className="text-center">Loading...</div>}
      {error && <div className="text-center text-red-600">{error}</div>}
      {!loading && !error && (
        <>
          {/* Performance Summary */}
          {performance && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-blue-100 p-4 rounded shadow text-center">
                <div className="text-2xl font-bold">{performance.total_tests}</div>
                <div className="text-sm">Total Tests</div>
              </div>
              <div className="bg-green-100 p-4 rounded shadow text-center">
                <div className="text-2xl font-bold">{performance.total_score}</div>
                <div className="text-sm">Total Score</div>
              </div>
              <div className="bg-yellow-100 p-4 rounded shadow text-center">
                <div className="text-2xl font-bold">{performance.average_score}</div>
                <div className="text-sm">Average Score</div>
              </div>
              <div className="bg-purple-100 p-4 rounded shadow text-center">
                <div className="text-2xl font-bold">{performance.max_score}</div>
                <div className="text-sm">Max Score</div>
              </div>
            </div>
          )}

          {/* Weak Areas */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-2">Weak Areas</h3>
            {weakAreas.length === 0 ? <div className="text-gray-500">No weak areas found.</div> : (
              <ul className="list-disc pl-6">
                {weakAreas.map((area, idx) => (
                  <li key={idx}>{area.topic} (Wrong: {area.wrong_count})</li>
                ))}
              </ul>
            )}
          </div>

          {/* Mistakes */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-2">Mistakes</h3>
            {mistakes.length === 0 ? <div className="text-gray-500">No mistakes found.</div> : (
              <ul className="list-disc pl-6">
                {mistakes.map((m, idx) => (
                  <li key={idx}>{m.question} (Chapter: {m.chapter}, Topic: {m.topic}, Wrong: {m.wrong_count})</li>
                ))}
              </ul>
            )}
          </div>

          {/* Time Management */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-2">Time Management</h3>
            {timeManagement.length === 0 ? <div className="text-gray-500">No data.</div> : (
              <ul className="list-disc pl-6">
                {timeManagement.map((tm, idx) => (
                  <li key={idx}>Duration: {tm.duration} min, Total Questions: {tm.total_questions}, Correct: {tm.correct_answers}</li>
                ))}
              </ul>
            )}
          </div>

          {/* Topic Analysis */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-2">Topic Analysis</h3>
            {topicAnalysis.length === 0 ? <div className="text-gray-500">No data.</div> : (
              <ul className="list-disc pl-6">
                {topicAnalysis.map((t, idx) => (
                  <li key={idx}>{t.topic}: {t.correct_answers}/{t.total_questions} correct ({t.accuracy}% accuracy)</li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default TestAnalytics; 