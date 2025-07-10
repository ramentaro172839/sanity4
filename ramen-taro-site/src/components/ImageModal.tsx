'use client'

import { useEffect } from 'react'
import Image from 'next/image'

interface ImageModalProps {
  isOpen: boolean
  onClose: () => void
  imageSrc: string
  imageAlt: string
  title: string
}

export default function ImageModal({ isOpen, onClose, imageSrc, imageAlt, title }: ImageModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* 背景オーバーレイ */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* モーダルコンテンツ */}
      <div className="relative z-10 max-w-4xl max-h-[90vh] w-full">
        {/* 閉じるボタン */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-20"
          aria-label="閉じる"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* 画像コンテナ */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
          <div className="relative">
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={800}
              height={600}
              className="w-full h-auto max-h-[70vh] object-contain"
              priority
            />
          </div>
          
          {/* タイトル */}
          <div className="p-6 bg-gradient-to-r from-slate-800 to-slate-900">
            <h3 className="text-2xl font-bold text-white text-center">
              {title}
            </h3>
          </div>
        </div>
      </div>
    </div>
  )
}