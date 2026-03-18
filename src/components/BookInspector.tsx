import { useState } from 'react';
import { X, Bookmark, BookOpen, ExternalLink } from 'lucide-react';
import type { Book } from '../types/book';
import { PILLAR_COLORS, SECONDARY_CATEGORY_COLORS } from '../utils/pillars';

interface Props {
  book: Book | null;
  onClose: () => void;
  onLearnMore: (book: Book) => void;
  onFilterByCategory: (category: string) => void;
  bookmarked: Set<string>;
  onToggleBookmark: (bookId: string) => void;
}

export default function BookInspector({
  book,
  onClose,
  onLearnMore,
  onFilterByCategory,
  bookmarked,
  onToggleBookmark,
}: Props) {
  const [hoveredCat, setHoveredCat] = useState<string | null>(null);

  if (!book) {
    return (
      <div className="inspector-panel">
        <div className="inspector-empty">
          <BookOpen size={40} />
          <p>Hover over or click a book in the constellation to explore it here.</p>
        </div>
      </div>
    );
  }

  const pillarColor = PILLAR_COLORS[book.pillar];
  const isBookmarked = bookmarked.has(book.id);

  return (
    <div className="inspector-panel">
      {/* Cover */}
      {book.coverImage ? (
        <img src={book.coverImage} alt={book.title} className="inspector-cover" />
      ) : (
        <div
          className="inspector-cover-placeholder"
          style={{
            background: `linear-gradient(135deg, ${pillarColor}22 0%, ${pillarColor}44 100%)`,
            borderBottom: `3px solid ${pillarColor}`,
          }}
        >
          <BookOpen size={28} style={{ color: pillarColor, marginBottom: 8 }} />
          <span style={{ color: pillarColor, fontWeight: 700, fontSize: 12 }}>
            {book.title}
          </span>
        </div>
      )}

      <div className="inspector-body" key={book.id}>
        {/* Close */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: -4 }}>
          <button className="btn-icon" onClick={onClose} title="Close">
            <X size={14} />
          </button>
        </div>

        {/* Title + Author */}
        <div>
          <div className="inspector-title">{book.title}</div>
          <div className="inspector-author">{book.author}</div>
        </div>

        {/* Pillar */}
        <div>
          <div className="sidebar-section-label">Mission Pillar</div>
          <span
            className="inspector-pillar"
            style={{ background: pillarColor }}
          >
            {book.pillar}
          </span>
        </div>

        {/* Secondary categories */}
        {book.secondaryCategories && book.secondaryCategories.length > 0 && (
          <div>
            <div className="sidebar-section-label">Categories</div>
            <div className="inspector-secondary">
              {book.secondaryCategories.map((cat) => {
                const catColor = SECONDARY_CATEGORY_COLORS[cat];
                const isHov = hoveredCat === cat;
                return (
                  <span
                    key={cat}
                    className="secondary-chip"
                    style={
                      isHov
                        ? { background: catColor, borderColor: catColor, color: '#fff' }
                        : {}
                    }
                    onMouseEnter={() => setHoveredCat(cat)}
                    onMouseLeave={() => setHoveredCat(null)}
                    onClick={() => onFilterByCategory(cat)}
                  >
                    {cat}
                  </span>
                );
              })}
            </div>
          </div>
        )}

        {/* Tags */}
        {book.tags && book.tags.length > 0 && (
          <div className="inspector-tags">
            {book.tags.map((tag) => (
              <span key={tag} className="tag-chip">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Synopsis */}
        <div>
          <div className="sidebar-section-label">About</div>
          <p className="inspector-synopsis">{book.synopsis}</p>
        </div>

        {/* Commentary */}
        {book.commentary && (
          <div>
            <div className="sidebar-section-label">Gambrell Commentary</div>
            <p className="inspector-commentary">{book.commentary}</p>
          </div>
        )}

        {/* Actions */}
        <div className="inspector-actions">
          <button className="btn-primary" onClick={() => onLearnMore(book)}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center' }}>
              <ExternalLink size={13} />
              Learn More
            </span>
          </button>
          <button
            className={`btn-icon ${isBookmarked ? 'bookmarked' : ''}`}
            onClick={() => onToggleBookmark(book.id)}
            title={isBookmarked ? 'Remove bookmark' : 'Bookmark'}
          >
            <Bookmark size={14} fill={isBookmarked ? 'currentColor' : 'none'} />
          </button>
        </div>
      </div>
    </div>
  );
}
