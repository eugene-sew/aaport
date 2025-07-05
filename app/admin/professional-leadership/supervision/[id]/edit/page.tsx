"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useProfessionalLeadershipTables } from "@/hooks/useProfessionalLeadershipTables";
import { useAuth } from "@/hooks/useAuth";
import { supervisionTypes } from "@/types/professional-leadership";

// UI Components
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

// Form handling
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Icons
import { ArrowLeft, CalendarIcon, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// Define form schema with validation
const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  supervisee_name: z.string().min(1, "Supervisee name is required"),
  organization: z.string().optional(),
  start_date: z.date().optional(),
  end_date: z.date().optional(),
  is_ongoing: z.boolean().default(false),
  description: z.string().optional(),
  supervision_type: z.string().min(1, "Supervision type is required"),
  hours: z.number().int().nonnegative().optional(),
  location: z.string().optional(),
  outcomes: z.string().optional(),
  is_featured: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

export default function EditSupervisionPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { user } = useAuth();
  const { useSupervision, useUpdateSupervision } = useProfessionalLeadershipTables();
  const { data: supervision, isLoading, error } = useSupervision(params.id);
  const updateSupervisionMutation = useUpdateSupervision();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      supervisee_name: "",
      organization: "",
      description: "",
      supervision_type: "",
      hours: undefined,
      location: "",
      outcomes: "",
      is_ongoing: false,
      is_featured: false,
    },
  });

  // Populate form when data is loaded
  useEffect(() => {
    if (supervision) {
      form.reset({
        title: supervision.title,
        supervisee_name: supervision.supervisee_name,
        organization: supervision.organization || "",
        start_date: supervision.start_date ? new Date(supervision.start_date) : undefined,
        end_date: supervision.end_date ? new Date(supervision.end_date) : undefined,
        is_ongoing: supervision.is_ongoing,
        description: supervision.description || "",
        supervision_type: supervision.supervision_type,
        hours: supervision.hours,
        location: supervision.location || "",
        outcomes: supervision.outcomes || "",
        is_featured: supervision.is_featured,
      });
    }
  }, [supervision, form]);

  const onSubmit = async (values: FormValues) => {
    if (!user?.id) {
      toast({
        title: "Error",
        description: "You must be logged in to update a supervision record.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await updateSupervisionMutation.mutateAsync({
        id: params.id,
        ...values,
        start_date: values.start_date ? values.start_date.toISOString() : undefined,
        end_date: values.end_date ? values.end_date.toISOString() : undefined,
        hours: values.hours || null,
      });

      toast({
        title: "Success",
        description: "Supervision record has been updated successfully.",
      });

      router.push("/admin/professional-leadership/supervision");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update supervision record.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Watch is_ongoing field to disable end_date when true
  const isOngoing = form.watch("is_ongoing");

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <Link
            href="/admin/professional-leadership/supervision"
            className="text-blue-500 hover:underline inline-flex items-center"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Supervision Records
          </Link>
          <h1 className="text-2xl font-bold mt-2">Error</h1>
        </div>
        <Card className="bg-destructive/10">
          <CardHeader>
            <CardTitle>Failed to load supervision record</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{error instanceof Error ? error.message : "Unknown error occurred"}</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" onClick={() => router.push("/admin/professional-leadership/supervision")}>
              Go Back
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/admin/professional-leadership/supervision"
          className="text-blue-500 hover:underline inline-flex items-center"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Supervision Records
        </Link>
        <h1 className="text-2xl font-bold mt-2">
          {isLoading ? (
            <Skeleton className="h-8 w-64" />
          ) : (
            `Edit Supervision: ${supervision?.title}`
          )}
        </h1>
        <p className="text-muted-foreground">
          Update the details of this supervision record.
        </p>
      </div>

      {isLoading ? (
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-64 mb-2" />
            <Skeleton className="h-4 w-full" />
          </CardHeader>
          <CardContent className="space-y-6">
            {Array(6).fill(0).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Supervision Details</CardTitle>
            <CardDescription>
              Update the details of your supervision or mentoring activity.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
                id="supervision-form"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title*</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Clinical Supervision for Graduate Student" {...field} />
                        </FormControl>
                        <FormDescription>
                          A descriptive title for this supervision activity.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="supervision_type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Supervision Type*</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select supervision type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {supervisionTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          The type of supervision or mentoring provided.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="supervisee_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Supervisee Name*</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., John Doe" {...field} />
                        </FormControl>
                        <FormDescription>
                          The name of the person being supervised.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="organization"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Organization</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., University of Example" {...field} />
                        </FormControl>
                        <FormDescription>
                          The organization where the supervision took place.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="start_date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Start Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={`w-full pl-3 text-left font-normal ${
                                  !field.value && "text-muted-foreground"
                                }`}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date > new Date() || date < new Date("1900-01-01")
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormDescription>
                          When the supervision began.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="is_ongoing"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Ongoing</FormLabel>
                            <FormDescription>
                              Is this supervision still ongoing?
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="end_date"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>End Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={`w-full pl-3 text-left font-normal ${
                                    !field.value && "text-muted-foreground"
                                  }`}
                                  disabled={isOngoing}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>
                                      {isOngoing ? "Ongoing" : "Pick a date"}
                                    </span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date > new Date() ||
                                  date < new Date("1900-01-01") ||
                                  (form.getValues("start_date") &&
                                    date < form.getValues("start_date"))
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormDescription>
                            When the supervision ended (if applicable).
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., New York, NY" {...field} />
                        </FormControl>
                        <FormDescription>
                          Where the supervision took place.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="hours"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hours</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="e.g., 40"
                            value={field.value === undefined ? "" : field.value}
                            onChange={(e) => {
                              const value = e.target.value;
                              field.onChange(value === "" ? undefined : parseInt(value, 10));
                            }}
                          />
                        </FormControl>
                        <FormDescription>
                          Total supervision hours (if applicable).
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Separator />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe the supervision activities, goals, and context..."
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        A detailed description of the supervision activities.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="outcomes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Outcomes</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe the outcomes, achievements, or results of this supervision..."
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        The outcomes or achievements from this supervision.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="is_featured"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Feature this supervision</FormLabel>
                        <FormDescription>
                          Featured supervisions may be highlighted on your profile or portfolio.
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => router.push("/admin/professional-leadership/supervision")}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              form="supervision-form"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                </>
              ) : (
                "Update Supervision Record"
              )}
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
