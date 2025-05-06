import Link from "next/link";
import Image from "next/image";
import { ArrowRight, FileText, BookOpen, Users } from "lucide-react";
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

// Data-driven content
const researchAreas = [
  {
    title: "Multicultural Supervision",
    description:
      "Exploring how cultural factors influence the supervisory relationship and developing models for culturally responsive supervision in counselor training.",
    imgText: "Multicultural Supervision",
  },
  {
    title: "Social Justice Advocacy",
    description:
      "Investigating how counselors can effectively advocate for systemic change and address inequities in mental health care access and delivery.",
    imgText: "Social Justice Advocacy",
  },
  {
    title: "Counselor Development",
    description:
      "Studying the factors that contribute to effective counselor training and professional identity development across the career lifespan.",
    imgText: "Counselor Development",
  },
];

const publications = [
  {
    id: "book-chapters",
    label: "Book Chapters",
    icon: FileText,
    entries: [
      "Ayub, A., Wiafe, E. (In-press). Journeys of Becoming Critical Scholars: Volume 1 & 2.",
      "Shultz, J., Ayub, A. (2024). Designing Supervision Intervention to Strengthen Supervisee Competency. In C.B & E.B. Shultz (Eds.) Clinical Supervision: A Handbook for Counselors.",
    ],
    images: [], // provision for images
    link: "/research/publications/book-chapters",
  },
  {
    id: "articles",
    label: "Articles",
    icon: BookOpen,
    entries: [
      "Ayub, A., Lee, G., Easley, T. (under review). Perceiving Acceptance Through the Lens of Autistic College Students",
      "Ayub, A., Umucu, E., & Lee, G. (in preparation). Veteran Employment Needs: A Scoping Review",
    ],
    images: [],
    link: "/research/publications/articles",
  },
  {
    id: "books",
    label: "Books",
    icon: Users,
    entries: [
      "Ayub, A., Danquah, S.A., Bruce, D. (2013). Foster and Biological Parenting: Impact on Personality and Cognitive Performance.",
    ],
    images: [],
    link: "/research/publications/books",
  },
];

const conferencePresentations = [
  {
    title:
      "Perceiving Acceptance Through the Lens of Autistic College Students",
    context:
      "Council for Exceptional Children: Division on Autism and Developmental Disabilities annual International conference, January 2025",
    image: "/autism.jpg",
  },
  {
    title:
      "The Art of Supervision: Reflecting on Supervisee Qualities in Clinical Supervision",
    context: "November 2023",
    image: "/super.png",
  },
];

export default function ResearchPage() {
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
            className="object-cover opacity-20"
            priority
          />
        </div>
        <div className="container relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">
              Research
            </h1>
            <p className="mb-8 text-lg text-muted-foreground">
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
          <Tabs defaultValue={publications[0].id} className="w-full">
            <TabsList className="justify-center mb-8">
              {publications.map((pub) => (
                <TabsTrigger key={pub.id} value={pub.id} className="capitalize">
                  {pub.label}
                </TabsTrigger>
              ))}
            </TabsList>
            {publications.map((pub) => (
              <TabsContent key={pub.id} value={pub.id} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {pub.images.length > 0 &&
                    pub.images.map((src, idx) => (
                      <Image
                        key={idx}
                        src={src}
                        alt={`${pub.label} image ${idx + 1}`}
                        width={200}
                        height={200}
                        className="rounded-lg"
                      />
                    ))}
                </div>
                <div className="space-y-2">
                  {pub.entries.map((entry, idx) => (
                    <Card key={idx} className="overflow-hidden rounded-2xl">
                      <CardHeader>
                        <div className="mb-2 rounded-full bg-red-100 p-2 text-red-600 dark:bg-red-950 dark:text-red-300 w-fit">
                          <pub.icon className="h-6 w-6" />
                        </div>
                        <CardTitle className="text-lg">{entry}</CardTitle>
                      </CardHeader>
                      <CardFooter>
                        <Link
                          href={pub.link}
                          className="inline-flex items-center text-sm font-medium text-red-600 transition-colors hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                        >
                          View Detail
                          <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Conference Presentations */}
      <section className="py-16 md:py-24">
        <div className="container">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight md:text-4xl">
            Conference Presentations
          </h2>
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-8 md:grid-cols-2">
              {conferencePresentations.map((conf, idx) => (
                <Card
                  key={idx}
                  className="overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-lg"
                >
                  <div className="relative h-64">
                    <Image
                      src={conf.image}
                      alt={`${conf.title} conference banner`}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <CardHeader className="space-y-4">
                    <CardTitle className="text-xl leading-tight">
                      {conf.title}
                    </CardTitle>
                    <CardDescription className="text-sm font-medium text-muted-foreground">
                      {conf.context}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
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
