import { ReactNode } from 'react';
import {
  MONEY_VALUES,
  permissions,
  useAuthContextValues,
  useBoxContextValues,
} from '@/utils';
import { useDepositContext } from '@/utils/Contexts/DepositContext';

export interface NavLink extends WithPermission {
  url: string;
  label: string;
}

export interface WithPermission {
  permission: UserRole;
}

export interface SubNavLink extends NavLink {
  show?: boolean;
  withDot?: boolean;
}

export type VolunteerType = 'volounteer' | 'admin' | 'superadmin';

export interface Option {
  value: VolunteerType;
  label: string;
}

export interface IdNumber {
  idNumber: string;
}

export interface TableColumns {
  titleName: string;
  keyName: string;
  sortType?: 'number' | 'string' | 'date' | 'time';
  search?: boolean;
  ellipsis?: boolean;
  actions?: {
    title: string;
    link: string;
    color?: string;
    type?: string;
    icon?: ReactNode;
    buttonType?: 'link' | 'primary' | 'default' | 'tooltip';
    callback?: () => void;
  }[];
  fixed?: 'left' | 'right';
  width?: number;
  beforeText?: string;
  afterText?: string;
  status?: {
    key: string;
    options: {
      on: { value: string | number | boolean; description: string };
      off: { value: string | number | boolean; description: string };
    };
  };
}

// gdy będą już jakieś dane z API to podmienić
export type DataType = {
  key: string;
  name: string;
  amount_EUR: number;
  amount_GBP: number;
  amount_USD: number;
  amount_PLN: number;
  more: string;
  position: string;
  time_counted: string;
  is_confirmed: number;
};

export type BoxDataType = {
  id: number;
  volunteer_id: string;
  name: string;
  amount_EUR: string;
  amount_GBP: string;
  amount_USD: string;
  amount_PLN: string;
  status: string;
  give_hour: string;
};

export type VolunteerDataType = {
  volunteer_id: string;
  name: string;
  sur_name: string;
  id: string;
  amount_PLN: number;
  status: string;
  phone_number: string;
};

export type UserDataType = {
  user_id: string;
  name: string;
  role: string;
};

export type IUser = {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
  comment: string;
  roles: [
    {
      id: number;
      name: string;
      created_at: string;
      updated_at: string;
      description: string;
    },
  ];
};

export type LogDataType = {
  user_id: number;
  box_id: number;
  type: string;
  comment: string;
  created_at: string;
  box: IBoxes;
  user: VolunteerDataType;
};

export type volunteerStatus = 'available' | 'occupied' | 'unavailable';

export type volunteerStatusClass =
  | 'volunteer-available'
  | 'volunteer-occupied'
  | 'volunteer-unavailable';

export type currencies = 'pln' | 'eur' | 'gbp' | 'usd';

export interface IAuthContext {
  createCredentials: (username: string, password: string) => Promise<void>;
  deleteCredentials: () => void;
  credentials: string | null;
  username: string | null;
  roles: UserRole[];
}

export interface ISidebarStateContext {
  show: boolean;
  toggleSidebar: () => void;
}

export interface IBoxContext {
  createBox: (
    collectorName: string,
    collectorIdentifier: string,
    boxIdentifier: string,
    isBoxSpecial: boolean,
  ) => Promise<void>;
  deleteBox: () => void;
  collectorName: string | null;
  collectorIdentifier: string | null;
  boxIdentifier: string | null;
  isBoxSpecial: boolean | null;
}

export type formMessageType = 'error' | 'success';

export interface FormMessage {
  type: formMessageType;
  content: ReactNode;
}

