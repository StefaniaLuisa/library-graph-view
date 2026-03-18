import { useRef, useEffect, useCallback, useMemo } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import type { Book, GraphData, GraphNode, GraphLink, BookNode, PillarNode } from '../types/book';
import { PILLAR_COLORS, getPillarHubPosition, PILLARS } from '../utils/pillars';
import type { Pillar } from '../types/book';

interface Props {
  books: Book[];
  selectedPillar: Pillar | null;
  onSelectBook: (book: Book) => void;
  hoveredBook: Book | null;
  onHoverBook: (book: Book | null) => void;
  bgColor?: string;
}

// Build graph data from books
function buildGraphData(books: Book[]): GraphData {
  const nodes: GraphNode[] = [];
  const links: GraphLink[] = [];

  // Pillar hub nodes
  PILLARS.forEach((pillar) => {
    nodes.push({
      id: `pillar__${pillar}`,
      nodeType: 'pillar',
      pillar,
      val: 20,
      color: PILLAR_COLORS[pillar],
    } as PillarNode);
  });

  // Book nodes
  books.forEach((book) => {
    nodes.push({
      ...book,
      nodeType: 'book',
      val: book.secondaryCategories?.includes('Core/Essentials') ? 8 : 4,
      color: PILLAR_COLORS[book.pillar],
    } as BookNode);

    // Link book → pillar hub
    links.push({
      source: book.id,
      target: `pillar__${book.pillar}`,
      linkType: 'pillar',
    });
  });

  // Cross-pillar secondary category links (shared secondary categories)
  for (let i = 0; i < books.length; i++) {
    for (let j = i + 1; j < books.length; j++) {
      const a = books[i];
      const b = books[j];
      if (a.pillar === b.pillar) continue; // already clustered together
      const shared = (a.secondaryCategories ?? []).filter(
        (c) => (b.secondaryCategories ?? []).includes(c)
      );
      if (shared.length > 0) {
        links.push({
          source: a.id,
          target: b.id,
          linkType: 'secondary',
        });
      }
    }
  }

  return { nodes, links };
}

