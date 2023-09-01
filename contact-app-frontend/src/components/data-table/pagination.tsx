import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PAGINATION_LIMIT } from "@/config/constant";
import { useAppDispatch } from "@/hooks/redux";
import { RootDispatch } from "@/redux/store";
import { Table } from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  onPaginationChange: any;
  initialPaginationState: any;
}

export function DataTablePagination<TData>({
  table,
  onPaginationChange,
  initialPaginationState,
}: DataTablePaginationProps<TData>) {
  const dispatch: RootDispatch = useAppDispatch();

  const pagination = table.getState().pagination;

  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={`${pagination.pageSize}`}
            onValueChange={(value: string) => {
              dispatch(
                onPaginationChange({
                  offset: pagination.pageIndex * pagination.pageSize,
                  limit: Number(value),
                })
              );
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[PAGINATION_LIMIT, 5 * 2].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {pagination.pageIndex + 1} of {table.getPageCount() || 1}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => {
              const firstPageIndex = 0;
              dispatch(
                onPaginationChange({
                  offset: firstPageIndex * pagination.pageSize,
                  limit: pagination.pageSize,
                })
              );
              table.setPageIndex(firstPageIndex);
            }}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => {
              const prevPageIndex =
                pagination.pageIndex > 1 ? pagination.pageIndex - 1 : 0;
              dispatch(
                onPaginationChange({
                  offset: prevPageIndex * pagination.pageSize,
                  limit: pagination.pageSize,
                })
              );
              table.setPageIndex(prevPageIndex);
            }}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => {
              const nextPageIndex =
                (pagination.pageIndex + 1) * pagination.pageSize <=
                initialPaginationState.totalCount
                  ? pagination.pageIndex + 1
                  : pagination.pageIndex;
              dispatch(
                onPaginationChange({
                  offset: nextPageIndex * pagination.pageSize,
                  limit: pagination.pageSize,
                })
              );
              table.setPageIndex(nextPageIndex);
            }}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => {
              const lastPageIndex = table.getPageCount() - 1;
              dispatch(
                onPaginationChange({
                  offset: lastPageIndex * pagination.pageSize,
                  limit: pagination.pageSize,
                })
              );
              table.setPageIndex(lastPageIndex);
            }}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
