import { Code2, Video, Palette, Award, Target, Heart } from "lucide-react";

const skills = [
  { name: "ID Card Design", percent: 95 },
  { name: "Logo Design", percent: 90 },
  { name: "Video Editing", percent: 88 },
  { name: "Social Media Content", percent: 85 },
  { name: "Branding", percent: 80 },
];

const tools = [
  { icon: <Palette size={20} />, name: "Adobe Photoshop" },
  { icon: <Palette size={20} />, name: "Adobe Illustrator" },
  { icon: <Video size={20} />, name: "Adobe Premiere Pro" },
  { icon: <Code2 size={20} />, name: "Canva Pro" },
  { icon: <Video size={20} />, name: "CapCut" },
  { icon: <Palette size={20} />, name: "CorelDRAW" },
];

const values = [
  {
    icon: <Award size={22} className="text-primary" />,
    title: "Quality First",
    desc: "Every project is crafted with attention to detail and professional standards.",
  },
  {
    icon: <Target size={22} className="text-primary" />,
    title: "On-Time Delivery",
    desc: "We respect your time and always deliver projects as promised.",
  },
  {
    icon: <Heart size={22} className="text-primary" />,
    title: "Client Satisfaction",
    desc: "Your satisfaction is our priority — we work until you're 100% happy.",
  },
];

export default function About() {
  return (
    <div className="pt-16">
      {/* Header */}
      <section className="hero-gradient py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-primary text-sm font-bold uppercase tracking-widest">Who We Are</span>
          <h1 className="text-4xl sm:text-5xl font-black text-white mt-2 mb-4">About Us</h1>
          <p className="text-gray-300 max-w-xl mx-auto">
            Passionate digital creators helping small businesses and individuals grow their brand.
          </p>
        </div>
      </section>

      {/* Bio */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Profile Card */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-64 h-64 sm:w-80 sm:h-80 bg-gradient-to-br from-red-600 via-red-900 to-black rounded-3xl flex items-center justify-center shadow-2xl shadow-primary/30">
                  <div className="text-center text-white">
                    <div className="text-7xl sm:text-8xl mb-3">👨‍💻</div>
                    <div className="font-bold text-lg">Jaysawal Jee</div>
                    <div className="text-sm text-white/90 font-semibold">Aman Kumar Jaysawal</div>
                    <div className="text-sm text-white/70">Digital Creator</div>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 bg-primary rounded-2xl px-4 py-2 shadow-lg">
                  <div className="text-white text-xs font-bold">3+ Years</div>
                  <div className="text-white/80 text-xs">Experience</div>
                </div>
              </div>
            </div>

            {/* Bio Text */}
            <div>
              <h2 className="text-3xl sm:text-4xl font-black text-foreground mb-6">
                Hi, I'm <span className="gradient-text">Jaysawal Jee</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-5">
                Main ek passionate digital creator hoon jo last 3+ years se ID card design, logo creation aur video editing ka kaam kar raha hoon. Mere paas 500+ satisfied clients ka experience hai.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                My mission is simple — to provide high quality digital services at affordable prices, so that every small business and individual can have a professional brand presence online and offline.
              </p>

              <div className="grid grid-cols-3 gap-4">
                <div className="text-center bg-card border border-border rounded-xl p-4">
                  <div className="text-2xl font-black text-primary">500+</div>
                  <div className="text-xs text-muted-foreground mt-1">Clients</div>
                </div>
                <div className="text-center bg-card border border-border rounded-xl p-4">
                  <div className="text-2xl font-black text-primary">1000+</div>
                  <div className="text-xs text-muted-foreground mt-1">Projects</div>
                </div>
                <div className="text-center bg-card border border-border rounded-xl p-4">
                  <div className="text-2xl font-black text-primary">3+</div>
                  <div className="text-xs text-muted-foreground mt-1">Years</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-primary text-sm font-bold uppercase tracking-widest">Expertise</span>
            <h2 className="text-3xl sm:text-4xl font-black text-foreground mt-2">Skills & Proficiency</h2>
          </div>

          <div className="space-y-6">
            {skills.map((skill) => (
              <div key={skill.name} data-testid={`skill-${skill.name.toLowerCase().replace(/\s+/g, '-')}`}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-foreground">{skill.name}</span>
                  <span className="text-sm font-bold text-primary">{skill.percent}%</span>
                </div>
                <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-red-600 to-red-400 rounded-full transition-all duration-1000"
                    style={{ width: `${skill.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-primary text-sm font-bold uppercase tracking-widest">Tech Stack</span>
            <h2 className="text-3xl sm:text-4xl font-black text-foreground mt-2">Tools I Use</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 max-w-4xl mx-auto">
            {tools.map((tool) => (
              <div
                key={tool.name}
                className="card-hover flex flex-col items-center gap-2 p-4 rounded-xl bg-card border border-border text-center"
                data-testid={`card-tool-${tool.name.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <div className="text-primary">{tool.icon}</div>
                <span className="text-xs font-medium text-muted-foreground">{tool.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-primary text-sm font-bold uppercase tracking-widest">Our Promise</span>
            <h2 className="text-3xl sm:text-4xl font-black text-foreground mt-2">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v) => (
              <div
                key={v.title}
                className="card-hover text-center p-8 rounded-2xl bg-card border border-border"
                data-testid={`card-value-${v.title.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  {v.icon}
                </div>
                <h3 className="text-lg font-bold text-foreground mb-3">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
