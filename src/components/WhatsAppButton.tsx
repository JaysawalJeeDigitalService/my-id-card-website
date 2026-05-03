import { SiWhatsapp } from "react-icons/si";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/916284731558?text=Hello%2C%20I%20need%20your%20digital%20services!"
      target="_blank"
      rel="noopener noreferrer"
      data-testid="button-whatsapp-float"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-green-500 hover:bg-green-400 text-white rounded-full shadow-xl hover:shadow-green-500/50 transition-all hover:scale-110 group"
      title="Chat on WhatsApp"
    >
      <SiWhatsapp size={28} />
      <span className="absolute right-16 bg-green-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg pointer-events-none">
        Chat with us!
      </span>
    </a>
  );
}
