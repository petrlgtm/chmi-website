import {defineField, defineType, defineArrayMember} from 'sanity'

export default defineType({
  name: 'leadership',
  title: 'Leadership',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'Combined display name, e.g. "Apostle Isaiah & Rev. Deborah Mbuga"',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: 'e.g. "General Overseers, Christ\'s Heart Ministries International"',
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'blockContent',
      description: 'Shared biography shown on the About/Leadership section.',
    }),
    defineField({
      name: 'image',
      title: 'Portrait Photo',
      type: 'image',
      options: {hotspot: true},
      description:
        'Shared portrait photo of the General Overseers. Recommended: 3:4 portrait, at least 600×800px.',
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          description: 'e.g. "Apostle Isaiah & Rev. Deborah Mbuga"',
        }),
      ],
    }),
    defineField({
      name: 'leaders',
      title: 'Individual Leaders',
      type: 'array',
      description: 'Individual leader entries (used when displaying leaders separately).',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Name',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              description: 'e.g. "Apostle", "Rev."',
            }),
            defineField({
              name: 'role',
              title: 'Role',
              type: 'string',
              description: 'e.g. "General Overseer", "Co-Founder"',
            }),
            defineField({
              name: 'bio',
              title: 'Individual Bio',
              type: 'blockContent',
            }),
            defineField({
              name: 'image',
              title: 'Individual Portrait',
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
          ],
          preview: {
            select: {title: 'name', subtitle: 'role', media: 'image'},
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {title: 'heading'},
    prepare({title}) {
      return {title: title || 'Leadership', subtitle: 'General Overseers'}
    },
  },
})
