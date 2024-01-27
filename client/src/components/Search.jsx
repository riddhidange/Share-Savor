import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import restaurants from "./../../../data/NJData.json";

const Search = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  function filter_search(e) {
    e.preventDefault();

    const lowercaseSearch = search?.toLowerCase()?.trim();

    const result = restaurants.filter((req) => {
      return (
        req?.name?.toLowerCase() === lowercaseSearch ||
        req?.name?.toLowerCase().includes(lowercaseSearch) ||
        req?.cuisine?.toLowerCase().includes(lowercaseSearch)
      );
    });
    navigate("/search", { state: result });
  }

  return (
    <form
      onSubmit={filter_search}
      className="max-w-2xl mx-auto border-2 border-gray/10 rounded-lg p-4"
    >
      <Label className="text-center font-semibold text-2xl my-6">
        Search for a restaurant
      </Label>
      <div className="flex items-center gap-4">
        <Input
          value={search}
          name="search_input"
          id="search_input"
          className="rounded border border-solid border-gray h-10 my-5 placeholder:px-2"
          placeholder="Enter the restaurant name/cuisines you want to search"
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button
          disabled={!search?.trim().length}
          className="w-32"
          type="submit"
        >
          Search 🔍
        </Button>
      </div>
    </form>
  );
};

export default Search;
