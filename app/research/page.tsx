"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, FileText, BookOpen, Users, Loader2 } from "lucide-react";
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
import { useResearchQueries } from "@/hooks/useResearchQuery";
import { ResearchType, ResearchWork } from "@/store/researchStore";
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

// Format research work title with authors and year
const formatResearchCitation = (work: ResearchWork) => {
  const authors = work.co_authors?.length > 0 
    ? `${work.co_authors.join(", ")}` 
    : "";
  
  return `${authors}${authors ? ", " : ""}(${work.year}). ${work.title}.`;
};

export default function ResearchPage() {
  const { usePublishedResearchWorks, useResearchCategories } = useResearchQueries();
  
  // Fetch all published research works
  const { data: researchData, isLoading: isLoadingResearch } = usePublishedResearchWorks({
    limit: 100, // Get all published research
  });
  
  // Fetch research categories
  const { data: categoriesData, isLoading: isLoadingCategories } = useResearchCategories();
  
  // Group research works by type
  const researchByType = useMemo(() => {
    if (!researchData?.works) return {};
    
    return researchData.works.reduce<Record<string, ResearchWork[]>>((acc, work) => {
      if (!acc[work.research_type]) {
        acc[work.research_type] = [];
      }
      acc[work.research_type].push(work);
      return acc;
    }, {});
  }, [researchData]);
  
  // Create publication tabs based on available research types
  const publications = useMemo(() => {
    const types = Object.keys(researchByType).filter(
      (type) => type !== "conference_presentation"
    );
    
    return types.map((type) => ({
      ...publicationTypeMap[type as keyof typeof publicationTypeMap] || {
        id: type,
        label: type.replace("_", " "),
        icon: FileText,
      },
      entries: researchByType[type].map(formatResearchCitation),
      works: researchByType[type],
      images: researchByType[type]
        .filter((work) => work.featured_image)
        .map((work) => work.featured_image as string),
    }));
  }, [researchByType]);
  
  // Get conference presentations
  const conferencePresentations = useMemo(() => {
    return researchByType["conference_presentation"] || [];
  }, [researchByType]);
  
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

      {/* Publications with Tabs */}
      <section className="bg-muted py-16 md:py-24">
        <div className="container">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight md:text-4xl">
            Publications
          </h2>

          {isLoadingResearch ? (
            <ResearchSkeleton />
          ) : publications.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No publications found.</p>
            </div>
          ) : (
            <Tabs value={tab} onValueChange={setTab} className="w-full">
              <TabsList className="justify-center mb-8">
                {publications.map((pub) => (
                  <TabsTrigger key={pub.id} value={pub.id} className="capitalize">
                    {pub.label}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {publications.map((pub) => (
                <TabsContent key={pub.id} value={pub.id} className="space-y-4">
                  {/* Featured Images */}
                  {pub.images.length > 0 && (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {pub.images.map((src, idx) => (
                        <div key={idx} className="relative aspect-video rounded-lg overflow-hidden">
                          <Image
                            src={src}
                            alt={`${pub.label} image ${idx + 1}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* Research Entries */}
                  <div className="space-y-4">
                    {pub.works && pub.works.map((work) => (
                      <Card key={work.id} className="overflow-hidden rounded-2xl">
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
                          {work.co_authors?.length > 0 && (
                            <CardDescription className="mt-1">
                              Authors: {work.co_authors.join(", ")}
                            </CardDescription>
                          )}
                          {work.excerpt && (
                            <p className="mt-2 text-muted-foreground text-sm">
                              {work.excerpt}
                            </p>
                          )}
                        </CardHeader>
                        <CardFooter className="pt-0">
                          <Link
                            href={`/research/${work.slug}`}
                            className="inline-flex items-center text-sm font-medium text-red-600 transition-colors hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                          >
                            View Details
                            <ArrowRight className="ml-1 h-4 w-4" />
                          </Link>
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

      {/* Conference Presentations */}
      {conferencePresentations.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="container">
            <h2 className="mb-12 text-center text-3xl font-bold tracking-tight md:text-4xl">
              Conference Presentations
            </h2>
            
            {isLoadingResearch ? (
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
                  {conferencePresentations.map((work) => (
                    <Card
                      key={work.id}
                      className="overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-lg"
                    >
                      {work.featured_image ? (
                        <div className="relative h-64">
                          <Image
                            src={work.featured_image}
                            alt={`${work.title} conference banner`}
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
                          {work.title}
                        </CardTitle>
                        <CardDescription className="text-sm font-medium text-muted-foreground">
                          {work.year} • {work.co_authors?.join(", ")}
                        </CardDescription>
                        {work.excerpt && (
                          <p className="text-sm text-muted-foreground">
                            {work.excerpt}
                          </p>
                        )}
                      </CardHeader>
                      <CardFooter>
                        <Link
                          href={`/research/${work.slug}`}
                          className="inline-flex items-center text-sm font-medium text-red-600 transition-colors hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                        >
                          View Presentation
                          <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
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
              I am always open to research collaborations with fellow scholars,
              practitioners, and students who share an interest in counselor
              education, supervision, and social justice advocacy.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild className="bg-red-600 hover:bg-red-700">
                <Link href="/contact">Contact Me</Link>
              </Button>
              <Button asChild variant="outline">
                <Link
                  href="https://scholar.google.com"
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
