import { defineField, defineType } from 'sanity'

export const post = defineType({
  name: 'post',
  title: 'ブログ記事',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'タイトル',
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
      name: 'excerpt',
      title: '抜粋',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'content',
      title: '本文',
      type: 'array',
      of: [
        {
          type: 'block'
        },
        {
          type: 'image',
          options: { hotspot: true }
        }
      ]
    }),
    defineField({
      name: 'featuredImage',
      title: 'アイキャッチ画像',
      type: 'image',
      options: {
        hotspot: true,
      }
    }),
    defineField({
      name: 'publishedAt',
      title: '公開日',
      type: 'datetime',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'categories',
      title: 'カテゴリー',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'category' } }]
    }),
    defineField({
      name: 'tags',
      title: 'タグ',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'tag' } }]
    }),
    defineField({
      name: 'isPublished',
      title: '公開状態',
      type: 'boolean',
      initialValue: false
    })
  ],
  
  preview: {
    select: {
      title: 'title',
      media: 'featuredImage'
    }
  }
})