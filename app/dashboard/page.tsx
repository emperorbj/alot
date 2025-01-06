import MiddleSection from '../components/dashboard/MiddleSection';
import RightSection from '../components/dashboard/RightSection';
import DashboardLayout from '../components/layouts/DashboardLayout';

export default function DashboardHome() {
  return (
    <DashboardLayout>
      <MiddleSection/>
      <RightSection/>
    </DashboardLayout>
  );
}
