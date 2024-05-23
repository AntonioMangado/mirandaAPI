require ("./config/mongodb")
import { disconnect } from 'mongoose';
import { faker } from '@faker-js/faker';
import { IAdmin, IBooking, IRoom, IReview, IStaff } from "./lib/interfaces";
import Booking from './models/bookings.models';
import Admin from './models/admins.models';
import Room from './models/rooms.models';
import Review from './models/reviews.models';
import Staff from './models/staff.models';

const INTERVALS: number = 10;

// function generateAdmins(): IAdmin[] {
//     const admins: IAdmin[] = [];
//     for (let i = 0; i < INTERVALS; i++) {
//         admins.push({
//             username: faker.internet.userName(),
//             email: faker.internet.email(),
//             password: faker.internet.password(),
//         })
//     }
//     return admins;
// }

function generateBookings(): IBooking[] {
    const bookings: IBooking[] = [];
    for (let i = 0; i < INTERVALS; i++) {
        bookings.push({
            guest: {
                name: faker.person.firstName(),
                surname: faker.person.lastName(),
            },
            order_date: faker.date.recent().toDateString(),
            check_in: faker.date.recent().toDateString(),
            check_out: faker.date.recent().toDateString(),
            special_request: faker.lorem.sentence(4),
            room_type: faker.helpers.arrayElement(["Single Bed", "Double Bed", "Double Superior", "Suite"]),
            roomID: faker.string.uuid(),
            status: faker.helpers.arrayElement(["Check In", "Check Out", "In Progress"]),
        })
    }
    return bookings;
}

function generateRooms(): IRoom[] {
    const rooms: IRoom[] = [];
    for (let i = 0; i < INTERVALS; i++) {
        rooms.push({
            image: faker.image.urlLoremFlickr({ category: 'city' }),
            roomNumber: Math.floor(Math.random() * 100),
            roomType: faker.helpers.arrayElement(["Single Bed", "Double Bed", "Double Superior", "Suite"]),
            amenities: [faker.lorem.word(), faker.lorem.word(), faker.lorem.word()],
            price: Math.floor(Math.random() * 1000),
            offerPrice: Math.floor(Math.random() * 800),
            status: faker.helpers.arrayElement(["Available", "Booked", "Unavailable"]),
        })
    }
    return rooms;
}

function generateReviews(): IReview[] {
    const reviews: IReview[] = [];
    for (let i = 0; i < INTERVALS; i++) {
        reviews.push({
            date: faker.date.recent().toDateString(),
            customer: faker.person.fullName(),
            rating: Math.floor(Math.random() * 6),
            comment: faker.lorem.sentence(8),
        })
    }
    return reviews;
}

function generateStaff(): IStaff[] {
    const staff: IStaff[] = [];
    for (let i = 0; i < INTERVALS; i++) {
        staff.push({
            photo: faker.image.avatar(),
            fullName: faker.person.fullName(),
            email: faker.internet.email(),
            startDate: faker.date.recent().toDateString(),
            description: faker.person.jobTitle(),
            contact: faker.phone.number(),
            status: faker.helpers.arrayElement(["Active", "Inactive"]),
        })
    }
    return staff;
}

async function seedDB() {
    await Booking.deleteMany({});
    // await Admin.deleteMany({});
    await Room.deleteMany({});
    await Review.deleteMany({});
    await Staff.deleteMany({});

    // const admins = generateAdmins();
    const bookings = generateBookings();
    const rooms = generateRooms();
    const reviews = generateReviews();
    const staff = generateStaff();


    // for (const admin of admins) { // use a for of loop to trigger the pre middleware that hashes the password
    //     const newAdmin = new Admin(admin);
    //     await newAdmin.save();
    // }
    await Booking.insertMany(bookings);
    await Room.insertMany(rooms);
    await Review.insertMany(reviews);
    await Staff.insertMany(staff);

    console.log("Database seeded successfully");
    disconnect();
}

seedDB().catch(err => console.error(err));