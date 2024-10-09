export class Post {
  userId: number;
  id: number;
  title: string;
  body: string;

  static getKeys(): string[] {
    return ['userId', 'id', 'title', 'body'];
  }
}
