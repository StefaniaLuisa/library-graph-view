import { useState, useMemo, useCallback } from 'react';
import { Network, LayoutGrid, Sun, Moon } from 'lucide-react';
import NetworkGraph from './components/NetworkGraph';
import BookInspector from './components/BookInspector';
import BookDetailModal from './components/BookDetailModal';
import BookListView from './components/BookListView';
import SearchFilter from './components/SearchFilter';
import { BOOKS } from './data/books';
import type { Book, Pillar, SecondaryCategory } from './types/book';
import './App.css';

type ViewMode = 'constellation' | 'list';
type Theme = 'dark' | 'light';

function searchMatches(book: Book, query: string): boolean {
  if (!query) return true;
  const q = query.toLowerCase();
  return (
    book.title.toLowerCase().includes(q) ||
    book.author.toLowerCase().includes(q) ||
    book.synopsis.toLowerCase().includes(q) ||
    (book.commentary ?? '').toLowerCase().includes(q)
  );
}

export default function App() {
  const [theme, setTheme] = useState<Theme>('dark');
  const [view, setView] = useState<ViewMode>('constellation');
  const [query, setQuery] = useState('');
  const [selectedPillar, setSelectedPillar] = useState<Pillar | null>(null);
  const [selectedSecondary, setSelectedSecondary] = useState<SecondaryCategory | null>(null);
  const [inspectedBook, setInspectedBook] = useState<Book | null>(null);
  const [hoveredBook, setHoveredBook] = useState<Book | null>(null);
  const [modalBook, setModalBook] = useState<Book | null>(null);
  const [bookmarked, setBookmarked] = useState<Set<string>>(new Set());

  // Apply theme to document root
  useMemo(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const filteredBooks = useMemo(() => {
    return BOOKS.filter((book) => {
      if (!searchMatches(book, query)) return false;
      if (selectedPillar && book.pillar !== selectedPillar) return false;
      if (selectedSecondary && !book.secondaryCategories?.includes(selectedSecondary)) return false;
      return true;
    });
  }, [query, selectedPillar, selectedSecondary]);

  const handleSelectBook = useCallback((book: Book) => {
    setInspectedBook(book);
  }, []);

  const handleHoverBook = useCallback((book: Book | null) => {
    setHoveredBook(book);
  }, []);

  const handleToggleBookmark = useCallback((bookId: string) => {
    setBookmarked((prev) => {
      const next = new Set(prev);
      if (next.has(bookId)) next.delete(bookId);
      else next.add(bookId);
      return next;
    });
  }, []);

  const handleFilterByCategory = useCallback((category: string) => {
    setSelectedSecondary(category as SecondaryCategory);
    setView('constellation');
  }, []);

  // Inspector shows pinned book (click) or hovering book
  const inspectorBook = inspectedBook ?? hoveredBook;

  return (
    <div data-theme={theme}>
      {/* Header */}
      <header className="header">
        <div className="header-logo">
          Gambrell Foundation · <span>The Library</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button
            className="btn-icon theme-toggle"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          <div className="view-toggle">
            <button
              className={view === 'constellation' ? 'active' : ''}
              onClick={() => setView('constellation')}
            >
              <Network size={14} />
              Constellation
            </button>
            <button
              className={view === 'list' ? 'active' : ''}
              onClick={() => setView('list')}
            >
              <LayoutGrid size={14} />
              Grid
            </button>
          </div>
        </div>
      </header>

      <div className="main-layout">
        {/* Left sidebar */}
        <aside className="sidebar-left">
          <SearchFilter
            query={query}
            onQueryChange={setQuery}
            selectedPillar={selectedPillar}
            onSelectPillar={setSelectedPillar}
            selectedSecondary={selectedSecondary}
            onSelectSecondary={setSelectedSecondary}
            resultCount={filteredBooks.length}
          />
        </aside>

        {/* Content area */}
        <main className="graph-area">
          {view === 'constellation' ? (
            <>
              <NetworkGraph
                books={filteredBooks}
                selectedPillar={selectedPillar}
                onSelectBook={handleSelectBook}
                onHoverBook={handleHoverBook}
                theme={theme}
              />
            </>
          ) : (
            <BookListView
              books={filteredBooks}
              bookmarked={bookmarked}
              onToggleBookmark={handleToggleBookmark}
              onLearnMore={setModalBook}
              onSelectBook={(book) => {
                setInspectedBook(book);
                setModalBook(book);
              }}
            />
          )}
        </main>

        {/* Right inspector */}
        <BookInspector
          book={inspectorBook}
          onClose={() => { setInspectedBook(null); setHoveredBook(null); }}
          onLearnMore={setModalBook}
          onFilterByCategory={handleFilterByCategory}
          bookmarked={bookmarked}
          onToggleBookmark={handleToggleBookmark}
        />
      </div>

      {/* Book detail modal */}
      {modalBook && (
        <BookDetailModal
          book={modalBook}
          onClose={() => setModalBook(null)}
          bookmarked={bookmarked}
          onToggleBookmark={handleToggleBookmark}
          onFilterByCategory={handleFilterByCategory}
        />
      )}
    </div>
  );
}
