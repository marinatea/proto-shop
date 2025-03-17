// components/public-page/filters.tsx
import { useState } from 'react';
import { FilterState } from 'types/types';
import { SearchInput } from '../user/search';

const Filters = ({
  onFilterChange
}: {
  onFilterChange: (filters: FilterState) => void;
}) => {
  const [filters, setFilters] = useState<FilterState>({
    filter1: false,
    filter2: false,
    filter3: false,
    filter4: false,
    filter5: false,
    filter6: false,
    filter7: false
  });

  const toggleFilter = (filter: string) => {
    const updatedFilters = { ...filters, [filter]: !filters[filter] };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  return (
    <div className="w-1/4 pr-4">
      <h2 className="text-2xl font-semibold mb-4">Filter Templates</h2>

      <div className="space-y-4">
        <SearchInput />
        {[
          'filter1',
          'filter2',
          'filter3',
          'filter4',
          'filter5',
          'filter6',
          'filter7'
        ].map((filter, index) => (
          <div key={index}>
            <button
              onClick={() => toggleFilter(filter)}
              className="w-full text-left p-2 bg-gray-800 hover:bg-gray-700 rounded"
            >
              {`Filter ${index + 1}`}
            </button>
            {filters[filter] && (
              <div className="space-y-2 pl-4">
                <label className="inline-flex items-center">
                  <input type="checkbox" className="form-checkbox" />
                  <span className="ml-2">Subfilter 1</span>
                </label>
                <label className="inline-flex items-center">
                  <input type="checkbox" className="form-checkbox" />
                  <span className="ml-2">Subfilter 2</span>
                </label>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filters;
