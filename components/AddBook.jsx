"use client";

import React from "react";
import { useState, useEffect } from "react";

//shadcn components
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

export default function AddBook() {
  const { toast } = useToast("");

  //state to store input values from form in admin page
  const [bookState, setBookState] = useState({
    title: "",
    author: "",
    genre: "",
    numPages: "",
  });

  // ======== Event Handler ===========
  const handleChange = (e) => {
    setBookState({
      ...bookState,
      [e.target.name]: e.target.value,
    });
    console.log(bookState);
  };

  const handleSelect = (e) => {
    setBookState({
      ...bookState,
      genre: e,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      bookState.title === "" ||
      bookState.author === "" ||
      bookState.genre === "" ||
      bookState.numPages === ""
    ) {
      //display toast to show error
      toast({
        variant: "destructive",
        title: "Error",
        description: "All fields are required!",
      });
      return;
    }

    try {
      // Make a POST request to addbook backend API
      const response = await fetch(process.env.ADDBOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: bookState.title,
          author: bookState.author,
          genre: bookState.genre,
          numPages: bookState.numPages,
        }),
      });

      if (!response.ok) {
        throw new Error("Error fetching books");
      }

      const data = await response.json();

      // Handle the response data as needed
      //display toast to show success message
      toast({
        variant: "success",
        title: "Success!",
        description: "Book data added to database successfully",
      });
    } catch (error) {
      console.error("Error adding books to database:", error);
      //display toast to show error
      toast({
        variant: "destructive",
        title: "Error",
        description: "Error adding books to database",
      });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col h-content">
        {/* =====Title Input======= */}
        <div className="student-name flex p-2 justify-center items-center">
          <label className="w-60" htmlFor="title">
            Book Title:
          </label>

          <Input
            id="title"
            type="text"
            name="title"
            value={bookState.title}
            onChange={handleChange}
            required
          />
        </div>
        {/* =====Author Input======= */}
        <div className="student-name flex p-2 justify-center items-center">
          <label className="w-60" htmlFor="author">
            Author:
          </label>

          <Input
            id="author"
            type="text"
            name="author"
            value={bookState.author}
            onChange={handleChange}
            required
          />
        </div>
        {/* =====Genre select======= */}
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
        <div className="no-pages flex p-2 justify-center items-center">
          <label className="w-60" htmlFor="numPages">
            Number of Pages:
          </label>
          <Input
            id="numPages"
            type="number"
            name="numPages"
            value={bookState.numPages}
            onChange={handleChange}
            required
          />
        </div>

        {/* =====Submit button======= */}
        <div className="button  flex justify-center items-center m-2">
          <Button type="submit" className="w-[150px]">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
