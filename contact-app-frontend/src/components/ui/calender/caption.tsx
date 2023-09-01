import * as React from "react";
import { Button } from "@/components/ui/button";
import { add, format } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  CaptionProps,
  MonthChangeEventHandler,
  useDayPicker,
  useNavigation,
} from "react-day-picker";

export function Caption(props: CaptionProps): JSX.Element {
  const { displayMonth } = props;
  const context = useDayPicker();
  const { classNames, styles, onMonthChange, locale } = context;

  const { goToMonth } = useNavigation();

  const handlePreviousClick = () => {
    handleMonthChange(add(displayMonth, { months: -1 }));
  };

  const handleNextClick = () => {
    handleMonthChange(add(displayMonth, { months: 1 }));
  };

  const handleMonthChange: MonthChangeEventHandler = (newMonth) => {
    goToMonth(newMonth);
    onMonthChange?.(newMonth);
  };

  const handleNextYearClick = () => {
    handleMonthChange(add(displayMonth, { years: 1 }));
  };
  const handlePreviousYearClick = () => {
    handleMonthChange(add(displayMonth, { years: -1 }));
  };
  return (
    <div>
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="h-7 w-7 p-0"
            onClick={handlePreviousYearClick}
          >
            <span className="sr-only">Go to previous year</span>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm">
            {format(props.displayMonth, "yyyy", { locale })}
          </span>
          <Button
            variant="outline"
            className="h-7 w-7 p-0"
            onClick={handleNextYearClick}
          >
            <span className="sr-only">Go to next year</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="h-7 w-7 p-0"
            onClick={handlePreviousClick}
          >
            <span className="sr-only">Go to previous month</span>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm">
            {format(props.displayMonth, "LLLL", { locale })}
          </span>
          <Button
            variant="outline"
            className="h-7 w-7 p-0"
            onClick={handleNextClick}
          >
            <span className="sr-only">Go to next month</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
