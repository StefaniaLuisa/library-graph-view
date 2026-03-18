import type { Pillar, SecondaryCategory } from '../types/book';

export const PILLARS: Pillar[] = [
  'Belonging',
  'Relationship',
  'Awe & Wonder',
  'Purpose & Meaning',
  'Luck & Randomness',
  'Philosophy & Spirituality',
];

export const SECONDARY_CATEGORIES: SecondaryCategory[] = [
  'Philosophy',
  'Spirituality',
  'Fiction',
  'Non-fiction',
  'Philanthropy',
  'Book Club',
  'Core/Essentials',
  "Sally's Pick",
  'Wisdom Traditions',
];

export const PILLAR_COLORS: Record<Pillar, string> = {
  'Belonging': '#f97316',
  'Relationship': '#ec4899',
  'Awe & Wonder': '#22d3ee',
  'Purpose & Meaning': '#eab308',
  'Luck & Randomness': '#4ade80',
  'Philosophy & Spirituality': '#a855f7',
};

export const PILLAR_DESCRIPTIONS: Record<Pillar, string> = {
  'Belonging': 'The fundamental human need to feel part of something larger—community, place, and shared story.',
  'Relationship': 'The science and art of deep human connection: how we attach, communicate, and love.',
  'Awe & Wonder': 'Experiences that expand our perception—from nature to art to the sublime mysteries of existence.',
  'Purpose & Meaning': 'Frameworks for living with intention, direction, and a sense of contribution beyond oneself.',
  'Luck & Randomness': 'The hidden forces of chance that shape our lives and what we can do in response.',
  'Philosophy & Spirituality': 'Ancient and contemporary wisdom traditions exploring consciousness, ethics, and the nature of reality.',
};

export const SECONDARY_CATEGORY_COLORS: Record<SecondaryCategory, string> = {
  'Philosophy': '#818cf8',
  'Spirituality': '#c084fc',
  'Fiction': '#34d399',
  'Non-fiction': '#60a5fa',
  'Philanthropy': '#fb923c',
  'Book Club': '#f472b6',
  'Core/Essentials': '#fbbf24',
  "Sally's Pick": '#e879f9',
  'Wisdom Traditions': '#a3e635',
};

// Pillar hub positions arranged in a circle (will be scaled by graph dimensions)
export const PILLAR_ANGLES: Record<Pillar, number> = {
  'Belonging': 0,
  'Relationship': 60,
  'Awe & Wonder': 120,
  'Purpose & Meaning': 180,
  'Luck & Randomness': 240,
  'Philosophy & Spirituality': 300,
};

export function getPillarHubPosition(pillar: Pillar, width: number, height: number) {
  const angle = (PILLAR_ANGLES[pillar] - 90) * (Math.PI / 180);
  const radius = Math.min(width, height) * 0.32;
  return {
    x: width / 2 + radius * Math.cos(angle),
    y: height / 2 + radius * Math.sin(angle),
  };
}
