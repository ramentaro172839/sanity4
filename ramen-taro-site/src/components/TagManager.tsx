'use client'

import React, { useState, useEffect } from 'react';
import { client } from '../../lib/sanity';

interface Tag {
  _id: string;
  title: string;
  slug: { current: string };
  color?: string;
  _createdAt: string;
}

interface Post {
  _id: string;
  title: string;
  autoTagged?: boolean;
  tags?: { title: string }[];
}

export default function TagManager() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [bulkTagging, setBulkTagging] = useState(false);
  const [stats, setStats] = useState({
    totalTags: 0,
    totalPosts: 0,
    autoTaggedPosts: 0,
    untaggedPosts: 0
  });

  // データ取得
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // タグ一覧取得
      const tagsData = await client.fetch(`
        *[_type == "tag"] | order(_createdAt desc) {
          _id,
          title,
          slug,
          color,
          _createdAt
        }
      `);

      // 記事一覧取得
      const postsData = await client.fetch(`
        *[_type == "post"] | order(_createdAt desc) {
          _id,
          title,
          autoTagged,
          tags[]-> {
            title
          }
        }
      `);

      setTags(tagsData);
      setPosts(postsData);

      // 統計計算
      const totalTags = tagsData.length;
      const totalPosts = postsData.length;
      const autoTaggedPosts = postsData.filter((post: Post) => post.autoTagged).length;
      const untaggedPosts = postsData.filter((post: Post) => !post.tags || post.tags.length === 0).length;

      setStats({
        totalTags,
        totalPosts,
        autoTaggedPosts,
        untaggedPosts
      });

    } catch (error) {
      console.error('データ取得エラー:', error);
    } finally {
      setLoading(false);
    }
  };

  // 一括自動タグ付け
  const handleBulkAutoTag = async () => {
    if (!confirm('すべての未タグ付け記事に自動タグを適用しますか？')) {
      return;
    }

    setBulkTagging(true);
    try {
      const response = await fetch('/api/bulk-auto-tag', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          force: false,
          maxPosts: 50
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      
      if (result.success) {
        alert(`一括タグ付け完了\n成功: ${result.result.successful}件\n失敗: ${result.result.failed}件`);
      } else {
        alert(`エラー: ${result.error || '一括タグ付けに失敗しました'}`);
      }
      
      await fetchData(); // データ再取得
    } catch (error) {
      console.error('一括タグ付けエラー:', error);
      alert('一括タグ付け中にエラーが発生しました');
    } finally {
      setBulkTagging(false);
    }
  };

  // タグ削除
  const handleDeleteTag = async (tagId: string, tagTitle: string) => {
    if (!confirm(`タグ "${tagTitle}" を削除しますか？`)) {
      return;
    }

    try {
      await client.delete(tagId);
      await fetchData();
      alert('タグを削除しました');
    } catch (error) {
      console.error('タグ削除エラー:', error);
      alert('タグの削除中にエラーが発生しました');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2">データを読み込み中...</span>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* ヘッダー */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">タグ管理システム</h1>
        
        {/* 統計情報 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{stats.totalTags}</div>
            <div className="text-sm text-gray-600">総タグ数</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{stats.totalPosts}</div>
            <div className="text-sm text-gray-600">総記事数</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">{stats.autoTaggedPosts}</div>
            <div className="text-sm text-gray-600">自動タグ付け済み</div>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">{stats.untaggedPosts}</div>
            <div className="text-sm text-gray-600">未タグ付け記事</div>
          </div>
        </div>

        {/* アクションボタン */}
        <div className="flex gap-4">
          <button
            onClick={handleBulkAutoTag}
            disabled={bulkTagging}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            {bulkTagging ? '処理中...' : '一括自動タグ付け'}
          </button>
          
          <button
            onClick={fetchData}
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            データ更新
          </button>
        </div>
      </div>

      {/* タグ一覧 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">タグ一覧</h2>
        
        {tags.length === 0 ? (
          <p className="text-gray-500">タグがありません</p>
        ) : (
          <div className="grid gap-4">
            {tags.map(tag => (
              <div key={tag._id} className="border border-gray-200 rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: tag.color || '#3b82f6' }}
                  ></div>
                  <div>
                    <h3 className="font-medium text-gray-900">{tag.title}</h3>
                    <p className="text-sm text-gray-500">/{tag.slug.current}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">
                    {new Date(tag._createdAt).toLocaleDateString('ja-JP')}
                  </span>
                  <button
                    onClick={() => handleDeleteTag(tag._id, tag.title)}
                    className="text-red-600 hover:text-red-700 text-sm font-medium"
                  >
                    削除
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 記事一覧 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">記事タグ状況</h2>
        
        {posts.length === 0 ? (
          <p className="text-gray-500">記事がありません</p>
        ) : (
          <div className="space-y-3">
            {posts.map(post => (
              <div key={post._id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">{post.title}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      {post.autoTagged && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                          自動タグ付け済み
                        </span>
                      )}
                      <span className="text-sm text-gray-500">
                        タグ数: {post.tags?.length || 0}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {post.tags?.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800"
                      >
                        {tag.title}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}