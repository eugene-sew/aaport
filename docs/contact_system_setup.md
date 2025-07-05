      {/* Counseling Experience */}
      <section className="py-16 md:py-24 bg-slate-50" id="counseling">
        <div className="container">
          <h2 className="mb-8 text-center text-3xl font-bold tracking-tight md:text-4xl">
            Counseling Experience
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="rounded-xl shadow-md">
              <CardHeader className="pb-3">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-red-100">
                  <Briefcase className="h-6 w-6 text-red-600" />
                </div>
                <CardTitle>Mental Health Practice</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  As a licensed counseling psychologist in Ghana, Asmau has a
                  proven track record of assessing and treating mental health
                  issues, providing individual, group, and family therapy to
                  diverse populations, including marginalized communities.
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-xl shadow-md">
              <CardHeader className="pb-3">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-red-100">
                  <School className="h-6 w-6 text-red-600" />
                </div>
                <CardTitle>School Counseling</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  With experience in various educational settings, Asmau has
                  expertly guided students through academic, career, and
                  personal challenges, ensuring they receive holistic support
                  while promoting growth and resilience.
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-xl shadow-md">
              <CardHeader className="pb-3">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-red-100">
                  <Users className="h-6 w-6 text-red-600" />
                </div>
                <CardTitle>Community Engagement</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Her foundational work through the Rayuwa Foundation in Ghana
                  highlights her commitment to psychosocial and educational
                  support, empowering underserved populations and advocating for
                  improved mental health services among victims of domestic
                  abuse and violence.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>



     {/* Community Service */}
      <section className="bg-muted py-16 md:py-24">
        <div className="container">
          <h2 className="mb-8 text-center text-3xl font-bold tracking-tight md:text-4xl">
            Community Service
          </h2>
          <div className="mx-auto grid max-w-5xl gap-12">
            <Card className="overflow-hidden rounded-xl shadow-md">
              <div className="grid md:grid-cols-2">
                <div className="relative h-64 md:h-full">
                  <Image
                    src="/ru.jpg"
                    alt="Rayuwa Foundation community work"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <CardHeader>
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-red-100">
                      <Heart className="h-6 w-6 text-red-600" />
                    </div>
                    <CardTitle>Rayuwa Foundation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      As the Founder and Executive Director of Rayuwa
                      Foundation, Asmau leads programs targeting mental health
                      and educational support for marginalized groups in Ghana.
                      The foundation organizes outreach programs that promote
                      mental health education and empowerment, reaching
                      vulnerable populations, including women and children
                      affected by domestic violence.
                    </p>
                  </CardContent>
                </div>
              </div>
            </Card>

            <Card className="overflow-hidden rounded-xl shadow-md">
              <div className="grid md:grid-cols-2">
                <div className="order-1 md:order-2 relative h-64 md:h-full">
                  <Image
                    src="/mentorship pic.jpg"
                    alt="Academic leadership activities"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="order-2 md:order-1">
                  <CardHeader>
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-red-100">
                      <GraduationCap className="h-6 w-6 text-red-600" />
                    </div>
                    <CardTitle>Academic Leadership</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Asmau actively contributes to local and global communities
                      through various service initiatives as a student leader in
                      various campus RSOs. Her leadership extends to supervision
                      roles, where she fosters professional development among
                      aspiring counselors through mentoring and constructive
                      feedback.
                    </p>
                  </CardContent>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
