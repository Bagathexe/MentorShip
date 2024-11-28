import React from 'react'
import { Search, Filter } from 'lucide-react'
import { MentorFilter as MentorFilterType } from '../../types/mentor'
import { Button } from '../ui/Button'

interface MentorFilterProps {
  filters: MentorFilterType
  onFilterChange: (filters: MentorFilterType) => void
}

export const MentorFilter: React.FC<MentorFilterProps> = ({
  filters,
  onFilterChange,
}) => {
  const expertiseOptions = [
    'React',
    'Node.js',
    'Python',
    'Java',
    'Machine Learning',
    'Data Science',
    'DevOps',
    'Cloud Computing',
  ]

  const languageOptions = ['English', 'Spanish', 'French', 'German', 'Chinese']

  return (
    <div className="space-y-6 rounded-lg bg-white p-6 shadow-lg">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search mentors..."
          className="w-full rounded-lg border py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div>
        <h3 className="mb-2 font-semibold">Expertise</h3>
        <div className="flex flex-wrap gap-2">
          {expertiseOptions.map((expertise) => (
            <button
              key={expertise}
              onClick={() =>
                onFilterChange({
                  ...filters,
                  expertise: filters.expertise?.includes(expertise)
                    ? filters.expertise.filter((e) => e !== expertise)
                    : [...(filters.expertise || []), expertise],
                })
              }
              className={`rounded-full px-3 py-1 text-sm ${
                filters.expertise?.includes(expertise)
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {expertise}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-2 font-semibold">Languages</h3>
        <div className="flex flex-wrap gap-2">
          {languageOptions.map((language) => (
            <button
              key={language}
              onClick={() =>
                onFilterChange({
                  ...filters,
                  languages: filters.languages?.includes(language)
                    ? filters.languages.filter((l) => l !== language)
                    : [...(filters.languages || []), language],
                })
              }
              className={`rounded-full px-3 py-1 text-sm ${
                filters.languages?.includes(language)
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {language}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-2 font-semibold">Price Range</h3>
        <div className="flex items-center space-x-4">
          <input
            type="number"
            placeholder="Min"
            className="w-24 rounded-lg border px-3 py-1"
            value={filters.priceRange?.min || ''}
            onChange={(e) =>
              onFilterChange({
                ...filters,
                priceRange: {
                  ...filters.priceRange,
                  min: Number(e.target.value),
                },
              })
            }
          />
          <span>-</span>
          <input
            type="number"
            placeholder="Max"
            className="w-24 rounded-lg border px-3 py-1"
            value={filters.priceRange?.max || ''}
            onChange={(e) =>
              onFilterChange({
                ...filters,
                priceRange: {
                  ...filters.priceRange,
                  max: Number(e.target.value),
                },
              })
            }
          />
        </div>
      </div>

      <div>
        <h3 className="mb-2 font-semibold">Rating</h3>
        <input
          type="range"
          min="0"
          max="5"
          step="0.5"
          value={filters.rating || 0}
          onChange={(e) =>
            onFilterChange({
              ...filters,
              rating: Number(e.target.value),
            })
          }
          className="w-full"
        />
        <div className="flex justify-between text-sm text-gray-600">
          <span>Any</span>
          <span>{filters.rating || 0}+ Stars</span>
        </div>
      </div>

      <Button
        onClick={() => onFilterChange({})}
        variant="outline"
        className="w-full"
      >
        <Filter className="mr-2 h-4 w-4" />
        Reset Filters
      </Button>
    </div>
  )
}