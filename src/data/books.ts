import type { Book } from '../types/book';

export const BOOKS: Book[] = [
  // ── BELONGING ────────────────────────────────────────────────────────────────
  {
    id: 'b1',
    title: 'Tribe',
    author: 'Sebastian Junger',
    pillar: 'Belonging',
    secondaryCategories: ['Non-fiction', 'Core/Essentials'],
    synopsis:
      'Junger explores why modern society has difficulty creating a sense of tribe and belonging, drawing on anthropology, psychology, and his own experiences as a war correspondent.',
    commentary:
      'A cornerstone of how we think about what humans need to flourish together. Junger names something we all sense but rarely articulate.',
    tags: ['Partner Connections'],
  },
  {
    id: 'b2',
    title: 'Braving the Wilderness',
    author: 'Brené Brown',
    pillar: 'Belonging',
    secondaryCategories: ['Non-fiction', "Sally's Pick"],
    synopsis:
      'Brown redefines what it means to truly belong in an era of increasing polarization, arguing that belonging starts within and requires the courage to stand alone.',
    commentary:
      "One of the most cited books in our community conversations. Brown's research grounds what we do on an emotional and human level.",
  },
  {
    id: 'b3',
    title: 'Lost Connections',
    author: 'Johann Hari',
    pillar: 'Belonging',
    secondaryCategories: ['Non-fiction', 'Philanthropy'],
    synopsis:
      'Hari investigates the real causes of depression and anxiety, uncovering nine social and environmental factors disconnecting us from meaningful lives—and how we can reconnect.',
    commentary:
      'Reframes mental health as a social challenge, not just a medical one. Deeply relevant to how we understand community investment.',
  },
  {
    id: 'b4',
    title: 'Bowling Alone',
    author: 'Robert D. Putnam',
    pillar: 'Belonging',
    secondaryCategories: ['Non-fiction', 'Philanthropy'],
    synopsis:
      'A landmark social science study documenting the collapse of American community life and civic engagement over the past half century.',
    commentary:
      'The foundational text for understanding social capital. If you want to understand why belonging work matters, this is essential reading.',
    tags: ['Related Books Investment'],
  },
  {
    id: 'b5',
    title: 'Together',
    author: 'Vivek Murthy',
    pillar: 'Belonging',
    secondaryCategories: ['Non-fiction', 'Core/Essentials'],
    synopsis:
      'The former U.S. Surgeon General examines the loneliness epidemic and offers a vision for rebuilding our connections to one another and society.',
    commentary:
      'Written before COVID made loneliness a household word—and all the more prophetic for it. Essential for anyone thinking about community health.',
    tags: ['Related Books Investment'],
  },
  {
    id: 'b6',
    title: 'A Paradise Built in Hell',
    author: 'Rebecca Solnit',
    pillar: 'Belonging',
    secondaryCategories: ['Non-fiction', 'Book Club'],
    synopsis:
      'Solnit examines how ordinary people respond to disasters with altruism, solidarity, and joy—revealing an unexpected side of human nature.',
    commentary:
      'Challenges every assumption about how people behave under pressure. A powerful case for human goodness and community resilience.',
  },
  {
    id: 'b7',
    title: 'The Village Effect',
    author: 'Susan Pinker',
    pillar: 'Belonging',
    secondaryCategories: ['Non-fiction'],
    synopsis:
      'Drawing on a Sardinian village with remarkable longevity rates, Pinker reveals how face-to-face contact protects health, happiness, and intellect.',
    commentary:
      'Science-backed and story-rich—a beautiful argument for why physical presence still matters in a digital world.',
  },
  {
    id: 'b8',
    title: 'The Warmth of Other Suns',
    author: 'Isabel Wilkerson',
    pillar: 'Belonging',
    secondaryCategories: ['Non-fiction', 'Book Club'],
    synopsis:
      'A sweeping narrative of the Great Migration, following three individuals who risked everything to escape the Jim Crow South in search of belonging and opportunity.',
    commentary:
      'A masterpiece of immersive journalism. It reminds us that the search for belonging has shaped American history.',
    tags: ['Partner Connections'],
  },

  // ── RELATIONSHIP ─────────────────────────────────────────────────────────────
  {
    id: 'r1',
    title: 'Nonviolent Communication',
    author: 'Marshall Rosenberg',
    pillar: 'Relationship',
    secondaryCategories: ['Non-fiction', 'Core/Essentials'],
    synopsis:
      'Rosenberg presents a communication framework centered on compassionate listening and honest expression, transforming how we connect with others.',
    commentary:
      'The communication tool we return to again and again in our team and community work. Simple on the surface; transformative in practice.',
  },
  {
    id: 'r2',
    title: 'The Art of Loving',
    author: 'Erich Fromm',
    pillar: 'Relationship',
    secondaryCategories: ['Philosophy', 'Core/Essentials'],
    synopsis:
      'Fromm argues that love is not merely a feeling but an active practice requiring knowledge, effort, and discipline—a radical reframing of what it means to love.',
    commentary:
      'Published in 1956 and still utterly radical. This is the philosophical foundation beneath much of our relationship-centered work.',
  },
  {
    id: 'r3',
    title: 'Attached',
    author: 'Amir Levine & Rachel Heller',
    pillar: 'Relationship',
    secondaryCategories: ['Non-fiction', 'Book Club'],
    synopsis:
      'An accessible introduction to attachment theory—how our early bonds shape adult relationships—and how to use this knowledge to build more secure connections.',
    commentary:
      'Changed how our community thinks about interpersonal dynamics. The attachment framework is now a shared language in our programs.',
  },
  {
    id: 'r4',
    title: 'The Body Keeps the Score',
    author: 'Bessel van der Kolk',
    pillar: 'Relationship',
    secondaryCategories: ['Non-fiction', "Sally's Pick"],
    synopsis:
      'A groundbreaking exploration of how trauma reshapes the body and brain, and the innovative treatments that can help survivors reclaim their lives.',
    commentary:
      'Deeply informs how we approach trauma-sensitive community work. Understanding this is foundational to relationship-based philanthropy.',
    tags: ['Related Books Investment'],
  },
  {
    id: 'r5',
    title: 'Hold Me Tight',
    author: 'Sue Johnson',
    pillar: 'Relationship',
    secondaryCategories: ['Non-fiction', 'Book Club'],
    synopsis:
      'Emotionally Focused Therapy creator Sue Johnson presents seven transforming conversations for couples to build enduring relationships.',
    commentary:
      'Practical and emotionally wise. Many in our community have used this as a relationship workbook.',
  },
  {
    id: 'r6',
    title: 'The Gifts of Imperfection',
    author: 'Brené Brown',
    pillar: 'Relationship',
    secondaryCategories: ["Sally's Pick", 'Core/Essentials'],
    synopsis:
      'Brown lays out a path to wholehearted living—embracing who we are, releasing what we think we should be, and cultivating connection through vulnerability.',
    commentary:
      'A companion to Braving the Wilderness. Together they form a complete arc of how we think about authenticity and belonging.',
  },
  {
    id: 'r7',
    title: 'Maybe You Should Talk to Someone',
    author: 'Lori Gottlieb',
    pillar: 'Relationship',
    secondaryCategories: ['Non-fiction', 'Book Club'],
    synopsis:
      'A therapist in her own crisis sees a therapist, revealing the universal truths we all struggle with—and the transformative power of human connection.',
    commentary:
      'Funny, warm, and quietly profound. One of the most humanizing portraits of what it means to be in relationship with another person.',
  },

  // ── AWE & WONDER ─────────────────────────────────────────────────────────────
  {
    id: 'a1',
    title: 'Awe: The New Science of Everyday Wonder',
    author: 'Dacher Keltner',
    pillar: 'Awe & Wonder',
    secondaryCategories: ['Non-fiction', 'Core/Essentials'],
    synopsis:
      'Keltner draws on cutting-edge science, cross-cultural studies, and personal experience to show how awe is a fundamental human experience that makes us kinder and more connected.',
    commentary:
      'The definitive scientific case for why we invest in experiences that expand people\'s sense of what\'s possible. Required reading.',
    tags: ['Related Books Investment'],
  },
  {
    id: 'a2',
    title: 'Pilgrim at Tinker Creek',
    author: 'Annie Dillard',
    pillar: 'Awe & Wonder',
    secondaryCategories: ['Fiction', "Sally's Pick"],
    synopsis:
      'A Pulitzer Prize–winning work of creative nonfiction in which Dillard spends a year observing nature in Virginia\'s Blue Ridge Mountains, exploring the full strangeness of the world.',
    commentary:
      'The most beautiful book about paying attention that exists. Dillard teaches us how to look.',
  },
  {
    id: 'a3',
    title: 'How to Change Your Mind',
    author: 'Michael Pollan',
    pillar: 'Awe & Wonder',
    secondaryCategories: ['Non-fiction', 'Spirituality'],
    synopsis:
      'Pollan explores the new science of psychedelics, weaving together history, botany, pharmacology, and memoir to argue for the therapeutic and spiritual potential of altered states.',
    commentary:
      'Opens doors in the mind about consciousness, awe, and the limits of ordinary perception. A book that consistently sparks deep conversations.',
    tags: ['Partner Connections'],
  },
  {
    id: 'a4',
    title: 'The Overstory',
    author: 'Richard Powers',
    pillar: 'Awe & Wonder',
    secondaryCategories: ['Fiction', 'Book Club'],
    synopsis:
      'A Pulitzer Prize–winning novel in which nine Americans—drawn together by a single, towering tree—take desperate steps to protect the planet\'s forests.',
    commentary:
      'Changes how you see every tree you walk past. Fiction at its most important—enlarging what you\'re capable of caring about.',
  },
  {
    id: 'a5',
    title: 'The Little Prince',
    author: 'Antoine de Saint-Exupéry',
    pillar: 'Awe & Wonder',
    secondaryCategories: ['Fiction', 'Wisdom Traditions'],
    synopsis:
      'A boy-prince traveling through the universe meets various grown-ups and discovers the essential truths of human connection, wonder, and loss.',
    commentary:
      'Proof that wisdom needs no length. We return to this book in conversations about what it means to see clearly.',
  },
  {
    id: 'a6',
    title: 'Braiding Sweetgrass',
    author: 'Robin Wall Kimmerer',
    pillar: 'Awe & Wonder',
    secondaryCategories: ['Non-fiction', 'Wisdom Traditions', 'Book Club'],
    synopsis:
      'A botanist and member of the Citizen Potawatomi Nation weaves Indigenous wisdom and Western science into a meditation on the relationship between plants and people.',
    commentary:
      'Expands what counts as knowledge. One of the most important books for thinking about reciprocity, gratitude, and the living world.',
    tags: ['Partner Connections'],
  },
  {
    id: 'a7',
    title: 'When Breath Becomes Air',
    author: 'Paul Kalanithi',
    pillar: 'Awe & Wonder',
    secondaryCategories: ['Non-fiction', "Sally's Pick"],
    synopsis:
      'A brilliant neurosurgeon facing terminal lung cancer reflects on what makes life meaningful and how to face death with grace.',
    commentary:
      'A meditation on wonder and mortality written at the edge of both medicine and literature. Devastatingly beautiful.',
  },

  // ── PURPOSE & MEANING ────────────────────────────────────────────────────────
  {
    id: 'p1',
    title: "Man's Search for Meaning",
    author: 'Viktor E. Frankl',
    pillar: 'Purpose & Meaning',
    secondaryCategories: ['Core/Essentials', 'Wisdom Traditions'],
    synopsis:
      'Psychiatrist and Holocaust survivor Frankl describes life in Nazi death camps and its lessons for spiritual survival, introducing his psychotherapeutic method, logotherapy.',
    commentary:
      'The foundational text. Everything we believe about the human capacity for meaning-making flows from Frankl\'s insight that we choose our response.',
  },
  {
    id: 'p2',
    title: 'The Second Mountain',
    author: 'David Brooks',
    pillar: 'Purpose & Meaning',
    secondaryCategories: ['Non-fiction', 'Philanthropy'],
    synopsis:
      'Brooks argues that the most fulfilling life is not achieved through career success and personal freedom but through moral commitment and deep relationships.',
    commentary:
      'Articulates what many of our grantees are already living. A beautifully written argument for life as commitment rather than accumulation.',
    tags: ['Related Books Investment'],
  },
  {
    id: 'p3',
    title: 'Ikigai',
    author: 'Héctor García & Francesc Miralles',
    pillar: 'Purpose & Meaning',
    secondaryCategories: ['Wisdom Traditions', 'Non-fiction'],
    synopsis:
      'Exploring the Japanese concept of ikigai—reason for being—the authors investigate how the world\'s longest-lived people find joy and purpose every day.',
    commentary:
      'A gentle but potent framework. We\'ve used the ikigai Venn diagram in countless workshop settings.',
  },
  {
    id: 'p4',
    title: 'Drive',
    author: 'Daniel H. Pink',
    pillar: 'Purpose & Meaning',
    secondaryCategories: ['Non-fiction', 'Philanthropy'],
    synopsis:
      'Pink challenges conventional wisdom about motivation, arguing that autonomy, mastery, and purpose are the true drivers of human performance and satisfaction.',
    commentary:
      'Practical and evidence-based. Informs how we structure grantee support and think about intrinsic motivation in the organizations we fund.',
  },
  {
    id: 'p5',
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    pillar: 'Purpose & Meaning',
    secondaryCategories: ['Fiction', 'Book Club'],
    synopsis:
      'A young shepherd travels from Spain to Egypt in search of treasure, encountering teachers and trials that reveal the universe\'s language of signs and destiny.',
    commentary:
      'Beloved in our community for its simple, allegorical power. A perennial gift and entry point for conversations about calling.',
  },
  {
    id: 'p6',
    title: 'Flow',
    author: 'Mihaly Csikszentmihalyi',
    pillar: 'Purpose & Meaning',
    secondaryCategories: ['Non-fiction', 'Core/Essentials'],
    synopsis:
      'Csikszentmihalyi examines the psychological state of optimal experience—flow—and how cultivating it leads to a life of engagement, creativity, and meaning.',
    commentary:
      'The scientific grounding for the joy of deep work. Consistently referenced in our programs on youth development and creative engagement.',
  },
  {
    id: 'p7',
    title: 'Start with Why',
    author: 'Simon Sinek',
    pillar: 'Purpose & Meaning',
    secondaryCategories: ['Non-fiction', 'Philanthropy'],
    synopsis:
      'Sinek explores how leaders who inspire action—from Apple to Martin Luther King Jr.—start by communicating their purpose before their what or how.',
    commentary:
      'A useful framework for organizational culture-building. We use the Golden Circle in foundation strategy discussions.',
    tags: ['Related Books Investment'],
  },
  {
    id: 'p8',
    title: 'The Sabbath',
    author: 'Abraham Joshua Heschel',
    pillar: 'Purpose & Meaning',
    secondaryCategories: ['Spirituality', 'Wisdom Traditions'],
    synopsis:
      'Heschel offers a profound meditation on the Jewish concept of the Sabbath as sacred time—a palace in time rather than in space—and its meaning for modern life.',
    commentary:
      'One of the most beautiful books in this library. Changes how you think about rest, presence, and the architecture of a meaningful week.',
  },

  // ── LUCK & RANDOMNESS ────────────────────────────────────────────────────────
  {
    id: 'l1',
    title: 'The Black Swan',
    author: 'Nassim Nicholas Taleb',
    pillar: 'Luck & Randomness',
    secondaryCategories: ['Non-fiction', 'Core/Essentials'],
    synopsis:
      'Taleb examines the extreme impact of rare, unpredictable events—"Black Swans"—and the human tendency to find simplistic explanations for these events after the fact.',
    commentary:
      'Humbling and liberating at the same time. Essential reading for any philanthropist thinking about systemic change and unintended consequences.',
    tags: ['Related Books Investment'],
  },
  {
    id: 'l2',
    title: 'Outliers',
    author: 'Malcolm Gladwell',
    pillar: 'Luck & Randomness',
    secondaryCategories: ['Non-fiction', 'Book Club'],
    synopsis:
      'Gladwell examines the stories of people who rise to extraordinary success, revealing the hidden advantages—timing, culture, birthdate—that make outliers possible.',
    commentary:
      'Challenges merit-based narratives with humility and curiosity. A great conversation-starter about privilege, opportunity, and equity.',
  },
  {
    id: 'l3',
    title: 'Antifragile',
    author: 'Nassim Nicholas Taleb',
    pillar: 'Luck & Randomness',
    secondaryCategories: ['Non-fiction', 'Philosophy'],
    synopsis:
      'Taleb introduces the concept of antifragility—things that gain from disorder—offering a framework for building systems and lives that benefit from uncertainty.',
    commentary:
      'A philosophical framework for resilience in our work. The concept of antifragility has reshaped how we think about organizational design.',
  },
  {
    id: 'l4',
    title: 'The Drunkard\'s Walk',
    author: 'Leonard Mlodinow',
    pillar: 'Luck & Randomness',
    secondaryCategories: ['Non-fiction', 'Book Club'],
    synopsis:
      'A physicist examines the role of chance in everyday events, revealing how randomness and probability shape everything from stock markets to health outcomes.',
    commentary:
      'Accessible and mind-expanding. Helps us hold our success and failures with more appropriate humility.',
  },
  {
    id: 'l5',
    title: 'Stumbling on Happiness',
    author: 'Daniel Gilbert',
    pillar: 'Luck & Randomness',
    secondaryCategories: ['Non-fiction', 'Book Club'],
    synopsis:
      'Gilbert investigates why humans are so bad at predicting what will make us happy, uncovering the systematic errors in our imagination and the surprising sources of well-being.',
    commentary:
      'Funny and unsettling. Reshapes how we think about goal-setting and evaluation in our work.',
  },
  {
    id: 'l6',
    title: 'The Luck Factor',
    author: 'Richard Wiseman',
    pillar: 'Luck & Randomness',
    secondaryCategories: ['Non-fiction'],
    synopsis:
      'Psychologist Wiseman studies the habits and attitudes of lucky and unlucky people, finding that luck is not fate but a set of learnable behaviors and mindsets.',
    commentary:
      'Practical and optimistic. Offers concrete strategies for communities and individuals to create more opportunity.',
  },
  {
    id: 'l7',
    title: 'Thinking, Fast and Slow',
    author: 'Daniel Kahneman',
    pillar: 'Luck & Randomness',
    secondaryCategories: ['Non-fiction', 'Core/Essentials'],
    synopsis:
      'Nobel laureate Kahneman explores the two systems that drive the way we think—one fast, intuitive, and emotional; the other slow, deliberate, and logical.',
    commentary:
      'One of the most important books for understanding human decision-making. Foundational for anyone designing programs for behavior change.',
    tags: ['Related Books Investment'],
  },

  // ── PHILOSOPHY & SPIRITUALITY ────────────────────────────────────────────────
  {
    id: 's1',
    title: 'Meditations',
    author: 'Marcus Aurelius',
    pillar: 'Philosophy & Spirituality',
    secondaryCategories: ['Philosophy', 'Wisdom Traditions', 'Core/Essentials'],
    synopsis:
      'The private journal of a Roman emperor—written only for himself—containing Stoic reflections on duty, impermanence, and how to live well in a world you cannot control.',
    commentary:
      'Two thousand years old and reads like it was written this morning. The Stoic backbone of how we hold setbacks in this work.',
  },
  {
    id: 's2',
    title: 'The Power of Now',
    author: 'Eckhart Tolle',
    pillar: 'Philosophy & Spirituality',
    secondaryCategories: ['Spirituality', "Sally's Pick"],
    synopsis:
      'Tolle guides readers toward enlightenment through the insight that suffering and anxiety are caused by over-identification with thought, and that peace lies in present-moment awareness.',
    commentary:
      'A book that consistently appears at pivotal moments in community members\' lives. A touchstone for our mindfulness practices.',
  },
  {
    id: 's3',
    title: 'When Things Fall Apart',
    author: 'Pema Chödrön',
    pillar: 'Philosophy & Spirituality',
    secondaryCategories: ['Spirituality', 'Wisdom Traditions'],
    synopsis:
      'Buddhist nun Chödrön offers radical compassion as a path through pain, arguing that difficulty itself is the ground of spiritual awakening.',
    commentary:
      'The most-gifted book in our library. Returns again and again in conversations about grief, resilience, and the nature of change.',
  },
  {
    id: 's4',
    title: 'Siddhartha',
    author: 'Hermann Hesse',
    pillar: 'Philosophy & Spirituality',
    secondaryCategories: ['Fiction', 'Wisdom Traditions'],
    synopsis:
      'A young Indian nobleman abandons wealth to seek enlightenment, moving through asceticism, sensuality, and commerce before reaching a final, hard-won wisdom.',
    commentary:
      'Short enough to read in an afternoon; deep enough to return to across a lifetime. A classic gateway to Eastern philosophical thought.',
  },
  {
    id: 's5',
    title: 'The Tao Te Ching',
    author: 'Laozi (tr. Stephen Mitchell)',
    pillar: 'Philosophy & Spirituality',
    secondaryCategories: ['Wisdom Traditions', 'Core/Essentials'],
    synopsis:
      'Eighty-one short verses written 2,500 years ago by the founder of Taoism, exploring the nature of the Tao—the way—and how to align one\'s life with it.',
    commentary:
      'We recommend Stephen Mitchell\'s translation for its clarity. You can read one verse per day for years and still find new meaning.',
  },
  {
    id: 's6',
    title: 'The Road Less Traveled',
    author: 'M. Scott Peck',
    pillar: 'Philosophy & Spirituality',
    secondaryCategories: ['Spirituality', 'Book Club'],
    synopsis:
      'Beginning with the declaration that "Life is difficult," Peck integrates science and spiritual principles to offer a map toward personal growth and spiritual evolution.',
    commentary:
      'A quiet classic that has guided countless readers toward greater self-understanding. A perennial favorite in our reading circles.',
  },
  {
    id: 's7',
    title: 'Sapiens',
    author: 'Yuval Noah Harari',
    pillar: 'Philosophy & Spirituality',
    secondaryCategories: ['Non-fiction', 'Core/Essentials', 'Book Club'],
    synopsis:
      'A sweeping history of humankind from the Stone Age to the 21st century, examining how biology and history have defined us and enhanced or constrained our possibilities.',
    commentary:
      'Essential for developing a long view of human behavior and possibility. We use it to frame the largest questions our work engages with.',
    tags: ['Related Books Investment'],
  },
  {
    id: 's8',
    title: 'Letters to a Young Poet',
    author: 'Rainer Maria Rilke',
    pillar: 'Philosophy & Spirituality',
    secondaryCategories: ['Philosophy', "Sally's Pick", 'Book Club'],
    synopsis:
      'Ten letters from Rilke to a young aspiring poet, offering timeless guidance on creativity, solitude, patience, and living the questions of life.',
    commentary:
      'A book of rare intimacy and wisdom. The instruction to "live the questions" is one we return to in every strategic planning conversation.',
  },
];
