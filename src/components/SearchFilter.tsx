import { Search, X } from 'lucide-react';
import type { Pillar, SecondaryCategory } from '../types/book';
import { PILLARS, SECONDARY_CATEGORIES, PILLAR_COLORS, SECONDARY_CATEGORY_COLORS } from '../utils/pillars';

interface Props {
  query: string;
  onQueryChange: (q: string) => void;
  selectedPillar: Pillar | null;
  onSelectPillar: (p: Pillar | null) => void;
  selectedSecondary: SecondaryCategory | null;
  onSelectSecondary: (c: SecondaryCategory | null) => void;
  resultCount: number;
}

export default function SearchFilter({
  query,
  onQueryChange,
  selectedPillar,
  onSelectPillar,
  selectedSecondary,
  onSelectSecondary,
  resultCount,
}: Props) {
  const hasFilters = !!query || !!selectedPillar || !!selectedSecondary;

  return (
    <>
      {/* Search */}
      <div>
        <div className="sidebar-section-label">Search</div>
        <div className="search-wrap">
          <Search size={14} />
          <input
            className="search-input"
            type="text"
            placeholder="Title, author, topic…"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
          />
        </div>
        {query && (
          <div className="result-count">
            {resultCount} {resultCount === 1 ? 'book' : 'books'} found
          </div>
        )}
      </div>

      {/* Pillar filters */}
      <div>
        <div className="sidebar-section-label">Mission Pillars</div>
        <div className="filter-chips">
          {PILLARS.map((p) => {
            const active = selectedPillar === p;
            const color = PILLAR_COLORS[p];
            return (
              <button
                key={p}
                className={`chip ${active ? 'active' : ''}`}
                style={active ? { background: color } : {}}
                onClick={() => onSelectPillar(active ? null : p)}
              >
                <span
                  className="chip-dot"
                  style={{ background: color, opacity: active ? 1 : 0.7 }}
                />
                {p}
              </button>
            );
          })}
        </div>
      </div>

      {/* Secondary category filters */}
      <div>
        <div className="sidebar-section-label">Categories</div>
        <div className="filter-chips">
          {SECONDARY_CATEGORIES.map((cat) => {
            const active = selectedSecondary === cat;
            const color = SECONDARY_CATEGORY_COLORS[cat];
            return (
              <button
                key={cat}
                className={`chip ${active ? 'active' : ''}`}
                style={active ? { background: color } : {}}
                onClick={() => onSelectSecondary(active ? null : cat)}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Clear all */}
      {hasFilters && (
        <button
          className="chip"
          style={{ alignSelf: 'flex-start', color: 'var(--text-muted)' }}
          onClick={() => {
            onQueryChange('');
            onSelectPillar(null);
            onSelectSecondary(null);
          }}
        >
          <X size={11} />
          Clear filters
        </button>
      )}
    </>
  );
}
