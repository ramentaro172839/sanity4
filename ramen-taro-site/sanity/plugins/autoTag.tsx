import React, { useState, useCallback } from 'react';
import { definePlugin } from 'sanity';
import { TagIcon, SparklesIcon } from '@sanity/icons';
import { Button, Card, Stack, Text, Badge, Spinner, Box } from '@sanity/ui';

// 自動タグ提案コンポーネント
function AutoTagSuggestions({ 
  value, 
  onChange, 
  document 
}: { 
  value: any[]; 
  onChange: (tags: any[]) => void;
  document: any;
}) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [confidence, setConfidence] = useState(0);

  const analyzeTags = useCallback(async () => {
    if (!document?.title && !document?.excerpt && !document?.content) {
      alert('タイトル、抜粋、または本文を入力してからタグを提案してください。');
      return;
    }

    setLoading(true);
    try {
      // 本文をテキストに変換（Sanityのリッチテキスト形式から）
      let contentText = '';
      if (Array.isArray(document.content)) {
        contentText = document.content
          .map((block: any) => 
            block.children?.map((child: any) => child.text).join(' ') || ''
          )
          .join(' ');
      }

      const response = await fetch('/api/analyze-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: document.title || '',
          excerpt: document.excerpt || '',
          content: contentText,
          options: {
            maxTags: 8,
            minConfidence: 0.2,
            includeNewTags: true,
            createNewTags: true
          }
        }),
      });

      if (!response.ok) {
        throw new Error('タグ提案の取得に失敗しました');
      }

      const data = await response.json();
      setSuggestions(data.suggestions.tags || []);
      setConfidence(data.suggestions.confidence || 0);
      
    } catch (error) {
      console.error('タグ提案エラー:', error);
      alert('タグ提案の取得中にエラーが発生しました。');
    } finally {
      setLoading(false);
    }
  }, [document]);

  const addTag = useCallback((tagTitle: string) => {
    // 既存のタグに追加
    const newTag = {
      _type: 'reference',
      _ref: `tag-${tagTitle.toLowerCase().replace(/[^a-z0-9]/g, '-')}`, // 仮のID
      _key: `tag-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    };
    
    // 重複チェック
    const currentTags = value || [];
    const exists = currentTags.some((tag: any) => 
      tag._ref?.includes(tagTitle.toLowerCase().replace(/[^a-z0-9]/g, '-'))
    );
    
    if (!exists) {
      onChange([...currentTags, newTag]);
    }
  }, [value, onChange]);

  const removeTag = useCallback((index: number) => {
    const currentTags = value || [];
    const newTags = currentTags.filter((_, i) => i !== index);
    onChange(newTags);
  }, [value, onChange]);

  return (
    <Card padding={4} radius={2} shadow={1}>
      <Stack space={4}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <SparklesIcon />
          <Text weight="semibold">自動タグ提案</Text>
        </div>

        <Button
          text="タグを提案"
          tone="primary"
          icon={SparklesIcon}
          loading={loading}
          onClick={analyzeTags}
          disabled={loading}
        />

        {confidence > 0 && (
          <Box>
            <Text size={1} muted>
              提案信頼度: {Math.round(confidence * 100)}%
            </Text>
          </Box>
        )}

        {suggestions.length > 0 && (
          <Card padding={3} tone="primary" radius={2}>
            <Stack space={3}>
              <Text size={1} weight="medium">
                提案されたタグ:
              </Text>
              <div style={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: '8px' 
              }}>
                {suggestions.map((tag, index) => (
                  <Badge
                    key={index}
                    tone="primary"
                    style={{ 
                      cursor: 'pointer',
                      padding: '4px 8px'
                    }}
                    onClick={() => addTag(tag)}
                  >
                    + {tag}
                  </Badge>
                ))}
              </div>
              <Text size={1} muted>
                クリックでタグを追加
              </Text>
            </Stack>
          </Card>
        )}

        {value && value.length > 0 && (
          <Card padding={3} tone="caution" radius={2}>
            <Stack space={3}>
              <Text size={1} weight="medium">
                現在のタグ:
              </Text>
              <div style={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: '8px' 
              }}>
                {value.map((tag: any, index: number) => (
                  <Badge
                    key={tag._key || index}
                    tone="caution"
                    style={{ 
                      cursor: 'pointer',
                      padding: '4px 8px'
                    }}
                    onClick={() => removeTag(index)}
                  >
                    × {tag._ref || `Tag ${index + 1}`}
                  </Badge>
                ))}
              </div>
              <Text size={1} muted>
                クリックでタグを削除
              </Text>
            </Stack>
          </Card>
        )}
      </Stack>
    </Card>
  );
}

// プラグイン定義
export const autoTagPlugin = definePlugin({
  name: 'auto-tag',
  schema: {
    types: [
      {
        name: 'autoTagField',
        title: '自動タグ提案',
        type: 'object',
        fields: [
          {
            name: 'suggestions',
            title: 'タグ提案',
            type: 'array',
            of: [{ type: 'string' }],
          },
        ],
        components: {
          input: (props: any) => (
            <AutoTagSuggestions {...props} />
          ),
        },
      },
    ],
  },
});