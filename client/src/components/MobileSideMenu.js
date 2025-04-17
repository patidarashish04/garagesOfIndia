import { useState } from "react";
import { ChevronDown, ChevronUp, X } from "lucide-react";

const MenuItem = ({ title }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b">
      <button
        className="flex justify-between items-center w-full p-3 text-lg font-medium hover:bg-gray-100"
        onClick={() => setOpen(!open)}
      >
        {title}
        {open ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      {open && <div className="p-3 text-gray-600">Content for {title}</div>}
    </div>
  );
};

export default function CollapsibleMenu() {
  return (
    <div className="w-80 bg-white shadow-lg rounded-md p-4 relative">
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-2 mb-2">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/0/08/Cars24_logo.png"
          alt="Cars24 Logo"
          className="h-6"
        />
        <X className="cursor-pointer" />
      </div>

      {/* Menu Items */}
      <MenuItem title="Buy used car" />
      <MenuItem title="Sell car" />
      <MenuItem title="Car finance" />
      <MenuItem title="New car" />
      <MenuItem title="Car services" />
    </div>
  );
}
