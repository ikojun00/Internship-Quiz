import { PrismaClient, Role, QuestionType } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  await prisma.userQuizScore.deleteMany();
  await prisma.question.deleteMany();
  await prisma.quiz.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  const hashedAdminPassword = await bcrypt.hash('Admin123', 10);
  const hashedUserPassword = await bcrypt.hash('User1234', 10);

  const admin = await prisma.user.create({
    data: {
      username: 'admin',
      password: hashedAdminPassword,
      role: Role.ADMIN,
    },
  });

  const user1 = await prisma.user.create({
    data: {
      username: 'john_doe',
      password: hashedUserPassword,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      username: 'jane_smith',
      password: hashedUserPassword,
    },
  });

  const generalKnowledge = await prisma.category.create({
    data: {
      name: 'General Knowledge',
      quizzes: {
        create: [
          {
            title: 'World Capitals',
            questions: {
              create: [
                {
                  text: 'What is the capital of France?',
                  type: QuestionType.ABC,
                  options: JSON.stringify([
                    'London',
                    'Paris',
                    'Berlin',
                    'Madrid',
                  ]),
                  correctAnswer: '1',
                  points: 10,
                },
                {
                  text: 'The capital of Japan is ______',
                  type: QuestionType.FILL_IN,
                  options: '',
                  correctAnswer: 'Tokyo',
                  points: 15,
                },
                {
                  text: 'What is the capital of Italy?',
                  type: QuestionType.ABC,
                  options: JSON.stringify([
                    'Milan',
                    'Venice',
                    'Rome',
                    'Naples',
                  ]),
                  correctAnswer: '2',
                  points: 10,
                },
                {
                  text: 'The capital of Croatia is ______',
                  type: QuestionType.FILL_IN,
                  options: '',
                  correctAnswer: 'Zagreb',
                  points: 15,
                },
                {
                  text: 'What is the capital of Canada?',
                  type: QuestionType.FILL_IN,
                  options: '',
                  correctAnswer: 'Ottawa',
                  points: 15,
                },
              ],
            },
          },
        ],
      },
    },
    include: { quizzes: { include: { questions: true } } },
  });

  const scienceCategory = await prisma.category.create({
    data: {
      name: 'Science',
      quizzes: {
        create: [
          {
            title: 'Basic Physics',
            questions: {
              create: [
                {
                  text: 'What is the SI unit of force?',
                  type: QuestionType.ABC,
                  options: JSON.stringify([
                    'Joule',
                    'Newton',
                    'Watt',
                    'Pascal',
                  ]),
                  correctAnswer: '1',
                  points: 10,
                },
                {
                  text: 'Gravity on Earth is approximately ______ m/s²',
                  type: QuestionType.SLIDER,
                  options: JSON.stringify({ min: 0, max: 20, step: 0.1 }),
                  correctAnswer: '9.8',
                  points: 20,
                },
                {
                  text: 'Which law states F = ma?',
                  type: QuestionType.ABC,
                  options: JSON.stringify([
                    "Newton's First Law",
                    "Newton's Second Law",
                    "Ohm's Law",
                    "Boyle's Law",
                  ]),
                  correctAnswer: '1',
                  points: 10,
                },
                {
                  text: 'The energy stored in an object due to its position is called ______ energy',
                  type: QuestionType.FILL_IN,
                  options: '',
                  correctAnswer: 'potential',
                  points: 15,
                },
                {
                  text: 'What is the SI unit of energy?',
                  type: QuestionType.ABC,
                  options: JSON.stringify(['Newton', 'Joule', 'Watt', 'Volt']),
                  correctAnswer: '1',
                  points: 10,
                },
              ],
            },
          },
        ],
      },
    },
    include: { quizzes: { include: { questions: true } } },
  });

  await prisma.userQuizScore.createMany({
    data: [
      {
        userId: user1.id,
        quizId: generalKnowledge.quizzes[0].id,
        score: 65,
      },
      {
        userId: user2.id,
        quizId: generalKnowledge.quizzes[0].id,
        score: 50,
      },
      {
        userId: user1.id,
        quizId: scienceCategory.quizzes[0].id,
        score: 55,
      },
    ],
  });

  console.log('Seed data created successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
