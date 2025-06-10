'use client';

import { useState, useEffect, useCallback } from 'react';
import { useContent, ContentType } from '@/hooks/useContent';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, BookOpen, GraduationCap, Users } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface ContentMetrics {
  total: number;
  published: number;
  draft: number;
  byCategory: { category: string; count: number }[];
}

export default function DashboardPage() {
  const { getContentMetrics, loading } = useContent();
  const [activeTab, setActiveTab] = useState<ContentType>('blog');
  const [metrics, setMetrics] = useState<ContentMetrics>({
    total: 0,
    published: 0,
    draft: 0,
    byCategory: [],
  });
  const [isLoading, setIsLoading] = useState(false);

  // Fetch metrics only once on component mount
  useEffect(() => {
    const fetchInitialMetrics = async () => {
      setIsLoading(true);
      try {
        const data = await getContentMetrics('blog'); // Default tab
        setMetrics(data);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialMetrics();
    // Empty dependency array ensures this only runs once on mount
  }, []);

  // Handle tab changes without refetching data
  const handleTabChange = async (value: ContentType) => {
    setActiveTab(value);
    
    // Only fetch new data if we're changing tabs and not already loading
    if (!isLoading) {
      setIsLoading(true);
      try {
        const data = await getContentMetrics(value);
        setMetrics(data);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Chart data for content status
  const statusChartData = {
    labels: ['Published', 'Draft'],
    datasets: [
      {
        data: [metrics.published, metrics.draft],
        backgroundColor: ['#10B981', '#F59E0B'],
        borderColor: ['#059669', '#D97706'],
        borderWidth: 1,
      },
    ],
  };

  // Chart data for categories
  const categoryChartData = {
    labels: metrics.byCategory.map((item) => item.category),
    datasets: [
      {
        label: 'Content Count',
        data: metrics.byCategory.map((item) => item.count),
        backgroundColor: [
          'rgba(53, 162, 235, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(255, 99, 132, 0.5)',
          'rgba(255, 159, 64, 0.5)',
          'rgba(153, 102, 255, 0.5)',
        ],
        borderColor: [
          'rgb(53, 162, 235)',
          'rgb(75, 192, 192)',
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(153, 102, 255)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your content and performance.
        </p>
      </div>

      <Tabs
        defaultValue="blog"
        value={activeTab}
        onValueChange={(value) => handleTabChange(value as ContentType)}
        className="space-y-4"
      >
        <TabsList>
          <TabsTrigger value="blog" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Blog
          </TabsTrigger>
          <TabsTrigger value="research" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Research
          </TabsTrigger>
          <TabsTrigger value="teaching" className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4" />
            Teaching
          </TabsTrigger>
          <TabsTrigger value="leadership" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Leadership
          </TabsTrigger>
        </TabsList>

        {['blog', 'research', 'teaching', 'leadership'].map((type) => (
          <TabsContent key={type} value={type} className="space-y-4">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-gray-100"></div>
              </div>
            ) : (
              <>
                <div className="grid gap-4 md:grid-cols-3">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Total Content
                      </CardTitle>
                      <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{metrics.total}</div>
                      <p className="text-xs text-muted-foreground">
                        All {type} content items
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Published
                      </CardTitle>
                      <FileText className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {metrics.published}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {((metrics.published / metrics.total) * 100 || 0).toFixed(1)}% of total content
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Drafts
                      </CardTitle>
                      <FileText className="h-4 w-4 text-amber-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{metrics.draft}</div>
                      <p className="text-xs text-muted-foreground">
                        {((metrics.draft / metrics.total) * 100 || 0).toFixed(1)}% of total content
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Content Status</CardTitle>
                      <CardDescription>
                        Distribution of published vs draft content
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex justify-center">
                      <div className="h-80 w-80">
                        <Doughnut
                          data={statusChartData}
                          options={{
                            responsive: true,
                            plugins: {
                              legend: {
                                position: 'bottom',
                              },
                            },
                          }}
                        />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Content by Category</CardTitle>
                      <CardDescription>
                        Distribution across categories
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {metrics.byCategory.length > 0 ? (
                        <Bar
                          data={categoryChartData}
                          options={{
                            responsive: true,
                            plugins: {
                              legend: {
                                display: false,
                              },
                            },
                          }}
                        />
                      ) : (
                        <div className="flex justify-center items-center h-64 text-muted-foreground">
                          No categories found
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
