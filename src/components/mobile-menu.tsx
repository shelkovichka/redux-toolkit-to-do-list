import React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { setFilterTag } from "@/redux/slices/task-slice";
import { selectFilterTag } from "@/redux/selectors/task-selectors";
import { TAG_COLORS } from "@/hooks/use-tag-color";

const MobileMenu = () => {
  const dispatch = useDispatch();
  const activeFilterTag = useSelector(selectFilterTag);

  const handleFilter = (tag: string) => {
    dispatch(setFilterTag(activeFilterTag === tag ? null : tag));
  };

  return (
    <Menubar className="border-0 shadow-none p-0">
      <MenubarMenu>
        <MenubarTrigger
          className="border-0 bg-transparent
          shadow-none p-0 hover:bg-transparent focus:bg-transparent
          data-[state=open]:bg-transparent"
        >
          <h1 className="text-lg font-bold cursor-pointer md:hidden">Notie</h1>
        </MenubarTrigger>
        <MenubarContent>
          <MenubarSeparator />
          {Object.entries(TAG_COLORS).map(([tag, color]) => (
            <MenubarItem key={tag} onClick={() => handleFilter(tag)}>
              <div className="flex items-center gap-2">
                <div className={`size-4 ${color} rounded-full`} />
                <span>{tag}</span>
                {activeFilterTag === tag && <span className="ml-auto">✓</span>}
              </div>
            </MenubarItem>
          ))}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default MobileMenu;
