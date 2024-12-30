import * as React from 'react';

interface TabsProps {
  defaultValue: string;
  children: React.ReactNode;
}

interface TabsListProps {
  children: React.ReactNode;
}

interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
}

interface TabsContentProps {
  value: string;
  children: React.ReactNode;
}

export function Tabs({ defaultValue, children }: TabsProps) {
  const [activeTab, setActiveTab] = React.useState(defaultValue);

  return (
    <div className="tabs-context" data-active-tab={activeTab}>
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { activeTab, setActiveTab });
        }
        return child;
      })}
    </div>
  );
}

export function TabsList({ children, activeTab, setActiveTab }: TabsListProps & { activeTab: string; setActiveTab: (value: string) => void }) {
  return (
    <div className="flex space-x-2 border-b border-gray-200 mb-4">
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { activeTab, setActiveTab });
        }
        return child;
      })}
    </div>
  );
}

export function TabsTrigger({ value, children, activeTab, setActiveTab }: TabsTriggerProps & { activeTab: string; setActiveTab: (value: string) => void }) {
  return (
    <button
      className={`px-4 py-2 font-medium text-sm rounded-t-lg ${
        activeTab === value
          ? 'text-teal-600 border-b-2 border-teal-600'
          : 'text-gray-600 hover:text-teal-600'
      }`}
      onClick={() => setActiveTab(value)}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, children, activeTab }: TabsContentProps & { activeTab: string }) {
  if (activeTab !== value) return null;
  return <div className="py-4">{children}</div>;
}