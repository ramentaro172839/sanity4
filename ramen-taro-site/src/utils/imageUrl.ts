import imageUrlBuilder from '@sanity/image-url';
import { client } from '../../lib/sanity';

// Sanity画像URLビルダーを初期化
const builder = imageUrlBuilder(client);

// 画像URL生成のヘルパー関数
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
  return builder.image(source);
}

// Sanity画像参照から完全なURLを生成
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getSanityImageUrl(imageRef: any): string | null {
  if (!imageRef) return null;
  
  try {
    // 既に完全なURLの場合はそのまま返す
    if (typeof imageRef === 'string' && imageRef.startsWith('http')) {
      return imageRef;
    }
    
    // Sanity画像参照の場合はURLを生成
    if (imageRef.asset) {
      return urlFor(imageRef.asset).url();
    }
    
    // 画像参照IDのみの場合
    if (typeof imageRef === 'string') {
      return urlFor(imageRef).url();
    }
    
    // 直接的な画像オブジェクトの場合
    if (imageRef._type === 'image') {
      return urlFor(imageRef).url();
    }
    
    return null;
  } catch (error) {
    console.error('Error generating Sanity image URL:', error, imageRef);
    return null;
  }
}

// 画像URL生成（サイズ指定付き）
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getSanityImageUrlWithSize(imageRef: any, width: number, height?: number): string | null {
  if (!imageRef) return null;
  
  try {
    const baseUrl = urlFor(imageRef);
    if (height) {
      return baseUrl.width(width).height(height).url();
    }
    return baseUrl.width(width).url();
  } catch (error) {
    console.error('Error generating Sanity image URL with size:', error);
    return null;
  }
}