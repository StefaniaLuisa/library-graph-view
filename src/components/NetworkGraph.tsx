import { useRef, useEffect } from 'react';
import cytoscape from 'cytoscape';
import type { Book } from '../types/book';
import type { Pillar } from '../types/book';
import { PILLAR_COLORS, PILLARS } from '../utils/pillars';

interface Props {
  books: Book[];
  selectedPillar: Pillar | null;
  onSelectBook: (book: Book) => void;
  onHoverBook: (book: Book | null) => void;
  theme: 'dark' | 'light';
}

// ── Node dimensions ──────────────────────────────────────────────────────────
const BOOK_W = 128;
const BOOK_H = 40;
const BOOK_FONT = 12;
const PILLAR_W = 116;
const PILLAR_H = 38;
const PILLAR_FONT = 13;

// ── Virtual layout constants (units = "pixels" in Cytoscape graph-space) ────
// The layout is computed in abstract coordinates; Cytoscape fits it to the viewport.
// Target: layout ~725×670 units → fits ~0.75× in an ~860×615 container → ~9px displayed font.
const VCX = 1000;       // virtual center
const VCY = 1000;
const PILLAR_R = 140;   // radius of the pillar hexagon
const BASE_DIST = 88;   // radial distance from pillar hub to first book row
const ROW_GAP = 56;     // radial gap between book rows
const COL_GAP = 145;    // perpendicular gap between book columns
const COLS = 3;         // books per row

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getStylesheet(theme: 'dark' | 'light'): any[] {
  const isDark = theme === 'dark';
  const textColor = isDark ? '#e2e8f0' : '#1e293b';
  const bookBg = isDark ? '#1a2336' : '#ffffff';
  const edgePillarColor = isDark ? '#2d3e56' : '#d1d5db';
  const edgeSecondaryColor = isDark ? '#1e3050' : '#bfdbfe';
  const edgeHighlight = isDark ? '#64748b' : '#94a3b8';

  return [
    {
      selector: 'node',
      style: {
        'font-family': 'system-ui, -apple-system, "Segoe UI", sans-serif',
        'transition-property': 'opacity',
        'transition-duration': 150,
        'transition-timing-function': 'ease',
      },
    },
    {
      selector: 'node[nodeType="pillar"]',
      style: {
        shape: 'round-rectangle',
        width: PILLAR_W,
        height: PILLAR_H,
        'background-color': 'data(color)',
        'border-width': 0,
        label: 'data(label)',
        'font-size': PILLAR_FONT,
        'font-weight': 700,
        color: '#ffffff',
        'text-valign': 'center',
        'text-halign': 'center',
        'text-wrap': 'wrap',
        'text-max-width': PILLAR_W - 12,
        'z-index': 10,
      },
    },
    {
      selector: 'node[nodeType="book"]',
      style: {
        shape: 'round-rectangle',
        width: BOOK_W,
        height: BOOK_H,
        'background-color': bookBg,
        'border-width': 2,
        'border-color': 'data(color)',
        label: 'data(label)',
        'font-size': BOOK_FONT,
        'font-weight': 500,
        color: textColor,
        'text-valign': 'center',
        'text-halign': 'center',
        'text-wrap': 'wrap',
        'text-max-width': BOOK_W - 10,
        'z-index': 5,
      },
    },
    {
      selector: 'edge[linkType="pillar"]',
      style: {
        'curve-style': 'bezier',
        'line-color': edgePillarColor,
        width: 1.5,
        'target-arrow-shape': 'none',
        opacity: 0.85,
        'z-index': 1,
      },
    },
    {
      selector: 'edge[linkType="secondary"]',
      style: {
        'curve-style': 'bezier',
        'line-color': edgeSecondaryColor,
        'line-style': 'dashed',
        'line-dash-pattern': [4, 7],
        width: 1,
        opacity: 0.4,
        'z-index': 1,
      },
    },
    // ── Hover / pillar-filter states ─────────────────────────────────────────
    { selector: '.dimmed', style: { opacity: 0.07 } },
    {
      selector: 'node.highlighted',
      style: { 'border-width': 3, 'z-index': 20, opacity: 1 },
    },
    {
      selector: 'node[nodeType="pillar"].highlighted',
      style: { 'z-index': 20, opacity: 1, 'border-width': 0 },
    },
    {
      selector: 'edge.edge-highlighted',
      style: { 'line-color': edgeHighlight, width: 2, opacity: 1, 'z-index': 10 },
    },
  ];
}

