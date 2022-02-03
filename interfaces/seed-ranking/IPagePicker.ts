export interface IPagePicker {
  currentPage: number;
  maxPage: number;
  onPagePick: (selectedPage: number) => void;
}
