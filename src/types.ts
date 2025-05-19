export interface GitHubUser {
    id: number;
    login: string;
    name: string;
    avatar_url: string;
    location: string;
    email: string | null;
    html_url: string;
    company: string | null;
  }