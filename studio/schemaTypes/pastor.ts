import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'pastor',
  title: 'Pastor',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      initialValue: 'Branch Pastor',
    }),
    defineField({
      name: 'image',
      title: 'Photo',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'branch',
      title: 'Branch',
      type: 'reference',
      to: [{type: 'branch'}],
    }),
  ],
  preview: {
    select: {title: 'name', subtitle: 'role', media: 'image'},
  },
})
