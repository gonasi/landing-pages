import { MoreHorizontal, Plus } from "lucide-react";
import { Outlet, useNavigate } from "react-router";
import { createClient } from "~/lib/supabase/supabase.server";
import type { Route } from "./+types/ad-sets";
import { fetchAdSets } from "~/lib/database/ad-sets";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { SearchInput } from "~/components/ui/forms/SearchInput";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Badge } from "~/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Button } from "~/components/ui/button";
import { motion } from "framer-motion";
import { PaginationBar } from "~/components/ui/forms/PaginationBar";

export function meta() {
  return [
    { title: "Ad Sets | SMC" },
    { name: "description", content: "View and manage your ad sets" },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const { supabase } = createClient(request);
  const url = new URL(request.url);

  const searchQuery = url.searchParams.get("name") ?? "";
  const page = parseInt(url.searchParams.get("page") ?? "1", 10);
  const limit = 12;

  const data = await fetchAdSets({
    supabase,
    searchQuery,
    limit,
    page,
  });

  return data;
}

export default function AdSetsPage({ loaderData }: Route.ComponentProps) {
  const { count, data } = loaderData;
  const navigate = useNavigate();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <>
      <Card className="my-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Ad Sets</CardTitle>
              <CardDescription>
                Manage your advertising campaigns and ad sets
              </CardDescription>
            </div>
            <Button onClick={() => navigate("/ad-sets/new")}>
              <Plus className="mr-2 h-4 w-4" />
              New Ad Set
            </Button>
          </div>
          <div className="flex items-center gap-4 mt-4">
            <div className="relative flex-1 max-w-sm">
              <SearchInput />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            {data.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  No ad sets found.
                </p>
              </div>
            ) : (
              <>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ad Set ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Updated</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.map((adSet) => (
                      <TableRow
                        key={adSet.id}
                        onClick={() => navigate(`/ad-sets/${adSet.id}`)}
                        className="hover:cursor-pointer"
                      >
                        <TableCell className="font-medium">
                          <Badge variant="outline">{adSet.ad_set_id}</Badge>
                        </TableCell>
                        <TableCell className="font-medium">
                          {adSet.ad_set_name}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {formatDate(adSet.created_at)}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {formatDate(adSet.updated_at)}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem
                                onClick={() =>
                                  navigator.clipboard.writeText(adSet.id)
                                }
                              >
                                Copy ad set ID
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>View details</DropdownMenuItem>
                              <DropdownMenuItem>Edit ad set</DropdownMenuItem>
                              <DropdownMenuItem>Duplicate</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive">
                                Delete ad set
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {/* Pagination bar fade-in */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                  className="pb-8"
                >
                  <PaginationBar totalItems={count ?? 0} itemsPerPage={12} />
                </motion.div>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      <Outlet />
    </>
  );
}