export default function ConstellationGraph({
  books,
  selectedPillar,
  onSelectBook,
  hoveredBook,
  onHoverBook,
  bgColor = '#080b14',
}: Props) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fgRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dimensionsRef = useRef({ width: 800, height: 600 });

  const graphData = useMemo(() => buildGraphData(books), [books]);

  // Filter opacity for non-matching nodes
  const isVisible = useCallback(
    (node: GraphNode) => {
      if (!selectedPillar) return true;
      if (node.nodeType === 'pillar') return (node as PillarNode).pillar === selectedPillar;
      return (node as BookNode).pillar === selectedPillar;
    },
    [selectedPillar]
  );

  // Set fixed positions for pillar hubs on engine stop
  const handleEngineStop = useCallback(() => {
    if (!fgRef.current) return;
    const { width, height } = dimensionsRef.current;
    PILLARS.forEach((pillar) => {
      const pos = getPillarHubPosition(pillar, width, height);
      fgRef.current.getGraphBbox(); // warm cache
      // Fix pillar nodes at their positions
      const node = graphData.nodes.find(
        (n) => n.nodeType === 'pillar' && (n as PillarNode).pillar === pillar
      );
      if (node) {
        node.fx = pos.x;
        node.fy = pos.y;
      }
    });
  }, [graphData.nodes]);

  // Initialize forces
  useEffect(() => {
    if (!fgRef.current) return;
    const fg = fgRef.current;

    // Charge (repulsion)
    fg.d3Force('charge')?.strength(-120);

    // Center
    fg.d3Force('center')?.strength(0.05);

    // Link
    fg.d3Force('link')?.distance((link: GraphLink) => {
      return link.linkType === 'pillar' ? 60 : 160;
    }).strength((link: GraphLink) => {
      return link.linkType === 'pillar' ? 0.8 : 0.1;
    });

    // Custom cluster force: pull books toward their pillar hub
    fg.d3Force('cluster', (alpha: number) => {
      const { width, height } = dimensionsRef.current;
      graphData.nodes.forEach((node) => {
        if (node.nodeType !== 'book') return;
        const book = node as BookNode;
        const pos = getPillarHubPosition(book.pillar, width, height);
        const dx = pos.x - (book.x ?? 0);
        const dy = pos.y - (book.y ?? 0);
        book.vx = (book.vx ?? 0) + dx * alpha * 0.3;
        book.vy = (book.vy ?? 0) + dy * alpha * 0.3;
      });
    });
  }, [graphData]);

  // Update dimensions ref on resize
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      dimensionsRef.current = { width, height };
    });
    ro.observe(el);
    dimensionsRef.current = { width: el.clientWidth, height: el.clientHeight };
    return () => ro.disconnect();
  }, []);

  const drawNode = useCallback(
    (node: GraphNode, ctx: CanvasRenderingContext2D, globalScale: number) => {
      const x = node.x ?? 0;
      const y = node.y ?? 0;
      const visible = isVisible(node);
      const alpha = visible ? 1 : 0.12;

      if (node.nodeType === 'pillar') {
        const pNode = node as PillarNode;
        const color = PILLAR_COLORS[pNode.pillar];
        const r = 14;

        // Outer glow ring
        ctx.save();
        ctx.globalAlpha = alpha * 0.25;
        ctx.beginPath();
        ctx.arc(x, y, r + 12, 0, 2 * Math.PI);
        const glow = ctx.createRadialGradient(x, y, r, x, y, r + 12);
        glow.addColorStop(0, color);
        glow.addColorStop(1, 'transparent');
        ctx.fillStyle = glow;
        ctx.fill();
        ctx.restore();

        // Filled circle
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, 2 * Math.PI);
        ctx.fillStyle = color;
        ctx.shadowBlur = 20;
        ctx.shadowColor = color;
        ctx.fill();

        // Label
        const fontSize = Math.max(10, 12 / globalScale);
        ctx.font = `700 ${fontSize}px system-ui, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#fff';
        ctx.shadowBlur = 0;

        // Multi-line label
        const words = pNode.pillar.split(' ');
        const lineH = fontSize * 1.3;
        const lines: string[] = [];
        let line = '';
        for (const word of words) {
          const test = line ? `${line} ${word}` : word;
          if (ctx.measureText(test).width > r * 2.2 && line) {
            lines.push(line);
            line = word;
          } else {
            line = test;
          }
        }
        lines.push(line);

        const offsetY = -((lines.length - 1) * lineH) / 2;
        lines.forEach((l, i) => {
          ctx.fillText(l, x, y + offsetY + i * lineH);
        });
        ctx.restore();

        return;
      }

      // Book node
      const bNode = node as BookNode;
      const color = PILLAR_COLORS[bNode.pillar];
      const isCore = bNode.secondaryCategories?.includes('Core/Essentials');
      const isSally = bNode.secondaryCategories?.includes("Sally's Pick");
      const isHovered = hoveredBook?.id === bNode.id;
      const r = isCore ? 7 : isSally ? 6 : 4.5;

      ctx.save();
      ctx.globalAlpha = alpha;

      if (isHovered) {
        // Hover glow ring
        ctx.beginPath();
        ctx.arc(x, y, r + 10, 0, 2 * Math.PI);
        const hglow = ctx.createRadialGradient(x, y, r, x, y, r + 10);
        hglow.addColorStop(0, color);
        hglow.addColorStop(1, 'transparent');
        ctx.fillStyle = hglow;
        ctx.globalAlpha = alpha * 0.4;
        ctx.fill();
        ctx.globalAlpha = alpha;
      }

      // Star/circle
      ctx.beginPath();
      if (isCore) {
        // Draw a 4-pointed star for Core/Essentials
        drawStar(ctx, x, y, 4, r, r * 0.45);
      } else {
        ctx.arc(x, y, r, 0, 2 * Math.PI);
      }

      ctx.fillStyle = color;
      ctx.shadowBlur = isHovered ? 18 : 8;
      ctx.shadowColor = color;
      ctx.fill();

      // Outline ring for Sally's Pick
      if (isSally) {
        ctx.beginPath();
        ctx.arc(x, y, r + 2, 0, 2 * Math.PI);
        ctx.strokeStyle = '#e879f9';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      ctx.restore();
    },
    [isVisible, hoveredBook]
  );

  const drawLink = useCallback(
    (link: GraphLink, ctx: CanvasRenderingContext2D) => {
      const gl = link as GraphLink & { source: GraphNode; target: GraphNode };
      const sx = gl.source.x ?? 0;
      const sy = gl.source.y ?? 0;
      const tx = gl.target.x ?? 0;
      const ty = gl.target.y ?? 0;

      const sourceVisible = isVisible(gl.source);
      const targetVisible = isVisible(gl.target);
      const visible = sourceVisible && targetVisible;

      ctx.save();
      ctx.globalAlpha = visible ? (gl.linkType === 'pillar' ? 0.18 : 0.08) : 0.02;
      ctx.beginPath();
      ctx.moveTo(sx, sy);
      ctx.lineTo(tx, ty);
      const isLight = bgColor !== '#080b14';
      ctx.strokeStyle = gl.linkType === 'pillar'
        ? (isLight ? '#9188a0' : '#94a3b8')
        : (isLight ? '#6366f1' : '#818cf8');
      ctx.lineWidth = gl.linkType === 'pillar' ? 0.8 : 0.5;
      ctx.setLineDash(gl.linkType === 'secondary' ? [3, 6] : []);
      ctx.stroke();
      ctx.restore();
    },
    [isVisible, bgColor]
  );

  const handleNodeClick = useCallback(
    (node: GraphNode) => {
      if (node.nodeType === 'book') {
        onSelectBook(node as BookNode);
      }
    },
    [onSelectBook]
  );

  const handleNodeHover = useCallback(
    (node: GraphNode | null) => {
      if (!node || node.nodeType === 'book') {
        onHoverBook(node ? (node as BookNode) : null);
      } else {
        onHoverBook(null);
      }
      if (containerRef.current) {
        containerRef.current.style.cursor =
          node && node.nodeType === 'book' ? 'pointer' : 'default';
      }
    },
    [onHoverBook]
  );

  const { width, height } = dimensionsRef.current;

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
      <ForceGraph2D
        ref={fgRef}
        graphData={graphData as { nodes: object[]; links: object[] }}
        width={containerRef.current?.clientWidth ?? width}
        height={containerRef.current?.clientHeight ?? height}
        backgroundColor={bgColor}
        nodeLabel={(node: object) => {
          const n = node as GraphNode;
          if (n.nodeType === 'book') return (n as BookNode).title;
          return (n as PillarNode).pillar;
        }}
        nodeCanvasObject={(node, ctx, globalScale) =>
          drawNode(node as GraphNode, ctx, globalScale)
        }
        nodeCanvasObjectMode={() => 'replace'}
        linkCanvasObject={(link, ctx) => drawLink(link as GraphLink, ctx)}
        linkCanvasObjectMode={() => 'replace'}
        onNodeClick={(node) => handleNodeClick(node as GraphNode)}
        onNodeHover={(node) => handleNodeHover(node as GraphNode | null)}
        onEngineStop={handleEngineStop}
        enableNodeDrag={true}
        enablePanInteraction={true}
        enableZoomInteraction={true}
        minZoom={0.3}
        maxZoom={4}
        cooldownTicks={200}
        d3AlphaDecay={0.015}
        d3VelocityDecay={0.3}
      />
    </div>
  );
}

function drawStar(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  points: number,
  outerR: number,
  innerR: number
) {
  ctx.beginPath();
  for (let i = 0; i < points * 2; i++) {
    const angle = (i * Math.PI) / points - Math.PI / 2;
    const r = i % 2 === 0 ? outerR : innerR;
    const px = x + r * Math.cos(angle);
    const py = y + r * Math.sin(angle);
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
}
