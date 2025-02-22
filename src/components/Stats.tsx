import React, { useState, useEffect } from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { FileCheck, Users, Clock, Award, ArrowUpRight } from 'lucide-react';
import { statsService } from '../utils/stats';

interface StatItemProps {
  icon: React.ReactNode;
  value: number;
  label: string;
  suffix?: string;
  delay?: number;
}

function StatItem({ icon, value, label, suffix = '', delay = 0 }: StatItemProps) {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <div
      ref={ref}
      className="relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
    >
      <div className="absolute -top-4 left-6">
        <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg flex items-center justify-center transform -rotate-6 hover:rotate-0 transition-transform duration-300">
          {icon}
        </div>
      </div>
      <div className="mt-8">
        <div className="flex items-baseline space-x-1">
          <span className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            {inView ? (
              <CountUp
                end={value}
                duration={2.5}
                delay={delay}
                separator=","
                suffix={suffix}
                decimals={suffix === '/5' ? 1 : 0}
              />
            ) : (
              '0'
            )}
          </span>
        </div>
        <p className="text-gray-600 mt-2">{label}</p>
      </div>
      <div className="absolute bottom-4 right-4">
        <ArrowUpRight className="w-5 h-5 text-purple-400" />
      </div>
    </div>
  );
}

export function Stats() {
  const [stats, setStats] = useState({
    totalFiles: 0,
    uniqueVisitors: 0,
    timeSavings: 0,
    rating: 5.0
  });

  useEffect(() => {
    // Track visitor on component mount
    statsService.trackVisitor();
    
    // Get initial stats
    setStats(statsService.getStats());

    // Update stats every 30 seconds
    const interval = setInterval(() => {
      setStats(statsService.getStats());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Real-Time Platform Statistics
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how FileRename-AI is helping users organize their files more efficiently
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <StatItem
            icon={<FileCheck className="w-6 h-6 text-white" />}
            value={stats.totalFiles}
            label="Files Processed"
            delay={0}
          />
          <StatItem
            icon={<Users className="w-6 h-6 text-white" />}
            value={stats.uniqueVisitors}
            label="Unique Visitors"
            delay={0.2}
          />
          <StatItem
            icon={<Clock className="w-6 h-6 text-white" />}
            value={stats.timeSavings}
            label="Time Saved"
            suffix="%"
            delay={0.4}
          />
          <StatItem
            icon={<Award className="w-6 h-6 text-white" />}
            value={stats.rating}
            label="User Rating"
            suffix="/5"
            delay={0.6}
          />
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 text-purple-600">
            <span className="text-sm font-medium">
              Statistics updated in real-time
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}