import dotenv from "dotenv";
dotenv.config();
import { connect, disconnect } from 'mongoose';
import { faker } from '@faker-js/faker';
import { IAdmin, IBooking, IRoom, IReview, IStaff } from "../lib/interfaces";
import Booking from '../models/bookings.models';
import Admin from '../models/admins.models';
import Room from '../models/rooms.models';
import Review from '../models/reviews.models';
import Staff from '../models/staff.models';


const INTERVALS: number = 10;

// function generateAdmins(): IAdmin[] {
//     const admins: IAdmin[] = [];
//     for (let i = 0; i < INTERVALS; i++) {
//         admins.push({
//             username: faker.internet.userName(),
//             email: faker.internet.email(),
//             password: 'admin',
//         })
//     }
//     return admins;
// }

function generateRooms(): IRoom[] {
    const rooms: IRoom[] = [];
    for (let i = 0; i < INTERVALS; i++) {
        rooms.push({
            image: faker.image.urlLoremFlickr({ category: 'city' }),
            roomNumber: i + 1,
            roomType: faker.helpers.arrayElement(["Single Bed", "Double Bed", "Double Superior", "Suite"]),
            amenities: [faker.lorem.word(), faker.lorem.word(), faker.lorem.word()],
            price: Math.floor(Math.random() * 1000),
            offerPrice: Math.floor(Math.random() * 800),
            status: faker.helpers.arrayElement(["Available", "Booked", "Unavailable"]),
        })
    }
    return rooms;
}

async function generateBookings(): Promise<IBooking[]> {
    const bookings: IBooking[] = [];
    const rooms = generateRooms();
    await Room.insertMany(rooms);
    const roomsFromDB = await Room.find({});
    const roomIDs = roomsFromDB.map(room => room._id);
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
            roomID: faker.helpers.arrayElement(roomIDs),
            status: faker.helpers.arrayElement(["Check In", "Check Out", "In Progress"]),
        })
    }
    return bookings;
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
    connect(`mongodb+srv://antoniomangado:${process.env.MONGO_PASS}@cluster0.tv7s1gr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
    await Booking.deleteMany({});
    // await Admin.deleteMany({});
    await Room.deleteMany({});
    await Review.deleteMany({});
    await Staff.deleteMany({});

    // const admins = generateAdmins();
    const bookings = await generateBookings();
    const reviews = generateReviews();
    const staff = generateStaff();


    // for (const admin of admins) { // use a for of loop to trigger the pre middleware that hashes the password
    //     const newAdmin = new Admin(admin);
    //     await newAdmin.save();
    // }
    await Booking.insertMany(bookings);
    await Review.insertMany(reviews);
    await Staff.insertMany(staff);

    console.log("Database seeded successfully");
    disconnect();
}

seedDB().catch(err => console.error(err));