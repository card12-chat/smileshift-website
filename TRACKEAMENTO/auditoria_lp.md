# Auditoria do Funil de E-Commerce (Landing Page + Yampi)

Atendendo ao seu pedido, analisei profundamente o log do container Web `01compraaprovada web_formatado.json`. Abaixo está o mapeamento completo do funil de e-commerce da sua Landing Page.

---

## 1. Eventos Disparados vs. Funil Esperado

A sua página atual **não possui um funil completo de e-commerce**. Vários eventos chaves estão ausentes antes do usuário chegar na Yampi.

| Evento Ideal | Presente no Debug? | Nome Real Disparado | Status |
|---|---|---|---|
| `view_offer` (ou `view_item`) | ❌ Não | *(Apenas `page_view` genérico)* | O usuário carrega a página, mas nenhum evento diz pro GTM quais ofertas estão na tela. |
| `select_offer` (ou `select_item`) | ❌ Não | `optimize.sku.14:6144#2 Box` | O botão é clicado, mas dispara um evento totalmente despadronizado que o GTM/GA4 não entende, sem parâmetros e sem valor. |
| `begin_checkout` | ✅ Sim | `begin_checkout` (Disparado 2x) | Chega via script customizado (Landing Page) e via script nativo da Yampi. |
| `purchase` | ✅ Sim | `purchase` | Disparado pela Yampi, porém de forma prematura (PIX pendente). |

---

## 2. Ausência e Presença de Parâmetros

Você pediu para eu analisar a presença do objeto `ecommerce` padrão (com `value`, `currency`, `items`, etc.). 

**A verdade absoluta do seu debug: O objeto `ecommerce` NÃO EXISTE em nenhum momento da jornada.**

O que está acontecendo na realidade:
1. **No clique da Oferta:** O clique no botão da Landing Page não envia absolutamente nenhum valor de produto, ID, ou moeda.
2. **No `begin_checkout` 1 (Gerado pela Landing Page):** Envia os campos `value`, `currency`, e `event_id` **soltos na raiz** do dataLayer. Falta totalmente o array de produtos (`items`).
3. **No `begin_checkout` 2 (Gerado pela Yampi):** Envia um objeto chamado `eventModel` contendo `currency`, `value`, e os `items` do carrinho, além dos dados do cliente (`customer`). Porém, falta o `event_id` na raiz.
4. **No `purchase` (Gerado pela Yampi):** Mesma coisa. Envia através do `eventModel` (proprietário da Yampi), gera o `transaction_id`, mas não possui array `ecommerce` padrão do GA4, não possui `event_id`.

---

## 3. Origem dos Dados (DataLayer x GTM Variáveis)

1. **Dados de Topo de Funil (PageView, Select Offer):** Não há dados. As tags do GA4 e FB que disparam no `page_view` não carregam nenhuma variável de e-commerce porque o dataLayer não as possui.
2. **Dados do Pedido (`eventModel` / `value` / `currency`):** Vêm puramente dos `dataLayer.push` disparados estaticamente no HTML da Landing Page (para o primeiro checkout) ou injetados dinamicamente pelos scripts nativos do checkout da **Yampi**.
3. **Variáveis GTM:** Suas Data Layer Variables no Web (`event_id`, `value`, `currency`) leem corretamente os dados que estão soltos na raiz, MAS elas retornam vazias/`undefined` para os eventos gerados pela Yampi, pois a Yampi guarda tudo dentro da camada oculta `eventModel`.

---

## 4. Por que o Purchase não chega no Container Server?

No debug do Server que analisamos, os eventos `page_view` e `begin_checkout` chegam lindamente. O `purchase` morre no caminho. Eis o porquê:

