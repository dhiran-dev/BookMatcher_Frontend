import React from "react";
import AddBook from "@/components/AddBook";

//shadcn components and icons
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

const page = () => {
  return (
    <div className="flex flex-col justify-center items-center h-[600px]">
      <h1 className="text-2xl m-5">Add Book to Database</h1>

      <AddBook />

      {/*========= Instructions for developers/admin=========== */}
      <p className="text-slate-400 mt-16">
        This is a page to be used by admin/developer for development purpose
        only: to facilitate adding books to the database
      </p>

      <div className="mt-8">
        <Alert variant="destructive">
          <ExclamationTriangleIcon className="h-4 w-4" />
          <AlertTitle>Warning</AlertTitle>
          <AlertDescription>
            Not to be used in production's client side environment!
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
};

export default page;
