import { Link } from "wouter";
import { ArrowRight, Star, CheckCircle, Zap } from "lucide-react";

const stats = [
  { value: "500+", label: "Happy Clients" },
  { value: "1000+", label: "Projects Done" },
  { value: "3+", label: "Years Experience" },
  { value: "100%", label: "Satisfaction" },
];

const highlights = [
  { icon: <CheckCircle size={18} className="text-primary" />, text: "Fast Delivery — Same Day Available" },
  { icon: <CheckCircle size={18} className="text-primary" />, text: "Professional Quality Work" },
  { icon: <CheckCircle size={18} className="text-primary" />, text: "Affordable Pricing for All Budgets" },
  { icon: <CheckCircle size={18} className="text-primary" />, text: "Free Revisions Included" },
];

const services = [
  {
    icon: "🪪",
    title: "ID Card Design",
    desc: "Professional ID cards for schools, offices, and businesses with premium printing.",
  },
  {
    icon: "✏️",
    title: "Logo Design",
    desc: "Unique, memorable logos that represent your brand perfectly.",
  },
  {
    icon: "🎬",
    title: "Video Editing",
    desc: "Engaging reels, YouTube Shorts, and Instagram content that gets views.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="hero-gradient min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
        {/* Background circles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-900/20 rounded-full blur-3xl" />
          <div className="absolute top-10 right-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 py-20">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-4 py-2 mb-6 animate-fade-in-up">
            <Zap size={14} className="text-primary" />
            <span className="text-xs font-semibold text-primary tracking-wide uppercase">Professional Digital Services</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white leading-tight mb-6 animate-fade-in-up">
            Your Brand,{" "}
            <span className="text-primary">Professionally</span>{" "}
            <br className="hidden sm:block" />
            Crafted
          </h1>

          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up">
            ID Cards, Logos & Video Editing — everything your brand needs to stand out. Fast delivery, professional quality, affordable prices.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up">
            <Link
              href="/contact"
              data-testid="button-hero-cta"
              className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-lg font-bold text-base transition-all hover:gap-3 shadow-xl shadow-primary/30"
            >
              Contact Now <ArrowRight size={18} />
            </Link>
            <Link
              href="/services"
              data-testid="button-hero-services"
              className="flex items-center gap-2 border border-white/20 text-white hover:border-primary hover:text-primary px-8 py-4 rounded-lg font-semibold text-base transition-all"
            >
              View Services
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 max-w-3xl mx-auto">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl font-black text-primary">{s.value}</div>
                <div className="text-xs text-gray-400 mt-1 font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-primary text-sm font-bold uppercase tracking-widest">Why Choose Us</span>
              <h2 className="text-3xl sm:text-4xl font-black text-foreground mt-2 mb-6">
                We Deliver Quality <span className="gradient-text">Every Time</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                At Jaysawal Jee Digital Services, we combine creativity with precision to deliver stunning digital solutions that help your brand grow.
              </p>
              <div className="space-y-4">
                {highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-3">
                    {h.icon}
                    <span className="text-sm font-medium text-foreground">{h.text}</span>
                  </div>
                ))}
              </div>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 mt-8 text-primary font-semibold hover:gap-3 transition-all"
                data-testid="button-learn-more"
              >
                Learn More About Us <ArrowRight size={16} />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {services.map((s) => (
                <div
                  key={s.title}
                  className="card-hover flex items-start gap-4 p-5 rounded-xl bg-card border border-border"
                  data-testid={`card-service-${s.title.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <div className="text-3xl w-12 h-12 flex items-center justify-center bg-primary/10 rounded-xl flex-shrink-0">
                    {s.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">{s.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={20} className="text-yellow-400 fill-yellow-400" />
            ))}
          </div>
          <blockquote className="text-xl sm:text-2xl font-semibold text-foreground leading-relaxed">
            "Bahut hi accha kaam karte hain. Logo aur ID card ekdum professional bana ke diya — time par, reasonable price pe!"
          </blockquote>
          <p className="text-muted-foreground mt-4 font-medium">— Rahul Sharma, Business Owner</p>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        </div>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
            Ready to grow your brand?
          </h2>
          <p className="text-gray-300 mb-8">
            Contact us today and get your project started. Fast turnaround, guaranteed quality.
          </p>
          <Link
            href="/contact"
            data-testid="button-bottom-cta"
            className="inline-flex items-center gap-2 bg-white text-primary hover:bg-gray-100 px-8 py-4 rounded-lg font-bold text-base transition-all shadow-xl"
          >
            Get Started Today <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
