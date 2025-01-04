import DashboardLayout from '../components/layouts/DashboardLayout';

export default function DashboardHome() {
  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold">Welcome to the Dashboard</h2>
      <p>Here is your summary and quick actions.</p>
    </DashboardLayout>
  );
}
