# Nexus Vital — Landing Page

Landing page construída a partir dos textos enviados para o **Método Nexus Vital**, apresentado pelo personal trainer **Guilherme dos Santos**.

## Estrutura do site

1. Título e primeira impressão
2. Identificação com a dor
3. Origem e autoridade do método
4. Os quatro pilares do Nexus Vital
5. O que o acompanhamento busca construir
6. Para quem é
7. Experiência anterior
8. Depoimentos e resultados
9. Sobre o Guilherme
10. Perguntas frequentes
11. Chamada final para ação

## Arquivos principais

- `index.html`: conteúdo e estrutura
- `style.css`: design, cores e responsividade
- `script.js`: menu, FAQ, animações e WhatsApp
- `config.js`: informações fáceis de alterar
- `assets/images/`: pasta para fotos, vídeos e logotipo

## Informações que ainda precisam ser adicionadas

Edite o arquivo `config.js` e preencha:

- WhatsApp
- e-mail
- formação acadêmica
- número do CREF

Também substitua os blocos visuais por:

- logotipo oficial em PNG ou SVG;
- foto principal;
- foto profissional do Guilherme;
- foto ou vídeo de apresentação;
- depoimentos reais e autorizados;
- resultados reais e autorizados.

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

## Conteúdos que precisam ser confirmados antes da publicação

O material original continha afirmações que exigem confirmação:

- “único método”;
- “treinar sem dor e sem crises”;
- redução de dores ou crises;
- “mais de 100 mulheres”;
- depoimentos e resultados específicos.

Esses conteúdos não foram publicados automaticamente. Inclua apenas informações verdadeiras, comprováveis e autorizadas.

## Como testar

Abra o arquivo `index.html` no navegador.

## Como publicar no GitHub Pages

1. Envie estes arquivos para a raiz do repositório.
2. Acesse `Settings`.
3. Entre em `Pages`.
4. Em `Source`, escolha `Deploy from a branch`.
5. Selecione a branch `main`.
6. Selecione a pasta `/ (root)`.
7. Clique em `Save`.


## Versão Experience — recursos interativos

Esta versão acrescenta uma camada visual mais moderna e autoral, sem bibliotecas pesadas:

- abertura animada com identidade NV;
- barra de progresso de leitura;
- rede Nexus animada no fundo da primeira seção;
- iluminação que acompanha o ponteiro;
- título com entrada cinética;
- faixa de palavras em movimento;
- comparação arrastável entre treino padrão e Nexus Vital;
- cartões com profundidade 3D;
- botões magnéticos;
- luz interativa em cartões;
- animações progressivas durante a rolagem;
- menu que identifica a seção atual;
- botão para reduzir ou reativar os efeitos;
- suporte à configuração `prefers-reduced-motion`.

Todos os efeitos são progressivos: o conteúdo continua disponível caso o navegador
não suporte alguma interação ou o visitante prefira menos movimento.


## Correção da comparação interativa

A comparação por controle arrastável foi substituída por duas abas animadas:

- **Treino padrão**
- **Método Nexus Vital**

A alteração evita que textos sejam cortados pela máscara visual, principalmente em
celulares e telas menores. O conteúdo agora aparece integralmente e também pode ser
alternado pelo teclado.
