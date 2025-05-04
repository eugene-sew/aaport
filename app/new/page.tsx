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
import AwardsAndHonorsSection from "@/components/new/AwardsAndHonorsSection";
import TeachingExperienceSection from "@/components/new/TeachingExperienceSection";
import ResearchProjectsSection from "@/components/new/ResearchProjectsSection";
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
                  <h3 className="text-[#FF2819] mb-6">Who Am I</h3>
                  <h2 className="text-3xl font-bold mb-6">
                    Ph.D. Candidate <br />
                    at Michigan <br />
                    State University
                  </h2>
                  <Button
                    asChild
                    className="bg-[#FF2819] hover:bg-[#FF2819]/90 mt-4 rounded"
                  >
                    <Link href="/about">Read More</Link>
                  </Button>
                </div>
                <div className="bg-[#FF2819] p-8 md:p-12">
                  <h3 className="text-white mt-5 mb-2 text-start font-semibold underline underline-offset-8">
                    Short Biography
                  </h3>
                  <p className="text-white text-start leading-loose">
                    <span className="text-5xl">D</span>iscover the journey of
                    Asmau, a dedicated and passionate doctoral candidate in the
                    Counselor Education and Supervision program at Michigan
                    State University. With a specialization in Rehabilitation
                    Counseling, she combines her extensive background in mental
                    health, education, and community service to foster positive
                    change. Here, you'll find detailed insights into her
                    professional experiences, research endeavors, teaching
                    responsibilities, and leadership roles within the community.
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
      <ResearchProjectsSection />
      {/* Teaching Experience Section */}
      <TeachingExperienceSection />

      {/* Featured Sections */}
      <AwardsAndHonorsSection />

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
                Connect with Asmau
              </h2>
              <p className="mb-8 text-lg text-red-100">
                For collaborations, inquiries, and more information on her work
                in counseling, research, and community service, please reach
                out.
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
