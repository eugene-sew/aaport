import Image from "next/image"
import Link from "next/link"
import { ArrowRight, BookOpen, Users, GraduationCap, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import BlobBackground from "@/components/blob-background"

// This would be fetched from Supabase in a real implementation
const courses = [
  {
    id: 1,
    title: "Counseling Theories and Techniques",
    code: "CEP 864",
    level: "Graduate",
    institution: "Michigan State University",
    description:
      "A comprehensive exploration of major counseling theories and their application in practice. Students learn to develop their own theoretical orientation and apply evidence-based techniques.",
    topics: [
      "Person-Centered Therapy",
      "Cognitive-Behavioral Approaches",
      "Psychodynamic Theories",
      "Existential and Humanistic Approaches",
      "Multicultural Counseling Theories",
    ],
  },
  {
    id: 2,
    title: "Multicultural Counseling",
    code: "CEP 885",
    level: "Graduate",
    institution: "Michigan State University",
    description:
      "Examination of cultural factors that influence the counseling relationship and process. Focus on developing cultural competence and applying culturally responsive interventions.",
    topics: [
      "Cultural Identity Development",
      "Privilege and Oppression",
      "Culturally Responsive Counseling Skills",
      "Social Justice Advocacy",
      "Working with Specific Populations",
    ],
  },
  {
    id: 3,
    title: "Clinical Supervision in Counseling",
    code: "CEP 968",
    level: "Doctoral",
    institution: "Michigan State University",
    description:
      "Theory and practice of clinical supervision in counseling. Students develop supervision skills through didactic instruction, role-playing, and supervised experience.",
    topics: [
      "Supervision Models and Theories",
      "Supervisory Relationship",
      "Ethical and Legal Issues",
      "Multicultural Supervision",
      "Evaluation and Feedback",
    ],
  },
  {
    id: 4,
    title: "Practicum in Counseling",
    code: "CEP 893",
    level: "Graduate",
    institution: "Michigan State University",
    description:
      "Supervised counseling experience with clients. Students apply counseling theories and techniques under close supervision.",
    topics: [
      "Intake Assessment",
      "Treatment Planning",
      "Counseling Interventions",
      "Case Conceptualization",
      "Professional Development",
    ],
  },
]

const teachingPhilosophy = [
  {
    title: "Student-Centered Learning",
    description:
      "I believe in creating a learning environment that respects students' diverse backgrounds, learning styles, and professional goals. My teaching approach emphasizes active engagement, critical thinking, and practical application.",
    icon: <Users className="h-6 w-6" />,
  },
  {
    title: "Integration of Theory and Practice",
    description:
      "I strive to bridge the gap between theoretical knowledge and practical application by incorporating case studies, role-plays, and experiential activities that allow students to apply concepts in realistic scenarios.",
    icon: <BookOpen className="h-6 w-6" />,
  },
  {
    title: "Multicultural Competence",
    description:
      "I infuse multicultural awareness throughout my teaching, helping students develop the knowledge, skills, and attitudes needed to work effectively with diverse clients. This includes critical examination of power, privilege, and social justice issues.",
    icon: <Award className="h-6 w-6" />,
  },
  {
    title: "Reflective Practice",
    description:
      "I encourage students to develop as reflective practitioners who continuously examine their assumptions, biases, and effectiveness. Regular self-assessment and peer feedback are integral components of my courses.",
    icon: <GraduationCap className="h-6 w-6" />,
  },
]

export default function TeachingPage() {
  return (
    <div className="relative">
      <BlobBackground />

      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">Teaching</h1>
            <p className="mb-8 text-lg text-muted-foreground">
              As an educator in counselor education and supervision, I am committed to preparing the next generation of
              counselors to provide ethical, culturally responsive, and effective services to diverse clients.
            </p>
          </div>
        </div>
      </section>

      {/* Teaching Philosophy */}
      <section className="py-12 md:py-16">
        <div className="container">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight md:text-4xl">Teaching Philosophy</h2>
          <div className="grid gap-8 md:grid-cols-2">
            {teachingPhilosophy.map((item, index) => (
              <Card key={index} className="overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-md">
                <CardHeader className="pb-2">
                  <div className="mb-2 rounded-full bg-red-100 p-2 text-red-600 dark:bg-red-950 dark:text-red-300 w-fit">
                    {item.icon}
                  </div>
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{item.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Courses */}
      <section className="bg-muted py-16 md:py-24">
        <div className="container">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight md:text-4xl">Courses Taught</h2>
          <div className="grid gap-8 md:grid-cols-2">
            {courses.map((course) => (
              <Card key={course.id} className="overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-md">
                <CardHeader>
                  <div className="mb-2 flex items-center gap-2">
                    <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-600 dark:bg-red-950 dark:text-red-300">
                      {course.code}
                    </span>
                    <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-600 dark:bg-red-950 dark:text-red-300">
                      {course.level}
                    </span>
                  </div>
                  <CardTitle>{course.title}</CardTitle>
                  <CardDescription>{course.institution}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-muted-foreground">{course.description}</p>
                  <div className="rounded-lg bg-background p-4">
                    <h4 className="mb-2 font-medium">Key Topics:</h4>
                    <ul className="ml-6 list-disc space-y-1 text-muted-foreground">
                      {course.topics.map((topic, index) => (
                        <li key={index}>{topic}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/teaching/courses/${course.id}`} className="flex items-center">
                      View Syllabus
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Teaching Approach */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="mb-6 text-3xl font-bold tracking-tight md:text-4xl">Teaching Approach</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  My teaching is informed by adult learning theory, constructivist approaches, and multicultural
                  education principles. I create learning environments that are collaborative, respectful, and
                  intellectually stimulating.
                </p>
                <p>
                  In the classroom, I utilize a variety of teaching methods including lecture, discussion, case studies,
                  role-plays, multimedia presentations, and experiential activities. This multimodal approach
                  accommodates diverse learning styles and promotes deep engagement with the material.
                </p>
                <p>
                  I view assessment as an integral part of the learning process. My courses include both formative and
                  summative assessments that evaluate students' knowledge, skills, and professional dispositions. I
                  provide timely, specific feedback to support students' growth and development.
                </p>
              </div>
            </div>
            <div className="relative aspect-video overflow-hidden rounded-2xl">
              <Image
                src="/placeholder.svg?height=400&width=600&text=Teaching%20in%20Action"
                alt="Teaching in Action"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Student Mentoring */}
      <section className="bg-muted py-16 md:py-24">
        <div className="container">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight md:text-4xl">Student Mentoring</h2>
          <div className="mx-auto grid max-w-4xl gap-8">
            <Card className="overflow-hidden rounded-2xl">
              <CardHeader>
                <CardTitle>Doctoral Dissertation Committees</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-muted-foreground">
                  I serve as chair or member on doctoral dissertation committees for students researching topics related
                  to counselor education, supervision, multicultural counseling, and social justice advocacy.
                </p>
                <div className="rounded-lg bg-background p-4">
                  <h4 className="mb-2 font-medium">Recent Dissertation Topics:</h4>
                  <ul className="ml-6 list-disc space-y-1 text-muted-foreground">
                    <li>The Experiences of International Students in Counselor Education Programs</li>
                    <li>Supervision Approaches for Counselors Working with Trauma Survivors</li>
                    <li>Social Justice Advocacy Training in Counselor Education</li>
                    <li>Multicultural Competence Development in Counseling Students</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden rounded-2xl">
              <CardHeader>
                <CardTitle>Research Mentorship</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-muted-foreground">
                  I mentor master's and doctoral students in developing research skills, preparing conference
                  presentations, and publishing scholarly work. My goal is to help students become independent
                  researchers who contribute meaningfully to the counseling literature.
                </p>
                <div className="rounded-lg bg-background p-4">
                  <h4 className="mb-2 font-medium">Mentorship Activities:</h4>
                  <ul className="ml-6 list-disc space-y-1 text-muted-foreground">
                    <li>Research design and methodology consultation</li>
                    <li>Manuscript preparation and submission guidance</li>
                    <li>Conference proposal development</li>
                    <li>Collaborative research projects</li>
                    <li>Grant writing support</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden rounded-2xl">
              <CardHeader>
                <CardTitle>Professional Development Advising</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-muted-foreground">
                  I provide guidance to students on professional development, career planning, and navigating the
                  academic and clinical job markets. This includes CV/resume review, interview preparation, and
                  networking strategies.
                </p>
                <div className="rounded-lg bg-background p-4">
                  <h4 className="mb-2 font-medium">Student Achievements:</h4>
                  <ul className="ml-6 list-disc space-y-1 text-muted-foreground">
                    <li>Faculty positions at counselor education programs</li>
                    <li>Clinical leadership roles in community mental health</li>
                    <li>Research fellowships and grants</li>
                    <li>Professional association leadership positions</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container">
          <div className="rounded-2xl bg-red-600 p-8 text-white shadow-lg md:p-12">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">Interested in Collaboration?</h2>
              <p className="mb-8 text-lg text-red-100">
                I welcome opportunities to collaborate on teaching initiatives, curriculum development, and educational
                research projects.
              </p>
              <Button asChild size="lg" variant="secondary">
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
