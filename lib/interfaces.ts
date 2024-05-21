interface Guest {
    name: string;
    surname: string;
}

export interface IBooking {
    [key: string]: any;
    guest: Guest;
    order_date: string;
    check_in: string;
    check_out: string;
    special_request: string | null;
    room_type: string;
    roomID: string;
    status: string; 
}

export interface IReview {
    [key: string]: any;
    date: string;
    customer: string;
    rating: number;
    comment: string;
}

export interface IRoom {
    [key: string]: any;
    image: string;
    roomNumber: number;
    roomType: string;
    amenities: string[];
    price: number;
    offerPrice: number;
    status: string;
}

export interface IStaff {
    [key: string]: any;
    photo: string;
    fullName: string;
    email: string;
    startDate: string;
    description: string;
    contact: string;
    status: string;
}

export interface IAdmin {
    [key: string]: any;
    username: string;
    email: string;
    password: string;
}

export interface IAPIError extends Error {
    status?: number;
    safe?: boolean;
}

export interface LoginResponse {
    message: string;
    token: string;
}

export type Data = IRoom[] | IBooking[] | IReview[] | IStaff[];