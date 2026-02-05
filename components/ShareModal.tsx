import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Facebook, Twitter, Link as LinkIcon, Check } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  url?: string;
}

const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, productName, url }) => {
  const [copied, setCopied] = useState(false);
  // Default to current window URL if not provided
  const shareUrl = url || window.location.href;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSocialShare = (platform: 'facebook' | 'twitter') => {
    let finalUrl = '';
    const text = `Khám phá ${productName} tại Moso Beauty Dessert`;

    if (platform === 'facebook') {
      finalUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    } else if (platform === 'twitter') {
      finalUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`;
    }

    // Open in a centered popup window
    const width = 600;
    const height = 400;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;
    window.open(finalUrl, '_blank', `width=${width},height=${height},left=${left},top=${top}`);
    
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-dark-950/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          >
            {/* Modal */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 10 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-dark-900 border border-stone-200 dark:border-white/10 w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl relative p-6"
            >
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 text-stone-500 hover:text-stone-900 dark:hover:text-white transition-colors"
              >
                <X size={20} />
              </button>

              <h3 className="font-serif text-xl text-stone-900 dark:text-stone-100 mb-6 text-center">
                Chia sẻ sản phẩm
              </h3>

              <div className="grid grid-cols-3 gap-4 mb-6">
                 {/* Facebook */}
                 <button 
                    onClick={() => handleSocialShare('facebook')}
                    className="flex flex-col items-center gap-2 group"
                 >
                    <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                       <Facebook size={20} />
                    </div>
                    <span className="text-xs text-stone-600 dark:text-stone-400 font-medium">Facebook</span>
                 </button>

                 {/* Twitter */}
                 <button 
                    onClick={() => handleSocialShare('twitter')}
                    className="flex flex-col items-center gap-2 group"
                 >
                    <div className="w-12 h-12 rounded-full bg-sky-100 dark:bg-sky-900/30 text-sky-500 flex items-center justify-center group-hover:bg-sky-500 group-hover:text-white transition-all duration-300">
                       <Twitter size={20} />
                    </div>
                    <span className="text-xs text-stone-600 dark:text-stone-400 font-medium">Twitter</span>
                 </button>

                 {/* Copy Link */}
                 <button 
                    onClick={handleCopy}
                    className="flex flex-col items-center gap-2 group"
                 >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${copied ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' : 'bg-stone-100 dark:bg-white/10 text-stone-600 dark:text-stone-400 group-hover:bg-stone-800 dark:group-hover:bg-stone-200 group-hover:text-white dark:group-hover:text-stone-900'}`}>
                       {copied ? <Check size={20} /> : <LinkIcon size={20} />}
                    </div>
                    <span className="text-xs text-stone-600 dark:text-stone-400 font-medium">
                      {copied ? 'Đã chép' : 'Sao chép'}
                    </span>
                 </button>
              </div>

              {/* URL Display */}
              <div className="bg-stone-50 dark:bg-black/20 p-3 rounded-lg border border-stone-200 dark:border-white/5 flex items-center gap-3 overflow-hidden">
                 <div className="flex-1 text-xs text-stone-500 dark:text-stone-400 truncate font-mono select-all">
                    {shareUrl}
                 </div>
              </div>

            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ShareModal;