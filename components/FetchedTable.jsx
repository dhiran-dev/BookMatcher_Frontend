import React from "react";
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
  if (props.props !== undefined) {
    renderTable = true;
    books = props.props;
  }

  return (
    <div className="mt-8">
      {renderTable && books && (
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
      )}
    </div>
  );
}
