export type AccountBookHistory = {
  id?: number;
  type: '사용' | '수입';
  price: number;
  comment: string;
  createAt: number;
  updatedAt: number;
  photoUrl: string | null;
  date: number;
};
