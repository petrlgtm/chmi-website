import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'branch',
  title: 'Branch',
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
      name: 'address',
      title: 'Address',
      type: 'string',
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
      name: 'city',
      title: 'City',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'country',
      title: 'Country',
      type: 'string',
      initialValue: 'Uganda',
    }),
    defineField({
      name: 'lat',
      title: 'Latitude',
      type: 'number',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'lng',
      title: 'Longitude',
      type: 'number',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'Active', value: 'active'},
          {title: 'Online Only', value: 'online'},
          {title: 'Inactive', value: 'inactive'},
        ],
      },
      initialValue: 'active',
    }),
    defineField({
      name: 'services',
      title: 'Service Times Summary',
      type: 'text',
    }),
    defineField({
      name: 'images',
      title: 'Branch Images',
      type: 'array',
      of: [{type: 'image', options: {hotspot: true}}],
    }),
  ],
  preview: {
    select: {title: 'name', subtitle: 'city'},
  },
})
