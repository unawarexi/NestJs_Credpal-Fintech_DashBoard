import DashboardOverview from '../components/dashboard/DashboardOverview';
import ActualBalance from '../components/dashboard/ActualBalance';
import TransactionHistory from '../components/dashboard/TransactionHistory';

export default function RenderContent({ pathname }: { pathname: string }) {
  switch (pathname) {
    case '/overview':
      return <DashboardOverview />;
    case '/wallet':
      return (
        <div className="flex flex-col lg:flex-row gap-6 border-b border-gray-400 pb-10 lg:pb-4">
          <div className="w-full lg:w-[30%]">
            <ActualBalance />
          </div>
          <div className="hidden lg:block w-px bg-gray-400"></div>
          <div className="w-full lg:w-3/5">
            <TransactionHistory />
          </div>
        </div>
      );
    default:
      return (
        <div className="flex flex-col items-center justify-center h-full text-gray-400">
          <div className="text-6xl">🚧</div>
          <p className="text-lg mt-4">Not available yet</p>
        </div>
      );
  }
}
