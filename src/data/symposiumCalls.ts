import type { Localized } from '@/lib/localized';
import type { SymposiumId } from './symposia';
import { SBES_TRACKS, type SbesTrackId } from './sbesTracks';

/**
 * Per-symposium calls for papers (/<symposium>/chamada). A symposium whose
 * call is `null` shows a "coming soon" note until its 2027 text arrives.
 *
 * Paragraphs and list items accept inline links written as [label](url)
 * and bold text written as **text**.
 */
export type CallBlock =
  | { kind: 'p'; text: Localized }
  | { kind: 'list'; items: Localized[] }
  | { kind: 'code'; code: string };

export interface CallSection {
  title: Localized;
  blocks: CallBlock[];
}

export interface CallMilestone {
  label: Localized;
  /** `null` renders "A definir" until the 2027 date is confirmed. */
  date: string | null;
  /** Marks a deadline that will not be extended. */
  hard?: boolean;
}

export interface CallMember {
  name: string;
  affiliation: string;
}

export interface SymposiumCall {
  /** Opening paragraphs, under the symposium's name. */
  intro: Localized[];
  sections: CallSection[];
  milestones: CallMilestone[];
  /** Short note under the dates card. */
  datesNote?: Localized;
  chairs: CallMember[];
  committees: CallCommittee[];
}

export interface CallCommittee {
  /** Defaults to "Comitê de Programa". */
  title?: Localized;
  members: CallMember[];
}

/** Stands in for every chair and committee member until the 2027 names
 *  are confirmed. */
const PLACEHOLDER_MEMBER: CallMember = { name: 'xxxxxx', affiliation: 'xxxxxx' };
const PLACEHOLDER_COMMITTEE: CallMember[] = [PLACEHOLDER_MEMBER, PLACEHOLDER_MEMBER, PLACEHOLDER_MEMBER];

const SBC_AUTHOR_CONDUCT_URL = 'https://sol.sbc.org.br/index.php/indice/conduta';

const ethicsSection: CallSection = {
  title: { pt: 'Ética e Conduta na Publicação', en: 'Publication Ethics and Conduct' },
  blocks: [
    {
      kind: 'p',
      text: {
        pt: `Todos os trabalhos submetidos devem estar em conformidade com o [Código de Conduta para Autores em Publicações da Sociedade Brasileira de Computação (SBC)](${SBC_AUTHOR_CONDUCT_URL}).`,
        en: `All submitted papers must comply with the [Code of Conduct for Authors in Publications of the Brazilian Computer Society (SBC)](${SBC_AUTHOR_CONDUCT_URL}).`,
      },
    },
  ],
};

/**
 * SAST 2027. Text adapted from the SAST 2026 call (11th edition, São Paulo):
 * edition, year and city updated; dates, the JEMS link, the chairs and the
 * program committee are pending.
 */
const SAST_CALL: SymposiumCall = {
  intro: [
    {
      pt: 'Teste de software tem grande importância na verificação e validação de sistemas de software. Além disso, estudos empíricos indicam que as atividades relacionadas a testes geralmente representam mais de 50% dos custos do desenvolvimento de software. Abordagens de teste sistemático e automatizado têm se demonstrado capazes de contribuir para a redução desses custos. Casos de sucesso na indústria têm sido constantemente reportados e o interesse nas investigações na academia aumenta continuamente, como pode ser observado através do grande número de pesquisadores envolvidos neste tema.',
      en: 'Software testing plays a major role in the verification and validation of software systems. Moreover, empirical studies indicate that testing-related activities usually account for more than 50% of software development costs. Systematic and automated testing approaches have proven able to help reduce these costs. Success stories from industry are constantly reported, and interest from academia keeps growing, as shown by the large number of researchers working on this topic.',
    },
    {
      pt: 'O principal objetivo do SAST é disponibilizar um fórum de discussão para congregar as comunidades da indústria e da academia envolvidas com a sistematização e automação de testes de software para diferentes categorias de sistemas.',
      en: 'The main goal of SAST is to provide a discussion forum that brings together the industry and academic communities involved in the systematisation and automation of software testing for different kinds of systems.',
    },
    {
      pt: 'Em sua décima segunda edição como simpósio co-localizado ao Congresso Brasileiro de Software: Teoria e Prática (CBSoft), o SAST 2027 convida toda a comunidade de teste de software a submeter resultados de suas inovações na área. Esta edição do simpósio continua a promover o diálogo entre indústria e academia incentivando a participação da indústria. Como resultado, além dos trabalhos de pesquisa, teremos também a categoria de resumos industriais. Para esse tipo de submissão, os profissionais de teste são convidados a submeter trabalhos com foco nas dificuldades pragmáticas associadas à realização de atividades de teste na indústria.',
      en: 'In its twelfth edition as a symposium co-located with the Brazilian Conference on Software: Theory and Practice (CBSoft), SAST 2027 invites the whole software testing community to submit the results of their innovations in the field. This edition keeps fostering the dialogue between industry and academia by encouraging industry participation. As a result, besides research papers, there is also an industry abstracts category. For this kind of submission, testing practitioners are invited to submit papers focused on the pragmatic difficulties of carrying out testing activities in industry.',
    },
  ],
  sections: [
    {
      title: { pt: 'Tópicos de Interesse', en: 'Topics of Interest' },
      blocks: [
        {
          kind: 'p',
          text: {
            pt: 'O SAST promove a discussão harmônica e conjunta entre os profissionais da academia e indústria envolvidos com práticas, atividades e ferramentas relacionadas ao teste de software sistemático e automatizado. Os tópicos cobertos pelo simpósio incluem, mas não se limitam, os seguintes:',
            en: 'SAST promotes a joint discussion among academic and industry professionals involved with practices, activities and tools related to systematic and automated software testing. Topics include, but are not limited to:',
          },
        },
        {
          kind: 'list',
          items: [
            { pt: 'Teste de software automatizado: ambientes, ferramentas e relatos sobre automação de testes na indústria', en: 'Automated software testing: environments, tools and reports on test automation in industry' },
            { pt: 'Teste combinatório e teste aleatório', en: 'Combinatorial testing and random testing' },
            { pt: 'Teste de software distribuído e paralelo', en: 'Testing of distributed and parallel software' },
            { pt: 'Teste baseado em erro e teste baseado em falta', en: 'Error-based and fault-based testing' },
            { pt: 'Gerenciamento e integração de atividades e recursos de teste', en: 'Management and integration of testing activities and resources' },
            { pt: 'Manutenção e reuso de artefatos de teste', en: 'Maintenance and reuse of test artefacts' },
            { pt: 'Testes baseados em modelo e testes dirigidos por modelo', en: 'Model-based and model-driven testing' },
            { pt: 'Testes de desempenho, carga e estresse', en: 'Performance, load and stress testing' },
            { pt: 'Predição e teste baseado em riscos', en: 'Prediction and risk-based testing' },
            { pt: 'Testes baseados em programa, testes baseados em especificação e teste de requisitos', en: 'Program-based testing, specification-based testing and requirements testing' },
            { pt: 'Adequação dos testes e medidas de cobertura', en: 'Test adequacy and coverage measures' },
            { pt: 'Geração de casos de teste e técnicas de seleção', en: 'Test case generation and selection techniques' },
            { pt: 'Motores de testes, stubs, frameworks e geração de roteiros de teste', en: 'Test drivers, stubs, frameworks and test script generation' },
            { pt: 'Análise de efetividade de testes e geração de relatórios de teste', en: 'Test effectiveness analysis and test reporting' },
            { pt: 'Oráculos de teste e técnicas de verificação dos resultados do teste', en: 'Test oracles and techniques for checking test results' },
            { pt: 'Teste de sistemas de software contemporâneos: móveis, em nuvem, sensíveis ao contexto, Internet das Coisas, Indústria 4.0, Big Data', en: 'Testing contemporary software systems: mobile, cloud, context-aware, Internet of Things, Industry 4.0, Big Data' },
            { pt: 'Teste de software baseado em aprendizado, incluindo Deep Learning', en: 'Learning-based software testing, including Deep Learning' },
            { pt: 'Teste de requisitos não funcionais: segurança, safety, interoperabilidade, dentre outros', en: 'Testing non-functional requirements: security, safety, interoperability, among others' },
            { pt: 'Teste de software assistido por IA', en: 'AI-assisted software testing' },
          ],
        },
      ],
    },
    {
      title: { pt: 'Diretrizes de Submissão', en: 'Submission Guidelines' },
      blocks: [
        { kind: 'p', text: { pt: 'O SAST aceita dois tipos de submissões:', en: 'SAST accepts two kinds of submissions:' } },
        {
          kind: 'list',
          items: [
            { pt: 'Artigos Regulares (não menos que 6 páginas e não mais que 10 páginas, incluindo todas as figuras, referências e apêndices); e', en: 'Regular Papers (no fewer than 6 and no more than 10 pages, including all figures, references and appendices); and' },
            { pt: 'Resumos da Indústria (não podendo exceder 3 páginas para todo o conteúdo do artigo).', en: 'Industry Abstracts (no more than 3 pages for the whole content of the paper).' },
          ],
        },
        {
          kind: 'p',
          text: {
            pt: 'Os artigos devem ser submetidos no formato Adobe Portable Document Format (PDF) e seguir estritamente o modelo da conferência. É importante salientar que, embora esse modelo seja uma adaptação do formato adotado pela ACM para conferências, o modelo original (ACM_SigConf) não deve ser utilizado. Esse mesmo modelo adaptado será utilizado em todos os simpósios e workshops integrantes do CBSoft 2027.',
            en: 'Papers must be submitted in Adobe Portable Document Format (PDF) and strictly follow the conference template. Note that, although this template is an adaptation of the ACM conference format, the original template (ACM_SigConf) must not be used. The same adapted template will be used by every symposium and workshop of CBSoft 2027.',
          },
        },
        { kind: 'code', code: '\\documentclass[sigconf]{acmart}' },
        {
          kind: 'p',
          text: {
            pt: 'Deverá ainda ser utilizado o seguinte comando contendo as informações do evento (as datas serão divulgadas em breve):',
            en: 'The following command with the event information must also be used (the dates will be announced soon):',
          },
        },
        {
          kind: 'code',
          code: '\\acmConference[SAST 2027]{12th Brazilian Symposium on Systematic and Automated Software Testing}{TBD}{Belo Horizonte, MG, Brazil}',
        },
        {
          kind: 'p',
          text: {
            pt: 'Orienta-se que todos os autores atentem ao checklist disponibilizado no final do arquivo samples/cbsoft-acm-like.tex para se certificarem de que seus artigos estejam em conformidade com o modelo e as instruções fornecidas.',
            en: 'All authors are advised to go through the checklist at the end of samples/cbsoft-acm-like.tex to make sure their papers comply with the template and the instructions given.',
          },
        },
        {
          kind: 'p',
          text: {
            pt: 'Artigos regulares e resumos da indústria podem ser escritos em português ou inglês. As submissões devem ser realizadas em Adobe Portable Document Format (PDF) utilizando o sistema JEMS da SBC (link a ser divulgado).',
            en: 'Regular papers and industry abstracts may be written in Portuguese or English. Submissions must be made in Adobe Portable Document Format (PDF) through SBC\'s JEMS system (link to be announced).',
          },
        },
        {
          kind: 'p',
          text: {
            pt: 'Os artigos regulares seguirão um processo de revisão anônimo (double-anonymous review). As submissões iniciais dos artigos não devem possuir nenhum tipo de identificação dos autores. Todas as informações sobre os autores e suas instituições devem ser removidas do artigo, incluindo referências aos próprios autores e eventuais links que remetam aos autores ou suas instituições. Em relação às referências, se necessário, sugerimos escrever "[Anonymous 2026]" no texto e "[Anonymous 2026] Information omitted for double-anonymous review" na lista de referências. Em relação aos links, sugerimos substituir possíveis identificações nos mesmos por "Link omitted for double-anonymous review". Solicitamos a rígida observância dos autores para estas questões relativas ao double-anonymous review. Após a aceitação do artigo, todas as informações ocultadas devem ser incluídas na versão final do mesmo.',
            en: 'Regular papers will go through a double-anonymous review process. Initial submissions must not identify the authors in any way. All information about the authors and their institutions must be removed from the paper, including self-references and any links that point to the authors or their institutions. For references, if needed, we suggest writing "[Anonymous 2026]" in the text and "[Anonymous 2026] Information omitted for double-anonymous review" in the reference list. For links, we suggest replacing any identifying parts with "Link omitted for double-anonymous review". Authors are asked to strictly follow these double-anonymous review rules. Once the paper is accepted, all hidden information must be added back in its final version.',
          },
        },
        {
          kind: 'p',
          text: {
            pt: 'Os artigos regulares serão avaliados de acordo com sua adequação ao escopo do SAST, relevância, solidez técnica e originalidade. Artigos regulares devem indicar sua relação com trabalhos anteriores, principalmente trabalhos publicados anteriormente pelos próprios autores. Artigos sobre estudos empíricos devem descrever os métodos utilizados e interpretar qualitativa e quantitativamente seus resultados. Pelo menos três membros do Comitê de Programa revisarão todas as submissões.',
            en: 'Regular papers will be evaluated on their fit to the scope of SAST, relevance, technical soundness and originality. Regular papers must state how they relate to previous work, especially work previously published by the authors themselves. Papers on empirical studies must describe the methods used and interpret their results both qualitatively and quantitatively. At least three Program Committee members will review every submission.',
          },
        },
        {
          kind: 'p',
          text: {
            pt: 'Todos os resumos da indústria passarão por um processo de revisão anônima por pares: faremos um esforço para incluir pelo menos um especialista da indústria entre os revisores. Preferencialmente o autor que apresentará o artigo não terá afiliações acadêmicas. Incentivamos contribuições com foco em inovação industrial ou lições aprendidas que possam inspirar trabalhos acadêmicos futuros. Também aceitamos submissões que ainda estejam em estado inicial de desenvolvimento e que possam levar a novas perspectivas e novas ideias. O objetivo desta trilha é promover a troca de conhecimento e experiência entre acadêmicos e profissionais.',
            en: 'All industry abstracts will go through an anonymous peer review process, and we will strive to include at least one industry expert among the reviewers. Preferably, the author presenting the paper should have no academic affiliation. We encourage contributions focused on industrial innovation or lessons learned that may inspire future academic work. We also accept early-stage submissions that may lead to new perspectives and ideas. The goal of this track is to foster the exchange of knowledge and experience between academics and practitioners.',
          },
        },
        {
          kind: 'p',
          text: {
            pt: 'A publicação dos artigos aceitos no simpósio está vinculada à apresentação do artigo no SAST 2027 e à inscrição de pelo menos um de seus autores no CBSoft 2027.',
            en: 'Publication of accepted papers requires the paper to be presented at SAST 2027 and at least one of its authors to register for CBSoft 2027.',
          },
        },
      ],
    },
    ethicsSection,
    {
      title: {
        pt: 'Sobre o uso de IA (Inteligência Artificial) ou tecnologias assistidas por IA em artigos científicos',
        en: 'On the use of AI (Artificial Intelligence) or AI-assisted technologies in scientific papers',
      },
      blocks: [
        {
          kind: 'p',
          text: {
            pt: 'Ao submeter trabalhos para o SAST 2027, os autores reconhecem que estão em conformidade com a política de uso de IA generativa, baseada em políticas existentes propostas pelo IEEE, ACM e Springer.',
            en: 'By submitting papers to SAST 2027, authors acknowledge that they comply with the generative AI policy, based on existing policies from IEEE, ACM and Springer.',
          },
        },
        { kind: 'p', text: { pt: 'É proibido:', en: 'It is forbidden to:' } },
        {
          kind: 'list',
          items: [
            { pt: 'Listar ferramentas e tecnologias de IA generativa, como ChatGPT, como autores dos trabalhos', en: 'List generative AI tools and technologies, such as ChatGPT, as authors of the papers' },
            { pt: 'Utilizar textos ou seções inteiramente produzidos por ferramentas de IA generativa', en: 'Use text or sections produced entirely by generative AI tools' },
          ],
        },
        { kind: 'p', text: { pt: 'É permitido (com divulgação explícita nos agradecimentos):', en: 'It is allowed (with explicit disclosure in the acknowledgements) to:' } },
        {
          kind: 'list',
          items: [
            {
              pt: 'Utilizar ferramentas de IA generativa para criar partes do conteúdo, com divulgação nos agradecimentos do artigo indicando o que foi gerado e qual ferramenta foi utilizada. É importante verificar os termos de uso da ferramenta, sendo essa responsabilidade dos autores. Por exemplo, nos agradecimentos: ChatGPT foi utilizado para gerar o primeiro parágrafo da Seção 3 e para gerar a Tabela 3.2.',
              en: 'Use generative AI tools to create parts of the content, disclosing in the acknowledgements what was generated and which tool was used. Checking the tool\'s terms of use is the authors\' responsibility. For example, in the acknowledgements: ChatGPT was used to generate the first paragraph of Section 3 and to generate Table 3.2.',
            },
          ],
        },
        { kind: 'p', text: { pt: 'É permitido (sem necessidade de mencionar):', en: 'It is allowed (without needing to mention it) to:' } },
        {
          kind: 'list',
          items: [
            { pt: 'Usar tecnologias de IA ou assistidas por IA para melhorar a qualidade de imagens em termos de contraste e clareza.', en: 'Use AI or AI-assisted technologies to improve the contrast and clarity of images.' },
            { pt: 'Utilizar ferramentas de IA generativa para editar e melhorar a qualidade de textos já existentes (similar a um assistente como o Grammarly para melhorar ortografia, gramática, pontuação, clareza e envolvimento).', en: 'Use generative AI tools to edit and improve existing text (like an assistant such as Grammarly, to improve spelling, grammar, punctuation, clarity and engagement).' },
          ],
        },
      ],
    },
  ],
  milestones: [
    { label: { pt: 'Registro de Artigos Regulares (Submissão do Resumo)', en: 'Regular Paper Registration (Abstract Submission)' }, date: null, hard: true },
    { label: { pt: 'Registro de Artigos da Indústria (Submissão do Resumo)', en: 'Industry Paper Registration (Abstract Submission)' }, date: null, hard: true },
    { label: { pt: 'Submissão dos Artigos Regulares Completos', en: 'Full Regular Paper Submission' }, date: null, hard: true },
    { label: { pt: 'Submissão dos Artigos Completos da Indústria', en: 'Full Industry Paper Submission' }, date: null, hard: true },
    { label: { pt: 'Notificação de Aceitação', en: 'Notification of Acceptance' }, date: null },
    { label: { pt: 'Submissão da Versão Final', en: 'Camera-ready Submission' }, date: null },
  ],
  chairs: [PLACEHOLDER_MEMBER, PLACEHOLDER_MEMBER],
  committees: [{ members: PLACEHOLDER_COMMITTEE }],
};

/**
 * SBCARS 2027. Text adapted from the SBCARS 2026 call (20th edition, São
 * Paulo): edition, year and city updated; dates, the JEMS link, the chairs
 * and the program committee are pending.
 */
