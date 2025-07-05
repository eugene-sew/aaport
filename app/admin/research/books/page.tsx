"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Edit, Trash2, PlusCircle, CheckCircle2 } from 'lucide-react';

// Define an interface for the book/chapter structure based on your Supabase table
interface Book {
  id: string;
  created_at: string;
  title: string;
  authors_editors: string;
  year: number | null;
  type: string; // "Book" or "Book Chapter"
  publisher: string | null;
  isbn: string | null;
  link_to_full_content: string | null;
  publication_status: string;
  abstract_excerpt: string | null;
  keywords: string | null;
  parent_book_title: string | null;
  parent_book_authors_editors: string | null;
  pages: string | null;
  user_id: string;
}

export default function BooksPage() {
  const { user } = useAuth();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      if (!supabase) {
        setError("Supabase client is not available.");
        setLoading(false);
        return;
      }
      if (!user) { // Wait for user to be loaded
        return;
      }

      try {
        setLoading(true);
        const { data, error: fetchError } = await supabase
          .from('research_books')
          .select('*')
          .order('created_at', { ascending: false });

        if (fetchError) {
          throw fetchError;
        }
        setBooks(data || []);
      } catch (err: any) {
        console.error('Error fetching books:', err);
        setError(err.message || 'Failed to fetch books.');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchBooks();
    }
  }, [user]);

  const handleDelete = async (bookId: string) => {
    setError(null);
    setSuccessMessage(null);
    if (confirm('Are you sure you want to delete this item?')) {
      if (!supabase) {
        setError("Supabase client is not available.");
        return;
      }
      try {
        const { error: deleteError } = await supabase
          .from('research_books')
          .delete()
          .match({ id: bookId });

        if (deleteError) {
          throw deleteError;
        }

        setBooks(books.filter(book => book.id !== bookId));
        setSuccessMessage('Item deleted successfully!');
        setTimeout(() => setSuccessMessage(null), 3000); // Clear message after 3 seconds

      } catch (err: any) {
        console.error('Error deleting item:', err);
        setError(err.message || 'Failed to delete item.');
      }
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Manage Books & Chapters</h1>
        <Link href="/admin/research/books/add">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Book / Chapter
          </Button>
        </Link>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {successMessage && (
        <Alert variant="default" className="mb-4 bg-green-100 border-green-400 text-green-700 dark:bg-green-900 dark:border-green-700 dark:text-green-300">
          <CheckCircle2 className="h-4 w-4 text-green-500" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>{successMessage}</AlertDescription>
        </Alert>
      )}

      {loading ? (
        <p>Loading books and chapters...</p>
      ) : books.length === 0 && !error ? (
        <div className="text-center py-10">
          <p className="text-xl text-gray-500 mb-4">No books or chapters found.</p>
          <p className="text-gray-400">Get started by adding a new book or chapter.</p>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-800">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Authors/Editors</TableHead>
                <TableHead>Year</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {books.map((book) => (
                <TableRow key={book.id}>
                  <TableCell className="font-medium">{book.title}</TableCell>
                  <TableCell>{book.authors_editors}</TableCell>
                  <TableCell>{book.year}</TableCell>
                  <TableCell>{book.type}</TableCell>
                  <TableCell>{book.publication_status}</TableCell>
                  <TableCell className="text-right">
                    <Link href={`/admin/research/books/edit/${book.id}`} passHref>
                      <Button variant="outline" size="sm" className="mr-2">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(book.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
