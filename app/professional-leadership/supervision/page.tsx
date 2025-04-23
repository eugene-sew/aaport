import Link from "next/link"
import Image from "next/image"
import { Users, BookOpen, Shield, Lightbulb } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function SupervisionPage() {
  return (
    <div className="container py-12 md:py-16">
      <div className="mb-12 space-y-4">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Supervision</h1>
        <p className="max-w-3xl text-muted-foreground">
          Clinical supervision is a cornerstone of counselor development and quality assurance in mental health
          services. I am passionate about providing effective, culturally responsive supervision that promotes counselor
          growth and client wellbeing.
        </p>
      </div>

      {/* Supervision Approach */}
      <section className="mb-16">
        <h2 className="mb-8 text-3xl font-bold tracking-tight">Supervision Approach</h2>
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <div className="order-2 md:order-1">
            <div className="space-y-4 text-muted-foreground">
              <p>
                My supervision approach is integrative, drawing from developmental, process-oriented, and multicultural
                supervision models. I tailor my supervision style to meet the unique needs, learning styles, and
                developmental stages of each supervisee.
              </p>
              <p>
                I view supervision as a collaborative relationship characterized by mutual respect, open communication,
                and shared goals. I create a supportive yet challenging environment that promotes reflection, growth,
                and professional identity development.
              </p>
              <p>
                Cultural factors are central to my supervision practice. I help supervisees explore how their own
                cultural identities and those of their clients influence the counseling process, and I model cultural
                humility and responsiveness.
              </p>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <div className="relative aspect-square overflow-hidden rounded-2xl">
              <Image
                src="/placeholder.svg?height=400&width=400&text=Supervision%20in%20Action"
                alt="Supervision in Action"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Supervision Framework */}
      <section className="mb-16">
        <h2 className="mb-8 text-3xl font-bold tracking-tight">Supervision Framework</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <Card className="overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-md">
            <CardHeader className="pb-2">
              <div className="mb-2 rounded-full bg-red-100 p-2 text-red-600 dark:bg-red-950 dark:text-red-300 w-fit">
                <Users className="h-6 w-6" />
              </div>
              <CardTitle>Relationship</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Building a strong supervisory alliance based on trust, respect, and clear expectations. Creating a safe
                space for exploration, vulnerability, and growth.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-md">
            <CardHeader className="pb-2">
              <div className="mb-2 rounded-full bg-red-100 p-2 text-red-600 dark:bg-red-950 dark:text-red-300 w-fit">
                <BookOpen className="h-6 w-6" />
              </div>
              <CardTitle>Reflection</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Promoting critical reflection on counseling practice, theoretical orientation, and professional
                identity. Encouraging self-awareness and continuous learning.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-md">
            <CardHeader className="pb-2">
              <div className="mb-2 rounded-full bg-red-100 p-2 text-red-600 dark:bg-red-950 dark:text-red-300 w-fit">
                <Shield className="h-6 w-6" />
              </div>
              <CardTitle>Responsibility</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Ensuring ethical practice and client welfare through careful monitoring, feedback, and evaluation.
                Balancing support with accountability.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-md">
            <CardHeader className="pb-2">
              <div className="mb-2 rounded-full bg-red-100 p-2 text-red-600 dark:bg-red-950 dark:text-red-300 w-fit">
                <Lightbulb className="h-6 w-6" />
              </div>
              <CardTitle>Responsiveness</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Adapting supervision methods to meet the evolving needs of supervisees and their clients. Remaining
                flexible, creative, and culturally responsive.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Supervision Services */}
      <section className="mb-16">
        <h2 className="mb-8 text-3xl font-bold tracking-tight">Supervision Services</h2>
        <div className="grid gap-8 md:grid-cols-2">
          <Card className="overflow-hidden rounded-2xl">
            <CardHeader>
              <CardTitle>Individual Supervision</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-muted-foreground">
                I provide individual supervision to counselors-in-training, post-graduate counselors working toward
                licensure, and licensed professionals seeking consultation on complex cases or specialized areas of
                practice.
              </p>
              <div className="rounded-lg bg-muted p-4">
                <h4 className="mb-2 font-medium">Focus Areas:</h4>
                <ul className="ml-6 list-disc space-y-1 text-muted-foreground">
                  <li>Case conceptualization and treatment planning</li>
                  <li>Counseling interventions and techniques</li>
                  <li>Multicultural counseling competence</li>
                  <li>Ethical decision-making</li>
                  <li>Professional identity development</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden rounded-2xl">
            <CardHeader>
              <CardTitle>Group Supervision</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-muted-foreground">
                I facilitate group supervision for counseling students and professionals, creating a collaborative
                learning environment that leverages the diverse perspectives and experiences of group members.
              </p>
              <div className="rounded-lg bg-muted p-4">
                <h4 className="mb-2 font-medium">Benefits:</h4>
                <ul className="ml-6 list-disc space-y-1 text-muted-foreground">
                  <li>Exposure to a wider range of client populations and issues</li>
                  <li>Peer feedback and support</li>
                  <li>Opportunities to observe different counseling approaches</li>
                  <li>Development of consultation skills</li>
                  <li>Cost-effective professional development</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden rounded-2xl">
            <CardHeader>
              <CardTitle>Supervision of Supervisors</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-muted-foreground">
                I provide meta-supervision to developing supervisors, helping them build their supervision skills,
                theoretical framework, and professional identity as supervisors.
              </p>
              <div className="rounded-lg bg-muted p-4">
                <h4 className="mb-2 font-medium">Components:</h4>
                <ul className="ml-6 list-disc space-y-1 text-muted-foreground">
                  <li>Supervision models and theories</li>
                  <li>Supervisory relationship development</li>
                  <li>Evaluation and feedback methods</li>
                  <li>Legal and ethical issues in supervision</li>
                  <li>Multicultural supervision competence</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden rounded-2xl">
            <CardHeader>
              <CardTitle>Supervision Training</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-muted-foreground">
                I design and deliver supervision training workshops and programs for counseling professionals
                transitioning into supervisory roles or seeking to enhance their supervision skills.
              </p>
              <div className="rounded-lg bg-muted p-4">
                <h4 className="mb-2 font-medium">Training Topics:</h4>
                <ul className="ml-6 list-disc space-y-1 text-muted-foreground">
                  <li>Foundations of clinical supervision</li>
                  <li>Developmental approaches to supervision</li>
                  <li>Multicultural supervision competencies</li>
                  <li>Managing challenging supervision situations</li>
                  <li>Documentation and risk management</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Supervision Research */}
      <section className="mb-16">
        <h2 className="mb-8 text-3xl font-bold tracking-tight">Supervision Research</h2>
        <div className="rounded-2xl border bg-card p-6 text-card-foreground shadow-sm">
          <p className="mb-6 text-muted-foreground">
            My research on supervision focuses on multicultural supervision, supervisor development, and effective
            supervision practices. This research informs my supervision approach and contributes to the broader field of
            counselor education and supervision.
          </p>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium">Key Research Areas:</h4>
              <ul className="ml-6 mt-2 list-disc space-y-1 text-muted-foreground">
                <li>Multicultural supervision models and their impact on counselor development</li>
                <li>Supervisor training and professional identity development</li>
                <li>Supervision interventions for promoting counselor self-efficacy</li>
                <li>Technology-enhanced supervision methods and outcomes</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium">Recent Publications:</h4>
              <ul className="ml-6 mt-2 list-disc space-y-1 text-muted-foreground">
                <li>
                  Ayub, A., & Johnson, K. (2023). The impact of multicultural supervision on counselor development.
                  Journal of Counseling Psychology.
                </li>
                <li>
                  Ayub, A. (2021). Ethical considerations in cross-cultural counseling supervision. In M. Johnson & L.
                  Davis (Eds.), Handbook of Multicultural Counseling Supervision. Routledge.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section>
        <div className="rounded-2xl bg-red-600 p-8 text-white shadow-lg md:p-12">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">Interested in Supervision?</h2>
            <p className="mb-8 text-lg text-red-100">
              Whether you're seeking individual supervision, interested in group supervision, or looking for supervision
              training, I'd be happy to discuss how I can support your professional development.
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