const SBCARS_CALL: SymposiumCall = {
  intro: [
    {
      pt: 'Em 2027, o SBCARS celebra sua 21ª edição, reafirmando seu papel como o principal evento brasileiro dedicado à pesquisa, inovação e prática em componentes de software, arquiteturas e reutilização. Convidamos pesquisadores, profissionais e representantes da indústria a submeter suas pesquisas originais ao 21º Simpósio Brasileiro de Componentes, Arquiteturas e Reutilização de Software! Nesta edição, o SBCARS será realizado em Belo Horizonte.',
      en: 'In 2027, SBCARS celebrates its 21st edition, reaffirming its role as the leading Brazilian event dedicated to research, innovation and practice in software components, architectures and reuse. We invite researchers, practitioners and industry representatives to submit their original research to the 21st Brazilian Symposium on Software Components, Architectures, and Reuse! This edition of SBCARS will take place in Belo Horizonte.',
    },
  ],
  sections: [
    {
      title: { pt: 'Escopo', en: 'Scope' },
      blocks: [
        {
          kind: 'p',
          text: {
            pt: 'O SBCARS é um espaço dedicado à discussão dos desafios atuais e das oportunidades emergentes no projeto, desenvolvimento, evolução e reutilização de software em larga escala. À medida que os sistemas crescem em complexidade, o simpósio oferece um ambiente único para explorar avanços fundamentais e experiências práticas que moldam o futuro da arquitetura e da reutilização de software.',
            en: 'SBCARS is a forum for discussing current challenges and emerging opportunities in the design, development, evolution and reuse of large-scale software. As systems grow in complexity, the symposium offers a unique setting to explore fundamental advances and practical experiences that shape the future of software architecture and reuse.',
          },
        },
        {
          kind: 'p',
          text: {
            pt: 'Aceitamos submissões em uma ampla variedade de temas, incluindo, mas não se limitando a:',
            en: 'We welcome submissions on a wide range of topics, including but not limited to:',
          },
        },
        {
          kind: 'list',
          items: [
            { pt: 'Arquitetura e Design Ágil de Software', en: 'Agile Software Architecture and Design' },
            { pt: 'Design, Arquitetura e Reutilização de Software Assistidos por IA', en: 'AI-Assisted Software Design, Architecture and Reuse' },
            { pt: 'Desenvolvimento e Evolução de APIs', en: 'API Development and Evolution' },
            { pt: 'Desenvolvimento Baseado em Componentes', en: 'Component-Based Development' },
            { pt: 'Padrões de Projeto (Design Patterns)', en: 'Design Patterns' },
            { pt: 'Análise e Engenharia de Domínio', en: 'Domain Analysis and Engineering' },
            { pt: 'Programação Generativa e Linguagens Específicas de Domínio', en: 'Generative Programming and Domain-Specific Languages' },
            { pt: 'Engenharia Dirigida por Modelos (MDE)', en: 'Model-Driven Engineering (MDE)' },
            { pt: 'Reparação de Programas', en: 'Program Repair' },
            { pt: 'Transformação de Programas e Refatoração', en: 'Program Transformation and Refactoring' },
            { pt: 'Reuso e Variabilidade em Software Livre', en: 'Reuse and Variability in Open Source Software' },
            { pt: 'Orientação a Serviços e Microsserviços', en: 'Service Orientation and Microservices' },
            { pt: 'Aspectos Sociotécnicos no Design, Arquitetura e Reutilização de Software', en: 'Socio-Technical Aspects of Software Design, Architecture and Reuse' },
            { pt: 'Análise, Compreensão e Reconstrução de Software', en: 'Software Analysis, Comprehension and Reconstruction' },
            { pt: 'Arquitetura de Software', en: 'Software Architecture' },
            { pt: 'Linhas de Produto de Software', en: 'Software Product Lines' },
            { pt: 'Manutenção, Reengenharia e Evolução de Software', en: 'Software Maintenance, Reengineering and Evolution' },
            { pt: 'Métricas de Software para Design, Arquitetura e Reutilização', en: 'Software Metrics for Design, Architecture and Reuse' },
            { pt: 'Modularidade de Software', en: 'Software Modularity' },
            { pt: 'Mineração de Repositórios de Software', en: 'Mining Software Repositories' },
            { pt: 'Reutilização de Software', en: 'Software Reuse' },
            { pt: 'Sustentabilidade de Software', en: 'Software Sustainability' },
            { pt: 'Visualização de Software', en: 'Software Visualisation' },
            { pt: 'Gerenciamento de Variabilidade', en: 'Variability Management' },
          ],
        },
      ],
    },
    {
      title: { pt: 'Tipos de Submissão', en: 'Submission Types' },
      blocks: [
        { kind: 'p', text: { pt: 'O SBCARS 2027 aceita os seguintes tipos de artigos:', en: 'SBCARS 2027 accepts the following kinds of papers:' } },
        {
          kind: 'p',
          text: {
            pt: '**Artigos de Pesquisa Técnica:** Contribuições originais, de alta qualidade e inéditas, apresentando novas ideias, métodos, ferramentas, estudos empíricos, revisões sistemáticas e avanços teóricos relacionados a componentes, arquiteturas e reutilização de software. Limite de páginas: até 10 páginas (+2 para referências).',
            en: '**Technical Research Papers:** Original, high-quality, unpublished contributions presenting new ideas, methods, tools, empirical studies, systematic reviews and theoretical advances related to software components, architectures and reuse. Page limit: up to 10 pages (+2 for references).',
          },
        },
        {
          kind: 'p',
          text: {
            pt: '**Artigos de Dados:** Submissões focadas em datasets, benchmarks, repositórios organizados e outros recursos de dados relevantes para a comunidade SBCARS. O artigo deve descrever o contexto, processo de criação, estrutura, limitações e potencial de reutilização dos dados. Limite de páginas: até 4 páginas (+2 para referências). Os autores de Artigos de Dados aceitos devem tornar seus artefatos publicamente acessíveis. Repositórios recomendados: Zenodo e Figshare. GitHub não é considerado um repositório de dados adequado.',
            en: '**Data Papers:** Submissions focused on datasets, benchmarks, curated repositories and other data resources relevant to the SBCARS community. The paper must describe the context, creation process, structure, limitations and reuse potential of the data. Page limit: up to 4 pages (+2 for references). Authors of accepted Data Papers must make their artefacts publicly available. Recommended repositories: Zenodo and Figshare. GitHub is not considered a suitable data repository.',
          },
        },
      ],
    },
    {
      title: { pt: 'Processo de Revisão', en: 'Review Process' },
      blocks: [
        {
          kind: 'p',
          text: {
            pt: 'Os artigos que estiverem em conformidade com os critérios de submissão serão revisados por pelo menos três membros do Comitê de Programa, de acordo com os seguintes critérios:',
            en: 'Papers that comply with the submission criteria will be reviewed by at least three Program Committee members according to the following criteria:',
          },
        },
        {
          kind: 'list',
          items: [
            { pt: '**Originalidade:** Novidade e inovação do artigo em relação ao estado da arte, incluindo abordagens, soluções, formulações de problemas, metodologias, teorias ou avaliações propostas.', en: '**Originality:** Novelty and innovation of the paper with respect to the state of the art, including the proposed approaches, solutions, problem formulations, methodologies, theories or evaluations.' },
            { pt: '**Relevância:** Importância das contribuições do artigo para o campo da Engenharia de Software.', en: '**Relevance:** Importance of the paper\'s contributions to the field of Software Engineering.' },
            { pt: '**Rigor:** Solidez, clareza e profundidade de uma contribuição técnica ou teórica, assim como o nível de detalhamento e completude do método e da avaliação.', en: '**Rigour:** Soundness, clarity and depth of a technical or theoretical contribution, as well as the level of detail and completeness of the method and evaluation.' },
            { pt: '**Verificabilidade e Transparência:** Grau em que o artigo disponibiliza informações suficientes para avaliar e reproduzir os métodos, dados, análises e resultados apresentados, incluindo a adequação e completude de artefatos de pesquisa, quando fornecidos.', en: '**Verifiability and Transparency:** The extent to which the paper provides enough information to assess and reproduce its methods, data, analyses and results, including the adequacy and completeness of research artefacts, when provided.' },
            { pt: '**Apresentação:** Qualidade da escrita do artigo, incluindo descrições claras, adequação gramatical, ausência de ambiguidades, legibilidade de figuras e tabelas e conformidade com as instruções de formatação.', en: '**Presentation:** Quality of the writing, including clear descriptions, correct grammar, absence of ambiguity, legibility of figures and tables, and compliance with the formatting instructions.' },
          ],
        },
        {
          kind: 'p',
          text: {
            pt: 'Incentivamos os autores a disponibilizar seus artefatos de forma aberta, embora isso seja obrigatório apenas para artigos de dados.',
            en: 'We encourage authors to make their artefacts openly available, although this is only mandatory for data papers.',
          },
        },
      ],
    },
    {
      title: {
        pt: 'Sobre o uso de IA (Inteligência Artificial) ou Tecnologias Assistidas por IA em Trabalhos de Pesquisa',
        en: 'On the use of AI (Artificial Intelligence) or AI-Assisted Technologies in Research Papers',
      },
      blocks: [
        {
          kind: 'p',
          text: {
            pt: 'Ao submeterem trabalhos ao SBCARS 2027, os autores reconhecem que estão em conformidade com a política de uso de IA generativa, baseada nas políticas existentes propostas pela IEEE, ACM e Springer.',
            en: 'By submitting papers to SBCARS 2027, authors acknowledge that they comply with the generative AI policy, based on existing policies from IEEE, ACM and Springer.',
          },
        },
        { kind: 'p', text: { pt: 'É proibido:', en: 'It is forbidden to:' } },
        {
          kind: 'list',
          items: [
            { pt: 'Listar ferramentas e tecnologias de IA generativa, como o ChatGPT, como autores de trabalhos.', en: 'List generative AI tools and technologies, such as ChatGPT, as authors of papers.' },
            { pt: 'Utilizar artigos ou seções produzidos integralmente por ferramentas de IA generativa.', en: 'Use papers or sections produced entirely by generative AI tools.' },
          ],
        },
        { kind: 'p', text: { pt: 'É permitido (com menção explícita nos agradecimentos):', en: 'It is allowed (with explicit mention in the acknowledgements) to:' } },
        {
          kind: 'list',
          items: [
            {
              pt: 'Utilizar ferramentas de IA generativa para criar partes do conteúdo, com menção nos agradecimentos do artigo indicando o que foi gerado e qual ferramenta foi utilizada. É importante verificar os termos de uso da ferramenta, ficando tal verificação sob responsabilidade dos autores do artigo. Por exemplo, nos agradecimentos: "ChatGPT foi utilizado para gerar o primeiro parágrafo da Seção 3 e para gerar a Tabela 3.2".',
              en: 'Use generative AI tools to create parts of the content, mentioning in the acknowledgements what was generated and which tool was used. Checking the tool\'s terms of use is the authors\' responsibility. For example, in the acknowledgements: "ChatGPT was used to generate the first paragraph of Section 3 and to generate Table 3.2".',
            },
          ],
        },
        { kind: 'p', text: { pt: 'É permitido (sem necessidade de menção):', en: 'It is allowed (without needing to mention it) to:' } },
        {
          kind: 'list',
          items: [
            { pt: 'Usar IA ou tecnologias assistidas por IA para melhorar a qualidade das imagens em relação ao contraste e clareza; e', en: 'Use AI or AI-assisted technologies to improve the contrast and clarity of images; and' },
            { pt: 'Utilizar ferramentas de IA generativa para editar e melhorar a qualidade do seu texto existente (de forma semelhante a um assistente como o Grammarly para melhorar a ortografia, gramática, pontuação, clareza, engajamento).', en: 'Use generative AI tools to edit and improve your existing text (like an assistant such as Grammarly, to improve spelling, grammar, punctuation, clarity and engagement).' },
          ],
        },
      ],
    },
    {
      title: { pt: 'Anonimização', en: 'Anonymisation' },
      blocks: [
        {
          kind: 'p',
          text: {
            pt: 'O SBCARS 2027 adota um processo de revisão duplo-anônimo ("double-anonymous"). Os artigos submetidos devem ocultar os nomes e as afiliações dos autores. Além disso, as seguintes regras devem ser seguidas:',
            en: 'SBCARS 2027 adopts a double-anonymous review process. Submitted papers must hide the authors\' names and affiliations. In addition, the following rules must be followed:',
          },
        },
        {
          kind: 'list',
          items: [
            {
              pt: 'As citações a trabalhos relacionados dos próprios autores devem ser escritas em terceira pessoa. Por exemplo, deve-se escrever "o trabalho anterior de Silva et al." em oposição a "em nosso trabalho anterior". Deve-se também evitar a ocorrência de termos que possam identificar os autores, por exemplo, "nós", "nosso", "financiamento", "Universidade", "github", etc.;',
              en: 'Citations of the authors\' own related work must be written in the third person. For example, write "the previous work by Silva et al." rather than "in our previous work". Terms that could identify the authors must also be avoided, e.g. "we", "our", "funding", "University", "github", etc.;',
            },
            {
              pt: 'O artigo submetido não deve mencionar artefatos em repositórios ou websites que permitam a identificação dos autores. A disponibilização de artefatos da pesquisa deve ser feita de forma anônima. Para anonimizar repositórios hospedados na plataforma GitHub, sugere-se o uso do serviço [Anonymous GitHub](https://anonymous.4open.science/);',
              en: 'The submitted paper must not mention artefacts in repositories or websites that allow the authors to be identified. Research artefacts must be shared anonymously. To anonymise repositories hosted on GitHub, we suggest the [Anonymous GitHub](https://anonymous.4open.science/) service;',
            },
            {
              pt: 'Se o artigo submetido apresentar uma evolução de um trabalho anterior, pode-se anonimizar a referência a esse trabalho. Por exemplo, "baseado no trabalho de Silva et al." pode ser substituído por "baseado em nosso trabalho anterior [Ref]" e a referência pode ser apresentada como "[Ref] referência omitida devido à revisão duplo anônimo" na seção de referências bibliográficas;',
              en: 'If the submitted paper extends previous work, the reference to that work may be anonymised. For example, "based on the work of Silva et al." may be replaced by "based on our previous work [Ref]", and the reference may be listed as "[Ref] reference omitted for double-anonymous review" in the bibliography;',
            },
            {
              pt: 'Os revisores não serão encorajados a procurar referências que identifiquem os autores em outras fontes. Buscas em bibliotecas digitais ou em artefatos existentes não invalidam as regras de duplo anônimo.',
              en: 'Reviewers will not be encouraged to look for references that identify the authors in other sources. Searches in digital libraries or existing artefacts do not invalidate the double-anonymous rules.',
            },
            {
              pt: 'Em caso de aceitação do artigo, as informações omitidas na submissão devem ser incluídas na versão final.',
              en: 'If the paper is accepted, the information omitted from the submission must be included in the final version.',
            },
          ],
        },
        {
          kind: 'p',
          text: {
            pt: 'Dúvidas sobre a preparação de artigos segundo as regras de anonimização do SBCARS podem ser enviadas aos Coordenadores do Comitê de Programa.',
            en: 'Questions about preparing papers under the SBCARS anonymisation rules can be sent to the Program Committee Chairs.',
          },
        },
      ],
    },
    {
      title: { pt: 'Desclassificação de Artigos', en: 'Paper Disqualification' },
      blocks: [
        {
          kind: 'p',
          text: {
            pt: 'Artigos fora do escopo do SBCARS 2027 ou que não estiverem em conformidade com o formato exigido e com as regras de anonimização serão desclassificados e rejeitados, sem passar pelo processo de revisão.',
            en: 'Papers outside the scope of SBCARS 2027, or that do not comply with the required format and anonymisation rules, will be disqualified and rejected without review.',
          },
        },
        {
          kind: 'p',
          text: {
            pt: 'Se uma submissão simultânea ou publicação prévia em outro fórum (evento ou periódico) de artigo submetido ao SBCARS for identificada e reportada a qualquer tempo, o artigo será rejeitado e os autores poderão ficar impedidos de submeter artigos nas próximas edições do SBCARS. Além disso, os organizadores do outro fórum serão comunicados sobre a ocorrência.',
            en: 'If a simultaneous submission or prior publication in another venue (conference or journal) of a paper submitted to SBCARS is identified and reported at any time, the paper will be rejected and the authors may be barred from submitting to the next editions of SBCARS. The organisers of the other venue will also be notified.',
          },
        },
        {
          kind: 'p',
          text: {
            pt: 'Caso sejam observadas evidências de uso de ferramentas de IA generativa na submissão que não estejam em conformidade com as recomendações para o uso de IA generativa especificadas nesta chamada, o artigo será rejeitado sem revisão e os autores poderão ficar impedidos de submeter artigos nas próximas edições do SBCARS.',
            en: 'If there is evidence that generative AI tools were used in the submission in a way that does not comply with the generative AI recommendations in this call, the paper will be rejected without review and the authors may be barred from submitting to the next editions of SBCARS.',
          },
        },
      ],
    },
    {
      title: { pt: 'Avaliação de Artefatos', en: 'Artefact Evaluation' },
      blocks: [
        {
          kind: 'p',
          text: {
            pt: 'Autores de artigos aceitos (técnicos ou de dados) serão convidados a submeter seus artefatos de pesquisa para avaliação opcional ao festival de artefatos. Os artefatos serão avaliados quanto à disponibilidade, completude, documentação e reprodutibilidade.',
            en: 'Authors of accepted papers (technical or data) will be invited to submit their research artefacts for optional evaluation at the artefact festival. Artefacts will be assessed for availability, completeness, documentation and reproducibility.',
          },
        },
      ],
    },
    {
      title: { pt: 'Instruções de Submissão', en: 'Submission Instructions' },
      blocks: [
        {
          kind: 'list',
          items: [
            { pt: 'Todas as submissões devem estar no formato Adobe Portable Document Format (PDF).', en: 'All submissions must be in Adobe Portable Document Format (PDF).' },
            {
              pt: 'Os artigos podem ser escritos em português ou inglês e devem seguir estritamente o modelo da conferência. É importante salientar que, embora esse modelo seja uma adaptação do formato adotado pela ACM para conferências, o modelo original (ACM_SigConf) não deve ser utilizado. Esse mesmo modelo adaptado será utilizado em todos os simpósios e workshops integrantes do CBSoft 2027.',
              en: 'Papers may be written in Portuguese or English and must strictly follow the conference template. Note that, although this template is an adaptation of the ACM conference format, the original template (ACM_SigConf) must not be used. The same adapted template will be used by every symposium and workshop of CBSoft 2027.',
            },
            {
              pt: 'Orienta-se que todos os autores atentem ao checklist disponibilizado no final do arquivo samples/cbsoft-acm-like.tex para se certificarem de que seus artigos estejam em conformidade com o modelo e as instruções fornecidas.',
              en: 'All authors are advised to go through the checklist at the end of samples/cbsoft-acm-like.tex to make sure their papers comply with the template and the instructions given.',
            },
            { pt: 'A submissão deve ser realizada via JEMS3 (link a ser divulgado).', en: 'Submissions must be made through JEMS3 (link to be announced).' },
          ],
        },
        {
          kind: 'p',
          text: {
            pt: 'Os artigos aceitos serão publicados nos anais do SBCARS 2027. Pelo menos um autor deve se inscrever no evento e apresentar o trabalho.',
            en: 'Accepted papers will be published in the SBCARS 2027 proceedings. At least one author must register for the event and present the paper.',
          },
        },
        {
          kind: 'p',
          text: {
            pt: 'Aguardamos suas valiosas contribuições e esperamos recebê-lo(a) em Belo Horizonte para o SBCARS 2027!',
            en: 'We look forward to your valuable contributions and to welcoming you to Belo Horizonte for SBCARS 2027!',
          },
        },
      ],
    },
    ethicsSection,
  ],
  milestones: [
    { label: { pt: 'Prazo para registro de resumos', en: 'Abstract registration deadline' }, date: null },
    { label: { pt: 'Prazo para submissão de artigos completos', en: 'Full paper submission deadline' }, date: null },
    { label: { pt: 'Notificação de aceitação', en: 'Notification of acceptance' }, date: null },
    { label: { pt: 'Envio da versão final (camera-ready)', en: 'Camera-ready submission' }, date: null },
    { label: { pt: 'Datas do simpósio', en: 'Symposium dates' }, date: null },
  ],
  chairs: [PLACEHOLDER_MEMBER, PLACEHOLDER_MEMBER],
  committees: [{ members: PLACEHOLDER_COMMITTEE }],
};

/**
 * SBLP 2027. Text adapted from the SBLP 2026 call (30th edition): edition
 * and year updated; dates, the chairs, the program committee and the contact
 * e-mail are pending.
 */
