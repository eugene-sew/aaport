import Link from "next/link"
import { Heart, Shield, Lightbulb, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import BlobBackground from "@/components/blob-background"

export default function CounselingPage() {
  return (
    <div className="relative">
      <BlobBackground />

      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">Counseling Approach</h1>
            <p className="mb-8 text-lg text-muted-foreground">
              As a Licensed Counseling Psychologist with over a decade of clinical experience, I have developed an
              integrative approach to counseling that draws from multiple theoretical perspectives and is grounded in
              evidence-based practice.
            </p>
          </div>
        </div>
      </section>

      {/* Theoretical Orientation */}
      <section className="py-12 md:py-16">
        <div className="container">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight md:text-4xl">Theoretical Orientation</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-md">
              <CardHeader className="pb-2">
                <div className="mb-2 rounded-full bg-red-100 p-2 text-red-600 dark:bg-red-950 dark:text-red-300 w-fit">
                  <Heart className="h-6 w-6" />
                </div>
                <CardTitle>Person-Centered Foundation</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  My counseling approach is built on a person-centered foundation that emphasizes empathy, unconditional
                  positive regard, and genuineness. I believe in the inherent worth and potential of each individual and
                  their capacity for growth and self-direction.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-md">
              <CardHeader className="pb-2">
                <div className="mb-2 rounded-full bg-red-100 p-2 text-red-600 dark:bg-red-950 dark:text-red-300 w-fit">
                  <Lightbulb className="h-6 w-6" />
                </div>
                <CardTitle>Cognitive-Behavioral Integration</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  I integrate cognitive-behavioral techniques to help clients identify and modify unhelpful thought
                  patterns and behaviors. This evidence-based approach is particularly effective for addressing anxiety,
                  depression, and stress-related concerns.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-md">
              <CardHeader className="pb-2">
                <div className="mb-2 rounded-full bg-red-100 p-2 text-red-600 dark:bg-red-950 dark:text-red-300 w-fit">
                  <Users className="h-6 w-6" />
                </div>
                <CardTitle>Multicultural Perspective</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  I approach counseling from a multicultural perspective that recognizes the importance of cultural
                  identity, social context, and systemic factors in shaping individuals' experiences and mental health.
                  Cultural humility is central to my practice.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Counseling Process */}
      <section className="bg-muted py-16 md:py-24">
        <div className="container">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight md:text-4xl">Counseling Process</h2>
          <div className="mx-auto grid max-w-4xl gap-8">
            <Card className="overflow-hidden rounded-2xl">
              <CardHeader>
                <CardTitle>Assessment and Goal Setting</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-muted-foreground">
                  The counseling process begins with a thorough assessment to understand your concerns, strengths,
                  resources, and goals. This collaborative process helps us develop a shared understanding of your
                  situation and establish clear, meaningful goals for our work together.
                </p>
                <div className="rounded-lg bg-background p-4">
                  <h4 className="mb-2 font-medium">Assessment Areas:</h4>
                  <ul className="ml-6 list-disc space-y-1 text-muted-foreground">
                    <li>Current concerns and symptoms</li>
                    <li>Personal and family history</li>
                    <li>Cultural and social context</li>
                    <li>Strengths and resources</li>
                    <li>Previous counseling experiences</li>
                    <li>Goals and expectations</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden rounded-2xl">
              <CardHeader>
                <CardTitle>Intervention and Exploration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-muted-foreground">
                  Based on our assessment and goals, we will work together using evidence-based interventions tailored
                  to your unique needs and preferences. The counseling process involves both exploration of underlying
                  issues and practical strategies for change.
                </p>
                <div className="rounded-lg bg-background p-4">
                  <h4 className="mb-2 font-medium">Intervention Approaches:</h4>
                  <ul className="ml-6 list-disc space-y-1 text-muted-foreground">
                    <li>Cognitive restructuring and thought challenging</li>
                    <li>Mindfulness and relaxation techniques</li>
                    <li>Emotion regulation skills</li>
                    <li>Interpersonal effectiveness strategies</li>
                    <li>Trauma-informed interventions</li>
                    <li>Cultural identity exploration</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden rounded-2xl">
              <CardHeader>
                <CardTitle>Evaluation and Termination</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-muted-foreground">
                  Throughout the counseling process, we will regularly evaluate progress toward your goals and adjust
                  our approach as needed. Termination is a planned, collaborative process that includes consolidating
                  gains, planning for maintenance, and addressing any concerns about ending.
                </p>
                <div className="rounded-lg bg-background p-4">
                  <h4 className="mb-2 font-medium">Termination Process:</h4>
                  <ul className="ml-6 list-disc space-y-1 text-muted-foreground">
                    <li>Review of progress and goal achievement</li>
                    <li>Identification of ongoing growth areas</li>
                    <li>Development of relapse prevention strategies</li>
                    <li>Discussion of future support needs</li>
                    <li>Referrals to additional resources if needed</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Areas of Expertise */}
      <section className="py-16 md:py-24">
        <div className="container">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight md:text-4xl">Areas of Expertise</h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-6">
              <Card className="overflow-hidden rounded-2xl">
                <CardHeader>
                  <CardTitle>Anxiety and Stress Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Helping clients understand and manage anxiety, panic, worry, and stress-related concerns using
                    evidence-based approaches including cognitive-behavioral therapy, mindfulness, and relaxation
                    techniques.
                  </p>
                </CardContent>
              </Card>

              <Card className="overflow-hidden rounded-2xl">
                <CardHeader>
                  <CardTitle>Depression and Mood Disorders</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Supporting clients experiencing depression, persistent sadness, low motivation, or mood fluctuations
                    through cognitive restructuring, behavioral activation, and meaning-focused interventions.
                  </p>
                </CardContent>
              </Card>

              <Card className="overflow-hidden rounded-2xl">
                <CardHeader>
                  <CardTitle>Trauma Recovery</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Providing trauma-informed care for individuals who have experienced traumatic events, using
                    evidence-based approaches such as trauma-focused cognitive-behavioral therapy and EMDR.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="overflow-hidden rounded-2xl">
                <CardHeader>
                  <CardTitle>Multicultural Issues</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Addressing concerns related to cultural identity, acculturation, discrimination, and
                    intersectionality with cultural humility and awareness of systemic factors affecting mental health.
                  </p>
                </CardContent>
              </Card>

              <Card className="overflow-hidden rounded-2xl">
                <CardHeader>
                  <CardTitle>Life Transitions</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Supporting clients through significant life changes such as career transitions, relationship
                    changes, educational milestones, and other adjustments that can impact identity and wellbeing.
                  </p>
                </CardContent>
              </Card>

              <Card className="overflow-hidden rounded-2xl">
                <CardHeader>
                  <CardTitle>Professional Development</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Helping professionals in the helping fields navigate career challenges, prevent burnout, maintain
                    work-life balance, and develop their professional identity and effectiveness.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Ethical Practice */}
      <section className="bg-muted py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 flex justify-center">
              <div className="rounded-full bg-red-100 p-4 text-red-600 dark:bg-red-950 dark:text-red-300">
                <Shield className="h-8 w-8" />
              </div>
            </div>
            <h2 className="mb-6 text-3xl font-bold tracking-tight md:text-4xl">Ethical Practice</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                My counseling practice is guided by the ethical principles of the American Counseling Association and
                the American Psychological Association. I am committed to maintaining the highest standards of
                professional conduct, including:
              </p>
              <ul className="mx-auto mt-4 max-w-2xl list-disc space-y-2 text-left">
                <li>Respecting client autonomy and dignity</li>
                <li>Maintaining confidentiality and privacy</li>
                <li>Practicing within my areas of competence</li>
                <li>Providing informed consent</li>
                <li>Avoiding dual relationships and conflicts of interest</li>
                <li>Engaging in ongoing professional development</li>
                <li>Advocating for client welfare and social justice</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container">
          <div className="rounded-2xl bg-red-600 p-8 text-white shadow-lg md:p-12">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">Ready to Learn More?</h2>
              <p className="mb-8 text-lg text-red-100">
                While my current focus is on research, teaching, and supervision, I'm happy to discuss my counseling
                approach and provide referrals to qualified professionals.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg" variant="secondary">
                  <Link href="/contact">Contact Me</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="bg-transparent text-white hover:bg-red-700">
                  <Link href="/about">Back to About</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
