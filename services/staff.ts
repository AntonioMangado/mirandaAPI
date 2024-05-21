import Staff from "../models/staff.models"
import { IStaff } from "../lib/interfaces"
import { APIError } from "../middleware/error"

export async function getStaff(): Promise<IStaff[]> {
    const staff = await Staff.find()
    if (!staff) {
        throw new APIError("Staff not found", 404, true)
    }
    return staff
}

export async function getEmployee(id: string): Promise<IStaff> {
    const employee = await Staff.findOne({employeeId: id.toUpperCase()})
    if (!employee) {
        throw new APIError("Employee not found", 404, true)
    }
    return employee
}

export async function createEmployee(employee: IStaff): Promise<IStaff> {
    const newEmployee = new Staff(employee)
    if (!newEmployee) {
        throw new APIError("Invalid employee format", 422, true)
    }
    return newEmployee.save()
}

export async function updateStaff(id: string, data: IStaff): Promise<IStaff> {
    const updatedStaff = await Staff.findOneAndUpdate({_id: id}, data, {returnDocument: "after"});
    if (!updatedStaff) {
        throw new APIError("Staff not found", 404, true)
    }
    return updatedStaff;
}

export async function deleteStaff(id: string): Promise<IStaff> {
    const deletedStaff = await Staff.findByIdAndDelete({_id: id});
    if (!deletedStaff) {
        throw new APIError("Staff not found", 404, true)
    }
    return deletedStaff
}