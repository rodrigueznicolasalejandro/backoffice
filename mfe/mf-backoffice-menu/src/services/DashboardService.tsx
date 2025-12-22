// import { secureGet } from "@link/security-module";

export interface OnboardingMenuItem {
  code: string;
  label: string;
  description?: string;
  link_url: string;
  icon_code: string;
  display_order: number;
}

export interface DashboardMenuItem extends OnboardingMenuItem {
  sub_items: DashboardMenuItem[];
}

const apiUrls = {
  merchantMenu: "/api/menu/v1/private/menu-items",
};

export const getDashboardMenu = async () => {
  // return secureGet(apiUrls.merchantMenu);
    return apiUrls.merchantMenu;
};
