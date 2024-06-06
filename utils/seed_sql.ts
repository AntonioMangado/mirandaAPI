import { connection } from '../config/sqldb'

// Create tables if they dont exist
const createAdminsTable = async () => {
        const sql = `CREATE TABLE IF NOT EXISTS admins (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL
        );`
        
        connection.query(sql, (err, result) => {
            if (err) throw err;
            console.log("Admins Table created");
        });
}

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

const insertIntoStaff = async () => {
    
    const sql = 'INSERT INTO `staff`(`fullname`, `start_date`, `description`, `contact`, `status`) VALUES (?, ?, ?, ?, ?)';
    const values = ['Josh', '19 feb 24', 'developer', 453, 'available'];

    connection.execute(sql, values, (err, result, fields) => {
    if (err instanceof Error) {
        console.log(err);
        return;
    }
    console.log(result);
    });
}

const insertIntoRooms = async () => {
        
    const sql = 'INSERT INTO `rooms`(`image`, `room_number`, `room_type`, `amenities`, `price`, `offer_price`, `status`, `staff_id`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    const values = ['image', 1, 'single', 'wifi', 100, 80, 'available', 1];

    connection.execute(sql, values, (err, result, fields) => {
    if (err instanceof Error) {
        console.log(err);
        return;
    }
    console.log(result);
    });
}

const insertIntoBookings = async () => {
            
    const sql = 'INSERT INTO `bookings`(`guest`, `order_date`, `check_in`, `check_out`, `room_type`, `room_id`, `status`, `special_request`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    const values = ['Josh', '19 feb 24', '19 feb 24', '19 feb 24', 'single', 1, 'pending', null];

    connection.execute(sql, values, (err, result, fields) => {
    if (err instanceof Error) {
        console.log(err);
        return;
    }
    console.log(result);
    });
    
}

const insertIntoReviews = async () => {
                    
    const sql = 'INSERT INTO `reviews`(`booking_id`, `rating`, `review`) VALUES (?, ?, ?)';
    const values = [1, 5, 'good'];

    connection.execute(sql, values, (err, result, fields) => {
    if (err instanceof Error) {
        console.log(err);
        return;
    }
    console.log(result);
    });
            
    
}

createAdminsTable();
createStaffTable();
createRoomsTable();
createBookingsTable();
createReviewsTable();
insertIntoStaff();
insertIntoRooms();
insertIntoBookings();
insertIntoReviews();
connection.end();

