import SignupChart from '../pages/chart/Signuptrend';
import { Tabs, type TabItem } from '../components/tab/Tabs';
import { useState } from 'react';
import { Select } from '../components/FormUI/Select';
import Withdrawtrend from '../pages/chart/Withdrawtrend'
import WithdrawReasonmain from '../pages/chart/WithdrawReasonmain';

type Period = 'monthly' | 'yearly'

const PERIOD_ITEMS: Array<{ id: Period; label: string }> = [
  { id: 'monthly', label: '월별' },
  { id: 'yearly', label: '연도별' },
]

const Dashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<Period>('monthly')

  const handlePeriodSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPeriod(e.target.value as Period)
  }

  const tabItems: TabItem[] = [
    {
      id: 'signup',
      label: '회원가입 추세',
      content: (
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">회원가입 추세</h2>
            <div className="w-32">
              <Select value={selectedPeriod} onChange={handlePeriodSelect}>
                {PERIOD_ITEMS.map(item => (
                  <option key={item.id} value={item.id}>{item.label}</option>
                ))}
              </Select>
            </div>
          </div>
          <div className="flex-1">
            <SignupChart period={selectedPeriod} />
          </div>
        </div>
      ),
    },
    {
      id: 'withdraw',
      label: '회원탈퇴 추세',
      content: (
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">회원탈퇴 추세</h2>
            <div className="w-32">
              <Select value={selectedPeriod} onChange={handlePeriodSelect}>
                {PERIOD_ITEMS.map(item => (
                  <option key={item.id} value={item.id}>{item.label}</option>
                ))}
              </Select>
            </div>
          </div>
          <div className="flex-1">
            <Withdrawtrend period={selectedPeriod} />
          </div>
        </div>
      ),
    },
    {
      id: 'reason',
      label: '탈퇴 사유 분석',
      content: (
        <div className="flex flex-col h-full">
          <WithdrawReasonmain />
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 w-full h-full flex flex-col">
      <Tabs items={tabItems} defaultValue="signup" className="flex-1" />
    </div>
  );
};

export default Dashboard;
