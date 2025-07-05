import { defineField, defineType } from 'sanity'

export const category = defineType({
  name: 'category',
  title: 'カテゴリー',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'カテゴリー名',
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
      rows: 3
    }),
    defineField({
      name: 'color',
      title: 'カラー',
      type: 'string',
      options: {
        list: [
          { title: 'ブルー', value: 'blue' },
          { title: 'グリーン', value: 'green' },
          { title: 'レッド', value: 'red' },
          { title: 'イエロー', value: 'yellow' },
          { title: 'パープル', value: 'purple' },
          { title: 'ピンク', value: 'pink' },
          { title: 'グレー', value: 'gray' }
        ]
      },
      initialValue: 'blue'
    })
  ],
  
  preview: {
    select: {
      title: 'title',
      subtitle: 'description'
    }
  }
})