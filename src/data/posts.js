import l2regImage from '@/assets/images/posts/l2-reg.jpg';
import hierarchicalSoftMaxImage from '@/assets/images/posts/hierarchical-softmax.jpg';
import rnnImage from '@/assets/images/posts/RNN.jpg';

import l2RegArticle from '@/assets/articles/l2-regularization.md';
import hierarchicalSoftMaxArticle from '@/assets/articles/hierarchical-softmax.md';
import rnnLanguageModelArticle from '@/assets/articles/RNN-language-model.md';

const posts = [
  {
    image: l2regImage,
    title: '"+" or "-" the L2 Regularization ?',
    snippet:
      'Whether L2 regularization is added or subtracted depends on how the objective function is defined',
    lastUpdated: '2025年5月9日',
    link: '#',
    markdown: l2RegArticle
  },
  {
    image: hierarchicalSoftMaxImage,
    title: 'What is Hierarchical Softmax?',
    snippet:
      'Hierarchical Softmax is an efficient alternative to the standard softmax function used in neural network output layers, especially when dealing with very large vocabularies',
    lastUpdated: '2025年4月2日',
    link: '#',
    markdown: hierarchicalSoftMaxArticle
  },
  {
    image: rnnImage,
    title: 'RNN language model',
    snippet:
      'RNNs update a hidden state at each step, combining the previous state and the current word embedding.',
    lastUpdated: '2025年6月7日',
    link: '#',
    markdown: rnnLanguageModelArticle
  }
];

export default posts;