const SBLP_CALL: SymposiumCall = {
  intro: [
    {
      pt: 'O SBLP 2027 é a 31ª edição do Simpósio Brasileiro de Linguagens de Programação. Organizado pela Sociedade Brasileira de Computação (SBC), o SBLP é um fórum consolidado para pesquisadores, estudantes e profissionais interessados em todos os aspectos de linguagens de programação, abrangendo desde fundamentos teóricos até aplicações práticas. O simpósio reúne as comunidades de linguagens de programação para apresentar e discutir avanços em projeto de linguagens, semântica, análise, técnicas de implementação e ferramentas que apoiam o desenvolvimento de sistemas de software confiáveis, seguros e eficientes, fomentando a colaboração, a troca de ideias e a disseminação de resultados de pesquisa de alta qualidade.',
      en: 'SBLP 2027 is the 31st edition of the Brazilian Symposium on Programming Languages. Organised by the Brazilian Computer Society (SBC), SBLP is an established forum for researchers, students and practitioners interested in every aspect of programming languages, from theoretical foundations to practical applications. The symposium brings together the programming languages communities to present and discuss advances in language design, semantics, analysis, implementation techniques and tools that support the development of reliable, secure and efficient software systems, fostering collaboration, the exchange of ideas and the dissemination of high-quality research.',
    },
  ],
  sections: [
    {
      title: { pt: 'Tópicos', en: 'Topics' },
      blocks: [
        {
          kind: 'list',
          items: [
            { pt: 'Paradigmas e Estilos de Programação', en: 'Programming Paradigms and Styles' },
            { pt: 'Linguagens de Script e Linguagens de Domínio Específico', en: 'Scripting Languages and Domain-Specific Languages' },
            { pt: 'Programação Concorrente, Paralela, Distribuída e Quântica', en: 'Concurrent, Parallel, Distributed and Quantum Programming' },
            { pt: 'Geração e Transformação de Programas', en: 'Program Generation and Transformation' },
            { pt: 'Semântica Formal e Fundamentos Teóricos', en: 'Formal Semantics and Theoretical Foundations' },
            { pt: 'Análise e Verificação de Programas', en: 'Program Analysis and Verification' },
            { pt: 'Projeto, Implementação e Ambientes de Linguagens', en: 'Language Design, Implementation and Environments' },
            { pt: 'Linguagens para Blockchain e Contratos Inteligentes', en: 'Languages for Blockchain and Smart Contracts' },
            { pt: 'Segurança Baseada em Linguagens e Mecanismos Criptográficos', en: 'Language-Based Security and Cryptographic Mechanisms' },
            { pt: 'Tópicos Adicionais em Linguagens de Programação', en: 'Additional Topics in Programming Languages' },
          ],
        },
      ],
    },
    {
      title: { pt: 'Trilhas', en: 'Tracks' },
      blocks: [
        {
          kind: 'p',
          text: {
            pt: 'O SBLP 2027 recebe submissões em duas trilhas complementares, que contemplam diferentes estágios da carreira de pesquisa, mantendo os mesmos padrões científicos.',
            en: 'SBLP 2027 welcomes submissions in two complementary tracks, covering different stages of a research career while keeping the same scientific standards.',
          },
        },
        {
          kind: 'p',
          text: {
            pt: '**Trilha Principal.** Destinada a submissões de estudantes de pós-graduação, pesquisadores e profissionais. Esta trilha acolhe contribuições originais de pesquisa, incluindo novos resultados teóricos, projetos inovadores de linguagens, estudos empíricos, relatos de experiência e estudos de caso que demonstrem o impacto de tecnologias de linguagens de programação na prática.',
            en: '**Main Track.** For submissions from graduate students, researchers and practitioners. This track welcomes original research contributions, including new theoretical results, innovative language designs, empirical studies, experience reports and case studies showing the impact of programming language technologies in practice.',
          },
        },
        {
          kind: 'p',
          text: {
            pt: '**Trilha de Graduação.** Destinada a estudantes de graduação que estão iniciando sua carreira de pesquisa. Esta trilha foca em estudos desenvolvidos em atividades de iniciação científica, como projetos conduzidos em grupos de pesquisa, trabalhos de conclusão de curso ou iniciativas acadêmicas similares. As submissões são avaliadas com atenção especial ao potencial das ideias e à clareza da apresentação, levando em conta o nível de experiência dos autores.',
            en: '**Undergraduate Track.** For undergraduate students starting their research career. This track focuses on studies carried out in undergraduate research activities, such as projects in research groups, final-year projects or similar academic initiatives. Submissions are evaluated with special attention to the potential of the ideas and the clarity of the presentation, taking the authors\' level of experience into account.',
          },
        },
        {
          kind: 'p',
          text: {
            pt: 'Ambas as trilhas aceitam submissões como artigos completos ou artigos curtos:',
            en: 'Both tracks accept submissions as full papers or short papers:',
          },
        },
        {
          kind: 'list',
          items: [
            {
              pt: '**Artigos completos:** até 8 páginas (excluindo referências). Artigos completos devem apresentar pesquisas maduras e concluídas, incluindo uma formulação clara do problema, metodologia sólida, avaliação experimental ou teórica abrangente e conclusões bem fundamentadas.',
              en: '**Full papers:** up to 8 pages (excluding references). Full papers must present mature, completed research, including a clear problem statement, sound methodology, comprehensive experimental or theoretical evaluation and well-founded conclusions.',
            },
            {
              pt: '**Artigos curtos:** até 4 páginas (excluindo referências). Artigos curtos podem relatar ideias em estágio inicial, resultados preliminares, resultados negativos ou inconclusivos com lições relevantes, ou resultados parciais de projetos em andamento, dissertações ou teses.',
              en: '**Short papers:** up to 4 pages (excluding references). Short papers may report early-stage ideas, preliminary results, negative or inconclusive results with relevant lessons, or partial results of ongoing projects, master\'s dissertations or PhD theses.',
            },
          ],
        },
        {
          kind: 'p',
          text: {
            pt: 'Autores de ambas as trilhas, Principal e de Graduação, podem escolher o formato mais adequado (completo ou curto) de acordo com a maturidade e o escopo de seu trabalho. Todas as submissões devem estar em formato PDF, de acordo com o modelo da conferência, e ser submetidas via JEMS (link a ser divulgado).',
            en: 'Authors in both the Main and the Undergraduate tracks may choose the most suitable format (full or short) according to the maturity and scope of their work. All submissions must be in PDF, follow the conference template, and be submitted through JEMS (link to be announced).',
          },
        },
      ],
    },
    {
      title: { pt: 'Processo de Revisão e Política de Submissão', en: 'Review Process and Submission Policy' },
      blocks: [
        {
          kind: 'p',
          text: {
            pt: 'Os artigos podem ser escritos em português ou em inglês, sendo especialmente encorajadas as submissões em inglês.',
            en: 'Papers may be written in Portuguese or English; submissions in English are especially encouraged.',
          },
        },
        {
          kind: 'p',
          text: {
            pt: 'O SBLP 2027 adotará um processo leve de revisão por pares duplo-cega. Isso significa que os revisores não conhecerão a identidade dos autores, e os autores não serão informados sobre a identidade dos revisores individualmente. O objetivo é reduzir vieses relacionados à afiliação, senioridade ou reputação prévia dos autores e focar a avaliação na qualidade e originalidade do trabalho em si.',
            en: 'SBLP 2027 will adopt a lightweight double-blind peer review process. This means reviewers will not know the authors\' identities, and authors will not be told the identity of individual reviewers. The goal is to reduce bias related to the authors\' affiliation, seniority or prior reputation and to focus the evaluation on the quality and originality of the work itself.',
          },
        },
        {
          kind: 'p',
          text: {
            pt: 'Os manuscritos devem, portanto, ser submetidos de forma anônima: nomes dos autores, afiliações, agradecimentos e qualquer outra informação que permita a identificação pessoal devem ser removidos do PDF. Referências a trabalhos anteriores dos próprios autores devem ser escritas em terceira pessoa, como se fossem de autores distintos, e não devem revelar a identidade dos autores. Em caso de dúvida sobre como anonimizar materiais específicos (tais como artefatos suplementares ou repositórios on-line), os autores devem priorizar a preservação do anonimato e podem fornecer links anonimizados ou indicar claramente que o material adicional será disponibilizado após a aceitação.',
            en: 'Manuscripts must therefore be submitted anonymously: authors\' names, affiliations, acknowledgements and any other personally identifying information must be removed from the PDF. References to the authors\' own previous work must be written in the third person, as if by different authors, and must not reveal the authors\' identities. When unsure how to anonymise specific material (such as supplementary artefacts or online repositories), authors should prioritise preserving anonymity and may provide anonymised links or clearly state that the additional material will be made available after acceptance.',
          },
        },
        {
          kind: 'p',
          text: {
            pt: 'Os artigos devem ser originais e não podem estar simultaneamente submetidos a outro periódico ou conferência. Submissões que representem extensões substanciais de trabalhos já publicados devem indicar e justificar claramente as diferenças. Pelo menos um autor de cada artigo aceito deve se inscrever no simpósio e apresentar o trabalho. O não comparecimento à apresentação resultará na remoção do artigo dos anais.',
            en: 'Papers must be original and must not be under simultaneous submission to another journal or conference. Submissions that substantially extend previously published work must clearly state and justify the differences. At least one author of each accepted paper must register for the symposium and present the paper. Failure to present will result in the paper being removed from the proceedings.',
          },
        },
      ],
    },
    ethicsSection,
    {
      title: { pt: 'Política de Uso de IA Generativa para Submissões SBLP 2027', en: 'Generative AI Use Policy for SBLP 2027 Submissions' },
      blocks: [
        {
          kind: 'p',
          text: {
            pt: 'Ao submeter um artigo para o SBLP 2027, os autores confirmam a sua adesão à política de uso de IA generativa, que está em conformidade com as diretrizes estabelecidas por IEEE, ACM e Springer.',
            en: 'By submitting a paper to SBLP 2027, authors confirm their adherence to the generative AI use policy, which follows the guidelines set by IEEE, ACM and Springer.',
          },
        },
        { kind: 'p', text: { pt: '**Usos Proibidos:**', en: '**Prohibited Uses:**' } },
        {
          kind: 'list',
          items: [
            { pt: 'Atribuir autoria a ferramentas de IA generativa (ex: ChatGPT).', en: 'Attributing authorship to generative AI tools (e.g. ChatGPT).' },
            { pt: 'Submeter artigos ou seções que foram inteiramente gerados por ferramentas de IA.', en: 'Submitting papers or sections entirely generated by AI tools.' },
          ],
        },
        { kind: 'p', text: { pt: '**Usos Permitidos (Requerendo Reconhecimento Explícito):**', en: '**Permitted Uses (Requiring Explicit Acknowledgement):**' } },
        {
          kind: 'list',
          items: [
            {
              pt: 'Utilizar ferramentas de IA generativa para criar partes do conteúdo. Tal uso deve ser claramente divulgado na seção de agradecimentos, especificando o conteúdo gerado e a ferramenta empregada. Os autores são responsáveis por garantir a conformidade com os termos de uso da ferramenta.',
              en: 'Using generative AI tools to create parts of the content. Such use must be clearly disclosed in the acknowledgements, specifying the generated content and the tool used. Authors are responsible for complying with the tool\'s terms of use.',
            },
            {
              pt: 'Exemplo de Divulgação: "ChatGPT foi utilizado para gerar o parágrafo introdutório da Seção 3 e a Tabela 3.2."',
              en: 'Example disclosure: "ChatGPT was used to generate the introductory paragraph of Section 3 and Table 3.2."',
            },
          ],
        },
        { kind: 'p', text: { pt: '**Usos Permitidos (Sem Necessidade de Reconhecimento Explícito):**', en: '**Permitted Uses (No Explicit Acknowledgement Needed):**' } },
        {
          kind: 'list',
          items: [
            { pt: 'Melhorar a qualidade de imagens (ex: contraste, clareza) usando IA ou tecnologias assistidas por IA.', en: 'Improving image quality (e.g. contrast, clarity) with AI or AI-assisted technologies.' },
            { pt: 'Empregar ferramentas de IA generativa para refinar e aprimorar a qualidade de textos existentes, de forma similar a corretores gramaticais e de estilo (ex: Grammarly) para ortografia, gramática, pontuação e clareza geral.', en: 'Using generative AI tools to refine and improve existing text, like grammar and style checkers (e.g. Grammarly), for spelling, grammar, punctuation and overall clarity.' },
          ],
        },
      ],
    },
    {
      title: { pt: 'Critérios de Rejeição', en: 'Rejection Criteria' },
      blocks: [
        {
          kind: 'p',
          text: {
            pt: 'Submissões que não se enquadrarem no escopo do SBLP 2027, ou que não atenderem aos requisitos de formatação e anonimização especificados, serão imediatamente rejeitadas sem revisão por pares.',
            en: 'Submissions outside the scope of SBLP 2027, or that do not meet the specified formatting and anonymisation requirements, will be rejected immediately without peer review.',
          },
        },
        {
          kind: 'p',
          text: {
            pt: 'Qualquer artigo identificado como já publicado ou submetido concomitantemente a outro evento ou periódico revisado por pares será rejeitado em qualquer etapa do processo de revisão. Autores envolvidos em tais casos poderão enfrentar sanções, incluindo a proibição de submeter a futuras edições do SBLP, e os organizadores do outro evento serão notificados.',
            en: 'Any paper found to be already published or under simultaneous submission to another peer-reviewed conference or journal will be rejected at any stage of the review process. Authors involved in such cases may face sanctions, including a ban from submitting to future editions of SBLP, and the organisers of the other venue will be notified.',
          },
        },
        {
          kind: 'p',
          text: {
            pt: 'Caso surjam evidências de que ferramentas de IA generativa foram utilizadas na submissão de forma inconsistente com as diretrizes estabelecidas nesta chamada de trabalhos, a submissão será rejeitada sem revisão. Autores encontrados em violação também poderão ser impedidos de submeter a edições subsequentes do SBLP.',
            en: 'If there is evidence that generative AI tools were used in the submission in a way inconsistent with the guidelines in this call for papers, the submission will be rejected without review. Authors found in violation may also be barred from submitting to subsequent editions of SBLP.',
          },
        },
      ],
    },
    {
      title: { pt: 'Publicação, Indexação e Prêmios', en: 'Publication, Indexing and Awards' },
      blocks: [
        {
          kind: 'p',
          text: {
            pt: 'Todos os artigos aceitos serão publicados nos anais do evento, indexados pela SBC-OpenLib (SOL), garantindo ampla visibilidade e acesso de longo prazo às contribuições apresentadas no SBLP 2027.',
            en: 'All accepted papers will be published in the event proceedings, indexed by SBC-OpenLib (SOL), ensuring wide visibility and long-term access to the contributions presented at SBLP 2027.',
          },
        },
        {
          kind: 'p',
          text: {
            pt: 'Uma seleção dos melhores artigos de edições recentes do SBLP tem sido convidada a ser estendida e considerada para publicação em um número especial do Journal of Computer Languages (COLA), publicado pela Elsevier. Para o SBLP 2027, os organizadores pretendem contatar o COLA para um número especial semelhante, convidando autores dos artigos mais bem avaliados e promissores a submeter versões estendidas de seus trabalhos para nova rodada de revisão por pares. Tais extensões tipicamente exigem uma adição significativa de novo material, avaliação mais aprofundada e uma discussão mais ampla dos resultados.',
            en: 'A selection of the best papers from recent SBLP editions has been invited to be extended and considered for publication in a special issue of the Journal of Computer Languages (COLA), published by Elsevier. For SBLP 2027, the organisers intend to approach COLA for a similar special issue, inviting the authors of the best-rated and most promising papers to submit extended versions of their work for a new round of peer review. Such extensions typically require a significant amount of new material, a deeper evaluation and a broader discussion of the results.',
          },
        },
        {
          kind: 'p',
          text: {
            pt: 'Para reconhecer contribuições de destaque, serão concedidos três prêmios de melhor artigo: dois entre as submissões de artigos completos da Trilha Principal e um entre as submissões de artigos completos da Trilha de Graduação. A seleção levará em conta a qualidade científica, a originalidade, a clareza da apresentação e o impacto potencial na comunidade de linguagens de programação. Os artigos premiados serão destacados durante o simpósio e na divulgação do evento, e seus autores receberão um certificado formal.',
            en: 'To recognise outstanding contributions, three best paper awards will be given: two among the Main Track full papers and one among the Undergraduate Track full papers. The selection will consider scientific quality, originality, clarity of presentation and potential impact on the programming languages community. Award-winning papers will be highlighted during the symposium and in the event\'s communications, and their authors will receive a formal certificate.',
          },
        },
      ],
    },
    {
      title: { pt: 'Contato', en: 'Contact' },
      blocks: [
        {
          kind: 'p',
          text: {
            pt: 'Todas as dúvidas sobre submissões ou sobre a organização do SBLP 2027 devem ser enviadas por e-mail para xxxxxx em xxxxxx.',
            en: 'All questions about submissions or the organisation of SBLP 2027 should be sent by e-mail to xxxxxx at xxxxxx.',
          },
        },
      ],
    },
  ],
  milestones: [
    { label: { pt: 'Envio de resumos', en: 'Abstract submission' }, date: null },
    { label: { pt: 'Envio de artigos', en: 'Paper submission' }, date: null },
    { label: { pt: 'Notificação aos autores', en: 'Author notification' }, date: null },
    { label: { pt: 'Envio da versão final (camera-ready)', en: 'Camera-ready submission' }, date: null },
  ],
  datesNote: {
    pt: 'O envio de resumos serve para registrar o artigo (título, autores e resumo), enquanto o envio de artigos é para submeter o PDF completo do trabalho. Todos os prazos são firmes e não serão prorrogados.',
    en: 'The abstract submission registers the paper (title, authors and abstract), while the paper submission is for uploading the full PDF. All deadlines are firm and will not be extended.',
  },
  chairs: [PLACEHOLDER_MEMBER, PLACEHOLDER_MEMBER],
  committees: [{ members: PLACEHOLDER_COMMITTEE }],
};

/* SBES tracks share most of their call text; only the track name changes.
 * Text adapted from the SBES 2026 calls (40th edition, São Paulo): edition,
 * year and city updated; dates, links, chairs and committees are pending. */

type TrackName = Localized;

const SBES_RESEARCH: TrackName = { pt: 'Trilha de Pesquisa', en: 'Research Track' };
const SBES_EDUCATION: TrackName = { pt: 'Trilha de Educação', en: 'Education Track' };
const SBES_TOOLS: TrackName = { pt: 'Trilha de Ferramentas', en: 'Tools Track' };
const SBES_IDEAS: TrackName = {
  pt: 'Trilha de Ideias Inovadoras e Resultados Emergentes',
  en: 'New Ideas and Emerging Results Track',
};

const sbesOpenScience = (track: TrackName): CallSection => ({
  title: { pt: 'Políticas de Ciência Aberta', en: 'Open Science Policies' },
  blocks: [
    {
      kind: 'p',
      text: {
        pt: 'O SBES 2027 incentiva autores a adotarem princípios e práticas de Ciência Aberta, buscando promover a transparência, a replicabilidade e a reprodutibilidade na pesquisa. Encorajamos todos os autores contribuintes a divulgarem dados/artefatos (anonimizados e curados) para aumentar a reprodutibilidade e replicabilidade. Reconhecemos que a reprodutibilidade ou replicabilidade não é um objetivo em pesquisas qualitativas e que, assim como em estudos industriais, estudos qualitativos frequentemente enfrentam desafios ao compartilhar dados de pesquisa.',
        en: 'SBES 2027 encourages authors to adopt Open Science principles and practices, promoting transparency, replicability and reproducibility in research. We encourage all contributing authors to disclose (anonymised and curated) data/artefacts to increase reproducibility and replicability. We recognise that reproducibility or replicability is not a goal of qualitative research and that, as with industrial studies, qualitative studies often face challenges in sharing research data.',
      },
    },
    {
      kind: 'p',
      text: {
        pt: `Nesse contexto, seguindo eventos internacionais da área, na submissão à ${track.pt}, os autores devem criar uma seção não numerada intitulada "Disponibilidade de Artefatos" após a seção de "Conclusão" e:`,
        en: `In this context, following international events in the field, authors submitting to the ${track.en} must add an unnumbered section titled "Artifact Availability" after the "Conclusion" section and:`,
      },
    },
    {
      kind: 'list',
      items: [
        {
          pt: 'disponibilizar seu(s) artefato(s) ao Comitê de Programa (via upload de material suplementar ou um link para um repositório anônimo) e fornecer instruções sobre como acessar esses dados no artigo; ou',
          en: 'make their artefact(s) available to the Program Committee (by uploading supplementary material or linking to an anonymous repository) and explain in the paper how to access this data; or',
        },
        {
          pt: 'incluir no artigo uma declaração explícita sobre por que isso não é possível ou desejável; e',
          en: 'include in the paper an explicit statement on why this is not possible or desirable; and',
        },
        {
          pt: 'indicar por que não pretendem tornar seus dados ou materiais de estudo publicamente disponíveis após a aceitação, se for o caso. O entendimento padrão é que os dados ou outros artefatos estarão publicamente disponíveis após a aceitação de um artigo.',
          en: 'state why they do not intend to make their data or study materials publicly available after acceptance, if that is the case. The default understanding is that data or other artefacts will be publicly available once a paper is accepted.',
        },
      ],
    },
    {
      kind: 'p',
      text: {
        pt: `O documento "SBES 2027 - Políticas de Ciência Aberta" (a ser divulgado) apresenta princípios e práticas de Ciência Aberta para apoiar os autores da ${track.pt} do SBES. Durante a preparação do artigo, dúvidas podem ser encaminhadas aos Coordenadores de Ciência Aberta do SBES 2027, sem incorrer em quebra de anonimização do artigo.`,
        en: `The document "SBES 2027 - Open Science Policies" (to be announced) presents Open Science principles and practices to support authors of the SBES ${track.en}. While preparing the paper, questions can be sent to the SBES 2027 Open Science Chairs without breaking the paper's anonymity.`,
      },
    },
  ],
});

const SBES_AI_POLICY: CallSection = {
  title: {
    pt: 'Sobre o uso de IA (Inteligência Artificial) ou Tecnologias Assistidas por IA em Trabalhos de Pesquisa',
    en: 'On the use of AI (Artificial Intelligence) or AI-Assisted Technologies in Research Papers',
  },
  blocks: [
    {
      kind: 'p',
      text: {
        pt: 'Ao submeterem trabalhos ao SBES 2027, os autores reconhecem que estão em conformidade com a política de uso de IA generativa, baseada nas políticas existentes propostas pela IEEE, ACM e Springer.',
        en: 'By submitting papers to SBES 2027, authors acknowledge that they comply with the generative AI policy, based on existing policies from IEEE, ACM and Springer.',
      },
    },
    { kind: 'p', text: { pt: 'É proibido:', en: 'It is forbidden to:' } },
    {
      kind: 'list',
      items: [
        { pt: 'Listar ferramentas e tecnologias de IA generativa, como o ChatGPT, como autores de trabalhos.', en: 'List generative AI tools and technologies, such as ChatGPT, as authors of papers.' },
        { pt: 'Utilizar artigos ou seções integralmente produzidos por ferramentas de IA generativa.', en: 'Use papers or sections produced entirely by generative AI tools.' },
      ],
    },
    { kind: 'p', text: { pt: 'É permitido (com menção explícita nos agradecimentos):', en: 'It is allowed (with explicit mention in the acknowledgements) to:' } },
    {
      kind: 'list',
      items: [
        {
          pt: 'Utilizar ferramentas de IA generativa para criar partes do conteúdo, com menção nos agradecimentos do artigo indicando o que foi gerado e qual ferramenta foi utilizada. É importante verificar os termos de uso da ferramenta, ficando tal verificação sob responsabilidade dos autores do artigo. Por exemplo, nos agradecimentos: "ChatGPT foi utilizado para gerar o primeiro parágrafo da Seção 3 e para gerar a Tabela 3.2".',
          en: 'Use generative AI tools to create parts of the content, mentioning in the acknowledgements what was generated and which tool was used. Checking the tool\'s terms of use is the authors\' responsibility. For example, in the acknowledgements: "ChatGPT was used to generate the first paragraph of Section 3 and to generate Table 3.2".',
        },
      ],
    },
    { kind: 'p', text: { pt: 'É permitido (sem necessidade de menção):', en: 'It is allowed (without needing to mention it) to:' } },
    {
      kind: 'list',
      items: [
        { pt: 'Usar IA ou tecnologias assistidas por IA para melhorar a qualidade das imagens em relação ao contraste e clareza; e', en: 'Use AI or AI-assisted technologies to improve the contrast and clarity of images; and' },
        { pt: 'Utilizar ferramentas de IA generativa para editar e melhorar a qualidade do seu texto existente (de forma semelhante a um assistente como o Grammarly para melhorar a ortografia, gramática, pontuação, clareza, engajamento).', en: 'Use generative AI tools to edit and improve your existing text (like an assistant such as Grammarly, to improve spelling, grammar, punctuation, clarity and engagement).' },
      ],
    },
  ],
};

/** Template paragraph shared by every SBES track. */
const SBES_TEMPLATE_INTRO: CallBlock = {
  kind: 'p',
  text: {
    pt: 'Os artigos devem ser submetidos no formato Adobe Portable Document Format (PDF) e seguir estritamente o modelo da conferência. É importante salientar que, embora esse modelo seja uma adaptação do formato adotado pela ACM para conferências, o modelo original (ACM_SigConf) não deve ser utilizado. Esse mesmo modelo adaptado será utilizado em todos os simpósios e workshops integrantes do CBSoft 2027.',
    en: 'Papers must be submitted in Adobe Portable Document Format (PDF) and strictly follow the conference template. Note that, although this template is an adaptation of the ACM conference format, the original template (ACM_SigConf) must not be used. The same adapted template will be used by every symposium and workshop of CBSoft 2027.',
  },
};

/** Event command for every SBES track, plus the template checklist. */
const SBES_CONFERENCE_BLOCKS: CallBlock[] = [
  {
    kind: 'p',
    text: {
      pt: 'Para todas as Trilhas do SBES 2027, deverá ainda ser utilizado o seguinte comando contendo as informações do evento (as datas serão divulgadas em breve):',
      en: 'For every SBES 2027 track, the following command with the event information must also be used (the dates will be announced soon):',
    },
  },
  {
    kind: 'code',
    code: '\\acmConference[SBES 2027]{41st Brazilian Symposium on Software Engineering}{TBD}{Belo Horizonte, MG, Brazil}',
  },
  {
    kind: 'p',
    text: {
      pt: 'Orienta-se que todos os autores atentem ao checklist disponibilizado no final do arquivo samples/cbsoft-acm-like.tex para se certificarem de que seus artigos estejam em conformidade com o modelo e as instruções fornecidas.',
      en: 'All authors are advised to go through the checklist at the end of samples/cbsoft-acm-like.tex to make sure their papers comply with the template and the instructions given.',
    },
  },
];

/** Template and LaTeX instructions for the double-anonymous SBES tracks. */
const SBES_TEMPLATE_BLOCKS: CallBlock[] = [
  SBES_TEMPLATE_INTRO,
  {
    kind: 'p',
    text: {
      pt: 'Para garantir a dupla anonimização no processo de submissão inicial e de revisão, os autores deverão adicionar a opção anonymous no preâmbulo do documento:',
      en: 'To ensure double anonymity during the initial submission and review, authors must add the anonymous option to the document preamble:',
    },
  },
  { kind: 'code', code: '\\documentclass[sigconf,anonymous]{acmart}' },
  ...SBES_CONFERENCE_BLOCKS,
];

const sbesPreparation = (track: TrackName): CallSection => ({
  title: { pt: 'Preparação e Submissão de Artigos', en: 'Paper Preparation and Submission' },
  blocks: [
    {
      kind: 'p',
      text: {
        pt: `Os autores devem enviar trabalhos originais que não tenham sido publicados em outro lugar, nem que estejam sob revisão. Os artigos para a ${track.pt} do SBES 2027 podem ser escritos em português ou inglês, sendo que artigos em inglês proporcionam maior visibilidade internacional.`,
        en: `Authors must submit original work that has not been published elsewhere and is not under review. Papers for the SBES 2027 ${track.en} may be written in Portuguese or English; papers in English get greater international visibility.`,
      },
    },
    ...SBES_TEMPLATE_BLOCKS,
    {
      kind: 'p',
      text: {
        pt: 'Os artigos devem ter no máximo 10 páginas, incluindo todas as figuras, tabelas e agradecimentos, e 2 páginas adicionais para referências bibliográficas. Os artigos devem ser registrados e submetidos no sistema JEMS 3 (link a ser divulgado).',
        en: 'Papers must have at most 10 pages, including all figures, tables and acknowledgements, plus 2 additional pages for references. Papers must be registered and submitted through the JEMS 3 system (link to be announced).',
      },
    },
    {
      kind: 'list',
      items: [
        { pt: '**Registro do artigo:** Deve-se informar o título, autores, resumo, tópicos de interesse e idioma do artigo.', en: '**Paper registration:** Provide the title, authors, abstract, topics of interest and language of the paper.' },
        { pt: '**Submissão do artigo completo:** Deve-se submeter o arquivo em formato PDF contendo o artigo.', en: '**Full paper submission:** Submit the PDF file containing the paper.' },
      ],
    },
    {
      kind: 'p',
      text: {
        pt: `A publicação de artigos aceitos na ${track.pt} requer a inscrição de pelo menos um de seus autores no CBSoft 2027 (segundo as regras de inscrição estabelecidas pela organização local do evento), bem como a apresentação do artigo presencialmente durante o SBES 2027. Os artigos que não forem apresentados não serão incluídos nos anais do SBES 2027.`,
        en: `Publication of papers accepted in the ${track.en} requires at least one of the authors to register for CBSoft 2027 (under the registration rules set by the local organisers) and to present the paper in person during SBES 2027. Papers that are not presented will not be included in the SBES 2027 proceedings.`,
      },
    },
  ],
});

