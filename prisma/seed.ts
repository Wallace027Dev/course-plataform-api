import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

async function main() {
  // 🔐 Criar usuário admin
  const passwordHash = await bcrypt.hash("admin123", 10);

  const adminUser = await prisma.user.upsert({
    where: { email: "admin@admin.com" },
    update: {}, // se já existir, não faz nada
    create: {
      name: "Administrador",
      email: "admin@admin.com",
      password: passwordHash,
      role: "ADMIN",
    },
  });

  console.log(`Usuário admin criado: ${adminUser.email}`);

  // Carregar arquivos JSON
  const coursesData = JSON.parse(
    fs.readFileSync(path.join(__dirname, "data/courses.json"), "utf-8")
  );
  const fundamentalsData = JSON.parse(
    fs.readFileSync(
      path.join(__dirname, "data/fundamentosDaProgramacao.json"),
      "utf-8"
    )
  );

  // 🔁 Seed dos cursos e jornadas
  for (const course of coursesData) {
    const createdCourse = await prisma.course.create({
      data: {
        name: course.title,
        description: course.description,
        coverUrl: course.coverUrl || "",
        journeys: {
          create: course.journeys.map((journey: any) => ({
            name: journey.title,
            coverUrl: journey.coverUrl || "",
            contents: {
              create: journey.lessons.map((lesson: any, index: number) => ({
                type: "lesson",
                title: lesson.title,
                order: index + 1,
                metadata: {
                  description: lesson.description,
                  objective: lesson.objective,
                  instructor: journey.instructor,
                  level: journey.level,
                  thumb: journey.medias.thumb,
                  video: journey.medias.apresentation
                }
              }))
            }
          }))
        }
      }
    });

    console.log(`Curso criado: ${createdCourse.name}`);
  }

  // 🔁 Seed dos quizzes + perguntas + respostas
  const allQuizzes = [/* ...quizzesData, */ ...fundamentalsData];

  for (const quiz of allQuizzes) {
    const createdQuiz = await prisma.quiz.create({
      data: {
        name: quiz.name,
        questions: {
          create: quiz.questions.map((question: any) => ({
            question: question.question,
            explication: question.explication,
            answers: {
              create: question.answers.map((a: any) => ({
                text: a.text,
                correct: a.correct
              }))
            }
          }))
        }
      }
    });

    console.log(`Quiz criado: ${createdQuiz.name}`);
  }
}

main()
  .then(() => {
    console.log("Seed finalizado.");
    return prisma.$disconnect();
  })
  .catch((e) => {
    console.error("Erro no seed:", e);
    return prisma.$disconnect();
  });
