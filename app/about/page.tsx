import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  BookOpen,
  GraduationCap,
  Heart,
  Users,
  School,
  Briefcase,
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
                About Asmau Ayub
              </h1>
              <p className="mb-4 text-lg text-muted-foreground">
                Asmau Ayub is a dedicated and passionate doctoral candidate in
                the Counselor Education and Supervision program at Michigan
                State University. With a specialization in Rehabilitation
                Counseling, she combines her extensive background in mental
                health, education, and community service to foster positive
                change.
              </p>
              <p className="mb-6 text-muted-foreground">
                Her research interests focus on understanding and addressing
                pressing issues in mental health and rehabilitation. As a
                licensed counseling psychologist in Ghana, Asmau has dedicated
                over eleven years to advancing mental health support,
                specializing in rehabilitation and school counseling.
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
              <div className="relative h-72 w-72 md:h-[500px] md:w-96">
                <Image
                  src="/about.jpg"
                  alt="Asmau Ayub"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Counseling Experience */}
      <section className="py-16 md:py-24 bg-slate-50" id="counseling">
        <div className="container">
          <h2 className="mb-8 text-center text-3xl font-bold tracking-tight md:text-4xl">
            Counseling Experience
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="rounded-xl shadow-md">
              <CardHeader className="pb-3">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-red-100">
                  <Briefcase className="h-6 w-6 text-red-600" />
                </div>
                <CardTitle>Mental Health Practice</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  As a licensed counseling psychologist in Ghana, Asmau has a
                  proven track record of assessing and treating mental health
                  issues, providing individual, group, and family therapy to
                  diverse populations, including marginalized communities.
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-xl shadow-md">
              <CardHeader className="pb-3">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-red-100">
                  <School className="h-6 w-6 text-red-600" />
                </div>
                <CardTitle>School Counseling</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  With experience in various educational settings, Asmau has
                  expertly guided students through academic, career, and
                  personal challenges, ensuring they receive holistic support
                  while promoting growth and resilience.
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-xl shadow-md">
              <CardHeader className="pb-3">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-red-100">
                  <Users className="h-6 w-6 text-red-600" />
                </div>
                <CardTitle>Community Engagement</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Her foundational work through the Rayuwa Foundation in Ghana
                  highlights her commitment to psychosocial and educational
                  support, empowering underserved populations and advocating for
                  improved mental health services among victims of domestic
                  abuse and violence.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Community Service */}
      <section className="bg-muted py-16 md:py-24">
        <div className="container">
          <h2 className="mb-8 text-center text-3xl font-bold tracking-tight md:text-4xl">
            Community Service
          </h2>
          <div className="mx-auto grid max-w-5xl gap-12">
            <Card className="overflow-hidden rounded-xl shadow-md">
              <div className="grid md:grid-cols-2">
                <div className="relative h-64 md:h-full">
                  <Image
                    src="/ru.jpg"
                    alt="Rayuwa Foundation community work"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <CardHeader>
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-red-100">
                      <Heart className="h-6 w-6 text-red-600" />
                    </div>
                    <CardTitle>Rayuwa Foundation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      As the Founder and Executive Director of Rayuwa
                      Foundation, Asmau leads programs targeting mental health
                      and educational support for marginalized groups in Ghana.
                      The foundation organizes outreach programs that promote
                      mental health education and empowerment, reaching
                      vulnerable populations, including women and children
                      affected by domestic violence.
                    </p>
                  </CardContent>
                </div>
              </div>
            </Card>

            <Card className="overflow-hidden rounded-xl shadow-md">
              <div className="grid md:grid-cols-2">
                <div className="order-1 md:order-2 relative h-64 md:h-full">
                  <Image
                    src="/mentorship pic.jpg"
                    alt="Academic leadership activities"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="order-2 md:order-1">
                  <CardHeader>
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-red-100">
                      <GraduationCap className="h-6 w-6 text-red-600" />
                    </div>
                    <CardTitle>Academic Leadership</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Asmau actively contributes to local and global communities
                      through various service initiatives as a student leader in
                      various campus RSOs. Her leadership extends to supervision
                      roles, where she fosters professional development among
                      aspiring counselors through mentoring and constructive
                      feedback.
                    </p>
                  </CardContent>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Awards & Recognitions */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container">
          <h2 className="mb-8 text-center text-3xl font-bold tracking-tight md:text-4xl">
            Awards & Recognitions
          </h2>
          <div className="mx-auto max-w-4xl">
            <Card className="rounded-xl shadow-md">
              <CardHeader className="pb-3">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-red-100">
                  <Award className="h-6 w-6 text-red-600" />
                </div>
                <CardTitle>Honors & Achievements</CardTitle>
                <CardDescription>
                  Recognition for excellence in research, community service, and
                  academic achievement
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h4 className="mb-3 text-lg font-semibold">
                      Academic Awards
                    </h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-start">
                        <span className="mr-2 mt-1 text-red-600">•</span>
                        <span>Summer Research Fellowship, 2025</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 mt-1 text-red-600">•</span>
                        <span>
                          Graduate School Travel Fellowship, Spring 2025
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 mt-1 text-red-600">•</span>
                        <span>Scully-Hill Diversity Award, Spring 2024</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 mt-1 text-red-600">•</span>
                        <span>Rehab Counseling Travel Grant</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 mt-1 text-red-600">•</span>
                        <span>
                          College of Education Research Hard Cost Grant, Spring
                          Semester, 2023
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 mt-1 text-red-600">•</span>
                        <span>
                          Office of Rehabilitation and Disability Studies,
                          conference grant 2023, 2024, 2025
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 mt-1 text-red-600">•</span>
                        <span>
                          African Studies Department, conference grant 2024,
                          2025
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="mb-3 text-lg font-semibold">
                      Leadership & Community Recognition
                    </h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-start">
                        <span className="mr-2 mt-1 text-red-600">•</span>
                        <span>
                          Ghana Muslim Achievers Awards - Most Promising Muslim
                          Female of the Year, 2020
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 mt-1 text-red-600">•</span>
                        <span>
                          Honorary Citation - Zongo Focus, Zongo Person of the
                          Year 2020
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 mt-1 text-red-600">•</span>
                        <span>
                          Department of State-sponsored program, Youth Adult
                          Mentor - USA (2019)
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 mt-1 text-red-600">•</span>
                        <span>
                          Department of State-sponsored program (Study of the US
                          Institute for 2019)
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 mt-1 text-red-600">•</span>
                        <span>Carter Center mini-grant award, 2015</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 mt-1 text-red-600">•</span>
                        <span>
                          Human Rights Training - Tostan Training Centre/Carter
                          Center (2015, 2016, 2017)
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 mt-1 text-red-600">•</span>
                        <span>
                          YALI Tech Training on Community Grassroots Mobilizing
                          - US Embassy/South Africa (2015)
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 mt-1 text-red-600">•</span>
                        <span>
                          Representative - UN Women Youth Consultative
                          Conference - Kigali/Rwanda 2011
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 mt-1 text-red-600">•</span>
                        <span>
                          Africa's Young Promising Female Leader (MILEAD
                          FELLOWSHIP AWARD) 2010
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Academic Credentials CTA */}

      <section className="py-16 md:py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl rounded-2xl bg-red-50 p-8 text-center">
            <h3 className="mb-4 text-2xl font-bold text-gray-900">
              Academic Journey
            </h3>
            <p className="mb-6 text-muted-foreground">
              Explore Asmau's research interests, publications, and ongoing
              projects in rehabilitation counseling, mental health advocacy, and
              educational psychology.
            </p>
            <Button asChild className="bg-red-600 hover:bg-red-700">
              <Link href="/publications" className="inline-flex items-center">
                View Academic Work
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
