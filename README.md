# Plataforma de Cursos

## Stack do projeto
Framework: Express
ORM: Prisma
Validação: Zod
Banco de dados: MySQL
Autenticação: JWT (jsonwebtoken)
Testes: Jest (mais pra frente)

## Rotas esperadas
/courses
/journeys
/contents
/quizzes
/questions
/answers
/users
/auth/login
/auth/register
/attempts
/progress

## Tabelas
### Course
| Campo        | Tipo       | Descrição                         |
|--------------|------------|-----------------------------------|
| id           | number     | Identificador único do curso      |
| name         | string     | Nome do curso                     |
| description  | string     | Descrição do curso                |
| createdAt    | Date       | Data de criação                   |
| updatedAt    | Date       | Última atualização                |
| deletedAt    | Date/null  | Data de exclusão lógica (soft delete) |

### Journey
| Campo       | Tipo     | Descrição                           |
|-------------|----------|-------------------------------------|
| id          | number   | Identificador da jornada            |
| name        | string   | Nome da jornada                     |
| courseId    | number   | ID do curso associado               |
| createdAt   | Date     | Data de criação                     |
| updatedAt   | Date     | Última atualização                  |
| deletedAt   | Date/null| Exclusão lógica                     |

### Content
| Campo       | Tipo     | Descrição                           |
|-------------|----------|-------------------------------------|
| id          | number   | ID do conteúdo                      |
| journeyId   | number   | Jornada relacionada                 |
| type        | string   | Tipo (ex: "video", "quiz", "text")  |
| title       | string   | Título do conteúdo                  |
| order       | number   | Ordem sequencial                    |
| metadata    | object   | Dados extras do conteúdo            |
| createdAt   | Date     | Criação                             |
| updatedAt   | Date     | Atualização                         |
| deletedAt   | Date/null| Exclusão lógica                     |


### Quiz
| Campo       | Tipo     | Descrição                           |
|-------------|----------|-------------------------------------|
| id          | number   | ID do quiz                          |
| name        | string   | Nome do quiz                        |
| createdAt   | Date     | Criação                             |
| updatedAt   | Date     | Atualização                         |
| deletedAt   | Date/null| Exclusão lógica                     |

### Question
| Campo        | Tipo    | Descrição                           |
|--------------|---------|-------------------------------------|
| id           | number  | ID da pergunta                      |
| question     | string  | Enunciado da pergunta               |
| explication  | string  | Explicação após resposta            |
| quizId       | number  | Referência ao quiz                  |
| createdAt    | Date    | Criação                             |
| updatedAt    | Date    | Atualização                         |
| deletedAt    | Date/null| Exclusão lógica                     |

### Answer
| Campo     | Tipo    | Descrição                             |
|-----------|---------|---------------------------------------|
| id        | number  | ID da resposta                        |
| text      | string  | Texto da resposta                     |
| correct   | boolean | Se é a correta ou não                 |
| questionId| number  | Referência à pergunta                 |
| createdAt | Date    | Criação                               |
| updatedAt | Date    | Atualização                           |
| deletedAt | Date/null| Exclusão lógica                      |

### User
| Campo     | Tipo    | Descrição                             |
|-----------|---------|---------------------------------------|
| id        | number  | ID do usuário                         |
| name      | string  | Nome                                  |
| email     | string  | Email                                 |
| createdAt | Date    | Criação                               |
| updatedAt | Date    | Atualização                           |
| deletedAt | Date/null| Exclusão lógica                      |

### Attempt
| Campo     | Tipo    | Descrição                             |
|-----------|---------|---------------------------------------|
| id        | number  | ID da tentativa                       |
| userId    | number  | Usuário que tentou                    |
| quizId    | number  | Quiz respondido                       |
| timestamp | Date    | Data/hora da tentativa                |
| createdAt | Date    | Criação                               |
| updatedAt | Date    | Atualização                           |
| deletedAt | Date/null| Exclusão lógica                      |

### Result
| Campo     | Tipo    | Descrição                             |
|-----------|---------|---------------------------------------|
| id        | number  | ID do resultado                       |
| attemptId | number  | Tentativa associada                   |
| score     | number  | Nota obtida                           |
| feedback  | string  | Comentário ou feedback do sistema     |
| createdAt | Date    | Criação                               |
| updatedAt | Date    | Atualização                           |
| deletedAt | Date/null| Exclusão lógica                      |

### UserProgress
| Campo      | Tipo    | Descrição                            |
|------------|---------|--------------------------------------|
| id         | number  | ID do progresso                      |
| userId     | number  | Usuário relacionado                  |
| contentId  | number  | Conteúdo completado                  |
| completedAt| Date    | Quando foi completado                |
| createdAt  | Date    | Criação                              |
| updatedAt  | Date    | Atualização                          |
| deletedAt  | Date/null| Exclusão lógica                     |