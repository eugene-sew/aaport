import Link from "next/link"
import { ExternalLink, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

// This would be fetched from Supabase in a real implementation
const presentations = [
  {
    id: 1,
    title: "Supervision Models for Trauma-Informed Counseling Practice",
    conference: "American Counseling Association Annual Conference",
    location: "San Diego, CA",
    date: "April 15-18, 2023",
    type: "Paper Presentation",
    authors: "Ayub, A., Johnson, K., & Smith, J.",
    abstract:
      "This presentation outlined a framework for providing supervision that supports counselors working with trauma survivors. It addressed vicarious traumatization, self-care strategies, and supervision interventions that promote effective trauma treatment while preventing counselor burnout.",
  },
  {
    id: 2,
    title: "Cultural Humility in Counselor Education: A Phenomenological Study",
    conference: "Association for Counselor Education and Supervision Conference",
    location: "Chicago, IL",
    date: "October 5-8, 2022",
    type: "Research Symposium",
    authors: "Ayub, A.",
    abstract:
      "This study explored the lived experiences of counselor educators implementing cultural humility in their teaching practices. Using phenomenological methodology, the research identified key themes in how faculty conceptualize, model, and teach cultural humility to counseling students.",
  },
  {
    id: 3,
    title: "Integrating Social Justice Advocacy in Supervision: A Model for Practice",
    conference: "International Association for Counselling Conference",
    location: "Rome, Italy",
    date: "May 22-25, 2022",
    type: "Workshop",
    authors: "Ayub, A., & Williams, T.",
    abstract:
      "This workshop presented a model for integrating social justice advocacy into clinical supervision. Participants engaged in experiential activities designed to enhance their ability to address power, privilege, and oppression in the supervisory relationship and to support supervisees in developing advocacy competencies.",
  },
  {
    id: 4,
    title: "Mindfulness-Based Interventions for Counselor Self-Care: Evidence and Application",
    conference: "American Mental Health Counselors Association Conference",
    location: "Dallas, TX",
    date: "July 14-16, 2021",
    type: "Poster Presentation",
    authors: "Ayub, A., Thompson, P., & Garcia, R.",
    abstract:
      "This poster presented research on the efficacy of mindfulness-based interventions for counselor self-care. It included a review of empirical studies, a theoretical framework for understanding mindfulness in the context of counseling practice, and practical applications for counselor education and supervision.",
  },
  {
    id: 5,
    title: "Ethical Considerations in Cross-Cultural Supervision: Case Studies and Best Practices",
    conference: "North Central Association for Counselor Education and Supervision Conference",
    location: "Columbus, OH",
    date: "September 23-25, 2021",
    type: "Panel Discussion",
    authors: "Ayub, A., Johnson, K., Martinez, R., & Chen, D.",
    abstract:
      "This panel discussion examined ethical dilemmas that arise in cross-cultural supervision. Panelists presented case studies illustrating common challenges and facilitated a discussion of best practices for addressing cultural differences, power dynamics, and potential biases in the supervisory relationship.",
  },
  {
    id: 6,
    title: "Technology-Enhanced Supervision: Innovations and Ethical Considerations",
    conference: "Michigan Counseling Association Annual Conference",
    location: "Grand Rapids, MI",
    date: "November 4-6, 2020",
    type: "Educational Session",
    authors: "Ayub, A., & Smith, J.",
    abstract:
      "This presentation explored the use of technology in clinical supervision, including videoconferencing, recording platforms, and feedback tools. It addressed ethical considerations, practical implementation strategies, and research on the effectiveness of technology-enhanced supervision approaches.",
  },
]

export default function ConferencePresentationsPage() {
  return (
    <div className="container py-12 md:py-16">
      <div className="mb-12 space-y-4">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Conference Presentations</h1>
        <p className="max-w-3xl text-muted-foreground">
          I regularly present my research at national and international conferences in counseling psychology, counselor
          education, and supervision. These presentations reflect my ongoing scholarly work and commitment to
          contributing to the professional discourse.
        </p>
      </div>

      <div className="grid gap-6">
        {presentations.map((presentation) => (
          <Card
            key={presentation.id}
            className="overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-md"
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="mt-1 rounded-full bg-red-100 p-2 text-red-600 dark:bg-red-950 dark:text-red-300">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="mb-1 flex items-center space-x-2">
                      <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-600 dark:bg-red-950 dark:text-red-300">
                        {presentation.type}
                      </span>
                      <span className="text-sm text-muted-foreground">{presentation.date}</span>
                    </div>
                    <CardTitle className="text-xl">{presentation.title}</CardTitle>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4 space-y-2">
                <div>
                  <span className="font-medium">Conference: </span>
                  <span>{presentation.conference}</span>
                </div>
                <div>
                  <span className="font-medium">Location: </span>
                  <span>{presentation.location}</span>
                </div>
                <div>
                  <span className="font-medium">Presenters: </span>
                  <span>{presentation.authors}</span>
                </div>
              </div>

              <CardDescription>
                <span className="font-medium">Abstract: </span>
                {presentation.abstract}
              </CardDescription>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" size="sm">
                <Link href={`/research/conference-presentations/${presentation.id}`} className="flex items-center">
                  View Details
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <Button asChild variant="outline">
          <Link href="/research" className="flex items-center">
            Back to Research
          </Link>
        </Button>
      </div>
    </div>
  )
}
