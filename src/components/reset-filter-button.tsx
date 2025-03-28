import {FC, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RotateCcw} from 'lucide-react';

import {Button} from '@/components/ui/button';
import {setFilterTag} from '@/redux/slices/task-slice';
import {selectFilterTag} from '@/redux/selectors/task-selectors';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from '@/components/ui/tooltip';

interface ResetFilterButtonProps {
  showTooltip?: boolean;
  className?: string;
}

const ResetFilterButton: FC<ResetFilterButtonProps> = ({
  showTooltip = true,
  className,
}) => {
  const dispatch = useDispatch();
  const activeFilterTag = useSelector(selectFilterTag);
  const [rotating, setRotating] = useState(false);

  const resetFilter = () => {
    if (activeFilterTag) {
      setRotating(!rotating);
      dispatch(setFilterTag(null));
    }
  };

  const buttonContent = (
    <Button
      variant="ghost"
      className={`hover:bg-transparent ${className}`}
      onClick={resetFilter}
    >
      <RotateCcw
        className={`scale-125 transition-transform duration-500 ${
          rotating ? '-rotate-[360deg]' : 'rotate-0'
        }`}
      />
    </Button>
  );

  if (!showTooltip) return buttonContent;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{buttonContent}</TooltipTrigger>
        <TooltipContent>
          <p>Reset filter</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ResetFilterButton;
