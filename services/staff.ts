import Staff from "../models/staff.models"
import { IStaff } from "../lib/interfaces"
import { APIError } from "../middleware/error"
import { connection } from "../config/sqldb"

export async function getStaff() {
    const staff = await connection.execute(`SELECT * FROM staff`)
    if (!staff) {
        throw new APIError("Staff not found", 404, true)
    }
    return staff
}

export async function getEmployee(id: string) {
    try {
        const employee = await connection.execute(`SELECT * FROM staff WHERE staff_id = ?`, [id])
            if (!employee) {
                throw new APIError("Employee not found", 404, true)
            }
            return employee
    } catch (err) {
        throw new APIError('Invalid employee ID', 400, true)
    }
}

export async function createEmployee(employee: IStaff) {
    const newEmployee = await connection.execute(`INSERT INTO staff (first_name, last_name, email, phone, position, department, salary) VALUES (?, ?, ?, ?, ?, ?, ?)`,
         [employee.first_name, employee.last_name, employee.email, employee.phone, employee.position, employee.department, employee.salary])
    if (!newEmployee) {
        throw new APIError("Invalid employee format", 422, true)
    }
    return newEmployee
}

export async function updateStaff(id: string, data: IStaff) {
    const updatedStaff = await connection.execute(`UPDATE staff SET first_name = ?, last_name = ?, email = ?, phone = ?, position = ?, department = ?, salary = ? WHERE staff_id = ?`,
        [data.first_name, data.last_name, data.email, data.phone, data.position, data.department, data.salary, id])
    if (!updatedStaff) {
        throw new APIError("Staff not found", 404, true)
    }
    return updatedStaff;
}

export async function deleteStaff(id: string) {
    const deletedStaff = await connection.execute(`DELETE FROM staff WHERE staff_id = ?`, [id])
    if (!deletedStaff) {
        throw new APIError("Staff not found", 404, true)
    }
    return deletedStaff
}