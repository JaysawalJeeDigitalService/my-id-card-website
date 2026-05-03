import { useState } from "react";
import { Play, ZoomIn } from "lucide-react";

const categories = ["All", "ID Cards", "Logos", "Videos"];

const portfolioItems = [
  { id: 1, category: "ID Cards", title: "Corporate ID Card", type: "image", bg: "from-red-700 to-black", emoji: "🪪" },
  { id: 2, category: "Logos", title: "Tech Startup Logo", type: "image", bg: "from-rose-600 to-red-900", emoji: "✏️" },
  { id: 3, category: "Videos", title: "Product Reel", type: "video", bg: "from-red-900 to-black", emoji: "🎬" },
  { id: 4, category: "ID Cards", title: "School ID Card", type: "image", bg: "from-red-600 to-rose-900", emoji: "🪪" },
  { id: 5, category: "Logos", title: "Restaurant Logo", type: "image", bg: "from-red-800 to-black", emoji: "✏️" },
  { id: 6, category: "Videos", title: "Instagram Reel", type: "video", bg: "from-rose-700 to-black", emoji: "🎬" },
  { id: 7, category: "ID Cards", title: "Office ID Card", type: "image", bg: "from-red-700 to-rose-950", emoji: "🪪" },
  { id: 8, category: "Logos", title: "Fashion Brand Logo", type: "image", bg: "from-red-950 to-black", emoji: "✏️" },
  { id: 9, category: "Videos", title: "YouTube Short", type: "video", bg: "from-red-600 to-red-950", emoji: "🎬" },
];

const beforeAfterItems = [
  {
    id: 1,
    title: "Logo Redesign",
    before: "Old, outdated logo with no visual impact",
    after: "Modern, clean logo with strong brand identity",
    bgBefore: "from-gray-600 to-gray-800",
    bgAfter: "from-red-600 to-black",
  },
  {
    id: 2,
    title: "Video Enhancement",
    before: "Raw, unedited footage with no color grade",
    after: "Color-graded, engaging reel with effects & music",
    bgBefore: "from-gray-700 to-gray-900",
    bgAfter: "from-rose-700 to-black",
  },
];

export default function Portfolio() {
  const [active, setActive] = useState("All");

  const filtered = active === "All"
    ? portfolioItems
    : portfolioItems.filter((i) => i.category === active);

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="hero-gradient py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-primary text-sm font-bold uppercase tracking-widest">Our Work</span>
          <h1 className="text-4xl sm:text-5xl font-black text-white mt-2 mb-4">Portfolio</h1>
          <p className="text-gray-300 max-w-xl mx-auto">
            A showcase of our finest work — ID cards, logos, and video edits for real clients.
          </p>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <div className="flex items-center justify-center flex-wrap gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                data-testid={`button-filter-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                  active === cat
                    ? "bg-primary text-white shadow-lg shadow-primary/30"
                    : "bg-muted text-muted-foreground hover:text-primary hover:bg-primary/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="card-hover group relative rounded-2xl overflow-hidden border border-border"
                data-testid={`card-portfolio-${item.id}`}
              >
                <div className={`bg-gradient-to-br ${item.bg} h-52 flex items-center justify-center`}>
                  <span className="text-6xl">{item.emoji}</span>
                  {item.type === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                        <Play size={20} className="text-white fill-white ml-1" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="text-center text-white">
                    <ZoomIn size={28} className="mx-auto mb-2" />
                    <p className="text-sm font-semibold">{item.title}</p>
                    <p className="text-xs text-white/70 mt-1">{item.category}</p>
                  </div>
                </div>

                <div className="p-4 bg-card">
                  <h3 className="font-semibold text-foreground text-sm">{item.title}</h3>
                  <span className="text-xs text-primary font-medium">{item.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before & After */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-primary text-sm font-bold uppercase tracking-widest">Transformations</span>
            <h2 className="text-3xl sm:text-4xl font-black text-foreground mt-2">Before & After</h2>
            <p className="text-muted-foreground mt-3">See the difference our work makes</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {beforeAfterItems.map((item) => (
              <div key={item.id} data-testid={`card-before-after-${item.id}`}>
                <h3 className="text-lg font-bold text-foreground mb-4 text-center">{item.title}</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className={`bg-gradient-to-br ${item.bgBefore} h-36 rounded-xl flex items-center justify-center mb-2`}>
                      <span className="text-white/60 text-sm font-medium">Before</span>
                    </div>
                    <div className="bg-muted rounded-lg p-3">
                      <p className="text-xs text-muted-foreground">{item.before}</p>
                    </div>
                  </div>
                  <div>
                    <div className={`bg-gradient-to-br ${item.bgAfter} h-36 rounded-xl flex items-center justify-center mb-2 shadow-lg shadow-primary/20`}>
                      <span className="text-white font-semibold text-sm">After ✨</span>
                    </div>
                    <div className="bg-primary/10 rounded-lg p-3 border border-primary/20">
                      <p className="text-xs text-foreground">{item.after}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
