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
        className="w-full p-4 px-6 border-2 border-yellow-400 text-yellow-400 bg-black/70 backdrop-blur-lg rounded-full shadow-xl text-xl"
      />
    </div>
  );
};
