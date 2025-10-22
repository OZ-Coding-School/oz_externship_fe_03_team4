import SignupChart from '../pages/chart/Signuptrend';
import { Tabs, type TabItem } from '../components/tab/Tabs';

const Dashboard = () => {
  const tabItems: TabItem[] = [
    {
      id: 'signup',
      label: '회원가입 추세',
      content: <SignupChart />,
    },
  ];

  return (
    <div className="p-6 w-full h-screen">
      <Tabs items={tabItems} defaultValue="signup" />
    </div>
  );
};

export default Dashboard;