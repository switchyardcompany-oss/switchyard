import { defineArrayMember, defineField, defineType } from 'sanity'

const faq = defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'object',
  fields: [
    defineField({ name: 'q', title: 'Question', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'a', title: 'Answer', type: 'text', rows: 4, validation: (rule) => rule.required() }),
  ],
})

export const blogPost = defineType({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 }, validation: (rule) => rule.required() }),
    defineField({ name: 'date', title: 'Date', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'category', title: 'Category', type: 'string' }),
    defineField({ name: 'subtitle', title: 'Subtitle', type: 'string' }),
    defineField({ name: 'metaDescription', title: 'Meta Description', type: 'text', rows: 3 }),
    defineField({ name: 'featuredImage', title: 'Featured Image URL', type: 'url' }),
    defineField({ name: 'content', title: 'Content HTML', type: 'text', rows: 16, description: 'Paste the article HTML. Existing blog styling will be preserved.' }),
    defineField({ name: 'faqs', title: 'FAQs', type: 'array', of: [defineArrayMember({ type: 'faq' })] }),
    defineField({ name: 'authorName', title: 'Author Name', type: 'string' }),
    defineField({ name: 'authorTitle', title: 'Author Title', type: 'string' }),
    defineField({ name: 'authorBio', title: 'Author Bio', type: 'text', rows: 4 }),
    defineField({ name: 'authorImage', title: 'Author Image URL', type: 'url' }),
    defineField({ name: 'ctaTitle', title: 'CTA Title', type: 'string' }),
    defineField({ name: 'ctaText', title: 'CTA Text', type: 'text', rows: 3 }),
    defineField({ name: 'ctaImage', title: 'CTA Image URL', type: 'url' }),
    defineField({ name: 'ctaButton1Text', title: 'Primary Button Text', type: 'string' }),
    defineField({ name: 'ctaButton1Link', title: 'Primary Button Link', type: 'string' }),
    defineField({ name: 'ctaButton2Text', title: 'Secondary Button Text', type: 'string' }),
    defineField({ name: 'ctaButton2Link', title: 'Secondary Button Link', type: 'string' }),
  ],
  preview: { select: { title: 'title', subtitle: 'category', media: 'featuredImage' } },
})

export const schemaTypes = [blogPost, faq]
