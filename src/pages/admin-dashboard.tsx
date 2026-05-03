import { useState, useEffect } from "react";
import { useLocation, Link } from "wouter";
import {
  LogOut, Trash2, MessageSquare, Phone, User, Clock,
  RefreshCw, ShieldCheck, Inbox, Package, LayoutDashboard,
  ChevronRight, CheckCircle, XCircle, AlertCircle, Loader2,
  ShoppingBag, Plus, Tag, Edit2, Save, X, Search, CheckSquare, Square,
  Download, FileArchive, FileCode
} from "lucide-react";
import logoPath from "@/assets/logo.png";

interface Inquiry {
  id: string; name: string; phone: string; message: string; time: string; read: boolean;
}
interface Order {
  id: string; name: string; phone: string; service: string; plan: string;
  productName?: string; details: string; status: "pending" | "in-progress" | "completed" | "cancelled" | "paid"; time: string;
}
interface Category {
  id: string; name: string; icon: string; serviceType: string;
}
interface Product {
  id: string; categoryId: string; name: string; price: string; description: string;
}

const SERVICE_LABELS: Record<string, string> = {
  "id-card": "🪪 ID Card", "logo": "✏️ Logo Design", "video": "🎬 Video Editing",
};
const PLAN_PRICES: Record<string, string> = {
  basic: "₹299", standard: "₹699", premium: "₹1499",
};
const STATUS_CONFIG = {
  pending: { label: "Pending", color: "bg-yellow-500/10 text-yellow-500 border-yellow-500/30", icon: <AlertCircle size={12} /> },
  "in-progress": { label: "In Progress", color: "bg-blue-500/10 text-blue-500 border-blue-500/30", icon: <Loader2 size={12} className="animate-spin" /> },
  completed: { label: "Completed", color: "bg-green-500/10 text-green-500 border-green-500/30", icon: <CheckCircle size={12} /> },
  cancelled: { label: "Cancelled", color: "bg-red-500/10 text-red-500 border-red-500/30", icon: <XCircle size={12} /> },
  paid: { label: "Paid", color: "bg-emerald-500/10 text-emerald-500 border-emerald-500/30", icon: <CheckCircle size={12} /> },
};

const DEFAULT_CATEGORIES: Category[] = [
  { id: "cat-1", name: "ID Card Design", icon: "🪪", serviceType: "id-card" },
  { id: "cat-2", name: "Logo Design", icon: "✏️", serviceType: "logo" },
  { id: "cat-3", name: "Video Editing", icon: "🎬", serviceType: "video" },
];
const DEFAULT_PRODUCTS: Product[] = [
  { id: "p-1", categoryId: "cat-1", name: "Student ID Card", price: "₹99", description: "School/College students ke liye professional ID card" },
  { id: "p-2", categoryId: "cat-1", name: "Business ID Card", price: "₹149", description: "Business professionals ke liye premium ID card" },
  { id: "p-3", categoryId: "cat-1", name: "Office ID Card", price: "₹129", description: "Company employees ke liye official ID card" },
  { id: "p-4", categoryId: "cat-1", name: "School ID Card", price: "₹89", description: "School administration ke liye bulk ID cards" },
  { id: "p-5", categoryId: "cat-2", name: "Business Logo", price: "₹499", description: "Professional business ke liye unique logo" },
  { id: "p-6", categoryId: "cat-2", name: "Restaurant Logo", price: "₹449", description: "Food business ke liye attractive logo" },
  { id: "p-7", categoryId: "cat-2", name: "YouTube Logo", price: "₹399", description: "YouTube channel branding ke liye logo" },
  { id: "p-8", categoryId: "cat-3", name: "Instagram Reel", price: "₹299", description: "Trending Instagram reels editing" },
  { id: "p-9", categoryId: "cat-3", name: "YouTube Short", price: "₹249", description: "Viral YouTube shorts editing" },
  { id: "p-10", categoryId: "cat-3", name: "Promotional Video", price: "₹599", description: "Business promotion ke liye video" },
];

