import { PortableText, type PortableTextComponents } from '@portabletext/react'
import { urlFor } from '@/lib/sanity'

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      try {
        const src = urlFor(value).width(1200).auto('format').url()
        return <img src={src} alt={value?.alt || ''} loading="lazy" />
      } catch {
        return null
      }
    },
  },
  marks: {
    link: ({ children, value }) => (
      <a href={value?.href} target={value?.blank ? '_blank' : undefined} rel={value?.blank ? 'noreferrer' : undefined}>
        {children}
      </a>
    ),
  },
}

export default function PortableContent({ value, className = 'publication-content' }: { value?: unknown[]; className?: string }) {
  if (!value?.length) return null
  return <div className={className}><PortableText value={value as never} components={components} /></div>
}
