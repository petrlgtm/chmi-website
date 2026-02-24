import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: "Christ's Heart CMS",

  projectId: '730sqy7i',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Organization Info')
              .child(
                S.document()
                  .schemaType('organizationInfo')
                  .documentId('organizationInfo'),
              ),
            S.listItem()
              .title('Site Images')
              .child(
                S.document()
                  .schemaType('siteImages')
                  .documentId('siteImages')
                  .title('Site Images — Page Backgrounds & Galleries'),
              ),
            S.divider(),
            S.listItem()
              .title('Branches')
              .schemaType('branch')
              .child(S.documentTypeList('branch').title('Branches')),
            S.listItem()
              .title('Pastors')
              .schemaType('pastor')
              .child(S.documentTypeList('pastor').title('Pastors')),
            S.divider(),
            S.listItem()
              .title('Events')
              .schemaType('event')
              .child(S.documentTypeList('event').title('Events')),
            S.listItem()
              .title('Event Categories')
              .schemaType('eventCategory')
              .child(S.documentTypeList('eventCategory').title('Event Categories')),
            S.divider(),
            S.listItem()
              .title('Services')
              .schemaType('serviceType')
              .child(S.documentTypeList('serviceType').title('Services')),
            S.divider(),
            S.listItem()
              .title('Blog Posts')
              .schemaType('blogPost')
              .child(S.documentTypeList('blogPost').title('Blog Posts')),
            S.divider(),
            S.listItem()
              .title('Leadership')
              .child(
                S.document()
                  .schemaType('leadership')
                  .documentId('leadership')
                  .title('Leadership — General Overseers'),
              ),
            S.listItem()
              .title('Statement of Faith')
              .schemaType('statementOfFaith')
              .child(S.documentTypeList('statementOfFaith').title('Statement of Faith')),
            S.divider(),
            S.listItem()
              .title('Giving Categories')
              .schemaType('giveCategory')
              .child(S.documentTypeList('giveCategory').title('Giving Categories')),
            S.listItem()
              .title('Testimonials')
              .schemaType('testimonial')
              .child(S.documentTypeList('testimonial').title('Testimonials')),
            S.divider(),
            S.listItem()
              .title('Books / Resources')
              .schemaType('resource')
              .child(S.documentTypeList('resource').title('Books / Resources')),
            S.listItem()
              .title('Media Channels')
              .schemaType('mediaChannel')
              .child(S.documentTypeList('mediaChannel').title('Media Channels')),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
