export type DialogData =
  | {
      title: string;
      isContentLink?: false;
      content: string[];
      spans?: string[];
    }
  | { title: string; isContentLink: true; links: Link[] };

type Link = {
  name: string;
  href: string;
};
