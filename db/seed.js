import { faker } from "@faker-js/faker";
import db from "./client.js";
import { createEmployee } from "#db/queries/employees";

async function seedEmployees() {
  for (let i = 0; i < 10; i++) {
    const employee = {
      name: faker.person.fullName(),
      birthday: faker.date.birthdate({
        min: 18,
        max: 65,
        mode: "age",
      }),
      salary: faker.number.int({
        min: 30000,
        max: 100000,
      }),
    };

    await createEmployee(employee);
    console.log(`Created employee ${i + 1}: ${employee.name}`);
  }
}

try {
  console.log("Connecting to database...");
  await db.connect();

  await seedEmployees();
  console.log("🌱 Database seeded.");
} catch (error) {
  console.error("Seeding failed:", error);
  process.exitCode = 1;
} finally {
  await db.end();
}
