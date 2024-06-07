import { connection } from '../config/sqldb'
import { faker } from '@faker-js/faker';
import { IBooking, IRoom, IReview, IStaff } from "../lib/interfaces";
const INTERVALS: number = 10;


// Create tables if they dont exist /////////////////////////////////////////////////////////////////////////////////
const createBookingsTable = async () => {
        const sql = `CREATE TABLE IF NOT EXISTS bookings (
            booking_id INT AUTO_INCREMENT PRIMARY KEY,
            guest VARCHAR(255) NOT NULL,
            order_date VARCHAR(255) NOT NULL,
            check_in VARCHAR(255) NOT NULL,
            check_out VARCHAR(255) NOT NULL,
            room_type VARCHAR(255) NOT NULL,
            room_id INT NOT NULL,
            status VARCHAR(255) NOT NULL,
            special_request VARCHAR(500),
            CONSTRAINT fk_rooms FOREIGN KEY (room_id) REFERENCES rooms(room_id)
        );`
        
        connection.query(sql, (err, result) => {
            if (err) throw err;
            console.log("Bookings table created");
        });
}

const createRoomsTable = async () => {
    const sql = `CREATE TABLE IF NOT EXISTS rooms (
        room_id INT AUTO_INCREMENT PRIMARY KEY,
        image VARCHAR(255) NOT NULL,
        room_number INT NOT NULL,
        room_type VARCHAR(255) NOT NULL,
        amenities VARCHAR(255) NOT NULL,
        price INT NOT NULL,
        offer_price INT NOT NULL,
        status VARCHAR(255) NOT NULL,
        staff_id INT NOT NULL,
        CONSTRAINT fk_staff FOREIGN KEY (staff_id) REFERENCES staff(staff_id)
    );`
    
    connection.query(sql, (err, result) => {
        if (err) throw err;
        console.log("Rooms Table created");
    });
}

const createReviewsTable = async () => {
        const sql = `CREATE TABLE IF NOT EXISTS reviews (
            review_id INT AUTO_INCREMENT PRIMARY KEY,
            booking_id INT NOT NULL,
            rating INT NOT NULL,
            review VARCHAR(500) NOT NULL,
            CONSTRAINT fk_bookings FOREIGN KEY (booking_id) REFERENCES bookings(booking_id)
        );`
        
        connection.query(sql, (err, result) => {
            if (err) throw err;
            console.log("Reviews Table created");
        });
}

const createStaffTable = async () => {
        const sql = `CREATE TABLE IF NOT EXISTS staff (
            staff_id INT AUTO_INCREMENT PRIMARY KEY,
            fullname VARCHAR(255) NOT NULL,
            start_date VARCHAR(255) NOT NULL,
            description VARCHAR(255) NOT NULL,
            contact INT NOT NULL,
            status VARCHAR(255) NOT NULL
        );`
        
        connection.query(sql, (err, result) => {
            if (err) throw err;
            console.log("Staff Table created");
        });
}


// Generate data to insert into tables /////////////////////////////////////////////////////////////////////////////////
function generateRoomsToInsert() {
    const rooms = [];
    for (let i = 0; i < INTERVALS; i++) {
        rooms.push(
            faker.image.urlLoremFlickr({ category: 'city' }),
            i + 1,
            faker.helpers.arrayElement(["Single Bed", "Double Bed", "Double Superior", "Suite"]),
            faker.lorem.words(3),
            Math.floor(Math.random() * 1000),
            Math.floor(Math.random() * 800),
            faker.helpers.arrayElement(["available", "booked",]),
            1
        )
    }
    return rooms;
}

function generateBookingsToInsert() {
    const bookings = [];
    for (let i = 0; i < INTERVALS; i++) {
        bookings.push(
            faker.person.fullName(),
            faker.date.recent().toDateString(),
            faker.date.recent().toDateString(),
            faker.date.recent().toDateString(),
            faker.helpers.arrayElement(["Single Bed", "Double Bed", "Double Superior", "Suite"]),
            faker.number.int({ max: 10 }),
            faker.helpers.arrayElement(["Check In", "Check Out", "In Progress"]),
            faker.lorem.sentence(4),
        )
    }
    return bookings;
}


