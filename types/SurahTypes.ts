export type SurahProps = {
  id: number;
  title: string;
  revelationPlace: string;
  versesCount: number;
  page: number;
  bismillahPre: boolean;
};

export type buttonProps = {
  versesCountExist?: boolean;
  revelationPlaceExist?: boolean;
  idExist?: boolean;
};
