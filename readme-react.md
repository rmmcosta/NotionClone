https://www.youtube.com/watch?v=qDunJ0wVIec&t=767s

What is used:

nextjs

shadcn (Tailwind)

clerk (Auth & User components)

openAI (Dall-E)

Vercel Edge Runtime

DrizzleORM

NeonDB

Firebase Storage

TipTap WYSIWYG Editor

Vercel AI SDK

Steps of creation and libraries instalation:

1 - npx create-react-app notion-clone-react --template typescript

2 - npm start

3 - npm i typewriter-effect

4 - npm i lucide-react

5 - install and configure tailwind.css

6 - install material ui (npm install @mui/material @emotion/react @emotion/styled)

8 - install clerk (https://clerk.com/)

9 - npm install @clerk/clerk-react

10 - npm i drizzle-orm @neondatabase/serverless
11 - npm i -D drizzle-kit

(to run migrations: npx drizzle-kit push:pg)

12 - npm i pg
13 - npx drizzle-kit studio

14 - npm install axios
15 - npm install --save openai

16 - npm install @tiptap/react @tiptap/pm @tiptap/starter-kit

17 - create a backend node app to serve the api/completion