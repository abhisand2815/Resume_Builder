# Resume Builder

A full-stack resume builder web application built with React and Supabase. Users can create, customize, save, and export professional resumes using multiple design templates.

---

## Features

- Three resume templates: Plain, Modern, and Professional
- Live preview that updates in real time as the form is filled
- Sections for Personal Info, Summary, Skills, Experience, Projects, Education, Certificates, Achievements, and Extracurricular Activities
- PDF export with clickable hyperlinks preserved (GitHub, LinkedIn)
- PDF backup uploaded to Supabase Storage on download
- User authentication via Supabase Auth (email and password)
- Save and manage multiple resumes per account
- Dashboard to view, edit, and delete saved resumes
- Toast notifications and confirmation modals for user actions

---

## Tech Stack

| Layer        | Technology                        |
|--------------|-----------------------------------|
| Frontend     | React 19, Vite                    |
| Styling      | Plain CSS with CSS custom properties |
| Icons        | Lucide React                      |
| PDF Export   | jsPDF, html2canvas                |
| Backend      | Supabase (Auth, Database, Storage)|

---

## Project Structure

```
resume-builder/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── AuthModal.jsx        # Sign in / Sign up modal
│   │   ├── ConfirmModal.jsx     # Delete confirmation dialog
│   │   ├── Dashboard.jsx        # Saved resumes management
│   │   ├── ModernTemplate.jsx   # Modern two-column resume template
│   │   ├── PlainTemplate.jsx    # Minimal plain resume template
│   │   ├── ProfessionalTemplate.jsx  # Classic professional template
│   │   ├── ResumeForm.jsx       # Multi-section resume input form
│   │   ├── ResumePreview.jsx    # Live preview wrapper component
│   │   └── Toast.jsx            # Notification toast component
│   ├── App.jsx                  # Root component and app state
│   ├── App.css                  # Component and layout styles
│   ├── index.css                # Global styles and CSS variables
│   ├── main.jsx                 # React entry point
│   └── supabase.js              # Supabase client configuration
├── index.html
├── package.json
└── vite.config.js
```

---

## Getting Started

### Prerequisites

- Node.js 18 or higher
- A Supabase project with the following set up:
  - Email/password authentication enabled
  - A `resumes` table in the database
  - A `resumes` storage bucket

### Supabase Database Schema

Create the following table in your Supabase project:

```sql
create table resumes (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  name text,
  data jsonb,
  template text,
  pdf_url text,
  updated_at timestamptz default now()
);
```

Enable Row Level Security and add a policy so users can only access their own rows:

```sql
alter table resumes enable row level security;

create policy "Users can manage their own resumes"
  on resumes
  for all
  using (auth.uid() = user_id);
```

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/resume-builder.git
cd resume-builder
```

2. Install dependencies:

```bash
npm install
```

3. Configure Supabase credentials in `src/supabase.js`:

```js
const supabaseUrl = 'YOUR_SUPABASE_URL'
const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY'
```

4. Start the development server:

```bash
npm run dev
```

5. Open `http://localhost:5173` in your browser.

### Build for Production

```bash
npm run build
```

The output will be in the `dist/` directory and can be deployed to any static hosting provider such as Vercel, Netlify, or GitHub Pages.

---

## Usage

1. Fill in your details using the form on the left panel.
2. Select a template (Plain, Modern, or Professional) from the preview panel.
3. The resume preview updates in real time.
4. Click **Save** to store the resume to your account (sign in required).
5. Click **Download PDF** to export the resume as a PDF file. The PDF is also backed up to cloud storage.
6. Access previously saved resumes from the **Dashboard** tab.

---

## PDF Export Notes

- PDF generation uses `html2canvas` to capture the rendered resume and `jsPDF` to produce the file.
- The CSS `transform: scale()` applied in the preview is temporarily removed before capture to ensure accurate rendering.
- Hyperlinks (GitHub, LinkedIn) are preserved as clickable annotations in the exported PDF.
- The PDF is uploaded to Supabase Storage under the authenticated user's folder.

---

## License

This project is licensed under the ISC License.