const sbesAnonymisation = (track: TrackName): CallSection => ({
  title: { pt: 'Anonimização', en: 'Anonymisation' },
  blocks: [
    {
      kind: 'p',
      text: {
        pt: `A ${track.pt} do SBES 2027 adota um processo de revisão duplo-anônimo ("double-anonymous"). Os artigos submetidos devem ocultar os nomes e a afiliação dos autores. Além disso, as seguintes regras devem ser seguidas:`,
        en: `The SBES 2027 ${track.en} adopts a double-anonymous review process. Submitted papers must hide the authors' names and affiliations. In addition, the following rules must be followed:`,
      },
    },
    {
      kind: 'list',
      items: [
        {
          pt: 'As citações a trabalhos relacionados dos próprios autores devem ser escritas em terceira pessoa. Por exemplo, deve-se escrever "o trabalho anterior de Silva et al." em oposição a "em nosso trabalho anterior". Deve-se também evitar a ocorrência de termos que possam identificar os autores, por exemplo, "nós", "nosso", "financiamento", "Universidade", "github", etc.;',
          en: 'Citations of the authors\' own related work must be written in the third person. For example, write "the previous work by Silva et al." rather than "in our previous work". Terms that could identify the authors must also be avoided, e.g. "we", "our", "funding", "University", "github", etc.;',
        },
        {
          pt: 'O artigo submetido não deve mencionar artefatos em repositórios ou websites que permitam a identificação dos autores. A disponibilização de artefatos da pesquisa deve ser feita de forma anônima. Para anonimizar repositórios hospedados na plataforma GitHub, sugere-se o uso do serviço [Anonymous GitHub](https://anonymous.4open.science/);',
          en: 'The submitted paper must not mention artefacts in repositories or websites that allow the authors to be identified. Research artefacts must be shared anonymously. To anonymise repositories hosted on GitHub, we suggest the [Anonymous GitHub](https://anonymous.4open.science/) service;',
        },
        {
          pt: 'Se o artigo submetido apresentar uma evolução de um trabalho anterior, pode-se anonimizar a referência a esse trabalho. Por exemplo, "baseado no trabalho de Silva et al." pode ser substituído por "baseado em nosso trabalho anterior [Ref]" e a referência pode ser apresentada como "[Ref] referência omitida devido à revisão duplo anônimo" na seção de referências bibliográficas;',
          en: 'If the submitted paper extends previous work, the reference to that work may be anonymised. For example, "based on the work of Silva et al." may be replaced by "based on our previous work [Ref]", and the reference may be listed as "[Ref] reference omitted for double-anonymous review" in the bibliography;',
        },
        {
          pt: 'Os revisores não serão encorajados a procurar referências que identifiquem os autores em outras fontes. Buscas em bibliotecas digitais ou em artefatos existentes não invalidam as regras de duplo anônimo.',
          en: 'Reviewers will not be encouraged to look for references that identify the authors in other sources. Searches in digital libraries or existing artefacts do not invalidate the double-anonymous rules.',
        },
      ],
    },
    {
      kind: 'p',
      text: {
        pt: 'Em caso de aceitação do artigo, as informações omitidas na submissão devem ser incluídas na versão final.',
        en: 'If the paper is accepted, the information omitted from the submission must be included in the final version.',
      },
    },
    {
      kind: 'p',
      text: {
        pt: `Dúvidas sobre a preparação de artigos segundo as regras de anonimização da ${track.pt} do SBES podem ser enviadas aos Coordenadores do Comitê de Programa.`,
        en: `Questions about preparing papers under the anonymisation rules of the SBES ${track.en} can be sent to the Program Committee Chairs.`,
      },
    },
  ],
});

const sbesDisqualification = (track: TrackName): CallSection => ({
  title: { pt: 'Desclassificação de Artigos', en: 'Paper Disqualification' },
  blocks: [
    {
      kind: 'p',
      text: {
        pt: `Artigos fora do escopo da ${track.pt} do SBES 2027 ou que não estiverem em conformidade com o formato exigido e as regras de anonimização serão desclassificados e rejeitados sem passar pelo processo de revisão.`,
        en: `Papers outside the scope of the SBES 2027 ${track.en}, or that do not comply with the required format and anonymisation rules, will be disqualified and rejected without review.`,
      },
    },
    {
      kind: 'p',
      text: {
        pt: 'Se uma submissão simultânea ou publicação prévia em outro fórum (evento ou periódico) de artigo submetido ao SBES for identificada e reportada a qualquer tempo, o artigo será rejeitado e os autores poderão ficar impedidos de submeter artigos nas próximas edições do SBES. Além disso, os organizadores do outro fórum serão comunicados sobre a ocorrência.',
        en: 'If a simultaneous submission or prior publication in another venue (conference or journal) of a paper submitted to SBES is identified and reported at any time, the paper will be rejected and the authors may be barred from submitting to the next editions of SBES. The organisers of the other venue will also be notified.',
      },
    },
    {
      kind: 'p',
      text: {
        pt: 'Caso sejam observadas evidências da utilização de ferramentas de IA generativa na submissão que não esteja em conformidade com as recomendações para o uso de IA generativa especificadas nesta chamada, o artigo será rejeitado sem revisão e os autores poderão ficar impedidos de submeter artigos nas próximas edições do SBES.',
        en: 'If there is evidence that generative AI tools were used in the submission in a way that does not comply with the generative AI recommendations in this call, the paper will be rejected without review and the authors may be barred from submitting to the next editions of SBES.',
      },
    },
  ],
});

const SBES_REBUTTAL: CallSection = {
  title: { pt: 'Resposta dos Autores (Rebuttal)', en: 'Author Response (Rebuttal)' },
  blocks: [
    {
      kind: 'p',
      text: {
        pt: 'Durante o processo de revisão, os autores terão a oportunidade de argumentar e responder às perguntas dos revisores antes da decisão final de aceitação/rejeição. A resposta dos autores deve ser um texto simples de até 7.000 caracteres (incluindo espaços). Dúvidas podem ser encaminhadas por e-mail aos Coordenadores do Comitê de Programa.',
        en: 'During the review process, authors will have the opportunity to argue and answer the reviewers\' questions before the final accept/reject decision. The author response must be plain text of up to 7,000 characters (including spaces). Questions can be sent by e-mail to the Program Committee Chairs.',
      },
    },
  ],
};

const SBES_EARLY_DECISIONS: CallSection = {
  title: { pt: 'Decisões Antecipadas', en: 'Early Decisions' },
  blocks: [
    {
      kind: 'p',
      text: {
        pt: 'Para reduzir o esforço dos autores e revisores com a escrita/leitura desnecessária de respostas dos autores, o SBES 2027 enviará decisões antecipadas.',
        en: 'To spare authors and reviewers from writing/reading unnecessary author responses, SBES 2027 will send early decisions.',
      },
    },
    {
      kind: 'p',
      text: {
        pt: 'Se os revisores e os Coordenadores do Comitê de Programa decidirem que um artigo pode ser aceito sem a necessidade de tirar dúvidas, os autores receberão uma notificação de aceitação no início do período de rebuttal.',
        en: 'If the reviewers and the Program Committee Chairs decide that a paper can be accepted without further clarification, the authors will receive an acceptance notification at the start of the rebuttal period.',
      },
    },
    {
      kind: 'p',
      text: {
        pt: 'Por outro lado, se os revisores e os Coordenadores do Comitê de Programa entenderem que o artigo é altamente deficiente, levando-os a concluir que a resposta dos autores provavelmente não alterará a avaliação, ou se o artigo necessitar de uma reformulação completa, os autores receberão uma notificação de rejeição no início do período de rebuttal.',
        en: 'Conversely, if the reviewers and the Program Committee Chairs find the paper highly deficient, concluding that an author response is unlikely to change the evaluation, or if the paper needs a complete rewrite, the authors will receive a rejection notification at the start of the rebuttal period.',
      },
    },
    {
      kind: 'p',
      text: {
        pt: 'Todos os demais artigos serão encaminhados para a fase de rebuttal.',
        en: 'All other papers will move on to the rebuttal phase.',
      },
    },
  ],
};

const sbesReviewerAward = (track: TrackName): CallSection => ({
  title: { pt: 'Prêmio Revisor de Destaque', en: 'Distinguished Reviewer Award' },
  blocks: [
    {
      kind: 'p',
      text: {
        pt: `A ${track.pt} do SBES reconhece a generosidade dos membros do Comitê de Programa que dedicam tempo e esforço para revisar os trabalhos submetidos. Um certificado de Revisor de Destaque será concedido aos revisores que se destacarem dos seus pares em termos de pontualidade, aderência das revisões aos critérios de revisão da trilha, qualidade técnica das revisões e participação ativa nas discussões que envolvem o Comitê de Programa.`,
        en: `The SBES ${track.en} recognises the generosity of the Program Committee members who devote time and effort to reviewing the submitted papers. A Distinguished Reviewer certificate will be awarded to reviewers who stand out from their peers in punctuality, adherence of their reviews to the track's review criteria, technical quality of their reviews and active participation in the Program Committee discussions.`,
      },
    },
  ],
});

/** Key dates shared by the Research and Education tracks. */
const sbesMilestones = (): CallMilestone[] => [
  { label: { pt: 'Registro do artigo', en: 'Paper registration' }, date: null, hard: true },
  { label: { pt: 'Submissão do artigo completo', en: 'Full paper submission' }, date: null, hard: true },
  { label: { pt: '1ª notificação', en: '1st notification' }, date: null },
  { label: { pt: 'Resposta dos autores (rebuttal)', en: 'Author response (rebuttal)' }, date: null },
  { label: { pt: '2ª notificação', en: '2nd notification' }, date: null },
  { label: { pt: 'Submissão da versão final', en: 'Camera-ready submission' }, date: null },
];

/** SBES 2027 Research Track. */
const SBES_RESEARCH_CALL: SymposiumCall = {
  intro: [
    {
      pt: 'O Simpósio Brasileiro de Engenharia de Software (SBES), promovido anualmente pela Sociedade Brasileira de Computação (SBC), é o principal evento de Engenharia de Software da América Latina. O SBES é realizado em conjunto com o Congresso Brasileiro de Software: Teoria e Prática (CBSoft).',
      en: 'The Brazilian Symposium on Software Engineering (SBES), promoted annually by the Brazilian Computer Society (SBC), is the leading Software Engineering event in Latin America. SBES is held together with the Brazilian Conference on Software: Theory and Practice (CBSoft).',
    },
    {
      pt: 'A Trilha de Pesquisa do SBES é a principal trilha do simpósio e publica contribuições sólidas que são rigorosamente avaliadas pelo Comitê de Programa considerando os critérios de originalidade, relevância, rigor, verificabilidade e transparência, e qualidade da apresentação do trabalho.',
      en: 'The SBES Research Track is the main track of the symposium and publishes solid contributions that are rigorously evaluated by the Program Committee on originality, relevance, rigour, verifiability and transparency, and quality of presentation.',
    },
  ],
  sections: [
    {
      title: { pt: 'Tópicos de Interesse', en: 'Topics of Interest' },
      blocks: [
        {
          kind: 'p',
          text: {
            pt: 'Serão aceitas submissões relacionadas (mas não limitadas) aos seguintes tópicos:',
            en: 'Submissions are welcome on (but not limited to) the following topics:',
          },
        },
        {
          kind: 'list',
          items: [
            { pt: 'Arquitetura de Software', en: 'Software Architecture' },
            { pt: 'Aspectos Econômicos, Humanos e Sociais da Engenharia de Software', en: 'Economic, Human and Social Aspects of Software Engineering' },
            { pt: 'Ciência Aberta na Pesquisa em Engenharia de Software', en: 'Open Science in Software Engineering Research' },
            { pt: 'Detecção de Clones e Refatoração', en: 'Clone Detection and Refactoring' },
            { pt: 'Desenvolvimento de Aplicações Móveis', en: 'Mobile Application Development' },
            { pt: 'Desenvolvimento e Evolução de APIs', en: 'API Development and Evolution' },
            { pt: 'Ecossistemas de Software', en: 'Software Ecosystems' },
            { pt: 'Engenharia de Requisitos', en: 'Requirements Engineering' },
            { pt: 'Engenharia de Software Baseada em Busca', en: 'Search-Based Software Engineering' },
            { pt: 'Engenharia de Software Contínua', en: 'Continuous Software Engineering' },
            { pt: 'Engenharia de Software Experimental', en: 'Experimental Software Engineering' },
            { pt: 'Engenharia de Software e Ciência de Dados', en: 'Software Engineering and Data Science' },
            { pt: 'Engenharia de Software para Computação em Nuvem', en: 'Software Engineering for Cloud Computing' },
            { pt: 'Engenharia de Software para Inteligência Artificial', en: 'Software Engineering for Artificial Intelligence' },
            { pt: 'Engenharia de Software Orientada a Modelos', en: 'Model-Driven Software Engineering' },
            { pt: 'Engenharia de Software Distribuída e Colaborativa', en: 'Distributed and Collaborative Software Engineering' },
            { pt: 'Ética em Engenharia de Software', en: 'Ethics in Software Engineering' },
            { pt: 'Gestão de Dívida Técnica', en: 'Technical Debt Management' },
            { pt: 'Gerenciamento de Configuração', en: 'Configuration Management' },
            { pt: 'Gerenciamento de Projetos de Software', en: 'Software Project Management' },
            { pt: 'Inteligência Artificial para Engenharia de Software', en: 'Artificial Intelligence for Software Engineering' },
            { pt: 'Manutenção, Reengenharia e Evolução de Software', en: 'Software Maintenance, Reengineering and Evolution' },
            { pt: 'Mineração de Repositórios de Software', en: 'Mining Software Repositories' },
            { pt: 'Orientação a Serviços e Microsserviços', en: 'Service Orientation and Microservices' },
            { pt: 'Processos de Software (incluindo Ágil)', en: 'Software Processes (including Agile)' },
            { pt: 'Qualidade de Software (incluindo Privacidade e Segurança em Sistemas de Software)', en: 'Software Quality (including Privacy and Security in Software Systems)' },
            { pt: 'Reutilização de Software', en: 'Software Reuse' },
            { pt: 'Sistemas-de-Sistemas', en: 'Systems-of-Systems' },
            { pt: 'Startups e Economia do Software', en: 'Startups and Software Economics' },
            { pt: 'Sustentabilidade de Software', en: 'Software Sustainability' },
            { pt: 'Teste de Software', en: 'Software Testing' },
            { pt: 'Validação e Verificação de Software', en: 'Software Validation and Verification' },
            { pt: 'Variabilidade e Linhas de Produto de Software', en: 'Variability and Software Product Lines' },
            { pt: 'Visualização de Software', en: 'Software Visualisation' },
          ],
        },
      ],
    },
    sbesOpenScience(SBES_RESEARCH),
    SBES_AI_POLICY,
    sbesPreparation(SBES_RESEARCH),
    ethicsSection,
    sbesAnonymisation(SBES_RESEARCH),
    sbesDisqualification(SBES_RESEARCH),
    {
      title: { pt: 'Revisão de Artigos', en: 'Paper Review' },
      blocks: [
        {
          kind: 'p',
          text: {
            pt: 'Os artigos que estiverem em conformidade com os critérios de submissão serão revisados por pelo menos três membros do Comitê de Programa, de acordo com os seguintes critérios:',
            en: 'Papers that comply with the submission criteria will be reviewed by at least three Program Committee members according to the following criteria:',
          },
        },
        {
          kind: 'list',
          items: [
            { pt: '**Originalidade:** Novidade e inovação do artigo em relação ao estado da arte, incluindo abordagens, soluções, formulações de problemas, metodologias, teorias ou avaliações propostas.', en: '**Originality:** Novelty and innovation of the paper with respect to the state of the art, including the proposed approaches, solutions, problem formulations, methodologies, theories or evaluations.' },
            { pt: '**Relevância:** Importância das contribuições do artigo para o campo da Engenharia de Software.', en: '**Relevance:** Importance of the paper\'s contributions to the field of Software Engineering.' },
            { pt: '**Rigor:** Solidez, clareza e profundidade de uma contribuição técnica ou teórica, assim como o nível de detalhamento e completude do método e da avaliação.', en: '**Rigour:** Soundness, clarity and depth of a technical or theoretical contribution, as well as the level of detail and completeness of the method and evaluation.' },
            { pt: '**Verificabilidade e Transparência:** Grau em que o artigo disponibiliza informações suficientes para avaliar e reproduzir os métodos, dados, análises e resultados apresentados, incluindo a adequação e completude de artefatos de pesquisa, quando fornecidos.', en: '**Verifiability and Transparency:** The extent to which the paper provides enough information to assess and reproduce its methods, data, analyses and results, including the adequacy and completeness of research artefacts, when provided.' },
            { pt: '**Apresentação:** Qualidade da escrita do artigo, incluindo descrições claras, adequação gramatical, ausência de ambiguidades, legibilidade de figuras e tabelas e conformidade com as instruções de formatação.', en: '**Presentation:** Quality of the writing, including clear descriptions, correct grammar, absence of ambiguity, legibility of figures and tables, and compliance with the formatting instructions.' },
          ],
        },
      ],
    },
    SBES_REBUTTAL,
    SBES_EARLY_DECISIONS,
    {
      title: { pt: 'Prêmio Artigo de Destaque', en: 'Distinguished Paper Award' },
      blocks: [
        {
          kind: 'p',
          text: {
            pt: 'O SBES 2027 premiará os melhores artigos da Trilha de Pesquisa. Os premiados serão anunciados durante a abertura do CBSoft, e os autores serão convidados a submeter uma versão estendida, em inglês, ao Journal of Software Engineering Research and Development (JSERD).',
            en: 'SBES 2027 will award the best papers of the Research Track. The winners will be announced at the CBSoft opening, and the authors will be invited to submit an extended version, in English, to the Journal of Software Engineering Research and Development (JSERD).',
          },
        },
      ],
    },
    sbesReviewerAward(SBES_RESEARCH),
    {
      title: { pt: 'Submissão de Artigos Journal-First', en: 'Journal-First Submissions' },
      blocks: [
        {
          kind: 'p',
          text: {
            pt: 'Autores de artigos aceitos em periódicos e sobre os temas de interesse do SBES são convidados a apresentar seus trabalhos no SBES 2027. Isso proporciona aos autores a oportunidade de discutir seus trabalhos com a comunidade e também enriquece o programa técnico-científico do SBES 2027. Podem ser submetidos artigos que tenham sido publicados nos seguintes periódicos:',
            en: 'Authors of journal papers on SBES topics of interest are invited to present their work at SBES 2027. This gives authors the chance to discuss their work with the community and also enriches the SBES 2027 technical programme. Papers published in the following journals may be submitted:',
          },
        },
        {
          kind: 'list',
          items: [
            { pt: 'ACM Transactions on Software Engineering and Methodology (TOSEM)', en: 'ACM Transactions on Software Engineering and Methodology (TOSEM)' },
            { pt: 'Automated Software Engineering (ASE)', en: 'Automated Software Engineering (ASE)' },
            { pt: 'Empirical Software Engineering (EMSE)', en: 'Empirical Software Engineering (EMSE)' },
            { pt: 'IEEE Software (IEEE SW)', en: 'IEEE Software (IEEE SW)' },
            { pt: 'IEEE Transactions on Software Engineering (TSE)', en: 'IEEE Transactions on Software Engineering (TSE)' },
            { pt: 'Information and Software Technology (IST)', en: 'Information and Software Technology (IST)' },
            { pt: 'Journal of Software Engineering Research and Development (JSERD)', en: 'Journal of Software Engineering Research and Development (JSERD)' },
            { pt: 'Journal of Software: Evolution and Process (JSEP)', en: 'Journal of Software: Evolution and Process (JSEP)' },
            { pt: 'Journal of Systems and Software (JSS)', en: 'Journal of Systems and Software (JSS)' },
            { pt: 'Software Quality Journal (SQJ)', en: 'Software Quality Journal (SQJ)' },
          ],
        },
        {
          kind: 'p',
          text: {
            pt: 'Os seguintes critérios de avaliação serão adotados para a seleção de artigos submetidos como Journal-First:',
            en: 'The following criteria will be used to select papers submitted as Journal-First:',
          },
        },
        {
          kind: 'list',
          items: [
            { pt: 'O artigo descreve resultados originais que não são extensões de artigos anteriores publicados em conferências;', en: 'The paper reports original results that are not extensions of previous conference papers;' },
            { pt: 'O artigo foi aceito para publicação a partir de 01 de Janeiro de 2026;', en: 'The paper was accepted for publication on or after 1 January 2026;' },
            { pt: 'O artigo não foi aceito para apresentação em outra conferência na categoria Journal-First;', en: 'The paper has not been accepted for presentation at another conference as Journal-First;' },
            { pt: 'O artigo é um artigo de pesquisa ou uma revisão da literatura (revisão sistemáticas ou mapeamento sistemático) que aborda tópico(s) de interesse da Trilha de Pesquisa do SBES 2027 (conforme indicados na chamada de trabalhos) e foi revisado por pares.', en: 'The paper is a research paper or a literature review (systematic review or systematic mapping) that addresses topic(s) of interest of the SBES 2027 Research Track (as listed in the call for papers) and was peer reviewed.' },
          ],
        },
        {
          kind: 'p',
          text: {
            pt: 'A data limite e o link para submissão de artigos na categoria Journal-First serão divulgados em breve.',
            en: 'The deadline and the link for Journal-First submissions will be announced soon.',
          },
        },
      ],
    },
  ],
  milestones: sbesMilestones(),
  chairs: [PLACEHOLDER_MEMBER, PLACEHOLDER_MEMBER],
  committees: [{ members: PLACEHOLDER_COMMITTEE }],
};

