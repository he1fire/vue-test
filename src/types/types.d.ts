export interface BoardGame { // 보드게임
  thumbnail: string,
  name: string,
  rank: string,
  numplays: string,
  rating: string,
  averageweight: number,
  objectid: number,
}

export interface Log { // 로그
  game: BoardGame,
  date: string,
  comment: string,
  objectid: number,
}