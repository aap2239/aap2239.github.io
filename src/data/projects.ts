import type { Project } from './types';

const gh = (repo: string) => `https://github.com/aap2239/${repo}`;

export const projects: Project[] = [
  // ---------- Featured case studies ----------
  {
    slug: 'torsha-ai',
    title: 'torsha.ai',
    kind: 'AutoML platform',
    year: '2021 – 2022',
    featured: true,
    problem:
      'Data teams spend most of their time on plumbing: cleaning, feature pipelines, model selection, and explaining results to stakeholders.',
    approach:
      'Designed the core of an end-to-end platform: AutoML search, custom DAG-based pipelines for training and evaluation, scikit-learn-compatible estimators, and an explainability layer.',
    outcome:
      '15% higher prediction accuracy over the baseline pipeline, plus a Plotly and D3.js visualization module that became the product’s front door.',
    description: 'Fully automated end-to-end data science platform.',
    metrics: [
      { value: 15, prefix: '+', suffix: '%', label: 'prediction accuracy' },
    ],
    tags: ['Python', 'scikit-learn', 'AutoML', 'Explainability', 'Plotly', 'D3.js'],
    link: { label: 'torsha.ai', href: 'https://torsha.ai/' },
  },
  {
    slug: 'chaostrack-simulator',
    title: 'Incident Response Simulator',
    kind: 'LLM system · ChaosTrack',
    year: '2023',
    featured: true,
    problem:
      'Organizations rehearse cyber incidents rarely, and when they do, the drills are scripted and forgettable.',
    approach:
      'An asynchronous, chatbot-based simulator that plays out real-world incidents and evaluates each team’s response. Built on LangChain and LangSmith with Hugging Face models and retrieval over Milvus.',
    outcome:
      'Prompt engineering and retrieval lifted model responsiveness by 35% and output accuracy by 25%, setting a new readiness standard for customers.',
    description: 'Real-world cybersecurity incident simulations via an asynchronous chatbot platform.',
    metrics: [
      { value: 35, prefix: '+', suffix: '%', label: 'responsiveness' },
      { value: 25, prefix: '+', suffix: '%', label: 'accuracy' },
    ],
    tags: ['LangChain', 'LangSmith', 'Hugging Face', 'Milvus', 'RAG', 'Node.js'],
    link: { label: 'chaostrack.com', href: 'https://chaostrack.com/product/' },
  },

  // ---------- Open source ----------
  // Only entries with `showcase: true` are shown on the site (three at a time reads best).
  // Everything else stays here so it is one edit away from appearing.
  {
    slug: 'real-time-stock-prediction',
    title: 'Real-time stock prediction',
    kind: 'Streaming ML',
    year: '2023',
    showcase: true,
    description:
      'Sentiment analysis on 5M+ daily tweets streamed through Pub/Sub, Apache Beam, and Dataflow into BigQuery, improving price prediction by 12% over the baseline.',
    metrics: [
      { value: 12, prefix: '+', suffix: '%', label: 'prediction lift' },
      { value: 5, suffix: 'M+', label: 'tweets / day' },
    ],
    tags: ['Python', 'Apache Beam', 'BigQuery', 'Google Cloud', 'NLP'],
    repo: gh('real-time-stock-prediction'),
  },
  {
    slug: 'llama2-with-rag',
    title: 'LLaMA 2 with RAG',
    kind: 'LLM · Retrieval',
    year: '2024',
    showcase: true,
    description:
      'Retrieval-augmented generation with LLaMA 2 running fully on a local machine, backed by a vector database for grounded answers over private documents.',
    tags: ['LLaMA 2', 'RAG', 'Vector DB', 'Python'],
    repo: gh('llama2-with-rag'),
  },
  {
    slug: 'multi-modal-search',
    title: 'Multimodal semantic search',
    kind: 'Vision + language',
    year: '2023',
    description:
      'Search images with text and text with images. CLIP embeddings from OpenAI stored in a vector database for cross-modal retrieval.',
    tags: ['CLIP', 'Vector DB', 'PyTorch'],
    repo: gh('multi_modal_search'),
  },
  {
    slug: 'sparse-dictionary-anomaly-detection',
    title: 'Sparse reconstruction for anomaly detection',
    kind: 'Research · Computer vision',
    year: '2023',
    description:
      'Flagging abnormal object detections by the sparsity of their LASSO and dictionary-learning reconstructions. Custom optimizers in PyTorch, evaluated on PennFudan and COSMOS data.',
    tags: ['PyTorch', 'LASSO', 'Dictionary learning', 'Sparse models'],
    repo: gh('sparse-dictionary-anomaly-detection'),
  },
  {
    slug: 'english-italian-translation-transformer',
    title: 'Transformer from scratch',
    kind: 'NLP · From first principles',
    year: '2024',
    showcase: true,
    description:
      'English to Italian neural machine translation with a 6-layer encoder–decoder transformer written from scratch in PyTorch. Trained on OPUS Books with TensorBoard monitoring.',
    tags: ['PyTorch', 'Transformers', 'Attention', 'Hugging Face Datasets'],
    repo: gh('english-italian-translation-transformer'),
  },
  {
    slug: 'gpt-implementation',
    title: 'GPT from scratch',
    kind: 'LLM · From first principles',
    year: '2023',
    description:
      'A decoder-only language model implemented step by step, tokenizer to sampling, to understand what actually happens inside an LLM.',
    tags: ['PyTorch', 'LLM', 'Self-attention'],
    repo: gh('gpt-implementation'),
  },
  {
    slug: 'explainable-credit-default',
    title: 'Explainable credit default prediction',
    kind: 'Big data · Explainability',
    year: '2022',
    description:
      'Credit default model trained on Apache Spark with Shapley values to explain every prediction to a non-technical reviewer.',
    tags: ['Apache Spark', 'SHAP', 'Python'],
    repo: gh('202212-30-Explainable-Credit-Default-Prediction'),
  },
  {
    slug: 'hcv-prediction',
    title: 'Hepatitis C prediction',
    kind: 'Statistical learning',
    year: '2022',
    description:
      'Comparing statistical learning models for HCV diagnosis from blood-panel data, reaching 93.51% accuracy.',
    metrics: [{ value: 93.51, decimals: 2, suffix: '%', label: 'accuracy' }],
    tags: ['R', 'Statistical learning', 'Healthcare'],
    repo: gh('hcv-prediction'),
  },
  {
    slug: 'mobilenets-implementation',
    title: 'MobileNets, reimplemented',
    kind: 'Efficient CNNs',
    year: '2022',
    description:
      'Depthwise-separable convolutions and the width/resolution multipliers, rebuilt and benchmarked to understand where the efficiency comes from.',
    tags: ['TensorFlow', 'CNNs', 'Model efficiency'],
    repo: gh('mobilenets-implementation'),
  },
  {
    slug: 'interactive-fifa-stats',
    title: 'Interactive FIFA World Cup stats',
    kind: 'Data visualization',
    year: '2023',
    description:
      'An interactive explorer for World Cup history. Built because arguing about football deserves better charts.',
    tags: ['Data viz', 'JavaScript'],
    repo: gh('interactive_fifa_stats_visualizer'),
  },
  {
    slug: 'newport-trivia-night',
    title: 'Newport Trivia Night',
    kind: 'Side project',
    year: '2026',
    description:
      'A multiplayer trivia app that runs over the local network, built for game nights with friends.',
    tags: ['Multiplayer', 'Local network'],
    repo: gh('newport-trivia-night'),
  },
  {
    slug: 'dexchange',
    title: 'DExchange',
    kind: 'Side project · Web3',
    year: '2026',
    description: 'A decentralized crypto exchange, built to understand how on-chain order matching really works.',
    tags: ['Web3', 'Smart contracts'],
    repo: gh('dexchange'),
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const openSourceProjects = projects.filter((p) => !p.featured && p.showcase);
