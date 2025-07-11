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
        slugify: input => input
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^\w\-]+/g, '')
          .replace(/\-\-+/g, '-')
          .replace(/^-+/, '')
          .replace(/-+$/, '')
          .slice(0, 96)
      },
      validation: Rule => Rule.required().custom((slug) => {
        if (!slug || !slug.current) {
          return 'スラッグは必須です'
        }
        
        // URLやプロトコルが含まれていないかチェック
        if (slug.current.includes('http://') || slug.current.includes('https://') || slug.current.includes('://')) {
          return 'スラッグにはURLを含めることはできません。短いパス名を入力してください（例: hamcup-story）'
        }
        
        // スラッシュが含まれていないかチェック
        if (slug.current.includes('/')) {
          return 'スラッグにはスラッシュ（/）を含めることはできません'
        }
        
        // 適切な形式かチェック
        if (!/^[a-z0-9-]+$/.test(slug.current)) {
          return 'スラッグは小文字の英数字とハイフンのみ使用できます'
        }
        
        return true
      })
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
    }),
    defineField({
      name: 'autoTagSuggestions',
      title: '自動タグ提案',
      type: 'object',
      fields: [
        {
          name: 'lastAnalyzed',
          title: '最終分析日時',
          type: 'datetime'
        },
        {
          name: 'confidence',
          title: '提案信頼度',
          type: 'number'
        },
        {
          name: 'suggestedTags',
          title: '提案されたタグ',
          type: 'array',
          of: [{ type: 'string' }]
        }
      ],
      options: {
        collapsible: true,
        collapsed: true
      }
    }),
    defineField({
      name: 'autoTagged',
      title: '自動タグ付け済み',
      type: 'boolean',
      readOnly: true,
      hidden: true
    }),
    defineField({
      name: 'autoTaggedAt',
      title: '自動タグ付け日時',
      type: 'datetime',
      readOnly: true,
      hidden: true
    })
  ],
  
  preview: {
    select: {
      title: 'title',
      media: 'featuredImage'
    }
  }
})