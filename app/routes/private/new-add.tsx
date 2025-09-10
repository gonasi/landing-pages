import { DialogClose } from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";

export function meta() {
  return [
    { title: "New Ad | SMC" },
    { name: "description", content: "Securely log in to your SMC account" },
  ];
}

export default function NewAd() {
  return (
    <Dialog open>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Create New Ad</DialogTitle>
            <DialogClose>
              <Link to="/ads">
                <X />
              </Link>
            </DialogClose>
          </div>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>

        {/* Close / Cancel Link */}
        <div className="mt-4">
          <Button>Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
