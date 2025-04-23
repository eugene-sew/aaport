import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

// This would be fetched from Supabase in a real implementation
const blogPosts = [
  {
    id: 1,
    title: "Exploring the Intersection of Counseling and Social Justice",
    excerpt:
      "Reflections on how counseling practices can promote equity and address systemic barriers to mental health care access.",
    date: "April 15, 2023",
    category: "diaries",
    image: "/placeholder.svg?height=250&width=500&text=Blog%20Image%201",
  },
  {
    id: 2,
    title: "The Role of Supervision in Counselor Development",
    excerpt:
      "Examining how effective supervision contributes to the professional growth and competence of counselors-in-training.",
    date: "March 22, 2023",
    category: "diaries",
    image: "/placeholder.svg?height=250&width=500&text=Blog%20Image%202",
  },
  {
    id: 3,
    title: "Mindfulness Practices for Mental Health Professionals",
    excerpt:
      "Strategies for incorporating mindfulness into clinical practice and preventing burnout in the helping professions.",
    date: "February 10, 2023",
    category: "diaries",
    image: "/placeholder.svg?height=250&width=500&text=Blog%20Image%203",
  },
  {
    id: 4,
    title:
      "The courage to be vulnerable is not about winning or losing, it's about the courage to show up when you can't predict or control the outcome.",
    excerpt: "Brené Brown",
    date: "April 5, 2023",
    category: "quotes",
    image: "/placeholder.svg?height=250&width=500&text=Quote%201",
  },
  {
    id: 5,
    title:
      "Between stimulus and response there is a space. In that space is our power to choose our response. In our response lies our growth and our freedom.",
    excerpt: "Viktor E. Frankl",
    date: "March 18, 2023",
    category: "quotes",
    image: "/placeholder.svg?height=250&width=500&text=Quote%202",
  },
  {
    id: 6,
    title: "You don't have to see the whole staircase, just take the first step.",
    excerpt: "Martin Luther King Jr.",
    date: "February 28, 2023",
    category: "quotes",
    image: "/placeholder.svg?height=250&width=500&text=Quote%203",
  },
]

export default function BlogPage() {
  const diaries = blogPosts.filter((post) => post.category === "diaries")
  const quotes = blogPosts.filter((post) => post.category === "quotes")

  return (
    <div className="container py-12 md:py-16">
      <div className="mb-12 space-y-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Blog</h1>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          Insights, reflections, and inspirational content on counseling psychology, mental health, and professional
          development.
        </p>
      </div>

      <Tabs defaultValue="all" className="mb-12">
        <div className="flex justify-center">
          <TabsList>
            <TabsTrigger value="all">All Posts</TabsTrigger>
            <TabsTrigger value="diaries">Diaries</TabsTrigger>
            <TabsTrigger value="quotes">Quotes</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all" className="mt-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="diaries" className="mt-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {diaries.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="quotes" className="mt-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {quotes.map((post) => (
              <QuoteCard key={post.id} post={post} />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-12 flex justify-center">
        <Button variant="outline" size="lg">
          Load More
        </Button>
      </div>
    </div>
  )
}

interface Post {
  id: number
  title: string
  excerpt: string
  date: string
  category: string
  image: string
}

function BlogCard({ post }: { post: Post }) {
  return (
    <Card className="overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-md">
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
            {post.category === "diaries" ? "Diary" : "Quote"}
          </span>
        </div>
        <CardTitle className="line-clamp-2">{post.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
      </CardContent>
      <CardFooter>
        <Link
          href={`/blog/${post.category}/${post.id}`}
          className="inline-flex items-center text-sm font-medium text-red-600 transition-colors hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
        >
          Read More
          <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </CardFooter>
    </Card>
  )
}

function QuoteCard({ post }: { post: Post }) {
  return (
    <Card className="overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-md">
      <CardHeader>
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm text-muted-foreground">{post.date}</span>
          <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-600 dark:bg-red-950 dark:text-red-300">
            Quote
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 text-4xl text-red-600">"</div>
        <p className="mb-4 text-lg font-medium italic">{post.title}</p>
        <p className="text-right text-sm font-medium">— {post.excerpt}</p>
      </CardContent>
      <CardFooter>
        <Link
          href={`/blog/quotes/${post.id}`}
          className="inline-flex items-center text-sm font-medium text-red-600 transition-colors hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
        >
          Share
          <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </CardFooter>
    </Card>
  )
}
