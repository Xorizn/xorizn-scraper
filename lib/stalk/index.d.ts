export declare const ig_stalk: (username: string) => Promise<{
  creator: string;
  info: string;
  status: true;
  result?: {
    id: string;
    username: string;
    avatar: string;
    isPrivate: string;
    name: string;
    bio: string;
    publication: string;
    subscriber: string;
    subscription: string;
    story: [];
  };
}>;
export declare const github_stalk: (username: string) => Promise<{
  creator: string;
  info: string;
  status: true;
  result?: {
    user: {
      login: string;
      id: string;
      node_id: string;
      avatar_url: string;
      gravatar_id: string;
      url: string;
      html_url: string;
      followers_url: string;
      following_url: string;
      gists_url: string;
      starred_url: string;
      subscriptions_url: string;
      organizations_url: string;
      repos_url: string;
      events_url: string;
      received_events_url: string;
      type: string;
      site_admin: string;
      name: string;
      company: string;
      blog: string;
      location: string;
      email: string;
      hireable: string;
      bio: string;
      twitter_username: string;
      public_repos: string;
      public_gists: string;
      followers: string;
      following: string;
      created_at: string;
      updated_at: string;
    };
    repos: [];
  };
}>;