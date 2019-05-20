export default function removeFootnotes(paragraph) {
    return paragraph.replace(/\[\d*\]/gi, "")
}