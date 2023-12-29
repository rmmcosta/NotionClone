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

1 - npx create-next-app@latest --ts

2 - npm run dev

3 - npx shadcn-ui@latest init

4 - npx shadcn-ui@latest add <component> (ex.: button)

5 - install clerk (https://clerk.com/)

6 - npm i @clerk/nextjs

7 - npm i lucide-react

8 - npm i typewriter-effect

9 - npm i openai-edge

10 - npm i drizzle-orm @neondatabase/serverless
11 - npm i -D drizzle-kit

(to run migrations: npx drizzle-kit push:pg)

12 - npm i pg
13 - npx drizzle-kit studio

14 - npm install axios
15 - npm install --save openai

16 - npm install @tiptap/react @tiptap/pm @tiptap/starter-kit

17 - create a backend node app to serve the api/completion

18 - npm i firebase

19 - npm install -D @tailwindcss/typography