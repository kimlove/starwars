import { Button } from "@/app/components/ui/button";

interface PaginationProps {
  count: number;
  itemsPerPage: number;
  next: string | null;
  page: number;
  previous: string | null;
  status: string;
  updatePageHandler: (page: number) => void;
}

export const Pagination = ({
  count,
  itemsPerPage,
  next,
  page,
  previous,
  status,
  updatePageHandler,
}: PaginationProps) => {
  const totalPages = Math.ceil(count / itemsPerPage);

  return (
    <div className="my-4 w-full flex justify-between items-center gap-2">
      <Button
        onClick={() => {
          if (page > 1 && status === "idle") updatePageHandler(page - 1);
        }}
        disabled={!previous}
        loading={status === "loading"}
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
          if (status === "idle") updatePageHandler(page + 1);
        }}
        disabled={!next}
        loading={status === "loading"}
      >
        Next
      </Button>
    </div>
  );
};
