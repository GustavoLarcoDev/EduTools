import { Fragment, type ReactNode } from 'react'

/**
 * Tiny, dependency-free renderer for tutorial bodies. Content is plain text; blocks are
 * separated by blank lines. Supported conventions (all optional, so plain paragraphs
 * from the API render unchanged):
 *   "## Heading"            → subheading
 *   "- item" lines          → bullet list
 *   "1. item" lines         → numbered list
 *   ``` fenced block ```    → code block
 *   `inline code`, **bold** → inline code / bold
 */
function inline(text: string): ReactNode[] {
  return text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith('`') && part.endsWith('`') && part.length > 2 ? (
      <code key={i} className="rounded-md bg-slate-100 px-1.5 py-0.5 font-mono text-[0.85em] text-ink">
        {part.slice(1, -1)}
      </code>
    ) : part.startsWith('**') && part.endsWith('**') && part.length > 4 ? (
      <strong key={i} className="font-semibold text-ink">
        {part.slice(2, -2)}
      </strong>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    )
  )
}

function splitBlocks(text: string): string[] {
  const blocks: string[] = []
  const lines = text.replace(/\r\n/g, '\n').split('\n')
  let buf: string[] = []
  let inFence = false
  const flush = () => {
    if (buf.join('').trim()) blocks.push(buf.join('\n'))
    buf = []
  }
  for (const line of lines) {
    if (line.trim().startsWith('```')) {
      if (inFence) {
        buf.push(line)
        flush()
        inFence = false
      } else {
        flush()
        buf.push(line)
        inFence = true
      }
      continue
    }
    if (!inFence && !line.trim()) flush()
    else buf.push(line)
  }
  flush()
  return blocks
}

export function RichText({ text }: { text: string }) {
  return (
    <div className="space-y-4 text-[15px] leading-7 text-slate-700">
      {splitBlocks(text).map((block, i) => {
        const lines = block.split('\n')
        if (block.trim().startsWith('```')) {
          const code = lines.slice(1, lines[lines.length - 1].trim().startsWith('```') ? -1 : undefined).join('\n')
          return (
            <pre key={i} className="overflow-x-auto rounded-2xl bg-ink p-4 font-mono text-[13px] leading-6 text-slate-100">
              <code>{code}</code>
            </pre>
          )
        }
        if (block.startsWith('## ')) {
          return (
            <h3 key={i} className="pt-3 font-display text-lg font-bold text-ink">
              {inline(block.slice(3))}
            </h3>
          )
        }
        if (lines.every((l) => /^\s*-\s+/.test(l))) {
          return (
            <ul key={i} className="list-disc space-y-1.5 pl-5 marker:text-brand-500">
              {lines.map((l, j) => (
                <li key={j}>{inline(l.replace(/^\s*-\s+/, ''))}</li>
              ))}
            </ul>
          )
        }
        if (lines.every((l) => /^\s*\d+\.\s+/.test(l))) {
          return (
            <ol key={i} className="list-decimal space-y-1.5 pl-5 marker:font-semibold marker:text-brand-600">
              {lines.map((l, j) => (
                <li key={j}>{inline(l.replace(/^\s*\d+\.\s+/, ''))}</li>
              ))}
            </ol>
          )
        }
        return <p key={i}>{inline(block)}</p>
      })}
    </div>
  )
}

/** Plain-text excerpt for cards: drops code blocks and markup characters. */
export function plainExcerpt(text: string) {
  return text
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/^##\s+/gm, '')
    .replace(/^\s*(-|\d+\.)\s+/gm, '')
    .replace(/`|\*\*/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}
