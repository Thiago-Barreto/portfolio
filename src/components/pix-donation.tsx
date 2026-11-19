'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, X, Coffee } from 'lucide-react';
import { generatePixPayload, generatePixQrCodeUrl, isValidPixKey } from '@/lib/pix';

interface PixDonationProps {
  open: boolean;
  onClose: () => void;
}

export function PixDonation({ open, onClose }: PixDonationProps) {
  const [copied, setCopied] = useState(false);

  const pixKey = process.env.NEXT_PUBLIC_PIX_KEY || '';
  const pixName = process.env.NEXT_PUBLIC_PIX_NAME || 'Thiago B. Rodrigues';
  const pixCity = process.env.NEXT_PUBLIC_PIX_CITY || 'Manaus';
  const pixAmount = process.env.NEXT_PUBLIC_PIX_AMOUNT ? parseFloat(process.env.NEXT_PUBLIC_PIX_AMOUNT) / 100 : undefined;

  const payload = generatePixPayload({
    key: pixKey,
    name: pixName,
    city: pixCity,
    amount: pixAmount,
  });

  const qrCodeUrl = generatePixQrCodeUrl(payload);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(payload);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const isValid = isValidPixKey(pixKey);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="bg-card border border-border/50 rounded-2xl shadow-2xl max-w-md w-full pointer-events-auto overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/20 rounded-lg text-primary">
                    <Coffee size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      Me pague um café! ☕
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Apoie meu trabalho
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  aria-label="Fechar"
                  className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-foreground"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col gap-6">
                {/* Description */}
                <div className="text-center">
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Seu apoio me ajuda a continuar criando projetos incríveis
                    e mantendo este portfólio no ar!
                  </p>
                  {pixAmount && (
                    <p className="text-primary font-semibold mt-2">
                      Sugestão: R$ {pixAmount.toFixed(2).replace('.', ',')}
                    </p>
                  )}
                </div>

                {/* QR Code */}
                <div className="flex justify-center">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    {/* QR gerado por serviço externo: <img> simples, sem otimização do next/image */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={qrCodeUrl}
                      alt="QR Code Pix"
                      className="w-48 h-48 rounded-xl border border-border bg-background p-2"
                    />
                  </div>
                </div>

                {/* Pix Key Info */}
                {!isValid && pixKey && (
                  <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 text-amber-400 text-xs">
                    ⚠️ Chave Pix parece inválida. Verifique seu arquivo .env
                  </div>
                )}

                {!pixKey && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-red-400 text-xs">
                    ⚠️ Chave Pix não configurada. Adicione VITE_PIX_KEY no seu .env
                  </div>
                )}

                {/* Copy/Paste Field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Ou use o Pix Copia e Cola:
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      readOnly
                      value={payload}
                      className="flex-1 bg-muted border border-border rounded-lg px-3 py-2 text-xs text-muted-foreground font-mono truncate"
                    />
                    <button
                      onClick={handleCopy}
                      disabled={!pixKey}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                        copied
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                          : 'bg-primary/20 text-primary hover:bg-primary/30 border border-primary/30'
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      {copied ? (
                        <>
                          <Check size={18} />
                          <span className="hidden sm:inline">Copiado!</span>
                        </>
                      ) : (
                        <>
                          <Copy size={18} />
                          <span className="hidden sm:inline">Copiar</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Instructions */}
                <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                  <p className="text-sm font-medium text-foreground">
                    Como usar:
                  </p>
                  <ol className="text-xs text-muted-foreground space-y-1 list-decimal list-inside">
                    <li>Abra o app do seu banco</li>
                    <li>Escolha a opção &ldquo;Pix Copia e Cola&rdquo;</li>
                    <li>Cole o código acima ou escaneie o QR Code</li>
                    <li>Confira os dados e finalize o pagamento</li>
                  </ol>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
