import { marked } from 'marked';
import markedKatex from 'marked-katex-extension';
import DOMPurify from 'dompurify';
import 'katex/dist/katex.min.css';

let isConfigured = false;

function ensureConfigured() {
  if (!isConfigured) {
    marked.use(
      markedKatex({
        throwOnError: false,
        displayMode: true
      })
    );
    isConfigured = true;
  }
}

export function renderMarkdown(markdown) {
  if (!markdown) return '';
  ensureConfigured();
  const rawHtml = marked(markdown);
  return DOMPurify.sanitize(rawHtml);
}
