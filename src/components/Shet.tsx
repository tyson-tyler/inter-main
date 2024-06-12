import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Search } from "lucide-react";
import SearchBar from "./SearchBar";

export function SheetDemo() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost">
          <Search className="w-6 h-6 text-gray-50 " />
        </Button>
      </SheetTrigger>
      <SheetClose asChild>
        <SheetContent className="bg-gray-800  text-white ">
          <SheetHeader>
            <SheetTitle className="text-white">Search Prompt</SheetTitle>
          </SheetHeader>
          <SearchBar />
        </SheetContent>
      </SheetClose>
    </Sheet>
  );
}