/** SBES 2027 Education Track (formerly FEES). */
const SBES_EDUCATION_CALL: SymposiumCall = {
  intro: [
    {
      pt: 'O Simpósio Brasileiro de Engenharia de Software (SBES) é o principal evento de Engenharia de Software da América Latina. O SBES é realizado em conjunto com a CBSoft - Conferência Brasileira de Software: Teoria e Prática, que tradicionalmente reúne acadêmicos, profissionais e estudantes.',
      en: 'The Brazilian Symposium on Software Engineering (SBES) is the leading Software Engineering event in Latin America. SBES is held together with CBSoft - the Brazilian Conference on Software: Theory and Practice, which traditionally brings together academics, practitioners and students.',
    },
    {
      pt: 'A trilha de Educação do SBES, antigo FEES (Fórum de Educação em Engenharia de Software), foca na discussão de desafios, boas práticas e inovações na educação e no treinamento em Engenharia de Software.',
      en: 'The SBES Education Track, formerly FEES (Software Engineering Education Forum), focuses on discussing challenges, good practices and innovations in Software Engineering education and training.',
    },
    {
      pt: 'A Trilha de Educação em Engenharia de Software busca submissões de qualidade que tratem de assuntos relacionados ao desenvolvimento de currículos, relatos de experiência institucionais ou pessoais, estudos experimentais, melhores práticas, e trabalhos teóricos ou conceituais, no escopo de educação e treinamento em Engenharia de Software. Os artigos nesta trilha podem tratar de diferentes níveis e contextos, incluindo, mas não limitados a, ensino fundamental e médio, educação tecnológica, educação superior para graduação ou pós-graduação, clubes de codificação, hackathons, bootcamps, treinamento industrial e aprendizagem e treinamento informal.',
      en: 'The Software Engineering Education Track seeks quality submissions on curriculum development, institutional or personal experience reports, experimental studies, best practices, and theoretical or conceptual work within the scope of Software Engineering education and training. Papers in this track may address different levels and contexts, including but not limited to primary and secondary school, technical education, undergraduate or graduate higher education, coding clubs, hackathons, bootcamps, industrial training, and informal learning and training.',
    },
  ],
  sections: [
    {
      title: { pt: 'Categorias de Artigos', en: 'Paper Categories' },
      blocks: [
        {
          kind: 'p',
          text: {
            pt: 'A Trilha de Educação do SBES convida pesquisadores e educadores da área para submeterem artigos nas categorias abaixo:',
            en: 'The SBES Education Track invites researchers and educators to submit papers in the following categories:',
          },
        },
        {
          kind: 'p',
          text: {
            pt: '**Artigos de Pesquisa** - O artigo de pesquisa deve abordar um dos tópicos relacionados à engenharia de software e educação, aplicando técnicas de pesquisa adequadas e escrita acadêmica adequada. Dentro do contexto dos tópicos de interesse para esta chamada de artigos, os trabalhos desta categoria devem seguir padrões rigorosos, descrevendo questões de pesquisa, hipóteses, métodos, resultados e limitações, como é típico e esperado de estudos de pesquisa. Portanto, são esperados artigos tais como experimentos controlados, pesquisas de opinião, estudos qualitativos, estudos de caso. Resultados negativos e mistos são aceitáveis;',
            en: '**Research Papers** - A research paper must address one of the topics related to software engineering and education, applying suitable research techniques and proper academic writing. Within the topics of interest of this call, papers in this category must follow rigorous standards, describing research questions, hypotheses, methods, results and limitations, as is typical and expected of research studies. Papers such as controlled experiments, surveys, qualitative studies and case studies are therefore expected. Negative and mixed results are acceptable;',
          },
        },
        {
          kind: 'p',
          text: {
            pt: '**Relatos de Experiência** - Os artigos devem descrever o uso de uma intervenção, curso ou experiência de ensino/treinamento em Engenharia de Software, detalhando as bases teóricas da abordagem, o contexto de uso e fornecendo uma reflexão rica sobre o que funcionou ou não funcionou e porquê. Contudo, o artigo não precisa avaliar a experiência ou aplicar métodos rigorosos de pesquisa para apoiar suas afirmações. É fundamental que os artigos desta categoria tragam detalhes suficientes para permitir que a abordagem apresentada seja replicada por outros educadores. Resultados negativos e mistos são aceitáveis, desde que possam apoiar conselhos ou lições aprendidas;',
            en: '**Experience Reports** - Papers must describe the use of a Software Engineering teaching/training intervention, course or experience, detailing the theoretical basis of the approach and its context of use, and providing a rich reflection on what did or did not work and why. However, the paper does not need to evaluate the experience or apply rigorous research methods to support its claims. Papers in this category must give enough detail for other educators to replicate the approach. Negative and mixed results are acceptable, as long as they can support advice or lessons learned;',
          },
        },
        {
          kind: 'p',
          text: {
            pt: '**Artigos de Replicação** - esta categoria descreve a replicação de uma intervenção pedagógica existente e já publicada (por exemplo, curso, abordagem, estudo, educação, experiência de formação) em novos contextos. O objetivo é determinar se as conclusões básicas relacionadas com a intervenção pedagógica original e já publicada podem ser aplicadas a outras circunstâncias. Resultados negativos e mistos são aceitáveis, desde que possam apoiar conselhos ou lições aprendidas.',
            en: '**Replication Papers** - this category describes the replication of an existing, already published pedagogical intervention (e.g. course, approach, study, education or training experience) in new contexts. The goal is to determine whether the basic conclusions of the original published intervention apply to other circumstances. Negative and mixed results are acceptable, as long as they can support advice or lessons learned.',
          },
        },
      ],
    },
    {
      title: { pt: 'Tópicos de Interesse', en: 'Topics of Interest' },
      blocks: [
        {
          kind: 'p',
          text: {
            pt: 'Convidamos submissões sobre educação e treinamento em Engenharia de Software em diversos cenários (por exemplo, sala de aula, curso de capacitação complementar, ensino universitário, ensino técnico), incluindo, mas não se limitando, aos tópicos listados a seguir:',
            en: 'We invite submissions on Software Engineering education and training in various settings (e.g. classroom, complementary training courses, university teaching, technical education), including but not limited to the following topics:',
          },
        },
        {
          kind: 'list',
          items: [
            { pt: 'Educação e Treinamento de Engenharia de Software de modo presencial, híbrido ou remoto após a pandemia do COVID-19, destacando as mudanças no processo de ensino-aprendizagem;', en: 'In-person, hybrid or remote Software Engineering education and training after the COVID-19 pandemic, highlighting changes in the teaching-learning process;' },
            { pt: 'Educação e Treinamento em Engenharia de Software através de metodologias ativas de aprendizagem: Aprendizagem Baseada em Problemas, Aprendizagem Baseada em Projetos, Aprendizagem Baseada em Desafios, Sala de Aula Invertida, entre outras;', en: 'Software Engineering education and training through active learning methodologies: Problem-Based Learning, Project-Based Learning, Challenge-Based Learning, Flipped Classroom, among others;' },
            { pt: 'Boas práticas e práticas inovadoras para a Educação e Treinamento em Engenharia de Software;', en: 'Good and innovative practices for Software Engineering education and training;' },
            { pt: 'Currículo ou projetos de cursos inovadores;', en: 'Innovative curricula or course designs;' },
            { pt: 'Educação e treinamento de Engenharia de Software no contexto de diferentes cursos de graduação e pós-graduação;', en: 'Software Engineering education and training in different undergraduate and graduate programmes;' },
            { pt: 'Educação e treinamento de métodos, técnicas e ferramentas para o desenvolvimento de software;', en: 'Education and training in software development methods, techniques and tools;' },
            { pt: 'Educação e treinamento de Engenharia de Software em contextos informais, como hackathons e Stack overflow;', en: 'Software Engineering education and training in informal contexts, such as hackathons and Stack Overflow;' },
            { pt: 'Ambientes educacionais emergentes para Engenharia de Software, tais como aprendizagem online;', en: 'Emerging educational environments for Software Engineering, such as online learning;' },
            { pt: 'Experiências de ensino/aprendizagem utilizando abordagens em cenários práticos da Engenharia de Software, tais como: métodos ágeis, código aberto, desenvolvimento distribuído de software, computação em nuvem, big data, dispositivos móveis, sistemas embarcados, robótica, aprendizado de máquina e outros;', en: 'Teaching/learning experiences using approaches in practical Software Engineering scenarios, such as agile methods, open source, distributed software development, cloud computing, big data, mobile devices, embedded systems, robotics, machine learning and others;' },
            { pt: 'Ferramentas e métodos de avaliação do aprendizado em Engenharia de Software;', en: 'Tools and methods for assessing learning in Software Engineering;' },
            { pt: 'Ensino/aprendizagem de aspectos humanos, políticos, éticos, legais, profissionais e sociais em Engenharia de Software;', en: 'Teaching/learning human, political, ethical, legal, professional and social aspects of Software Engineering;' },
            { pt: 'Integração de experiências práticas na educação e treinamento de Engenharia de Software;', en: 'Integrating practical experiences into Software Engineering education and training;' },
            { pt: 'Integração entre pesquisa e educação de Engenharia de Software;', en: 'Integrating Software Engineering research and education;' },
            { pt: 'Interdisciplinaridade na educação e treinamento em Engenharia de Software;', en: 'Interdisciplinarity in Software Engineering education and training;' },
            { pt: 'Métodos inovadores que promovam o estudo e estimulem o aprendizado dos educadores, mantendo-os atualizados para a educação e treinamento em Engenharia de Software;', en: 'Innovative methods that promote study and foster educators\' learning, keeping them up to date for Software Engineering education and training;' },
            { pt: 'Educação e treinamento em Engenharia de Software que estimula o empreendedorismo, especialmente a criação de startups;', en: 'Software Engineering education and training that fosters entrepreneurship, especially the creation of startups;' },
            { pt: 'Pesquisa sobre igualdade, diversidade e inclusão na educação e treinamento em Engenharia de Software;', en: 'Research on equality, diversity and inclusion in Software Engineering education and training;' },
            { pt: 'Código aberto na educação e treinamento em Engenharia de Software;', en: 'Open source in Software Engineering education and training;' },
            { pt: 'Educação e treinamento de tópicos emergentes em Engenharia de Software.', en: 'Education and training on emerging Software Engineering topics.' },
          ],
        },
      ],
    },
    sbesOpenScience(SBES_EDUCATION),
    SBES_AI_POLICY,
    sbesPreparation(SBES_EDUCATION),
    ethicsSection,
    sbesAnonymisation(SBES_EDUCATION),
    sbesDisqualification(SBES_EDUCATION),
    {
      title: { pt: 'Revisão de Artigos', en: 'Paper Review' },
      blocks: [
        { kind: 'p', text: { pt: 'As submissões serão avaliadas considerando a sua categoria:', en: 'Submissions will be evaluated according to their category:' } },
        {
          kind: 'list',
          items: [
            { pt: '**Artigos de Pesquisa** serão avaliados de acordo com esses critérios: Relevância, Significância, Solidez, Verificabilidade e Apresentação;', en: '**Research Papers** will be evaluated on: Relevance, Significance, Soundness, Verifiability and Presentation;' },
            { pt: '**Relatos de Experiência** serão avaliados de acordo com esses critérios: Relevância, Significância, Capacidade de Ação, Lições, Apresentação;', en: '**Experience Reports** will be evaluated on: Relevance, Significance, Actionability, Lessons and Presentation;' },
            { pt: '**Artigos de Replicação** serão avaliados de acordo com esses critérios: Relevância, Significância, Solidez, Apresentação.', en: '**Replication Papers** will be evaluated on: Relevance, Significance, Soundness and Presentation.' },
          ],
        },
        {
          kind: 'p',
          text: {
            pt: 'Os critérios de avaliação para os trabalhos de Trilha de Educação do SBES são definidos da seguinte forma:',
            en: 'The evaluation criteria for SBES Education Track papers are defined as follows:',
          },
        },
        {
          kind: 'list',
          items: [
            { pt: '**Relevância:** até que ponto o artigo é relevante para a Trilha de Educação do SBES para aprimorar o corpo de conhecimento sobre desafios, boas práticas, experiências e inovações no ensino e treinamento em Engenharia de Software;', en: '**Relevance:** the extent to which the paper is relevant to the SBES Education Track in advancing the body of knowledge on challenges, good practices, experiences and innovations in Software Engineering teaching and training;' },
            { pt: '**Significância:** até que ponto o artigo é bem motivado e suas contribuições são originais ou importantes, em relação à literatura existente sobre educação em Engenharia de Software;', en: '**Significance:** the extent to which the paper is well motivated and its contributions are original or important with respect to the existing literature on Software Engineering education;' },
            { pt: '**Solidez:** a medida em que as contribuições do artigo são apoiadas pela aplicação rigorosa de métodos de pesquisa apropriados e se o artigo discute significativamente as limitações dos métodos de pesquisa e as ameaças à validade dos resultados;', en: '**Soundness:** the extent to which the paper\'s contributions are supported by the rigorous application of appropriate research methods, and whether the paper meaningfully discusses the limitations of the research methods and the threats to the validity of the results;' },
            { pt: '**Verificabilidade:** até que ponto o artigo inclui informações suficientes para apoiar a verificação independente ou a replicação das contribuições apresentadas no artigo. Isto inclui a disponibilização pública de dados da pesquisa ou uma declaração explícita da razão pela qual tais dados não podem ser disponibilizados publicamente;', en: '**Verifiability:** the extent to which the paper includes enough information to support independent verification or replication of its contributions. This includes making the research data publicly available or explicitly stating why it cannot be made public;' },
            { pt: '**Capacidade de Ação:** até que ponto o documento fornece recomendações práticas com mensagens claras.', en: '**Actionability:** the extent to which the paper provides practical recommendations with clear messages.' },
            { pt: '**Lições:** Até que ponto o documento discute significativamente as lições aprendidas em termos do que deu certo, do que deu errado e do que poderia ser melhorado se a experiência se repetisse.', en: '**Lessons:** the extent to which the paper meaningfully discusses lessons learned in terms of what went right, what went wrong and what could be improved if the experience were repeated.' },
            { pt: '**Apresentação:** Até que ponto a organização e a qualidade da escrita do artigo estão de acordo com o padrão: o artigo é bem estruturado, emprega linguagem acadêmica clara e correta, evita ambiguidade, inclui figuras e tabelas claramente legíveis e está formatado adequadamente.', en: '**Presentation:** the extent to which the organisation and writing quality of the paper meet the standard: the paper is well structured, uses clear and correct academic language, avoids ambiguity, includes clearly legible figures and tables and is properly formatted.' },
          ],
        },
      ],
    },
    SBES_REBUTTAL,
    SBES_EARLY_DECISIONS,
    {
      title: { pt: 'Prêmio Artigo de Destaque', en: 'Distinguished Paper Award' },
      blocks: [
        {
          kind: 'p',
          text: {
            pt: 'O Comitê Diretivo do SBES irá nomear um comitê para premiar os melhores trabalhos do simpósio. O trabalho premiado da Trilha de Educação será anunciado durante o evento e será convidado a submeter uma versão estendida em inglês ao Journal of Software Engineering Research and Development (JSERD). Os Coordenadores do Comitê de Programa se reservam o direito de nominar para o prêmio somente os trabalhos adequados, incluindo a possibilidade de não ter trabalhos desta trilha nominados para o prêmio.',
            en: 'The SBES Steering Committee will appoint a committee to award the best papers of the symposium. The awarded Education Track paper will be announced during the event and invited to submit an extended version in English to the Journal of Software Engineering Research and Development (JSERD). The Program Committee Chairs reserve the right to nominate only suitable papers, including the possibility of nominating no paper from this track.',
          },
        },
      ],
    },
    sbesReviewerAward(SBES_EDUCATION),
  ],
  milestones: sbesMilestones(),
  chairs: [PLACEHOLDER_MEMBER, PLACEHOLDER_MEMBER],
  committees: [{ members: PLACEHOLDER_COMMITTEE }],
};

/** SBES 2027 New Ideas and Emerging Results Track (IIER). */
const SBES_IDEAS_CALL: SymposiumCall = {
  intro: [
    {
      pt: 'O objetivo da trilha de Ideias Inovadoras e Resultados Emergentes (IIER) do Simpósio Brasileiro de Engenharia de Software (SBES) é oferecer aos pesquisadores e profissionais um fórum para apresentação e discussão de ideias inovadoras e promissoras em estágios iniciais da pesquisa. Assim, os trabalhos submetidos não requerem uma forte avaliação empírica, mas resultados preliminares que forneçam evidências iniciais que demonstrem a viabilidade das novas ideias sendo propostas. O objetivo final é a apresentação de resultados, técnicas e perspectivas de pesquisas pioneiras que desafiam o status quo da disciplina de Engenharia de Software. Portanto, esta trilha acolhe dois tipos de trabalhos, a saber:',
      en: 'The goal of the New Ideas and Emerging Results (NIER) track of the Brazilian Symposium on Software Engineering (SBES) is to offer researchers and practitioners a forum to present and discuss innovative and promising ideas at early stages of research. Submitted papers therefore do not require a strong empirical evaluation, but preliminary results that provide initial evidence of the feasibility of the new ideas being proposed. The ultimate goal is to present pioneering research results, techniques and perspectives that challenge the status quo of the Software Engineering discipline. This track therefore welcomes two kinds of papers:',
    },
  ],
  sections: [
    {
      title: { pt: 'Tipos de Trabalhos', en: 'Kinds of Papers' },
      blocks: [
        {
          kind: 'list',
          items: [
            {
              pt: '**Ideias voltadas para o futuro:** Novas direções ou técnicas promissoras que podem ainda não terem sido apoiadas por resultados experimentais sólidos, mas, no entanto, são apoiadas por intuições científicas fortes e bem fundamentadas, bem como planos concretos para o futuro; e',
              en: '**Forward-looking ideas:** New directions or promising techniques that may not yet be backed by solid experimental results, but are nonetheless supported by strong, well-founded scientific intuition and concrete plans for the future; and',
            },
            {
              pt: '**Reflexões provocativas:** resultados ousados e inesperados e reflexões que podem nos ajudar a olhar para as atuais direções de pesquisa sob uma nova luz, atentando para novas direções para pesquisas futuras.',
              en: '**Thought-provoking reflections:** bold and unexpected results and reflections that can help us look at current research directions in a new light, pointing to new directions for future research.',
            },
          ],
        },
        {
          kind: 'p',
          text: {
            pt: 'Esta trilha é organizada desde o SBES 2015 e os anais anteriores estão disponíveis nas bibliotecas digitais do IEEE (2015), ACM (2016 a 2023) e SOL (2024 a 2026).',
            en: 'This track has been held since SBES 2015, and previous proceedings are available in the IEEE (2015), ACM (2016 to 2023) and SOL (2024 to 2026) digital libraries.',
          },
        },
      ],
    },
    {
      title: { pt: 'Tópicos de Interesse', en: 'Topics of Interest' },
      blocks: [
        {
          kind: 'p',
          text: {
            pt: 'Serão aceitas submissões relacionadas (mas não limitadas) aos seguintes tópicos:',
            en: 'Submissions are welcome on (but not limited to) the following topics:',
          },
        },
        {
          kind: 'list',
          items: [
            { pt: 'Análise de apps e app stores', en: 'Analysis of apps and app stores' },
            { pt: 'Aprendizado de máquina (ML) com/para engenharia de software', en: 'Machine learning (ML) with/for software engineering' },
            { pt: 'Arquitetura de software e design de produto', en: 'Software architecture and product design' },
            { pt: 'Aspectos econômicos em software', en: 'Economic aspects of software' },
            { pt: 'Aspectos humanos e sociais da engenharia de software', en: 'Human and social aspects of software engineering' },
            { pt: 'Aspectos legais da engenharia de software', en: 'Legal aspects of software engineering' },
            { pt: 'Automatização de tarefas de Engenharia de Software com LLMs e outros foundational models', en: 'Automating Software Engineering tasks with LLMs and other foundation models' },
            { pt: 'Confiabilidade e segurança', en: 'Dependability and safety' },
            { pt: 'Design e Arquitetura de software', en: 'Software design and architecture' },
            { pt: 'Diversidade, inclusão e fairness em software', en: 'Diversity, inclusion and fairness in software' },
            { pt: 'Ecossistemas de software e sistemas de sistemas', en: 'Software ecosystems and systems of systems' },
            { pt: 'Engenharia de release e DevOps', en: 'Release engineering and DevOps' },
            { pt: 'Engenharia de requisitos, modelagem e design', en: 'Requirements engineering, modelling and design' },
            { pt: 'Engenharia de Software Baseada em Busca', en: 'Search-Based Software Engineering' },
            { pt: 'Engenharia de software baseada em multidão (crowd)', en: 'Crowd-based software engineering' },
            { pt: 'Engenharia de software contínua', en: 'Continuous software engineering' },
            { pt: 'Engenharia de software distribuída e colaborativa', en: 'Distributed and collaborative software engineering' },
            { pt: 'Engenharia de software em aplicações industriais', en: 'Software engineering in industrial applications' },
            { pt: 'Engenharia de software na sociedade', en: 'Software engineering in society' },
            { pt: 'Engenharia de software para tecnologias/plataformas específicas (por exemplo, nuvem, IoT, móvel)', en: 'Software engineering for specific technologies/platforms (e.g. cloud, IoT, mobile)' },
            { pt: 'Engenharia reversa', en: 'Reverse engineering' },
            { pt: 'Ética na engenharia de software', en: 'Ethics in software engineering' },
            { pt: 'Evolução e manutenção de software', en: 'Software evolution and maintenance' },
            { pt: 'Feedback, usuário e engenharia de requisitos', en: 'Feedback, users and requirements engineering' },
            { pt: 'Gerenciamento de configurações', en: 'Configuration management' },
            { pt: 'Gestão da dívida técnica', en: 'Technical debt management' },
            { pt: 'Métricas de software e modelos de predição', en: 'Software metrics and prediction models' },
            { pt: 'Mineração de repositórios de software', en: 'Mining software repositories' },
            { pt: 'Modelagem e engenharia orientada a modelos', en: 'Modelling and model-driven engineering' },
            { pt: 'Privacidade e segurança', en: 'Privacy and security' },
            { pt: 'Processos de software e modelos de qualidade', en: 'Software processes and quality models' },
            { pt: 'Produtividade em engenharia de software', en: 'Software engineering productivity' },
            { pt: 'Projeto de qualidade, incluindo privacidade e segurança desde o projeto', en: 'Quality by design, including privacy and security by design' },
            { pt: 'Projeto e evolução de API', en: 'API design and evolution' },
            { pt: 'Refatoração', en: 'Refactoring' },
            { pt: 'Reúso de software', en: 'Software reuse' },
            { pt: 'Serviços de software e sistemas baseados em nuvem', en: 'Software services and cloud-based systems' },
            { pt: 'Sistemas de recomendação', en: 'Recommender systems' },
            { pt: 'Sistemas embarcados e ciberfísicos', en: 'Embedded and cyber-physical systems' },
            { pt: 'Tecnologias verdes e sustentáveis', en: 'Green and sustainable technologies' },
            { pt: 'Variabilidade e linhas de produtos', en: 'Variability and product lines' },
            { pt: 'Verificação, validação e teste de software', en: 'Software verification, validation and testing' },
            { pt: 'Visualização de software', en: 'Software visualisation' },
          ],
        },
      ],
    },
    {
      title: { pt: 'Critérios de Avaliação', en: 'Evaluation Criteria' },
      blocks: [
        {
          kind: 'p',
          text: {
            pt: 'Esta trilha busca contribuições de ponta e disruptivas. Uma submissão para a Trilha de Ideias Inovadoras e Resultados Emergentes do SBES não deve ser encarada como um artigo que seria enviado à Trilha de Pesquisa do SBES, sem uma avaliação forte. Este não é o foco desta trilha! Os trabalhos submetidos a esta trilha serão avaliados de acordo com os seguintes critérios de qualidade, dando especial ênfase à originalidade da contribuição.',
            en: 'This track seeks cutting-edge, disruptive contributions. A submission to the SBES New Ideas and Emerging Results Track should not be seen as a paper that would go to the SBES Research Track without a strong evaluation. That is not the focus of this track! Papers submitted to this track will be evaluated on the following quality criteria, with special emphasis on the originality of the contribution.',
          },
        },
        {
          kind: 'list',
          items: [
            { pt: '**Novidade:** até que ponto as contribuições são suficientemente originais e inovadoras em relação ao estado da arte;', en: '**Novelty:** the extent to which the contributions are sufficiently original and innovative with respect to the state of the art;' },
            { pt: '**Significância:** até que ponto as contribuições do artigo podem impactar a área de Engenharia de Software e sob quais condições (se houver), incluindo forte motivação para demonstrar que é um problema que vale a pena ser tratado;', en: '**Significance:** the extent to which the paper\'s contributions can impact the Software Engineering field and under which conditions (if any), including strong motivation showing that the problem is worth addressing;' },
            { pt: '**Solidez:** até que ponto as contribuições do artigo e os planos dos autores para trabalhos futuros são baseados na aplicação rigorosa de métodos de pesquisa apropriados;', en: '**Soundness:** the extent to which the paper\'s contributions and the authors\' plans for future work rest on the rigorous application of appropriate research methods;' },
            { pt: '**Verificabilidade:** até que ponto o documento inclui informações suficientes para entender como o trabalho proposto funciona e entender como os dados foram obtidos, analisados e interpretados;', en: '**Verifiability:** the extent to which the paper includes enough information to understand how the proposed work functions and how the data was obtained, analysed and interpreted;' },
            { pt: '**Apresentação:** até que ponto a qualidade da redação do artigo atende a altos padrões, incluindo descrições claras, bem como uso adequado do idioma inglês/português, ausência de ambiguidade, figuras e tabelas claramente legíveis e adesão às instruções de formatação fornecidas; e', en: '**Presentation:** the extent to which the writing quality meets high standards, including clear descriptions, proper use of English/Portuguese, absence of ambiguity, clearly legible figures and tables, and adherence to the formatting instructions; and' },
            { pt: '**Reprodutibilidade e Replicabilidade:** até que ponto o documento apóia a verificação ou replicação independente das contribuições alegadas do artigo, dentro das limitações esperadas por um trabalho submetido a esta trilha e considerando as considerações sobre políticas de ciência aberta.', en: '**Reproducibility and Replicability:** the extent to which the paper supports independent verification or replication of its claimed contributions, within the limitations expected of a paper submitted to this track and in light of the open science policies.' },
          ],
        },
      ],
    },
    {
      title: { pt: 'Políticas de Ciência Aberta', en: 'Open Science Policies' },
      blocks: [
        {
          kind: 'p',
          text: {
            pt: 'O SBES 2027 incentiva autores a adotarem princípios e práticas de Ciência Aberta, buscando promover a transparência, a replicabilidade e a reprodutibilidade na pesquisa. Encorajamos todas as pessoas autoras a divulgarem dados/artefatos (anonimizados e curados) para aumentar a reprodutibilidade e replicabilidade. Reconhecemos que a reprodutibilidade ou replicabilidade não é um objetivo em pesquisas qualitativas e que, assim como em estudos industriais, estudos qualitativos frequentemente enfrentam desafios ao compartilhar dados de pesquisa.',
            en: 'SBES 2027 encourages authors to adopt Open Science principles and practices, promoting transparency, replicability and reproducibility in research. We encourage all authors to disclose (anonymised and curated) data/artefacts to increase reproducibility and replicability. We recognise that reproducibility or replicability is not a goal of qualitative research and that, as with industrial studies, qualitative studies often face challenges in sharing research data.',
          },
        },
        {
          kind: 'p',
          text: {
            pt: 'Nesse contexto, seguindo eventos internacionais da área, na submissão à Trilha de Ideias Inovadoras e Resultados Emergentes, autores de artigos que envolvam estudos devem criar uma seção não-numerada intitulada "Disponibilidade de Artefatos" após a seção de "Conclusão" e:',
            en: 'In this context, following international events in the field, authors of New Ideas and Emerging Results Track papers that involve studies must add an unnumbered section titled "Artifact Availability" after the "Conclusion" section and:',
          },
        },
        {
          kind: 'list',
          items: [
            {
              pt: 'Disponibilizem seu artefato ao comitê de programa (via upload de material suplementar ou um link para um repositório anônimo) e forneçam instruções sobre como acessar esses dados no artigo;',
              en: 'Make their artefact available to the program committee (by uploading supplementary material or linking to an anonymous repository) and explain in the paper how to access this data;',
            },
            {
              pt: 'Incluam no artigo uma declaração explícita sobre por que isso não é possível ou desejável; ou',
              en: 'Include in the paper an explicit statement on why this is not possible or desirable; or',
            },
            {
              pt: 'Indiquem por que não pretendem tornar seus dados ou materiais de estudo publicamente disponíveis após a aceitação, se for o caso. O entendimento padrão é que os dados e/ou outros artefatos estarão publicamente disponíveis após a aceitação de um artigo.',
              en: 'State why they do not intend to make their data or study materials publicly available after acceptance, if that is the case. The default understanding is that data and/or other artefacts will be publicly available once a paper is accepted.',
            },
          ],
        },
        {
          kind: 'p',
          text: {
            pt: 'O documento "SBES 2027 - Políticas de Ciência Aberta" (a ser divulgado) apresenta princípios e práticas de Ciência Aberta para apoiar os autores da Trilha de Ideias Inovadoras e Resultados Emergentes do SBES. Durante a preparação do artigo, dúvidas podem ser encaminhadas para os Coordenadores de Ciência Aberta do SBES 2027, sem incorrer em quebra de anonimização do artigo.',
            en: 'The document "SBES 2027 - Open Science Policies" (to be announced) presents Open Science principles and practices to support authors of the SBES New Ideas and Emerging Results Track. While preparing the paper, questions can be sent to the SBES 2027 Open Science Chairs without breaking the paper\'s anonymity.',
          },
        },
      ],
    },
    {
      title: { pt: 'Preparação, Submissão e Revisão do Artigo', en: 'Paper Preparation, Submission and Review' },
      blocks: [
        {
          kind: 'p',
          text: {
            pt: 'Os artigos podem ser escritos em português ou inglês. Submissões em inglês são fortemente encorajadas. Os trabalhos submetidos não devem ter sido submetidos simultaneamente a qualquer outro fórum (conferência ou periódico), nem devem ter sido publicados em outro veículo. Pelo menos um autor de cada trabalho aceito deve se inscrever no CBSoft 2027 e apresentar o artigo durante o simpósio; caso contrário, o trabalho não será incluído nos anais.',
            en: 'Papers may be written in Portuguese or English; submissions in English are strongly encouraged. Submitted papers must not be under simultaneous submission to any other venue (conference or journal), nor have been published elsewhere. At least one author of each accepted paper must register for CBSoft 2027 and present the paper during the symposium; otherwise, the paper will not be included in the proceedings.',
          },
        },
        ...SBES_TEMPLATE_BLOCKS,
        {
          kind: 'p',
          text: {
            pt: 'Os artigos devem ter no máximo 6 (seis) páginas, incluindo figuras (em boa qualidade), tabelas, apêndices e agradecimentos, e até 1 (uma) página adicional para referências. Os artigos devem ser submetidos eletronicamente por meio do JEMS 3 (link a ser divulgado) em Adobe Portable Document Format (PDF).',
            en: 'Papers must have at most 6 (six) pages, including (good-quality) figures, tables, appendices and acknowledgements, plus up to 1 (one) additional page for references. Papers must be submitted electronically through JEMS 3 (link to be announced) in Adobe Portable Document Format (PDF).',
          },
        },
        { kind: 'p', text: { pt: 'O processo de submissão ocorre em duas etapas:', en: 'Submission takes place in two steps:' } },
        {
          kind: 'list',
          items: [
            { pt: '**Registro do artigo:** Deve-se informar o título, autores, resumo, tópicos de interesse e idioma do artigo; e', en: '**Paper registration:** Provide the title, authors, abstract, topics of interest and language of the paper; and' },
            { pt: '**Submissão do artigo completo:** Deve-se submeter o arquivo em formato PDF contendo o artigo.', en: '**Full paper submission:** Submit the PDF file containing the paper.' },
          ],
        },
      ],
    },
    ethicsSection,
    {
      title: { pt: 'Anonimização', en: 'Anonymisation' },
      blocks: [
        {
          kind: 'p',
          text: {
            pt: 'A Trilha de Ideias Inovadoras e Resultados Emergentes do SBES 2027 seguirá um processo de revisão duplo-anônimo. Todos os trabalhos submetidos devem ocultar a identidade dos autores. Ambos os nomes dos autores e afiliações devem ser omitidos. Além disso, as seguintes regras devem ser abordadas:',
            en: 'The SBES 2027 New Ideas and Emerging Results Track will follow a double-anonymous review process. All submitted papers must hide the authors\' identities; both the authors\' names and affiliations must be omitted. In addition, the following rules must be followed:',
          },
        },
        {
          kind: 'list',
          items: [
            {
              pt: 'As citações a trabalhos relacionados dos próprios autores devem ser escritas em terceira pessoa. Por exemplo, deve-se escrever "o trabalho anterior de Silva et al." em oposição ao "em nosso trabalho anterior". Deve-se também evitar a ocorrência de termos que possam identificar os autores, por exemplo, "nós", "nosso", "financiamento", "Universidade", "GitHub", etc;',
              en: 'Citations of the authors\' own related work must be written in the third person. For example, write "the previous work by Silva et al." rather than "in our previous work". Terms that could identify the authors must also be avoided, e.g. "we", "our", "funding", "University", "GitHub", etc.;',
            },
            {
              pt: 'O artigo submetido não deve mencionar artefatos em repositórios ou websites que possibilitem a identificação dos autores. A disponibilização de artefatos da pesquisa deve ser feita de forma anônima. Para anonimizar repositórios hospedados na plataforma GitHub, sugere-se o uso do serviço [Anonymous GitHub](https://anonymous.4open.science/);',
              en: 'The submitted paper must not mention artefacts in repositories or websites that allow the authors to be identified. Research artefacts must be shared anonymously. To anonymise repositories hosted on GitHub, we suggest the [Anonymous GitHub](https://anonymous.4open.science/) service;',
            },
            {
              pt: 'Os revisores não serão encorajados a procurar referências que identifiquem os autores em outras fontes. Buscas em bibliotecas digitais ou artefatos existentes não invalidam as regras de duplo-anônimo; e',
              en: 'Reviewers will not be encouraged to look for references that identify the authors in other sources. Searches in digital libraries or existing artefacts do not invalidate the double-anonymous rules; and',
            },
            {
              pt: 'Se o artigo submetido apresentar uma evolução de um trabalho anterior, deve-se anonimizar a referência a esse trabalho. Por exemplo, "baseado no trabalho de Silva et al." deve ser substituído por "baseado em um trabalho anterior [Ref]" e a referência não deve ser apresentada na íntegra no final do artigo. Por favor, indique a referência como "[Ref] referência omitida devido à revisão anônima." na seção de referências bibliográficas.',
              en: 'If the submitted paper extends previous work, the reference to that work must be anonymised. For example, "based on the work of Silva et al." must be replaced by "based on previous work [Ref]", and the full reference must not appear at the end of the paper. Please list it as "[Ref] reference omitted for anonymous review." in the bibliography.',
            },
          ],
        },
        {
          kind: 'p',
          text: {
            pt: 'Em caso de aceitação do artigo, as informações omitidas devem ser incluídas na versão final.',
            en: 'If the paper is accepted, the omitted information must be included in the final version.',
          },
        },
        {
          kind: 'p',
          text: {
            pt: 'Dúvidas sobre a preparação de artigos segundo as regras de anonimização do SBES podem ser enviadas para os Coordenadores do Comitê de Programa.',
            en: 'Questions about preparing papers under the SBES anonymisation rules can be sent to the Program Committee Chairs.',
          },
        },
      ],
    },
    SBES_AI_POLICY,
    sbesDisqualification(SBES_IDEAS),
    {
      title: { pt: 'Prêmio de Revisor de Destaque', en: 'Distinguished Reviewer Award' },
      blocks: [
        {
          kind: 'p',
          text: {
            pt: 'A Trilha de Ideias Inovadoras e Resultados Emergentes reconhece a generosidade dos membros do Comitê de Programa que dedicam tempo e esforço para revisar os trabalhos submetidos. Um certificado de Revisor de Destaque vai ser concedido aos revisores que submeterem revisões no prazo, com qualidade técnica, atendendo os critérios de avaliação da trilha, e que participem ativamente nas discussões que envolvem o Comitê de Programa.',
            en: 'The New Ideas and Emerging Results Track recognises the generosity of the Program Committee members who devote time and effort to reviewing the submitted papers. A Distinguished Reviewer certificate will be awarded to reviewers who submit timely, technically sound reviews that follow the track\'s evaluation criteria, and who take an active part in the Program Committee discussions.',
          },
        },
      ],
    },
    {
      title: { pt: 'Informações Gerais', en: 'General Information' },
      blocks: [
        {
          kind: 'p',
          text: {
            pt: 'A publicação do trabalho implica em pelo menos um autor se inscrever e participar PRESENCIALMENTE do SBES 2027 em Belo Horizonte para apresentar o artigo. A apresentação do artigo é obrigatória para todos os artigos aceitos. O formato e o horário das apresentações serão anunciados posteriormente.',
            en: 'Publication requires at least one author to register for and attend SBES 2027 IN PERSON in Belo Horizonte to present the paper. Presentation is mandatory for all accepted papers. The format and schedule of the presentations will be announced later.',
          },
        },
      ],
    },
  ],
  milestones: [
    { label: { pt: 'Registro do artigo (submissão do resumo)', en: 'Paper registration (abstract submission)' }, date: null, hard: true },
    { label: { pt: 'Submissão de artigo', en: 'Paper submission' }, date: null, hard: true },
    { label: { pt: 'Envio de notificação aos autores', en: 'Author notification' }, date: null },
    { label: { pt: 'Submissão da versão final', en: 'Camera-ready submission' }, date: null },
  ],
  chairs: [PLACEHOLDER_MEMBER, PLACEHOLDER_MEMBER],
  committees: [{ members: PLACEHOLDER_COMMITTEE }],
};

