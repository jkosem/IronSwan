class MarkdownParser {
  constructor() {
    this.rules = [
      {
        // H1 headers
        pattern: /^# (.+)$/gm,
        replacement: '<h1>$1</h1>'
      },
      {
        // H2 headers
        pattern: /^## (.+)$/gm,
        replacement: '<h2>$1</h2>'
      },
      {
        // H3 headers
        pattern: /^### (.+)$/gm,
        replacement: '<h3>$1</h3>'
      },
      {
        // Images with alt text
        pattern: /!\[(.*?)\]\((.*?)\)/g,
        replacement: '<img src="/images/$2" alt="$1" loading="lazy">'
      },
      {
        // Paragraphs (any text block separated by blank lines)
        pattern: /^(?!<[h|img])(.*[^\n])\n?$/gm,
        replacement: '<p>$1</p>'
      }
    ];
  }

  parse(markdown) {
    let html = markdown.trim();
    
    // Apply each rule
    this.rules.forEach(rule => {
      html = html.replace(rule.pattern, rule.replacement);
    });

    return html;
  }

  // Extract the first H1 header to use as chapter title
  extractTitle(markdown) {
    const titleMatch = markdown.match(/^# (.+)$/m);
    return titleMatch ? titleMatch[1] : 'Untitled Chapter';
  }
}

export default new MarkdownParser(); 