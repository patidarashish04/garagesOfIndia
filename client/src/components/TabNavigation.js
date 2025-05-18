const TabNavigation = () => {
  return (
    <div className="flex overflow-x-auto border-b text-sm mt-4 whitespace-nowrap no-scrollbar">
      {["Overview", "Products", "Photos", "Price List", "Quick Info", "Reviews"].map(tab => (
        <div
          key={tab}
          className="px-4 py-2 hover:text-blue-600 cursor-pointer border-b-2 border-transparent hover:border-blue-600 flex-shrink-0"
        >
          {tab}
        </div>
      ))}
    </div>
  );
};

export default TabNavigation;
