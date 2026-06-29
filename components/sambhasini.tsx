"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";

export default function ChatBotWidget() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Bot Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-2 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#313192] text-white shadow-lg hover:bg-blue-700 transition"
      >
        {open ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Widget */}
      {open && (
        <div className="fixed bottom-14 right-2 z-50 h-[620px] w-[520px]  bg-transparent ">
          <iframe
            src="https://sambhasini.jethat.in/widget/2e637a47-892b-4a07-89e2-0fbd46ea1770?disable-hmr=true"
            title="Chat Bot"
            className="h-full w-full border-0"
          />
        </div>
      )}
    </>
  );
}