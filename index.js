"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readlineSync = require("readline-sync");
var IStudent = /** @class */ (function () {
    function IStudent(id, name, age, className) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.className = className;
    }
    return IStudent;
}());
var IStudentManager = /** @class */ (function () {
    function IStudentManager() {
        this.students = [];
    }
    IStudentManager.prototype.addStudent = function (student) {
        this.students.push(student);
    };
    IStudentManager.prototype.viewStudents = function () {
        console.log("Danh sách sinh viên:");
        this.students.forEach(function (student) {
            console.log("ID: ".concat(student.id, ", T\u00EAn: ").concat(student.name, ", Tu\u1ED5i: ").concat(student.age, ", L\u1EDBp: ").concat(student.className));
        });
    };
    IStudentManager.prototype.findStudentById = function (id) {
        return this.students.find(function (student) { return student.id === id; });
    };
    IStudentManager.prototype.updateStudentInfo = function (id, newName, newAge, className) {
        var student = this.findStudentById(id);
        if (student) {
            student.name = newName;
            student.age = newAge;
            student.className = className;
            return true;
        }
        return false;
    };
    IStudentManager.prototype.deleteStudent = function (id) {
        var index = this.students.findIndex(function (student) { return student.id === id; });
        if (index !== -1) {
            this.students.splice(index, 1);
            return true;
        }
        return false;
    };
    return IStudentManager;
}());
// Hàm chính
function main() {
    var manager = new IStudentManager();
    while (true) {
        console.log("Menu:");
        console.log("1. Xem danh sách sinh viên");
        console.log("2. Thêm sinh viên");
        console.log("3. Sửa thông tin sinh viên");
        console.log("4. Tìm kiếm sinh viên");
        console.log("5. Xóa sinh viên");
        console.log("0. Thoát");
        var choice = readlineSync.questionInt("Nhap so de chon chuc nang: ");
        switch (choice) {
            case 1:
                manager.viewStudents();
                break;
            case 2:
                {
                    var id = readlineSync.questionInt("Nhap id: ");
                    var name_1 = readlineSync.question("Nhap ten: ");
                    var age = readlineSync.questionInt("Nhap tuoi: ");
                    var className = readlineSync.question("Nhap lop: ");
                    manager.addStudent(new IStudent(id, name_1, age, className));
                    console.log("Đã thêm sinh viên thành công");
                    break;
                }
            case 3:
                {
                    var id = readlineSync.questionInt("Nhap id sinh vien can sua: ");
                    var name_2 = readlineSync.question("Nhap ten moi: ");
                    var age = readlineSync.questionInt("Nhap tuoi moi: ");
                    var classN = readlineSync.question("Nhap lop moi: ");
                    var updated = manager.updateStudentInfo(id, name_2, age, classN);
                    if (updated) {
                        console.log("Thông tin sinh viên đã được cập nhật:");
                        manager.viewStudents();
                    }
                    else {
                        console.log("Không tìm thấy sinh viên cần cập nhật");
                    }
                }
                break;
            case 4:
                var searchId = readlineSync.questionInt("Nhap id sinh vien can tim: ");
                var foundStudent = manager.findStudentById(searchId);
                if (foundStudent) {
                    console.log("Sinh viên được tìm thấy:");
                    console.log(foundStudent);
                }
                else {
                    console.log("Không tìm thấy sinh viên");
                }
                break;
            case 5:
                var deleteId = readlineSync.questionInt("Nhap id sinh vien can xoa: ");
                var deleted = manager.deleteStudent(deleteId);
                if (deleted) {
                    console.log("Sinh viên đã bị xóa:");
                    manager.viewStudents();
                }
                else {
                    console.log("Không tìm thấy sv");
                }
                break;
            case 0:
                console.log("Đã thoát chương trình");
                process.exit(0);
            default:
                console.log("Chức năng không hợp lệ, vui lòng chọn lại.");
        }
    }
}
main();
