import { BioPages } from '@prisma/client';

interface SocialLinkResponse {
  id: string;
  platform: string;
  url: string;
}

interface BioLinkResponse {
  id: string;
  title: string;
  url: string;
  icon?: string;
  sort_order: number;
  is_active: boolean;
}

interface BioPageResponse {
  id: string;
  title: string;
  username: string;
  description: string | null;
  visibility: 'public' | 'private';
  profile_image_url: string | null;
  theme_config: {
    name: string;
    colors: {
      primary: string;
      text: string;
      background: string;
    };
  };
  seo_title: string | null;
  seo_description: string | null;
  social_image_url: string | null;
  socialLinks: SocialLinkResponse[];
  bioLinks: BioLinkResponse[];
}

interface BioPagesWithClicksResponse extends BioPages {
  _count: {
    clicks: number;
  };
  is_active: boolean;
}

export type {
  BioLinkResponse,
  BioPageResponse,
  BioPagesWithClicksResponse,
  SocialLinkResponse,
};