function generateReviewsToInsert() {
    const reviews = [];
    for (let i = 0; i < INTERVALS; i++) {
        reviews.push(
            faker.number.int({ max: 10 }),
            faker.number.int({ max: 5 }),
            faker.lorem.sentence(8)
        )
    }
    return reviews;
}

function generateStaffToInsert() {
    const staff = [];
    for (let i = 0; i < INTERVALS; i++) {
        staff.push(
            faker.person.fullName(),
            faker.date.recent().toDateString(),
            faker.person.jobTitle(),
            faker.number.int({ min: 100, max: 500 }),
            faker.helpers.arrayElement(["Active", "Inactive"]),
        )
    }
    return staff;
}


// Insert data into db /////////////////////////////////////////////////////////////////////////////////////////////////
const insertIntoStaff = async () => {

    const generatePlaceholders = (num: number) => {
        let values = '(?, ?, ?, ?, ?)';
        for (let i = 0; i < num - 1; i++) {
            values += ', (?, ?, ?, ?, ?)';
        }
        return values;
    }
    
    const placeholders = generatePlaceholders(INTERVALS);
    const sql = 'INSERT INTO `staff`(`fullname`, `start_date`, `description`, `contact`, `status`) VALUES ' + placeholders;
    const values = generateStaffToInsert();
    console.log(values.length);

    connection.execute(sql, values, (err, result, fields) => {
    if (err instanceof Error) {
        console.log(err);
        return;
    }
    console.log(result);
    });
}

const insertIntoRooms = async () => {

    const generatePlaceholders = (num: number) => {
        let values = '(?, ?, ?, ?, ?, ?, ?, ?)';
        for (let i = 0; i < num - 1; i++) {
            values += ', (?, ?, ?, ?, ?, ?, ?, ?)';
        }
        return values;
    }
    
    const placeholders = generatePlaceholders(INTERVALS);
    const sql = 'INSERT INTO `rooms`(`image`, `room_number`, `room_type`, `amenities`, `price`, `offer_price`, `status`, `staff_id`) VALUES ' + placeholders;
    const values = generateRoomsToInsert();

    connection.execute(sql, values, (err, result, fields) => {
    if (err instanceof Error) {
        console.log(err);
        return;
    }
    console.log(result);
    });
}

const insertIntoBookings = async () => {

    const generatePlaceholders = (num: number) => {
        let values = '(?, ?, ?, ?, ?, ?, ?, ?)';
        for (let i = 0; i < num - 1; i++) {
            values += ', (?, ?, ?, ?, ?, ?, ?, ?)';
        }
        return values;
    }
    
    const placeholders = generatePlaceholders(INTERVALS);
    const sql = 'INSERT INTO `bookings`(`guest`, `order_date`, `check_in`, `check_out`, `room_type`, `room_id`, `status`, `special_request`) VALUES ' + placeholders;
    const values = generateBookingsToInsert();

    connection.execute(sql, values, (err, result, fields) => {
    if (err instanceof Error) {
        console.log(err);
        return;
    }
    console.log(result);
    });
    
}

const insertIntoReviews = async () => {

    const generatePlaceholders = (num: number) => {
        let values = '(?, ?, ?)';
        for (let i = 0; i < num - 1; i++) {
            values += ', (?, ?, ?)';
        }
        return values;
    }
                   
    const placeholders = generatePlaceholders(INTERVALS);
    const sql = 'INSERT INTO `reviews`(`booking_id`, `rating`, `review`) VALUES ' + placeholders;
    const values = generateReviewsToInsert();

    connection.execute(sql, values, (err, result, fields) => {
    if (err instanceof Error) {
        console.log(err);
        return;
    }
    console.log(result);
    });
}

createStaffTable();
createRoomsTable();
createBookingsTable();
createReviewsTable();
insertIntoStaff();
insertIntoRooms();
insertIntoBookings();
insertIntoReviews();
connection.end();