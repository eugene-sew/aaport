"use client";

import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "@/components/ui/use-toast";
import { Copy, Download, Loader2, Trash2 } from "lucide-react";

interface Subscriber {
  id: number;
  email: string;
  created_at: string;
}

// Subscribers come from the footer form (/api/newsletter). Sending the actual
// newsletter is done elsewhere: copy the list or export a CSV.
export default function NewsletterPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("newsletter_subscribers")
      .select("id, email, created_at")
      .order("created_at", { ascending: false });
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setSubscribers(data ?? []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const copyEmails = async () => {
    await navigator.clipboard.writeText(subscribers.map((s) => s.email).join(", "));
    toast({ title: "Copied", description: `${subscribers.length} email addresses copied.` });
  };

  const exportCsv = () => {
    const rows = ["email,subscribed_at", ...subscribers.map((s) => `${s.email},${s.created_at}`)];
    const url = URL.createObjectURL(new Blob([rows.join("\n")], { type: "text/csv" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `newsletter-subscribers-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const remove = async (s: Subscriber) => {
    if (!window.confirm(`Remove ${s.email} from the newsletter list?`)) return;
    const { error } = await supabase.from("newsletter_subscribers").delete().eq("id", s.id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return;
    }
    setSubscribers((prev) => prev.filter((x) => x.id !== s.id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Newsletter</h1>
          <p className="text-muted-foreground">People who subscribed from the site footer.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={copyEmails} disabled={!subscribers.length}>
            <Copy className="mr-2 h-4 w-4" /> Copy emails
          </Button>
          <Button onClick={exportCsv} disabled={!subscribers.length}>
            <Download className="mr-2 h-4 w-4" /> Export CSV
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{subscribers.length} subscriber{subscribers.length === 1 ? "" : "s"}</CardTitle>
          <CardDescription>Newest first.</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-10">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : !subscribers.length ? (
            <p className="py-10 text-center text-muted-foreground">No subscribers yet.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Subscribed</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subscribers.map((s) => (
                  <TableRow key={s.id}>
                    <TableCell className="font-medium">{s.email}</TableCell>
                    <TableCell>{new Date(s.created_at).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => remove(s)} aria-label={`Remove ${s.email}`}>
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
