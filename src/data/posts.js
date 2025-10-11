import l2regImage from '@/assets/images/posts/l2-reg.jpg';
import hierarchicalSoftMaxImage from '@/assets/images/posts/hierarchical-softmax.jpg';
import rnnImage from '@/assets/images/posts/RNN.jpg';
import rearterImage from '@/assets/images/posts/ReARTeR.png';
import llmVerificationImage from '@/assets/images/posts/llm_verification.jpg';

import l2RegArticle from '@/assets/articles/l2-regularization.md';
import hierarchicalSoftMaxArticle from '@/assets/articles/hierarchical-softmax.md';
import rnnLanguageModelArticle from '@/assets/articles/RNN-language-model.md';
import rearterArticle from '@/assets/articles/ReARTeR.md';
import llmVerificationArticle from '@/assets/articles/llm_verification.md';

const posts = [
  {
    image: l2regImage,
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
    image: hierarchicalSoftMaxImage,
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
    image: rnnImage,
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
    image: rearterImage,
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
    image: llmVerificationImage,
    title: 'Thesis Review - LLM Agent Verification',
    snippet:
      'Build a robust system to detect and verify misinformation using a multi-tool collaborative framework centered on LLM agents.',
    lastUpdated: 'October 10, 2025',
    link: '#',
    markdown: llmVerificationArticle,
    category: 'AI Agents',
    tags: ['Workflow', 'Verification', 'Multi-tool', 'Thesis Review']
  },
];

export default posts;
