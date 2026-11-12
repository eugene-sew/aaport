import { supabase } from "@/lib/supabase";
import { Award as AwardIcon, Calendar } from "lucide-react";
import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Re-fetch awards at most once a minute so admin edits show without a redeploy.
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Awards & Recognitions | Asmau Ayub",
  description:
    "A showcase of academic awards, leadership honors, and community recognitions received by Asmau Ayub.",
};

interface Award {
  id: string;
  title: string;
  category: string;
  year: number | null;
  is_visible: boolean;
}

async function getAwards() {
  const { data: awards, error } = await supabase
    .from("awards")
    .select("id, title, category, year, is_visible")
    .eq("is_visible", true)
    .order("year", { ascending: false });

  if (error) {
    console.error("Error fetching awards:", error);
    return [];
  }

  return awards;
}

export default async function AwardsPage() {
  const awards = await getAwards();

  const groupedAwards = awards.reduce(
    (acc: Record<string, Award[]>, award: Award) => {
      const { category } = award;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(award);
      return acc;
    },
    {} as Record<string, Award[]>
  );

  return (
    <div className="container mx-auto px-4 py-12 md:px-6 max-w-4xl">
      <header className="text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Recognitions and Contributions
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          A collection of my professional achievements and honors.
        </p>
      </header>

      {Object.keys(groupedAwards).length > 0 ? (
        <div className="space-y-16">
          {Object.entries(groupedAwards).map(([category, awards]) => (
            <section key={category}>
              <h2 className="text-2xl font-semibold mb-8 text-center sm:text-left">
                {category}
              </h2>
              <div className="relative border-l-2 border-primary/20 pl-6 space-y-10">
                <div className="absolute -left-[11px] top-0 h-5 w-5 rounded-full bg-primary" />
                {awards.map((award) => (
                  <div key={award.id} className="relative">
                    <div className="absolute -left-[31px] top-1 h-5 w-5 rounded-full bg-background border-2 border-primary" />
                    <p className="font-semibold text-lg text-primary">
                      {award.title}
                    </p>
                    {award.year && (
                      <time className="text-sm text-muted-foreground mt-1 block">
                        {award.year}
                      </time>
                    )}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-muted-foreground text-lg">
            No awards have been added yet. Please check back later.
          </p>
        </div>
      )}
    </div>
  );
}