/**
 * Pre-compute node positions in virtual (graph-space) coordinates.
 * Pillars sit on a compact hexagonal ring (radius=PILLAR_R).
 * Books fan out radially from their pillar in up to 3-column rows.
 *
 * Layout extent ≈ 725 × 670 virtual units → fits at ~0.75× in a 860×615 container
 * → displayed font ≈ 9 px (comfortably readable).
 */
function computePositions(
  books: Book[],
): Record<string, { x: number; y: number }> {
  const positions: Record<string, { x: number; y: number }> = {};

  const pillarPos: Record<string, { x: number; y: number }> = {};
  PILLARS.forEach((pillar, i) => {
    const angle = (i / PILLARS.length) * 2 * Math.PI - Math.PI / 2;
    pillarPos[pillar] = {
      x: VCX + PILLAR_R * Math.cos(angle),
      y: VCY + PILLAR_R * Math.sin(angle),
    };
    positions[`pillar__${pillar}`] = pillarPos[pillar];
  });

  const byPillar: Record<string, Book[]> = {};
  books.forEach((b) => { (byPillar[b.pillar] ??= []).push(b); });

  PILLARS.forEach((pillar) => {
    const pBooks = byPillar[pillar] ?? [];
    const { x: px, y: py } = pillarPos[pillar];

    // Unit vector pointing away from center (radial outward direction)
    const dx = px - VCX, dy = py - VCY;
    const len = Math.sqrt(dx * dx + dy * dy) || 1;
    const ox = dx / len, oy = dy / len;
    // Perpendicular (tangential) unit vector
    const perpX = -oy, perpY = ox;

    pBooks.forEach((book, idx) => {
      const row = Math.floor(idx / COLS);
      const col = idx % COLS;
      const rowN = Math.min(COLS, pBooks.length - row * COLS);
      const colOffset = col - (rowN - 1) / 2; // centered within the row

      const radialDist = BASE_DIST + row * ROW_GAP;

      positions[book.id] = {
        x: px + ox * radialDist + perpX * colOffset * COL_GAP,
        y: py + oy * radialDist + perpY * colOffset * COL_GAP,
      };
    });
  });

  return positions;
}

function buildElements(
  books: Book[],
  pos: Record<string, { x: number; y: number }>,
): cytoscape.ElementDefinition[] {
  const els: cytoscape.ElementDefinition[] = [];

  PILLARS.forEach((pillar) => {
    els.push({
      data: {
        id: `pillar__${pillar}`,
        nodeType: 'pillar',
        label: pillar,
        color: PILLAR_COLORS[pillar],
        pillar,
      },
      position: pos[`pillar__${pillar}`] ?? { x: VCX, y: VCY },
    });
  });

  books.forEach((book) => {
    els.push({
      data: {
        id: book.id,
        nodeType: 'book',
        label: book.title,
        color: PILLAR_COLORS[book.pillar],
        pillar: book.pillar,
      },
      position: pos[book.id] ?? { x: VCX, y: VCY },
    });
    els.push({
      data: {
        id: `ep_${book.id}`,
        source: book.id,
        target: `pillar__${book.pillar}`,
        linkType: 'pillar',
      },
    });
  });

  // Cross-pillar secondary links (shared category)
  for (let i = 0; i < books.length; i++) {
    for (let j = i + 1; j < books.length; j++) {
      const a = books[i], b = books[j];
      if (a.pillar === b.pillar) continue;
      const shared = (a.secondaryCategories ?? []).filter((c) =>
        (b.secondaryCategories ?? []).includes(c),
      );
      if (shared.length > 0) {
        els.push({
          data: {
            id: `es_${a.id}_${b.id}`,
            source: a.id,
            target: b.id,
            linkType: 'secondary',
          },
        });
      }
    }
  }

  return els;
}

