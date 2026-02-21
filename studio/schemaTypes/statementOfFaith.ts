import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'statementOfFaith',
  title: 'Statement of Faith',
  type: 'document',
  fields: [
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'text',
      title: 'Statement Text',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'Optional grouping (e.g. "God", "Salvation", "Church")',
    }),
    defineField({
      name: 'scriptureReference',
      title: 'Scripture Reference',
      type: 'string',
      description: 'Supporting Bible verse reference',
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
    select: {title: 'text', subtitle: 'order'},
    prepare({title, subtitle}) {
      return {
        title: title?.substring(0, 80) + (title && title.length > 80 ? '...' : ''),
        subtitle: `#${subtitle}`,
      }
    },
  },
})
