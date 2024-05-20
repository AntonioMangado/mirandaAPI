interface Guest {
    name: string;
    surname: string;
}

export interface IBooking {
    [key: string]: any;
    guest: Guest;
    booking_id: number;
    order_date: string;
    check_in: string;
    check_out: string;
    special_request: string | null;
    room_type: string;
    roomID: string;
    status: string; 
}

export interface Review {
    [key: string]: any;
    orderId: string;
    date: string;
    customer: string;
    rating: number;
    comment: string;
}

export interface Room {
    [key: string]: any;
    image: string;
    roomNumber: number;
    roomID: string;
    roomType: string;
    amenities: string[];
    price: number;
    offerPrice: number;
    status: string;
}

export interface Staff {
    [key: string]: any;
    photo: string;
    fullName: string;
    employeeId: string;
    email: string;
    startDate: string;
    description: string;
    contact: string;
    status: string;
}

export interface Admin {
    [key: string]: any;
    id: number;
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

export type Data = Room[] | Booking[] | Review[] | Staff[];