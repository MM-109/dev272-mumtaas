# DEV 272 – Fall 2026 Starter App

Bellevue College · Mobile Application Development Fundamentals · Tuesdays 5:30–7:40pm on Zoom

This is the starting point for every individual assignment in Weeks 1–6. You copy this repository once in Week 1 and keep building on the same app each week. Teams may also use it as the base for the team project in Weeks 7–12.

**Stack:** Expo SDK 57 · React Native 0.86 · TypeScript · Expo Router · pnpm

> [!IMPORTANT]
> **AI tools tutor here; they do not write your code.** Read [section 10](#10-ai-tools-read-this-before-you-ask-an-ai-for-help) before you ask Copilot, Claude, ChatGPT, or Cursor for help. Deleting or editing the AI files in this repo costs 50% on every assignment.

---

## 1. Prerequisites (do this before Week 1 class if you can)

| Tool | What to install | Check it works |
| --- | --- | --- |
| Node.js (LTS) | https://nodejs.org — pick the **LTS** download | `node --version` prints `v22.x` or `v24.x` |
| pnpm | `npm install -g pnpm` | `pnpm --version` prints `10.x` or higher |
| Git | https://git-scm.com/downloads (macOS: comes with Xcode Command Line Tools) | `git --version` |
| GitHub account | Sign up through the **Student Developer Pack** at https://education.github.com/pack using your **BC email**. Already have an account? Add your BC email in Settings → Emails and apply for the pack; do not make a second account. | You can sign in |
| VS Code | https://code.visualstudio.com | Open it. Install the **Expo Tools** extension when prompted |
| A way to run the app | **One** of the options below | See section 3 |

**Windows users:** run all commands in PowerShell or Windows Terminal. Do not use Git Bash for `pnpm start`.

This course uses **pnpm**, not npm or yarn. If you run `npm install` by mistake the project will stop you with a message. Run `pnpm install` instead.

## 2. Get your copy of this repo

1. Click the green **Use this template** button at the top of this page → **Create a new repository**.
2. Name it `dev272-<yourname>` (for example `dev272-zbrinlee`). Leave it **Public**, or **Private** with the instructor added as a collaborator.
3. Clone your new repository (not this one):

   ```bash
   git clone https://github.com/<your-username>/dev272-<yourname>.git
   cd dev272-<yourname>
   pnpm install
   ```

`pnpm install` takes a minute the first time. You only run it again when a `package.json` change adds a dependency.

## 3. Run the app

```bash
pnpm start
```

Expo prints a QR code and a menu. Pick one way to see the app:

| Option | How | Notes |
| --- | --- | --- |
| **Your phone (Expo Go)** | Install **Expo Go** from the App Store / Play Store. Scan the QR code (iPhone: Camera app; Android: inside Expo Go). Phone and computer must be on the same Wi-Fi. | Fastest to set up. Expo Go must support **SDK 57** — check the app's version in the store listing. If the store version lags, use a simulator (below) for now. |
| **iOS Simulator** (Mac only) | Install Xcode from the App Store, open it once to finish setup, then press `i` in the Expo terminal. | Large download. |
| **Android Emulator** | Install Android Studio, create a device in Device Manager, start it, then press `a` in the Expo terminal. | Works on Mac, Windows, Linux. |
| **Web browser** | Press `w`. | Handy for quick checks. Not a substitute for a device or simulator on assignments. |

You should see the DEV 272 home screen. Leave `pnpm start` running while you work. Saving a file reloads the app automatically. Press `r` in the terminal to reload manually, `?` to see all commands.

## 4. Week 1 assignment: make your first change

1. Open `src/app/index.tsx`.
2. Change the two lines marked `👇` (your name and your app idea). Save. Watch the screen update.
3. Commit and push:

   ```bash
   git add .
   git commit -m "Week 1: personalize home screen"
   git push
   ```

4. Submit the URL of your repository in Canvas.

## 5. How every assignment is submitted

Weeks 1–6 build on this same repo. Each week:

1. Do the work in this repo, committing as you go (small commits with clear messages).
2. Push to GitHub.
3. Submit **your repository URL** (or a link to the specific commit) in the Canvas assignment.

The instructor clones your repo and runs `pnpm install && pnpm start`. If that does not work, the assignment does not work. Before submitting, run these two checks:

```bash
pnpm exec tsc --noEmit   # TypeScript: no errors
pnpm start               # App starts and the screen renders
```

## 6. What you will add, week by week

| Week | Topic | You add to this repo |
| --- | --- | --- |
| 1 | Setup | Your copy of the template, running, with a personalized home screen |
| 2 | React Native fundamentals | A landing screen built from core components (Text, TextInput, Button, ScrollView) and Flexbox layout |
| 3 | Navigation and state | Expo Router stack + tabs, a detail screen that receives route params, `useState`/`useEffect` state |
| 4 | User input | A form with validation that creates items held in state |
| 5 | Data and storage | Supabase as the remote database, TanStack Query for fetching/caching, AsyncStorage for local persistence |
| 6 | Code quality and testing | ESLint + Prettier, Husky pre-commit hook, Jest + React Native Testing Library unit tests |

Weeks 7–12 are the team project. Your team may start from a fresh copy of this template or from one member's Week 6 repo.

## 7. Project structure

```
src/
  app/            Screens and layouts. Every file here is a route (Expo Router).
    _layout.tsx   Root layout: the navigation Stack.
    index.tsx     Home screen, route "/".
assets/           App icon, splash image, favicon.
app.json          Expo app config (name, icon, plugins).
package.json      Dependencies and scripts. Run scripts with `pnpm <name>`.
tsconfig.json     TypeScript config. `@/` points at `src/`.
AGENTS.md         Rules for AI coding assistants: tutor, do not write code. Leave it in place.
CLAUDE.md         Loads AGENTS.md for Claude Code. Leave it in place.
.github/          Issue templates and copilot-instructions.md (same rules for Copilot Chat).
.vscode/          Editor settings, including Copilot inline completions turned off.
```

Put components, hooks, and utilities in `src/` next to `app/` (for example `src/components/`). Only screens and layouts go in `src/app/`.

## 8. Common problems

| Symptom | Fix |
| --- | --- |
| `npm install` prints "Use pnpm instead" | Run `pnpm install`. |
| `pnpm: command not found` | Install pnpm: `npm install -g pnpm`, then reopen the terminal. |
| Expo Go says the project uses an unsupported SDK | Your Expo Go app and this project are on different SDK versions. Update Expo Go from the store, or use a simulator/emulator. |
| Phone cannot connect / QR code does nothing | Same Wi-Fi network as the computer? Try `pnpm start --tunnel`. |
| Red error screen after editing | Read the first line of the error. Undo the last change, save, and reapply it in smaller steps. |
| Weird cache behavior | Stop the server, run `pnpm start --clear`. |
| Nothing works | Delete `node_modules/`, run `pnpm install`, then `pnpm start --clear`. |

## 9. Getting help

- Class time and office hours (see Canvas syllabus).
- Post in the **Q&A + Blockers** discussion in Canvas (pinned in the Resources module). Include the exact error text, your OS, and what you tried. Classmates and the instructor watch it.
- Expo docs for SDK 57: https://docs.expo.dev/versions/v57.0.0/
- React Native docs: https://reactnative.dev/docs/getting-started

---

## 10. AI tools: read this before you ask an AI for help

> [!CAUTION]
> **Do not alter or delete any AI-related file in this repository.**
> If `AGENTS.md`, `CLAUDE.md`, `.github/copilot-instructions.md`, or the Copilot settings in `.vscode/settings.json` are changed or removed, **every assignment submitted from that repository automatically loses 50% of its grade.** This applies to your Week 7 team repository too, where these files are also a graded requirement.

> [!IMPORTANT]
> **AI tools are learning assistants in this course, not code generators.**
> Copilot, ChatGPT, Claude, Cursor, and similar tools are welcome for explaining concepts, reviewing code you wrote, helping you read an error, and finding the right docs. They are not allowed to write, complete, or rewrite your code. You write every line, you must be able to explain every line, and you cite significant AI help in your README. Full policy: the course syllabus in Canvas.

| File | What it does |
| --- | --- |
| `AGENTS.md` | The rules. Read by Claude Code, Cursor, Codex, Copilot's agent, and others. |
| `CLAUDE.md` | Loads `AGENTS.md` for Claude Code. |
| `.github/copilot-instructions.md` | The same rules for Copilot Chat in VS Code. |
| `.vscode/settings.json` | Turns off Copilot inline completions for this workspace. |

If an AI tool starts writing code for you anyway, stop, and ask it to explain instead. That is the tool ignoring the rules, and the grade is still yours.

# Adhkar

DEV 272 | Mobile Application Development  
Bellevue College | Fall 2026

## About the App

Adhkar is a mobile application designed to make the remembrance of Allah accessible and convenient.

The app includes a digital dhikr counter, a searchable collection of dhikr phrases, supplications from Hisnul Muslim, and a daily dua.

Users can select a dhikr phrase, count their repetitions, create new dhikr entries, and continue their progress after closing and reopening the app.

## Technologies

- React Native 0.86
- Expo SDK 57
- TypeScript
- Expo Router
- pnpm
- Supabase
- TanStack Query
- AsyncStorage
- React Hook Form
- Zod

## Features

### Dhikr Counter

The Home screen includes a digital tasbih counter. Users can select a dhikr phrase and tap the counter to increase their repetitions.

The app displays a completion message when the selected target is reached.

### Dhikr Library

Dhikr phrases are retrieved from Supabase and displayed in a searchable library.

Users can open individual phrases to view their meaning, reference, and suggested target.

The library supports loading, error, empty, and pull-to-refresh states.

### Add New Dhikr

Users can create new dhikr entries using a validated form.

Each entry includes:

- Dhikr name
- Meaning
- Hadith or reference
- Target count
- Favorite selection

New entries are saved to Supabase and become available in the dhikr library.

### Persistent Progress

AsyncStorage saves the selected dhikr phrase and repetition counts.

Progress remains available after the application is closed and reopened.

### Duas

The Duas section includes supplications and instructions organized by chapters from Hisnul Muslim.

The app displays Arabic text, transliteration, English translations, and references when available.

### Dua of the Day

The Home screen displays a daily supplication with Arabic text, pronunciation, translation, and reference.

The card can be flipped to view additional information.

## Week 5: Supabase Setup

The application uses Supabase to store and retrieve dhikr entries.

Follow these instructions to create the database.

### 1. Create a Supabase Project

1. Visit https://supabase.com
2. Sign in or create an account.
3. Create a new project.
4. Wait for the database to finish initializing.
5. Open the SQL Editor.

### 2. Create the Dhikr Table

Run the following SQL in the SQL Editor of a new project.

```sql
CREATE TABLE public.dhikr (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  meaning TEXT NOT NULL,
  hadith TEXT NOT NULL,
  target INTEGER NOT NULL DEFAULT 100,
  "isFavorite" BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  CONSTRAINT dhikr_target_range
    CHECK (target BETWEEN 1 AND 1000),

  CONSTRAINT dhikr_name_not_empty
    CHECK (length(trim(name)) > 0)
);
```

The table includes a UUID primary key, creation timestamp, and constraints that prevent empty names and target counts outside the allowed range.

### 3. Enable Row Level Security

Run the following SQL after creating the table.

```sql
ALTER TABLE public.dhikr
ENABLE ROW LEVEL SECURITY;

GRANT SELECT ON TABLE public.dhikr TO anon;

GRANT INSERT ON TABLE public.dhikr TO anon;

CREATE POLICY "Allow public dhikr reading"
ON public.dhikr
FOR SELECT
TO anon
USING (true);

CREATE POLICY "Allow public dhikr creation"
ON public.dhikr
FOR INSERT
TO anon
WITH CHECK (true);
```

These policies allow anonymous users to read existing dhikr entries and create new ones.

The app does not require users to create an account.

### 4. Insert the Initial Dhikr Data

Run the following SQL to populate the table with eight initial dhikr phrases.

```sql
INSERT INTO public.dhikr
  (name, meaning, hadith, target, "isFavorite")
VALUES
  (
    'Subhanallah',
    'Glory be to Allah',
    'Whoever says ''Subhanallah wa bihamdihi'' 100 times a day, his sins will be forgiven even if they are like the foam of the sea.',
    33,
    TRUE
  ),
  (
    'Alhamdulillah',
    'Praise be to Allah',
    'Alhamdulillah fills the scale, and Subhanallah and Alhamdulillah fill what is between the heavens and the earth.',
    33,
    TRUE
  ),
  (
    'Allahu Akbar',
    'Allah is the Greatest',
    'The most beloved words to Allah are four: Subhanallah, Alhamdulillah, La ilaha illallah, and Allahu Akbar.',
    34,
    TRUE
  ),
  (
    'Astaghfirullah',
    'I seek forgiveness from Allah',
    'If anyone constantly seeks forgiveness, Allah will appoint for him a way out of every distress and a relief from every anxiety.',
    100,
    FALSE
  ),
  (
    'La ilaha illallah',
    'There is no deity except Allah',
    'The best remembrance is the remembrance of La ilaha illallah.',
    100,
    TRUE
  ),
  (
    'Subhanallahi wa bihamdihi',
    'Glory and praise be to Allah',
    'Two phrases are light on the tongue, heavy on the scale, and beloved to the Most Merciful.',
    100,
    FALSE
  ),
  (
    'La hawla wala quwwata illa billah',
    'There is no power and no strength except with Allah',
    'It is a treasure from the treasures of Paradise.',
    100,
    FALSE
  ),
  (
    'Allahumma salli ''ala Muhammad',
    'O Allah, send blessings upon Muhammad',
    'Whoever sends blessings upon me once, Allah will send blessings upon him tenfold.',
    100,
    TRUE
  );
```

### 5. Verify the Database

Run this query to confirm the records were inserted successfully.

```sql
SELECT id, name, target, created_at
FROM public.dhikr
ORDER BY created_at;
```

The initial setup should return eight records. Additional records can be created through the app.

## Environment Variables

Create a `.env` file in the project root.

Add the following variables:

```env
EXPO_PUBLIC_SUPABASE_URL=your_supabase_project_url
EXPO_PUBLIC_SUPABASE_KEY=your_supabase_publishable_key
```

To find these values:

1. Open the Supabase project dashboard.
2. Find the project URL and publishable API key in the project's API settings or Connect panel.
3. Copy the values into the `.env` file.

The `.env` file is excluded from Git using `.gitignore`.

Do not commit environment variable values to GitHub.

Use the Supabase publishable key.

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/MM-109/dev272-mumtaas.git
cd dev272-mumtaas
```

### 2. Install Dependencies

Make sure Node.js LTS and pnpm are installed.

```bash
pnpm install
```

### 3. Configure Supabase

Create the `.env` file using the environment variables described above.

Make sure the Supabase table, security policies, and initial records have been created.

### 4. Start the Application

```bash
pnpm start
```

Expo will display a QR code.

Scan the code using Expo Go on a supported Android or iPhone device.

The phone and computer should be connected to the same Wi-Fi network.

### 5. Verify TypeScript

```bash
pnpm exec tsc --noEmit
```

A successful check finishes without reporting errors.

## Week 5 Architecture

### Supabase

Supabase stores the shared dhikr library.

The `public.dhikr` table contains the phrase name, meaning, hadith or reference, target, favorite status, and creation timestamp.

### API Functions

The `src/api/dhikr.ts` file contains the typed functions used to communicate with Supabase:

- `fetchDhikr` retrieves all dhikr entries.
- `fetchDhikrById` retrieves a single entry.
- `createDhikr` inserts a new entry.

Screens use these functions rather than accessing the Supabase database directly.

### TanStack Query

TanStack Query manages remote data fetching and caching.

The root layout includes `QueryClientProvider`.

The dhikr list uses `useQuery` to retrieve records and supports refreshing.

The detail screen retrieves individual records using their IDs.

The Add New Dhikr form uses `useMutation` to insert records and invalidates the cached list after a successful submission.

### AsyncStorage

AsyncStorage manages client-owned progress rather than the shared dhikr library.

The `DhikrContext` provider saves and restores:

- Selected dhikr phrase
- Repetition counts for individual phrases

The app retrieves previously saved progress when it starts and automatically saves changes as the user continues counting. 

This allows users to resume their dhikr sessions after restarting the app.

## Project Structure

```text
src/
  api/
    dhikr.ts

  app/
    (drawer)/
      index.tsx
      dhikr.tsx
      duas.tsx

    dhikr/
      [id].tsx

    dua/
      category/
        [id].tsx

    _layout.tsx
    add.tsx
    search.tsx

  context/
    DhikrContext.tsx

  data/
    catalogue.json
    dailyDua.ts
    dhikr.ts
    duas.ts

  lib/
    supabase.ts
```

## Testing

The application has been tested on a physical mobile device using Expo Go.

The following functionality has been checked:

- Loading dhikr entries from Supabase
- Opening individual dhikr details
- Creating new dhikr entries
- Displaying newly created entries from the database
- Searching and selecting dhikr phrases
- Incrementing the counter
- Displaying the target completion message
- Preserving selected phrases and counts after restarting the app
- Navigating between screens
- Viewing supplications by category

TypeScript can be checked using:

```bash
pnpm exec tsc --noEmit
```

## References

- Expo: https://docs.expo.dev/
- React Native: https://reactnative.dev/
- Supabase: https://supabase.com/docs
- TanStack Query: https://tanstack.com/query/latest
- React Native AsyncStorage: https://react-native-async-storage.github.io/async-storage/
- Hisnul Muslim: https://myislam.org/hisnul-muslim/
- OpenDua (Hisnul Muslim dataset): https://opendua.org/

## Author

Mumtaas  Mohamud
DEV 272 | Bellevue College
