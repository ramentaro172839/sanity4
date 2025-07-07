// 日付フォーマット用のユーティリティ関数

export function formatDate(dateString: string): string {
  if (!dateString) return '日付不明';
  
  try {
    const date = new Date(dateString);
    
    // 無効な日付をチェック
    if (isNaN(date.getTime())) {
      return '日付不明';
    }
    
    // 1970年の日付は無効として扱う（Unixエポック）
    if (date.getFullYear() <= 1970) {
      return '日付不明';
    }
    
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch (error) {
    console.error('Date formatting error:', error);
    return '日付不明';
  }
}

export function formatShortDate(dateString: string): string {
  if (!dateString) return '不明';
  
  try {
    const date = new Date(dateString);
    
    // 無効な日付をチェック
    if (isNaN(date.getTime())) {
      return '不明';
    }
    
    // 1970年の日付は無効として扱う
    if (date.getFullYear() <= 1970) {
      return '不明';
    }
    
    return date.toLocaleDateString('ja-JP', {
      month: 'short',
      day: 'numeric'
    });
  } catch (error) {
    console.error('Short date formatting error:', error);
    return '不明';
  }
}

export function formatRelativeDate(dateString: string): string {
  if (!dateString) return '不明';
  
  try {
    const date = new Date(dateString);
    const now = new Date();
    
    // 無効な日付をチェック
    if (isNaN(date.getTime())) {
      return '不明';
    }
    
    // 1970年の日付は無効として扱う
    if (date.getFullYear() <= 1970) {
      return '不明';
    }
    
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) {
      return 'たった今';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes}分前`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours}時間前`;
    } else if (diffInSeconds < 2592000) { // 30日
      const days = Math.floor(diffInSeconds / 86400);
      return `${days}日前`;
    } else {
      return formatDate(dateString);
    }
  } catch (error) {
    console.error('Relative date formatting error:', error);
    return '不明';
  }
}

export function getValidDate(publishedAt?: string, createdAt?: string, updatedAt?: string): string {
  // 優先順位: publishedAt > updatedAt > createdAt
  const candidates = [publishedAt, updatedAt, createdAt].filter(Boolean);
  
  for (const candidate of candidates) {
    if (candidate) {
      const date = new Date(candidate);
      if (!isNaN(date.getTime()) && date.getFullYear() > 1970) {
        return candidate;
      }
    }
  }
  
  // どの日付も有効でない場合は現在日時を返す
  return new Date().toISOString();
}