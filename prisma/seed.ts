// import { PrismaClient } from '@prisma/client';
//
// const prisma = new PrismaClient();
//
// async function main() {
//   // Создаём пользователя и авторизацию
//   const user = await prisma.user.create({
//     data: {
//       name: 'Assel',
//       role: 'editor',
//       auth: {
//         create: {
//           login: 'admin',
//           password: 'admin123', // в реальном проекте — хэшируй
//         },
//       },
//     },
//   });
//
//   // Создаём категорию
//   const category = await prisma.category.create({
//     data: {
//       name: 'Саясат',
//       slug: 'sayasat',
//     },
//   });
//
//   // Создаём теги
//   const tag1 = await prisma.tag.create({
//     data: { name: 'новости' },
//   });
//
//   const tag2 = await prisma.tag.create({
//     data: { name: 'интервью' },
//   });
//
//   // Создаём статью
//   await prisma.article.create({
//     data: {
//       title: 'Первая тестовая статья',
//       slug: 'pervaya-testovaya-statya',
//       excerpt: 'Краткое описание статьи',
//       content: '<p>Это тестовый контент статьи с <strong>HTML</strong></p>',
//       coverImage: 'https://example.com/image.jpg',
//       isPublished: true,
//       publishedAt: new Date(),
//       category: { connect: { id: category.id } },
//       author: { connect: { id: user.id } },
//       tags: {
//         connect: [{ id: tag1.id }, { id: tag2.id }],
//       },
//     },
//   });
//
//   console.log('✅ Данные успешно добавлены');
// }
//
// main()
//   .then(() => prisma.$disconnect())
//   .catch((e) => {
//     console.error(e);
//     prisma.$disconnect();
//     process.exit(1);
//   });
