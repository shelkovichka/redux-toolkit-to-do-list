import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "@/components/ui/button";
import { setFilterTag } from "@/redux/slices/task-slice";
import { selectFilterTag } from "@/redux/selectors/task-selectors";
import AddTask from "@/components/add-task";
import { TAG_COLORS } from "@/hooks/use-tag-color";

const Sidebar = () => {
  const dispatch = useDispatch();
  const activeFilterTag = useSelector(selectFilterTag);

  const handleFilter = (tag: string) => {
    dispatch(setFilterTag(activeFilterTag === tag ? null : tag));
  };

  const resetFilter = () => {
    if (activeFilterTag) dispatch(setFilterTag(null));
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
            {Object.entries(TAG_COLORS).map(([tag, color]) => (
              <div key={tag} className={`size-5 ${color} rounded-full`}>
                <Button
                  variant="ghost"
                  className="hover:bg-transparent w-full h-full"
                  onClick={() => handleFilter(tag)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
