import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

// This would be fetched from Supabase in a real implementation
const diaryPosts = [
  {
    id: 1,
    title: "Exploring the Intersection of Counseling and Social Justice",
    excerpt:
      "Reflections on how counseling practices can promote equity and address systemic barriers to mental health care access.",
    date: "April 15, 2023",
    image: "/placeholder.svg?height=250&width=500&text=Blog%20Image%201",
  },
  {
    id: 2,
    title: "The Role of Supervision in Counselor Development",
    excerpt:
      "Examining how effective supervision contributes to the professional growth and competence of counselors-in-training.",
    date: "March 22, 2023",
    image: "/placeholder.svg?height=250&width=500&text=Blog%20Image%202",
  },
  {
    id: 3,
    title: "Mindfulness Practices for Mental Health Professionals",
    excerpt:
      "Strategies for incorporating mindfulness into clinical practice and preventing burnout in the helping professions.",
    date: "February 10, 2023",
    image: "/placeholder.svg?height=250&width=500&text=Blog%20Image%203",
  },
  {
    id: 4,
    title: "Cultural Humility: A Journey, Not a Destination",
    excerpt:
      "Personal reflections on the ongoing process of developing cultural humility in counseling practice and education.",
    date: "January 18, 2023",
    image: "/placeholder.svg?height=250&width=500&text=Blog%20Image%204",
  },
  {
    id: 5,
    title: "Navigating Ethical Dilemmas in Counselor Education",
    excerpt:
      "Thoughts on addressing complex ethical situations that arise in the training and supervision of counseling students.",
    date: "December 5, 2022",
    image: "/placeholder.svg?height=250&width=500&text=Blog%20Image%205",
  },
  {
    id: 6,
    title: "The Power of Narrative in Counseling and Healing",
    excerpt:
      "Exploring how storytelling and narrative approaches can facilitate healing and meaning-making in the counseling process.",
    date: "November 12, 2022",
    image: "/placeholder.svg?height=250&width=500&text=Blog%20Image%206",
  },
]

export default function DiariesPage() {
  return (
    <div className="container py-12 md:py-16">
      <div className="mb-12 space-y-4">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Diaries</h1>
        <p className="max-w-3xl text-muted-foreground">
          Welcome to my professional diary, where I share reflections, insights, and thoughts on counseling psychology,
          education, supervision, and professional development.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {diaryPosts.map((post) => (
          <Card key={post.id} className="overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-md">
            <div className="aspect-video overflow-hidden">
              <Image
                src={post.image || "/placeholder.svg"}
                alt={post.title}
                width={500}
                height={250}
                className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            <CardHeader>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{post.date}</span>
                <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-600 dark:bg-red-950 dark:text-red-300">
                  Diary
                </span>
              </div>
              <CardTitle className="line-clamp-2">{post.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
            </CardContent>
            <CardFooter>
              <Link
                href={`/blog/diaries/${post.id}`}
                className="inline-flex items-center text-sm font-medium text-red-600 transition-colors hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
              >
                Read More
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <Button variant="outline" size="lg">
          Load More
        </Button>
      </div>

      <div className="mt-16 flex justify-center">
        <Button asChild variant="outline">
          <Link href="/blog">Back to Blog</Link>
        </Button>
      </div>
    </div>
  )
}
