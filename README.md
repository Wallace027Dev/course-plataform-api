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

- **Retorno**:
```json
{
    "message": "Course found",
    "data": {
        "id": 1,
        "name": "Programação Fullstack",
        "description": "Uma jornada épica para se tornar um verdadeiro dev fullstack. Do primeiro 'Hello World' ao deploy da sua aplicação completa, você vai aprender tudo que precisa para dominar o desenvolvimento ",
        "coverUrl": "",
        "createdAt": "2025-04-30T12:35:47.625Z",
        "updatedAt": "2025-04-30T12:35:47.625Z",
        "deletedAt": null,
        "journeys": [
            {
                "id": 1,
                "name": "Lógica de Programação: O Início da Jornada",
                "courseId": 1,
                "coverUrl": "",
                "createdAt": "2025-04-30T12:35:47.625Z",
                "updatedAt": "2025-04-30T12:35:47.625Z",
                "deletedAt": null
            }
        ]
    }
}
```

#### `GET /courses/:courseId/students`
Lista os alunos matriculados em um curso.

- **Retorno**: 
```
{
    "message": "Students of Programação Fullstack",
    "data": {
        "id": 1,
        "name": "Programação Fullstack",
        "description": "Uma jornada épica para se tornar um verdadeiro dev fullstack. Do primeiro 'Hello World' ao deploy da sua aplicação completa, você vai aprender tudo que precisa para dominar o desenvolvimento ",
        "coverUrl": "",
        "createdAt": "2025-04-30T12:35:47.625Z",
        "updatedAt": "2025-04-30T12:35:47.625Z",
        "deletedAt": null,
        "userCourses": [
            {
                "id": 1,
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzQ2MDQ4MzI3LCJleHAiOjE3NDYwNTE5Mjd9.-Vx8pS4QqDygrtcyLO1u_y8NFYtZOdf7uJxIxkmp4Hk",
                "name": "Wallace",
                "email": "wallace@email.com",
                "password": "$2b$10$DvETjosjQCSFXEgRpVcpBulCCC9NivwBSpHgIQa1B2CPn1uSHCz0e",
                "role": "STUDENT",
                "photoUrl": null,
                "createdAt": "2025-04-30T12:37:18.697Z",
                "updatedAt": "2025-04-30T21:25:27.185Z",
                "deletedAt": null
            }
        ]
    }
}
```

#### `POST /courses/`
Cadastra um novo curso.

- **Body (`ICourseBase`)**:
```json
{
    "name": "PlayGO",
    "description": "Curso de design e inglês para iniciantes pensando no mercado",
    "coverUrl": "https://cdn.evg.gov.br/cursos/198_EVG/banner.svg"
}
```

- **Retorno**: 
```json
{
    "message": "User registered",
    "data": {
        "id": 4,
        "name": "PlayGO",
        "description": "Curso de design e inglês para iniciantes pensando no mercado",
        "coverUrl": "https://cdn.evg.gov.br/cursos/198_EVG/banner.svg",
        "createdAt": "2025-05-01T02:06:34.264Z",
        "updatedAt": "2025-05-01T02:06:34.264Z",
        "deletedAt": null,
        "journeys": [],
        "userCourses": []
    }
}
```

#### `POST /courses/:courseId/students/:userId`
Matricula um usuário em um curso.

- **Retorno**: 
```json
{
    "message": "Student tal registeres on Programação Fullstack course",
    "data": {
        "userId": 1,
        "courseId": 1
    }
}
```

#### `DELETE /courses/:courseId/students/:userId`
Remove um aluno do curso.

- **Retorno**: 
```json
{
    "message": "Student removed from curse",
    "data": {
        "userId": 1,
        "courseId": 1
    }
}
```

---

### 📍 Jornadas (`/courses/:courseId/journeys`)

#### `GET /courses/:courseId/journeys`
Lista todas as jornadas associadas a um curso.

- **Retorno**:
```json
{
    "message": "Journeys found",
    "data": [
        {
            "id": 1,
            "name": "Lógica de Programação: O Início da Jornada",
            "courseId": 1,
            "coverUrl": "",
            "createdAt": "2025-04-30T12:35:47.625Z",
            "updatedAt": "2025-04-30T12:35:47.625Z",
            "deletedAt": null
        }
    ]
}
```

#### `GET /courses/journeys/:journeyId`
Busca uma jornada específica pelo ID.

- **Retorno**:
```json
{
    "message": "Course found",
    "data": {
        "id": 1,
        "name": "Programação Fullstack",
        "description": "Uma jornada épica para se tornar um verdadeiro dev fullstack. Do primeiro 'Hello World' ao deploy da sua aplicação completa, você vai aprender tudo que precisa para dominar o desenvolvimento ",
        "coverUrl": "",
        "createdAt": "2025-04-30T12:35:47.625Z",
        "updatedAt": "2025-04-30T12:35:47.625Z",
        "deletedAt": null,
        "journeys": [
            {
                "id": 1,
                "name": "Lógica de Programação: O Início da Jornada",
                "courseId": 1,
                "coverUrl": "",
                "createdAt": "2025-04-30T12:35:47.625Z",
                "updatedAt": "2025-04-30T12:35:47.625Z",
                "deletedAt": null
            }
        ]
    }
}
```

#### `POST /courses/:courseId/journeys`
Cadastra uma nova jornada vinculada a um curso.