/** SBES 2027 Tools Track (single-anonymous, paper + demo video). */
const SBES_TOOLS_CALL: SymposiumCall = {
  intro: [
    {
      pt: 'A Trilha de Ferramentas é uma parte importante do Simpósio Brasileiro de Engenharia de Software (SBES). O objetivo desta trilha é fornecer um fórum para apresentação e demonstração de ferramentas que visam dar suporte a qualquer aspecto relacionado à engenharia de software. A trilha consiste em apresentações teóricas e demonstrações de ferramentas, favorecendo a discussão entre os autores das ferramentas e os participantes do SBES, tanto da academia quanto da indústria.',
      en: 'The Tools Track is an important part of the Brazilian Symposium on Software Engineering (SBES). Its goal is to provide a forum for presenting and demonstrating tools that support any aspect of software engineering. The track consists of talks and tool demonstrations, fostering discussion between tool authors and SBES participants from both academia and industry.',
    },
    {
      pt: 'Pesquisadores são encorajados a submeter ferramentas resultantes de seus projetos de pesquisa aplicada, enquanto profissionais podem apresentar ferramentas comerciais ou internas que trouxeram ganhos de produtividade e/ou qualidade a processos de desenvolvimento de software.',
      en: 'Researchers are encouraged to submit tools resulting from their applied research projects, while practitioners may present commercial or in-house tools that brought productivity and/or quality gains to software development processes.',
    },
  ],
  sections: [
    {
      title: { pt: 'Preparação e Submissão do Artigo/Vídeo', en: 'Paper/Video Preparation and Submission' },
      blocks: [
        {
          kind: 'p',
          text: {
            pt: 'Convidamos autores a enviarem artigos descrevendo ferramentas de apoio a diversos aspectos e necessidades relacionados aos tópicos de interesse e temas listados na chamada de trabalhos da Trilha de Pesquisa do SBES, incluindo ferramentas que apoiem:',
            en: 'We invite authors to submit papers describing tools that support the various aspects and needs related to the topics of interest listed in the SBES Research Track call for papers, including tools that support:',
          },
        },
        {
          kind: 'list',
          items: [
            { pt: 'Atividades do processo de desenvolvimento de software (especificação, design e implementação, validação e verificação, e evolução);', en: 'Software development process activities (specification, design and implementation, validation and verification, and evolution);' },
            { pt: 'Atividades de apoio ao processo de desenvolvimento de software (e.g., gestão de projetos e gerência de configuração);', en: 'Activities supporting the software development process (e.g. project management and configuration management);' },
            { pt: 'Pesquisa em Engenharia de Software (e.g., condução de estudos experimentais ou revisões sistemáticas da literatura).', en: 'Software Engineering research (e.g. conducting experimental studies or systematic literature reviews).' },
          ],
        },
        {
          kind: 'p',
          text: {
            pt: 'Cada submissão consiste em um artigo acompanhado por um vídeo de demonstração da ferramenta. A submissão de trabalhos deve estar em conformidade com as seguintes instruções de envio e formatação:',
            en: 'Each submission consists of a paper accompanied by a demonstration video of the tool. Submissions must comply with the following submission and formatting instructions:',
          },
        },
        {
          kind: 'list',
          items: [
            { pt: 'O artigo deve ser original e não estar submetido ou ter sido publicado em outros veículos acadêmicos.', en: 'The paper must be original and not under submission or published in other academic venues.' },
            { pt: 'O artigo deve incluir claramente:', en: 'The paper must clearly include:' },
          ],
        },
        {
          kind: 'list',
          items: [
            { pt: 'Descrição da motivação/problema abordado pela ferramenta;', en: 'A description of the motivation/problem addressed by the tool;' },
            { pt: 'Descrição das principais funcionalidades e potenciais usuários da ferramenta;', en: 'A description of the tool\'s main features and potential users;' },
            { pt: 'Exemplo de uso e capturas de tela ilustrando a interface da ferramenta (quando aplicável);', en: 'A usage example and screenshots illustrating the tool\'s interface (when applicable);' },
            { pt: 'Descrição da arquitetura da ferramenta, seus componentes principais e suas interfaces;', en: 'A description of the tool\'s architecture, its main components and their interfaces;' },
            { pt: 'Uma breve comparação com ferramentas relacionadas existentes; e', en: 'A brief comparison with existing related tools; and' },
            { pt: 'Tipo de licença de software.', en: 'The type of software licence.' },
          ],
        },
        SBES_TEMPLATE_INTRO,
        { kind: 'code', code: '\\documentclass[sigconf]{acmart}' },
        ...SBES_CONFERENCE_BLOCKS,
        {
          kind: 'list',
          items: [
            {
              pt: 'Os artigos devem ter no máximo 6 (seis) páginas, incluindo figuras (em boa qualidade), tabelas, apêndices e agradecimentos, e até 1 (uma) página adicional para referências. Os artigos podem ser escritos em português ou inglês. Os artigos devem ser submetidos em Adobe Portable Document Format (PDF).',
              en: 'Papers must have at most 6 (six) pages, including (good-quality) figures, tables, appendices and acknowledgements, plus up to 1 (one) additional page for references. Papers may be written in Portuguese or English and must be submitted in Adobe Portable Document Format (PDF).',
            },
            {
              pt: 'Um link para um vídeo de demonstração com alta resolução com áudio descrevendo os passos (os detalhes da funcionalidade da ferramenta devem estar claramente visíveis) DEVE constar no final do resumo do artigo. O vídeo de demonstração deve ter duração de três a cinco minutos e deve mostrar o uso da ferramenta, destacando suas principais contribuições. O vídeo deve também fornecer uma visão geral da ferramenta, seus objetivos e usuários em potencial, além das principais características e resultados.',
              en: 'A link to a high-resolution demonstration video with audio describing the steps (details of the tool\'s functionality must be clearly visible) MUST appear at the end of the paper\'s abstract. The demonstration video must be three to five minutes long and show the tool in use, highlighting its main contributions. The video must also give an overview of the tool, its goals and potential users, as well as its main features and results.',
            },
            {
              pt: 'O vídeo de demonstração deve ser hospedado em um local com armazenamento permanente (repositórios digitais preservados, como zenodo.org, figshare.com, www.softwareheritage.org, osf.io). Encoraja-se também hospedar uma versão do vídeo em plataformas de streaming (por exemplo, YouTube, Vimeo) para facilitar a visualização dos revisores e do público em geral.',
              en: 'The demonstration video must be hosted with permanent storage (preserved digital repositories such as zenodo.org, figshare.com, www.softwareheritage.org, osf.io). Hosting a copy on streaming platforms (e.g. YouTube, Vimeo) is also encouraged, to make viewing easier for reviewers and the public.',
            },
            {
              pt: 'Os autores são fortemente incentivados a tornar o código e os conjuntos de dados de suas ferramentas acadêmicas de código aberto e fornecer um URL para eles com a submissão. Mais uma vez, deve-se dar preferência ao uso de repositórios digitais preservados (por exemplo, zenodo.org, figshare.com, www.softwareheritage.org). Para o caso de ferramentas internas, autores são aconselhados a proverem uma explicação clara das razões para manter a ferramenta proprietária ao invés de open source.',
              en: 'Authors are strongly encouraged to open-source the code and datasets of their academic tools and provide a URL for them with the submission. Again, preserved digital repositories (e.g. zenodo.org, figshare.com, www.softwareheritage.org) are preferred. For in-house tools, authors are advised to clearly explain why the tool is kept proprietary rather than open source.',
            },
            {
              pt: 'A demonstração deve apresentar a ferramenta com áudio no mesmo idioma em que o artigo foi escrito.',
              en: 'The demonstration must present the tool with audio in the same language the paper is written in.',
            },
            {
              pt: 'A Trilha de Ferramentas usará o modelo de revisão anônima simples ("single-anonymous") e, portanto, as identidades dos autores devem aparecer nos materiais enviados.',
              en: 'The Tools Track will use single-anonymous review, so the authors\' identities must appear in the submitted materials.',
            },
            {
              pt: 'Os artigos devem ser submetidos eletronicamente por meio do JEMS 3 (link a ser divulgado).',
              en: 'Papers must be submitted electronically through JEMS 3 (link to be announced).',
            },
          ],
        },
        {
          kind: 'p',
          text: {
            pt: 'Submissões que não incluam um artigo BEM COMO um vídeo de demonstração, que não estejam em conformidade com o formato de envio necessário, que estejam fora do escopo da trilha ou que tenham sido submetidos ou publicados em qualquer outro fórum (conferência ou revista), serão rejeitadas sem revisão e os coordenadores do(s) outro(s) fóruns serão notificados. Todos os outros trabalhos serão revisados por pelo menos três membros do comitê do programa.',
            en: 'Submissions that do not include a paper AS WELL AS a demonstration video, that do not comply with the required format, that are out of the track\'s scope, or that have been submitted or published in any other venue (conference or journal) will be rejected without review, and the chairs of the other venue(s) will be notified. All other papers will be reviewed by at least three program committee members.',
          },
        },
      ],
    },
    ethicsSection,
    SBES_AI_POLICY,
    {
      title: { pt: 'Critérios de Avaliação', en: 'Evaluation Criteria' },
      blocks: [
        { kind: 'p', text: { pt: 'Cada submissão será analisada de acordo com os critérios de avaliação abaixo:', en: 'Each submission will be assessed on the following criteria:' } },
        {
          kind: 'list',
          items: [
            { pt: 'a relevância da ferramenta proposta para o público do SBES;', en: 'the relevance of the proposed tool to the SBES audience;' },
            { pt: 'a novidade/originalidade da ferramenta e como ela se relaciona com esforços anteriores da indústria ou da academia;', en: 'the novelty/originality of the tool and how it relates to previous industry or academic efforts;' },
            { pt: 'a qualidade da apresentação da ferramenta no artigo e no vídeo associado; e', en: 'the quality of the tool\'s presentation in the paper and the accompanying video; and' },
            { pt: 'o grau em que considera a literatura relevante.', en: 'the extent to which it considers the relevant literature.' },
          ],
        },
      ],
    },
    {
      title: { pt: 'Desclassificação de Artigos', en: 'Paper Disqualification' },
      blocks: [
        {
          kind: 'p',
          text: {
            pt: 'Artigos fora do escopo da Trilha de Ferramentas do SBES 2027 ou que não estiverem em conformidade com o formato exigido e demais regras serão desclassificados e rejeitados sem passar pelo processo de revisão.',
            en: 'Papers outside the scope of the SBES 2027 Tools Track, or that do not comply with the required format and other rules, will be disqualified and rejected without review.',
          },
        },
        ...sbesDisqualification(SBES_TOOLS).blocks.slice(1),
      ],
    },
    {
      title: { pt: 'Informações Gerais', en: 'General Information' },
      blocks: [
        {
          kind: 'p',
          text: {
            pt: 'A publicação do trabalho implica em pelo menos um autor se inscrever (de acordo com as regras de inscrição estabelecidas pela organização local do evento) e participar PRESENCIALMENTE do SBES 2027 em Belo Horizonte para apresentar o artigo e a ferramenta. A apresentação do artigo e a demonstração da ferramenta são obrigatórias para todas as ferramentas aceitas. Demonstrações de ferramentas devem ser PRESENCIALMENTE e os vídeos de demonstração enviados NÃO devem ser usados. O formato e o horário das apresentações serão anunciados posteriormente. Os artigos aceitos que não forem apresentados não serão incluídos nos anais do SBES 2027.',
            en: 'Publication requires at least one author to register (under the registration rules set by the local organisers) and attend SBES 2027 IN PERSON in Belo Horizonte to present the paper and the tool. Presenting the paper and demonstrating the tool are mandatory for all accepted tools. Tool demonstrations must be IN PERSON, and the submitted demonstration videos must NOT be used. The format and schedule of the presentations will be announced later. Accepted papers that are not presented will not be included in the SBES 2027 proceedings.',
          },
        },
      ],
    },
    {
      title: { pt: 'Prêmio Artigo de Destaque', en: 'Distinguished Paper Award' },
      blocks: [
        {
          kind: 'p',
          text: {
            pt: 'O SBES 2027 premiará o melhor artigo da Trilha de Ferramentas. O artigo premiado será anunciado durante a abertura do CBSoft 2027.',
            en: 'SBES 2027 will award the best paper of the Tools Track. The awarded paper will be announced at the CBSoft 2027 opening.',
          },
        },
      ],
    },
    sbesReviewerAward(SBES_TOOLS),
  ],
  milestones: [
    { label: { pt: 'Registro do artigo (submissão do resumo)', en: 'Paper registration (abstract submission)' }, date: null, hard: true },
    { label: { pt: 'Submissão de artigo e vídeo', en: 'Paper and video submission' }, date: null, hard: true },
    { label: { pt: 'Envio de notificação aos autores', en: 'Author notification' }, date: null },
    { label: { pt: 'Submissão da versão final', en: 'Camera-ready submission' }, date: null },
  ],
  chairs: [PLACEHOLDER_MEMBER, PLACEHOLDER_MEMBER],
  committees: [{ members: PLACEHOLDER_COMMITTEE }],
};

