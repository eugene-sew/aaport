import Link from "next/link"
import { ExternalLink, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

// This would be fetched from Supabase in a real implementation
const bookChapters = [
  {
    id: 1,
    title: "Ethical Considerations in Cross-Cultural Counseling Supervision",
    book: "Handbook of Multicultural Counseling Supervision",
    publisher: "Routledge",
    year: 2021,
    editors: "Johnson, M., & Davis, L.",
    authors: "Ayub, A.",
    abstract:
      "This chapter explores ethical dilemmas and best practices in providing supervision across cultural differences. It addresses power dynamics, cultural biases, and strategies for creating a culturally responsive supervisory relationship.",
    pages: "127-145",
    isbn: "978-1234567890",
  },
  {
    id: 2,
    title: "Mindfulness-Based Interventions for Counselor Self-Care",
    book: "Wellness and Self-Care for Mental Health Professionals",
    publisher: "Oxford University Press",
    year: 2020,
    editors: "Brown, S., & Garcia, R.",
    authors: "Ayub, A., & Thompson, P.",
    abstract:
      "This chapter presents evidence-based mindfulness practices for preventing burnout among counseling professionals. It includes practical exercises, case examples, and research supporting the efficacy of mindfulness for professional self-care.",
    pages: "89-112",
    isbn: "978-0987654321",
  },
  {
    id: 3,
    title: "Social Justice Advocacy in Counselor Education: A Transformative Learning Approach",
    book: "Counseling for Social Justice",
    publisher: "American Counseling Association Press",
    year: 2019,
    editors: "Martinez, R., & Wilson, J.",
    authors: "Ayub, A., Williams, T., & Johnson, K.",
    abstract:
      "This chapter presents a framework for integrating social justice advocacy training into counselor education programs using transformative learning theory. It includes curriculum examples, teaching strategies, and assessment methods.",
    pages: "203-228",
    isbn: "978-1122334455",
  },
  {
    id: 4,
    title: "Trauma-Informed Supervision: Supporting Counselors Working with Survivors",
    book: "Clinical Supervision in the Helping Professions",
    publisher: "Springer",
    year: 2018,
    editors: "Anderson, H., & Taylor, S.",
    authors: "Ayub, A.",
    abstract:
      "This chapter outlines principles and practices for providing supervision to counselors working with trauma survivors. It addresses vicarious traumatization, self-care strategies, and supervision interventions that support effective trauma treatment.",
    pages: "156-179",
    isbn: "978-9988776655",
  },
  {
    id: 5,
    title: "Integrating Technology in Counselor Supervision: Ethical and Practical Considerations",
    book: "Technology in Counseling and Psychotherapy",
    publisher: "Wiley",
    year: 2017,
    editors: "Roberts, L., & Chen, D.",
    authors: "Ayub, A., & Smith, J.",
    abstract:
      "This chapter examines the use of technology in clinical supervision, including videoconferencing, recording sessions, and electronic record-keeping. It addresses confidentiality concerns, technological competence, and best practices for distance supervision.",
    pages: "211-234",
    isbn: "978-5566778899",
  },
]

export default function BookChaptersPage() {
  return (
    <div className="container py-12 md:py-16">
      <div className="mb-12 space-y-4">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Book Chapters</h1>
        <p className="max-w-3xl text-muted-foreground">
          I have contributed chapters to several edited volumes on counseling psychology, supervision, and multicultural
          competence. These publications reflect my commitment to advancing knowledge in the field through scholarly
          writing.
        </p>
      </div>

      <div className="grid gap-6">
        {bookChapters.map((chapter) => (
          <Card key={chapter.id} className="overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-md">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="mt-1 rounded-full bg-red-100 p-2 text-red-600 dark:bg-red-950 dark:text-red-300">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="mb-1 flex items-center space-x-2">
                      <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-600 dark:bg-red-950 dark:text-red-300">
                        Book Chapter
                      </span>
                      <span className="text-sm text-muted-foreground">{chapter.year}</span>
                    </div>
                    <CardTitle className="text-xl">{chapter.title}</CardTitle>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4 space-y-2">
                <div>
                  <span className="font-medium">In: </span>
                  <span>
                    {chapter.book} ({chapter.pages})
                  </span>
                </div>
                <div>
                  <span className="font-medium">Editors: </span>
                  <span>{chapter.editors}</span>
                </div>
                <div>
                  <span className="font-medium">Authors: </span>
                  <span>{chapter.authors}</span>
                </div>
                <div>
                  <span className="font-medium">Publisher: </span>
                  <span>{chapter.publisher}</span>
                </div>
                <div>
                  <span className="font-medium">ISBN: </span>
                  <span>{chapter.isbn}</span>
                </div>
              </div>

              <CardDescription>
                <span className="font-medium">Abstract: </span>
                {chapter.abstract}
              </CardDescription>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" size="sm">
                <Link href={`/research/book-chapters/${chapter.id}`} className="flex items-center">
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
