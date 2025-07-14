import React from 'react'

const SearchStudent = ({searchQuery, setSearchQuery}) => {
  return (
    <div className="w-84">
      <input
        type="text"
        placeholder="🔍 Search by name, student no. or email"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border border-gray-300 w-full px-4 py-2 rounded-md shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  )
}

export default SearchStudent