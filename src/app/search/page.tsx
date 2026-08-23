'use client';

import { useState } from 'react';
import Link from 'next/link';
import { artworks, bridges, entries, stories, techniques } from '@/lib/content';

interface SearchResult {
  _type: string;
  _id: string;
  title: string;
  slug: string;
  shortDescription?: string;
  definition?: string;
  artist?: string;
  year?: string;
}

const searchableContent = [
  ...Object.values(entries),
  ...Object.values(techniques),
  ...Object.values(artworks),
  ...Object.values(stories),
  ...Object.values(bridges),
];

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const results: SearchResult[] = query.trim()
    ? searchableContent.filter((item) => `${item.title} ${item.shortDescription}`.toLowerCase().includes(query.trim().toLowerCase()))
    : [];

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'technique':
        return '기법';
      case 'artwork':
        return '작품';
      case 'story':
        return '이야기';
      case 'term':
        return '용어';
      case 'science':
      case 'scienceConcept':
        return '과학';
      case 'bridge':
        return '브리지';
      case 'entry':
        return '입구';
      default:
        return type;
    }
  };

  return (
    <div className="flex flex-col min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-8">
        검색
      </h1>

      <div className="mb-8">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="제목, 설명, 용어를 검색하세요..."
          className="w-full max-w-2xl px-4 py-3 rounded-lg border border-zinc-300 bg-white dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-500"
        />
      </div>

      {results.length === 0 && query && (
        <div className="text-center text-zinc-500">결과가 없습니다.</div>
      )}

      <div className="space-y-4">
        {results.map((result) => (
          <Link
            key={result._id}
            href={`/${result._type === 'artwork' ? 'works' : result._type === 'scienceConcept' ? 'science' : `${result._type}s`}/${result.slug}`}
            className="block rounded-lg border border-zinc-200 p-4 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900"
          >
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                {result.title}
              </h3>
              <span className="inline-flex items-center rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
                {getTypeLabel(result._type)}
              </span>
            </div>
            {result.shortDescription && (
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                {result.shortDescription}
              </p>
            )}
            {result.definition && (
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                {result.definition}
              </p>
            )}
            {result.artist && (
              <p className="mt-1 text-sm text-zinc-500">
                {result.artist} {result.year && `(${result.year})`}
              </p>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
