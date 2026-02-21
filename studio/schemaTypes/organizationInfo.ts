import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'organizationInfo',
  title: 'Organization Info',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Organization Name',
      type: 'string',
      initialValue: "Christ's Heart Ministries International",
    }),
    defineField({
      name: 'foundedYear',
      title: 'Founded Year',
      type: 'number',
      initialValue: 2007,
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'officeHours',
      title: 'Office Hours',
      type: 'string',
    }),
    defineField({
      name: 'mission',
      title: 'Mission Statement',
      type: 'text',
    }),
    defineField({
      name: 'vision',
      title: 'Vision Statement',
      type: 'text',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        {name: 'facebook', title: 'Facebook', type: 'url'},
        {name: 'instagram', title: 'Instagram', type: 'url'},
        {name: 'twitter', title: 'Twitter/X', type: 'url'},
        {name: 'youtube', title: 'YouTube', type: 'url'},
        {name: 'tiktok', title: 'TikTok', type: 'url'},
      ],
    }),
  ],
  preview: {
    select: {title: 'name'},
  },
})