1. **Falta a Ponte no Web:** O evento de `purchase` acontece no Browser do cliente. Porém, não existe NENHUMA tag GA4 no seu container Web que tenha o gatilho (`trigger`) configurado para o evento personalizado `purchase`. Como não tem tag do GA4 disparando, absolutamente nenhum dado é enviado para a URL `/g/collect` do seu Server Container.
2. **O Abismo do Webhook:** Paralelamente, o Server não registrou recebimento do Webhook da Yampi porque no teste o path `/lead/` ainda estava sem o "Data Client" (o que nós corrigimos recentemente).
3. E mesmo se a ponte do Web funcionasse, o `purchase` disparado pela Yampi ocorre enquanto `order.status = "waiting_payment"`. Ou seja, você enviaria vendas não compensadas pro servidor via browser.

---

## 5. Implementação Exata Necessária (O Cenário Ideal)

Para que seu funil LP + Yampi seja perfeito para o Google Analytics 4, MetriAds e conformidade com CAPI: você precisa engatilhar os **padrões exatos do GA4 (e-commerce)** no HTML/JS da sua Landing Page. 

Aqui está o formato idealizado de `dataLayer.push` que o Desenvolvedor da sua LP deve implementar:

### A) Evento 1: Visualização das Ofertas (Quando a página carrega e monta os Kits)
Deve substituir os PageViews genéricos das tags de performance.

```javascript
// Disparar via JS quando a Landing Page terminar de carregar os pacotes
dataLayer.push({ ecommerce: null }); // Limpa o objeto anterior (boas práticas)
dataLayer.push({
  event: "view_item_list", // Padrão GA4 para visualização de múltiplas ofertas
  event_id: "vi_123456789", // Gerar random hash para deduplicação
  ecommerce: {
    item_list_name: "Ofertas LP Principal",
    items: [
      {
        item_id: "296368751",
        item_name: "SmileShift V34 - Tratamento Básico",
        price: 59.90,
        currency: "BRL",
        quantity: 1
      },
      {
        item_id: "296368752",
        item_name: "SmileShift V34 - Tratamento Avançado (2 Kits)",
        price: 99.90,
        currency: "BRL",
        quantity: 1
      }
    ]
  }
});
```

### B) Evento 2: Clique no Botão de Compra (Substituindo o antigo "optimize.sku...")
Deve ocorrer ANTES do redirecionamento pro checkout.

```javascript
// Adicionar aos botões (onclick) ou Event Listener
dataLayer.push({ ecommerce: null });
dataLayer.push({
  event: "select_item", // ou add_to_cart se for fluxo contínuo
  event_id: "si_123456789",
  ecommerce: {
    currency: "BRL",
    value: 99.90,
    items: [
      {
        item_id: "296368752",
        item_name: "SmileShift V34 - Tratamento Avançado (2 Kits)",
        price: 99.90,
        quantity: 1
      }
    ]
  }
});
```

### C) Evento 3: Begin Checkout
Atualmente a Yampi bagunça atirando isso duas vezes em formatos desconexos. A LP deveria mandar no clique pro redirect:

```javascript
dataLayer.push({ ecommerce: null });
dataLayer.push({
  event: "begin_checkout",
  event_id: "bc_123456789",
  ecommerce: {
    currency: "BRL",
    value: 99.90,
    items: [
      {
        item_id: "296368752",
        item_name: "SmileShift V34 - Tratamento Avançado (2 Kits)",
        price: 99.90,
        quantity: 1
      }
    ]
  }
});
```

### O Que Fazer Quanto ao Purchase?

**REGRA DE PRECISÃO CIRÚRGICA:**
Não gere `dataLayer.push` para `purchase` na Landing Page, pois a finalização nunca acontece na LP, ela acontece na Yampi. 
Como configuramos a CAPI atrelada ao servidor `/lead/`, deixe o backend (webhook da Yampi) fazer o envio do Purchase no Server Side de forma exclusiva quando o pagamento der `paid`. 

**Para concluir esta correção no Web Container:**
Você precisaria apenas de 1 tag do "GA4 - Event" configurada para os eventos de e-commerce genéricos (com expressões regulares tipo `view_item_list|select_item|add_to_cart`), habilitando as caixinhas avançadas "Enviar dados de eCommerce via DataLayer". 

Isso padroniza a raiz da sua coleta, manda tudo pro GA4 Server, e as tags antigas quebram de vez o viés de duplicação.
