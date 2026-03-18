export type Pillar =
  | 'Belonging'
  | 'Relationship'
  | 'Awe & Wonder'
  | 'Purpose & Meaning'
  | 'Luck & Randomness'
  | 'Philosophy & Spirituality';

export type SecondaryCategory =
  | 'Philosophy'
  | 'Spirituality'
  | 'Fiction'
  | 'Non-fiction'
  | 'Philanthropy'
  | 'Book Club'
  | 'Core/Essentials'
  | "Sally's Pick"
  | 'Wisdom Traditions';

export type OptionalTag = 'Related Books Investment' | 'Partner Connections';

export interface Book {
  id: string;
  title: string;
  author: string;
  coverImage?: string;
  pillar: Pillar;
  secondaryCategories?: SecondaryCategory[]; // max 3
  tags?: OptionalTag[];
  synopsis: string;
  commentary?: string;
}

// Graph node types
export interface BookNode extends Book {
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  fx?: number | null;
  fy?: number | null;
  // Graph metadata
  nodeType: 'book';
  val?: number;
  color?: string;
}

export interface PillarNode {
  id: string;
  nodeType: 'pillar';
  pillar: Pillar;
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
  val?: number;
  color?: string;
}

export type GraphNode = BookNode | PillarNode;

export interface GraphLink {
  source: string | GraphNode;
  target: string | GraphNode;
  linkType: 'pillar' | 'secondary';
}

export interface GraphData {
  nodes: GraphNode[];
  links: GraphLink[];
}
