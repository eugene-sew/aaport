import Link from "next/link"
import Image from "next/image"
import { ArrowRight, FileText, BookOpen, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import BlobBackground from "@/components/blob-background"

export default function ResearchPage() {
  return (
    <div className="relative">
      <BlobBackground />

      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">Research</h1>
            <p className="mb-8 text-lg text-muted-foreground">
              My research focuses on counselor education, supervision methodologies, multicultural competence, and
              social justice advocacy in counseling psychology. I am committed to advancing the field through rigorous
              inquiry and practical applications.
            </p>
          </div>
        </div>
      </section>

      {/* Research Areas */}
      <section className="py-12 md:py-16">
        <div className="container">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight md:text-4xl">Research Areas</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-md">
              <div className="aspect-video overflow-hidden">
                <Image
                  src="/placeholder.svg?height=250&width=500&text=Multicultural%20Supervision"
                  alt="Multicultural Supervision"
                  width={500}
                  height={250}
                  className="h-full w-full object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle>Multicultural Supervision</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Exploring how cultural factors influence the supervisory relationship and developing models for
                  culturally responsive supervision in counselor training.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-md">
              <div className="aspect-video overflow-hidden">
                <Image
                  src="/placeholder.svg?height=250&width=500&text=Social%20Justice%20Advocacy"
                  alt="Social Justice Advocacy"
                  width={500}
                  height={250}
                  className="h-full w-full object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle>Social Justice Advocacy</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Investigating how counselors can effectively advocate for systemic change and address inequities in
                  mental health care access and delivery.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-md">
              <div className="aspect-video overflow-hidden">
                <Image
                  src="/placeholder.svg?height=250&width=500&text=Counselor%20Development"
                  alt="Counselor Development"
                  width={500}
                  height={250}
                  className="h-full w-full object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle>Counselor Development</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Studying the factors that contribute to effective counselor training and professional identity
                  development across the career lifespan.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Research Categories */}
      <section className="bg-muted py-16 md:py-24">
        <div className="container">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight md:text-4xl">Research Output</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-md">
              <CardHeader className="pb-2">
                <div className="mb-2 rounded-full bg-red-100 p-2 text-red-600 dark:bg-red-950 dark:text-red-300 w-fit">
                  <FileText className="h-6 w-6" />
                </div>
                <CardTitle>Publications</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Peer-reviewed journal articles on counseling psychology, supervision, and multicultural competence.
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Link
                  href="/research/publications"
                  className="inline-flex items-center text-sm font-medium text-red-600 transition-colors hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                >
                  View Publications
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardFooter>
            </Card>

            <Card className="overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-md">
              <CardHeader className="pb-2">
                <div className="mb-2 rounded-full bg-red-100 p-2 text-red-600 dark:bg-red-950 dark:text-red-300 w-fit">
                  <BookOpen className="h-6 w-6" />
                </div>
                <CardTitle>Book Chapters</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Contributions to edited volumes on counseling theory, practice, and education.
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Link
                  href="/research/book-chapters"
                  className="inline-flex items-center text-sm font-medium text-red-600 transition-colors hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                >
                  View Book Chapters
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardFooter>
            </Card>

            <Card className="overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-md">
              <CardHeader className="pb-2">
                <div className="mb-2 rounded-full bg-red-100 p-2 text-red-600 dark:bg-red-950 dark:text-red-300 w-fit">
                  <Users className="h-6 w-6" />
                </div>
                <CardTitle>Conference Presentations</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Research presented at national and international conferences in counseling and psychology.
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Link
                  href="/research/conference-presentations"
                  className="inline-flex items-center text-sm font-medium text-red-600 transition-colors hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                >
                  View Presentations
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Current Projects */}
      <section className="py-16 md:py-24">
        <div className="container">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight md:text-4xl">Current Research Projects</h2>
          <div className="mx-auto grid max-w-4xl gap-8">
            <Card className="overflow-hidden rounded-2xl">
              <CardHeader>
                <CardTitle>Multicultural Supervision Models and Their Impact on Counselor Development</CardTitle>
                <CardDescription>Dissertation Research, 2022-Present</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-muted-foreground">
                  This mixed-methods study examines how different approaches to multicultural supervision influence the
                  development of cultural competence in counselors-in-training. The research includes both quantitative
                  measures of counselor development and qualitative interviews to capture the lived experiences of
                  supervisees.
                </p>
                <div className="rounded-lg bg-muted p-4">
                  <h4 className="mb-2 font-medium">Key Research Questions:</h4>
                  <ul className="ml-6 list-disc space-y-1 text-muted-foreground">
                    <li>
                      How do supervisees experience different approaches to addressing cultural factors in supervision?
                    </li>
                    <li>
                      What supervision interventions most effectively promote multicultural counseling competence?
                    </li>
                    <li>
                      How do supervisors' own cultural identities and experiences influence their supervision practices?
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden rounded-2xl">
              <CardHeader>
                <CardTitle>
                  Integrating Social Justice Advocacy Training in Counselor Education: A Program Evaluation
                </CardTitle>
                <CardDescription>Collaborative Research, 2021-Present</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-muted-foreground">
                  This project evaluates the implementation and outcomes of a social justice advocacy training component
                  within a counselor education program. The study tracks changes in students' advocacy competencies,
                  attitudes, and behaviors over time.
                </p>
                <div className="rounded-lg bg-muted p-4">
                  <h4 className="mb-2 font-medium">Research Team:</h4>
                  <p className="text-muted-foreground">
                    Collaboration with Dr. James Smith (Michigan State University) and Dr. Karen Johnson (University of
                    Michigan)
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden rounded-2xl">
              <CardHeader>
                <CardTitle>Trauma-Informed Supervision: Best Practices and Training Needs</CardTitle>
                <CardDescription>Grant-Funded Research, 2022-Present</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-muted-foreground">
                  This study identifies best practices in trauma-informed supervision and assesses the training needs of
                  supervisors working with counselors who provide trauma treatment. The research includes a national
                  survey of supervisors and in-depth case studies.
                </p>
                <div className="rounded-lg bg-muted p-4">
                  <h4 className="mb-2 font-medium">Funding:</h4>
                  <p className="text-muted-foreground">
                    Supported by a grant from the Association for Counselor Education and Supervision (ACES)
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-muted py-16">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold tracking-tight md:text-4xl">Research Collaboration</h2>
            <p className="mb-8 text-lg text-muted-foreground">
              I am always open to research collaborations with fellow scholars, practitioners, and students who share an
              interest in counselor education, supervision, and social justice advocacy.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild className="bg-red-600 hover:bg-red-700">
                <Link href="/contact">Contact Me</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="https://scholar.google.com" target="_blank" rel="noopener noreferrer">
                  Google Scholar Profile
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
