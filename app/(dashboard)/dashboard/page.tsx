import { PerformanceAnalysis } from '@/components/PerformanceAnalysis';
import { ResultsChart } from '@/components/ResultsChart';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Din dashboard</h1>
      <ResultsChart />
      <PerformanceAnalysis />
    </div>
  );
}
