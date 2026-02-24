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
      hidden: ({parent}) => !!parent?.isOnline,
      of: [
        {
          type: 'object',
          fields: [
            {name: 'branchId', title: 'Branch ID', type: 'string'},
            {name: 'branchName', title: 'Branch Name', type: 'string'},
            {name: 'city', title: 'City', type: 'string'},
            {name: 'times', title: 'Times', type: 'string'},
          ],
          preview: {
            select: {branchName: 'branchName', city: 'city', times: 'times'},
            prepare({branchName, city, times}: {branchName?: string; city?: string; times?: string}) {
              return {
                title: branchName || 'Unnamed Branch',
                subtitle: `${city || ''} · ${times || ''}`,
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'isOnline',
      title: 'Online Service',
      type: 'boolean',
      description: 'Toggle on if this service is streamed online (not branch-based)',
      initialValue: false,
    }),
    defineField({
      name: 'onlineDetails',
      title: 'Online Details',
      type: 'object',
      description: 'Only used when "Online Service" is enabled',
      hidden: ({parent}) => !parent?.isOnline,
      fields: [
        {name: 'host', title: 'Host', type: 'string', description: 'e.g. Apostle Isaiah Mbuga'},
        {
          name: 'platforms',
          title: 'Streaming Platforms',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {name: 'label', title: 'Label', type: 'string'},
                {name: 'url', title: 'URL', type: 'url'},
              ],
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'cellLocations',
      title: 'Cell Locations',
      type: 'array',
      description: 'Home cell meeting points — area, day/time, leader & contact. Add, edit, or remove cells here.',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'area', title: 'Area / Neighbourhood', type: 'string', description: 'e.g. Ntinda / Kisaasi'},
            {name: 'city', title: 'City', type: 'string', description: 'e.g. Kampala, Mukono'},
            {name: 'day', title: 'Meeting Day', type: 'string', description: 'e.g. Tuesday'},
            {name: 'time', title: 'Meeting Time', type: 'string', description: 'e.g. 6:30 PM'},
            {name: 'leader', title: 'Cell Leader', type: 'string'},
            {name: 'contact', title: 'Contact Number', type: 'string', description: 'Phone number with country code'},
          ],
          preview: {
            select: {area: 'area', city: 'city', day: 'day', time: 'time', leader: 'leader'},
            prepare({area, city, day, time, leader}: {area?: string; city?: string; day?: string; time?: string; leader?: string}) {
              return {
                title: `${area || 'Unnamed'} — ${city || ''}`,
                subtitle: `${day || ''} ${time || ''} · ${leader || 'No leader'}`,
              }
            },
          },
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
