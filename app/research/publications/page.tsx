import Link from "next/link"
import { ExternalLink, FileText, BookOpen, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// This would be fetched from Supabase in a real implementation
const publications = [
  {
    id: 1,
    title: "The Impact of Multicultural Supervision on Counselor Development",
    journal: "Journal of Counseling Psychology",
    year: 2023,
    authors: "Ayub, A., Smith, J., & Johnson, K.",
    abstract:
      "This study examines the effects of multicultural supervision approaches on the development of cultural competence in counselors-in-training.",
    doi: "10.1234/jcp.2023.001",
    type: "article",
  },
  {
    id: 2,
    title: "Integrating Social Justice Advocacy in Counselor Education Programs",
    journal: "Counselor Education and Supervision",
    year: 2022,
    authors: "Ayub, A., & Williams, T.",
    abstract:
      "This paper presents a framework for incorporating social justice advocacy training into counselor education curricula.",
    doi: "10.1234/ces.2022.002",
    type: "article",
  },
  {
    id: 3,
    title: "Ethical Considerations in Cross-Cultural Counseling Supervision",
    publisher: "Routledge",
    year: 2021,
    editors: "Johnson, M., & Davis, L.",
    authors: "Ayub, A.",
    abstract:
      "This chapter explores ethical dilemmas and best practices in providing supervision across cultural differences.",
    type: "book-chapter",
  },
  {
    id: 4,
    title: "Mindfulness-Based Interventions for Counselor Self-Care",
    publisher: "Oxford University Press",
    year: 2020,
    editors: "Brown, S., & Garcia, R.",
    authors: "Ayub, A., & Thompson, P.",
    abstract:
      "This chapter presents evidence-based mindfulness practices for preventing burnout among counseling professionals.",
    type: "book-chapter",
  },
  {
    id: 5,
    title: "Supervision Models for Trauma-Informed Counseling Practice",
    conference: "American Counseling Association Annual Conference",
    location: "San Diego, CA",
    year: 2023,
    authors: "Ayub, A., Johnson, K., & Smith, J.",
    abstract:
      "This presentation outlined a framework for providing supervision that supports counselors working with trauma survivors.",
    type: "presentation",
  },
  {
    id: 6,
    title: "Cultural Humility in Counselor Education: A Phenomenological Study",
    conference: "Association for Counselor Education and Supervision Conference",
    location: "Chicago, IL",
    year: 2022,
    authors: "Ayub, A.",
    abstract:
      "This study explored the lived experiences of counselor educators implementing cultural humility in their teaching practices.",
    type: "presentation",
  },
]

export default function PublicationsPage() {
  const articles = publications.filter((pub) => pub.type === "article")
  const bookChapters = publications.filter((pub) => pub.type === "book-chapter")
  const presentations = publications.filter((pub) => pub.type === "presentation")

  return (
    <div className="container py-12 md:py-16">
      <div className="mb-12 space-y-4">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Publications</h1>
        <p className="max-w-3xl text-muted-foreground">
          My research focuses on counselor education, supervision methodologies, multicultural competence, and social
          justice advocacy in counseling psychology.
        </p>
      </div>

      <Tabs defaultValue="all" className="mb-12">
        <TabsList className="mb-8">
          <TabsTrigger value="all">All Publications</TabsTrigger>
          <TabsTrigger value="articles">Journal Articles</TabsTrigger>
          <TabsTrigger value="chapters">Book Chapters</TabsTrigger>
          <TabsTrigger value="presentations">Conference Presentations</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="grid gap-6">
            {publications.map((pub) => (
              <PublicationCard key={pub.id} publication={pub} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="articles">
          <div className="grid gap-6">
            {articles.map((pub) => (
              <PublicationCard key={pub.id} publication={pub} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="chapters">
          <div className="grid gap-6">
            {bookChapters.map((pub) => (
              <PublicationCard key={pub.id} publication={pub} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="presentations">
          <div className="grid gap-6">
            {presentations.map((pub) => (
              <PublicationCard key={pub.id} publication={pub} />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-12 flex justify-center">
        <Button asChild variant="outline">
          <Link
            href="https://scholar.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center"
          >
            View on Google Scholar
            <ExternalLink className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}

interface Publication {
  id: number
  title: string
  abstract: string
  authors: string
  year: number
  type: string
  journal?: string
  doi?: string
  publisher?: string
  editors?: string
  conference?: string
  location?: string
}

function PublicationCard({ publication }: { publication: Publication }) {
  const getIcon = (type: string) => {
    switch (type) {
      case "article":
        return <FileText className="h-5 w-5" />
      case "book-chapter":
        return <BookOpen className="h-5 w-5" />
      case "presentation":
        return <Users className="h-5 w-5" />
      default:
        return <FileText className="h-5 w-5" />
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "article":
        return "Journal Article"
      case "book-chapter":
        return "Book Chapter"
      case "presentation":
        return "Conference Presentation"
      default:
        return "Publication"
    }
  }

  return (
    <Card className="overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-md">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <div className="mt-1 rounded-full bg-red-100 p-2 text-red-600 dark:bg-red-950 dark:text-red-300">
              {getIcon(publication.type)}
            </div>
            <div>
              <div className="mb-1 flex items-center space-x-2">
                <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-600 dark:bg-red-950 dark:text-red-300">
                  {getTypeLabel(publication.type)}
                </span>
                <span className="text-sm text-muted-foreground">{publication.year}</span>
              </div>
              <CardTitle className="text-xl">{publication.title}</CardTitle>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 space-y-2">
          <div>
            <span className="font-medium">Authors: </span>
            <span>{publication.authors}</span>
          </div>

          {publication.journal && (
            <div>
              <span className="font-medium">Journal: </span>
              <span>{publication.journal}</span>
            </div>
          )}

          {publication.publisher && (
            <div>
              <span className="font-medium">Publisher: </span>
              <span>{publication.publisher}</span>
            </div>
          )}

          {publication.editors && (
            <div>
              <span className="font-medium">In: </span>
              <span>{publication.editors} (Eds.)</span>
            </div>
          )}

          {publication.conference && (
            <div>
              <span className="font-medium">Conference: </span>
              <span>{publication.conference}</span>
            </div>
          )}

          {publication.location && (
            <div>
              <span className="font-medium">Location: </span>
              <span>{publication.location}</span>
            </div>
          )}
        </div>

        <CardDescription>
          <span className="font-medium">Abstract: </span>
          {publication.abstract}
        </CardDescription>
      </CardContent>
      <CardFooter>
        {publication.doi ? (
          <Button asChild variant="outline" size="sm">
            <Link
              href={`https://doi.org/${publication.doi}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center"
            >
              View Publication
              <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        ) : (
          <Button asChild variant="outline" size="sm">
            <Link href={`/research/publications/${publication.id}`} className="flex items-center">
              View Details
              <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
