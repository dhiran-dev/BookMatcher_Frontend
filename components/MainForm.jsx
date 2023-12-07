"use client";

import React from "react";
import { useState } from "react";

import FetchedTable from "./FetchedTable";
import { ButtonLoading } from "./ButtonLoading";
//shadcn ui components
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

export default function MainForm() {
  const { toast } = useToast();

  //states
  const [tableState, setTableState] = useState([]);
  const [formState, setFormState] = useState({
    studentName: "",
    bookGenre: "",
    numberOfPages: "",
  });
  //state to set isFetching ==> to render loading button
  const [isFetching, setIsFetching] = useState(false);

  //========Event Handlers===========
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
      // Make a POST request to your fetchbooks API
      setIsFetching(true);
      const response = await fetch(process.env.FETCHBOOKS_UR, {
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
      setIsFetching(false);
      if (!response.ok) {
        setIsFetching(false);
        throw new Error("Error fetching books");
      }

      const data = await response.json();

      // Handle the response data as needed
      setTableState(data);

      toast({
        variant: "success",
        title: "Success!",
        description: "Fetched results",
      });
    } catch (error) {
      setIsFetching(false);
      console.error("Error fetching books:", error);

      toast({
        variant: "destructive",
        title: "Error",
        description: "Error fetching books",
      });
    }
  };

  return (
    <div className=" m-[20px] form-component flex flex-col items-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col h-content  max-w-md"
      >
        {/* =====StudentName Input======= */}
        <div className="student-name flex p-2 justify-center items-center ">
          <label className="w-60" htmlFor="studentName">
            Username:
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

        {/* =====Genre Select======= */}
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

        {/* =====Pages Input======= */}
        <div className="no-pages flex p-2 justify-center items-center ">
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

        {/* =====Submit button======= */}
        <div className="button flex justify-center items-center m-2">
          {isFetching ? (
            <ButtonLoading />
          ) : (
            <Button type="submit" className="w-[150px]">
              Submit
            </Button>
          )}
        </div>
      </form>
      {/* {console.log(tableState.books, "printing in line")} */}
      <div className="table-section">
        <FetchedTable props={tableState.books} />
      </div>
    </div>
  );
}
