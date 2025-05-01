
# Rotas que faltam da API

## 1. Rotas para Attempt (Tentativas de Quiz)
**Descrição:** Gerenciar as tentativas de quizzes realizadas pelos usuários.

**Rotas sugeridas:**
- `GET /attempts`: Lista todas as tentativas realizadas.
- `GET /attempts/:id`: Retorna os detalhes de uma tentativa específica.
- `POST /attempts`: Cria uma nova tentativa de quiz (associada a um usuário e a um quiz).

## 2. Rotas para Result (Resultados de Tentativas)
**Descrição:** Gerenciar os resultados das tentativas de quizzes.

**Rotas sugeridas:**
- `GET /results`: Lista todos os resultados.
- `GET /results/:id`: Retorna os detalhes de um resultado específico.
- `POST /results`: Cria um novo resultado associado a uma tentativa.
- `PUT /results/:id`: Atualiza o feedback ou a pontuação de um resultado.

## 3. Rotas para Question (Perguntas de Quiz)
**Descrição:** Gerenciar as perguntas associadas a quizzes.

**Rotas sugeridas:**
- `GET /questions`: Lista todas as perguntas.
- `GET /questions/:id`: Retorna os detalhes de uma pergunta específica.
- `POST /questions`: Cria uma nova pergunta associada a um quiz.
- `PUT /questions/:id`: Atualiza os detalhes de uma pergunta.

## 4. Rotas para Answer (Respostas de Perguntas)
**Descrição:** Gerenciar as respostas associadas às perguntas de quizzes.

**Rotas sugeridas:**
- `GET /answers`: Lista todas as respostas.
- `GET /answers/:id`: Retorna os detalhes de uma resposta específica.
- `POST /answers`: Cria uma nova resposta associada a uma pergunta.
- `PUT /answers/:id`: Atualiza os detalhes de uma resposta.

## 5. Rotas para UserProgress (Progresso do Usuário)
**Descrição:** Gerenciar o progresso dos usuários em conteúdos.

**Rotas sugeridas:**
- `GET /progress`: Lista o progresso de todos os usuários.
- `GET /progress/:userId`: Retorna o progresso de um usuário específico.
- `POST /progress`: Cria ou atualiza o progresso de um usuário em um conteúdo.

## 6. Rotas para UserCourse (Matrícula de Usuários em Cursos)
**Descrição:** Gerenciar as matrículas de usuários em cursos.

**Rotas sugeridas:**
- `GET /courses/:courseId/students`: Lista todos os usuários matriculados em um curso (já existe parcialmente).
- `POST /courses/:courseId/students`: Matricula um usuário em um curso (já existe parcialmente).

## 7. Rotas para Content (Conteúdos)
**Descrição:** Gerenciar os conteúdos de uma jornada.

**Rotas adicionais sugeridas:**
- `PUT /contents/:id`: Atualiza os detalhes de um conteúdo.

## 8. Rotas para Journey (Jornadas)
**Descrição:** Gerenciar as jornadas de um curso.

**Rotas adicionais sugeridas:**
- `PUT /journeys/:id`: Atualiza os detalhes de uma jornada.
