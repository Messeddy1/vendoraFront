export interface UserSessionInterface {
  id: string;
  user_id: string;
  ip_address: string;
  user_agent: {
    platform: string;
    browser: string;
    is_desktop: boolean;
    device: string;
  };
 last_activity: string;
  is_this_device: boolean;
  location: {
    city: string;
    country: string;
  };
}

