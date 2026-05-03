import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Check, Send, CheckCircle, ArrowLeft, ChevronRight, Tag } from "lucide-react";

interface Category { id: string; name: string; icon: string; serviceType: string; }
interface Product { id: string; categoryId: string; name: string; price: string; description: string; }
interface Order {
  id: string; name: string; phone: string; service: string; plan: string;
  productName?: string; details: string; status: "pending" | "in-progress" | "completed" | "cancelled" | "paid"; time: string;
}

const DEFAULT_CATEGORIES: Category[] = [
  { id: "cat-1", name: "ID Card Design", icon: "🪪", serviceType: "id-card" },
  { id: "cat-2", name: "Logo Design", icon: "✏️", serviceType: "logo" },
  { id: "cat-3", name: "Video Editing", icon: "🎬", serviceType: "video" },
];
const DEFAULT_PRODUCTS: Product[] = [
  { id: "p-1", categoryId: "cat-1", name: "Student ID Card", price: "₹99", description: "School/College students ke liye" },
  { id: "p-2", categoryId: "cat-1", name: "Business ID Card", price: "₹149", description: "Business professionals ke liye" },
  { id: "p-3", categoryId: "cat-1", name: "Office ID Card", price: "₹129", description: "Company employees ke liye" },
  { id: "p-4", categoryId: "cat-1", name: "School ID Card", price: "₹89", description: "Bulk school ID cards" },
  { id: "p-5", categoryId: "cat-2", name: "Business Logo", price: "₹499", description: "Professional business logo" },
  { id: "p-6", categoryId: "cat-2", name: "Restaurant Logo", price: "₹449", description: "Food business logo" },
  { id: "p-7", categoryId: "cat-2", name: "YouTube Logo", price: "₹399", description: "YouTube channel branding" },
  { id: "p-8", categoryId: "cat-3", name: "Instagram Reel", price: "₹299", description: "Trending reels editing" },
  { id: "p-9", categoryId: "cat-3", name: "YouTube Short", price: "₹249", description: "Viral YouTube shorts" },
  { id: "p-10", categoryId: "cat-3", name: "Promotional Video", price: "₹599", description: "Business promotion video" },
];

function saveOrder(data: Omit<Order, "id" | "status" | "time">) {
  const existing: Order[] = JSON.parse(localStorage.getItem("jds_orders") || "[]");
  const newOrder: Order = {
    id: "ORD-" + Date.now().toString().slice(-6),
    ...data,
    status: "pending",
    time: new Date().toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }),
  };
  existing.unshift(newOrder);
  localStorage.setItem("jds_orders", JSON.stringify(existing));
  return newOrder.id;
}

type Step = "category" | "product" | "details";

