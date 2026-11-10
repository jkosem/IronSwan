const escapeHTML = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
function safeURL(raw) {
  const url = raw.trim();
  if (!url || /[\u0000-\u001f\u007f]/.test(url) || /^(?:\/\/|javascript:|data:|vbscript:)/i.test(url)) return null;
  if (/^[a-z][a-z0-9+.-]*:/i.test(url) && !/^https?:\/\//i.test(url) && !/^mailto:/i.test(url)) return null;
  return url;
}
function inline(source) {
  const tokens = [];
  const hold = html => { tokens.push(html); return '\uE000' + (tokens.length - 1) + '\uE001'; };
  let s = source.replace(/\\([\\*_[\]()!])/g, (_, c) => hold(escapeHTML(c)));
  s = s.replace(/(!?)\[([^\]\n]*)\]\(([^)\n]*)\)/g, (whole, bang, label, dest) => {
    const url = safeURL(dest);
    if (!url || (bang && /^mailto:/i.test(url))) return hold(escapeHTML(whole));
    const src = bang && !/^(?:https?:\/\/|\/|images\/)/i.test(url) ? 'images/' + url : url;
    return hold(bang ? '<img src="' + escapeHTML(src) + '" alt="' + escapeHTML(label) + '" loading="lazy" decoding="async">' : '<a href="' + escapeHTML(url) + '">' + escapeHTML(label) + '</a>');
  });
  s = escapeHTML(s).replace(/\*\*([^*\n]+)\*\*/g,'<strong>$1</strong>')
    .replace(/__([^_\n]+)__/g,'<strong>$1</strong>')
    .replace(/(^|[^\w*])\*([^*\n]+)\*(?!\w)/g,'$1<em>$2</em>')
    .replace(/(^|[^\w_])_([^_\n]+)_(?!\w)/g,'$1<em>$2</em>');
  return s.replace(/\uE000(\d+)\uE001/g, (_, i) => tokens[Number(i)]);
}
class MarkdownParser {
  parse(markdown) {
    if (!markdown) return '';
    const lines = markdown.replace(/\r\n?/g,'\n').trim().split('\n'), out = [];
    let paragraph = [], list = null, quote = [];
    const flushP = () => { if (paragraph.length) out.push('<p>' + inline(paragraph.join(' ')) + '</p>'); paragraph = []; };
    const flushL = () => { if (list) out.push('<' + list.type + '>' + list.items.map(x => '<li>' + inline(x) + '</li>').join('') + '</' + list.type + '>'); list = null; };
    const flushQ = () => { if (quote.length) out.push('<blockquote><p>' + inline(quote.join(' ')) + '</p></blockquote>'); quote = []; };
    const flush = () => { flushP(); flushL(); flushQ(); };
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i], t = line.trim();
      if (!t) { flush(); continue; }
      const fence = t.match(/^(\x60{3,}|~{3,})/);
      if (fence) {
        flush(); const code = [];
        while (++i < lines.length && !lines[i].trim().startsWith(fence[1])) code.push(lines[i]);
        out.push('<pre><code>' + escapeHTML(code.join('\n')) + '</code></pre>'); continue;
      }
      const heading = t.match(/^(#{1,6})\s+(.+?)\s*#*\s*$/);
      if (heading) { flush(); const n = heading[1].length; out.push('<h' + n + '>' + inline(heading[2]) + '</h' + n + '>'); continue; }
      if (/^(?:-{3,}|\*{3,}|_{3,})$/.test(t)) { flush(); out.push('<hr>'); continue; }
      if (/^>\s?/.test(t)) { flushP(); flushL(); quote.push(t.replace(/^>\s?/,'')); continue; }
      flushQ();
      const ordered = t.match(/^\d+[.)]\s+(.+)$/), unordered = t.match(/^[-*+]\s+(.+)$/);
      if (ordered || unordered) {
        flushP(); const type = ordered ? 'ol' : 'ul';
        if (list && list.type !== type) flushL();
        if (!list) list = {type,items:[]};
        list.items.push((ordered || unordered)[1]); continue;
      }
      flushL(); paragraph.push(t);
    }
    flush(); return out.join('\n\n');
  }
  extractTitle(markdown) {
    if (!markdown) return 'Untitled Chapter';
    const match = markdown.replace(/\r\n?/g,'\n').match(/^#\s+(.+?)\s*#*\s*$/m);
    return match ? match[1].trim() : 'Untitled Chapter';
  }
}
export default new MarkdownParser();
