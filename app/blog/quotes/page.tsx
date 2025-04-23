import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

// This would be fetched from Supabase in a real implementation
const quotes = [
  {
    id: 1,
    quote:
      "The courage to be vulnerable is not about winning or losing, it's about the courage to show up when you can't predict or control the outcome.",
    author: "Brené Brown",
    date: "April 5, 2023",
  },
  {
    id: 2,
    quote:
      "Between stimulus and response there is a space. In that space is our power to choose our response. In our response lies our growth and our freedom.",
    author: "Viktor E. Frankl",
    date: "March 18, 2023",
  },
  {
    id: 3,
    quote: "You don't have to see the whole staircase, just take the first step.",
    author: "Martin Luther King Jr.",
    date: "February 28, 2023",
  },
  {
    id: 4,
    quote: "We don't see things as they are, we see them as we are.",
    author: "Anaïs Nin",
    date: "January 15, 2023",
  },
  {
    id: 5,
    quote: "The good life is a process, not a state of being. It is a direction, not a destination.",
    author: "Carl Rogers",
    date: "December 10, 2022",
  },
  {
    id: 6,
    quote: "The privilege of a lifetime is being who you are.",
    author: "Joseph Campbell",
    date: "November 22, 2022",
  },
  {
    id: 7,
    quote: "Owning our story and loving ourselves through that process is the bravest thing we'll ever do.",
    author: "Brené Brown",
    date: "October 8, 2022",
  },
  {
    id: 8,
    quote: "The most powerful relationship you will ever have is the relationship with yourself.",
    author: "Steve Maraboli",
    date: "September 14, 2022",
  },
  {
    id: 9,
    quote: "The wound is the place where the Light enters you.",
    author: "Rumi",
    date: "August 30, 2022",
  },
]

export default function QuotesPage() {
  return (
    <div className="container py-12 md:py-16">
      <div className="mb-12 space-y-4">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Inspirational Quotes</h1>
        <p className="max-w-3xl text-muted-foreground">
          A collection of quotes that inspire my work as a counselor, educator, and researcher. These words of wisdom
          remind us of the power of resilience, growth, and human connection.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {quotes.map((item) => (
          <Card key={item.id} className="overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-md">
            <CardHeader>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{item.date}</span>
                <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-600 dark:bg-red-950 dark:text-red-300">
                  Quote
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4 text-4xl text-red-600">"</div>
              <p className="mb-4 text-lg font-medium italic">{item.quote}</p>
              <p className="text-right text-sm font-medium">— {item.author}</p>
            </CardContent>
            <CardFooter>
              <Link
                href={`/blog/quotes/${item.id}`}
                className="inline-flex items-center text-sm font-medium text-red-600 transition-colors hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
              >
                Share
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
