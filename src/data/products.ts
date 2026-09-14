import { Product, Review } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'siya-01',
    name: 'Aurelia Draped Silk Column Gown',
    tagline: 'Hand-sculpted Mulberry silk with fluid bias-cut drape',
    price: 890,
    originalPrice: 1100,
    category: 'Couture',
    description: 'Constructed from heavy 32mm Mulberry silk charmeuse, the Aurelia gown is cut entirely on the bias to hug contours while preserving effortless movement. Features an asymmetrical neckline and cascading floor-length godet hem.',
    details: [
      '100% Organic Mulberry Silk Charmeuse (32 momme)',
      'Hand-finished rolled hems by Parisian artisans',
      'Hidden lateral Japanese invisible zipper',
      'Floor-sweeping architectural train with loop bustle'
    ],
    materials: '100% Grade 6A Mulberry Silk; Silk habotai interior lining',
    care: 'Specialist dry clean only. Steam gently on low heat with garment cloth.',
    images: [
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'Custom Atelier'],
    colors: [
      { name: 'Champagne Écru', hex: '#EBE2D5' },
      { name: 'Obsidian Noir', hex: '#1C1B1A' },
      { name: 'Bordeaux Glaze', hex: '#58242A' }
    ],
    rating: 4.9,
    reviewCount: 38,
    tags: ['Quiet Luxury', 'Couture', 'Silk & Satin', 'Evening'],
    isNew: true,
    isBestSeller: true,
    designerNote: 'Inspired by classical Grecian marble drapery reimagined for modern evening galas.'
  },
  {
    id: 'siya-02',
    name: 'Monolith Sculpted Double-Breasted Trench',
    tagline: 'Architectural silhouette in water-resistant virgin gabardine',
    price: 1150,
    category: 'Tailoring',
    description: 'An imposing yet featherweight trench coat crafted from dense English cotton gabardine. Designed with broad peak lapels, horn buttons, a structured storm flap, and an oversized sash belt.',
    details: [
      'Water-repellent 450gsm double-twisted compact cotton',
      'Natural horn buttons individually numbered',
      'Storm welt pockets with micro-suede interior lining',
      'Removable storm collar buckle and wrist cinch straps'
    ],
    materials: '100% English Cotton Gabardine; Cupro lining',
    care: 'Dry clean only. Sponge clean minor spots with cold mineral water.',
    images: [
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=1200&q=85'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Bone White', hex: '#EDECE6' },
      { name: 'Desert Dune', hex: '#C2B69D' },
      { name: 'Midnight Pitch', hex: '#15171C' }
    ],
    rating: 4.8,
    reviewCount: 24,
    tags: ['Quiet Luxury', 'Tailoring', 'Runway', 'Minimalist'],
    isBestSeller: true,
    designerNote: 'Cut with generous volume to drape commanding authority over both knitwear and gala attire.'
  },
  {
    id: 'siya-03',
    name: 'Paloma Fluid Bias Slip Midi',
    tagline: 'Effortless minimalism crafted with French seam construction',
    price: 460,
    category: 'Silk & Satin',
    description: 'The archetype of effortless modern dressing. A minimalist slip dress featuring a soft cowl neckline, delicate rouleau straps, and a clean lower calf cut.',
    details: [
      'Pure silk satin with buttery matte reverse side',
      'Hand-rolled ultra-fine spaghetti straps',
      'Zero exterior visible stitching for seamless contouring',
      'Side walking slit reinforced with bar-tack stitching'
    ],
    materials: '100% Heavyweight Silk Satin',
    care: 'Cold water hand wash with PH-neutral silk shampoo or dry clean.',
    images: [
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=1200&q=85'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Sage Celadon', hex: '#BAC5B8' },
      { name: 'Onyx Black', hex: '#1A1A1A' },
      { name: 'Terracotta Rust', hex: '#9B5B49' }
    ],
    rating: 4.7,
    reviewCount: 42,
    tags: ['Silk & Satin', 'Minimalist', 'Ready to Wear'],
    isNew: false,
    designerNote: 'An essential foundation piece that transitions fluidly from midday atelier to candlelight.'
  },
  {
    id: 'siya-04',
    name: 'Sovereign Hourglass Blazer',
    tagline: 'Sculptural cinched waist tailoring with padded shoulder pagoda',
    price: 980,
    originalPrice: 1250,
    category: 'Tailoring',
    description: 'Masterfully structured using traditional canvas chest construction. The Sovereign blazer features an assertive pagoda shoulder line that tapers dramatically into a corset-like waist.',
    details: [
      'Super 150s Australian Merino Wool twill',
      'Full floating horsehair canvas chest piece',
      'Custom brushed nickel hardware closure',
      'Interior passport and lip rouge discreet pockets'
    ],
    materials: '100% Virgin Super 150s Wool; 100% Bemberg Cupro lining',
    care: 'Dry clean only by bespoke tailoring specialists.',
    images: [
      'https://images.unsplash.com/photo-1548624149-f9b1859aa9d0?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1550614000-4895a10e1bfd?auto=format&fit=crop&w=1200&q=85'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'Custom Atelier'],
    colors: [
      { name: 'Flint Charcoal', hex: '#313338' },
      { name: 'Pure Chalk', hex: '#F6F5F2' },
      { name: 'Camel Vicuña', hex: '#966D4E' }
    ],
    rating: 5.0,
    reviewCount: 19,
    tags: ['Tailoring', 'Couture', 'Quiet Luxury'],
    isNew: true,
    designerNote: 'Our ode to 1950s Parisian couture tailoring updated with razor-sharp modernist geometry.'
  },
  {
    id: 'siya-05',
    name: 'Caelum Pleated Chiffon Kaftan',
    tagline: 'Artisanal sunburst pleating with celestial movement',
    price: 740,
    category: 'Ready to Wear',
    description: 'Engineered using artisanal heat-set sunburst pleats radiating from a high Mandarin neckline down through a sweeping cocoon hem. Voluminous and weightless.',
    details: [
      'High-grade micro-pleated technical chiffon silk blend',
      'Concealed keyhole closure with genuine pearl button',
      'Separate slip lining in matching tone included',
      'Engineered memory pleats that never lose definition'
    ],
    materials: '70% Silk, 30% Polyamide filament; Pure silk slip',
    care: 'Gentle hand wash inside mesh pouch or specialist dry clean.',
    images: [
      'https://images.unsplash.com/photo-1518049362265-d5b2a6467637?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1200&q=85'
    ],
    sizes: ['One Size Fits Most', 'Custom Length'],
    colors: [
      { name: 'Sunset Topaz', hex: '#D29062' },
      { name: 'Alabaster', hex: '#F0EFEA' },
      { name: 'Deep Emerald', hex: '#1B3B2B' }
    ],
    rating: 4.8,
    reviewCount: 31,
    tags: ['Ready to Wear', 'Dresses', 'Silk & Satin'],
    designerNote: 'A garment designed to capture every ambient breeze with majestic grace.'
  },
  {
    id: 'siya-06',
    name: 'L’Ombre Reversible Cashmere Cocoon Coat',
    tagline: 'Double-faced pure Mongolian cashmere with raw-edge precision',
    price: 1680,
    category: 'Outerwear',
    description: 'Two layers of Grade-A cashmere hand-split and blind-stitched at every seam. Completely reversible with contrasting tonal faces, dropped shoulders, and shawl collar.',
    details: [
      '100% Pure Long-Staple Mongolian Cashmere (680gsm)',
      'Entirely hand-stitched blind seams (over 18 hours per piece)',
      'Deep patch pockets on both exterior and interior faces',
      'Detachable sash tie belt with hand-fringed ends'
    ],
    materials: '100% Pure Mongolian Cashmere',
    care: 'Dry clean only. Store folded in breathable cotton garment bag.',
    images: [
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1200&q=85'
    ],
    sizes: ['XS/S', 'M/L', 'L/XL'],
    colors: [
      { name: 'Oatmeal & Hazel', hex: '#C7B9A5' },
      { name: 'Slate & Black', hex: '#42454B' }
    ],
    rating: 4.9,
    reviewCount: 16,
    tags: ['Quiet Luxury', 'Outerwear', 'Couture'],
    isBestSeller: true,
    designerNote: 'Enveloping tactile warmth that feels like a whisper yet shields against harsh winter chills.'
  },
  {
    id: 'siya-07',
    name: 'Atelier Sculpted Leather Tote',
    tagline: 'Vegetable-tanned saddle leather with polished brass hardware',
    price: 620,
    category: 'Accessories',
    description: 'Constructed around clean architectural curves. Crafted from Tuscan vegetable-tanned calfskin that patinas richly over time. Fits a 15-inch laptop and essentials.',
    details: [
      'Full-grain Italian Tuscan vegetable-tanned calfskin',
      'Hand-painted raw edges with beeswax finish',
      'Solid brushed brass hardware cast in Florence',
      'Removable zipped suede interior organizer pouch'
    ],
    materials: '100% Vegetable-Tanned Full Grain Leather; Calf suede lining',
    care: 'Condition once annually with organic beeswax leather balm.',
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=85'
    ],
    sizes: ['Standard', 'Mini Atelier'],
    colors: [
      { name: 'Cognac Saddle', hex: '#8B4E2B' },
      { name: 'Espresso Bean', hex: '#2A1F1D' },
      { name: 'Bone Taupe', hex: '#D1C7BA' }
    ],
    rating: 4.9,
    reviewCount: 54,
    tags: ['Accessories', 'Quiet Luxury', 'Minimalist'],
    designerNote: 'Pure geometry designed to stand unsupported without compromising soft tactile handling.'
  },
  {
    id: 'siya-08',
    name: 'Vesper Backless Halter Velvet Gown',
    tagline: 'Silk-blend fluid velvet with an arresting low-plunge spine',
    price: 940,
    originalPrice: 1190,
    category: 'Dresses',
    description: 'A striking statement piece designed for dramatic entrances. Luxuriously supple silk-blend velvet falls liquidly to the floor, anchored by a delicate high neck halter clasp.',
    details: [
      'Silk-rayon blend fluid velvet with deep light refraction',
      'Hand-carved horn button nape clasp',
      'Plunging low open back down to the lumbar curve',
      'Weighted hem with invisible horsehair braid for dramatic drape'
    ],
    materials: '82% Rayon, 18% Silk Velvet; Silk georgette inner facing',
    care: 'Dry clean only. Never iron directly; steam from reverse distance only.',
    images: [
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=85'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'Custom Atelier'],
    colors: [
      { name: 'Deep Sapphire', hex: '#16233B' },
      { name: 'Dark Burgundy', hex: '#40131B' },
      { name: 'Midnight Onyx', hex: '#111111' }
    ],
    rating: 4.8,
    reviewCount: 29,
    tags: ['Couture', 'Dresses', 'Evening'],
    isNew: true,
    designerNote: 'Balancing conservative high-neck framing with an unexpectedly daring back revelation.'
  }
];

