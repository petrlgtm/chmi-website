import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'name', maxLength: 96},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'dateStart',
      title: 'Start Date',
      type: 'date',
      description: 'Used for sorting and countdown logic',
    }),
    defineField({
      name: 'dateDisplay',
      title: 'Display Date',
      type: 'string',
      description: 'Human-readable date string shown in UI (e.g. "21st February 2026", "8th-10th May 2026")',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'time',
      title: 'Time',
      type: 'string',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'image',
      title: 'Event Image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{type: 'eventCategory'}],
    }),
    defineField({
      name: 'isMajor',
      title: 'Is Major Event',
      type: 'boolean',
      description: 'Major events are shown prominently on the homepage marquee',
      initialValue: false,
    }),
  ],
  orderings: [
    {
      title: 'Date (Ascending)',
      name: 'dateAsc',
      by: [{field: 'dateStart', direction: 'asc'}],
    },
  ],
  preview: {
    select: {title: 'name', subtitle: 'dateDisplay', media: 'image'},
  },
})
