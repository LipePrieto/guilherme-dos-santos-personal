# Nexus Vital — Landing Page

Landing page construída a partir dos textos enviados para o **Método Nexus Vital**,
apresentado pelo personal trainer **Guilherme dos Santos**.

Esta versão reorganiza e amplia a estrutura original, mantendo a mesma
identidade visual (cores, tipografia, animações), reescrita em **CSS
mobile-first** e com HTML semântico e SEO básico preparado.

## Tecnologia

Site estático, sem build e sem framework: **HTML5 + CSS3 + JavaScript vanilla**.
Dependências carregadas via CDN pelo próprio navegador (não precisam de
instalação local):

- Google Fonts — Montserrat, Covered By Your Grace
- [Phosphor Icons](https://phosphoricons.com/) (`@phosphor-icons/web`)

Não há backend, banco de dados ou servidor de aplicação.

## Arquivos do projeto

- `index.html` — conteúdo e estrutura da página
- `style.css` — design, cores, tipografia e responsividade (mobile-first)
- `script.js` — menu, FAQ, animações, WhatsApp, formulário de contato e
  exibição condicional dos depoimentos
- `config.js` — informações fáceis de alterar (WhatsApp, e-mail, CREF, etc.)
- `favicon.svg` — ícone do site
- `robots.txt` — instruções para buscadores (**contém URL placeholder**)
- `sitemap.xml` — mapa do site para SEO (**contém URL placeholder**)
- `assets/images/` — pasta para fotos, vídeos e logotipo (crie esta pasta e
  adicione os arquivos reais antes de publicar)

## Estrutura de seções do site

1. Cabeçalho e navegação
2. Título e primeira impressão (hero)
3. Faixa de diferenciais rápidos
4. Identificação com a dor
5. Perspectiva / comparação (abas: treino padrão x Nexus Vital)
6. Origem e autoridade do método
7. Os quatro pilares do Nexus Vital
8. **Como funciona** (nova) — passo a passo neutro do primeiro contato
9. O que o acompanhamento busca construir
10. Para quem é
11. Depoimentos e resultados (**oculta por padrão**, ver abaixo)
12. Sobre o Guilherme
13. Perguntas frequentes
14. Chamada final para ação + formulário de contato (nova)
15. Rodapé

## O que foi alterado nesta versão

- **CSS totalmente reescrito em mobile-first**: os estilos-base agora
  descrevem a experiência em telas pequenas; blocos `@media (min-width: ...)`
  ampliam progressivamente o layout para tablets e desktops (breakpoints em
  660px, 900px e 1040px — os mesmos pontos de quebra do site original, agora
  invertidos). A aparência em cada largura permanece a mesma de antes.
- **Nova seção "Como funciona"**: um passo a passo neutro (primeiro contato →
  conversa inicial → retorno personalizado). Não descreve anamnese,
  aplicativo, planilha, avaliações, frequência ou prazos, porque isso ainda
  não foi confirmado. Um aviso na própria seção deixa isso explícito.
- **Formulário de contato**: além do botão de WhatsApp já existente, agora há
  um formulário simples (nome + mensagem) na seção final. Ele **não tem
  backend**: apenas monta um link `https://wa.me/...` com o texto digitado e
  abre o WhatsApp para a própria pessoa revisar e enviar. Nenhuma mensagem de
  "enviado com sucesso" é exibida, porque nada é de fato enviado pelo site.
- **Depoimentos preparados, mas ocultos**: a seção de depoimentos/resultados
  continua no código (com os mesmos avisos de conteúdo pendente), porém agora
  vem com o atributo HTML `hidden` por padrão. Ela só passa a ser exibida
  quando `SITE_CONFIG.provaSocial.depoimentosPublicados` for alterado para
  `true` em `config.js` — e isso só deve ser feito depois de os placeholders
  serem substituídos por depoimentos e resultados reais e autorizados.
- **SEO básico**: Open Graph completo, Twitter Card, `canonical`, JSON-LD
  (`Person` + `WebSite`, usando apenas dados já aprovados no site),
  `robots.txt` e `sitemap.xml`. Como o domínio final ainda não foi definido,
  todos esses arquivos usam o placeholder `https://www.SEU-DOMINIO-AQUI.com.br/`
  — veja a lista de pendências abaixo.
- **Acessibilidade**: foco visível reforçado em links, botões e campos de
  formulário (`:focus-visible`), mantendo o que já existia (skip link,
  `aria-*`, `prefers-reduced-motion`, navegação por teclado nas abas).
- **Sem preço, sem novos depoimentos, sem novas promessas**: nenhuma seção de
  valores/planos foi criada, nenhum depoimento ou resultado foi inventado, e
  nenhuma etapa específica de atendimento foi afirmada além do que já constava
  no material original.

## Informações que ainda precisam ser confirmadas com o Guilherme

Edite o arquivo `config.js` e preencha somente o que for confirmado:

- WhatsApp
- E-mail
- Formação acadêmica
- Número do CREF (**não publique isso até confirmar que é aplicável à
  atuação atual do Guilherme**)
- URL oficial do site (`SITE_CONFIG.site.urlOficial`, usada apenas como
  referência — os arquivos de SEO abaixo precisam ser atualizados à parte)

Também é necessário substituir os blocos visuais por:

- Logotipo oficial (PNG ou SVG)
- Foto principal (hero)
- Foto profissional do Guilherme (seção "Sobre")
- Foto ou vídeo de apresentação
- Uma imagem simples para compartilhamento em redes sociais
  (`assets/images/og-image.svg`, referenciada no `<head>` do `index.html`)
- Depoimentos e resultados reais e autorizados (ver seção abaixo)

Além disso, para a seção **"Como funciona"** ficar completa, será necessário
perguntar ao Guilherme:

- O acompanhamento é presencial, online, ou os dois?
- Existe alguma ferramenta específica usada no processo (aplicativo,
  planilha, formulário de anamnese)?
- Qual a frequência e a duração aproximada de um ciclo de acompanhamento?

## Conteúdo que NÃO deve ser publicado ainda

- A seção de **depoimentos e resultados** (`id="resultados"`) está oculta
  (`hidden`) no HTML. Não a ative em `config.js` até haver depoimentos reais
  e autorizados no lugar dos placeholders.
- O texto "mais de 100 mulheres" e qualquer número de atendimentos: só devem
  ser publicados se `numeroAtendimentos` for preenchido em `config.js` com
  uma informação verdadeira e comprovável, e adicionados manualmente onde
  fizer sentido no `index.html`.
- CREF e formação acadêmica: os campos em `config.js` estão vazios de
  propósito. O site continuará mostrando "a confirmar" até que sejam
  preenchidos.
- Qualquer afirmação de cura, eliminação de dor ou promessa de resultado
  médico. O conteúdo atual já evita isso; mantenha essa mesma cautela ao
  adicionar novos textos.

## Como configurar o WhatsApp

No arquivo `config.js`, troque:

```js
whatsapp: ""
```

por algo como:

```js
whatsapp: "5514999999999"
```

Use somente números, começando por `55`, seguido do DDD e telefone.

## Paleta da identidade visual

- Azul claro: `#7da7c9`
- Azul médio: `#567c99`
- Azul escuro: `#003a5d`
- Marrom: `#423226`
- Marrom claro: `#6c523d`
- Bege: `#dbd5ca`
- Fundo claro: `#f0efeb`
- Escuro: `#2a2a29`

## Tipografia

- Títulos: Montserrat
- Textos: Century Gothic ou equivalente
- Detalhes: Covered By Your Grace

## Como testar localmente

Este site não precisa de instalação nem de dependências (`npm install`,
`pip install` etc.) — é HTML/CSS/JS puro.

1. Abra a pasta do projeto.
2. Dê duplo-clique em `index.html` para abrir direto no navegador, **ou**
   sirva a pasta com um servidor local simples (recomendado, evita problemas
   de CORS em alguns navegadores):

   ```bash
   # Python (já vem instalado na maioria dos sistemas)
   python3 -m http.server 8000
   ```

   Depois acesse `http://localhost:8000` no navegador.

3. Teste a responsividade usando as ferramentas de desenvolvedor do navegador
   (modo de dispositivo/"Toggle device toolbar" no Chrome/Edge, ou modo
   responsivo no Firefox) nestas larguras, no mínimo:

   - 360 px (celulares pequenos)
   - 390 px (celulares comuns)
   - 768 px (tablets)
   - 1024 px (tablets grandes / notebooks pequenos)
   - 1366 px (notebooks)
   - 1440 px+ (desktops grandes)

   Verifique especialmente: menu (abrir/fechar), botões, textos, cards, abas
   de comparação, formulário de contato, rodapé e elementos animados.

4. Para testar o formulário de contato e os botões de WhatsApp, preencha
   `profissional.whatsapp` em `config.js` com um número de teste — sem isso,
   eles ficam propositalmente desativados.

5. Para visualizar a seção de depoimentos (com o conteúdo placeholder atual),
   altere temporariamente `provaSocial.depoimentosPublicados` para `true` em
   `config.js`. Lembre-se de voltar para `false` (ou substituir por
   depoimentos reais) antes de publicar.

## Como publicar no GitHub Pages

1. Envie estes arquivos para a raiz do repositório.
2. Acesse `Settings`.
3. Entre em `Pages`.
4. Em `Source`, escolha `Deploy from a branch`.
5. Selecione a branch `main`.
6. Selecione a pasta `/ (root)`.
7. Clique em `Save`.
8. Depois de saber a URL final, atualize o placeholder
   `https://www.SEU-DOMINIO-AQUI.com.br/` em `index.html` (canonical, Open
   Graph, JSON-LD), `robots.txt` e `sitemap.xml`.

## Versão Experience — recursos interativos

Esta versão mantém a camada visual mais moderna e autoral introduzida
anteriormente, sem bibliotecas pesadas:

- abertura animada com identidade NV;
- barra de progresso de leitura;
- rede Nexus animada no fundo da primeira seção;
- iluminação que acompanha o ponteiro;
- título com entrada cinética;
- faixa de palavras em movimento;
- comparação por abas entre treino padrão e Nexus Vital (sem cortar texto);
- cartões com profundidade 3D;
- botões magnéticos;
- luz interativa em cartões;
- animações progressivas durante a rolagem;
- menu que identifica a seção atual;
- botão para reduzir ou reativar os efeitos;
- suporte à configuração `prefers-reduced-motion`.

Todos os efeitos são progressivos: o conteúdo continua disponível caso o
navegador não suporte alguma interação ou o visitante prefira menos movimento.
