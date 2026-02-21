import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'serviceType',
  title: 'Service Type',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'shortDesc',
      title: 'Short Description',
      type: 'string',
      description: 'Brief one-liner shown on service cards',
    }),
    defineField({
      name: 'description',
      title: 'Full Description',
      type: 'array',
      of: [{type: 'text'}],
      description: 'Each item is a paragraph',
    }),
    defineField({
      name: 'heroImage',
      title: 'Service Hero Image',
      type: 'image',
      options: {hotspot: true},
      description: 'Banner image shown at the top of the service detail page. Recommended: 16:9 landscape, at least 1200×675px.',
      fields: [
        defineField({name: 'alt', type: 'string', title: 'Alt Text', description: 'Describe the image for accessibility'}),
      ],
    }),
    defineField({
      name: 'schedules',
      title: 'General Schedule',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'day', title: 'Day', type: 'string'},
            {name: 'time', title: 'Time', type: 'string'},
            {name: 'details', title: 'Details', type: 'string'},
          ],
        },
      ],
    }),
    defineField({
      name: 'branchSchedules',
      title: 'Branch Schedules',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'branchId', title: 'Branch ID', type: 'string'},
            {name: 'branchName', title: 'Branch Name', type: 'string'},
            {name: 'city', title: 'City', type: 'string'},
            {name: 'times', title: 'Times', type: 'string'},
          ],
        },
      ],
    }),
    defineField({
      name: 'cellLocations',
      title: 'Cell Locations',
      type: 'array',
      description: 'Only used for Home Cells service type',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'area', title: 'Area', type: 'string'},
            {name: 'city', title: 'City', type: 'string'},
            {name: 'day', title: 'Day', type: 'string'},
            {name: 'time', title: 'Time', type: 'string'},
            {name: 'leader', title: 'Leader', type: 'string'},
            {name: 'contact', title: 'Contact', type: 'string'},
          ],
        },
      ],
    }),
    defineField({
      name: 'highlights',
      title: 'What to Expect',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'title', title: 'Title', type: 'string'},
            {name: 'text', title: 'Text', type: 'text'},
          ],
        },
      ],
    }),
    defineField({
      name: 'scripture',
      title: 'Featured Scripture',
      type: 'object',
      fields: [
        {name: 'text', title: 'Text', type: 'text'},
        {name: 'ref', title: 'Reference', type: 'string'},
      ],
    }),
  ],
  preview: {
    select: {title: 'title', media: 'heroImage'},
  },
})
