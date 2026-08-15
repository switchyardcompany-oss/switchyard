import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { FileText, Briefcase, BookOpen, Mail, Tag } from 'lucide-react'
import { schemaTypes } from './schemaTypes'

export default defineConfig({
  name: 'keentel-general-contractors',
  title: 'Keentel CMS',
  basePath: '/studio',
  projectId: '6dzdb4x6',
  dataset: 'production',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem().title('Blog Posts').icon(FileText).child(S.documentTypeList('blogPost').title('Blog Posts')),
            S.listItem().title('Case Studies').icon(Briefcase).child(S.documentTypeList('caseStudy').title('Case Studies')),
            S.listItem().title('White Papers').icon(BookOpen).child(S.documentTypeList('whitePaper').title('White Papers')),
            S.listItem().title('Newsletters').icon(Mail).child(S.documentTypeList('newsletter').title('Newsletters')),
            S.divider(),
            S.listItem().title('Categories').icon(Tag).child(S.documentTypeList('category').title('Categories')),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
})
