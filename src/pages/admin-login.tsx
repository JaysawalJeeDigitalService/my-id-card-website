import { useState } from "react";
import { useLocation } from "wouter";
import { Eye, EyeOff, LogIn, ShieldCheck } from "lucide-react";
import logoPath from "@/assets/logo.png";

const ADMIN_EMAIL = "amankumarjaysawal392@gmail.com";
const ADMIN_PASSWORD = "Jaysawaljee@143";

export default function AdminLogin() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      sessionStorage.setItem("admin_auth", "true");
      setLocation("/admin/dashboard");
    } else {
      setError("Galat email ya password hai. Dobara try karein.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen hero-gradient flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-card border border-border rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-700 to-red-950 px-8 py-8 text-center">
            <div className="flex justify-center mb-3">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20">
                <img src={logoPath} alt="Logo" className="w-10 h-10 object-contain" />
              </div>
            </div>
            <h1 className="text-xl font-black text-white">Admin Login</h1>
            <p className="text-red-200 text-xs mt-1">Jaysawal Jee Digital Services</p>
          </div>

          {/* Form */}
          <div className="px-8 py-8">
            <div className="flex items-center gap-2 mb-6 bg-primary/5 border border-primary/20 rounded-xl px-4 py-3">
              <ShieldCheck size={16} className="text-primary flex-shrink-0" />
              <p className="text-xs text-muted-foreground">Sirf authorised admin hi access kar sakte hain</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="admin@example.com"
                  data-testid="input-admin-email"
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPass ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••••"
                    data-testid="input-admin-password"
                    className="w-full bg-background border border-border rounded-lg px-4 py-3 pr-12 text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    data-testid="button-toggle-password"
                  >
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="bg-destructive/10 border border-destructive/30 text-destructive text-sm px-4 py-3 rounded-lg" data-testid="text-login-error">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                data-testid="button-admin-login"
                className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white py-3 rounded-lg font-bold text-sm transition-all disabled:opacity-70 shadow-lg shadow-primary/30"
              >
                {loading ? (
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <><LogIn size={16} /> Login to Dashboard</>
                )}
              </button>
            </form>
          </div>
        </div>

        <p className="text-center text-xs text-gray-500 mt-4">
          Yeh page sirf admin ke liye hai
        </p>
      </div>
    </div>
  );
}
