import { type ReactNode } from 'react';
import { X, Share2, MessageSquare, Mail, Link2, Download } from 'lucide-react';
import { Modal } from './Modal';
import { Button } from './Button';
import { QRCode } from './QRCode';

interface ShareSheetProps {
  open: boolean;
  onClose: () => void;
  url: string;
  title: string;
  qrValue: string;
}

export function ShareSheet({ open, onClose, url, title, qrValue }: ShareSheetProps) {
  const shareOptions = [
    { label: 'Copy Link', icon: Link2, action: () => { navigator.clipboard?.writeText(url); } },
    { label: 'Email', icon: Mail, action: () => { window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`; } },
    { label: 'Message', icon: MessageSquare, action: () => { window.location.href = `sms:?body=${encodeURIComponent(url)}`; } },
    { label: 'System Share', icon: Share2, action: () => {
      if (navigator.share) {
        navigator.share({ title, url }).catch(() => {});
      } else {
        navigator.clipboard?.writeText(url);
      }
    }},
  ];

  return (
    <Modal open={open} onClose={onClose} title="Share Your DigiCon" size="sm">
      <div className="flex flex-col items-center gap-6">
        <QRCode value={qrValue} size={200} />
        <div className="w-full glass rounded-xl p-3 flex items-center gap-2">
          <input
            value={url}
            readOnly
            className="flex-1 bg-transparent text-white/70 text-sm font-body outline-none truncate"
          />
          <button
            onClick={() => navigator.clipboard?.writeText(url)}
            className="text-cyan-400 hover:text-cyan-300 text-sm font-ui font-medium"
          >
            Copy
          </button>
        </div>
        <div className="grid grid-cols-4 gap-3 w-full">
          {shareOptions.map((opt) => (
            <button
              key={opt.label}
              onClick={() => { opt.action(); }}
              className="flex flex-col items-center gap-2 p-3 glass-card rounded-xl hover:bg-white/10"
            >
              <opt.icon className="w-5 h-5 text-cyan-400" />
              <span className="text-xs text-white/60 font-ui">{opt.label}</span>
            </button>
          ))}
        </div>
        <Button
          variant="secondary"
          className="w-full"
          onClick={() => {
            if (navigator.share) {
              navigator.share({ title, url }).catch(() => {});
            } else {
              navigator.clipboard?.writeText(url);
            }
          }}
        >
          <Share2 className="w-4 h-4" />
          Share Now
        </Button>
      </div>
    </Modal>
  );
}
