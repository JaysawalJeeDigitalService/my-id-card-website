import { useState } from "react";
import { SiWhatsapp, SiInstagram, SiYoutube } from "react-icons/si";
import { MessageCircle, Send, CheckCircle } from "lucide-react";

interface Inquiry {
  id: string;
  name: string;
  phone: string;
  message: string;
  time: string;
  read: boolean;
}

function saveInquiry(data: { name: string; phone: string; message: string }) {
  const existing: Inquiry[] = JSON.parse(localStorage.getItem("jds_inquiries") || "[]");
  const newInquiry: Inquiry = {
    id: Date.now().toString(),
    name: data.name,
    phone: data.phone,
    message: data.message,
    time: new Date().toLocaleString("en-IN", {
      day: "2-digit", month: "short", year: "numeric",
      hour: "2-digit", minute: "2-digit",
    }),
    read: false,
  };
  existing.unshift(newInquiry);
  localStorage.setItem("jds_inquiries", JSON.stringify(existing));
}

export default function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.message) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    saveInquiry(form);
    setLoading(false);
    setSubmitted(true);
  };

  const whatsappMsg = encodeURIComponent(
    `Hello, I'm ${form.name || "interested"} and I need your digital services. Please contact me.`
  );

  return (
    <div className="pt-16">
      <section className="hero-gradient py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-primary text-sm font-bold uppercase tracking-widest">Get In Touch</span>
          <h1 className="text-4xl sm:text-5xl font-black text-white mt-2 mb-4">Contact Us</h1>
          <p className="text-gray-300 max-w-xl mx-auto">
            Ready to start your project? Reach out to us and we'll get back to you within hours.
          </p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3">
              <h2 className="text-2xl font-black text-foreground mb-6">Send a Message</h2>

              {submitted ? (
                <div className="flex flex-col items-center justify-center py-16 text-center bg-card border border-border rounded-2xl">
                  <CheckCircle size={56} className="text-primary mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground mb-6 max-w-xs">
                    Thank you, {form.name}! We'll get back to you on <strong>{form.phone}</strong> very soon.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: "", phone: "", message: "" }); }}
                    className="bg-primary text-white px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-primary/90 transition-all"
                    data-testid="button-send-another"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2" htmlFor="name">Full Name *</label>
                    <input
                      id="name" name="name" type="text" value={form.name}
                      onChange={handleChange} required
                      placeholder="Apna naam enter karein"
                      data-testid="input-name"
                      className="w-full bg-card border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2" htmlFor="phone">Phone Number *</label>
                    <input
                      id="phone" name="phone" type="tel" value={form.phone}
                      onChange={handleChange} required
                      placeholder="+91 XXXXXXXXXX"
                      data-testid="input-phone"
                      className="w-full bg-card border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2" htmlFor="message">Message *</label>
                    <textarea
                      id="message" name="message" value={form.message}
                      onChange={handleChange} required rows={5}
                      placeholder="Apni requirement batayein... (ID card, logo, video editing, etc.)"
                      data-testid="input-message"
                      className="w-full bg-card border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      type="submit" disabled={loading}
                      data-testid="button-submit-form"
                      className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white py-3 rounded-lg font-bold text-sm transition-all disabled:opacity-70 shadow-lg shadow-primary/30"
                    >
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </span>
                      ) : (
                        <><Send size={16} /> Send Message</>
                      )}
                    </button>

                    <a
                      href={`https://wa.me/916284731558?text=${whatsappMsg}`}
                      target="_blank" rel="noopener noreferrer"
                      data-testid="button-whatsapp-contact"
                      className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-white py-3 px-6 rounded-lg font-bold text-sm transition-all shadow-lg shadow-green-500/30"
                    >
                      <SiWhatsapp size={16} /> WhatsApp
                    </a>
                  </div>
                </form>
              )}
            </div>

            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="text-2xl font-black text-foreground mb-6">Quick Contact</h2>
                <a
                  href="https://wa.me/916284731558"
                  target="_blank" rel="noopener noreferrer"
                  data-testid="link-whatsapp-main"
                  className="flex items-center gap-4 p-5 bg-green-500/10 border border-green-500/30 rounded-2xl hover:bg-green-500/20 transition-all group"
                >
                  <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform">
                    <SiWhatsapp size={22} />
                  </div>
                  <div>
                    <div className="font-bold text-foreground text-sm">WhatsApp Us</div>
                    <div className="text-muted-foreground text-xs mt-0.5">+91 6284731558</div>
                    <div className="text-green-600 dark:text-green-400 text-xs font-medium mt-1">Available 9am – 9pm</div>
                  </div>
                </a>
              </div>

              <div className="bg-card border border-border rounded-2xl p-6">
                <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                  <MessageCircle size={16} className="text-primary" /> Follow Us
                </h3>
                <div className="space-y-3">
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                    data-testid="link-contact-instagram"
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-all">
                    <div className="w-9 h-9 bg-gradient-to-br from-pink-500 to-orange-400 rounded-lg flex items-center justify-center text-white">
                      <SiInstagram size={16} />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-foreground">Instagram</div>
                      <div className="text-xs text-muted-foreground">@jaysawaljee_digital</div>
                    </div>
                  </a>
                  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"
                    data-testid="link-contact-youtube"
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-all">
                    <div className="w-9 h-9 bg-red-600 rounded-lg flex items-center justify-center text-white">
                      <SiYoutube size={16} />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-foreground">YouTube</div>
                      <div className="text-xs text-muted-foreground">Jaysawal Jee Digital</div>
                    </div>
                  </a>
                </div>
              </div>

              <div className="bg-primary/5 border border-primary/20 rounded-2xl p-5">
                <div className="font-bold text-foreground mb-2 text-sm">Response Time</div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Hum generally <span className="text-primary font-semibold">1-2 ghante</span> mein respond karte hain. WhatsApp pe fastest response milega.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
