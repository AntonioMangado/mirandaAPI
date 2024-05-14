import { staff } from "../data/staff"
import { Staff } from "../lib/interfaces"

export async function getStaff(): Promise<Staff[]> {
    return staff
}

export async function getEmployee(id: string): Promise<Staff> {
    const employee = staff.find(employee => (employee.employeeId).toLowerCase() === id)
    if (!employee) {
        throw new Error("Staff not found")
    }
    return employee
}