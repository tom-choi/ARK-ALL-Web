/**
 * 社團聯係方式
 */
export interface IContactType {
    type: string;
    num: string;
}

/**
 * 社團活動類型
 */
export type ActivityType = "ACTIVITY" | "WEBSITE" | "OFFICIAL";

/**
 * 寫入回傳
 */
export interface IWriteResponse {
    code: string;
    message: string;
};


/**
 * 1.1 club_signin 社團登錄
 */
export interface IClubSignin {
    account: string;
    password: string;
};

export interface IClubSigninResponse extends IGetClubInfo {
    token: string;
};

/**
 * 2.1 get_club_info 社團訊息
 */
export interface IGetClubInfo {
    code: string;
    message: string;
    content: {
        club_num: number;
        logo_url: string;
        name: string;
        tab: string;
        intro: string;
        contact: IContactType[];
        club_photos_list: string[];
    };
};

/**
 * 3.2 edit_club_info 編輯社團訊息
 */
export interface IEditClubInfo {
    intro: string;
    contact: IContactType[];
    add_club_photos: File[];
    del_club_photos: string[];
}

export interface IEditClubInfo extends IWriteResponse { };

/**
 * 3.3 get_activity 獲取活動信息
 */
export interface IGetActivity {
    code: string;
    message: string;
    content: {
        _id: string;
        title: string;
        type: ActivityType;
        created_by: string;
        cover_image_url: string;
        relate_image_url: string[];
        timestamp: string[];
        state: number;
    };
    num_pages: number;
}

/**
 * 3.2 edit_activity 編輯活動
 */
export interface IEditActivity {
    id: string;
    title: string;
    type: ActivityType;
    link: string;
    cover_image_file?: File;
    add_relate_image?: File[];
    del_relate_image: string[];
    startdatetime: string;
    enddatetime: string;
    location: string;
    introduction: string;
    can_follow: boolean;
}

export interface IEditActivityResponse extends IWriteResponse { };

/**
 * 3.3 create_activity 創建活動
 */
export interface ICreateActivityCommon {
    title: string;
    type: ActivityType;
    link: string;
    cover_image_file: File;
    add_relate_image?: File[];
    location: string;
    introduction: string;
    can_follow: boolean;
}

export interface ICreateActivity extends ICreateActivityCommon {
    startdatetime: string;
    enddatetime: string;
};

export interface _ICreateActivity extends ICreateActivityCommon {
    sDate: string;
    sTime: string;
    eDate: string;
    eTime: string;
};

export interface ICreateActivityResponse extends IWriteResponse {
    content: {
        id: string;
    };
}

/**
 * 3.4 delete_activity 刪除活動
 */
export interface IDeleteActivity {
    id: string;
}

export interface IDeleteActivity extends IWriteResponse { };

