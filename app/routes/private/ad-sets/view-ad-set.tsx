import FullPageLayout from "~/routes/layouts/full-page-layout";
import type { Route } from "./+types/view-ad-set";
import { createClient } from "~/lib/supabase/supabase.server";
import { fetchAdSetById } from "~/lib/database/ad-sets";
import { redirectWithError } from "remix-toast";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import {
  Images,
  FileVideo,
  FileImage,
  Edit,
  Trash2,
  User,
  Calendar,
  MoreHorizontal,
} from "lucide-react";
import { motion } from "framer-motion";
import { SearchInput } from "~/components/ui/forms/SearchInput";
import { Outlet, useNavigate } from "react-router";
import { fetchAdCreativesByAdSetId } from "~/lib/database/ad-creatives";
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
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { PaginationBar } from "~/components/ui/forms/PaginationBar";

export function meta() {
  return [
    { title: "Ad Set Details | SMC" },
    {
      name: "description",
      content: "View detailed information about your ad set in SMC.",
    },
  ];
}

export async function loader({ request, params }: Route.LoaderArgs) {
  const { supabase } = createClient(request);
  const url = new URL(request.url);

  const searchQuery = url.searchParams.get("name") ?? "";
  const page = parseInt(url.searchParams.get("page") ?? "1", 10);
  const limit = 12;

  const [adCreatives, adSets] = await Promise.all([
    fetchAdCreativesByAdSetId({
      supabase,
      adSetId: params.adSetId,
      searchQuery,
      limit,
      page,
    }),
    fetchAdSetById({
      supabase,
      adSetId: params.adSetId,
    }),
  ]);

  if (!adSets.success || !adSets.data) {
    return redirectWithError("/ad-sets", adSets.message);
  }

  return { adSets, adCreatives };
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "published":
      return "bg-chart-5 text-white";
    case "draft":
      return "bg-secondary text-secondary-foreground";
    case "publishing":
      return "bg-primary text-primary-foreground";
    case "failed":
      return "bg-destructive text-destructive-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const getFileIcon = (fileType: string) => {
  switch (fileType) {
    case "image":
      return <FileImage className="h-4 w-4" />;
    case "video":
      return <FileVideo className="h-4 w-4" />;
    case "carousel":
      return <Images className="h-4 w-4" />;
    default:
      return <FileImage className="h-4 w-4" />;
  }
};

const formatFileSize = (bytes: number) => {
  const sizes = ["Bytes", "KB", "MB", "GB"];
  if (bytes === 0) return "0 Bytes";
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + " " + sizes[i];
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export default function ViewAdSet({
  params,
  loaderData,
}: Route.ComponentProps) {
  const navigate = useNavigate();

  const { adSets, adCreatives } = loaderData;

  return (
    <>
      <FullPageLayout title={adSets.data.ad_set_name} prevLink="/ad-sets">
        <Card className="my-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{adSets.data.ad_set_name}</CardTitle>
                {/* <CardDescription>
                Manage your advertising campaigns and ad sets
              </CardDescription> */}
              </div>
              <Button onClick={() => navigate("/ad-sets/new")}>Publish</Button>
            </div>
            <div className="flex items-center gap-4 mt-4">
              <div className="relative flex-1 max-w-sm">
                <SearchInput />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="bg-card">
                  <TableHead className="font-semibold">Content</TableHead>
                  <TableHead className="font-semibold">Media</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">Metadata</TableHead>
                  <TableHead className="font-semibold">Created</TableHead>
                  <TableHead className="w-[70px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {adCreatives.data.map((item, index) => (
                  <TableRow
                    key={item.id}
                    className={`hover:bg-muted/50 transition-colors ${index % 2 === 0 ? "bg-background" : "bg-muted/20"}`}
                  >
                    <TableCell className="max-w-xs">
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm leading-relaxed text-balance">
                          {item.headline}
                        </h4>
                        <p className="text-xs text-muted-foreground leading-relaxed text-pretty line-clamp-2">
                          {item.body_text}
                        </p>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-muted overflow-hidden">
                          {item.file_type === "image" && (
                            <img
                              src={item.signed_url}
                              alt={item.ad_set_name}
                              className="object-cover w-full h-full"
                            />
                          )}

                          {item.file_type === "video" && (
                            <video
                              src={item.signed_url}
                              className="object-cover w-full h-full"
                              muted
                              playsInline
                            />
                          )}

                          {item.file_type === "unknown" && (
                            <span className="text-xs text-muted-foreground">
                              ?
                            </span>
                          )}
                        </div>

                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground">
                            {formatFileSize(item.file_size)}
                          </p>
                          <Badge
                            variant="secondary"
                            className="text-xs capitalize"
                          >
                            {item.file_type}
                          </Badge>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <Badge
                        className={`${getStatusColor(item.status)} capitalize`}
                      >
                        {item.status}
                      </Badge>
                    </TableCell>

                    <TableCell className="max-w-xs">
                      <div className="space-y-1 text-xs text-muted-foreground">
                        {item.call_to_action && (
                          <p className="text-primary font-medium">
                            CTA: {item.call_to_action}
                          </p>
                        )}
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span className="text-xs">
                            {formatDate(item.created_at)}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                        <User className="h-3 w-3" />
                        <span>{item.created_by}</span>
                      </div>
                    </TableCell>

                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() =>
                              navigate(
                                `/ad-sets/${params.adSetId}/${item.id}/edit`
                              )
                            }
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() =>
                              navigate(
                                `/ad-sets/${params.adSetId}/${item.id}/delete`
                              )
                            }
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              {/* Pagination bar fade-in */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                className="pb-8"
              >
                <PaginationBar
                  totalItems={adCreatives.count ?? 0}
                  itemsPerPage={12}
                />
              </motion.div>
            </Table>
          </CardContent>
        </Card>
      </FullPageLayout>
      <Outlet />
    </>
  );
}
