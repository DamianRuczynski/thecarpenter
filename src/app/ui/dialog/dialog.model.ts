export type DialogData =
  | { title: string; isContentLink?: false; content: string[] }
  | { title: string; isContentLink: true; links: Link[] };

type Link = {
  name: string;
  href: string;
};
