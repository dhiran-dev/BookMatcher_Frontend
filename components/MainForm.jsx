"use client";

import React from "react";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useToast } from "@/components/ui/use-toast";
import FetchedTable from "./FetchedTable";

export default function MainForm() {
  const { toast } = useToast();
  const [tableState, setTableState] = useState([]);
  const [formState, setFormState] = useState({
    studentName: "",
    bookGenre: "",
    numberOfPages: "",
  });

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
    console.log(formState);
  };

  const handleSelect = (e) => {
    setFormState({
      ...formState,
      bookGenre: e,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      formState.studentName === "" ||
      formState.bookGenre === "" ||
      formState.numberOfPages === ""
    ) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "All fields are required!",
      });
      return;
    }

    try {
      // Make a POST request to your backend API
      const response = await fetch(process.env.FETCHBOOKS_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formState.studentName,
          genrePreference: formState.bookGenre,
          numPagesPreference: formState.numberOfPages,
        }),
      });

      if (!response.ok) {
        throw new Error("Error fetching books");
      }

      const data = await response.json();

      // Handle the response data as needed
      console.log(data);
      setTableState(data);

      toast({
        variant: "success",
        title: "Success!",
        description: "Fetching results",
      });
    } catch (error) {
      console.error("Error fetching books:", error);

      toast({
        variant: "destructive",
        title: "Error",
        description: "Error fetching books",
      });
    }
  };

  // useEffect(() => {
  //   console.log(formState);
  // }, [formState]);

  return (
    <div className=" m-[20px] form-component">
      <form onSubmit={handleSubmit} className="flex flex-col h-content">
        <div className="student-name flex p-2 justify-center items-center">
          <label className="w-60" htmlFor="studentName">
            Student Name:
          </label>

          <Input
            id="studentName"
            type="text"
            name="studentName"
            value={formState.studentName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="book-genre flex p-2 justify-center items-center">
          <label className="w-60" htmlFor="bookGenre">
            Book Genre:
          </label>
          <Select id="bookGenre" onValueChange={handleSelect}>
            <SelectTrigger className="w-content">
              <SelectValue placeholder="Genre" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Science Fiction">Science Fiction</SelectItem>
              <SelectItem value="Dystopian">Dystopian</SelectItem>
              <SelectItem value="Fantasy">Fantasy</SelectItem>
              <SelectItem value="Mystery">Mystery</SelectItem>
              <SelectItem value="Crime">Crime</SelectItem>
              <SelectItem value="Classics">Classics</SelectItem>
              <SelectItem value="Romance">Romance</SelectItem>
              <SelectItem value="Adventure">Adventure</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="no-pages flex p-2 justify-center items-center">
          <label className="w-60" htmlFor="numberOfPages">
            Number of Pages:
          </label>
          <Input
            id="numberOfPages"
            type="number"
            name="numberOfPages"
            value={formState.numberOfPages}
            onChange={handleChange}
            required
          />
        </div>

        <div className="button  flex justify-center items-center m-2">
          <Button type="submit" className="w-[150px]">
            Submit
          </Button>
        </div>
      </form>
      {/* {console.log(tableState.books, "printing in line")} */}
      <div className="table-section">
        <FetchedTable props={tableState.books} />
      </div>
    </div>
  );
}
