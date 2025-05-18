// src/components/ContactSidebar.js
import React from 'react';

const ContactSidebar = ({ garage }) => {
  if (!garage) return null;

  const { contact, address, location, name, description, verified, services, vehicleTypes } = garage;

  const mapsUrl = location?.coordinates
    ? `https://www.google.com/maps?q=${location.coordinates[1]},${location.coordinates[0]}`
    : '#';

  return (
    <div className="bg-white p-4 border rounded text-sm w-full md:w-64">
      {/* Name and Verified */}
      <div className="text-lg font-semibold mb-1">{name}</div>
      <div className="text-sm text-gray-600 mb-3">
        {verified ? '✅ Verified' : '❌ Not Verified'}
      </div>

      {/* Contact Number */}
      <div className="mb-2 text-blue-600 cursor-pointer">📞 {contact || 'Show Number'}</div>

      {/* Address and Map */}
      <div>
        <strong>Address</strong>
        <p className="mt-1">{address || 'Address not available'}</p>
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 text-sm mt-1 underline block"
        >
          📍 Get Directions
        </a>
        <button
          className="text-blue-600 text-sm underline"
          onClick={() => navigator.clipboard.writeText(address || '')}
        >
          📋 Copy
        </button>
      </div>

      {/* Description */}
      {description && (
        <div className="mt-3">
          <strong>Description</strong>
          <p className="text-gray-700">{description}</p>
        </div>
      )}

      {/* Services */}
      {services?.length > 0 && (
        <div className="mt-3">
          <strong>Services</strong>
          <ul className="list-disc list-inside text-gray-700">
            {services.map((service) => (
              <li key={service._id}>{service.name} – ₹{service.price}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Vehicle Types */}
      {vehicleTypes?.length > 0 && (
        <div className="mt-3">
          <strong>Vehicle Types</strong>
          <p className="text-gray-700">{vehicleTypes.join(', ')}</p>
        </div>
      )}

      {/* Footer Actions */}
      <div className="mt-4 text-green-600">🟢 Open until 10:00 pm</div>

      <ul className="mt-3 space-y-2 text-gray-700">
        <li>🕒 Suggest New Timings</li>
        <li>✉️ Get info via SMS/Email</li>
        <li>🔗 Share</li>
        <li>⭐ Tap to rate</li>
        <li>✏️ Edit this Listing</li>
        <li>🌐 Add Website</li>
      </ul>
    </div>
  );
};

export default ContactSidebar;
