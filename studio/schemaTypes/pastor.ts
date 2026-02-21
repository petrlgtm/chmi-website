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
      title: 'Pastor Photo',
      type: 'image',
      options: {hotspot: true},
      description: 'Headshot/portrait shown on the branch detail page. Recommended: 1:1 square, at least 400×400px.',
      fields: [
        defineField({name: 'alt', type: 'string', title: 'Alt Text', description: 'e.g. "Pastor John Doe"'}),
      ],
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
