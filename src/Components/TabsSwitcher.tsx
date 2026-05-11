
interface TabItem<T extends string> {
  value: T;
  label: string;
  count?: number;
}

interface TabsSwitcherProps<T extends string> {
  tabs: TabItem<T>[];
  activeTab: T;
  onChange: (tab: T) => void;
  className?: string;
}

export default function TabsSwitcher<T extends string>({
  tabs,
  activeTab,
  onChange,
  className = "",
}: TabsSwitcherProps<T>) {
  return (
    <div className={`flex border-b border-gray-200 mb-5 ${className}`}>
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={`px-5 py-2 border-b-2 font-medium text-sm transition-colors ${
            activeTab === tab.value
              ? "border-blue-500 text-blue-500"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          {tab.label}

          {tab.count !== undefined && (
            <span className="ml-1">({tab.count})</span>
          )}
        </button>
      ))}
    </div>
  );
}