/** SBES 2027 Industry Track (industry talks, extended abstracts). */
const SBES_INDUSTRY_CALL: SymposiumCall = {
  intro: [
    {
      pt: 'A Trilha da Indústria do Simpósio Brasileiro de Engenharia de Software 2027 tem por objetivo fomentar a cooperação entre a academia, o mercado e o governo, com palestras, artigos e discussões. Ela visa reunir profissionais dos três setores para compartilhar seus conhecimentos e suas experiências com a comunidade.',
      en: 'The Industry Track of the 2027 Brazilian Symposium on Software Engineering aims to foster cooperation between academia, industry and government through talks, papers and discussions. It brings together professionals from the three sectors to share their knowledge and experience with the community.',
    },
    {
      pt: 'Essa é uma excelente oportunidade para estabelecer relações de cooperação entre a comunidade acadêmica e as comunidades de profissionais. É ainda uma oportunidade para estabelecer relações de pesquisa aplicada, fomentando o desenvolvimento do mercado e a inovação com transferência de tecnologias.',
      en: 'This is an excellent opportunity to build cooperation between the academic community and practitioner communities. It is also an opportunity to establish applied research partnerships, fostering market development and innovation through technology transfer.',
    },
  ],
  sections: [
    {
      title: { pt: 'Chamada de Apresentações (Industry Talks)', en: 'Call for Industry Talks' },
      blocks: [
        {
          kind: 'p',
          text: {
            pt: 'A trilha está aberta para acadêmicos e profissionais do setor produtivo (organizações públicas ou privadas) que queiram compartilhar suas experiências ("experience reports") ou seus conhecimentos teóricos e tecnológicos e conjuntamente identificar possibilidades no desenvolvimento de redes de colaboração e de pesquisa na relação entre academia e empresas.',
            en: 'The track is open to academics and practitioners from industry (public or private organisations) who want to share their experience ("experience reports") or their theoretical and technological knowledge, and jointly identify opportunities to build collaboration and research networks between academia and companies.',
          },
        },
        {
          kind: 'p',
          text: {
            pt: 'Submissões de propostas de apresentações sobre experiências práticas com desenvolvimento de plataformas, sistemas, ferramentas, aplicativos e produtos de código aberto, que descrevam desafios de mercado (problemas em aberto) e soluções aplicáveis à indústria, são bem-vindas.',
            en: 'Talk proposals on practical experience developing platforms, systems, tools, applications and open source products, describing market challenges (open problems) and solutions applicable to industry, are welcome.',
          },
        },
        {
          kind: 'p',
          text: {
            pt: 'Exemplos de tópicos de interesse incluem - mas não se limitam a:',
            en: 'Example topics of interest include, but are not limited to:',
          },
        },
        {
          kind: 'list',
          items: [
            { pt: 'Engenharia de software empírica / experimental, como aplicações ou uso de ferramentas, diferentes processos e práticas de software e como elas impactaram a organização', en: 'Empirical / experimental software engineering, such as applying or using tools, different software processes and practices, and how they affected the organisation' },
            { pt: 'Detalhamento de ferramentas internas, suas decisões arquiteturais e de usabilidade, e impacto na produtividade do time e resiliência da aplicação', en: 'In-depth looks at in-house tools, their architecture and usability decisions, and their impact on team productivity and application resilience' },
            { pt: 'Práticas, processos e ferramentas relacionadas a testes e resiliência de software', en: 'Practices, processes and tools for software testing and resilience' },
            { pt: 'Engenharia de Software para Inteligência Artificial e Inteligência Artificial para Engenharia de Software', en: 'Software Engineering for Artificial Intelligence and Artificial Intelligence for Software Engineering' },
            { pt: 'Arquiteturas para sistemas multi-cloud', en: 'Architectures for multi-cloud systems' },
            { pt: 'Engenharia de software seguro', en: 'Secure software engineering' },
            { pt: 'Engenharia para sustentabilidade e otimização energética', en: 'Engineering for sustainability and energy optimisation' },
            { pt: 'Reflexões sobre interação academia-indústria, modelos, métodos, e lições aprendidas', en: 'Reflections on academia-industry interaction, models, methods and lessons learned' },
          ],
        },
      ],
    },
    {
      title: { pt: 'Preparando a Submissão', en: 'Preparing the Submission' },
      blocks: [
        {
          kind: 'p',
          text: {
            pt: '**Resumo Estendido da Apresentação (2 a 4 páginas)**',
            en: '**Extended Abstract of the Talk (2 to 4 pages)**',
          },
        },
        {
          kind: 'p',
          text: {
            pt: 'Os resumos estendidos deverão conter os seguintes elementos, utilizando o modelo da conferência:',
            en: 'Extended abstracts must contain the following elements, using the conference template:',
          },
        },
        {
          kind: 'list',
          items: [
            { pt: 'Resumo', en: 'Abstract' },
            { pt: 'Relato da Apresentação contendo:', en: 'Account of the talk, containing:' },
          ],
        },
        {
          kind: 'list',
          items: [
            { pt: 'Relevância, impacto e benefícios da apresentação para a indústria de software;', en: 'Relevance, impact and benefits of the talk for the software industry;' },
            { pt: 'Para as apresentações que discorrem sobre desafios, conter clareza na descrição do problema, incluindo motivação, contexto e dificuldades;', en: 'For talks about challenges, a clear description of the problem, including motivation, context and difficulties;' },
            { pt: 'Para as apresentações que discorrem sobre soluções para o mercado, descrição da aplicabilidade da solução e indicadores de sucesso (por exemplo, prova de conceito, protótipo, etc.);', en: 'For talks about market solutions, a description of the solution\'s applicability and success indicators (e.g. proof of concept, prototype, etc.);' },
            { pt: 'Pequenas provas de evidência, como questionários ou números mostrando o impacto da solução discutida na equipe de desenvolvimento de software', en: 'Small pieces of evidence, such as surveys or figures showing the impact of the discussed solution on the software development team' },
          ],
        },
        {
          kind: 'list',
          items: [{ pt: 'Referências Bibliográficas', en: 'References' }],
        },
        {
          kind: 'p',
          text: {
            pt: 'As propostas de apresentações serão revisadas e selecionadas pelo Comitê Técnico da Trilha da Indústria do SBES 2027 e as aprovadas terão seus resumos publicados nos anais estendidos do SBES 2027. Pelo menos um autor ou autora de cada trabalho selecionado deverá fazer sua inscrição no SBES 2027 para participar do evento.',
            en: 'Talk proposals will be reviewed and selected by the SBES 2027 Industry Track Technical Committee, and the abstracts of accepted proposals will be published in the SBES 2027 extended proceedings. At least one author of each selected paper must register for SBES 2027 to attend the event.',
          },
        },
        {
          kind: 'p',
          text: {
            pt: 'Por essa ser uma trilha dedicada a trabalhos feitos em contexto industrial e por pessoas que trabalhavam ativamente na indústria, é obrigatório:',
            en: 'As this track is dedicated to work done in an industrial context by people actively working in industry, the following is mandatory:',
          },
        },
        {
          kind: 'list',
          items: [
            { pt: 'Pelo menos 50% dos autores do artigo devem ser da indústria ou governo', en: 'At least 50% of the paper\'s authors must be from industry or government' },
            { pt: 'O apresentador do trabalho também deve ser o autor(a) da indústria ou governo', en: 'The presenter must also be an author from industry or government' },
          ],
        },
        {
          kind: 'p',
          text: {
            pt: 'Note que os trabalhos também podem ser submetidos mesmo sem a participação de pessoas da academia. Caso o time de autores ou a empresa tenha interesse em submeter, mas não tenha experiência em escrever trabalhos para essa trilha, os organizadores estão à disposição para conversar.',
            en: 'Note that papers can also be submitted without any academic co-authors. If the author team or company is interested in submitting but has no experience writing papers for this track, the organisers are happy to talk.',
          },
        },
        {
          kind: 'p',
          text: {
            pt: 'A submissão do trabalho será exclusivamente eletrônica, através do sistema JEMS (link a ser divulgado). As submissões podem ser redigidas em inglês ou português.',
            en: 'Submission is electronic only, through the JEMS system (link to be announced). Submissions may be written in English or Portuguese.',
          },
        },
      ],
    },
    ethicsSection,
    {
      title: { pt: 'Em Caso de Aceite', en: 'If Accepted' },
      blocks: [
        {
          kind: 'p',
          text: {
            pt: 'É obrigatório o envio do Termo de Autorização de Publicação de Artigos da SBC, o qual deve ser assinado por um dos autores de cada artigo aceito. É necessário também preencher o formulário eletrônico de coleta de metadados para cada artigo aceito.',
            en: 'The SBC Paper Publication Authorisation Form must be sent, signed by one of the authors of each accepted paper. The electronic metadata collection form must also be filled in for each accepted paper.',
          },
        },
      ],
    },
  ],
  milestones: [
    { label: { pt: 'Registro do artigo (envio do resumo)', en: 'Paper registration (abstract submission)' }, date: null },
    { label: { pt: 'Submissão do artigo', en: 'Paper submission' }, date: null },
    { label: { pt: 'Notificação Final de Aceitação', en: 'Final notification of acceptance' }, date: null },
    { label: { pt: 'Envio da Versão Final', en: 'Camera-ready submission' }, date: null },
  ],
  datesNote: {
    pt: 'Nota: Os deadlines de todas as datas são fixos e eles não serão postergados.',
    en: 'Note: all deadlines are fixed and will not be extended.',
  },
  chairs: [PLACEHOLDER_MEMBER, PLACEHOLDER_MEMBER, PLACEHOLDER_MEMBER],
  committees: [{ members: PLACEHOLDER_COMMITTEE }],
};

/** VIII CTIC-ES (undergraduate and high-school research competition). The
 *  2026 call was the VII edition. */
const SBES_CTIC_CALL: SymposiumCall = {
  intro: [
    {
      pt: 'O VIII Concurso de Trabalhos de Iniciação Científica do Simpósio Brasileiro de Engenharia de Software (CTIC-ES) é um evento que visa promover a discussão e divulgação de trabalhos de pesquisa em Engenharia de Software realizados no escopo da graduação e ensino médio (ou técnico). Além disso, o concurso busca a integração entre pesquisadores e futuros pesquisadores durante o Congresso Brasileiro de Software (CBSoft 2027), em datas a definir.',
      en: 'The 8th Undergraduate Research Competition of the Brazilian Symposium on Software Engineering (CTIC-ES) aims to promote the discussion and dissemination of Software Engineering research carried out in undergraduate and high-school (or technical school) programmes. The competition also seeks to bring researchers and future researchers together during the Brazilian Conference on Software (CBSoft 2027), on dates to be announced.',
    },
    {
      pt: 'O CTIC-ES busca selecionar trabalhos desenvolvidos por discentes de graduação e ensino médio (ou técnico) que serão premiados e publicados nos anais do CBSoft 2027. Assim, o CTIC-ES tem como objetivo incentivar alunos de todos os cursos de graduação em Computação e áreas afins, bem como estudantes do ensino médio ou técnico na área de Computação, a produzir e submeter textos científicos originais sobre trabalhos realizados por eles em temas relacionados à Engenharia de Software. Os trabalhos podem ser resultantes de participação em programas de iniciação científica, iniciação tecnológica ou trabalhos de conclusão de curso.',
      en: 'CTIC-ES selects work by undergraduate and high-school (or technical school) students, which will be awarded and published in the CBSoft 2027 proceedings. CTIC-ES thus aims to encourage students from every undergraduate programme in Computing and related fields, as well as high-school or technical students in Computing, to write and submit original scientific texts about their own work on Software Engineering topics. The work may come from undergraduate research programmes, technology initiation programmes or final-year projects.',
    },
    {
      pt: 'No caso de dúvidas, contactar os organizadores, xxxxxx (xxxxxx) e xxxxxx (xxxxxx).',
      en: 'For questions, contact the organisers, xxxxxx (xxxxxx) and xxxxxx (xxxxxx).',
    },
  ],
  sections: [
    {
      title: { pt: 'Tópicos de Interesse', en: 'Topics of Interest' },
      blocks: [
        {
          kind: 'p',
          text: {
            pt: 'Serão aceitas submissões de trabalhos desenvolvidos por alunos de graduação e ensino médio (ou técnico) relacionadas (mas não limitadas) a:',
            en: 'Submissions of work by undergraduate and high-school (or technical) students are welcome on (but not limited to):',
          },
        },
        {
          kind: 'list',
          items: [
            { pt: 'Aplicações industriais de engenharia de software;', en: 'Industrial applications of software engineering;' },
            { pt: 'Arquitetura de software;', en: 'Software architecture;' },
            { pt: 'Aspectos humanos e sociais da engenharia de software;', en: 'Human and social aspects of software engineering;' },
            { pt: 'Desenvolvimento ágil de software;', en: 'Agile software development;' },
            { pt: 'Desenvolvimento de aplicativos móveis;', en: 'Mobile application development;' },
            { pt: 'Desenvolvimento de software orientado por modelo;', en: 'Model-driven software development;' },
            { pt: 'Ecossistemas de software e sistemas de sistemas;', en: 'Software ecosystems and systems of systems;' },
            { pt: 'Engenharia de requisitos;', en: 'Requirements engineering;' },
            { pt: 'Engenharia de software baseada em busca;', en: 'Search-based software engineering;' },
            { pt: 'Engenharia de software experimental;', en: 'Experimental software engineering;' },
            { pt: 'Engenharia de software para computação em nuvem e Web;', en: 'Software engineering for cloud and Web computing;' },
            { pt: 'Engenharia de software para Inteligência Artificial;', en: 'Software engineering for Artificial Intelligence;' },
            { pt: 'Engenharia de software para Desenvolvimento de Jogos;', en: 'Software engineering for Game Development;' },
            { pt: 'Fundamentos teóricos e métodos formais;', en: 'Theoretical foundations and formal methods;' },
            { pt: 'Gerenciamento de configurações e implantação de software;', en: 'Configuration management and software deployment;' },
            { pt: 'Gestão de dívida técnica;', en: 'Technical debt management;' },
            { pt: 'Inteligência artificial para Engenharia de Software;', en: 'Artificial intelligence for Software Engineering;' },
            { pt: 'Linhas de produtos de software;', en: 'Software product lines;' },
            { pt: 'Manutenção e evolução de software;', en: 'Software maintenance and evolution;' },
            { pt: 'Métricas e medição de software;', en: 'Software metrics and measurement;' },
            { pt: 'Mineração de repositórios de software e análise de software;', en: 'Mining software repositories and software analytics;' },
            { pt: 'Modularidade de software;', en: 'Software modularity;' },
            { pt: 'Processos de software;', en: 'Software processes;' },
            { pt: 'Qualidade de software e modelos de qualidade;', en: 'Software quality and quality models;' },
            { pt: 'Reengenharia de software;', en: 'Software reengineering;' },
            { pt: 'Reutilização de software;', en: 'Software reuse;' },
            { pt: 'Serviços e microsserviços;', en: 'Services and microservices;' },
            { pt: 'Software livre;', en: 'Free and open source software;' },
            { pt: 'Startups de software;', en: 'Software startups;' },
            { pt: 'Teste e verificação de software;', en: 'Software testing and verification;' },
            { pt: 'Valor de negócio e validação de software.', en: 'Business value and software validation.' },
          ],
        },
      ],
    },
    {
      ...SBES_AI_POLICY,
      blocks: [
        {
          kind: 'p',
          text: {
            pt: 'Ao submeterem trabalhos ao VIII CTIC-ES, as pessoas autoras reconhecem que estão em conformidade com a política de uso de IA Generativa, baseada nas políticas existentes propostas pela IEEE, ACM, e Springer.',
            en: 'By submitting papers to the 8th CTIC-ES, authors acknowledge that they comply with the generative AI policy, based on existing policies from IEEE, ACM and Springer.',
          },
        },
        ...SBES_AI_POLICY.blocks.slice(1),
      ],
    },
    {
      title: { pt: 'Critérios para Participação', en: 'Eligibility' },
      blocks: [
        {
          kind: 'p',
          text: {
            pt: 'Podem participar do VIII CTIC-ES estudantes matriculados em cursos de graduação, ensino médio ou técnico nos anos de 2026 ou 2027 em Instituições de Ensino Superior (IES), Escolas de Ensino Médio ou Instituições de Ensino Técnico brasileiras. A situação de aluno regularmente matriculado ou recém-formado deve ser comprovada com documentação apropriada, ou seja:',
            en: 'The 8th CTIC-ES is open to students enrolled in undergraduate, high-school or technical programmes in 2026 or 2027 at Brazilian Higher Education Institutions, High Schools or Technical Schools. Current enrolment or recent graduation must be proven with appropriate documents, namely:',
          },
        },
        {
          kind: 'list',
          items: [
            { pt: 'Para discentes que não concluíram o curso: comprovante de matrícula ou histórico escolar.', en: 'For students who have not graduated: proof of enrolment or academic transcript.' },
            { pt: 'Para discentes recém-formados: certificado de conclusão do curso ou declaração emitida pela instituição de ensino e histórico escolar.', en: 'For recent graduates: graduation certificate or a statement from the institution, plus the academic transcript.' },
            { pt: 'O comprovante deverá ser enviado por meio da plataforma de submissão de trabalhos.', en: 'The proof must be sent through the submission platform.' },
          ],
        },
        {
          kind: 'p',
          text: {
            pt: 'No caso do trabalho ser integrante de um projeto mais amplo, o conteúdo do trabalho escrito deve permitir identificar, de forma clara, os limites de desenvolvimento, como o trabalho se relaciona às demais atividades do projeto maior e quais foram efetivamente as ações e a contribuição específica da pessoa discente de graduação ou grupo de pessoas discentes de graduação.',
            en: 'If the work is part of a larger project, the paper must clearly show the boundaries of the work, how it relates to the other activities of the larger project, and what the specific actions and contribution of the undergraduate student or group of students were.',
          },
        },
      ],
    },
    {
      title: { pt: 'Submissão de Trabalhos', en: 'Submission' },
      blocks: [
        {
          kind: 'p',
          text: {
            pt: 'O trabalho deverá conter no máximo 6 páginas, e no mínimo 3 páginas, sendo aceitos somente artigos em formato PDF utilizando o modelo da conferência. A submissão dos trabalhos será exclusivamente eletrônica, através do sistema JEMS de submissões de artigos da SBC (link a ser divulgado).',
            en: 'Papers must have at least 3 and at most 6 pages; only PDF papers using the conference template are accepted. Submission is electronic only, through SBC\'s JEMS paper submission system (link to be announced).',
          },
        },
        {
          kind: 'p',
          text: {
            pt: 'Os nomes dos autores devem ser incluídos no artigo submetido. O(a) aluno(a) deve figurar como o(a) primeiro(a) autor(a). Software, ferramentas, e coleta de dados devem ser apresentados no artigo através de links para os repositórios. Os autores são encorajados a disponibilizar pacotes com dados abertos (replication package) que facilitem a reprodutibilidade do trabalho.',
            en: 'The authors\' names must be included in the submitted paper, with the student as first author. Software, tools and data collection must be presented in the paper through links to their repositories. Authors are encouraged to provide open data packages (replication packages) that make the work easier to reproduce.',
          },
        },
        {
          kind: 'p',
          text: {
            pt: 'O texto do artigo deve, obrigatoriamente, conter os seguintes elementos: título, resumo e abstract (caso o trabalho esteja em português), palavras-chave, motivação, caracterização do problema, contexto da pesquisa (esclarecendo o escopo específico, se está inserida em um projeto maior, se é desenvolvida em grupo, etc), objetivo, contribuições, trabalhos relacionados, método de pesquisa, resultados obtidos e considerações finais.',
            en: 'The paper must contain the following elements: title, abstract (plus a Portuguese "resumo" if written in Portuguese), keywords, motivation, problem statement, research context (clarifying the specific scope, whether it is part of a larger project, whether it is group work, etc.), goal, contributions, related work, research method, results and final remarks.',
          },
        },
        {
          kind: 'p',
          text: {
            pt: 'Para os trabalhos desenvolvidos por alunos(as) do ensino superior, devem informar se são provenientes de uma iniciação científica ou trabalho de conclusão de curso da seguinte forma:',
            en: 'Work by higher-education students must state whether it comes from an undergraduate research project or a final-year project, as follows:',
          },
        },
        {
          kind: 'list',
          items: [
            { pt: 'Se for uma iniciação científica, os autores devem informar o link para o simpósio interno da IES da qual o artigo foi publicado/apresentado.', en: 'For undergraduate research, the authors must give the link to the institution\'s internal symposium where the paper was published/presented.' },
            { pt: 'Se for um trabalho de conclusão de curso (TCC), os autores devem informar o link para o repositório da IES (normalmente a página da biblioteca).', en: 'For a final-year project, the authors must give the link to the institution\'s repository (usually the library page).' },
            { pt: 'Se for um trabalho que já foi publicado (simpósio da IES ou o repositório com o TCC não contam) os autores devem informar o link com a publicação original.', en: 'For work that has already been published (the institution\'s symposium or the final-year project repository do not count), the authors must give the link to the original publication.' },
          ],
        },
        {
          kind: 'p',
          text: {
            pt: 'Recomenda-se que essa informação seja colocada em uma seção após a conclusão como "Trabalho Anterior / Previous Work".',
            en: 'This information should preferably go in a section after the conclusion, such as "Trabalho Anterior / Previous Work".',
          },
        },
        {
          kind: 'p',
          text: {
            pt: 'A publicação do artigo nos anais estendidos do SBES 2027 na SBC OpenLib (SOL) obedecerá às seguintes regras:',
            en: 'Publication in the SBES 2027 extended proceedings on SBC OpenLib (SOL) follows these rules:',
          },
        },
        {
          kind: 'list',
          items: [
            { pt: 'Se o artigo for original, será publicado o artigo completo;', en: 'If the paper is original, the full paper will be published;' },
            { pt: 'Se o artigo não for original, ou seja, já tiver sido publicado em outro veículo (inclusive no SBES), a versão a ser publicada nos anais estendidos do evento será um resumo de 2 páginas no Modelo para Publicação de Artigos definidos para o CBSoft preparado pelas pessoas autoras. O artigo deve incluir um resumo em Português e um em Inglês (abstract). Em caso de aceite, esse resumo será enviado como versão final.', en: 'If the paper is not original, i.e. it has already been published elsewhere (including at SBES), the version published in the extended proceedings will be a 2-page summary, prepared by the authors in the CBSoft paper template. It must include an abstract in both Portuguese and English. If accepted, this summary will be sent as the final version.' },
          ],
        },
      ],
    },
    {
      title: { pt: 'Seleção e Premiação', en: 'Selection and Awards' },
      blocks: [
        { kind: 'p', text: { pt: 'A seleção dos melhores trabalhos será realizada em duas fases complementares:', en: 'The best papers will be selected in two complementary phases:' } },
        {
          kind: 'p',
          text: {
            pt: '**Fase 1 - Avaliação do Artigo:** Todos os trabalhos submetidos serão revisados por, no mínimo, uma banca composta por três avaliadores integrantes do comitê de avaliação para a seleção dos trabalhos. Os trabalhos com as melhores avaliações nessa fase serão selecionados para a Fase 2, que consiste na apresentação oral durante o evento. É imprescindível que pelo menos a pessoa autora de cada trabalho aprovado para a Fase 2 esteja inscrita no CBSoft 2027 (e pague a taxa de registro) para que o artigo seja publicado nos anais do evento. Trabalhos que não forem apresentados no VIII CTIC-ES não serão elegíveis ao prêmio.',
            en: '**Phase 1 - Paper Evaluation:** Every submitted paper will be reviewed by a panel of at least three members of the evaluation committee. The best-rated papers in this phase will move on to Phase 2, an oral presentation during the event. At least the author of each paper selected for Phase 2 must register for CBSoft 2027 (and pay the registration fee) for the paper to be published in the proceedings. Papers not presented at the 8th CTIC-ES will not be eligible for the award.',
          },
        },
        {
          kind: 'p',
          text: {
            pt: '**Fase 2 - Avaliação da Apresentação Oral:** Os trabalhos finalistas serão apresentados para uma banca composta por três avaliadores integrantes do comitê de avaliação para a seleção dos trabalhos. A apresentação deve ser feita exclusivamente pela primeira pessoa autora do trabalho de forma individual. A definição do ranking final dos trabalhos premiados será baseada em uma média final ponderada das avaliações das duas fases, calculada como:',
            en: '**Phase 2 - Oral Presentation Evaluation:** The finalist papers will be presented to a panel of three members of the evaluation committee. The presentation must be given solely by the paper\'s first author, individually. The final ranking of the awarded papers will be based on a weighted average of the two phases, calculated as:',
          },
        },
        {
          kind: 'p',
          text: {
            pt: '**Média Final = (Média da Fase 1 × 6 + Média da Fase 2 × 4) / 10**',
            en: '**Final Average = (Phase 1 Average × 6 + Phase 2 Average × 4) / 10**',
          },
        },
        {
          kind: 'p',
          text: {
            pt: 'Com o propósito de evitar possíveis vieses, a banca da Fase 2 não terá acesso às notas oriundas da Fase 1. Além disso, após a premiação, as notas (referentes às duas fases) dos melhores trabalhos serão disponibilizadas de forma aberta para o público (link a ser divulgado).',
            en: 'To avoid bias, the Phase 2 panel will not see the Phase 1 scores. After the awards, the scores (for both phases) of the best papers will be made openly available to the public (link to be announced).',
          },
        },
      ],
    },
    {
      title: { pt: 'Critérios Avaliativos por Fase', en: 'Evaluation Criteria per Phase' },
      blocks: [
        { kind: 'p', text: { pt: '**Fase 1 (Avaliação do Artigo):**', en: '**Phase 1 (Paper Evaluation):**' } },
        {
          kind: 'list',
          items: [
            { pt: '**Inovação e Originalidade:** Analisa o grau de inovação e originalidade do trabalho, considerando a contribuição que ele traz, enquanto escopo específico de uma pesquisa de graduação, ao campo da Engenharia de Software.', en: '**Innovation and Originality:** The degree of innovation and originality of the work, considering its contribution to Software Engineering within the specific scope of undergraduate research.' },
            { pt: '**Relevância e Clareza do Escopo:** Avalia a importância do problema abordado e a contribuição apresentada para a comunidade científica e prática na área de Engenharia de Software. O escopo do trabalho está bem definido e, caso necessário, é delimitado dentro do contexto do projeto maior.', en: '**Relevance and Clarity of Scope:** The importance of the problem addressed and the contribution to the Software Engineering research and practice communities. The scope of the work is well defined and, if needed, delimited within the larger project.' },
            { pt: '**Rigor e Transparência:** Analisa o nível de rigor metodológico e científico empregado no trabalho, incluindo a escolha e aplicação adequadas de métodos e técnicas. Além disso, examina a clareza com que os dados, métodos e resultados são apresentados, permitindo a reprodução ou verificação do estudo, conforme viável no contexto investigado.', en: '**Rigour and Transparency:** The level of methodological and scientific rigour, including the proper choice and application of methods and techniques, and how clearly the data, methods and results are presented so the study can be reproduced or verified, as feasible in the context studied.' },
            { pt: '**Qualidade da Apresentação:** Avalia a organização, clareza, redação e formatação do artigo, considerando a capacidade de comunicar ideias de forma objetiva e bem estruturada.', en: '**Presentation Quality:** The organisation, clarity, writing and formatting of the paper, considering its ability to communicate ideas in an objective, well-structured way.' },
          ],
        },
        { kind: 'p', text: { pt: '**Fase 2 (Avaliação da Apresentação Oral):**', en: '**Phase 2 (Oral Presentation Evaluation):**' } },
        {
          kind: 'list',
          items: [
            { pt: '**Clareza na Comunicação:** Avalia a organização lógica da apresentação e a habilidade do apresentador em transmitir ideias de forma clara, acessível e objetiva no contexto de Engenharia de Software.', en: '**Clear Communication:** The logical organisation of the talk and the presenter\'s ability to convey ideas clearly, accessibly and objectively in the Software Engineering context.' },
            { pt: '**Domínio do Trabalho:** Avalia a capacidade da pessoa apresentadora em responder perguntas com segurança e profundidade.', en: '**Command of the Work:** The presenter\'s ability to answer questions confidently and in depth.' },
            { pt: '**Uso de Recursos Visuais:** Considera a qualidade e a relevância dos slides ou materiais de apoio, incluindo o uso adequado de gráficos, tabelas e ilustrações para complementar a apresentação.', en: '**Use of Visual Aids:** The quality and relevance of the slides or supporting materials, including proper use of charts, tables and illustrations to complement the talk.' },
            { pt: '**Evolução Profissional:** Examina evidências de aprendizado e crescimento acadêmico ou profissional ao longo da pesquisa, incluindo reflexões sobre desafios enfrentados e lições aprendidas.', en: '**Professional Growth:** Evidence of learning and academic or professional growth during the research, including reflections on challenges faced and lessons learned.' },
            { pt: '**Consistência Científica:** Avalia a consistência científica do estudo, incluindo a adequação da metodologia, análise dos resultados e consistência das conclusões. Também considera a relevância do problema abordado e a contribuição potencial da pesquisa para o avanço acadêmico e prático na Engenharia de Software, destacando sua contribuição para a academia e indústria.', en: '**Scientific Consistency:** The scientific consistency of the study, including the suitability of the methodology, the analysis of results and the consistency of the conclusions. It also considers the relevance of the problem and the research\'s potential contribution to academic and practical progress in Software Engineering, for both academia and industry.' },
          ],
        },
        {
          kind: 'p',
          text: {
            pt: 'A organização orienta fortemente que as pessoas autoras se atentem aos critérios detalhados para cada fase do processo. Por sua vez, as pessoas avaliadoras serão instruídas a considerar os critérios de maneira alinhada ao contexto e escopo de uma pesquisa de iniciação científica, buscando uma avaliação justa, consistente e coerente.',
            en: 'The organisers strongly advise authors to pay attention to the detailed criteria for each phase. Reviewers, in turn, will be instructed to apply the criteria in line with the context and scope of undergraduate research, aiming for a fair, consistent and coherent evaluation.',
          },
        },
      ],
    },
    ethicsSection,
    {
      title: {
        pt: 'III Mostra de Trabalhos dos Concursos do Simpósio Brasileiro de Engenharia de Software',
        en: '3rd Showcase of the Brazilian Symposium on Software Engineering Competitions',
      },
      blocks: [
        {
          kind: 'p',
          text: {
            pt: 'Durante o evento, será realizada a III Mostra de Trabalhos dos Concursos do Simpósio Brasileiro de Engenharia de Software, na qual serão expostos os trabalhos selecionados para a Fase 2 do CTIC-ES, em formato de sessão de pôsteres, juntamente com os trabalhos do Concurso de Teses e Dissertações em Engenharia de Software (CTD-ES).',
            en: 'During the event, the 3rd Showcase of the Brazilian Symposium on Software Engineering Competitions will be held, presenting the papers selected for CTIC-ES Phase 2 as a poster session, together with the papers of the Software Engineering Theses and Dissertations Competition (CTD-ES).',
          },
        },
        {
          kind: 'p',
          text: {
            pt: 'A participação na Mostra de Trabalhos é um pré-requisito para a apresentação oral e, consequentemente, para a concorrência à premiação.',
            en: 'Taking part in the Showcase is a prerequisite for the oral presentation and, therefore, for competing for the award.',
          },
        },
      ],
    },
  ],
  milestones: [
    { label: { pt: 'Data limite para submissão de trabalhos', en: 'Paper submission deadline' }, date: null },
    { label: { pt: 'Notificação de aceitação', en: 'Notification of acceptance' }, date: null },
    { label: { pt: 'Data limite para envio da versão final', en: 'Camera-ready deadline' }, date: null },
  ],
  chairs: [],
  committees: [{ members: PLACEHOLDER_COMMITTEE }],
};

