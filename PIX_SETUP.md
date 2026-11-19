# 🪙 Configuração do Pix - Portfólio

Guia completo para configurar as doações via Pix no seu portfólio.

---

## 🔐 Passo 1: Gerar Chave Aleatória (EVP)

**NÃO use CPF, email ou telefone** por segurança. Siga estes passos:

### No seu banco (app mobile):

1. Abra o app do seu banco
2. Vá em **Pix** → **Minhas Chaves**
3. Clique em **Adicionar Nova Chave**
4. Escolha **Chave Aleatória (EVP)**
5. O banco vai gerar um código como:
   ```
   123e4567-e89b-12d3-a456-426614174000
   ```
6. Copie essa chave

---

## 📝 Passo 2: Configurar Variáveis de Ambiente

1. Copie o arquivo de exemplo:
   ```bash
   cp .env.example .env
   ```

2. Edite o arquivo `.env`:
   ```env
   # Cole sua Chave Aleatória aqui
   NEXT_PUBLIC_PIX_KEY=123e4567-e89b-12d3-a456-426614174000

   # Seu nome completo (como aparece no Pix)
   NEXT_PUBLIC_PIX_NAME=Thiago B. Rodrigues

   # Sua cidade
   NEXT_PUBLIC_PIX_CITY=Manaus

   # Valor sugerido em centavos (opcional)
   # 500 = R$ 5,00 | 1000 = R$ 10,00
   # Deixe vazio para valor livre
   NEXT_PUBLIC_PIX_AMOUNT=500
   ```

---

## ⚠️ Importante: Segurança

### ✅ O que fazer:
- Use **sempre** Chave Aleatória (EVP)
- Mantenha o arquivo `.env` em segredo
- Adicione `.env` no `.gitignore` (já feito)
- Nunca commit `.env` no GitHub

### ❌ O que NÃO fazer:
- Não use CPF como chave Pix
- Não use email principal (pode receber spam)
- Não use telefone pessoal
- Não commit `.env` no GitHub

---

## 🎨 Como Funciona no Portfólio

1. Usuário clica no ícone ☕ no canto inferior da Home
2. Modal abre com:
   - QR Code gerado automaticamente
   - Botão para copiar o "Pix Copia e Cola"
   - Instruções de uso
3. Usuário escaneia ou cola no app do banco

---

## 🧪 Testando

1. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

2. Acesse `http://localhost:3000`

3. Clique no ícone de café ☕ próximo aos ícones sociais

4. Verifique se:
   - [ ] QR Code aparece
   - [ ] Botão "Copiar" funciona
   - [ ] Feedback "Copiado!" aparece
   - [ ] Modal fecha ao clicar no X

---

## 🚀 Deploy em Produção

Quando fizer deploy (Vercel, Netlify, etc):

1. Adicione as variáveis de ambiente na plataforma:
   - NEXT_PUBLIC_PIX_KEY
   - NEXT_PUBLIC_PIX_NAME
   - NEXT_PUBLIC_PIX_CITY
   - NEXT_PUBLIC_PIX_AMOUNT (opcional)

2. **Nunca** suba o arquivo `.env` para o repositório

---

## 📊 Validação

O sistema valida automaticamente se a chave parece válida:

| Tipo | Formato | Válido? |
|------|---------|---------|
| EVP (Aleatória) | `xxxx-xxxx-xxxx-xxxx-xxxx` | ✅ Sim |
| Email | `nome@exemplo.com` | ✅ Sim |
| Telefone | `92981065920` | ✅ Sim |
| CPF | `01234567890` | ✅ Sim (mas não use!) |
| Inválido | `abc123` | ❌ Não |

Se a chave for inválida, um alerta amarelo aparece no modal.

---

## 🛠️ Troubleshooting

### "Chave Pix não configurada"
- Verifique se criou o arquivo `.env`
- Confira se `NEXT_PUBLIC_PIX_KEY` está preenchido
- Reinicie o servidor (`npm run dev`)

### QR Code não aparece
- Verifique se tem internet (QR Code usa API externa)
- Confira se a chave está válida

### Modal não abre
- Verifique se não há erros no console do navegador
- Confira se importou o componente corretamente

---

## 📚 Arquivos Criados

| Arquivo | Descrição |
|---------|-----------|
| `.env.example` | Modelo de variáveis de ambiente |
| `.gitignore` | Ignora `.env` no Git (já atualizado) |
| `src/lib/pix.ts` | Gera Payload e QR Code do Pix |
| `src/components/pix-donation.tsx` | Modal de doação |
| `PIX_SETUP.md` | Este guia |

---

## ✅ Checklist Final

- [ ] Gerar Chave Aleatória no banco
- [ ] Copiar `.env.example` para `.env`
- [ ] Preencher `NEXT_PUBLIC_PIX_KEY` com a chave
- [ ] Preencher `NEXT_PUBLIC_PIX_NAME` com seu nome
- [ ] Preencher `NEXT_PUBLIC_PIX_CITY` com sua cidade
- [ ] (Opcional) Definir `NEXT_PUBLIC_PIX_AMOUNT`
- [ ] Testar localmente
- [ ] Fazer deploy com as variáveis

---

*Pronto! Agora você pode receber doações de forma segura e profissional.* ☕
