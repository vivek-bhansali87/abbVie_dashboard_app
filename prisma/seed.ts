import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create Departments
  const salesDept = await prisma.department.create({
    data: { name: "Sales" },
  });

  const marketingDept = await prisma.department.create({
    data: { name: "Marketing" },
  });

  const itDept = await prisma.department.create({
    data: {
      name: "IT",
      childDepartments: {
        create: [{ name: "Development" }, { name: "Infrastructure" }],
      },
    },
  });

  // Create Users
  const user1 = await prisma.user.create({
    data: {
      username: "john_doe",
      email: "john@example.com",
      role: "VIEWER",
      department: { connect: { id: salesDept.id } },
    },
  });

  const user2 = await prisma.user.create({
    data: {
      username: "jane_smith",
      email: "jane@example.com",
      role: "EDITOR",
      department: { connect: { id: marketingDept.id } },
    },
  });

  const user3 = await prisma.user.create({
    data: {
      username: "admin_user",
      email: "admin@example.com",
      role: "ADMIN",
      department: { connect: { id: itDept.id } },
    },
  });

  // Create KPIs
  const kpi1 = await prisma.kPI.create({
    data: {
      name: "Sales Growth",
      description: "Measures the increase in sales over time",
      accessLevel: "PUBLIC",
      authorizedRoles: JSON.stringify(["VIEWER", "EDITOR", "ADMIN"]),
      authorizedDepartments: JSON.stringify([salesDept.id, marketingDept.id]),
      metricIds: JSON.stringify(["metric1", "metric2"]),
      visualizations: JSON.stringify([{ type: "line", config: {} }]),
      businessQuestions: JSON.stringify(["What is our sales trend?"]),
      calculations: "Calculation logic here",
      affiliateApplicability: JSON.stringify(["US", "EU"]),
    },
  });

  const kpi2 = await prisma.kPI.create({
    data: {
      name: "Customer Retention",
      description: "Tracks the percentage of customers retained",
      accessLevel: "RESTRICTED",
      authorizedRoles: JSON.stringify(["EDITOR", "ADMIN"]),
      authorizedDepartments: JSON.stringify([salesDept.id]),
      metricIds: JSON.stringify(["metric3"]),
      visualizations: JSON.stringify([{ type: "pie", config: {} }]),
      businessQuestions: JSON.stringify([
        "How well are we retaining customers?",
      ]),
      calculations: "Calculation logic here",
      affiliateApplicability: JSON.stringify(["US", "APAC"]),
    },
  });

  // Create LibraryHighlights
  await prisma.libraryHighlight.createMany({
    data: [
      {
        kpiId: kpi1.id,
        type: "FEATURED",
        order: 1,
        startDate: new Date("2023-01-01"),
        endDate: new Date("2024-12-31"),
      },
      {
        kpiId: kpi2.id,
        type: "TRENDING",
        order: 2,
        startDate: new Date("2023-01-01"),
        endDate: new Date("2024-12-31"),
      },
    ],
  });

  // Create Favorites
  await prisma.favorite.createMany({
    data: [
      { userId: user1.id, kpiId: kpi1.id },
      { userId: user2.id, kpiId: kpi2.id },
    ],
  });

  // Create AccessRequest
  await prisma.accessRequest.create({
    data: {
      userId: user1.id,
      kpiId: kpi2.id,
      requestedAt: new Date("2023-06-01"),
      reason: "Need for project analysis",
      status: "PENDING",
      expiresAt: new Date("2023-12-31"),
    },
  });

  // Create AccessPolicy
  await prisma.accessPolicy.create({
    data: {
      name: "Default Policy",
      rules: JSON.stringify({
        roles: ["ADMIN"],
        departments: [itDept.id],
        accessLevels: ["PUBLIC", "RESTRICTED"],
      }),
    },
  });

  // await prisma.layout.create({
  //   data: {
  //     name: "Default Layout",
  //     user: { connect: { id: user1.id } },
  //     kpiIds: JSON.stringify([kpi1.id, kpi2.id]),
  //   },
  // });

  console.log("Seed data inserted successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
