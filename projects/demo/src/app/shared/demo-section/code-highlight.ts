/**
 * Lightweight syntax highlighter for the static Angular template snippets
 * shown inside demo pages. Not a general purpose HTML highlighter - it only
 * needs to handle the small subset of markup used in the Nexium demos.
 */
export function highlightHtml(source: string): string {
  const escaped = source
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Pull comments out before the other passes so their content can't be re-matched as tags/attrs.
  const comments: string[] = [];
  const withPlaceholders = escaped.replace(/&lt;!--[\s\S]*?--&gt;/g, (match) => {
    comments.push(match);
    return `\u0000${comments.length - 1}\u0000`;
  });

  const withTags = withPlaceholders.replace(
    /(&lt;\/?)([a-zA-Z][\w-]*)/g,
    (_match, bracket: string, tag: string) =>
      `${bracket}<span>${tag}</span>`
  );

  const withAttrs = withTags.replace(
    /([[(]?[a-zA-Z][\w-]*[\])]?)="([^"]*)"/g,
    (_match, name: string, value: string) =>
      `<span class="language-html-prop">${name}=</span><span class="language-html-prop-value">"${value}"</span>`
  );

  const withText = withAttrs.replace(
    /(&gt;)([^&<]+)(&lt;)/g,
    (match, open: string, text: string, close: string) =>
      text.trim() ? `${open}<span class="language-html-text">${text}</span>${close}` : match
  );

  return withText.replace(
    /\u0000(\d+)\u0000/g,
    (_match, index: string) => `<span class="language-html-comment">${comments[Number(index)]}</span>`
  );
}
