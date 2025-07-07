"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  FileText,
  BookOpen,
  Users,
  Loader2,
  ExternalLink,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import BlobBackground from "@/components/blob-background";
import { usePathname } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import {
  useResearchTables,
  ResearchArticle,
  ResearchBook,
  ResearchPresentation,
} from "@/hooks/useResearchTables";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

// Publication type mapping
const publicationTypeMap = {
  book_chapter: {
    id: "book-chapters",
    label: "Book Chapters",
    icon: FileText,
  },
  article: {
    id: "articles",
    label: "Articles",
    icon: BookOpen,
  },
  publication: {
    id: "publications",
    label: "Publications",
    icon: Users,
  },
};

// Loading skeleton for research items
const ResearchSkeleton = () => (
  <div className="space-y-4">
    {[1, 2, 3].map((i) => (
      <Card key={i} className="overflow-hidden rounded-2xl">
        <CardHeader>
          <Skeleton className="h-10 w-10 rounded-full mb-2" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-4 w-3/4 mt-2" />
        </CardHeader>
      </Card>
    ))}
  </div>
);

// Format article citation
const formatArticleCitation = (article: ResearchArticle) => {
  const authors = article.authors ? article.authors : "";
  return `${authors}${authors ? ", " : ""}(${article.year}). ${article.title}.`;
};

// Format book citation
const formatBookCitation = (book: ResearchBook) => {
  const authors = book.authors_editors ? book.authors_editors : "";
  return `${authors}${authors ? ", " : ""}(${book.year}). ${book.title}.`;
};

