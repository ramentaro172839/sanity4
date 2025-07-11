import TagManager from '@/components/TagManager';

export default function TagsAdminPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <TagManager />
    </div>
  );
}

export const metadata = {
  title: 'タグ管理 | らーめん太郎',
  description: '自動タグ付けシステムによるタグ管理画面',
};