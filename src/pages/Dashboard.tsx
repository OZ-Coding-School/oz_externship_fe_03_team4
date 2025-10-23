import SignupChart from '../pages/chart/Signuptrend';
import { Tabs, type TabItem } from '../components/tab/Tabs';
import { useState } from 'react';
import { Select } from '../components/FormUI/Select';

const Dashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('월별');

  const periodItems = [
    { id: 'monthly', label: '월별' },
    { id: 'yearly', label: '연도별' },
  ];

  const handlePeriodSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPeriod(e.target.value);
  };

  const tabItems: TabItem[] = [
    {
      id: 'signup',
      label: '회원가입 추세',
      content: (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">회원가입 추세</h2>
            <div className="w-32">
              <Select value={selectedPeriod} onChange={handlePeriodSelect}>
                {periodItems.map(item => (
                  <option key={item.id} value={item.label}>
                    {item.label}
                  </option>
                ))}
              </Select>
            </div>
          </div>
          <SignupChart period={selectedPeriod} />
        </div>
      ),
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