export interface boxResponse {
  id: number;
  collectorIdentifier: string;
  collector_id: number;
  is_given_to_collector: boolean;
  given_to_collector_user_id: number;
  time_given: string;
  is_counted: number;
  counting_user_id: string | null;
  time_counted: string | null;
  is_confirmed: number;
  user_confirmed_id: string | null;
  time_confirmed: string | null;
  count_1gr: number;
  count_2gr: number;
  count_5gr: number;
  count_10gr: number;
  count_20gr: number;
  count_50gr: number;
  count_1zl: number;
  count_2zl: number;
  count_5zl: number;
  count_10zl: number;
  count_20zl: number;
  count_50zl: number;
  count_100zl: number;
  count_200zl: number;
  count_500zl: number;
  amount_PLN: string;
  amount_EUR: string;
  amount_USD: string;
  amount_GBP: string;
  comment: string;
  created_at: string;
  updated_at: string;
  is_special_box: number;
  collector: {
    id: number;
    identifier: string;
    firstName: string;
    lastName: string;
    created_at: string;
    updated_at: string;
  };
}

export type ExchangeRates = { EUR: number; GBP: number; USD: number };

export interface IDisplayPageContent {
  amount_PLN: number;
  amount_PLN_unconfirmed: number;
  amount_EUR: string;
  amount_GBP: string;
  amount_USD: string;
  rates: ExchangeRates;
  amount_total_in_PLN: number;
  collectors_in_city: number;
  amount_PLN_eskarbonka: number;
  amount_allegro: number;
}

export interface IStations {
  station: number;
  status: number;
  time: number | null;
}

export interface IBoxes {
  id: number;
  created_at: string;
  updated_at: string;
  collectorIdentifier: number;
  collector: {
    id: number;
    created_at: string;
    updated_at: string;
    identifier: number;
    firstName: string;
    lastName: string;
  };
  is_given_to_collector: number;
  given_to_collector_user_id: {
    id: number;
    created_at: string;
    updated_at: string;
    name: string;
    comment: string;
    remember_token: string;
  };
  time_given: string;
  is_counted: number;
  counting_user_id: number;
  time_counted: string;
  is_confirmed: boolean;
  user_confirmed_id: number;
  time_confirmed: string;
  count_1gr: number;
  count_2gr: number;
  count_5gr: number;
  count_10gr: number;
  count_20gr: number;
  count_50gr: number;
  count_1zl: number;
  count_2zl: number;
  count_5zl: number;
  count_10zl: number;
  count_20zl: number;
  count_50zl: number;
  count_100zl: number;
  count_200zl: number;
  count_500zl: number;
  amount_PLN: string;
  amount_EUR: string;
  amount_USD: string;
  amount_GBP: string;
  comment: string;
  is_special_box: number;
}

export interface DisplayableData {
  [key: string]: string | number;
}

export type AmountsKeys = ZlotyAmountsKeys | ForeignAmountsKeys;

export type ZlotyAmountsKeys =
  | 'count_1gr'
  | 'count_2gr'
  | 'count_5gr'
  | 'count_10gr'
  | 'count_20gr'
  | 'count_50gr'
  | 'count_1zl'
  | 'count_2zl'
  | 'count_5zl'
  | 'count_10zl'
  | 'count_20zl'
  | 'count_50zl'
  | 'count_100zl'
  | 'count_200zl'
  | 'count_500zl';

export type ForeignAmountsKeys = 'amount_EUR' | 'amount_USD' | 'amount_GBP';

export interface BoxData {
  amounts: Record<AmountsKeys, number | null>;
  comment: string;
}

export interface IDepositContext {
  boxData: BoxData;
  handleAmountsChange: (id: string, value: number | string) => void;
  cleanAmounts: () => void;
}

export type UseAuthContextValues = typeof useAuthContextValues;

export type UseBoxContextValues = typeof useBoxContextValues;

export type UseDepositContextValues = typeof useDepositContext;

export type moneyValuesType = typeof MONEY_VALUES;

export type BoxTypeFormInput = {
  id_number: string;
  box_type: 0 | 10000 | 20000;
};

export interface Volunteer {
  id: number;
  identifier: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  created_at: number;
  updated_at: string;
  boxes: Omit<boxResponse, 'collector'>[];
}

export type UserRole = keyof typeof permissions;

export interface IAuthResponse {
  user: string;
  roles: UserRole[];
}
