'use client';

import { MessageCircle, X } from 'lucide-react';
import { useState } from 'react';
import { SITE } from '@/lib/seo';

export function WhatsAppButton() {
  const [open, setOpen] = useState(false);

  const waLink = `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(
    `Hi ${SITE.name} team, I'm interested in learning more about your business listings.`,
  )}`;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {/* Tooltip / preview card */}
      {open && (
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 w-72 max-w-[calc(100vw-2.5rem)]">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-[#25D366] flex items-center justify-center shrink-0">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-sm font-bold text-gray-900">Chat with us</div>
                <div className="text-[11px] text-gray-500">Typically replies within minutes</div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-gray-400 hover:text-gray-600 p-1"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed mb-3">
            Questions about a listing? Need help with due diligence or escrow? Message us
            on WhatsApp and our team will respond quickly.
          </p>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#1ebe5d] text-white text-sm font-bold py-2.5 rounded-lg transition"
          >
            <MessageCircle className="w-4 h-4" />
            Start WhatsApp Chat
          </a>
          <p className="text-[10px] text-gray-400 text-center mt-2">
            {SITE.whatsappDisplay}
          </p>
        </div>
      )}

      {/* Floating action button */}
      <button
        onClick={() => setOpen(!open)}
        className="relative w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#1ebe5d] shadow-xl flex items-center justify-center transition transform hover:scale-105"
        aria-label="Contact us on WhatsApp"
      >
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30 pointer-events-none" />
        {open ? (
          <X className="w-6 h-6 text-white relative z-10" />
        ) : (
          <MessageCircle className="w-7 h-7 text-white relative z-10" />
        )}
      </button>
    </div>
  );
}
