import Link from "next/link";
import Image from "next/image";
import { Users, BookOpen, Shield, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SupervisionPage() {
  return (
    <div className="container py-12 md:py-16">
      <div className="mb-12 space-y-4">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          Supervision
        </h1>
        <p className="max-w-3xl text-muted-foreground">
          Asmau's leadership extends to her supervision roles, where she fosters
          professional development among aspiring counselors through mentoring
          and constructive feedback. She provides guidance to graduate students
          and interns, emphasizing ethical practices and client-centered
          approaches in counseling.
        </p>
      </div>

      {/* Supervision Approach */}
      <section className="mb-16">
        <h2 className="mb-8 text-3xl font-bold tracking-tight">
          Supervision Philosophy
        </h2>
        <div className="grid gap-8 md:grid-cols-2 md:items-stretch">
          <div className="order-2 md:order-1 h-full">
            <div className="space-y-4 text-muted-foreground h-full flex flex-col justify-center">
              <p>
                Asmau's supervision philosophy is rooted in fostering a
                collaborative learning environment that nurtures professional
                growth while maintaining focus on client welfare. She believes
                effective supervision balances support with appropriate
                challenge, encouraging supervisees to develop their unique
                professional identity within ethical boundaries.
              </p>
              <p>
                Drawing from developmental and multicultural supervision models,
                Asmau tailors her approach to meet the unique needs and learning
                styles of each supervisee. She creates a supportive space that
                promotes critical reflection, cultural humility, and clinical
                competence.
              </p>
              <p>
                Central to her supervision practice is the integration of
                cultural factors. Asmau helps supervisees explore how their
                cultural identities and those of their clients influence the
                counseling process, emphasizing culturally responsive
                interventions and awareness of power dynamics.
              </p>
            </div>
          </div>
          <div className="order-1 md:order-2 h-full">
            <div className="relative w-full h-full overflow-hidden rounded-2xl">
              <Image
                src="/app.jpg"
                alt="Supervision Approach"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Supervision Framework */}
      <section className="mb-16">
        <h2 className="mb-8 text-3xl font-bold tracking-tight">
          Supervision Framework
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <Card className="overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-md">
            <CardHeader className="pb-2">
              <div className="mb-2 rounded-full bg-red-100 p-2 text-red-600 dark:bg-red-950 dark:text-red-300 w-fit">
                <Users className="h-6 w-6" />
              </div>
              <CardTitle>Mentorship</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Establishing a supportive mentoring relationship that empowers
                supervisees to develop their counseling skills and professional
                identity through guided practice and constructive feedback.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-md">
            <CardHeader className="pb-2">
              <div className="mb-2 rounded-full bg-red-100 p-2 text-red-600 dark:bg-red-950 dark:text-red-300 w-fit">
                <BookOpen className="h-6 w-6" />
              </div>
              <CardTitle>Ethical Practice</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Emphasizing adherence to ethical standards and guidelines in
                counseling, with special attention to confidentiality,
                boundaries, and culturally appropriate interventions.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-md">
            <CardHeader className="pb-2">
              <div className="mb-2 rounded-full bg-red-100 p-2 text-red-600 dark:bg-red-950 dark:text-red-300 w-fit">
                <Shield className="h-6 w-6" />
              </div>
              <CardTitle>Client-Centered</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Maintaining a focus on client welfare and outcomes throughout
                the supervision process, ensuring that supervisees develop
                interventions that are responsive to diverse client needs.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-md">
            <CardHeader className="pb-2">
              <div className="mb-2 rounded-full bg-red-100 p-2 text-red-600 dark:bg-red-950 dark:text-red-300 w-fit">
                <Lightbulb className="h-6 w-6" />
              </div>
              <CardTitle>Reflective Practice</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Encouraging ongoing self-reflection and critical evaluation of
                counseling approaches, fostering supervisees' ability to adapt
                and grow throughout their professional journey.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Supervision Experience */}
      <section className="mb-16">
        <h2 className="mb-8 text-3xl font-bold tracking-tight">
          Supervision Experience
        </h2>
        <div className="grid gap-8 md:grid-cols-2">
          <Card className="overflow-hidden rounded-2xl">
            <CardHeader>
              <CardTitle>Graduate Student Supervision</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-muted-foreground">
                Asmau provides supervision to graduate counseling students as
                they navigate their practicum and internship experiences. She
                focuses on helping them integrate theoretical knowledge with
                practical skills while developing their professional identity.
              </p>
              <div className="rounded-lg bg-muted p-4">
                <h4 className="mb-2 font-medium">Focus Areas:</h4>
                <ul className="ml-6 list-disc space-y-1 text-muted-foreground">
                  <li>Case conceptualization and treatment planning</li>
                  <li>Developing therapeutic relationship skills</li>
                  <li>Cultural competence in counseling practice</li>
                  <li>Ethical decision-making frameworks</li>
                  <li>Professional boundaries and self-care</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden rounded-2xl">
            <CardHeader>
              <CardTitle>Intern Mentorship</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-muted-foreground">
                As a mentor to counseling interns, Asmau provides guidance that
                bridges the gap between academic learning and real-world
                practice. Her supervision emphasizes skill development within
                ethical frameworks and client-centered approaches.
              </p>
              <div className="rounded-lg bg-muted p-4">
                <h4 className="mb-2 font-medium">Mentorship Components:</h4>
                <ul className="ml-6 list-disc space-y-1 text-muted-foreground">
                  <li>Regular one-on-one supervision sessions</li>
                  <li>Case review and constructive feedback</li>
                  <li>Skill development through role-playing exercises</li>
                  <li>Documentation and record-keeping guidance</li>
                  <li>Professional development planning</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Supervision Approach Details */}
      <section className="mb-16">
        <h2 className="mb-8 text-3xl font-bold tracking-tight">
          Supervision Methodology
        </h2>
        <div className="rounded-2xl border bg-card p-6 text-card-foreground shadow-sm">
          <p className="mb-6 text-muted-foreground">
            Asmau employs multiple supervisory techniques to foster
            comprehensive professional development among her supervisees. Her
            methodology combines traditional approaches with innovative
            strategies to address the evolving landscape of counseling practice.
          </p>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium">Supervision Methods:</h4>
              <ul className="ml-6 mt-2 list-disc space-y-1 text-muted-foreground">
                <li>Direct observation and constructive feedback sessions</li>
                <li>Case presentation and collaborative analysis</li>
                <li>Reflective journaling and process discussions</li>
                <li>
                  Integration of theoretical models with practical application
                </li>
                <li>
                  Cultural competence development through guided reflection
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium">Theoretical Foundations:</h4>
              <ul className="ml-6 mt-2 list-disc space-y-1 text-muted-foreground">
                <li>Developmental supervision models</li>
                <li>Multicultural supervision frameworks</li>
                <li>Reflective practice approaches</li>
                <li>Strengths-based supervision perspectives</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Development */}
      <section className="mb-16">
        <h2 className="mb-8 text-3xl font-bold tracking-tight">
          Supervisor Professional Development
        </h2>
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <Card className="h-full overflow-hidden rounded-2xl">
              <CardHeader>
                <CardTitle>Continuing Education</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Asmau continually enhances her supervision skills through
                  ongoing education and professional development. She regularly
                  participates in supervision training programs, workshops, and
                  conferences to stay current with best practices in counselor
                  supervision and education.
                </p>
              </CardContent>
            </Card>
          </div>
          <div>
            <Card className="h-full overflow-hidden rounded-2xl">
              <CardHeader>
                <CardTitle>Supervision Philosophy Development</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  As part of her commitment to excellence in supervision, Asmau
                  regularly reflects on and refines her supervision philosophy.
                  She incorporates feedback from supervisees and stays informed
                  about emerging research in counselor education and
                  supervision.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section>
        <div className="rounded-2xl bg-red-600 p-8 text-white shadow-lg md:p-12">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
              Connect for Supervision
            </h2>
            <p className="mb-8 text-lg text-red-100">
              Asmau is committed to supporting the development of ethical,
              culturally competent counseling professionals. If you're
              interested in supervision opportunities or would like to discuss
              professional development, please reach out.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" variant="secondary">
                <Link href="/contact">Contact Asmau</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-transparent text-white hover:bg-red-700"
              >
                <Link href="/professional-leadership">
                  Back to Professional Leadership
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
