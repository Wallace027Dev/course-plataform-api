# Plataforma de Cursos

## Stack do projeto
Framework: Express
ORM: Prisma
Validação: Zod
Banco de dados: MySQL
Autenticação: JWT (jsonwebtoken)
Testes: Jest (mais pra frente)

## Rotas

### 🛡️ Autenticação (`/auth`)

#### `POST /auth/login`
Autentica o usuário e retorna os dados do usuário (sem senha) junto com o token.

- **Body esperado (`IUserLogin`)**:
```json
{
  "email": "usuario@email.com",
  "password": "senha"
}
```

- **Retorno (`IUserWithoutPassword`)**:
```json
{
  "message": "User logged in",
  "data": {
    {
      "id": 1,
      "name": "Usuário",
      "email": "usuario@email.com",
      "token": "JWT_TOKEN",
      "role": "STUDENT",
      "photoUrl": null,
      "createdAt": "2025-04-30T12:37:18.697Z",
      "updatedAt": "2025-04-30T12:37:18.703Z",
      "deletedAt": null,
    }
  }
}
```

#### `POST /auth/register`
Cadastra um novo usuário.

- **Body esperado (`IUserRegister`)**:
```json
{
  "name": "Usuário",
  "email": "usuario@email.com",
  "password": "senha"
}
```

- **Retorno**: 
```json
{
    "message": "User registered",
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNzQ2MDQ4MzUyLCJleHAiOjE3NDYwNTE5NTJ9.LFnwzKloGIcWXhI3IxpFyLDxu3lu1sma2JMTdPymXr0"
    }
}
```

---

### 🎓 Cursos (`/courses`)

#### `GET /courses/`
Lista todos os cursos cadastrados.

- **Parâmetros opcionais**:
```json
{
  "name": "Curso tal",
}
```

- **Retorno**: 
```json
{
    "message": "Courses found",
    "data": [
        {
            "id": 1,
            "name": "Programação Fullstack",
            "description": "Uma jornada épica para se tornar um verdadeiro dev fullstack. Do primeiro 'Hello World' ao deploy da sua aplicação completa, você vai aprender tudo que precisa para dominar o desenvolvimento ",
            "coverUrl": "",
            "createdAt": "2025-04-30T12:35:47.625Z",
            "updatedAt": "2025-04-30T12:35:47.625Z",
            "deletedAt": null
        }
    ]
}    
```

#### `GET /courses/:courseId`
Retorna os dados de um curso específico.

- **Retorno**: `ICourse`

#### `GET /courses/:courseId/students`
Lista os alunos matriculados em um curso.

- **Retorno**: `ICourseWithStudents`

#### `POST /courses/`
Cadastra um novo curso.

- **Body (`ICourseBase`)**:
```json
{
  "name": "Curso de JavaScript",
  "description": "Aprenda JavaScript do zero"
}
```

- **Retorno**: `ICourse`

#### `POST /courses/:courseId/students/:userId`
Matricula um usuário em um curso.

- **Retorno**: status 200 + mensagem ou dados da matrícula

#### `DELETE /courses/:courseId/students/:userId`
Remove um aluno do curso.

- **Retorno**: status 200 + mensagem de sucesso

---

### 📍 Jornadas (`/courses/:courseId/journeys`)

#### `GET /courses/:courseId/journeys`
Lista todas as jornadas associadas a um curso.

- **Retorno**: `IJourney[]`

#### `GET /courses/journeys/:journeyId`
Busca uma jornada específica pelo ID.

- **Retorno**: `IJourney`

#### `POST /courses/:courseId/journeys`
Cadastra uma nova jornada vinculada a um curso.

- **Body (`IJourneyBase`)**:
```json
{
  "name": "Jornada Frontend",
  "description": "Aprenda a criar interfaces modernas"
}
```

- **Retorno**: `IJourney`

---

### 📚 Conteúdos (`/contents`)

#### `GET /contents/`
Lista todos os conteúdos cadastrados (pode receber filtros opcionais `type` e `title`).

- **Query params** (opcional): `?type=video&title=intro`
- **Retorno**: `IContent[]`

#### `GET /contents/journey/:journeyId`
Retorna todos os conteúdos vinculados a uma jornada.

- **Retorno**: `IContent[]`

#### `POST /contents/journey`
Cria um novo conteúdo para uma jornada.

- **Body (`IContentBase`)**:
```json
{
  "title": "Introdução ao HTML",
  "type": "video",
  "url": "https://video.com",
  "journeyId": 1
}
```

- **Retorno**: `IContent`

---

### 👤 Usuários (`/users`)

#### `GET /users/`
Lista todos os usuários cadastrados (pode ser filtrado por nome).

- **Query params** (opcional): `?name=joão`
- **Retorno**: `IUserWithoutPassword[]`

#### `GET /users/:id`
Busca um usuário específico por ID.

- **Retorno**: `IUserWithoutPassword`


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