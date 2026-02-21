import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'text',
      title: 'Testimonial Text',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'branch',
      title: 'Branch',
      type: 'string',
      description: 'Branch name (e.g. "Christ\'s Heart Kampala")',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
    }),
  ],
  orderings: [
    {
      title: 'Order',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
  preview: {
    select: {title: 'name', subtitle: 'branch'},
  },
})
