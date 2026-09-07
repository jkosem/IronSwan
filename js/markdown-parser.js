class MarkdownParser {
  parse(markdown) {
    if (!markdown) return '';

    // 1. Normalize line endings
    let text = markdown.replace(/\r\n/g, '\n').replace(/\r/g, '\n').trim();

    // 2. Images: support relative images and avoid forcing leading /
    text = text.replace(/!\[(.*?)\]\((.*?)\)/g, (match, alt, src) => {
      let finalSrc = src;
      if (!src.startsWith('http://') && !src.startsWith('https://') && !src.startsWith('/') && !src.startsWith('images/')) {
        finalSrc = `images/${src}`;
      }
      return `<img src="${finalSrc}" alt="${alt}" loading="lazy">`;
    });

    // 3. Links (exclude images which are already converted)
    text = text.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');

    // 4. Inline formatting: bold and italics
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    text = text.replace(/\*([^\*]+?)\*/g, '<em>$1</em>');

    // 5. Headers
    text = text.replace(/^### (.*$)/gm, '<h3>$1</h3>');
    text = text.replace(/^## (.*$)/gm, '<h2>$1</h2>');
    text = text.replace(/^# (.*$)/gm, '<h1>$1</h1>');

    // 6. Horizontal Rules
    text = text.replace(/^(?:---|\*\*\*|___)\s*$/gm, '<hr>');

    // 7. Blockquotes
    text = text.replace(/(?:^>.*(?:\n|$))+/gm, (match) => {
      const content = match.trim().split('\n').map(line => line.replace(/^>\s?/, '').trim()).join('<br>');
      return `<blockquote><p>${content}</p></blockquote>\n`;
    });

    // 8. Unordered lists: group consecutive lines starting with - or *
    text = text.replace(/(?:^[*-] .*(?:\n|$))+/gm, (match) => {
      const items = match.trim().split('\n').map(line => {
        const content = line.replace(/^[*-] /, '').trim();
        return `  <li>${content}</li>`;
      }).join('\n');
      return `<ul>\n${items}\n</ul>\n`;
    });

    // 9. Paragraphs: split by double newlines, wrap non-block sections in <p>
    const blocks = text.split(/\n\s*\n+/);
    const result = blocks.map(block => {
      const trimmed = block.trim();
      if (!trimmed) return '';
      if (/^<(?:h[1-6]|ul|ol|li|p|div|blockquote|img|hr)/i.test(trimmed)) {
        return trimmed;
      }
      const inlines = trimmed.split('\n').map(l => l.trim()).join(' ');
      return `<p>${inlines}</p>`;
    }).filter(Boolean);

    return result.join('\n\n');
  }

  // Extract the first H1 header to use as chapter title
  extractTitle(markdown) {
    if (!markdown) return 'Untitled Chapter';
    const clean = markdown.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    const titleMatch = clean.match(/^# (.+)$/m);
    return titleMatch ? titleMatch[1].trim() : 'Untitled Chapter';
  }
}

export default new MarkdownParser(); 