## Starting the web app

The repo link is https://github.com/Supratim69/To-Do-List.git

Use this command on your terminal:

```bash
git clone https://github.com/Supratim69/To-Do-List.git
```

After cloning the github repo, open the repo on VSCode and use the command:

```bash
npm i
```

Add the .env file in the root folder of the repo of the format:

DATABASE_URL=""

NEXTAUTH_URL=""

AUTH_SECRET=""

AUTH_GITHUB_ID=""

AUTH_GITHUB_SECRET=""

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result by logging in using your Github

## Technologies Used

Front-end: Next.js

Back-end: Next.js API routes

Database: PostgreSQL

Styling: TailwindCSS & Shadcn (as component library)
