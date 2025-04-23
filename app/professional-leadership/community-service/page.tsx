import Link from "next/link"
import Image from "next/image"
import { Heart, Users, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// This would be fetched from Supabase in a real implementation
const communityProjects = [
  {
    id: 1,
    title: "Mental Health Awareness Workshop Series",
    organization: "Michigan Community Mental Health Coalition",
    role: "Lead Facilitator",
    period: "2021 - Present",
    description:
      "Develop and deliver workshops on mental health awareness, stigma reduction, and help-seeking behaviors for community members, educators, and healthcare providers.",
    impact: [
      "Reached over 500 community members through in-person and virtual workshops",
      "Increased mental health literacy and reduced stigma among participants",
      "Developed culturally responsive materials for diverse communities",
    ],
    image: "/placeholder.svg?height=250&width=500&text=Mental%20Health%20Workshops",
  },
  {
    id: 2,
    title: "Counseling Services for Underserved Communities",
    organization: "East Lansing Community Center",
    role: "Volunteer Counselor",
    period: "2019 - Present",
    description:
      "Provide pro bono counseling services to individuals from underserved communities who face barriers to accessing mental health care, including financial constraints, transportation issues, and cultural barriers.",
    impact: [
      "Delivered over 200 hours of pro bono counseling services",
      "Supported clients from diverse socioeconomic and cultural backgrounds",
      "Developed culturally responsive counseling approaches",
    ],
    image: "/placeholder.svg?height=250&width=500&text=Counseling%20Services",
  },
  {
    id: 3,
    title: "Trauma-Informed Care Training for School Personnel",
    organization: "Michigan School Counselor Association",
    role: "Curriculum Developer and Trainer",
    period: "2020 - Present",
    description:
      "Design and implement trauma-informed care training for K-12 school personnel, focusing on recognizing signs of trauma, creating safe learning environments, and making appropriate referrals.",
    impact: [
      "Trained over 300 teachers, administrators, and support staff",
      "Improved school climate and support for students affected by trauma",
      "Developed a sustainable training model adopted by multiple school districts",
    ],
    image: "/placeholder.svg?height=250&width=500&text=Trauma-Informed%20Care",
  },
  {
    id: 4,
    title: "Multicultural Counseling Resource Development",
    organization: "American Counseling Association - Michigan Chapter",
    role: "Committee Chair",
    period: "2018 - 2021",
    description:
      "Led a committee to develop and disseminate resources on multicultural counseling for practitioners serving diverse populations, including translated materials, cultural competence guides, and community resource directories.",
    impact: [
      "Created resources in five languages to serve diverse communities",
      "Distributed materials to over 100 community mental health centers",
      "Increased accessibility of mental health information for immigrant and refugee communities",
    ],
    image: "/placeholder.svg?height=250&width=500&text=Multicultural%20Resources",
  },
]

export default function CommunityServicePage() {
  return (
    <div className="container py-12 md:py-16">
      <div className="mb-12 space-y-4">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Community Service</h1>
        <p className="max-w-3xl text-muted-foreground">
          I am deeply committed to community service and outreach that promotes mental health awareness, reduces stigma,
          and increases access to counseling services for underserved populations. My service activities reflect my
          belief in the counselor's role as an advocate and change agent.
        </p>
      </div>

      {/* Service Philosophy */}
      <section className="mb-16">
        <h2 className="mb-8 text-3xl font-bold tracking-tight">Service Philosophy</h2>
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <div className="space-y-4 text-muted-foreground">
              <p>
                My approach to community service is guided by principles of social justice, cultural responsiveness, and
                community empowerment. I believe that mental health professionals have a responsibility to extend their
                expertise beyond traditional clinical settings to address systemic barriers to wellbeing.
              </p>
              <p>
                I am particularly passionate about reducing disparities in mental health care access and outcomes for
                marginalized communities. This involves not only providing direct services but also working to transform
                systems, policies, and practices that perpetuate inequities.
              </p>
              <p>
                In all my service activities, I strive to work collaboratively with community members and organizations,
                recognizing and honoring their expertise, strengths, and self-determination. I believe that sustainable
                change comes from within communities, supported by respectful partnerships with professionals.
              </p>
            </div>
          </div>
          <div>
            <div className="relative aspect-video overflow-hidden rounded-2xl">
              <Image
                src="/placeholder.svg?height=400&width=600&text=Community%20Service"
                alt="Community Service"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="mb-16">
        <h2 className="mb-8 text-3xl font-bold tracking-tight">Service Areas</h2>
        <div className="grid gap-8 md:grid-cols-3">
          <Card className="overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-md">
            <CardHeader className="pb-2">
              <div className="mb-2 rounded-full bg-red-100 p-2 text-red-600 dark:bg-red-950 dark:text-red-300 w-fit">
                <Heart className="h-6 w-6" />
              </div>
              <CardTitle>Mental Health Advocacy</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Promoting mental health awareness, reducing stigma, and advocating for policies that support mental
                health services and parity in healthcare coverage.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-md">
            <CardHeader className="pb-2">
              <div className="mb-2 rounded-full bg-red-100 p-2 text-red-600 dark:bg-red-950 dark:text-red-300 w-fit">
                <Users className="h-6 w-6" />
              </div>
              <CardTitle>Community Education</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Developing and delivering educational programs on mental health topics for community members, educators,
                healthcare providers, and other stakeholders.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-md">
            <CardHeader className="pb-2">
              <div className="mb-2 rounded-full bg-red-100 p-2 text-red-600 dark:bg-red-950 dark:text-red-300 w-fit">
                <Globe className="h-6 w-6" />
              </div>
              <CardTitle>Multicultural Outreach</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Creating culturally responsive mental health resources and services for diverse communities, including
                immigrant and refugee populations, LGBTQ+ individuals, and racial/ethnic minorities.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Community Projects */}
      <section className="mb-16">
        <h2 className="mb-8 text-3xl font-bold tracking-tight">Community Projects</h2>
        <div className="grid gap-8">
          {communityProjects.map((project) => (
            <Card key={project.id} className="overflow-hidden rounded-2xl">
              <div className="grid md:grid-cols-3">
                <div className="aspect-video md:aspect-auto md:h-full">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    width={500}
                    height={300}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="md:col-span-2">
                  <CardHeader>
                    <div className="mb-1 flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-600 dark:bg-red-950 dark:text-red-300">
                        {project.organization}
                      </span>
                      <span className="text-sm text-muted-foreground">{project.period}</span>
                    </div>
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription>{project.role}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-muted-foreground">{project.description}</p>
                    <div className="rounded-lg bg-muted p-4">
                      <h4 className="mb-2 font-medium">Impact:</h4>
                      <ul className="ml-6 list-disc space-y-1 text-muted-foreground">
                        {project.impact.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Professional Service */}
      <section className="mb-16">
        <h2 className="mb-8 text-3xl font-bold tracking-tight">Professional Service</h2>
        <div className="rounded-2xl border bg-card p-6 text-card-foreground shadow-sm">
          <p className="mb-6 text-muted-foreground">
            In addition to community service, I am actively involved in service to the counseling profession through
            leadership roles in professional organizations, committee work, and mentorship activities.
          </p>
          <div className="space-y-6">
            <div>
              <h4 className="mb-2 font-medium">Professional Organization Leadership:</h4>
              <ul className="ml-6 list-disc space-y-1 text-muted-foreground">
                <li>Board Member, Michigan Counseling Association (2020-Present)</li>
                <li>Chair, Diversity and Inclusion Committee, Michigan Counseling Association (2021-Present)</li>
                <li>
                  Member, Multicultural Counseling Competencies Revision Task Force, American Counseling Association
                  (2018-2020)
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-2 font-medium">Editorial Service:</h4>
              <ul className="ml-6 list-disc space-y-1 text-muted-foreground">
                <li>Editorial Board Member, Journal of Counseling and Development (2019-Present)</li>
                <li>Ad Hoc Reviewer, Journal of Multicultural Counseling and Development (2017-Present)</li>
                <li>Guest Editor, Special Issue on Social Justice Advocacy, Michigan Journal of Counseling (2022)</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-2 font-medium">Mentorship:</h4>
              <ul className="ml-6 list-disc space-y-1 text-muted-foreground">
                <li>Mentor, American Counseling Association Minority Fellowship Program (2020-Present)</li>
                <li>
                  Faculty Advisor, Counseling and Psychology Student Association, Michigan State University
                  (2019-Present)
                </li>
                <li>Career Mentor, Michigan Counseling Association Early Career Professional Program (2018-2021)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section>
        <div className="rounded-2xl bg-red-600 p-8 text-white shadow-lg md:p-12">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">Get Involved</h2>
            <p className="mb-8 text-lg text-red-100">
              I welcome opportunities to collaborate on community service initiatives, professional advocacy projects,
              and educational outreach programs that promote mental health and wellbeing.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" variant="secondary">
                <Link href="/contact">Contact Me</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent text-white hover:bg-red-700">
                <Link href="/professional-leadership">Back to Professional Leadership</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
