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

// Format presentation citation
const formatPresentationCitation = (presentation: ResearchPresentation) => {
  const presenters = presentation.presenters ? presentation.presenters : "";
  return `${presenters}${presenters ? ", " : ""}(${presentation.year}). ${
    presentation.title
  }.`;
};

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
      entries: presentations?.map(formatPresentationCitation) || [],
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

      {/* Featured Research Section */}
      {(featuredArticles.length > 0 ||
        featuredBooks.length > 0 ||
        featuredPresentations.length > 0) && (
        <section className="py-16 bg-gradient-to-r from-red-50 to-red-100 dark:from-red-950/30 dark:to-red-900/20">
          <div className="container">
            <div className="flex items-center gap-2 mb-8">
              <Star className="h-6 w-6 text-red-600 dark:text-red-400" />
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                Featured Research
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Featured Articles */}
              {featuredArticles.map((article) => (
                <Card
                  key={article.id}
                  className="overflow-hidden rounded-2xl border-red-200 dark:border-red-800 shadow-md hover:shadow-lg transition-all duration-300"
                >
                  {article.featured_image ? (
                    <div className="relative h-48">
                      <Image
                        src={article.featured_image}
                        alt={`${article.title} featured image`}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-red-600 hover:bg-red-700">
                          Featured
                        </Badge>
                      </div>
                    </div>
                  ) : (
                    <div className="h-24 bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                      <Star className="h-8 w-8 text-red-600/50 dark:text-red-400/50" />
                    </div>
                  )}
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
                    {article.authors && (
                      <CardDescription className="mt-1">
                        Authors: {article.authors}
                      </CardDescription>
                    )}
                  </CardHeader>
                  <CardFooter className="flex justify-between items-center">
                    {article.link_url ? (
                      <Link
                        href={article.link_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm font-medium text-red-600 transition-colors hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                      >
                        View Article
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    ) : (
                      <span className="inline-flex items-center text-sm font-medium text-muted-foreground">
                        Article
                      </span>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Recent Research Section */}
      {(recentArticles.length > 0 ||
        recentBooks.length > 0 ||
        recentPresentations.length > 0) && (
        <section className="py-16 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/20">
          <div className="container">
            <h2 className="mb-8 text-3xl font-bold tracking-tight md:text-4xl">
              Recent Research
            </h2>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Recent Articles */}
              {recentArticles.map((article) => (
                <Card
                  key={article.id}
                  className="overflow-hidden rounded-2xl border-blue-200 dark:border-blue-800"
                >
                  {article.featured_image ? (
                    <div className="relative h-48">
                      <Image
                        src={article.featured_image}
                        alt={`${article.title} featured image`}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge
                          variant="outline"
                          className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
                        >
                          Recent
                        </Badge>
                      </div>
                    </div>
                  ) : null}
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
                    {article.authors && (
                      <CardDescription className="mt-1">
                        Authors: {article.authors}
                      </CardDescription>
                    )}
                    {article.abstract_excerpt && (
                      <p className="mt-2 text-muted-foreground text-sm">
                        {article.abstract_excerpt}
                      </p>
                    )}
                  </CardHeader>
                  <CardFooter className="flex justify-between items-center">
                    {article.link_url ? (
                      <Link
                        href={article.link_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm font-medium text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        View Article
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    ) : (
                      <span className="inline-flex items-center text-sm font-medium text-muted-foreground">
                        Article
                      </span>
                    )}
                  </CardFooter>
                </Card>
              ))}

              {/* Recent Books */}
              {recentBooks.map((book) => (
                <Card
                  key={book.id}
                  className="overflow-hidden rounded-2xl border-blue-200 dark:border-blue-800"
                >
                  {book.featured_image ? (
                    <div className="relative h-48">
                      <Image
                        src={book.featured_image}
                        alt={`${book.title} featured image`}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge
                          variant="outline"
                          className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
                        >
                          Recent
                        </Badge>
                      </div>
                    </div>
                  ) : null}
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <Badge variant="outline" className="text-xs">
                        {book.type || "Book"}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {book.year}
                      </Badge>
                    </div>
                    <CardTitle className="mt-2 text-lg">{book.title}</CardTitle>
                    {book.authors_editors && (
                      <CardDescription className="mt-1">
                        Authors: {book.authors_editors}
                      </CardDescription>
                    )}
                    {book.abstract_excerpt && (
                      <p className="mt-2 text-muted-foreground text-sm">
                        {book.abstract_excerpt}
                      </p>
                    )}
                  </CardHeader>
                  <CardFooter className="flex justify-between items-center">
                    {book.link_url ? (
                      <Link
                        href={book.link_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm font-medium text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        View Book
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    ) : (
                      <span className="inline-flex items-center text-sm font-medium text-muted-foreground">
                        {book.type || "Book"}
                      </span>
                    )}
                  </CardFooter>
                </Card>
              ))}

              {/* Recent Presentations */}
              {recentPresentations.map((presentation) => (
                <Card
                  key={presentation.id}
                  className="overflow-hidden rounded-2xl border-blue-200 dark:border-blue-800"
                >
                  {presentation.featured_image ? (
                    <div className="relative h-48">
                      <Image
                        src={presentation.featured_image}
                        alt={`${presentation.title} featured image`}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge
                          variant="outline"
                          className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
                        >
                          Recent
                        </Badge>
                      </div>
                    </div>
                  ) : null}
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <Badge variant="outline" className="text-xs">
                        Presentation
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {presentation.year}
                      </Badge>
                    </div>
                    <CardTitle className="mt-2 text-lg">
                      {presentation.title}
                    </CardTitle>
                    {presentation.presenters && (
                      <CardDescription className="mt-1">
                        Presenters: {presentation.presenters}
                      </CardDescription>
                    )}
                    {presentation.abstract && (
                      <p className="mt-2 text-muted-foreground text-sm">
                        {presentation.abstract}
                      </p>
                    )}
                  </CardHeader>
                  <CardFooter className="flex justify-between items-center">
                    {presentation.link_url ? (
                      <Link
                        href={presentation.link_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm font-medium text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        View Presentation
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    ) : (
                      <span className="inline-flex items-center text-sm font-medium text-muted-foreground">
                        Presentation
                      </span>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Publications with Tabs */}
      <section className="bg-muted py-16 md:py-24">
        <div className="container">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight md:text-4xl">
            Publications
          </h2>

          {isLoading ? (
            <ResearchSkeleton />
          ) : publications.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No publications found.</p>
            </div>
          ) : (
            <Tabs value={tab} onValueChange={setTab} className="w-full">
              <TabsList className="justify-center mb-8">
                {publications.map((pub) => (
                  <TabsTrigger
                    key={pub.id}
                    value={pub.id}
                    className="capitalize"
                  >
                    {pub.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              {publications.map((pub) => (
                <TabsContent key={pub.id} value={pub.id} className="space-y-4">
                  {/* Featured Images */}
                  {pub.works &&
                    pub.works.some((work) => work.featured_image) && (
                      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {pub.works
                          .filter((work) => work.featured_image)
                          .map((work, idx) => (
                            <div
                              key={work.id}
                              className="relative aspect-video rounded-lg overflow-hidden"
                            >
                              <Image
                                src={work.featured_image!}
                                alt={`${work.title} image`}
                                fill
                                className="object-cover"
                              />
                            </div>
                          ))}
                      </div>
                    )}

                  {/* Research Entries */}
                  <div className="space-y-4">
                    {pub.works &&
                      pub.works.map((work) => (
                        <Card
                          key={work.id}
                          className="overflow-hidden rounded-2xl"
                        >
                          <CardHeader>
                            <div className="flex justify-between items-start">
                              <div className="mb-2 rounded-full bg-red-100 p-2 text-red-600 dark:bg-red-950 dark:text-red-300 w-fit">
                                <pub.icon className="h-6 w-6" />
                              </div>
                              <Badge variant="outline" className="text-xs">
                                {work.year}
                              </Badge>
                            </div>
                            <CardTitle className="text-lg">
                              {work.title}
                            </CardTitle>
                            {pub.id === "articles" && (
                              <CardDescription className="mt-1">
                                Authors:{" "}
                                {(work as ResearchArticle).authors || ""}
                              </CardDescription>
                            )}
                            {pub.id === "books" && (
                              <CardDescription className="mt-1">
                                Authors/Editors:{" "}
                                {(work as ResearchBook).authors_editors || ""}
                              </CardDescription>
                            )}
                            {pub.id === "presentations" && (
                              <CardDescription className="mt-1">
                                Presenters:{" "}
                                {(work as ResearchPresentation).presenters ||
                                  ""}
                              </CardDescription>
                            )}
                            {pub.id === "articles" &&
                              (work as ResearchArticle).abstract_excerpt && (
                                <p className="mt-2 text-muted-foreground text-sm">
                                  {(work as ResearchArticle).abstract_excerpt}
                                </p>
                              )}
                            {pub.id === "books" &&
                              (work as ResearchBook).abstract_excerpt && (
                                <p className="mt-2 text-muted-foreground text-sm">
                                  {(work as ResearchBook).abstract_excerpt}
                                </p>
                              )}
                            {pub.id === "presentations" &&
                              (work as ResearchPresentation).abstract && (
                                <p className="mt-2 text-muted-foreground text-sm">
                                  {(work as ResearchPresentation).abstract}
                                </p>
                              )}
                          </CardHeader>
                          <CardFooter className="pt-0 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              {pub.id === "articles" &&
                              (work as ResearchArticle).link_url ? (
                                <Link
                                  href={(work as ResearchArticle).link_url!}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center text-sm font-medium text-red-600 transition-colors hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                                >
                                  View Article
                                  <ArrowRight className="ml-1 h-4 w-4" />
                                </Link>
                              ) : pub.id === "books" &&
                                (work as ResearchBook).link_url ? (
                                <Link
                                  href={(work as ResearchBook).link_url!}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center text-sm font-medium text-red-600 transition-colors hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                                >
                                  View Book
                                  <ArrowRight className="ml-1 h-4 w-4" />
                                </Link>
                              ) : pub.id === "presentations" &&
                                (work as ResearchPresentation).link_url ? (
                                <Link
                                  href={
                                    (work as ResearchPresentation).link_url!
                                  }
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center text-sm font-medium text-red-600 transition-colors hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                                >
                                  View Presentation
                                  <ArrowRight className="ml-1 h-4 w-4" />
                                </Link>
                              ) : (
                                <span className="inline-flex items-center text-sm font-medium text-muted-foreground">
                                  {pub.id === "articles"
                                    ? "Article"
                                    : pub.id === "books"
                                    ? "Book"
                                    : "Presentation"}
                                </span>
                              )}
                              {work.is_recent && (
                                <Badge
                                  variant="outline"
                                  className="bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-200 text-xs"
                                >
                                  Recent
                                </Badge>
                              )}
                              {work.is_featured && (
                                <Badge className="bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200 text-xs">
                                  Featured
                                </Badge>
                              )}
                            </div>
                            {/* External link is now handled in the main action area */}
                          </CardFooter>
                        </Card>
                      ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          )}
        </div>
      </section>

      {/* Conference Presentations - Separate Section */}
      {presentations && presentations.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="container">
            <h2 className="mb-12 text-center text-3xl font-bold tracking-tight md:text-4xl">
              Academic Presentations
            </h2>

            {isLoading ? (
              <div className="grid gap-8 md:grid-cols-2">
                {[1, 2].map((i) => (
                  <Card key={i} className="overflow-hidden rounded-2xl">
                    <div className="relative h-64">
                      <Skeleton className="h-full w-full" />
                    </div>
                    <CardHeader>
                      <Skeleton className="h-6 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-1/2" />
                    </CardHeader>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="mx-auto max-w-6xl">
                <div className="grid gap-8 md:grid-cols-2">
                  {presentations.map((presentation) => (
                    <Card
                      key={presentation.id}
                      className="overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-lg"
                    >
                      {presentation.featured_image ? (
                        <div className="relative h-64">
                          <Image
                            src={presentation.featured_image}
                            alt={`${presentation.title} conference banner`}
                            fill
                            className="object-cover transition-transform duration-300 hover:scale-105"
                          />
                        </div>
                      ) : (
                        <div className="h-32 bg-muted flex items-center justify-center">
                          <FileText className="h-12 w-12 text-muted-foreground/50" />
                        </div>
                      )}
                      <CardHeader className="space-y-4">
                        <CardTitle className="text-xl leading-tight">
                          {presentation.title}
                        </CardTitle>
                        <CardDescription className="text-sm font-medium text-muted-foreground">
                          {presentation.year} • {presentation.presenters}
                        </CardDescription>
                        {presentation.abstract && (
                          <p className="text-sm text-muted-foreground">
                            {presentation.abstract}
                          </p>
                        )}
                      </CardHeader>
                      <CardFooter className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          {presentation.link_url ? (
                            <Link
                              href={presentation.link_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center text-sm font-medium text-red-600 transition-colors hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                            >
                              View Presentation
                              <ArrowRight className="ml-1 h-4 w-4" />
                            </Link>
                          ) : (
                            <span className="inline-flex items-center text-sm font-medium text-muted-foreground">
                              Presentation
                            </span>
                          )}
                          {presentation.is_recent && (
                            <Badge
                              variant="outline"
                              className="bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-200 text-xs"
                            >
                              Recent
                            </Badge>
                          )}
                          {presentation.is_featured && (
                            <Badge className="bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200 text-xs">
                              Featured
                            </Badge>
                          )}
                        </div>
                        {/* External link is now handled in the main action area */}
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

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
