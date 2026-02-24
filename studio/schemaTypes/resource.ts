import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'resource',
  title: 'Resource (Book)',
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
      name: 'author',
      title: 'Author',
      type: 'string',
      initialValue: 'Apostle Isaiah Mbuga',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'image',
      title: 'Cover Image',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
        }),
      ],
    }),
    defineField({
      name: 'price',
      title: 'Price (UGX)',
      type: 'number',
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: 'orderUrl',
      title: 'Order URL / WhatsApp Link',
      type: 'url',
      description: 'WhatsApp or external link for ordering',
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
    {title: 'Title', name: 'titleAsc', by: [{field: 'title', direction: 'asc'}]},
  ],
  preview: {
    select: {title: 'title', subtitle: 'author', media: 'image'},
  },
})
