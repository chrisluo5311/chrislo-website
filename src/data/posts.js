import l2RegArticle from '@/assets/articles/l2-regularization.md';
import hierarchicalSoftMaxArticle from '@/assets/articles/hierarchical-softmax.md';
import rnnLanguageModelArticle from '@/assets/articles/RNN-language-model.md';
import rearterArticle from '@/assets/articles/ReARTeR.md';
import llmVerificationArticle from '@/assets/articles/llm_verification.md';
import nginxNamespaceFailArticle from '@/assets/articles/nginx_reload_fail.md';
import whatIsANamespaceArticle from '@/assets/articles/what_is_a_namespace.md';

const posts = [
  {
    image: 'https://jidunglo-resume-bucket.s3.us-east-2.amazonaws.com/PublicImg/posts/l2-reg.jpg',
    title: '"+" or "-" the L2 Regularization ?',
    snippet:
      'Whether L2 regularization is added or subtracted depends on how the objective function is defined',
    lastUpdated: 'May 9, 2025',
    link: '#',
    markdown: l2RegArticle,
    category: 'Machine Learning',
    tags: ['Machine Learning', 'Deep Learning', 'Regularization']
  },
  {
    image: 'https://jidunglo-resume-bucket.s3.us-east-2.amazonaws.com/PublicImg/posts/hierarchical-softmax.jpg',
    title: 'What is Hierarchical Softmax?',
    snippet:
      'Hierarchical Softmax is an efficient alternative to the standard softmax function used in neural network output layers, especially when dealing with very large vocabularies',
    lastUpdated: 'April 2, 2025',
    link: '#',
    markdown: hierarchicalSoftMaxArticle,
    category: 'Deep Learning',
    tags: ['Softmax', 'Deep Learning']
  },
  {
    image: 'https://jidunglo-resume-bucket.s3.us-east-2.amazonaws.com/PublicImg/posts/RNN.jpg',
    title: 'RNN language model',
    snippet:
      'RNNs update a hidden state at each step, combining the previous state and the current word embedding.',
    lastUpdated: 'June 7, 2025',
    link: '#',
    markdown: rnnLanguageModelArticle,
    category: 'Deep Learning',
    tags: ['RNN', 'Deep Learning']
  },
  {
    image: 'https://jidunglo-resume-bucket.s3.us-east-2.amazonaws.com/PublicImg/posts/ReARTeR.png',
    title: 'Thesis Review - ReARTeR',
    snippet:
      'ReARTeR combines Trustworthy Process Rewarding (TPR) and Step-Level Offline Reinforcement Learning to enhance reasoning ability and interpretability.',
    lastUpdated: 'October 6, 2025',
    link: '#',
    markdown: rearterArticle,
    category: 'AI Agents',
    tags: ['Reinforcement Learning', 'Reasoning', 'ProcessRewardModel', 'Thesis Review']
  },
  {
    image: 'https://jidunglo-resume-bucket.s3.us-east-2.amazonaws.com/PublicImg/posts/llm_verification.jpg',
    title: 'Thesis Review - LLM Agent Verification',
    snippet:
      'Build a robust system to detect and verify misinformation using a multi-tool collaborative framework centered on LLM agents.',
    lastUpdated: 'October 10, 2025',
    link: '#',
    markdown: llmVerificationArticle,
    category: 'AI Agents',
    tags: ['Workflow', 'Verification', 'Multi-tool', 'Thesis Review']
  },
  {
    image: 'https://jidunglo-resume-bucket.s3.us-east-2.amazonaws.com/PublicImg/posts/nginx_namespace_fail.jpg',
    title: 'Nginx Reload Fail',
    snippet:
      'Nginx reload fail is due to the PrivateTmp=true in the nginx.service file.',
    lastUpdated: 'November 13, 2025',
    link: '#',
    markdown: nginxNamespaceFailArticle,
    category: 'Nginx',
    tags: ['Nginx', 'Namespace']
  },
  {
    image: 'https://jidunglo-resume-bucket.s3.us-east-2.amazonaws.com/PublicImg/posts/namespace.png',
    title: 'What is a namespace?',
    snippet:
      'A namespace is a way to isolate a part of the system so a process sees only its own private version of it.',
    lastUpdated: 'November 13, 2025',
    link: '#',
    markdown: whatIsANamespaceArticle,
    category: 'Linux',
    tags: ['Linux', 'Namespace']
  }
];

export default posts;
