Clarity Tracking – Reusable Module

Overview
- Drop-in folder to instrument Microsoft Clarity across projects.
- Provides: route tags + optional view events, UTM tagging, click tracking, and helpers.

Files
- `ClarityRouteTags.tsx`: Sets `page_type`, `variant`, UTMs; optional emits `view:<page_type>`.
- `ClickTracker.tsx`: Captures clicks on interactive elements and sends `click:<pathname>:<label>`.
- `UtmCollector.tsx`: Persists UTMs em `sessionStorage` (`vanguardia_utms`) para uso posterior.
- `observability.ts`: Helpers `safeEvent`, `setTag`, `upgrade`, `identifyOnce`, `validationErrorOnce`.
- `route-config.ts`: Central config com defaults; suporta override via `window.__clarityRouteConfig`.
- `ClientProvider.tsx`: Bootstrap mínimo (opcional).

Quick Setup
1) Inserir o script do Clarity no `<head>` (per docs oficiais).
2) Montar os componentes uma vez no layout raiz:
   
   ```tsx
   import ClarityRouteTags from "@/components/clarity/ClarityRouteTags";
   import ClickTracker from "@/components/clarity/ClickTracker";
   import { UtmCollector } from "@/components/clarity/UtmCollector";

   export default function RootLayout({ children }: { children: React.ReactNode }) {
     return (
       <html lang="pt-BR">
         <body>
           <ClarityRouteTags />
           <UtmCollector />
           <ClickTracker />
           {children}
         </body>
       </html>
     );
   }
   ```

Configuration
- Mapeamento de página padrão:
  - `/` → `lp`
  - `/form*` → `form`
  - `/obrigado*` → `thanks`
  - Caso contrário → `other`
- Variante padrão: `process.env.NEXT_PUBLIC_VARIANT || "A"`.
- Override sem rebuild (opcional) definindo `window.__clarityRouteConfig` cedo (ex.: `<head>`):

```html
<script>
  window.__clarityRouteConfig = {
    pageTypeFrom: (pathname) => {
      if (!pathname) return "lp";
      if (pathname.startsWith("/checkout")) return "checkout";
      if (pathname.startsWith("/blog")) return "content";
      return "other";
    },
    getVariant: () => "B",
    enableViewEvent: true
  };
</script>
```

ClarityRouteTags Props
- `variant?: string` → sobrescreve a variante desta instância.
- `pageTypeFrom?: (pathname) => string` → mapeamento por instância.
- `enableViewEvent?: boolean` → habilita/desabilita `view:<page_type>`.

ClickTracker Details
- Rastrea: `button`, `a`, `[role="button"]`, `input[type="submit"]` via mouse e teclado (Enter/Espaço).
- Ignora elementos com `data-track="false"`.
- Label priority: `data-cta` → `id` → `name` → texto/value (trim, máx 80).
- Formato: `click:<pathname>:<label>` (ex.: `click:/form:cta:form_next_step_2`).

Form Funnel Events (explícitos)
- Recomendado para métricas consistentes, além de cliques:
  - `form:step_<n>_view` + tag `form_current_step`: visão de etapa.
  - `form:next_click:step_<n>` e `form:next_success:from_<n>_to_<n+1>`.
  - `form:back_click:step_<n>` e `form:back_success:from_<n>_to_<n-1>`.
  - `form:submit_click`, `form:submit_attempt`, `form:submit_success`, `form:submit_error` (+ tag `form_http_status`).

Exemplos de análise no Clarity
- Entrou na etapa 2 mas não avançou: `form:step_2_view` AND NOT `form:next_success:from_2_to_3`.
- Clicou Próximo na etapa 2 mas não passou validação: `form:next_click:step_2` AND NOT `form:next_success:from_2_to_3`.
- Funil de envio: `form:submit_click` → `form:submit_attempt` → (`form:submit_success` OR `form:submit_error`).

Mini Lead Form
- Eventos padrão: `mini_form:open` ao abrir e `mini_form:close` ao fechar (inclui ESC/clique fora).
- Opcional: adicionar `mini_form:submit_success` e `mini_form:submit_error` no handler de envio.

Helpers Usage
- `safeEvent(name)` → emite evento custom.
- `setTag(key, value)` → seta tags de sessão.
- `identifyOnce(userHash)` → identifica usuário (use `hashEmail`).
- `validationErrorOnce(field?)` → emite `form:validation_error` com `form_last_error` (debounce 1s).

Troubleshooting
- Sem eventos? Verifique se o script do Clarity está carregado e os componentes montados uma vez.
- Botão de fechar duplicado? Use o close padrão da sua lib de dialog; evite segundo botão.
- Organização de páginas diferente? Forneça `pageTypeFrom` via props ou override global.

Scope & Privacy
- Evite PII; use `hashEmail` antes de identificar usuários.
- Não envie dados sensíveis em eventos ou tags.
