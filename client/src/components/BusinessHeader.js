// src/components/BusinessHeader.js
const BusinessHeader = ({ garage }) => {
  if (!garage) return null;

  return (
    <div className="p-4 border-b bg-white">
     <h1> <div className="text-xl font-semibold">{garage.name}</div></h1>
      
      <div className="flex items-center mt-2 space-x-4">
        <div className="bg-green-600 text-white px-2 py-1 rounded text-sm">★ 4.0</div>
        <div className="text-sm text-gray-600">1 Rating • Claimed</div>
        <div className="text-sm text-gray-600">• 10+ Years in Business</div> {/* Static as API doesn't include it */}
      </div>

      <div className="mt-2 flex flex-wrap gap-2 text-sm">
        <div className="text-gray-700">📍 {garage.address}</div>
        <div className="text-green-600">Open until 10:00 pm</div> {/* Static for now */}
      </div>

      <div className="mt-4 flex gap-2 flex-wrap">
        <button className="bg-green-600 text-white px-3 py-1 rounded">
          📞 {garage.contact || 'Show Number'}
        </button>
        <button className="bg-blue-600 text-white px-3 py-1 rounded">Best Deal</button>
        <button className="bg-green-500 text-white px-3 py-1 rounded">🟢 WhatsApp</button>
        <button className="border px-3 py-1 rounded">✏️</button>
      </div>
    </div>
  );
};

export default BusinessHeader;