type Tab = "overview" | "inquiries" | "orders" | "products" | "downloads";

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const [tab, setTab] = useState<Tab>("overview");
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [selectedOrderIds, setSelectedOrderIds] = useState<string[]>([]);
  const [orderSearch, setOrderSearch] = useState("");
  const [inquiryFilter, setInquiryFilter] = useState<"all" | "unread">("all");
  const [activeCatId, setActiveCatId] = useState<string>("");

  const [newCatName, setNewCatName] = useState("");
  const [newCatIcon, setNewCatIcon] = useState("🛍️");
  const [newCatService, setNewCatService] = useState("id-card");
  const [showCatForm, setShowCatForm] = useState(false);
  const [newProdName, setNewProdName] = useState("");
  const [newProdPrice, setNewProdPrice] = useState("");
  const [newProdDesc, setNewProdDesc] = useState("");
  const [showProdForm, setShowProdForm] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [editingProductPrice, setEditingProductPrice] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem("admin_auth") !== "true") { setLocation("/admin"); return; }
    loadData();
  }, []);

  const loadData = () => {
    const inq = localStorage.getItem("jds_inquiries");
    if (inq) setInquiries(JSON.parse(inq));
    const ord = localStorage.getItem("jds_orders");
    if (ord) setOrders(JSON.parse(ord));
    const cats = localStorage.getItem("jds_categories");
    const loadedCats = cats ? JSON.parse(cats) : DEFAULT_CATEGORIES;
    if (!cats) localStorage.setItem("jds_categories", JSON.stringify(DEFAULT_CATEGORIES));
    setCategories(loadedCats);
    if (loadedCats.length > 0) setActiveCatId(loadedCats[0].id);
    const prods = localStorage.getItem("jds_products");
    if (!prods) localStorage.setItem("jds_products", JSON.stringify(DEFAULT_PRODUCTS));
    setProducts(prods ? JSON.parse(prods) : DEFAULT_PRODUCTS);
  };

  const markInquiryRead = (id: string) => {
    const updated = inquiries.map((i) => i.id === id ? { ...i, read: true } : i);
    setInquiries(updated); localStorage.setItem("jds_inquiries", JSON.stringify(updated));
  };
  const deleteInquiry = (id: string) => {
    const updated = inquiries.filter((i) => i.id !== id);
    setInquiries(updated); localStorage.setItem("jds_inquiries", JSON.stringify(updated));
    if (selectedInquiry?.id === id) setSelectedInquiry(null);
  };
  const updateOrderStatus = (id: string, status: Order["status"]) => {
    const updated = orders.map((o) => o.id === id ? { ...o, status } : o);
    setOrders(updated); localStorage.setItem("jds_orders", JSON.stringify(updated));
    if (selectedOrder?.id === id) setSelectedOrder({ ...selectedOrder, status });
  };
  const deleteOrder = (id: string) => {
    const updated = orders.filter((o) => o.id !== id);
    setOrders(updated); localStorage.setItem("jds_orders", JSON.stringify(updated));
    setSelectedOrderIds((ids) => ids.filter((x) => x !== id));
    if (selectedOrder?.id === id) setSelectedOrder(null);
  };
  const deleteSelectedOrders = () => {
    if (selectedOrderIds.length === 0) return;
    if (!confirm(`Selected ${selectedOrderIds.length} orders delete karein?`)) return;
    const updated = orders.filter((o) => !selectedOrderIds.includes(o.id));
    setOrders(updated); localStorage.setItem("jds_orders", JSON.stringify(updated));
    setSelectedOrderIds([]);
    if (selectedOrder && selectedOrderIds.includes(selectedOrder.id)) setSelectedOrder(null);
  };
  const toggleOrderSelection = (id: string) => {
    setSelectedOrderIds((ids) => ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]);
  };
  const selectAllVisibleOrders = () => {
    const visible = filteredOrders.map((o) => o.id);
    const allSelected = visible.length > 0 && visible.every((id) => selectedOrderIds.includes(id));
    setSelectedOrderIds(allSelected ? selectedOrderIds.filter((id) => !visible.includes(id)) : Array.from(new Set([...selectedOrderIds, ...visible])));
  };
  const deleteVisibleOrders = () => {
    if (filteredOrders.length === 0) return;
    if (!confirm(`Filtered ${filteredOrders.length} orders delete karein?`)) return;
    const updated = orders.filter((o) => !filteredOrders.some((fo) => fo.id === o.id));
    setOrders(updated); localStorage.setItem("jds_orders", JSON.stringify(updated));
    setSelectedOrderIds([]);
    if (selectedOrder && filteredOrders.some((fo) => fo.id === selectedOrder.id)) setSelectedOrder(null);
  };
  const addCategory = () => {
    if (!newCatName.trim()) return;
    const cat: Category = { id: "cat-" + Date.now(), name: newCatName.trim(), icon: newCatIcon, serviceType: newCatService };
    const updated = [...categories, cat];
    setCategories(updated); localStorage.setItem("jds_categories", JSON.stringify(updated));
    setNewCatName(""); setShowCatForm(false); setActiveCatId(cat.id);
  };
  const deleteCategory = (id: string) => {
    if (!confirm("Category aur uske saare products delete honge. Confirm?")) return;
    const updatedCats = categories.filter((c) => c.id !== id);
    const updatedProds = products.filter((p) => p.categoryId !== id);
    setCategories(updatedCats); localStorage.setItem("jds_categories", JSON.stringify(updatedCats));
    setProducts(updatedProds); localStorage.setItem("jds_products", JSON.stringify(updatedProds));
    if (activeCatId === id) setActiveCatId(updatedCats[0]?.id || "");
  };
  const addProduct = () => {
    if (!newProdName.trim() || !newProdPrice.trim() || !activeCatId) return;
    const prod: Product = { id: "p-" + Date.now(), categoryId: activeCatId, name: newProdName.trim(), price: newProdPrice.trim(), description: newProdDesc.trim() };
    const updated = [...products, prod];
    setProducts(updated); localStorage.setItem("jds_products", JSON.stringify(updated));
    setNewProdName(""); setNewProdPrice(""); setNewProdDesc(""); setShowProdForm(false);
  };
  const deleteProduct = (id: string) => {
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated); localStorage.setItem("jds_products", JSON.stringify(updated));
  };
  const startEditProductPrice = (id: string, price: string) => {
    setEditingProductId(id);
    setEditingProductPrice(price);
  };
  const saveProductPrice = (id: string) => {
    const updated = products.map((p) => p.id === id ? { ...p, price: editingProductPrice.trim() } : p);
    setProducts(updated); localStorage.setItem("jds_products", JSON.stringify(updated));
    setEditingProductId(null);
    setEditingProductPrice("");
  };
  const handleLogout = () => { sessionStorage.removeItem("admin_auth"); setLocation("/admin"); };

  const unreadCount = inquiries.filter((i) => !i.read).length;
  const pendingOrders = orders.filter((o) => o.status === "pending").length;
  const completedOrders = orders.filter((o) => o.status === "completed").length;
  const shownInquiries = inquiryFilter === "unread" ? inquiries.filter((i) => !i.read) : inquiries;
  const activeCatProducts = products.filter((p) => p.categoryId === activeCatId);
  const filteredOrders = orders.filter((o) => {
    const q = orderSearch.trim().toLowerCase();
    if (!q) return true;
    return [o.id, o.name, o.phone, o.productName || "", o.service, o.plan, o.details].join(" ").toLowerCase().includes(q);
  });
  const allVisibleSelected = filteredOrders.length > 0 && filteredOrders.every((o) => selectedOrderIds.includes(o.id));
  const orderHistoryCount = orders.length;

  return (
    <div className="min-h-screen bg-background flex flex-col text-foreground">
      <header className="bg-card border-b border-border px-4 sm:px-6 py-3 flex items-center justify-between sticky top-0 z-40 shadow-sm">
        <div className="flex items-center gap-3">
          <img src={logoPath} alt="Logo" className="h-8 w-8 object-contain" />
          <div className="hidden sm:block">
            <div className="text-sm font-bold leading-none">Admin Panel</div>
            <div className="text-xs text-muted-foreground">Jaysawal Jee Digital Services</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && <span className="bg-primary text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">{unreadCount}</span>}
          <div className="hidden sm:flex items-center gap-1 bg-primary/10 border border-primary/20 text-primary text-xs font-semibold px-3 py-1.5 rounded-full"><ShieldCheck size={12} /> Admin</div>
          <button onClick={loadData} className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all" data-testid="button-refresh"><RefreshCw size={15} /></button>
          <Link href="/" className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-all">View Website</Link>
          <button onClick={handleLogout} data-testid="button-logout" className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-destructive px-3 py-1.5 rounded-lg hover:bg-destructive/10 transition-all">
            <LogOut size={13} /> Logout
          </button>
        </div>
      </header>

      <div className="flex flex-1">
        <aside className="w-14 sm:w-56 bg-card border-r border-border flex flex-col py-4 gap-1 shrink-0">
          {([
            { id: "overview", icon: <LayoutDashboard size={18} />, label: "Overview" },
            { id: "orders", icon: <Package size={18} />, label: "Orders", badge: pendingOrders },
            { id: "inquiries", icon: <MessageSquare size={18} />, label: "Inquiries", badge: unreadCount },
            { id: "products", icon: <ShoppingBag size={18} />, label: "Products" },
            { id: "downloads", icon: <Download size={18} />, label: "Downloads" },
          ] as { id: Tab; icon: React.ReactNode; label: string; badge?: number }[]).map((item) => (
            <button key={item.id} onClick={() => setTab(item.id)} data-testid={`tab-${item.id}`}
              className={`flex items-center gap-3 px-3 sm:px-4 py-3 mx-2 rounded-xl text-sm font-semibold transition-all ${tab === item.id ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`}>
              <span className="shrink-0">{item.icon}</span>
              <span className="hidden sm:block">{item.label}</span>
              {item.badge && item.badge > 0 ? <span className="ml-auto hidden sm:flex bg-primary text-white text-xs w-5 h-5 rounded-full items-center justify-center">{item.badge}</span> : null}
            </button>
          ))}
        </aside>

        <main className="flex-1 overflow-auto">
          {tab === "overview" && (
            <div className="p-6 max-w-5xl">
              <h2 className="text-2xl font-black mb-6">Dashboard Overview</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[
                  { label: "Total Orders", value: orders.length, color: "from-red-600 to-red-900", icon: <Package size={20} /> },
                  { label: "Pending", value: pendingOrders, color: "from-yellow-600 to-yellow-900", icon: <AlertCircle size={20} /> },
                  { label: "Completed", value: completedOrders, color: "from-green-600 to-green-900", icon: <CheckCircle size={20} /> },
                  { label: "Inquiries", value: inquiries.length, color: "from-rose-600 to-rose-900", icon: <MessageSquare size={20} /> },
                ].map((s) => (
                  <div key={s.label} className={`bg-gradient-to-br ${s.color} rounded-2xl p-5 text-white shadow-lg`}>
                    <div className="opacity-70 mb-3">{s.icon}</div>
                    <div className="text-3xl font-black">{s.value}</div>
                    <div className="text-xs opacity-80 mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-card border border-border rounded-2xl overflow-hidden">
                  <div className="px-5 py-4 border-b border-border flex items-center justify-between">
                    <h3 className="font-bold">Recent Orders</h3>
                    <button onClick={() => setTab("orders")} className="text-xs text-primary font-semibold flex items-center gap-1">Sab dekhein <ChevronRight size={12} /></button>
                  </div>
                  {orders.length === 0 ? <div className="py-8 text-center text-sm text-muted-foreground">Koi order nahi</div> : (
                    <div className="divide-y divide-border">
                      {orders.slice(0, 4).map((o) => {
                        const sc = STATUS_CONFIG[o.status];
                        return (
                          <div key={o.id} className="px-5 py-3 flex items-center gap-3 hover:bg-muted/30 cursor-pointer" onClick={() => { setTab("orders"); setSelectedOrder(o); }}>
                            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-red-600 to-black flex items-center justify-center text-white font-bold text-xs">{o.name.charAt(0).toUpperCase()}</div>
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-semibold truncate">{o.name}</div>
                              <div className="text-xs text-muted-foreground">{o.productName || SERVICE_LABELS[o.service]}</div>
                            </div>
                            <span className={`inline-flex items-center gap-1 text-xs border px-2 py-0.5 rounded-full font-medium ${sc.color}`}>{sc.icon}{sc.label}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
                <div className="bg-card border border-border rounded-2xl overflow-hidden">
                  <div className="px-5 py-4 border-b border-border flex items-center justify-between">
                    <h3 className="font-bold">Products Overview</h3>
                    <button onClick={() => setTab("products")} className="text-xs text-primary font-semibold flex items-center gap-1">Manage <ChevronRight size={12} /></button>
                  </div>
                  <div className="divide-y divide-border">
                    {categories.map((cat) => (
                      <div key={cat.id} className="px-5 py-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{cat.icon}</span>
                          <span className="text-sm font-medium">{cat.name}</span>
                        </div>
                        <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-0.5 rounded-full">{products.filter((p) => p.categoryId === cat.id).length} products</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {tab === "orders" && (
            <div className="flex h-[calc(100vh-57px)] relative">
              <div className={`${selectedOrder ? "hidden sm:flex" : "flex"} w-full sm:w-80 border-r border-border flex-col bg-card overflow-hidden`}>
                <div className="p-4 border-b border-border space-y-3">
                  <div>
                    <div className="text-sm font-bold">Order History ({orderHistoryCount})</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{pendingOrders} pending · {completedOrders} completed</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={selectAllVisibleOrders} className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold border border-border hover:border-primary/40 hover:text-primary transition-all">
                      {allVisibleSelected ? <CheckSquare size={13} /> : <Square size={13} />} Select All
                    </button>
                    <button onClick={deleteSelectedOrders} disabled={selectedOrderIds.length === 0} className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold border border-red-500/40 text-red-500 hover:bg-red-500 hover:text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed">
                      <Trash2 size={13} /> Delete Selected
                    </button>
                  </div>
                  <div className="relative">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input value={orderSearch} onChange={(e) => setOrderSearch(e.target.value)} placeholder="Search order history"
                      className="w-full bg-background border border-border rounded-lg pl-9 pr-3 py-2 text-xs focus:outline-none focus:border-primary" />
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                  {filteredOrders.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 text-center px-6">
                      <Package size={36} className="text-muted-foreground/40 mb-3" />
                      <p className="text-sm text-muted-foreground">Koi order nahi aaya abhi</p>
                    </div>
                  ) : filteredOrders.map((o) => {
                    const sc = STATUS_CONFIG[o.status];
                    const isSelected = selectedOrderIds.includes(o.id);
                    return (
                      <div key={o.id} data-testid={`order-item-${o.id}`}
                        className={`p-4 border-b border-border transition-all ${selectedOrder?.id === o.id ? "bg-primary/5 border-l-2 border-l-primary" : "hover:bg-muted/30"}`}>
                        <div className="flex items-start justify-between gap-2 mb-2 cursor-pointer" onClick={() => setSelectedOrder(o)}>
                          <button onClick={(e) => { e.stopPropagation(); toggleOrderSelection(o.id); }} className="shrink-0 text-muted-foreground hover:text-primary transition-colors">
                            {isSelected ? <CheckSquare size={18} className="text-primary" /> : <Square size={18} />}
                          </button>
                          <div className="flex items-center gap-2 flex-1 min-w-0">
                            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-red-600 to-black flex items-center justify-center text-white text-xs font-bold shrink-0">{o.name.charAt(0).toUpperCase()}</div>
                            <div className="min-w-0">
                              <div className="text-sm font-semibold truncate">{o.name}</div>
                              <div className="text-xs text-muted-foreground">{o.id}</div>
                            </div>
                          </div>
                          <span className={`inline-flex items-center gap-1 text-xs border px-2 py-0.5 rounded-full font-medium shrink-0 ${sc.color}`}>{sc.icon}{sc.label}</span>
                        </div>
                        <div className="pl-10 text-xs text-muted-foreground mb-3">{o.productName || SERVICE_LABELS[o.service]} · {PLAN_PRICES[o.plan] || o.plan}</div>
                        <div className="pl-10 flex gap-2 flex-wrap">
                          <button onClick={(e) => { e.stopPropagation(); updateOrderStatus(o.id, "completed"); }}
                            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${o.status === "completed" ? "bg-green-500 text-white border-green-500" : "border-green-500/50 text-green-500 hover:bg-green-500 hover:text-white"}`}>
                            <CheckCircle size={11} /> Confirm
                          </button>
                          <button onClick={(e) => { e.stopPropagation(); updateOrderStatus(o.id, "paid"); }}
                            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${o.status === "paid" ? "bg-emerald-500 text-white border-emerald-500" : "border-emerald-500/50 text-emerald-500 hover:bg-emerald-500 hover:text-white"}`}>
                            <CheckCircle size={11} /> Paid
                          </button>
                          <button onClick={(e) => { e.stopPropagation(); updateOrderStatus(o.id, "cancelled"); }}
                            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${o.status === "cancelled" ? "bg-red-500 text-white border-red-500" : "border-red-500/50 text-red-500 hover:bg-red-500 hover:text-white"}`}>
                            <XCircle size={11} /> Cancel
                          </button>
                          <button onClick={(e) => { e.stopPropagation(); setSelectedOrder(o); }}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold border border-border text-muted-foreground hover:text-primary hover:border-primary/40 transition-all">
                            Details →
                          </button>
                          <button onClick={(e) => { e.stopPropagation(); deleteOrder(o.id); }}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold border border-red-500/40 text-red-500 hover:bg-red-500 hover:text-white transition-all">
                            <Trash2 size={11} /> Delete
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {selectedOrder && (
                <div className="flex flex-1 flex-col overflow-auto bg-background">
                  <div className="sm:hidden flex items-center gap-3 px-4 py-3 border-b border-border bg-card sticky top-0 z-10">
                    <button onClick={() => setSelectedOrder(null)} className="flex items-center gap-2 text-sm font-semibold text-primary">
                      ← Orders par wapas jaao
                    </button>
                  </div>
                  <div className="p-5 sm:p-8 max-w-xl mx-auto w-full">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h2 className="text-xl font-black">{selectedOrder.name}</h2>
                          <span className={`inline-flex items-center gap-1 text-xs border px-2.5 py-1 rounded-full font-semibold ${STATUS_CONFIG[selectedOrder.status].color}`}>
                            {STATUS_CONFIG[selectedOrder.status].icon} {STATUS_CONFIG[selectedOrder.status].label}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">Order ID: <span className="text-primary font-bold">{selectedOrder.id}</span></p>
                      </div>
                      <button onClick={() => deleteOrder(selectedOrder.id)} data-testid="button-delete-order"
                        className="flex items-center gap-1.5 text-destructive hover:bg-destructive/10 px-3 py-2 rounded-lg text-sm font-semibold transition-all shrink-0">
                        <Trash2 size={15} /> Delete
                      </button>
                    </div>

                    <div className="grid grid-cols-3 gap-3 mb-5">
                      <button onClick={() => updateOrderStatus(selectedOrder.id, "completed")} data-testid="button-mark-complete"
                        className={`flex flex-col items-center justify-center gap-1.5 py-4 rounded-2xl font-black text-sm transition-all border-2 ${selectedOrder.status === "completed" ? "bg-green-500 text-white border-green-500 shadow-lg shadow-green-500/30" : "border-green-500/40 text-green-500 hover:bg-green-500 hover:text-white hover:border-green-500"}`}>
                        <CheckCircle size={22} />
                        Confirm ✅
                      </button>
                      <button onClick={() => updateOrderStatus(selectedOrder.id, "paid")} data-testid="button-mark-paid"
                        className={`flex flex-col items-center justify-center gap-1.5 py-4 rounded-2xl font-black text-sm transition-all border-2 ${selectedOrder.status === "paid" ? "bg-emerald-500 text-white border-emerald-500 shadow-lg shadow-emerald-500/30" : "border-emerald-500/40 text-emerald-500 hover:bg-emerald-500 hover:text-white hover:border-emerald-500"}`}>
                        <CheckCircle size={22} />
                        Paid 💰
                      </button>
                      <button onClick={() => updateOrderStatus(selectedOrder.id, "cancelled")} data-testid="button-mark-cancelled"
                        className={`flex flex-col items-center justify-center gap-1.5 py-4 rounded-2xl font-black text-sm transition-all border-2 ${selectedOrder.status === "cancelled" ? "bg-red-500 text-white border-red-500 shadow-lg shadow-red-500/30" : "border-red-500/40 text-red-500 hover:bg-red-500 hover:text-white hover:border-red-500"}`}>
                        <XCircle size={22} />
                        Cancel ❌
                      </button>
                    </div>

                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { label: "Customer", value: selectedOrder.name },
                          { label: "Phone", value: selectedOrder.phone },
                          { label: "Product", value: selectedOrder.productName || SERVICE_LABELS[selectedOrder.service] },
                          { label: "Plan & Price", value: `${selectedOrder.plan.charAt(0).toUpperCase() + selectedOrder.plan.slice(1)} — ${PLAN_PRICES[selectedOrder.plan] || selectedOrder.plan}` },
                          { label: "Order Time", value: selectedOrder.time },
                        ].map((row) => (
                          <div key={row.label} className="bg-card border border-border rounded-xl p-4">
                            <div className="text-xs text-muted-foreground mb-1">{row.label}</div>
                            <div className="text-sm font-semibold">{row.value}</div>
                          </div>
                        ))}
                      </div>
                      {selectedOrder.details && (
                        <div className="bg-card border border-border rounded-xl p-4">
                          <div className="text-xs text-muted-foreground font-semibold uppercase tracking-wide mb-2">Project Details</div>
                          <p className="text-sm leading-relaxed">{selectedOrder.details}</p>
                        </div>
                      )}
                      <div className="bg-card border border-border rounded-xl p-4">
                        <div className="text-xs text-muted-foreground font-semibold uppercase tracking-wide mb-3">Poora Status Change Karein</div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {(["pending", "in-progress", "completed", "cancelled", "paid"] as Order["status"][]).map((s) => {
                            const sc = STATUS_CONFIG[s];
                            return (
                              <button key={s} onClick={() => updateOrderStatus(selectedOrder.id, s)} data-testid={`button-status-${s}`}
                                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold border transition-all ${selectedOrder.status === s ? sc.color + " shadow-sm" : "border-border text-muted-foreground hover:border-primary/30"}`}>
                                {sc.icon} {sc.label}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                      <a href={`https://wa.me/91${selectedOrder.phone.replace(/\D/g, "")}?text=Hello%20${encodeURIComponent(selectedOrder.name)}%2C%20aapka%20order%20${selectedOrder.id}%20complete%20ho%20gaya%20hai!%20%F0%9F%8E%89`}
                        target="_blank" rel="noopener noreferrer" data-testid="button-order-whatsapp"
                        className="flex items-center justify-center gap-2 w-full bg-green-500 hover:bg-green-400 text-white py-3 rounded-xl font-bold text-sm transition-all">
                        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                        Customer ko WhatsApp Update Bhejein
                      </a>
                    </div>
                  </div>
                </div>
              )}
              {!selectedOrder && (
                <div className="hidden sm:flex flex-1 flex-col items-center justify-center text-center">
                  <Package size={40} className="text-muted-foreground/30 mb-3" />
                  <p className="text-muted-foreground font-medium">Koi order select karein</p>
                </div>
              )}
            </div>
          )}

          {tab === "inquiries" && (
            <div className="flex h-[calc(100vh-57px)]">
              <div className="w-full sm:w-80 border-r border-border flex flex-col bg-card overflow-hidden">
                <div className="p-3 border-b border-border flex gap-2">
                  {(["all", "unread"] as const).map((f) => (
                    <button key={f} onClick={() => setInquiryFilter(f)} className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all capitalize ${inquiryFilter === f ? "bg-primary text-white" : "bg-muted text-muted-foreground hover:text-primary"}`}>
                      {f === "all" ? `All (${inquiries.length})` : `Unread (${unreadCount})`}
                    </button>
                  ))}
                </div>
                <div className="flex-1 overflow-y-auto">
                  {shownInquiries.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 text-center px-6"><Inbox size={36} className="text-muted-foreground/40 mb-3" /><p className="text-sm text-muted-foreground">Koi inquiry nahi</p></div>
                  ) : shownInquiries.map((inq) => (
                    <div key={inq.id} onClick={() => { setSelectedInquiry(inq); markInquiryRead(inq.id); }} data-testid={`inquiry-item-${inq.id}`}
                      className={`p-4 border-b border-border cursor-pointer hover:bg-muted/40 transition-all ${selectedInquiry?.id === inq.id ? "bg-primary/5 border-l-2 border-l-primary" : ""}`}>
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-600 to-black flex items-center justify-center text-white text-xs font-bold">{inq.name.charAt(0).toUpperCase()}</div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5"><span className="text-sm font-semibold truncate">{inq.name}</span>{!inq.read && <span className="w-2 h-2 bg-primary rounded-full" />}</div>
                            <div className="text-xs text-muted-foreground">{inq.phone}</div>
                          </div>
                        </div>
                        <span className="text-xs text-muted-foreground/60">{inq.time.split(",")[0]}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2 line-clamp-2 pl-10">{inq.message}</p>
                    </div>
                  ))}
                </div>
                {inquiries.length > 0 && (
                  <div className="p-3 border-t border-border">
                    <button onClick={() => { if (confirm("Saari inquiries delete karein?")) { setInquiries([]); localStorage.removeItem("jds_inquiries"); setSelectedInquiry(null); } }}
                      className="w-full flex items-center justify-center gap-2 text-destructive hover:bg-destructive/10 py-2 rounded-lg text-xs font-semibold transition-all">
                      <Trash2 size={13} /> Saari delete karein
                    </button>
                  </div>
                )}
              </div>
              <div className="hidden sm:flex flex-1 flex-col overflow-auto p-8">
                {selectedInquiry ? (
                  <div className="max-w-xl">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-600 to-black flex items-center justify-center text-white text-2xl font-black">{selectedInquiry.name.charAt(0).toUpperCase()}</div>
                        <div><h2 className="text-xl font-black">{selectedInquiry.name}</h2><p className="text-sm text-muted-foreground">{selectedInquiry.phone}</p></div>
                      </div>
                      <button onClick={() => deleteInquiry(selectedInquiry.id)} className="flex items-center gap-1.5 text-destructive hover:bg-destructive/10 px-3 py-2 rounded-lg text-sm font-semibold transition-all"><Trash2 size={15} /> Delete</button>
                    </div>
                    <div className="space-y-4">
                      {[{ icon: <User size={16} className="text-primary" />, label: "Full Name", value: selectedInquiry.name }, { icon: <Phone size={16} className="text-primary" />, label: "Phone", value: selectedInquiry.phone }, { icon: <Clock size={16} className="text-primary" />, label: "Received", value: selectedInquiry.time }].map((row) => (
                        <div key={row.label} className="flex items-center gap-3 p-4 bg-card border border-border rounded-xl">{row.icon}<div><div className="text-xs text-muted-foreground">{row.label}</div><div className="text-sm font-semibold">{row.value}</div></div></div>
                      ))}
                      <div className="p-4 bg-card border border-border rounded-xl">
                        <div className="flex items-center gap-2 mb-3"><MessageSquare size={16} className="text-primary" /><div className="text-xs text-muted-foreground font-semibold uppercase tracking-wide">Message</div></div>
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{selectedInquiry.message}</p>
                      </div>
                      <a href={`https://wa.me/91${selectedInquiry.phone.replace(/\D/g, "")}?text=Hello%20${encodeURIComponent(selectedInquiry.name)}%2C%20main%20Jaysawal%20Jee%20Digital%20Services%20se%20hun.`}
                        target="_blank" rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full bg-green-500 hover:bg-green-400 text-white py-3 rounded-xl font-bold text-sm transition-all">
                        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                        WhatsApp pe Reply Karein
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center"><MessageSquare size={40} className="text-muted-foreground/30 mb-3" /><p className="text-muted-foreground font-medium">Koi inquiry select karein</p></div>
                )}
              </div>
            </div>
          )}

          {tab === "products" && (
            <div className="p-6 max-w-5xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-black">Products & Categories</h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                  <div className="bg-card border border-border rounded-2xl overflow-hidden">
                    <div className="px-5 py-4 border-b border-border flex items-center justify-between">
                      <h3 className="font-bold flex items-center gap-2"><Tag size={16} className="text-primary" /> Categories</h3>
                      <button onClick={() => setShowCatForm(!showCatForm)} data-testid="button-add-category"
                        className="flex items-center gap-1 text-xs bg-primary/10 hover:bg-primary text-primary hover:text-white px-3 py-1.5 rounded-lg font-semibold transition-all">
                        <Plus size={12} /> Add
                      </button>
                    </div>

                    {showCatForm && (
                      <div className="p-4 border-b border-border bg-muted/30 space-y-3">
                        <input value={newCatName} onChange={(e) => setNewCatName(e.target.value)} placeholder="Category name (e.g. ID Card Design)"
                          data-testid="input-cat-name"
                          className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary" />
                        <div className="flex gap-2">
                          <input value={newCatIcon} onChange={(e) => setNewCatIcon(e.target.value)} placeholder="Icon 🎨"
                            className="w-20 bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary" />
                          <select value={newCatService} onChange={(e) => setNewCatService(e.target.value)}
                            className="flex-1 bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary">
                            <option value="id-card">ID Card</option>
                            <option value="logo">Logo</option>
                            <option value="video">Video</option>
                          </select>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={addCategory} data-testid="button-save-category"
                            className="flex-1 flex items-center justify-center gap-1 bg-primary text-white py-2 rounded-lg text-xs font-bold transition-all">
                            <Save size={12} /> Save
                          </button>
                          <button onClick={() => setShowCatForm(false)} className="px-3 py-2 rounded-lg border border-border text-xs text-muted-foreground hover:bg-muted">
                            <X size={12} />
                          </button>
                        </div>
                      </div>
                    )}

                    <div className="divide-y divide-border">
                      {categories.map((cat) => (
                        <div key={cat.id} onClick={() => setActiveCatId(cat.id)} data-testid={`category-item-${cat.id}`}
                          className={`flex items-center justify-between px-5 py-3.5 cursor-pointer transition-all hover:bg-muted/40 ${activeCatId === cat.id ? "bg-primary/5 border-l-2 border-l-primary" : ""}`}>
                          <div className="flex items-center gap-3">
                            <span className="text-xl">{cat.icon}</span>
                            <div>
                              <div className="text-sm font-semibold">{cat.name}</div>
                              <div className="text-xs text-muted-foreground">{products.filter((p) => p.categoryId === cat.id).length} products</div>
                            </div>
                          </div>
                          <button onClick={(e) => { e.stopPropagation(); deleteCategory(cat.id); }} data-testid={`button-delete-cat-${cat.id}`}
                            className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all">
                            <Trash2 size={13} />
                          </button>
                        </div>
                      ))}
                      {categories.length === 0 && <div className="py-8 text-center text-sm text-muted-foreground">Koi category nahi</div>}
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-2">
                  <div className="bg-card border border-border rounded-2xl overflow-hidden">
                    <div className="px-5 py-4 border-b border-border flex items-center justify-between">
                      <h3 className="font-bold flex items-center gap-2">
                        <ShoppingBag size={16} className="text-primary" />
                        {categories.find((c) => c.id === activeCatId)?.name || "Products"}
                        <span className="text-xs text-muted-foreground font-normal">({activeCatProducts.length})</span>
                      </h3>
                      <button onClick={() => setShowProdForm(!showProdForm)} data-testid="button-add-product"
                        className="flex items-center gap-1 text-xs bg-primary/10 hover:bg-primary text-primary hover:text-white px-3 py-1.5 rounded-lg font-semibold transition-all">
                        <Plus size={12} /> Add Product
                      </button>
                    </div>

                    {showProdForm && (
                      <div className="p-4 border-b border-border bg-muted/30 space-y-3">
                        <input value={newProdName} onChange={(e) => setNewProdName(e.target.value)} placeholder="Product name (e.g. Student ID Card)"
                          data-testid="input-prod-name"
                          className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary" />
                        <input value={newProdPrice} onChange={(e) => setNewProdPrice(e.target.value)} placeholder="Price (e.g. ₹199)"
                          data-testid="input-prod-price"
                          className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary" />
                        <input value={newProdDesc} onChange={(e) => setNewProdDesc(e.target.value)} placeholder="Description (optional)"
                          data-testid="input-prod-desc"
                          className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary" />
                        <div className="flex gap-2">
                          <button onClick={addProduct} data-testid="button-save-product"
                            className="flex-1 flex items-center justify-center gap-1 bg-primary text-white py-2 rounded-lg text-xs font-bold">
                            <Save size={12} /> Save Product
                          </button>
                          <button onClick={() => setShowProdForm(false)} className="px-3 py-2 rounded-lg border border-border text-xs text-muted-foreground hover:bg-muted"><X size={12} /></button>
                        </div>
                      </div>
                    )}

                    <div className="divide-y divide-border">
                      {activeCatProducts.length === 0 ? (
                        <div className="py-12 text-center">
                          <ShoppingBag size={32} className="text-muted-foreground/30 mx-auto mb-3" />
                          <p className="text-sm text-muted-foreground">Is category mein koi product nahi</p>
                          <button onClick={() => setShowProdForm(true)} className="mt-3 text-xs text-primary font-semibold hover:underline">+ Product Add Karein</button>
                        </div>
                      ) : activeCatProducts.map((prod) => (
                        <div key={prod.id} className="flex items-center justify-between px-5 py-4 hover:bg-muted/30 transition-all" data-testid={`product-item-${prod.id}`}>
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                              <ShoppingBag size={16} />
                            </div>
                            <div className="min-w-0">
                              <div className="text-sm font-semibold truncate">{prod.name}</div>
                              <div className="text-xs text-muted-foreground truncate">{prod.description}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            {editingProductId === prod.id ? (
                              <div className="flex items-center gap-2">
                                <input value={editingProductPrice} onChange={(e) => setEditingProductPrice(e.target.value)} className="w-24 bg-background border border-border rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:border-primary" />
                                <button onClick={() => saveProductPrice(prod.id)} className="p-2 rounded-lg bg-primary/10 text-primary"><Save size={13} /></button>
                              </div>
                            ) : (
                              <button onClick={() => startEditProductPrice(prod.id, prod.price)} className="text-sm font-bold text-primary hover:underline">{prod.price}</button>
                            )}
                            <button onClick={() => deleteProduct(prod.id)} data-testid={`button-delete-prod-${prod.id}`} className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all"><Trash2 size={13} /></button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {tab === "downloads" && (
            <div className="p-6 max-w-2xl">
              <h2 className="text-2xl font-black mb-2">Website Downloads</h2>
              <p className="text-sm text-muted-foreground mb-8">Apni website ka complete package download karein — mobile ya computer pe open kar saktey hain.</p>

              <div className="grid grid-cols-1 gap-5">
                {/* ZIP Download */}
                <div className="bg-card border border-border rounded-2xl p-6 flex flex-col gap-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-xs text-muted-foreground">Rebuild button se naya ZIP aur offline HTML regenerate hoga</div>
                    <button type="button" onClick={() => {}} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-muted hover:bg-muted/80 text-sm font-semibold">
                      <RefreshCw size={14} /> Rebuild Downloads
                    </button>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                      <FileArchive size={28} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-black mb-1">Website ZIP Package</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Poori website ka complete ZIP archive — saare HTML, CSS, JS, aur images shamil hain. Computer pe extract karke koi bhi browser mein open kar saktey hain.
                      </p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        <span className="bg-muted text-xs text-muted-foreground px-3 py-1 rounded-full">~572 KB</span>
                        <span className="bg-muted text-xs text-muted-foreground px-3 py-1 rounded-full">6 Files</span>
                        <span className="bg-green-500/10 text-green-600 text-xs px-3 py-1 rounded-full font-semibold">✓ Valid ZIP Archive</span>
                      </div>
                    </div>
                  </div>
                  <a
                    href="/downloads/jaysawal-digital-website.zip"
                    download="jaysawal-digital-website.zip"
                    className="flex items-center justify-center gap-2 w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-xl font-bold text-sm transition-all shadow-lg shadow-primary/20"
                  >
                    <Download size={16} /> ZIP Download Karein (.zip)
                  </a>
                </div>

                {/* Offline Single HTML */}
                <div className="bg-card border border-border rounded-2xl p-6 flex flex-col gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center shrink-0">
                      <FileCode size={28} className="text-blue-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-black mb-1">Offline Single-File HTML</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Ek akela HTML file — isme sab kuch (CSS + JS + images) embed hai. Mobile pe download karke <strong>directly browser mein open</strong> karein, internet ki zaroorat nahi!
                      </p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        <span className="bg-muted text-xs text-muted-foreground px-3 py-1 rounded-full">~1 MB</span>
                        <span className="bg-muted text-xs text-muted-foreground px-3 py-1 rounded-full">Single File</span>
                        <span className="bg-blue-500/10 text-blue-600 text-xs px-3 py-1 rounded-full font-semibold">📱 Mobile Friendly</span>
                      </div>
                    </div>
                  </div>
                  <a
                    href="/downloads/jaysawal-digital-offline.html"
                    download="jaysawal-digital-offline.html"
                    className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl font-bold text-sm transition-all shadow-lg shadow-blue-500/20"
                  >
                    <Download size={16} /> Offline HTML Download Karein
                  </a>
                </div>

                {/* Instructions */}
                <div className="bg-muted/50 border border-border rounded-2xl p-5">
                  <h4 className="font-bold text-sm mb-3 flex items-center gap-2">📱 Mobile pe kaise use karein?</h4>
                  <ol className="space-y-2 text-xs text-muted-foreground">
                    <li className="flex gap-2"><span className="font-bold text-primary shrink-0">1.</span> <span>Upar "Offline HTML Download Karein" button dabao</span></li>
                    <li className="flex gap-2"><span className="font-bold text-primary shrink-0">2.</span> <span>File download hogi → Downloads folder mein milegi</span></li>
                    <li className="flex gap-2"><span className="font-bold text-primary shrink-0">3.</span> <span>File pe tap karo → "Chrome mein open karein" ya "Browser mein open karein" choose karo</span></li>
                    <li className="flex gap-2"><span className="font-bold text-primary shrink-0">4.</span> <span>Website fully offline aapke mobile pe open ho jayegi! ✅</span></li>
                  </ol>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