export default function Order() {
  useLocation();
  // Use window.location.search for reliable query param parsing (wouter may strip query)
  const params = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");
  const preService = params.get("service") || "";

  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [step, setStep] = useState<Step>("category");
  const [selectedCat, setSelectedCat] = useState<Category | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [details, setDetails] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const cats: Category[] = JSON.parse(localStorage.getItem("jds_categories") || JSON.stringify(DEFAULT_CATEGORIES));
    const prods: Product[] = JSON.parse(localStorage.getItem("jds_products") || JSON.stringify(DEFAULT_PRODUCTS));
    setCategories(cats);
    setProducts(prods);
    if (preService) {
      const matchCat = cats.find((c) => c.serviceType === preService);
      if (matchCat) {
        setSelectedCat(matchCat);
        setStep("product");
      }
    }
  }, []);

  const catProducts = products.filter((p) => p.categoryId === selectedCat?.id);

  // When coming from a service card, we show 2 steps: Product (1) → Details (2)
  // When coming fresh, we show 3 steps: Category (1) → Product (2) → Details (3)
  const fromService = Boolean(preService);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !selectedCat) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    const id = saveOrder({
      name,
      phone,
      service: selectedCat.serviceType,
      productName: selectedProduct?.name,
      plan: "basic",
      details,
    });
    setOrderId(id);
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="pt-16 min-h-screen bg-background flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center bg-card border border-border rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-green-600 to-green-900 py-10 px-8">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={48} className="text-white" />
            </div>
            <h2 className="text-2xl font-black text-white">Order Placed! 🎉</h2>
          </div>
          <div className="p-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-4 py-2 mb-4">
              <span className="text-xs text-muted-foreground">Order ID:</span>
              <span className="text-sm font-black text-primary">{orderId}</span>
            </div>
            <p className="text-muted-foreground mb-1 text-sm">
              Thank you <strong>{name}</strong>! Aapka order receive ho gaya hai.
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              {selectedCat?.icon} <strong>{selectedProduct?.name || selectedCat?.name}</strong> ka order confirm karne ke liye WhatsApp karein.
            </p>
            <div className="flex flex-col gap-3">
              <a
                href={`https://wa.me/916284731558?text=Hi%2C%20mera%20order%20ID%20${orderId}%20hai.%20Service%3A%20${encodeURIComponent(selectedProduct?.name || selectedCat?.name || "")}`}
                target="_blank" rel="noopener noreferrer" data-testid="button-order-whatsapp"
                className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-white px-6 py-3 rounded-xl font-bold text-sm transition-all">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                WhatsApp pe Confirm Karein
              </a>
              <Link href="/" className="flex items-center justify-center gap-2 border border-border text-foreground hover:border-primary hover:text-primary px-6 py-3 rounded-xl font-semibold text-sm transition-all">
                Home par Jaayein
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16">
      <section className="hero-gradient py-14">
        <div className="max-w-3xl mx-auto px-4 text-center">
          {selectedCat && fromService ? (
            <>
              <div className="text-5xl mb-3">{selectedCat.icon}</div>
              <span className="text-primary text-sm font-bold uppercase tracking-widest">Order Karein</span>
              <h1 className="text-3xl sm:text-4xl font-black text-white mt-1 mb-2">{selectedCat.name}</h1>
              <p className="text-gray-300 text-sm">Apna plan choose karein aur order place karein</p>
            </>
          ) : (
            <>
              <span className="text-primary text-sm font-bold uppercase tracking-widest">Order Karein</span>
              <h1 className="text-3xl sm:text-4xl font-black text-white mt-2 mb-2">Service Order Karein</h1>
              <p className="text-gray-300 text-sm">Niche steps follow karein aur apna order place karein</p>
            </>
          )}
        </div>
      </section>

      <section className="py-10 bg-background">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft size={14} /> Services par wapas jaayein
          </Link>

          {/* STEP: Category (only shown when not coming from service card) */}
          {step === "category" && !fromService && (
            <div>
              <h2 className="text-xl font-black mb-4">Step 1: Service Category Select Karein</h2>
              <div className="grid grid-cols-1 gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => { setSelectedCat(cat); setSelectedProduct(null); setStep("product"); }}
                    data-testid={`button-cat-${cat.id}`}
                    className="flex items-center gap-4 p-5 rounded-2xl border-2 border-border hover:border-primary hover:bg-primary/5 transition-all text-left group"
                  >
                    <span className="text-4xl">{cat.icon}</span>
                    <div className="flex-1">
                      <div className="font-bold text-foreground">{cat.name}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {products.filter((p) => p.categoryId === cat.id).length} options available
                      </div>
                    </div>
                    <ChevronRight size={18} className="text-muted-foreground group-hover:text-primary transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP: Product selection */}
          {step === "product" && selectedCat && (
            <div>
              <div className="flex items-center gap-3 mb-5">
                {!fromService && (
                  <button
                    onClick={() => setStep("category")}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <ArrowLeft size={16} />
                  </button>
                )}
                <div>
                  <h2 className="text-xl font-black">
                    {selectedCat.icon} {selectedCat.name}
                  </h2>
                  <p className="text-xs text-muted-foreground mt-0.5">Apna product select karein</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                {catProducts.map((prod) => (
                  <button
                    key={prod.id}
                    onClick={() => setSelectedProduct(prod)}
                    data-testid={`button-prod-${prod.id}`}
                    className={`flex flex-col gap-2 p-5 rounded-2xl border-2 text-left transition-all relative ${
                      selectedProduct?.id === prod.id
                        ? "border-primary bg-primary/10 shadow-lg shadow-primary/10"
                        : "border-border hover:border-primary/50 hover:bg-primary/5"
                    }`}
                  >
                    {selectedProduct?.id === prod.id && (
                      <div className="absolute top-3 right-3 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                        <Check size={11} className="text-white" />
                      </div>
                    )}
                    <div className="flex items-start justify-between gap-2 pr-6">
                      <span className="font-bold text-foreground leading-tight">{prod.name}</span>
                    </div>
                    {prod.description && (
                      <span className="text-xs text-muted-foreground">{prod.description}</span>
                    )}
                    <div className="flex items-center gap-1 mt-1">
                      <Tag size={12} className="text-primary" />
                      <span className="text-primary font-black text-lg">{prod.price}</span>
                    </div>
                  </button>
                ))}
              </div>

              <button
                onClick={() => setStep("details")}
                disabled={!selectedProduct}
                data-testid="button-next-to-details"
                className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white py-3.5 rounded-xl font-bold text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-primary/20"
              >
                {selectedProduct
                  ? <>Aage Badhein — {selectedProduct.price} <ChevronRight size={16} /></>
                  : <>Pehle Ek Plan Select Karein <ChevronRight size={16} /></>
                }
              </button>
            </div>
          )}

          {/* STEP: Details */}
          {step === "details" && (
            <div>
              <div className="flex items-center gap-2 mb-5">
                <button
                  onClick={() => setStep("product")}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <ArrowLeft size={16} />
                </button>
                <h2 className="text-xl font-black">Apni Details Bharein</h2>
              </div>

              {/* Order Summary */}
              <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4 mb-6">
                <div className="text-xs text-muted-foreground font-semibold uppercase tracking-wide mb-3">Order Summary</div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{selectedCat?.icon}</span>
                    <div>
                      <div className="font-bold text-foreground text-sm">{selectedProduct?.name}</div>
                      <div className="text-xs text-muted-foreground">{selectedCat?.name}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-black text-primary">{selectedProduct?.price}</div>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Full Name *</label>
                  <input
                    type="text" value={name} onChange={(e) => setName(e.target.value)} required
                    placeholder="Aapka poora naam"
                    data-testid="input-order-name"
                    className="w-full bg-card border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Phone Number *</label>
                  <input
                    type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required
                    placeholder="+91 XXXXXXXXXX"
                    data-testid="input-order-phone"
                    className="w-full bg-card border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Project Details <span className="text-muted-foreground font-normal">(Optional)</span>
                  </label>
                  <textarea
                    value={details} onChange={(e) => setDetails(e.target.value)} rows={3}
                    placeholder="Koi specific requirement? Colors, text, style batayein..."
                    data-testid="input-order-details"
                    className="w-full bg-card border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                  />
                </div>
                <button
                  type="submit" disabled={loading} data-testid="button-place-order"
                  className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white py-4 rounded-2xl font-black text-base transition-all disabled:opacity-50 shadow-xl shadow-primary/30"
                >
                  {loading
                    ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    : <><Send size={18} /> Order Place Karein 🚀</>
                  }
                </button>
              </form>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
