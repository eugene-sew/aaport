import { Heart, School, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BlobBackground from "@/components/blob-background";

export default function CounselingPage() {
  const services = [
    {
      icon: Heart,
      title: "Mental Health Practice",
      description:
        "As a licensed clinician, Asmau delivers culturally responsive, compassionate, and empowering care, supporting children, adults, and couples from diverse backgrounds through life transitions, identity challenges, and mental health struggles. Her counseling approach integrates evidence-based practices, including CBT and Islamic-informed CBT, person-centered therapy, trauma-informed care, and other creative modalities that tailor support to each client’s worldview and lived experiences. She specializes in working with transitioning young adults facing various experiences and developmental challenges. Her research on the lived experiences of neurodiverse individuals informs her practice, grounding it in principles of social justice, belonging, and the belief that healing begins when people feel truly seen and safe. Asmau is passionate about creating spaces where individuals can express themselves freely and find the support they need to thrive.",
    },
    {
      icon: School,
      title: "School Counseling",
      description:
        "As an educator with experience working in elementary, middle, high school, and college settings, Asmau has expertly guided students through academic, career, and personal challenges, ensuring they receive holistic support while promoting growth and resilience. Ensuring the next generation of leaders receives the needed guidance and mentorship.",
    },
    {
      icon: Users,
      title: "Community Engagement",
      description:
        "Asmau integrates mental health training into her community engagements with Rayuwa Foundation, a community nonprofit, collaborating with both local and international organizations to offer customized, community-informed care. This includes specialized support for clients, particularly victims of domestic violence and conflict.",
    },
  ];

  return (
    <div className="relative">
      <BlobBackground />

      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">Counseling Services</h1>
            <p className="mb-8 text-lg text-muted-foreground">
              Providing culturally responsive, compassionate, and empowering care to support individuals, couples, and communities.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="pb-16 md:pb-24">
        <div className="container">
          <div className="grid gap-8 lg:gap-12">
            {services.map((service, index) => (
              <Card key={index} className="overflow-hidden rounded-2xl shadow-sm transition-shadow hover:shadow-lg">
                <CardHeader className="flex flex-row items-start gap-4 space-y-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/50">
                    <service.icon className="h-6 w-6 text-red-600 dark:text-red-400" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-2xl">{service.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
