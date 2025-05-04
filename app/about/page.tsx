import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  BookOpen,
  GraduationCap,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import BlobBackground from "@/components/blob-background";

export default function AboutPage() {
  return (
    <div className="relative">
      <BlobBackground />

      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div className="order-2 md:order-1">
              <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">
                About Me
              </h1>
              <p className="mb-4 text-lg text-muted-foreground">
                I am Asmau Ayub, a Licensed Counseling Psychologist with over a
                decade of clinical experience. Currently, I am a third-year PhD
                candidate in Counselor Education & Supervision at Michigan State
                University.
              </p>
              <p className="mb-6 text-muted-foreground">
                My research interests focus on multicultural counseling
                competence, social justice advocacy in counseling, and effective
                supervision methodologies. I am passionate about training the
                next generation of counselors to provide culturally responsive
                and ethical mental health services.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild className="bg-red-600 hover:bg-red-700">
                  <Link href="/research">View Research</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/contact/request-cv">Request CV</Link>
                </Button>
              </div>
            </div>
            <div className="order-1 flex justify-center md:order-2">
              <div className="relative h-72 w-72 border-4 border-red-600 shadow-xl md:h-[600px] md:w-[600px]">
                <Image
                  src="/main.png"
                  alt="Asmau Ayub"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education & Credentials */}
      <section className="bg-muted py-16 md:py-24">
        <div className="container">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight md:text-4xl">
            Education & Credentials
          </h2>
          <div className="mx-auto grid max-w-4xl gap-8">
            <Card className="overflow-hidden rounded-2xl">
              <CardHeader className="pb-2">
                <div className="mb-2 flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-red-600" />
                  <span className="text-sm font-medium text-red-600">
                    Current
                  </span>
                </div>
                <CardTitle>PhD in Counselor Education & Supervision</CardTitle>
                <CardDescription>
                  Michigan State University, Expected 2024
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Dissertation focus: "Multicultural Supervision Models and
                  Their Impact on Counselor Development"
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden rounded-2xl">
              <CardHeader className="pb-2">
                <div className="mb-2 flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-red-600" />
                  <span className="text-sm font-medium text-red-600">2015</span>
                </div>
                <CardTitle>Master of Arts in Counseling Psychology</CardTitle>
                <CardDescription>
                  University of Michigan, Ann Arbor
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Specialization in multicultural counseling and trauma-informed
                  care
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden rounded-2xl">
              <CardHeader className="pb-2">
                <div className="mb-2 flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-red-600" />
                  <span className="text-sm font-medium text-red-600">2012</span>
                </div>
                <CardTitle>Bachelor of Science in Psychology</CardTitle>
                <CardDescription>
                  University of Illinois, Urbana-Champaign
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Minor in Sociology, Graduated with Honors
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden rounded-2xl">
              <CardHeader className="pb-2">
                <div className="mb-2 flex items-center gap-2">
                  <Award className="h-5 w-5 text-red-600" />
                  <span className="text-sm font-medium text-red-600">
                    Licensure
                  </span>
                </div>
                <CardTitle>Licensed Professional Counselor (LPC)</CardTitle>
                <CardDescription>
                  State of Michigan, License #12345
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Certified in EMDR Therapy and Trauma-Focused Cognitive
                  Behavioral Therapy (TF-CBT)
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Professional Philosophy */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold tracking-tight md:text-4xl">
              My Professional Philosophy
            </h2>
            <div className="mb-8 text-lg text-muted-foreground">
              <p className="mb-4">
                I believe in a holistic, culturally responsive approach to
                counseling and education that honors the unique experiences and
                backgrounds of each individual. My work is guided by the
                principles of:
              </p>
              <div className="grid gap-6 md:grid-cols-2">
                <Card className="overflow-hidden rounded-2xl text-left">
                  <CardHeader className="pb-2">
                    <div className="mb-2 rounded-full bg-red-100 p-2 text-red-600 dark:bg-red-950 dark:text-red-300 w-fit">
                      <Heart className="h-5 w-5" />
                    </div>
                    <CardTitle>Empathy & Compassion</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      Creating a safe, supportive environment where clients and
                      students feel truly seen and heard.
                    </CardDescription>
                  </CardContent>
                </Card>

                <Card className="overflow-hidden rounded-2xl text-left">
                  <CardHeader className="pb-2">
                    <div className="mb-2 rounded-full bg-red-100 p-2 text-red-600 dark:bg-red-950 dark:text-red-300 w-fit">
                      <BookOpen className="h-5 w-5" />
                    </div>
                    <CardTitle>Evidence-Based Practice</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      Integrating the latest research with clinical expertise
                      and client values for optimal outcomes.
                    </CardDescription>
                  </CardContent>
                </Card>
              </div>
            </div>
            <Button asChild className="bg-red-600 hover:bg-red-700">
              <Link href="/about/counseling">
                Learn About My Counseling Approach
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Professional Affiliations */}
      <section className="bg-muted py-16 md:py-24">
        <div className="container">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight md:text-4xl">
            Professional Affiliations
          </h2>
          <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
            <Card className="overflow-hidden rounded-2xl">
              <CardHeader>
                <CardTitle>American Counseling Association (ACA)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Active member since 2013, serving on the Multicultural
                  Counseling Committee
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden rounded-2xl">
              <CardHeader>
                <CardTitle>
                  Association for Counselor Education and Supervision (ACES)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Member since 2018, contributing to research initiatives
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden rounded-2xl">
              <CardHeader>
                <CardTitle>Michigan Counseling Association (MCA)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Board member since 2020, advocating for counseling profession
                  advancement
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden rounded-2xl">
              <CardHeader>
                <CardTitle>
                  International Association for Counseling (IAC)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Member since 2016, participating in global counseling
                  initiatives
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