export const INITIAL_REVIEWS: Record<string, Review[]> = {
  'siya-01': [
    {
      id: 'rev-01',
      productId: 'siya-01',
      author: 'Clara Vance-Moreau',
      rating: 5,
      date: '2 weeks ago',
      title: 'Museum-quality silk craftsmanship',
      comment: 'The weight of the 32 momme silk is incomparable. The bias cut conforms gracefully without clinging. Wore it to the Venice Biennale gala and received compliments all evening.',
      verified: true,
      fitFeedback: 'True to Size'
    },
    {
      id: 'rev-02',
      productId: 'siya-01',
      author: 'Evelyn St. Clair',
      rating: 5,
      date: '1 month ago',
      title: 'Bespoke precision',
      comment: 'Ordered the Custom Atelier size. SIYA’s tailoring team sent swatch cards beforehand and the measurements arrived millimeter-perfect. Truly haute couture.',
      verified: true,
      fitFeedback: 'True to Size'
    }
  ],
  'siya-02': [
    {
      id: 'rev-03',
      productId: 'siya-02',
      author: 'Marcus Dupont',
      rating: 5,
      date: '3 weeks ago',
      title: 'The definitive modern trench',
      comment: 'The collar architecture stays upright without stiffness. The weight of the British gabardine repels rainfall effortlessly. Essential wardrobe anchor.',
      verified: true,
      fitFeedback: 'True to Size'
    }
  ],
  'siya-04': [
    {
      id: 'rev-04',
      productId: 'siya-04',
      author: 'Sophia Zhang',
      rating: 5,
      date: '1 week ago',
      title: 'Flawless hourglass silhouette',
      comment: 'The waist sculpting without discomfort is an engineering feat. You feel instant posture and poise the moment you slip your arms through.',
      verified: true,
      fitFeedback: 'True to Size'
    }
  ]
};

