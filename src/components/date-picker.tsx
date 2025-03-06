import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerProps {
  value?: Date | null;
  onDateChange: (date: Date | null) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ value, onDateChange }) => {
  const [date, setDate] = useState<Date | null | undefined>(value);

  const handleDateChange = (selectedDate?: Date) => {
    const newDate = selectedDate || null;
    setDate(newDate);
    onDateChange(newDate);
  };

  useEffect(() => {
    setDate(value);
  }, [value]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="h-4 w-4" />
          {date ? format(date, "PPP") : <span>Due</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date || undefined}
          onSelect={handleDateChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
