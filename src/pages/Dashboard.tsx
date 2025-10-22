import SignupChart from '../pages/chart/Signuptrend';
import { Tabs, type TabItem } from '../components/tab/Tabs';
import { Accordion } from '../components/Accordion/Accordion';
import { AccordionItem, type ListItem } from '../components/Accordion/AccordionType';
import { AccordionList } from '../components/Accordion/AccordionList';
import { useState } from 'react';

const Dashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('월별');
  const [accordionValue, setAccordionValue] = useState('');

  const periodItems: ListItem[] = [
    { id: 'monthly', label: '월별' },
    { id: 'yearly', label: '연도별' },
  ];

  const handlePeriodSelect = (item: ListItem) => {
    setSelectedPeriod(item.label);
    setAccordionValue('');
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
              <Accordion 
                value={accordionValue}
                onValueChange={setAccordionValue}
                selectedLabels={{ '0': selectedPeriod }}
              >
                <AccordionItem title={selectedPeriod}>
                  <AccordionList 
                    items={periodItems} 
                    onSelectItem={handlePeriodSelect} 
                  />
                </AccordionItem>
              </Accordion>
            </div>
          </div>
          <SignupChart />
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