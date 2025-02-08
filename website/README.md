# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npx sv create

# create a new project in my-app
npx sv create my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.


`o3-mini-testing prompt`:
# Website Building Blocks:

## CSS styling laws:
### Color Palettes:
- Primary Background color: #26282B
- Secondary Background color: #353941
- Primary Accent color: #5F85DB
- Secondary Accent color: #90B8F8

## Frontend Stack:
- Tailwindcss
- SvelteKit
- Typescript

## Pages:
Summary: this is a list of pages and descriptions for each page. Think step by step and make sure to accomplish each page
- Home: 
  - A circle avatar with my profile pic. Big Text that says "Hi, My name is Jon!". Then a brief description of me (include information that you have saved from your memory). I want the circle avatar to be on the left side and the Header text and brief description of me to be on its right side. Under the big text tho, I want the text "I am interested in: " followed by a blinking "|" that randomly types out one of the strings from the following array ["AI/ML", "Full-stack development", "Physics", "Mathematics"] one at a time (that means you start from the index 0 and go to the last index). All of this has to be centered in the middle of the screen with appropriate padding to leave enough white space.
- Projects: 
  - A list of project cards with the title "Projects" at the top of the page. I want the project cards to be infinitely scrollable for however many projects I have. That means you need to have a svelte for loop to generate out all the projects I have. For now make a dummy JSON object that will have the following attributes: name and description. I will make the API myself that will get this project data for you so you do not have anything to worry about for that. I just want the project cards to be mobile responsible so it has a grid layout that will adjust when the screen size is smaller. 
- Tutoring:
  - For now, leave this blank I will figure out how I want this to be structured.

## Components:
- Profile cards: classic horizontal card that is mobile responsive and at a certain screen size it goes to a vertical card. These profile cards will contain tags that explain what the project uses (SVELTE, CSS, LLM, etc). These tags will be at the bottom of the description. 
- Buttons: basic pill buttons (make these with tailwindcss).
