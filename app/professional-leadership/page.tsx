import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Award, Users, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import BlobBackground from "@/components/blob-background"

export default function ProfessionalLeadershipPage() {
  return (
    <div className="relative">
      <BlobBackground />

      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">Professional Leadership</h1>
            <p className="mb-8 text-lg text-muted-foreground">
              I am committed to advancing the counseling profession through leadership, supervision, mentorship, and
              community service. My professional activities reflect my dedication to promoting excellence, equity, and
              innovation in counseling practice and education.
            </p>
          </div>
        </div>
      </section>

      {/* Leadership Areas */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2">
            <Card className="overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-md">
              <div className="aspect-video overflow-hidden">
                <Image
                  src="/placeholder.svg?height=250&width=500&text=Supervision"
                  alt="Supervision"
                  width={500}
                  height={250}
                  className="h-full w-full object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle>Supervision</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  I provide clinical supervision to counselors-in-training and practicing professionals, focusing on
                  developing multicultural competence, ethical practice, and evidence-based interventions.
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Link
                  href="/professional-leadership/supervision"
                  className="inline-flex items-center text-sm font-medium text-red-600 transition-colors hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                >
                  Learn More
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardFooter>
            </Card>

            <Card className="overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-md">
              <div className="aspect-video overflow-hidden">
                <Image
                  src="/placeholder.svg?height=250&width=500&text=Community%20Service"
                  alt="Community Service"
                  width={500}
                  height={250}
                  className="h-full w-full object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle>Community Service</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  I engage in community service activities that promote mental health awareness, reduce stigma, and
                  increase access to counseling services for underserved populations.
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Link
                  href="/professional-leadership/community-service"
                  className="inline-flex items-center text-sm font-medium text-red-600 transition-colors hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                >
                  Learn More
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Professional Roles */}
      <section className="bg-muted py-16 md:py-24">
        <div className="container">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight md:text-4xl">Professional Roles</h2>
          <div className="mx-auto grid max-w-4xl gap-8">
            <Card className="overflow-hidden rounded-2xl">
              <CardHeader className="pb-2">
                <div className="mb-2 rounded-full bg-red-100 p-2 text-red-600 dark:bg-red-950 dark:text-red-300 w-fit">
                  <Award className="h-6 w-6" />
                </div>
                <CardTitle>Board Member, Michigan Counseling Association</CardTitle>
                <CardDescription>2020 - Present</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Serve on the executive board, contributing to strategic planning, professional advocacy initiatives,
                  and continuing education programming. Chair the Diversity and Inclusion Committee, working to promote
                  equity and representation within the organization and the profession.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden rounded-2xl">
              <CardHeader className="pb-2">
                <div className="mb-2 rounded-full bg-red-100 p-2 text-red-600 dark:bg-red-950 dark:text-red-300 w-fit">
                  <Users className="h-6 w-6" />
                </div>
                <CardTitle>Editorial Board Member, Journal of Counseling and Development</CardTitle>
                <CardDescription>2019 - Present</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Review manuscript submissions, provide feedback to authors, and contribute to editorial decisions.
                  Participate in special issue planning and development, with a focus on multicultural counseling and
                  social justice topics.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden rounded-2xl">
              <CardHeader className="pb-2">
                <div className="mb-2 rounded-full bg-red-100 p-2 text-red-600 dark:bg-red-950 dark:text-red-300 w-fit">
                  <Heart className="h-6 w-6" />
                </div>
                <CardTitle>Committee Member, ACA Multicultural Counseling Competencies Revision Task Force</CardTitle>
                <CardDescription>2018 - 2020</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Contributed to the revision of the Multicultural and Social Justice Counseling Competencies, focusing
                  on supervision and training implications. Participated in literature review, framework development,
                  and document drafting.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden rounded-2xl">
              <CardHeader className="pb-2">
                <div className="mb-2 rounded-full bg-red-100 p-2 text-red-600 dark:bg-red-950 dark:text-red-300 w-fit">
                  <Award className="h-6 w-6" />
                </div>
                <CardTitle>
                  Program Reviewer, Council for Accreditation of Counseling and Related Educational Programs (CACREP)
                </CardTitle>
                <CardDescription>2017 - Present</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Serve as a site visitor and program reviewer for counselor education programs seeking CACREP
                  accreditation. Evaluate program compliance with standards related to curriculum, faculty
                  qualifications, student assessment, and clinical training.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Professional Development */}
      <section className="py-16 md:py-24">
        <div className="container">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight md:text-4xl">
            Professional Development Initiatives
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-md">
              <CardHeader>
                <CardTitle>Supervision Training Institute</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Co-founded and facilitate an annual training institute for counseling supervisors, focusing on
                  multicultural supervision, ethical practice, and innovative supervision methods.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-md">
              <CardHeader>
                <CardTitle>Mentorship Program</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Developed and coordinate a mentorship program pairing experienced counselors with early career
                  professionals, with an emphasis on supporting counselors from underrepresented groups.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-md">
              <CardHeader>
                <CardTitle>Continuing Education Workshops</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Design and present continuing education workshops on topics including trauma-informed care, cultural
                  humility, and social justice advocacy in counseling practice.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-muted py-16">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold tracking-tight md:text-4xl">Interested in Collaboration?</h2>
            <p className="mb-8 text-lg text-muted-foreground">
              I am always open to new professional collaborations, leadership opportunities, and community partnerships
              that advance the counseling profession and promote mental health and wellbeing.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild className="bg-red-600 hover:bg-red-700">
                <Link href="/professional-leadership/supervision">Learn About Supervision</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/professional-leadership/community-service">Explore Community Service</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
