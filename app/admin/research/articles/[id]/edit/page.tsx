"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function EditArticlePage() {
  const params = useParams();
  const articleId = params.id;

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Edit Article {typeof articleId === 'string' ? `(ID: ${articleId})` : ''}</h1>
        <Link href="/admin/research/articles">
          <Button variant="outline">&larr; Back to Articles</Button>
        </Link>
      </div>
      <p>Form to edit article (ID: {typeof articleId === 'string' ? articleId : 'N/A'}) will be here.</p>
      {/* Form fields will be pre-filled with article data */}
    </div>
  );
}