export const STYLE_VIBES = [
  {
    id: 'quiet-luxury',
    title: 'Quiet Luxury',
    subtitle: 'Understated neutrals, heavy silks, tactile cashmere',
    tag: 'Quiet Luxury',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80',
    quote: 'True luxury whispers through exceptional craftsmanship and tactile serenity.'
  },
  {
    id: 'architectural',
    title: 'Architectural Tailoring',
    subtitle: 'Sharp shoulders, structured lapels, cinched waistlines',
    tag: 'Tailoring',
    image: 'https://images.unsplash.com/photo-1548624149-f9b1859aa9d0?auto=format&fit=crop&w=600&q=80',
    quote: 'Geometric precision framing human form with sculptural boldness.'
  },
  {
    id: 'fluid-silk',
    title: 'Silk & Fluidity',
    subtitle: 'Bias-cut drape, liquid movement, incandescent sheen',
    tag: 'Silk & Satin',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=600&q=80',
    quote: 'Weightless elegance that moves effortlessly with every step.'
  },
  {
    id: 'couture-nocturne',
    title: 'Nocturne Couture',
    subtitle: 'Dramatic gala gowns, deep velvet, backless silhouettes',
    tag: 'Couture',
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=600&q=80',
    quote: 'Sensuous, mysterious, and unapologetically arresting eveningwear.'
  }
];
