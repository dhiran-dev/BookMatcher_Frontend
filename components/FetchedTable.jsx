import React from "react";
//shadcn components and icons
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function FetchedTable(props) {
  let books;
  let renderTable = false;

  //condition to render, only if props state is received table will be rendered
  if (props.props !== undefined) {
    renderTable = true;
    books = props.props;
  }

  return (
    <div className="mt-8">
      {/* condition to render, only if props state is received table will be rendered */}
      {renderTable && books && (
        <div className="">
          <h1 className="text-center text-slate-500 text-lg">
            Books Matching your preferences
          </h1>

          {/* ======Shadcn table component======== */}
          <Table>
            <TableCaption>Books Matching your preferences</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Genre</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead className="text-right">Pages</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {books.map((book) => (
                <TableRow key={book._id}>
                  <TableCell className="font-medium">{book.genre}</TableCell>
                  <TableCell>{book.title}</TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell className="text-right">{book.numPages}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
