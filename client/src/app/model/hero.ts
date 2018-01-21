export class Hero {
  _id?: string;
  type?: string;
  links: any;
  attributes: {
    name: string;
    slug: string;
    image_portrait: string;
    image_splash?: string;
    updated_at: Date;
    image_card_background?: string;
  };
  relationships: {
    hero_relationships: {
      links: any;
    };
    hero_general_tips: {
      links: any;
    };
    hero_stat_percentiles: {
      links: any;
    };
    hero_role: {
      links: any;
    };
  };
}