/** CTD-ES (theses and dissertations competition). The 2027 edition covers
 *  work defended in 2026. */
const SBES_CTD_CALL: SymposiumCall = {
  intro: [
    {
      pt: 'O Simpósio Brasileiro de Engenharia de Software (SBES), promovido anualmente pela Sociedade Brasileira de Computação (SBC), é o principal evento de Engenharia de Software da América Latina. O SBES é realizado em conjunto com o Congresso Brasileiro de Software: Teoria e Prática (CBSoft).',
      en: 'The Brazilian Symposium on Software Engineering (SBES), promoted annually by the Brazilian Computer Society (SBC), is the leading Software Engineering event in Latin America. SBES is held together with the Brazilian Conference on Software: Theory and Practice (CBSoft).',
    },
    {
      pt: 'O Concurso de Teses e Dissertações em Engenharia de Software (CTD-ES) visa divulgar e premiar as melhores teses de doutorado e dissertações de mestrado na área de Engenharia de Software concluídas, defendidas e aprovadas no Brasil no ano de 2026. Serão premiadas as teses e dissertações com contribuição significativa e destacada para a área científica de Engenharia de Software, além de relevante impacto para a sociedade e para a indústria de software.',
      en: 'The Software Engineering Theses and Dissertations Competition (CTD-ES) aims to showcase and award the best PhD theses and master\'s dissertations in Software Engineering completed, defended and approved in Brazil in 2026. Awards go to theses and dissertations with a significant, outstanding contribution to Software Engineering research and relevant impact on society and the software industry.',
    },
  ],
  sections: [
    {
      title: {
        pt: 'III Mostra de Trabalhos dos Concursos do Simpósio Brasileiro de Engenharia de Software',
        en: '3rd Showcase of the Brazilian Symposium on Software Engineering Competitions',
      },
      blocks: [
        {
          kind: 'p',
          text: {
            pt: 'Durante o evento, será realizada a III Mostra de Trabalhos dos Concursos do Simpósio Brasileiro de Engenharia de Software, na qual serão expostos os trabalhos selecionados para a Fase 2 do CTD-ES - Concurso de Teses e Dissertações em Engenharia de Software, em formato de sessão de pôsteres.',
            en: 'During the event, the 3rd Showcase of the Brazilian Symposium on Software Engineering Competitions will be held, presenting the works selected for Phase 2 of CTD-ES - the Software Engineering Theses and Dissertations Competition - as a poster session.',
          },
        },
      ],
    },
    {
      title: { pt: 'Premiação', en: 'Awards' },
      blocks: [
        {
          kind: 'p',
          text: {
            pt: 'Serão premiadas as três melhores teses de doutorado e as três melhores dissertações de mestrado. Os trabalhos deverão, obrigatoriamente, ser apresentados pelo(a) estudante de maneira oral na sessão de apresentações do CTD-ES e também na sessão de pôsteres da III Mostra de Trabalhos dos Concursos do Simpósio Brasileiro de Engenharia de Software, durante o XLI Simpósio Brasileiro de Engenharia de Software (SBES 2027).',
            en: 'The three best PhD theses and the three best master\'s dissertations will be awarded. The works must be presented by the student both orally in the CTD-ES presentation session and in the poster session of the 3rd Showcase of the Brazilian Symposium on Software Engineering Competitions, during the 41st Brazilian Symposium on Software Engineering (SBES 2027).',
          },
        },
      ],
    },
    {
      title: { pt: 'Público-Alvo', en: 'Who Can Apply' },
      blocks: [
        {
          kind: 'p',
          text: {
            pt: 'Podem enviar trabalhos ao CTD-ES recém-doutores e mestres na área de Engenharia de Software que defenderam suas teses ou dissertações, no Brasil, no período de 1 de janeiro a 31 de dezembro de 2026.',
            en: 'CTD-ES is open to new PhDs and master\'s graduates in Software Engineering who defended their theses or dissertations in Brazil between 1 January and 31 December 2026.',
          },
        },
      ],
    },
    {
      title: { pt: 'Submissão', en: 'Submission' },
      blocks: [
        {
          kind: 'p',
          text: {
            pt: 'Os candidatos deverão submeter os trabalhos eletronicamente pelo sistema JEMS3 (link a ser divulgado). No momento da submissão, o(a) candidato(a) deve escolher a trilha correspondente ao seu trabalho (dissertação de mestrado ou tese de doutorado). Será aceita apenas uma submissão, em cada categoria, por orientador(a) principal.',
            en: 'Candidates must submit their work electronically through the JEMS3 system (link to be announced). When submitting, candidates must choose the track that matches their work (master\'s dissertation or PhD thesis). Only one submission per category is accepted per main advisor.',
          },
        },
        { kind: 'p', text: { pt: 'Os seguintes documentos deverão ser submetidos, em conjunto:', en: 'The following documents must be submitted together:' } },
        {
          kind: 'list',
          items: [
            { pt: 'Texto integral da tese ou dissertação, no formato PDF', en: 'The full text of the thesis or dissertation, in PDF' },
            {
              pt: 'Artigo-resumo do trabalho, que pode ser original ou já ter sido publicado ou aceito para publicação. Caso o artigo seja original, este deve ter tamanho de no máximo 8 páginas (incluindo figuras), e 2 páginas adicionais para referências bibliográficas. O artigo deve estar no formato PDF e em conformidade com o modelo da conferência. Os artigos devem ter resumos em português e em inglês. Caso o artigo já tenha sido publicado ou aceito para publicação, deve ser enviado o artigo original em PDF.',
              en: 'A summary paper of the work, which may be original or already published or accepted for publication. An original paper must have at most 8 pages (including figures), plus 2 additional pages for references, in PDF and following the conference template, with abstracts in Portuguese and English. If the paper has already been published or accepted, the original paper must be sent in PDF.',
            },
            { pt: 'Uma carta do(a) orientador(a) principal.', en: 'A letter from the main advisor.' },
            { pt: 'Uma carta do(a) candidato(a).', en: 'A letter from the candidate.' },
          ],
        },
        { kind: 'p', text: { pt: 'O conteúdo da carta do(a) orientador(a) principal deve:', en: 'The main advisor\'s letter must:' } },
        {
          kind: 'list',
          items: [
            { pt: 'Destacar a contribuição do trabalho à Engenharia de Software, os aspectos pelos quais acredita que o(a) candidato(a) merece o prêmio e a lista de artigos (publicados, aceitos e/ou submetidos, aguardando avaliação), com a indicação do mais relevante.', en: 'Highlight the work\'s contribution to Software Engineering, the reasons the candidate deserves the award, and the list of papers (published, accepted and/or submitted and under review), indicating the most relevant one.' },
            { pt: 'Indicar os subprodutos do trabalho, tais como patentes, programas registrados, programas de domínio público/livre e bancos de dados que o trabalho disponibilize para acesso público (com as respectivas URLs), bem como outras informações consideradas pertinentes.', en: 'List the by-products of the work, such as patents, registered software, public-domain/free software and databases made publicly available (with their URLs), plus any other relevant information.' },
            { pt: 'Informar o nome do Programa de Pós-graduação, o número de telefone do(a) Coordenador(a) do Programa, a data da defesa da tese/dissertação, título da tese/dissertação, o nome do(a) candidato(a), os nomes do(s) orientador(es) e dos membros da banca, com endereço de e-mail.', en: 'Give the name of the Graduate Programme, the phone number of the Programme Coordinator, the defence date, the title of the thesis/dissertation, the candidate\'s name, and the names and e-mail addresses of the advisor(s) and examining committee members.' },
            { pt: 'Indicar se o artigo submetido é (i) original, (ii) já foi aceito ou publicado em outro evento ou periódico, ou (iii) está em processo de avaliação em outro evento ou periódico. Caso o artigo não seja original, deve-se indicar o veículo de publicação no qual está em processo de revisão.', en: 'State whether the submitted paper is (i) original, (ii) already accepted or published in another conference or journal, or (iii) under review in another conference or journal. If the paper is not original, the venue where it is under review must be given.' },
          ],
        },
        { kind: 'p', text: { pt: 'O conteúdo da carta do candidato deve:', en: 'The candidate\'s letter must:' } },
        {
          kind: 'list',
          items: [
            { pt: 'Apresentar as razões pelas quais ele considera que o seu trabalho deve ser destacado entre os melhores do Brasil em Engenharia de Software.', en: 'Explain why the candidate believes their work should stand out among the best in Software Engineering in Brazil.' },
          ],
        },
        {
          kind: 'p',
          text: {
            pt: 'A publicação do artigo nos anais estendidos do SBES 2027 na SBC OpenLib (SOL) obedecerá às seguintes regras:',
            en: 'Publication in the SBES 2027 extended proceedings on SBC OpenLib (SOL) follows these rules:',
          },
        },
        {
          kind: 'list',
          items: [
            { pt: 'Se o artigo for original, será publicado em sua totalidade.', en: 'If the paper is original, it will be published in full.' },
            { pt: 'Se o artigo não for original, ou seja, já tiver sido publicado em outro veículo (inclusive no SBES), a versão a ser publicada nos anais estendidos do evento será um resumo de 2 páginas, no modelo da conferência, preparado pelos autores, indicando a referência completa do evento da outra publicação. O resumo deve incluir um resumo em português e outro em inglês.', en: 'If the paper is not original, i.e. it has already been published elsewhere (including at SBES), the version published in the extended proceedings will be a 2-page summary in the conference template, prepared by the authors and giving the full reference of the other publication. It must include an abstract in Portuguese and one in English.' },
          ],
        },
      ],
    },
    {
      title: { pt: 'Seleção', en: 'Selection' },
      blocks: [
        {
          kind: 'p',
          text: {
            pt: 'Somente serão aceitos trabalhos cujo foco seja Engenharia de Software, em português ou em inglês, que expandam ou aprofundem o conhecimento nesta área. Não serão aceitos trabalhos em que a contribuição à Engenharia de Software seja marginal. Será aceito, no processo de seleção, apenas um trabalho, em cada categoria, indicado pelo orientador principal. Isso implica que os orientadores devem fazer uma primeira seleção e indicar aqueles que consideram a melhor tese e/ou dissertação do ano de 2026 em que atuaram como orientadores principais.',
            en: 'Only work focused on Software Engineering, in Portuguese or English, that expands or deepens knowledge in the field will be accepted. Work whose contribution to Software Engineering is marginal will not be accepted. Only one work per category, nominated by the main advisor, will be accepted. Advisors must therefore make a first selection and nominate what they consider the best thesis and/or dissertation of 2026 that they supervised as main advisor.',
          },
        },
        {
          kind: 'p',
          text: {
            pt: 'As teses e dissertações submetidas ao CTD-ES passarão por um processo de avaliação em duas etapas, descrito abaixo. A avaliação será realizada por um comitê composto por profissionais de instituições de ensino e pesquisa com reconhecida atuação na área de Engenharia de Software. Membros do Comitê de Avaliação que foram orientadores(as) de candidatos(as) concorrendo em uma das categorias (Mestrado ou Doutorado) avaliarão trabalhos apenas da outra categoria.',
            en: 'Theses and dissertations submitted to CTD-ES go through the two-stage evaluation described below, carried out by a committee of professionals from teaching and research institutions with recognised work in Software Engineering. Evaluation Committee members who advised candidates in one category (Master\'s or PhD) will only evaluate work in the other category.',
          },
        },
        {
          kind: 'p',
          text: {
            pt: 'Serão convidados até três artigos por categoria (Mestrado e Doutorado) para apresentação no SBES 2027. O(A) autor(a) que defendeu o trabalho de Mestrado ou Doutorado (e somente ele/ela) deverá fazer a apresentação oral do trabalho, em no máximo 20 minutos, para uma banca, que avaliará a qualidade da apresentação e poderá fazer perguntas. A classificação final do CTD-ES levará em consideração a avaliação do texto completo do trabalho e da apresentação realizada durante o evento.',
            en: 'Up to three papers per category (Master\'s and PhD) will be invited to present at SBES 2027. The author who defended the Master\'s or PhD work (and only them) must give an oral presentation of at most 20 minutes to a panel, which will assess the quality of the presentation and may ask questions. The final CTD-ES ranking will consider the evaluation of the full text and of the presentation given during the event.',
          },
        },
        {
          kind: 'p',
          text: {
            pt: '**Fase 1.** Para essa fase, os trabalhos passarão por um processo de avaliação e seleção visando classificar os melhores trabalhos em cada categoria (ou seja, tese de doutorado e dissertação de mestrado). As avaliações serão realizadas na plataforma JEMS3.',
            en: '**Phase 1.** In this phase, the works go through an evaluation and selection process to rank the best works in each category (PhD thesis and master\'s dissertation). Reviews take place on the JEMS3 platform.',
          },
        },
        {
          kind: 'p',
          text: {
            pt: '**Fase 2.** Nessa fase, que ocorrerá durante o evento, o(a) autor(a) que defendeu a tese de doutorado ou a dissertação de mestrado (e somente ele/ela) deverá fazer uma apresentação oral do seu trabalho para uma banca que avaliará a qualidade da apresentação e poderá fazer perguntas ao(à) autor(a). Em situações especiais, as apresentações inerentes ao CTD-ES poderão ser remotas. A não participação nesta fase implica eliminação do processo de seleção. Ao final, a banca se reunirá em sala reservada e determinará os trabalhos premiados em cada categoria. A banca se reserva o direito de indicar para premiação apenas os trabalhos que ela considerar adequados para isso, estando inclusive prevista a possibilidade de não haver trabalhos indicados para premiação em uma ou mais categorias.',
            en: '**Phase 2.** In this phase, held during the event, the author who defended the PhD thesis or master\'s dissertation (and only them) must give an oral presentation to a panel that will assess its quality and may ask the author questions. In special situations, CTD-ES presentations may be remote. Not taking part in this phase means elimination from the selection. At the end, the panel will meet privately and decide the awarded works in each category. The panel reserves the right to award only the works it considers suitable, including the possibility of no award in one or more categories.',
          },
        },
      ],
    },
    ethicsSection,
  ],
  milestones: [
    { label: { pt: 'Data-limite para submissão de trabalhos', en: 'Submission deadline' }, date: null },
    { label: { pt: 'Notificação de classificação', en: 'Ranking notification' }, date: null },
    { label: { pt: 'Data-limite para envio da versão final', en: 'Camera-ready deadline' }, date: null },
  ],
  chairs: [PLACEHOLDER_MEMBER, PLACEHOLDER_MEMBER],
  committees: [
    {
      title: { pt: 'Comitê Avaliador das Dissertações', en: 'Dissertations Evaluation Committee' },
      members: PLACEHOLDER_COMMITTEE,
    },
    {
      title: { pt: 'Comitê Avaliador das Teses', en: 'Theses Evaluation Committee' },
      members: PLACEHOLDER_COMMITTEE,
    },
  ],
};

/** SBES calls are per track (/sbes/<slug>/chamada); `null` until announced. */
export const SBES_TRACK_CALLS: Record<SbesTrackId, SymposiumCall | null> = {
  research: SBES_RESEARCH_CALL,
  education: SBES_EDUCATION_CALL,
  ideas: SBES_IDEAS_CALL,
  tools: SBES_TOOLS_CALL,
  industry: SBES_INDUSTRY_CALL,
  ctic: SBES_CTIC_CALL,
  ctd: SBES_CTD_CALL,
};

export const SYMPOSIUM_CALLS: Record<SymposiumId, SymposiumCall | null> = {
  sbes: null,
  sblp: SBLP_CALL,
  sbcars: SBCARS_CALL,
  sast: SAST_CALL,
};

export const symposiumCallPath = (id: SymposiumId) => `/${id}/chamada`;

export const sbesTrackCallPath = (id: SbesTrackId) =>
  `/sbes/${SBES_TRACKS.find((track) => track.id === id)!.slug}/chamada`;
