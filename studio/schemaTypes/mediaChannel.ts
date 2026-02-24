import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'mediaChannel',
  title: 'Media Channel',
  type: 'document',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (rule) => rule.required(),
      description: 'e.g. PROMISE TV, Christ\'s Heart TV',
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
      description: 'Short description shown below the channel name',
    }),
    defineField({
      name: 'color',
      title: 'Accent Color (CSS)',
      type: 'string',
      description: 'CSS color value e.g. var(--primary), #6b21a8',
      initialValue: 'var(--primary)',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    }),
  ],
  orderings: [
    {title: 'Display Order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]},
  ],
  preview: {
    select: {title: 'label', subtitle: 'url'},
  },
})
