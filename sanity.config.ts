import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'switchyard',
  basePath: '/studio',
  projectId: '6dzdb4x6',
  dataset: 'production',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem().title('Blog Posts').child(S.documentTypeList('blogPost').title('Blog Posts')),
            S.listItem().title('Case Studies').child(S.documentTypeList('caseStudy').title('Case Studies')),
            S.listItem().title('White Papers').child(S.documentTypeList('whitePaper').title('White Papers')),
            S.listItem().title('Newsletters').child(S.documentTypeList('newsletter').title('Newsletters')),
            S.listItem().title('Categories').child(S.documentTypeList('category').title('Categories')),
          ]),
    }),
  ],
  schema: {
    types: schemaTypes,
  },
})
