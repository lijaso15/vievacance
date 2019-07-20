export default function removeFootnotes(paragraph: string) {
  return paragraph.replace(/\[\d*\]/gi, "");
}
