import React from 'react'

const SearchStudent = ({searchQuery, setSearchQuery}) => {
  return (
    <div className="flex justify-center mb-6">
      <input
        type="text"
        placeholder="🔍 Search by name, student no. or email"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border border-gray-300 px-4 py-2 rounded-md w-full max-w-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  )
}

export default SearchStudent