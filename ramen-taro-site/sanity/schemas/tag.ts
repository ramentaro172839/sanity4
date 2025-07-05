import { defineField, defineType } from 'sanity'

export const tag = defineType({
  name: 'tag',
  title: 'タグ',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'タグ名',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'スラッグ',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      title: '説明',
      type: 'text',
      rows: 2
    })
  ],
  
  preview: {
    select: {
      title: 'title',
      subtitle: 'description'
    }
  }
})