import { Link } from "wouter";
import { Check, ArrowRight } from "lucide-react";

const services = [
  {
    icon: "🪪",
    title: "ID Card Design & Printing",
    slug: "id-card",
    desc: "We create professional, high-quality ID cards for schools, colleges, offices, and businesses. Custom design with your logo, branding, and information.",
    features: [
      "Custom Design",
      "Front & Back",
      "High-resolution Print",
      "Quick Delivery",
      "Bulk Orders Available",
    ],
    color: "from-red-600 to-red-900",
  },
  {
    icon: "✏️",
    title: "Logo Design",
    slug: "logo",
    desc: "Stand out with a unique, professional logo that captures your brand identity. We create logos that leave a lasting impression.",
    features: [
      "3 Unique Concepts",
      "Unlimited Revisions",
      "All File Formats (AI, PNG, SVG)",
      "Color & Black/White Versions",
      "Brand Guidelines",
    ],
    color: "from-rose-700 to-red-950",
  },
  {
    icon: "🎬",
    title: "Short Video Editing",
    slug: "video",
    desc: "Engaging, scroll-stopping reels, YouTube Shorts, and Instagram videos. We edit your raw footage into viral-worthy content.",
    features: [
      "Reels & Shorts",
      "Captions & Subtitles",
      "Trending Music",
      "Color Grading",
      "Fast Turnaround",
    ],
    color: "from-red-800 to-black",
  },
];

const pricingPlans = [
  {
    name: "Basic",
    price: "₹299",
    period: "per project",
    desc: "Perfect for individuals and small needs",
    features: [
      "1 Service Item",
      "2 Revisions",
      "Standard Quality",
      "3-5 Day Delivery",
      "WhatsApp Support",
    ],
    highlighted: false,
  },
  {
    name: "Standard",
    price: "₹699",
    period: "per project",
    desc: "Best for small businesses",
    features: [
      "2 Service Items",
      "5 Revisions",
      "High Quality",
      "2-3 Day Delivery",
      "Priority Support",
      "Source Files",
    ],
    highlighted: true,
  },
  {
    name: "Premium",
    price: "₹1499",
    period: "per project",
    desc: "Full-featured for growing brands",
    features: [
      "All Services Included",
      "Unlimited Revisions",
      "Premium Quality",
      "Same Day / 1 Day Delivery",
      "24/7 Support",
      "All Source Files",
      "Brand Kit Included",
    ],
    highlighted: false,
  },
];

export default function Services() {
  return (
    <div className="pt-16">
      {/* Header */}
      <section className="hero-gradient py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-primary text-sm font-bold uppercase tracking-widest">What We Offer</span>
          <h1 className="text-4xl sm:text-5xl font-black text-white mt-2 mb-4">Our Services</h1>
          <p className="text-gray-300 max-w-xl mx-auto">
            Professional digital services tailored to your brand needs — quality guaranteed at every step.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.title}
                className="card-hover rounded-2xl border border-border bg-card overflow-hidden"
                data-testid={`card-service-${service.title.toLowerCase().replace(/\s+/g, '-').replace(/[&]/g, '')}`}
              >
                <div className={`bg-gradient-to-br ${service.color} p-8 flex items-center justify-center`}>
                  <span className="text-6xl">{service.icon}</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground mb-5 leading-relaxed">{service.desc}</p>

                  {/* ID Card Preview */}
                  {service.title === "ID Card Design & Printing" && (
                    <div className="mb-5 p-3 bg-gradient-to-br from-red-600 to-black rounded-xl text-white text-xs font-mono shadow-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-bold">JJ</div>
                        <div>
                          <div className="font-bold text-[10px]">JAYSAWAL JEE</div>
                          <div className="text-white/70 text-[9px]">DIGITAL SERVICES</div>
                        </div>
                      </div>
                      <div className="text-[9px] text-white/80 mt-1">ID: JDS-2024-001</div>
                      <div className="text-[9px] text-white/80">Valid Till: Dec 2025</div>
                    </div>
                  )}

                  <ul className="space-y-2">
                    {service.features.map((feat) => (
                      <li key={feat} className="flex items-center gap-2 text-sm text-foreground">
                        <Check size={14} className="text-primary flex-shrink-0" />
                        {feat}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={`/order?service=${service.slug}`}
                    className="mt-6 flex items-center justify-center gap-2 w-full bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground border border-primary/30 hover:border-primary py-2.5 rounded-lg text-sm font-semibold transition-all"
                    data-testid={`button-service-order-${service.slug}`}
                  >
                    Order Now <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-primary text-sm font-bold uppercase tracking-widest">Simple & Clear</span>
            <h2 className="text-3xl sm:text-4xl font-black text-foreground mt-2">Pricing Plans</h2>
            <p className="text-muted-foreground mt-3">Choose the plan that fits your needs and budget</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                data-testid={`card-pricing-${plan.name.toLowerCase()}`}
                className={`card-hover rounded-2xl overflow-hidden border ${
                  plan.highlighted
                    ? "border-primary bg-card shadow-2xl shadow-primary/20 scale-105 relative"
                    : "border-border bg-card"
                }`}
              >
                {plan.highlighted && (
                  <div className="bg-primary text-white text-xs font-bold text-center py-2 tracking-widest uppercase">
                    Most Popular
                  </div>
                )}
                <div className="p-7">
                  <h3 className="text-lg font-bold text-foreground">{plan.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1 mb-4">{plan.desc}</p>
                  <div className="flex items-end gap-1 mb-6">
                    <span className="text-4xl font-black text-primary">{plan.price}</span>
                    <span className="text-xs text-muted-foreground mb-1.5">{plan.period}</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feat) => (
                      <li key={feat} className="flex items-center gap-2 text-sm text-foreground">
                        <Check size={14} className="text-primary flex-shrink-0" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/order?service=${plan.name.toLowerCase()}`}
                    data-testid={`button-pricing-${plan.name.toLowerCase()}`}
                    className={`block text-center py-3 rounded-lg text-sm font-bold transition-all ${
                      plan.highlighted
                        ? "bg-primary text-white hover:bg-primary/90"
                        : "border border-primary text-primary hover:bg-primary hover:text-white"
                    }`}
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
