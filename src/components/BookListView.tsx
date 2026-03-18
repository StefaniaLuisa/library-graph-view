import { Bookmark, ExternalLink, BookOpen } from 'lucide-react';
import type { Book } from '../types/book';
import { PILLAR_COLORS } from '../utils/pillars';

interface Props {
  books: Book[];
  bookmarked: Set<string>;
  onToggleBookmark: (bookId: string) => void;
  onLearnMore: (book: Book) => void;
  onSelectBook: (book: Book) => void;
}

export default function BookListView({
  books,
  bookmarked,
  onToggleBookmark,
  onLearnMore,
  onSelectBook,
}: Props) {
  if (books.length === 0) {
    return (
      <div className="list-view" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: 14 }}>
          <BookOpen size={40} style={{ opacity: 0.3, marginBottom: 12 }} />
          <p>No books match your current filters.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="list-view">
      <div className="list-grid">
        {books.map((book) => {
          const color = PILLAR_COLORS[book.pillar];
          const isBookmarked = bookmarked.has(book.id);

          return (
            <div
              key={book.id}
              className="book-card"
              onClick={() => onSelectBook(book)}
            >
              {/* Cover */}
              {book.coverImage ? (
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="book-card-cover"
                />
              ) : (
                <div
                  className="book-card-cover-placeholder"
                  style={{
                    background: `linear-gradient(135deg, ${color}22 0%, ${color}44 100%)`,
                    borderBottom: `2px solid ${color}`,
                  }}
                >
                  <BookOpen size={24} style={{ color, marginBottom: 8 }} />
                  <span style={{ color, fontWeight: 700, fontSize: 11 }}>
                    {book.title}
                  </span>
                </div>
              )}

              <div className="book-card-body">
                <div className="book-card-title">{book.title}</div>
                <div className="book-card-author">{book.author}</div>
                <div className="book-card-pillar" style={{ color }}>
                  <span
                    className="chip-dot"
                    style={{ background: color, width: 6, height: 6, borderRadius: '50%', display: 'inline-block' }}
                  />
                  {book.pillar}
                </div>
                {book.secondaryCategories && book.secondaryCategories.length > 0 && (
                  <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 2 }}>
                    {book.secondaryCategories[0]}
                    {book.secondaryCategories.length > 1 && ` +${book.secondaryCategories.length - 1}`}
                  </div>
                )}
              </div>

              <div className="book-card-actions" onClick={(e) => e.stopPropagation()}>
                <button
                  className="learn-more-link"
                  onClick={() => onLearnMore(book)}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <ExternalLink size={10} />
                    Learn More
                  </span>
                </button>
                <button
                  className={`btn-icon ${isBookmarked ? 'bookmarked' : ''}`}
                  style={{ width: 28, height: 28, borderRadius: 6 }}
                  onClick={() => onToggleBookmark(book.id)}
                  title={isBookmarked ? 'Remove bookmark' : 'Save'}
                >
                  <Bookmark size={12} fill={isBookmarked ? 'currentColor' : 'none'} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