// New component for displaying a single presentation in a card format
const PresentationCard = ({
  presentation,
}: {
  presentation: ResearchPresentation;
}) => (
  <Card className="overflow-hidden rounded-2xl border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300">
    {presentation.featured_image && (
      <div className="relative h-48 w-full">
        <Image
          src={presentation.featured_image}
          alt={`Image for ${presentation.title}`}
          fill
          className="object-cover"
        />
      </div>
    )}
    <CardHeader>
      <div className="flex justify-between items-start mb-2">
        <Badge
          variant="outline"
          className="text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
        >
          Presentation
        </Badge>
        <Badge variant="secondary" className="text-xs">
          {presentation.year}
        </Badge>
      </div>
      <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        {presentation.title}
      </CardTitle>
      {presentation.presenters && (
        <CardDescription className="mt-1 text-gray-600 dark:text-gray-400">
          Presented by: {presentation.presenters}
        </CardDescription>
      )}
    </CardHeader>
    <CardContent>
      {presentation.conference_name && (
        <div className="flex items-start gap-2 mb-2">
          <Users className="h-5 w-5 text-gray-500 mt-1" />
          <div>
            <p className="font-semibold text-gray-700 dark:text-gray-300">
              Conference
            </p>
            <p className="text-muted-foreground">
              {presentation.conference_name}
            </p>
          </div>
        </div>
      )}
      {presentation.location && (
        <div className="flex items-start gap-2 mb-2">
          <Users className="h-5 w-5 text-gray-500 mt-1" />
          <div>
            <p className="font-semibold text-gray-700 dark:text-gray-300">
              Location
            </p>
            <p className="text-muted-foreground">{presentation.location}</p>
          </div>
        </div>
      )}
      {presentation.date && (
        <div className="flex items-start gap-2">
          <Users className="h-5 w-5 text-gray-500 mt-1" />
          <div>
            <p className="font-semibold text-gray-700 dark:text-gray-300">
              Date
            </p>
            <p className="text-muted-foreground">
              {format(new Date(presentation.date), "MMMM d, yyyy")}
            </p>
          </div>
        </div>
      )}
    </CardContent>
    {presentation.link_url && (
      <CardFooter className="bg-gray-50 dark:bg-gray-800/50 p-4">
        <Link
          href={presentation.link_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-sm font-medium text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 w-full"
        >
          View Presentation
          <ExternalLink className="ml-2 h-4 w-4" />
        </Link>
      </CardFooter>
    )}
  </Card>
);

export default function ResearchPage() {
  const {
    useArticles,
    useBooks,
    usePresentations,
    useFeaturedResearch,
    useRecentResearch,
  } = useResearchTables();

  // Fetch data from separate tables
  const { data: articles, isLoading: articlesLoading } = useArticles();
  const { data: books, isLoading: booksLoading } = useBooks();
  const { data: presentations, isLoading: presentationsLoading } =
    usePresentations();

  // Get featured and recent research
  const { featuredArticles, featuredBooks, featuredPresentations } =
    useFeaturedResearch();
  const { recentArticles, recentBooks, recentPresentations } =
    useRecentResearch();

  const [activeTab, setActiveTab] = useState<string>("all");

  // Debug the presentations data
  console.log("Presentations data:", presentations);
  console.log("Presentations loading:", presentationsLoading);

  // Check if any data is loading
  const isLoading = articlesLoading || booksLoading || presentationsLoading;

  // Create publication tabs for articles, books, and presentations
  const publications = useMemo(() => {
    const articleTab = {
      id: "articles",
      label: "Articles",
      icon: BookOpen,
      entries: articles?.map(formatArticleCitation) || [],
      works: articles || [],
      images:
        articles
          ?.filter((article) => article.featured_image)
          .map((article) => article.featured_image as string) || [],
    };

    const bookTab = {
      id: "books",
      label: "Books & Chapters",
      icon: FileText,
      entries: books?.map(formatBookCitation) || [],
      works: books || [],
      images:
        books
          ?.filter((book) => book.featured_image)
          .map((book) => book.featured_image as string) || [],
    };

    const presentationTab = {
      id: "presentations",
      label: "Academic Presentations",
      icon: Users,
      entries: [], // This is no longer used for rendering, can be cleared
      works: presentations || [],
      images:
        presentations
          ?.filter((presentation) => presentation.featured_image)
          .map((presentation) => presentation.featured_image as string) || [],
    };

    return [articleTab, bookTab, presentationTab];
  }, [articles, books, presentations]);

  // This was previously used for the separate presentations section
  // Now presentations are included in the publications tabs

  // Tab state
  const [tab, setTab] = useState("");
  const pathname = usePathname();

  // Initialize tab when publications are loaded
  useEffect(() => {
    if (publications.length > 0 && !tab) {
      setTab(publications[0].id);
    }
  }, [publications, tab]);

  // Handle hash changes
  useEffect(() => {
    if (typeof window !== "undefined" && publications.length > 0) {
      const hash = window.location.hash.replace("#", "");
      if (hash && publications.some((pub) => pub.id === hash)) {
        setTab(hash);
      }
    }
  }, [publications]);

  // Listen for hash changes
  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash && publications.some((pub) => pub.id === hash)) {
        setTab(hash);
      }
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [publications]);

  return (
    <div className="relative">
      <BlobBackground />

      {/* Hero Section */}
      <section className="relative py-16 md:py-24">
        <div className="absolute inset-0 z-0">
          <Image
            src="/research.jpg"
            alt="Research background"
            fill
            className="object-cover opacity-80"
            priority
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-red-700/80 to-black/90 z-10" />
        </div>
        <div className="container relative z-20">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl text-white">
              Research
            </h1>
            <p className="mb-8 text-lg text-white">
              Asmau's research contributions reflect her commitment to
              understanding and addressing pressing issues in mental health and
              rehabilitation
            </p>
          </div>
        </div>
      </section>

      <section className="bg-muted py-16 md:py-24">
        <div className="container">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight md:text-4xl">
            Publications & Presentations
          </h2>

          {isLoading ? (
            <ResearchSkeleton />
          ) : (
            <Tabs value={tab} onValueChange={setTab} className="w-full">
              <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-1 md:grid-cols-3 mb-8">
                {publications.map((pub) => (
                  <TabsTrigger
                    key={pub.id}
                    value={pub.id}
                    className="capitalize"
                  >
                    <pub.icon className="mr-2 h-4 w-4" />
                    {pub.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              {/* Articles Tab */}
              <TabsContent value="articles" className="space-y-4">
                {articles?.map((article) => (
                  <Card
                    key={article.id}
                    className="overflow-hidden rounded-2xl"
                  >
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <Badge variant="outline" className="text-xs">
                          Article
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {article.year}
                        </Badge>
                      </div>
                      <CardTitle className="mt-2 text-lg">
                        {article.title}
                      </CardTitle>
                      <CardDescription className="mt-1">
                        Authors: {article.authors}
                      </CardDescription>
                      {article.abstract_excerpt && (
                        <p className="mt-2 text-muted-foreground text-sm">
                          {article.abstract_excerpt}
                        </p>
                      )}
                    </CardHeader>
                    <CardFooter>
                      {article.link_url ? (
                        <Link
                          href={article.link_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-sm font-medium text-red-600 transition-colors hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                        >
                          View Article <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                      ) : (
                        <span className="text-sm font-medium text-muted-foreground">
                          Article
                        </span>
                      )}
                    </CardFooter>
                  </Card>
                ))}
              </TabsContent>

              {/* Books & Chapters Tab */}
              <TabsContent value="books" className="space-y-4">
                {books?.map((book) => (
                  <Card key={book.id} className="overflow-hidden rounded-2xl">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <Badge variant="outline" className="text-xs">
                          Book/Chapter
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {book.year}
                        </Badge>
                      </div>
                      <CardTitle className="mt-2 text-lg">
                        {book.title}
                      </CardTitle>
                      <CardDescription className="mt-1">
                        Authors/Editors: {book.authors_editors}
                      </CardDescription>
                      {book.abstract_excerpt && (
                        <p className="mt-2 text-muted-foreground text-sm">
                          {book.abstract_excerpt}
                        </p>
                      )}
                    </CardHeader>
                    <CardFooter>
                      {book.link_url ? (
                        <Link
                          href={book.link_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-sm font-medium text-red-600 transition-colors hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                        >
                          View Book <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                      ) : (
                        <span className="text-sm font-medium text-muted-foreground">
                          Book
                        </span>
                      )}
                    </CardFooter>
                  </Card>
                ))}
              </TabsContent>

              {/* Academic Presentations Tab */}
              <TabsContent value="presentations">
                {presentationsLoading ? (
                  <ResearchSkeleton />
                ) : (
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {presentations?.map((presentation) => (
                      <PresentationCard
                        key={presentation.id}
                        presentation={presentation}
                      />
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-muted py-16">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold tracking-tight md:text-4xl">
              Research Collaboration
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Interested in exploring research collaborations or learning more
              about Asmau's work? Please don't hesitate to reach out.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild className="bg-red-600 hover:bg-red-700">
                <Link href="/contact">Contact Me</Link>
              </Button>
              <Button asChild variant="outline">
                <Link
                  href="https://scholar.google.com/citations?user=WDZpVz0AAAAJ&hl=enzs"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google Scholar Profile
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