- **Body (`IJourneyBase`)**:
```json
{
    "name": "Fundamentos de programação",
    "courseId": 1,
    "coverUrl": "https://cdn.evg.gov.br/cursos/198_EVG/banner.svg"
}
```

- **Retorno**: `IJourney`

---

### 📚 Conteúdos (`/contents`)

#### `GET /contents/`
Lista todos os conteúdos cadastrados (pode receber filtros opcionais `type` e `title`).

- **Query params** (opcional): `?type=video&title=intro`
- **Retorno**:
```json
{
    "message": "Courses found",
    "data": [
        {
            "id": 1,
            "journeyId": 1,
            "type": "lesson",
            "title": "Arquitetura de Computadores",
            "order": 1,
            "metadata": {
                "level": "Newbie",
                "thumb": "/images/programming-logic.jpg",
                "video": "exemplo.mp4",
                "objective": "Entender a base física e lógica dos sistemas computacionais.",
                "instructor": "Wallace Vieira",
                "description": "Introdução à estrutura física e lógica dos computadores."
            },
            "quizId": null,
            "createdAt": "2025-04-30T12:35:47.625Z",
            "updatedAt": "2025-04-30T12:35:47.625Z",
            "deletedAt": null
        }
    ]
}
```

#### `GET /contents/journey/:journeyId`
Retorna todos os conteúdos vinculados a uma jornada.

- **Retorno**:
```json
{
    "message": "Content found",
    "data": [
        {
            "id": 1,
            "journeyId": 1,
            "type": "lesson",
            "title": "Arquitetura de Computadores",
            "order": 1,
            "metadata": {
                "level": "Newbie",
                "thumb": "/images/programming-logic.jpg",
                "video": "exemplo.mp4",
                "objective": "Entender a base física e lógica dos sistemas computacionais.",
                "instructor": "Wallace Vieira",
                "description": "Introdução à estrutura física e lógica dos computadores."
            },
            "quizId": null,
            "createdAt": "2025-04-30T12:35:47.625Z",
            "updatedAt": "2025-04-30T12:35:47.625Z",
            "deletedAt": null
        },
    ]
}
```

#### `POST /contents/journey`
Cria um novo conteúdo para uma jornada.

- **Body (`IContentBase`)**:
```json
{
	"journeyId": 1,
	"type": "quiz",
	"title": "Métodos de organização",
	"order": 1,
	"metadata": {
        "thumb": "https://profdanielbrandao.wordpress.com/wp-content/uploads/2019/08/microsoft-bosque-programming-language-1.jpg",
		"level": "Newbie",
		"description": "Estou fazendo um testo para o método de organização",
		"objective": "Deixar o muleque expert",
        "contentType": "pdf",
        "contentUrl": "https://www.canva.com/design/DAGIwxqBn40/mrx2vsOByNCDQZDOEdNp6w/edit?utm_content=DAGIwxqBn40&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton"
	}
}
```

- **Retorno**:
```json
{
    "message": "Content created",
    "data": {
        "id": 36,
        "journeyId": 1,
        "type": "quiz",
        "title": "Métodos de organização",
        "order": 2,
        "metadata": {
            "level": "Newbie",
            "thumb": "https://profdanielbrandao.wordpress.com/wp-content/uploads/2019/08/microsoft-bosque-programming-language-1.jpg",
            "objective": "Deixar o muleque expert",
            "contentUrl": "https://www.canva.com/design/DAGIwxqBn40/mrx2vsOByNCDQZDOEdNp6w/edit?utm_content=DAGIwxqBn40&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton",
            "contentType": "pdf",
            "description": "Estou fazendo um testo para o método de organização"
        },
        "quizId": null,
        "createdAt": "2025-05-01T02:16:17.152Z",
        "updatedAt": "2025-05-01T02:16:17.152Z",
        "deletedAt": null
    }
}
```

---

### 👤 Usuários (`/users`)

#### `GET /users/`
Lista todos os usuários cadastrados (pode ser filtrado por nome).

- **Query params** (opcional): `?name=joão`
- **Retorno**:
```json
{
    "message": "Users found",
    "data": [
        {
            "id": 1,
            "name": "Wallace",
            "email": "wallace@email.com",
            "role": "STUDENT",
            "photoUrl": null,
            "createdAt": "2025-04-30T12:37:18.697Z",
            "updatedAt": "2025-04-30T21:25:27.185Z",
            "deletedAt": null,
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzQ2MDQ4MzI3LCJleHAiOjE3NDYwNTE5Mjd9.-Vx8pS4QqDygrtcyLO1u_y8NFYtZOdf7uJxIxkmp4Hk"
        }
    ]
}
```

#### `GET /users/:id`
Busca um usuário específico por ID.

- **Retorno**:
```json
{
    "message": "User found",
    "data": {
        "id": 1,
        "name": "Wallace",
        "email": "wallace@email.com",
        "role": "STUDENT",
        "photoUrl": null,
        "createdAt": "2025-04-30T12:37:18.697Z",
        "updatedAt": "2025-04-30T21:25:27.185Z",
        "deletedAt": null,
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzQ2MDQ4MzI3LCJleHAiOjE3NDYwNTE5Mjd9.-Vx8pS4QqDygrtcyLO1u_y8NFYtZOdf7uJxIxkmp4Hk"
    }
}
```


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