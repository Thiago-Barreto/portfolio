/**
 * Gera o Payload do Pix (Copia e Cola) no padrão BR Code
 * @see https://www.bcb.gov.br/estabilidadefinanceira/pix
 */

interface PixOptions {
  key: string;
  name: string;
  city: string;
  amount?: number; // Em centavos (ex: 500 = R$ 5,00)
  txid?: string;   // Identificador da transação
}

/**
 * Calcula o CRC16 do payload Pix
 */
function crc16(payload: string): string {
  let crc = 0xffff;
  const polynomial = 0x1021;

  for (let i = 0; i < payload.length; i++) {
    crc ^= payload.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      crc = (crc & 0x8000) ? (crc << 1) ^ polynomial : crc << 1;
    }
  }

  return (crc & 0xffff).toString(16).toUpperCase().padStart(4, '0');
}

/**
 * Formata um campo no padrão do Pix (ID + tamanho + valor)
 */
function formatField(id: number, value: string): string {
  const idStr = id.toString().padStart(2, '0');
  const sizeStr = value.length.toString().padStart(2, '0');
  return `${idStr}${sizeStr}${value}`;
}

/**
 * Gera o Payload Pix completo (Copia e Cola)
 */
export function generatePixPayload(options: PixOptions): string {
  const { key, name, city, amount, txid = '***' } = options;

  // Campo 26 - Chave Pix
  const pixKeyField = formatField(1, key);
  const guiField = formatField(0, 'BR.GOV.BCB.PIX');
  const field26 = formatField(26, guiField + pixKeyField);

  // Campos obrigatórios
  const merchantCategory = formatField(52, '0000'); // Categoria
  const currency = formatField(53, '986'); // BRL
  const amountField = amount
    ? formatField(54, amount.toFixed(2))
    : '';
  const countryCode = formatField(58, 'BR');
  const nameField = formatField(59, name.substring(0, 25));
  const cityField = formatField(60, city.substring(0, 15));
  const additionalData = formatField(62, `05${txid.length.toString().padStart(2, '0')}${txid}`);

  // Monta payload parcial
  const partialPayload = `000201${field26}${merchantCategory}${currency}${amountField}${countryCode}${nameField}${cityField}${additionalData}`;

  // Adiciona CRC16
  const crc = crc16(partialPayload + '6304');

  return `${partialPayload}6304${crc}`;
}

/**
 * Gera URL do QR Code Pix
 */
export function generatePixQrCodeUrl(payload: string): string {
  return `https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=${encodeURIComponent(payload)}`;
}

/**
 * Valida se uma chave Pix parece válida
 */
export function isValidPixKey(key: string): boolean {
  if (!key || key.length < 10) return false;

  // Chave aleatória (EVP) - UUID format
  if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(key)) {
    return true;
  }

  // Email
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(key)) {
    return true;
  }

  // Telefone (com ou sem DDD)
  if (/^[0-9]{10,11}$/.test(key)) {
    return true;
  }

  // CPF/CNPJ (apenas números)
  if (/^[0-9]{11,14}$/.test(key)) {
    return true;
  }

  return false;
}
