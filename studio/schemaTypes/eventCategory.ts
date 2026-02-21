import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'eventCategory',
  title: 'Event Category',
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
      name: 'colorCode',
      title: 'Color Code',
      type: 'string',
      description: 'Hex color for category badge (e.g. #7c3aed)',
    }),
  ],
  preview: {
    select: {title: 'name'},
  },
})
