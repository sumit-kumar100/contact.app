interface SiteConfig {
  name: string;
  description: string;
  mainNav: {
    title: string;
    href: string;
    disables?: boolean;
  }[];
  links: {};
}

export const siteConfig: SiteConfig = {
  name: "contact-app.com",
  description:
    "Beautifully designed components built with Radix UI and Tailwind CSS.",
  mainNav: [],
  links: {},
};
