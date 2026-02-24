import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'siteImages',
  title: 'Site Images',
  type: 'document',
  fields: [
    // ── Page Hero Backgrounds ─────────────────────────────────────────
    defineField({
      name: 'heroHome',
      title: 'Home Page — Hero Background',
      type: 'image',
      options: {hotspot: true},
      description: 'Full-width background behind the hero text and countdown timer on the homepage',
      fields: [
        defineField({name: 'alt', type: 'string', title: 'Alt Text'}),
      ],
    }),
    defineField({
      name: 'heroAbout',
      title: 'About Page — Hero Background',
      type: 'image',
      options: {hotspot: true},
      description: 'Full-width background at the top of the About page',
      fields: [
        defineField({name: 'alt', type: 'string', title: 'Alt Text'}),
      ],
    }),
    defineField({
      name: 'heroBlog',
      title: 'Blog Page — Hero Background',
      type: 'image',
      options: {hotspot: true},
      description: 'Full-width background at the top of the Blog listing page',
      fields: [
        defineField({name: 'alt', type: 'string', title: 'Alt Text'}),
      ],
    }),
    defineField({
      name: 'heroEvents',
      title: 'Events Page — Hero Background',
      type: 'image',
      options: {hotspot: true},
      description: 'Full-width background at the top of the Events page',
      fields: [
        defineField({name: 'alt', type: 'string', title: 'Alt Text'}),
      ],
    }),
    defineField({
      name: 'heroSermons',
      title: 'Sermons Page — Hero Background',
      type: 'image',
      options: {hotspot: true},
      description: 'Full-width background at the top of the Sermons page',
      fields: [
        defineField({name: 'alt', type: 'string', title: 'Alt Text'}),
      ],
    }),
    defineField({
      name: 'heroGive',
      title: 'Give Page — Hero Background',
      type: 'image',
      options: {hotspot: true},
      description: 'Full-width background at the top of the Give/Donate page',
      fields: [
        defineField({name: 'alt', type: 'string', title: 'Alt Text'}),
      ],
    }),
    defineField({
      name: 'heroResources',
      title: 'Resources Page — Hero Background',
      type: 'image',
      options: {hotspot: true},
      description: 'Full-width background at the top of the Resources page',
      fields: [
        defineField({name: 'alt', type: 'string', title: 'Alt Text'}),
      ],
    }),
    defineField({
      name: 'heroContact',
      title: 'Contact Page — Hero Background',
      type: 'image',
      options: {hotspot: true},
      description: 'Full-width background at the top of the Contact page',
      fields: [
        defineField({name: 'alt', type: 'string', title: 'Alt Text'}),
      ],
    }),
    defineField({
      name: 'heroBranches',
      title: 'Branches Page — Hero Background',
      type: 'image',
      options: {hotspot: true},
      description: 'Full-width background at the top of the Branches page',
      fields: [
        defineField({name: 'alt', type: 'string', title: 'Alt Text'}),
      ],
    }),

    // ── Section Backgrounds ───────────────────────────────────────────
    defineField({
      name: 'serviceCards',
      title: 'Home Page — Service Card Backgrounds',
      type: 'array',
      description: 'Background images for the 6 service cards on the homepage (Sunday, Discipleship, Lunch Hour, Overnight, Home Cells, Night Services)',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({name: 'label', type: 'string', title: 'Card Label', description: 'Which card this image is for (e.g. "Sunday Services")'}),
            defineField({name: 'alt', type: 'string', title: 'Alt Text'}),
          ],
        },
      ],
    }),
    defineField({
      name: 'aboutHistoryImage',
      title: 'About Page — History Feature Image',
      type: 'image',
      options: {hotspot: true},
      description: 'The large featured image in the history mosaic section (left column)',
      fields: [
        defineField({name: 'alt', type: 'string', title: 'Alt Text'}),
      ],
    }),
    defineField({
      name: 'aboutStoryImage',
      title: 'About Page — Our Story Image',
      type: 'image',
      options: {hotspot: true},
      description: 'Image beside the "Our Story" text section',
      fields: [
        defineField({name: 'alt', type: 'string', title: 'Alt Text'}),
      ],
    }),
    defineField({
      name: 'aboutGallery',
      title: 'About Page — Gallery Images',
      type: 'array',
      description: 'Photo gallery on the About page (7 images). The first 4 are also used in the history mosaic.',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({name: 'alt', type: 'string', title: 'Alt Text'}),
          ],
        },
      ],
    }),
    defineField({
      name: 'giveImpact',
      title: 'Give Page — Impact Section Images',
      type: 'array',
      description: 'Images for the 3 impact cards on the Give page',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({name: 'alt', type: 'string', title: 'Alt Text'}),
          ],
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Site Images'}
    },
  },
})
