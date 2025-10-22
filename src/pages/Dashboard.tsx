import SignupChart from '../pages/chart/Signuptrend';
import { Tabs, type TabItem } from '../components/tab/Tabs';

const Dashboard = () => {
  const tabItems: TabItem[] = [
    {
      id: 'signup',
      label: '회원가입 추세',
      content: <SignupChart />,
    },
    {
      id: 'withdraw',
      label: '회원탈퇴 추세',
      content: <div>회원탈퇴 차트 (준비중)</div>,
    },
    {
      id: 'reason',
      label: '탈퇴 사유 분석',
      content: <div>탈퇴 사유 차트 (준비중)</div>,
    },
  ];

  return (
    <div className="p-6 w-full h-screen">
      <Tabs items={tabItems} defaultValue="signup" />
    </div>
  );
};

export default Dashboard;