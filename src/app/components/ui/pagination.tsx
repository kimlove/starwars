import { Button } from "@/app/components/ui/button";

interface PaginationProps {
  count: number;
  itemsPerPage: number;
  next: string | null;
  page: number;
  previous: string | null;
  isLoading: boolean;
  updatePageHandler: (page: number) => void;
}

export const Pagination = ({
  count,
  itemsPerPage,
  next,
  page,
  previous,
  isLoading,
  updatePageHandler,
}: PaginationProps) => {
  const totalPages = Math.ceil(count / itemsPerPage);

  return (
    <div className="my-4 w-full flex justify-between items-center gap-2">
      <Button
        onClick={() => {
          if (page > 1 && !isLoading) updatePageHandler(page - 1);
        }}
        disabled={!previous}
        loading={isLoading}
      >
        Previous
      </Button>

      <p className="my-4">
        Page:{" "}
        <strong>
          {page} / {totalPages}
        </strong>
      </p>

      <Button
        onClick={() => {
          if (!isLoading) updatePageHandler(page + 1);
        }}
        disabled={!next}
        loading={isLoading}
      >
        Next
      </Button>
    </div>
  );
};
