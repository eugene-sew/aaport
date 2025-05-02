import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  FileText,
  Award,
  Users,
  MessageSquare,
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
import BlobBackground from "@/components/blob-background";

export default function Home() {
  return (
    <div className="relative">
      {/* background image */}
      <div className="fixed inset-0 w-full h-full -z-10">
        <Image
          src="/bg.png"
          alt="Background"
          fill
          className="object-cover bg-no-repeat "
          priority
          quality={100}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/95 via-black/90 to-black/95 backdrop-blur-sm" />
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden  py-20 md:py-28 z-10">
        <div className="container flex flex-col items-center text-center ">
          {/* <div className="mb-8 overflow-hidden rounded-full border-4 border-red-600 shadow-xl"> */}
          <div className="text-white">
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl lg:text-9xl ">
              Asmau Ayub
            </h1>
            <p className="mb-6 text-xl text-white/60 md:text-2xl ">
              Licensed Counseling Psychologist & PhD Candidate
            </p>
          </div>

          <div className="w-full max-w-[580px] mx-auto -my-10">
            <Image
              src="/main.png"
              alt="Asmau Ayub"
              width={580}
              height={600}
              className="w-full h-auto object-contain"
              priority
            />
          </div>
          {/* </div> */}

          {/* quick bio */}
          <p className="absolute bottom-0 left-0 right-0 ">
            <div className="container px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                <div className="bg-white p-8 md:p-12">
                  <h3 className="text-amber-600 mb-6">What I Do</h3>
                  <h2 className="text-3xl font-bold mb-6">
                    Ph.D. Candidate <br />
                    at Michigan <br />
                    State University
                  </h2>
                  <Button
                    asChild
                    className="bg-amber-500 hover:bg-amber-600 mt-4"
                  >
                    <Link href="/about">Read More</Link>
                  </Button>
                </div>
                <div className="bg-primary p-8 md:p-12">
                  <h3 className="text-white mb-6">Short Biography</h3>
                  <p className="text-white">
                    Discover the journey of Asmau, a dedicated and passionate
                    doctoral candidate in the Counselor Education and
                    Supervision program at Michigan State University. With a
                    specialization in Rehabilitation Counseling, she combines
                    her extensive background in mental health, education, and
                    community service to foster positive change. Here, you'll
                    find detailed insights into her professional experiences,
                    research endeavors, teaching responsibilities, and
                    leadership roles within the community.
                  </p>
                </div>
              </div>
            </div>
          </p>

          <p className="mx-auto mb-8 max-w-2xl text-center text-muted-foreground">
            With over a decade of clinical experience, I am passionate about
            mental health advocacy, research, and education in Counselor
            Education & Supervision.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-red-600 hover:bg-red-700">
              <Link href="/about">Learn More</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Research Projects Section */}
      <section className="py-16 md:py-24 bg-muted z-10">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl mb-4">
              Current Research Projects
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              My research focuses on counselor education, supervision
              methodologies, and multicultural competence in mental health
              interventions.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-md">
              <CardHeader className="pb-2">
                <div className="mb-2 rounded-full bg-red-100 p-2 text-red-600 dark:bg-red-950 dark:text-red-300 w-fit">
                  <BookOpen className="h-6 w-6" />
                </div>
                <CardTitle>Multicultural Supervision Models</CardTitle>
                <CardDescription>2022 - Present</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Examining how different approaches to multicultural
                  supervision influence the development of cultural competence
                  in counselors-in-training through mixed-methods research.
                </p>
              </CardContent>
              <CardFooter>
                <Link
                  href="/research"
                  className="inline-flex items-center text-sm font-medium text-red-600 transition-colors hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                >
                  Learn More
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardFooter>
            </Card>

            <Card className="overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-md">
              <CardHeader className="pb-2">
                <div className="mb-2 rounded-full bg-red-100 p-2 text-red-600 dark:bg-red-950 dark:text-red-300 w-fit">
                  <Users className="h-6 w-6" />
                </div>
                <CardTitle>Social Justice Advocacy Training</CardTitle>
                <CardDescription>2021 - Present</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Evaluating the implementation and outcomes of social justice
                  advocacy training components within counselor education
                  programs through longitudinal assessment.
                </p>
              </CardContent>
              <CardFooter>
                <Link
                  href="/research"
                  className="inline-flex items-center text-sm font-medium text-red-600 transition-colors hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                >
                  Learn More
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardFooter>
            </Card>

            <Card className="overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-md">
              <CardHeader className="pb-2">
                <div className="mb-2 rounded-full bg-red-100 p-2 text-red-600 dark:bg-red-950 dark:text-red-300 w-fit">
                  <FileText className="h-6 w-6" />
                </div>
                <CardTitle>Trauma-Informed Supervision</CardTitle>
                <CardDescription>2022 - Present</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Identifying best practices in trauma-informed supervision and
                  assessing the training needs of supervisors working with
                  counselors who provide trauma treatment.
                </p>
              </CardContent>
              <CardFooter>
                <Link
                  href="/research"
                  className="inline-flex items-center text-sm font-medium text-red-600 transition-colors hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                >
                  Learn More
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardFooter>
            </Card>
          </div>

          <div className="mt-10 text-center">
            <Button asChild className="bg-red-600 hover:bg-red-700">
              <Link href="/research">View All Research</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Sections */}
      <section className="py-16 md:py-24">
        <div className="container">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight md:text-4xl">
            Areas of Expertise
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="group overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-md">
              <CardHeader className="pb-2">
                <div className="mb-2 rounded-full bg-red-100 p-2 text-red-600 dark:bg-red-950 dark:text-red-300">
                  <BookOpen className="h-6 w-6" />
                </div>
                <CardTitle>Research</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Focused on counselor education, supervision methodologies, and
                  mental health interventions.
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Link
                  href="/research"
                  className="inline-flex items-center text-sm font-medium text-red-600 transition-colors hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                >
                  View Research
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardFooter>
            </Card>

            <Card className="group overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-md">
              <CardHeader className="pb-2">
                <div className="mb-2 rounded-full bg-red-100 p-2 text-red-600 dark:bg-red-950 dark:text-red-300">
                  <FileText className="h-6 w-6" />
                </div>
                <CardTitle>Publications</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Academic articles, book chapters, and conference presentations
                  on counseling psychology.
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Link
                  href="/research/publications"
                  className="inline-flex items-center text-sm font-medium text-red-600 transition-colors hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                >
                  Browse Publications
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardFooter>
            </Card>

            <Card className="group overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-md">
              <CardHeader className="pb-2">
                <div className="mb-2 rounded-full bg-red-100 p-2 text-red-600 dark:bg-red-950 dark:text-red-300">
                  <Award className="h-6 w-6" />
                </div>
                <CardTitle>Teaching</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Courses in counseling theories, techniques, and professional
                  development for future counselors.
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Link
                  href="/teaching"
                  className="inline-flex items-center text-sm font-medium text-red-600 transition-colors hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                >
                  Explore Teaching
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardFooter>
            </Card>

            <Card className="group overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-md">
              <CardHeader className="pb-2">
                <div className="mb-2 rounded-full bg-red-100 p-2 text-red-600 dark:bg-red-950 dark:text-red-300">
                  <Users className="h-6 w-6" />
                </div>
                <CardTitle>Professional Leadership</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Supervision, mentorship, and community service in the field of
                  counseling psychology.
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Link
                  href="/professional-leadership"
                  className="inline-flex items-center text-sm font-medium text-red-600 transition-colors hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                >
                  Learn More
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardFooter>
            </Card>

            <Card className="group overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-md">
              <CardHeader className="pb-2">
                <div className="mb-2 rounded-full bg-red-100 p-2 text-red-600 dark:bg-red-950 dark:text-red-300">
                  <MessageSquare className="h-6 w-6" />
                </div>
                <CardTitle>Blog</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Insights, reflections, and inspirational content on counseling
                  and mental health topics.
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Link
                  href="/blog"
                  className="inline-flex items-center text-sm font-medium text-red-600 transition-colors hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                >
                  Read Blog
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardFooter>
            </Card>

            <Card className="group overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-md">
              <CardHeader className="pb-2">
                <div className="mb-2 rounded-full bg-red-100 p-2 text-red-600 dark:bg-red-950 dark:text-red-300">
                  <FileText className="h-6 w-6" />
                </div>
                <CardTitle>CV</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Comprehensive overview of my academic background, professional
                  experience, and achievements.
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Link
                  href="/contact/request-cv"
                  className="inline-flex items-center text-sm font-medium text-red-600 transition-colors hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                >
                  Request CV
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Latest Blog Posts */}
      <section className="bg-muted py-16 md:py-24">
        <div className="container">
          <div className="mb-12 flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Latest Blog Posts
            </h2>
            <Button asChild variant="outline">
              <Link href="/blog">View All Posts</Link>
            </Button>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card
                key={i}
                className="overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-md"
              >
                <div className="aspect-video overflow-hidden">
                  <Image
                    src={`/placeholder.svg?height=250&width=500&text=Blog%20Image%20${i}`}
                    alt={`Blog post ${i}`}
                    width={500}
                    height={250}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <CardHeader>
                  <div className="mb-2 text-sm text-muted-foreground">
                    {new Date().toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>

                  <CardTitle className="line-clamp-2">
                    Exploring the Intersection of Counseling and Social Justice
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="line-clamp-3">
                    Reflections on how counseling practices can promote equity
                    and address systemic barriers to mental health care access.
                  </CardDescription>
                </CardContent>
                <CardFooter>
                  <Link
                    href={`/blog/post-${i}`}
                    className="inline-flex items-center text-sm font-medium text-red-600 transition-colors hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                  >
                    Read More
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="rounded-2xl bg-red-600 p-8 text-white shadow-lg md:p-12">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
                Let's Connect
              </h2>
              <p className="mb-8 text-lg text-red-100">
                Whether you're interested in my research, looking for a speaker,
                or want to discuss potential collaborations, I'd love to hear
                from you.
              </p>
              <Button asChild size="lg" variant="secondary">
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
