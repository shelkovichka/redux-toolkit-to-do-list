import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {Button} from '@/components/ui/button';
import {setFilterTag} from '@/redux/slices/task-slice';
import {selectFilterTag} from '@/redux/selectors/task-selectors';
import AddTask from '@/components/add-task';
import {useTheme} from '@/theme/use-theme';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from '@/components/ui/tooltip';
import {TagType} from '@/theme/types';
import ResetFilterButton from '@/components/reset-filter-button';

const Sidebar = () => {
  const dispatch = useDispatch();
  const {tagColors} = useTheme();
  const activeFilterTag = useSelector(selectFilterTag);
  const [rotating, setRotating] = useState(false);

  const handleFilter = (tag: string) => {
    dispatch(setFilterTag(activeFilterTag === tag ? null : (tag as TagType)));
  };

  const resetFilter = () => {
    if (activeFilterTag) {
      setRotating(!rotating);
      dispatch(setFilterTag(null));
    }
  };

  return (
    <div className="flex-col space-y-20 h-full border-r-2 p-4">
      <div className="flex items-center justify-center mt-4">
        <h1 className="text-xl font-bold cursor-pointer" onClick={resetFilter}>
          Notie
        </h1>
      </div>
      <div className="flex items-center justify-center gap-4">
        <div className="flex flex-col items-center justify-center space-y-10">
          <AddTask />
          <div className="space-y-6">
            {Object.entries(tagColors).map(([tag, color]) => (
              <TooltipProvider key={tag}>
                <Tooltip>
                  <div className={`size-5 ${color} rounded-full`}>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        className="hover:bg-transparent w-full h-full
                          flex items-center justify-center p-0"
                        onClick={() => handleFilter(tag)}
                      >
                        {activeFilterTag === tag && (
                          <span className="text-gray-700">✓</span>
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>{tag}</p>
                    </TooltipContent>
                  </div>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
          <ResetFilterButton />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
