import type { Experience } from './types';

/**
 * Newest first. Entries with `todo: true` render with a visible dashed outline
 * so unfinished copy cannot slip onto the live site unnoticed.
 */
export const experience: Experience[] = [
  {
    company: 'Gartner',
    role: 'Data Science',
    location: 'Stamford, CT · based in New York',
    start: 'Jun 2024',
    end: 'Present',
    year: '2024',
    summary:
      'Retention and growth analytics for Gartner’s enterprise client base, owning the models that tell account teams which relationships need attention and why.',
    bullets: [
      'Architected and launched the Implied Value Rating model, an account-level probabilistic score covering 10,000+ enterprise clients at 94% accuracy, now in production triggering proactive retention action and contributing to a $295M revenue opportunity.',
      'Engineered the feature pipeline behind the customer segmentation and propensity models, combining behavioral engagement signals with MiniLM topical embeddings into cohort-level features that lifted AUC by 7% over an unsegmented baseline.',
      'Partnered with Sales Analytics on next-best-program targeting and recommendation models, batch-scoring 134.5K prospects and projecting $40M in savings from discontinuing low-performing programs.',
      'Stitched two disparate internal sources, Surveys and Case Studies, into a single unified layer, owning the path from raw documents through the extraction pipeline to the OpenSearch indexes served at query time.',
      'Built the evaluation framework for Research Desk, an internal RAG assistant, from scratch on Langfuse, pairing LLM-as-a-Judge checks for numeric grounding, fact attribution, and named-entity correctness with Precision@K and Recall@K per query category, lifting retrieval pass rate from 43% to 78% and factual accuracy by 13%.',
    ],
    metrics: [
      { value: 94, suffix: '%', label: 'IVR prediction accuracy' },
      { value: 295, prefix: '$', suffix: 'M', label: 'revenue opportunity' },
      { value: 78, suffix: '%', label: 'RAG retrieval pass rate, from 43%' },
    ],
    tags: ['Python', 'MiniLM', 'OpenSearch', 'Langfuse', 'RAG', 'LLM-as-a-Judge'],
    href: 'https://www.gartner.com/',
  },
  {
    company: 'COSMOS Labs, Columbia University',
    role: 'Computer Vision Research',
    location: 'New York, NY',
    start: 'Jan 2023',
    end: 'Dec 2023',
    year: '2023',
    summary:
      'Computer vision for the Smart City Intersections project on the NSF COSMOS testbed, under Prof. Zoran Kostic.',
    bullets: [
      'Trained and fine-tuned YOLOv8 models to detect and track vehicles, pedestrians, and two-wheelers from live intersection cameras, reaching 0.79 mAP.',
      'Built a semi-supervised, model-assisted data engine inspired by Segment Anything to automate data collection for tracking, lifting model performance by 20%.',
      'Designed custom TCP and UDP streaming protocols for the testbed, cutting video streaming latency to 80 ms.',
      'Represented Columbia in the NSF Center for Smart Streetscapes, an Engineering Research Center.',
    ],
    metrics: [
      { value: 0.79, decimals: 2, label: 'mAP, detection & tracking' },
      { value: 20, prefix: '+', suffix: '%', label: 'model performance' },
      { value: 80, suffix: ' ms', label: 'streaming latency' },
    ],
    tags: ['PyTorch', 'YOLOv8', 'OpenCV', 'Python', 'TCP/UDP'],
    href: 'https://www.cosmos-lab.org/',
  },
  {
    company: 'ChaosTrack Inc.',
    role: 'Software Development',
    location: 'New York, NY',
    start: 'Jun 2023',
    end: 'Sep 2023',
    year: '2023',
    summary: 'LLM-powered incident-response simulation for cybersecurity teams.',
    bullets: [
      'Shipped three major product features across a Node.js, REST, GraphQL, Hasura, ArangoDB, PostgreSQL, and Docker stack.',
      'Built an LLM application that simulates and scores corporate incident responses, using spaCy, NLTK, PyTorch, and Hugging Face.',
      'Used LangChain and LangSmith for prompt engineering, improving GPT responsiveness by 35% and output accuracy by 25%.',
      'Ran retrieval-augmented generation experiments with Milvus and semantic search with OWL-ViT and Wav2CLIP embeddings.',
    ],
    metrics: [
      { value: 35, prefix: '+', suffix: '%', label: 'model responsiveness' },
      { value: 25, prefix: '+', suffix: '%', label: 'output accuracy' },
      { value: 3, label: 'features shipped' },
    ],
    tags: ['LangChain', 'Hugging Face', 'Milvus', 'Node.js', 'GraphQL', 'Docker'],
    href: 'https://chaostrack.com/',
  },
  {
    company: 'iQGateway',
    role: 'Machine Learning Engineering',
    location: 'Bangalore, India',
    start: 'May 2021',
    end: 'Jul 2022',
    year: '2021',
    summary: 'Core developer of torsha.ai, an end-to-end AutoML and data science platform.',
    bullets: [
      'Led the design and development of torsha.ai, an end-to-end data science platform with AutoML, model explainability, and custom DAG-based pipelines for training and evaluation.',
      'Built the platform’s data visualization module with Plotly and D3.js.',
      'Raised AutoML pipeline prediction accuracy by 15% with custom scikit-learn-compatible estimators.',
    ],
    metrics: [{ value: 15, prefix: '+', suffix: '%', label: 'AutoML accuracy' }],
    tags: ['Python', 'scikit-learn', 'AutoML', 'Plotly', 'D3.js'],
    href: 'https://torsha.ai/',
  },
];
