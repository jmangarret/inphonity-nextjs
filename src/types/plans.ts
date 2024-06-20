export interface Commission {
    id:                          number;
    product_id:                  number;
    target_id:                   number;
    year_1_residual:             number;
    year_1_residual_sales_force: string;
    year_2_residual:             string;
    year_2_residual_sales_force: string;
    year_3_residual:             string;
    year_3_residual_sales_force: string;
    year_4_residual:             string;
    year_4_residual_sales_force: string;
    year_5_residual:             string;
    year_5_residual_sales_force: string;
    year_6_residual:             string;
    year_6_residual_sales_force: string;
    referral:                    string;
    referral_sales_force:        string;
    year_1_sales_force:          string;
    year_2_sales_force:          string;
    year_3_sales_force:          string;
    year_4_sales_force:          string;
    year_5_sales_force:          string;
    year_6_sales_force:          string;
    deleted_at:                  null;
    created_at:                  string;
    updated_at:                  string;
    target:                      Plan;
}

export interface Plan {
    id:                number;
    user_id:           null;
    type:              Type;
    name:              string;
    internet:          string;
    share_data:        number;
    minutes:           number;
    sms:               number;
    duration:          number;
    background:        string;
    has_wa:            number;
    has_ig:            number;
    has_fb:            number;
    has_fm:            number;
    has_tt:            number;
    has_x:             number;
    has_telegram:      number;
    has_snapchat:      number;
    portability_promo: TrustedHTML | string | HTMLSpanElement;
    price:             number;
    code:              string;
    status:            Status;
    created_at:        string;
    updated_at:        string;
    deleted_at:        null;
    commissions?:      Commission[];
    isPaid?:            boolean;
    supportEsim?:       boolean;
}

export enum Status {
    Active = "active",
}

export enum Type {
    Package = "package",
    Plan = "plan",
}
