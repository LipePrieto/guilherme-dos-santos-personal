/*
  CONFIGURAÇÕES PRINCIPAIS DO SITE — NEXUS VITAL
  ------------------------------------------------------------
  Preencha somente os campos confirmados pelo Guilherme.
  Não coloque "55" duas vezes no WhatsApp.
  Não invente e-mail, CREF, formação, URL, números ou depoimentos.

  Exemplo de WhatsApp:
  whatsapp: "5514999999999"
*/

const SITE_CONFIG = {
  // ------------------------------------------------------------
  // Usado em SEO (canonical, Open Graph, JSON-LD).
  // Enquanto vazio, o HTML usa um placeholder claramente marcado
  // ("https://www.SEU-DOMINIO-AQUI.com.br"). Ao publicar o site,
  // atualize também o robots.txt e o sitemap.xml com a mesma URL.
  // ------------------------------------------------------------
  site: {
    urlOficial: ""
  },

  profissional: {
    nome: "Guilherme dos Santos",
    instagram: "https://www.instagram.com/guisantos.prof/",
    instagramUsuario: "@guisantos.prof",

    // PREENCHER SOMENTE QUANDO CONFIRMADO:
    whatsapp: "",
    email: "",

    // Não preencha o CREF nem a formação até que estejam confirmados
    // e sejam realmente aplicáveis à atuação atual do Guilherme.
    // Enquanto vazios, o site mantém os avisos "a confirmar".
    cref: "",
    formacao: ""
  },

  whatsapp: {
    // Mensagem padrão usada pelos botões e pelo formulário de contato
    // quando a pessoa não escreve nada no campo de mensagem.
    mensagem:
      "Olá, Guilherme! Conheci o Método Nexus Vital pelo site e gostaria de entender como funciona o acompanhamento."
  },

  provaSocial: {
    // Não publique números, resultados ou depoimentos sem confirmação e autorização.
    numeroAtendimentos: "",

    // Controla a exibição da seção de depoimentos/resultados no site.
    // A seção já existe pronta no index.html, mas permanece OCULTA
    // (não é exibida para quem visita o site) enquanto este valor for "false".
    // Só troque para "true" depois de substituir os placeholders da seção
    // por depoimentos e resultados reais e autorizados pelo Guilherme.
    depoimentosPublicados: false
  }
};
