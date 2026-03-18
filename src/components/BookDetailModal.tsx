import { useEffect } from 'react';
import { X, Bookmark } from 'lucide-react';
import type { Book } from '../types/book';
import { PILLAR_COLORS, SECONDARY_CATEGORY_COLORS } from '../utils/pillars';

interface Props {
  book: Book;
  onClose: () => void;
  bookmarked: Set<string>;
  onToggleBookmark: (bookId: string) => void;
  onFilterByCategory: (category: string) => void;
}

export default function BookDetailModal({
  book,
  onClose,
  bookmarked,
  onToggleBookmark,
  onFilterByCategory,
}: Props) {
  const pillarColor = PILLAR_COLORS[book.pillar];
  const isBookmarked = bookmarked.has(book.id);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <X size={14} />
        </button>

        {/* Cover + meta */}
        <div className="modal-cover-row">
          <div className="modal-cover">
            {book.coverImage ? (
              <img src={book.coverImage} alt={book.title} />
            ) : (
              <div
                className="modal-cover-placeholder"
                style={{
                  background: `linear-gradient(135deg, ${pillarColor}33 0%, ${pillarColor}66 100%)`,
                  height: '100%',
                }}
              >
                {book.title}
              </div>
            )}
          </div>
          <div className="modal-meta">
            <div className="modal-title">{book.title}</div>
            <div className="modal-author">{book.author}</div>

            <span
              className="inspector-pillar"
              style={{ background: pillarColor, alignSelf: 'flex-start' }}
            >
              {book.pillar}
            </span>

            {/* Secondary categories */}
            {book.secondaryCategories && book.secondaryCategories.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 4 }}>
                {book.secondaryCategories.map((cat) => {
                  const catColor = SECONDARY_CATEGORY_COLORS[cat];
                  return (
                    <span
                      key={cat}
                      className="secondary-chip"
                      style={{ cursor: 'pointer' }}
                      onClick={() => { onFilterByCategory(cat); onClose(); }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.background = catColor;
                        (e.currentTarget as HTMLElement).style.borderColor = catColor;
                        (e.currentTarget as HTMLElement).style.color = '#fff';
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.background = '';
                        (e.currentTarget as HTMLElement).style.borderColor = '';
                        (e.currentTarget as HTMLElement).style.color = '';
                      }}
                    >
                      {cat}
                    </span>
                  );
                })}
              </div>
            )}

            {/* Tags */}
            {book.tags && book.tags.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 4 }}>
                {book.tags.map((tag) => (
                  <span key={tag} className="tag-chip">{tag}</span>
                ))}
              </div>
            )}

            {/* Bookmark */}
            <button
              className={`btn-icon ${isBookmarked ? 'bookmarked' : ''}`}
              style={{ marginTop: 'auto', alignSelf: 'flex-start' }}
              onClick={() => onToggleBookmark(book.id)}
              title={isBookmarked ? 'Remove bookmark' : 'Add to send list'}
            >
              <Bookmark size={14} fill={isBookmarked ? 'currentColor' : 'none'} />
              <span style={{ marginLeft: 6, fontSize: 12 }}>
                {isBookmarked ? 'Saved' : 'Save'}
              </span>
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="modal-body">
          <div>
            <div className="modal-section-label">Synopsis</div>
            <p className="modal-text">{book.synopsis}</p>
          </div>

          {book.commentary && (
            <div>
              <div className="modal-section-label">Gambrell Foundation Commentary</div>
              <p className="modal-commentary">{book.commentary}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
