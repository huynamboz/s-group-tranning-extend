import * as readlineSync from 'readline-sync';

class IStudent {
  public id: number;
  public name: string;
  public age: number;
  public className: string;

  constructor(id: number, name: string, age: number, className: string) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.className = className;
  }
}

class IStudentManager {
  private students: IStudent[] = [];

  addStudent(student: IStudent): void {
    this.students.push(student);
  }

  viewStudents(): void {
    console.log("Danh sách sinh viên:");
    this.students.forEach((student) => {
      console.log(`ID: ${student.id}, Tên: ${student.name}, Tuổi: ${student.age}, Lớp: ${student.className}`);
    });
  }

  findStudentById(id: number): IStudent | undefined {
    return this.students.find((student) => student.id === id);
  }

  updateStudentInfo(id: number, newName: string, newAge: number, className: string): boolean {
    const student = this.findStudentById(id);

    if (student) {
      student.name = newName;
      student.age = newAge;
      student.className = className;
      return true;
    }

    return false;
  }

  deleteStudent(id: number): boolean {
    const index = this.students.findIndex((student) => student.id === id);

    if (index !== -1) {
      this.students.splice(index, 1);
      return true;
    }

    return false;
  }
}

// Hàm chính
function main() {
  const manager = new IStudentManager();

  while (true) {
    console.log("Menu:");
    console.log("1. Xem danh sách sinh viên");
    console.log("2. Thêm sinh viên");
    console.log("3. Sửa thông tin sinh viên");
    console.log("4. Tìm kiếm sinh viên");
    console.log("5. Xóa sinh viên");
    console.log("0. Thoát");

    const choice = readlineSync.questionInt("Nhap so de chon chuc nang: ");

    switch (choice) {
      case 1:
        manager.viewStudents();
        break;
      case 2:
        {
          const id = readlineSync.questionInt("Nhap id: ");
          const name = readlineSync.question("Nhap ten: ");
          const age = readlineSync.questionInt("Nhap tuoi: ");
          const className = readlineSync.question("Nhap lop: ");
          manager.addStudent(new IStudent(id, name, age, className));
          console.log("Đã thêm sinh viên thành công");
          break;
        }
      case 3:
        {
          const id = readlineSync.questionInt("Nhap id sinh vien can sua: ");
          const name = readlineSync.question("Nhap ten moi: ");
          const age = readlineSync.questionInt("Nhap tuoi moi: ");
          const classN = readlineSync.question("Nhap lop moi: ");
          const updated = manager.updateStudentInfo(id, name, age, classN);
          if (updated) {
            console.log("Thông tin sinh viên đã được cập nhật:");
            manager.viewStudents();
          } else {
            console.log("Không tìm thấy sinh viên cần cập nhật");
          }
        }
        break;
      case 4:
        const searchId = readlineSync.questionInt("Nhap id sinh vien can tim: ");
        const foundStudent = manager.findStudentById(searchId);
        if (foundStudent) {
          console.log("Sinh viên được tìm thấy:");
          console.log(foundStudent);
        } else {
          console.log("Không tìm thấy sinh viên");
        }
        break;
      case 5:
        const deleteId = readlineSync.questionInt("Nhap id sinh vien can xoa: ");
        const deleted = manager.deleteStudent(deleteId);
        if (deleted) {
          console.log("Sinh viên đã bị xóa:");
          manager.viewStudents();
        } else {
          console.log("Không tìm thấy sv");
        }
        break;
      case 0:
        console.log("Đã thoát chương trình");
        (process as any).exit(0);
      default:
        console.log("Chức năng không hợp lệ, vui lòng chọn lại.");
    }
  }
}

main();