export default function NetworkGraph({
  books,
  selectedPillar,
  onSelectBook,
  onHoverBook,
  theme,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cyRef = useRef<cytoscape.Core | null>(null);
  const booksRef = useRef(books);
  booksRef.current = books;

  // ── Build / rebuild graph when books or theme change ─────────────────────
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    cyRef.current?.destroy();

    const pos = computePositions(books);
    const elements = buildElements(books, pos);

    const cy = cytoscape({
      container,
      elements,
      style: getStylesheet(theme),
      layout: {
        name: 'preset',
        fit: false, // we fit manually below for reliable sizing
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any,
      userZoomingEnabled: true,
      userPanningEnabled: true,
      minZoom: 0.2,
      maxZoom: 4,
    });

    cyRef.current = cy;

    // Fit after a tick so the container has its final CSS dimensions
    requestAnimationFrame(() => {
      cy.fit(undefined, 55);
    });

    // ── Hover: book node ────────────────────────────────────────────────────
    cy.on('mouseover', 'node[nodeType="book"]', (e) => {
      const node = e.target;
      const book = booksRef.current.find((b) => b.id === node.id());
      if (book) onHoverBook(book);
      cy.elements().addClass('dimmed');
      node.removeClass('dimmed').addClass('highlighted');
      const edges = node.connectedEdges();
      edges.removeClass('dimmed').addClass('edge-highlighted');
      edges.connectedNodes().removeClass('dimmed');
    });

    cy.on('mouseout', 'node[nodeType="book"]', () => {
      onHoverBook(null);
      cy.elements().removeClass('dimmed highlighted edge-highlighted');
    });

    // ── Hover: pillar node ──────────────────────────────────────────────────
    cy.on('mouseover', 'node[nodeType="pillar"]', (e) => {
      const node = e.target;
      cy.elements().addClass('dimmed');
      node.removeClass('dimmed').addClass('highlighted');
      const edges = node.connectedEdges();
      edges.removeClass('dimmed').addClass('edge-highlighted');
      edges.connectedNodes().removeClass('dimmed');
    });

    cy.on('mouseout', 'node[nodeType="pillar"]', () => {
      cy.elements().removeClass('dimmed highlighted edge-highlighted');
    });

    // ── Click: select book ──────────────────────────────────────────────────
    cy.on('tap', 'node[nodeType="book"]', (e) => {
      const book = booksRef.current.find((b) => b.id === e.target.id());
      if (book) onSelectBook(book);
    });

    // ── Cursor ──────────────────────────────────────────────────────────────
    cy.on('mouseover', 'node', () => { container.style.cursor = 'pointer'; });
    cy.on('mouseout', 'node', () => { container.style.cursor = 'default'; });

    return () => { cy.destroy(); cyRef.current = null; };
  }, [books, theme]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── selectedPillar filter: dim non-matching nodes without rebuild ─────────
  useEffect(() => {
    const cy = cyRef.current;
    if (!cy) return;
    cy.elements().removeClass('dimmed');
    if (selectedPillar) {
      cy.elements().addClass('dimmed');
      cy.elements(`[pillar="${selectedPillar}"]`).removeClass('dimmed');
      cy.edges('[linkType="pillar"]').forEach((edge) => {
        if (
          edge.source().data('pillar') === selectedPillar ||
          edge.target().data('pillar') === selectedPillar
        ) {
          edge.removeClass('dimmed');
        }
      });
    }
  }, [selectedPillar]);

  const bgColor = theme === 'dark' ? '#080b14' : '#f8fafc';

  return (
    <div
      ref={containerRef}
      style={{ width: '100%', height: '100%', background: bgColor }}
    />
  );
}
