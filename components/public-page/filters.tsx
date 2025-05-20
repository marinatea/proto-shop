import { useState, useEffect } from 'react';
import { SearchInput } from '../user/search';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { FilterItem } from 'types/types';

interface FiltersProps {
  onFilterChange: (filters: Record<string, boolean>) => void;
}

const Filters = ({ onFilterChange }: FiltersProps) => {
  const [filters, setFilters] = useState<Record<string, boolean>>({});
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const [filterData, setFilterData] = useState<FilterItem[]>([]);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const response = await fetch('/api/filters');
        const data = await response.json();
        console.log('Dane filtrów z API:', data);
        setFilterData(data.filters);
        console.log('Załadowane filtry:', data.filters);
        setFilters(
          Object.fromEntries(
            data.filters.map((f: FilterItem) => [f.name, false])
          )
        );
      } catch (error) {
        console.error('Error fetching filters:', error);
      }
    };

    fetchFilters();
  }, []);

  const toggleFilter = (filter: string, index: number) => {
    setOpenMenu(openMenu === index ? null : index);
  };

  const handleSubfilterChange = (subfilter: string) => {
    const updatedFilters = { ...filters, [subfilter]: !filters[subfilter] };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  return (
    <div className="w-1/4 pr-4">
      <h2 className="text-2xl font-semibold mb-4">Filter Templates</h2>

      <div className="space-y-4">
        <SearchInput />
        {filterData.map((filter, index) => (
          <div key={index}>
            <button
              onClick={() => toggleFilter(filter.name, index)}
              className="w-full flex items-center justify-start text-left p-2 gap-3 bg-gray-800 hover:bg-gray-700 rounded"
            >
              {openMenu === index ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
              {filter.name}
            </button>

            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                openMenu === index
                  ? 'h-auto opacity-100'
                  : 'h-0 opacity-0'
              }`}
            >
              <div className="space-y-2 pl-4 pt-3">
                {filter.subfilters.map((subfilter, subIndex) => (
                  <label key={subIndex} className="flex items-center pt-1">
                    <input
                      type="checkbox"
                      className="checkbox-custom form-checkbox peer"
                      checked={!!filters[subfilter]}
                      onChange={() => handleSubfilterChange(subfilter)}
                    />
                    <span className="ml-2">{subfilter}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filters;