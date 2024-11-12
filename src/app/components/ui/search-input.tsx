interface SearchInputProps {
  searchQuery: string;
  searchQueryQueryHandler: (searchQuery: string) => void;
}

export const SearchInput = ({
  searchQuery,
  searchQueryQueryHandler,
}: SearchInputProps) => {
  return (
    <div className="my-4">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => searchQueryQueryHandler(e.target.value)}
        placeholder="Search for Star Wars characters!"
        className="w-full p-4 px-6 border text-black rounded-full border-none text-xl"
      />
    </div>
  );
};
