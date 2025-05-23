import {useDispatch, useSelector} from 'react-redux';

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from '@/components/ui/menubar';
import {setFilterTag} from '@/redux/slices/task-slice';
import {selectFilterTag} from '@/redux/selectors/task-selectors';
import {useTheme} from '@/theme/use-theme';
import {TagType} from '@/theme/types';
import ResetFilterButton from '@/components/reset-filter-button';

const MobileMenu = () => {
  const dispatch = useDispatch();
  const {tagColors} = useTheme();

  const activeFilterTag = useSelector(selectFilterTag);

  const handleFilter = (tag: TagType) => {
    dispatch(setFilterTag(activeFilterTag === tag ? null : tag));
  };

  return (
    <Menubar className="border-0 shadow-none p-0">
      <MenubarMenu>
        <div className="flex items-center gap-2">
          <MenubarTrigger
            className="border-0 bg-transparent
              shadow-none p-0 hover:bg-transparent focus:bg-transparent
              data-[state=open]:bg-transparent"
          >
            <h1 className="text-lg font-bold cursor-pointer md:hidden">
              Notie
            </h1>
          </MenubarTrigger>
          <ResetFilterButton showTooltip={false} className="md:hidden" />
        </div>
        <MenubarContent>
          <MenubarSeparator />
          {(Object.keys(tagColors) as TagType[]).map((tag) => (
            <MenubarItem key={tag} onClick={() => handleFilter(tag)}>
              <div className="flex items-center gap-2">
                <div className={`size-4 ${tagColors[tag]} rounded-full`} />
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
