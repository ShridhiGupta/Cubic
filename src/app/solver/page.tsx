import { CubeSolver } from '@/components/Cube/CubeSolver';
import { Header } from '@/components/Layout/Header';

export default function SolverPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <CubeSolver />
      </main>
    </div>
  );
}
