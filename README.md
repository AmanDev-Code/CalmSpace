# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/184d0962-c1b9-4eaa-841e-084c8bc6566f

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/184d0962-c1b9-4eaa-841e-084c8bc6566f) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/184d0962-c1b9-4eaa-841e-084c8bc6566f) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

# CalmSpace - Mental Wellness Platform

CalmSpace is a comprehensive mental wellness platform designed to provide accessible and effective mental health solutions for individuals in India. The platform offers a variety of services including therapy sessions, resources, blogs, and self-help tools.

## Features

- **Home Page**: Introduction to CalmSpace and its services
- **Blog**: Regularly updated mental health articles and resources
- **Services**: Detailed information about available mental health services
- **About Us**: Information about the team and mission
- **Contact**: Get in touch with mental health professionals
- **Booking**: Schedule therapy sessions with qualified professionals
- **Offline Support**: Progressive Web App (PWA) for offline access
- **EmailJS Integration**: Form submission and email notifications without a backend

## Technologies Used

- React + TypeScript
- Vite
- Tailwind CSS
- Shadcn UI components
- Lucide React icons
- Progressive Web App (PWA) features
- EmailJS for form submissions

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/your-username/calmspace-wellness.git
cd calmspace-wellness
```

2. Install dependencies:
```bash
npm install
```

3. Set up EmailJS (see EmailJS Setup section below)

4. Start the development server:
```bash
npm run dev
```

5. Build for production:
```bash
npm run build
```

## EmailJS Setup

For the contact and booking forms to work, you need to set up EmailJS:

1. Sign up for a free account at [EmailJS](https://www.emailjs.com/)
2. Create an email service in the EmailJS dashboard
3. Create two email templates:
   - Contact form template (sent to owner)
   - Booking confirmation template (sent to customer)
4. Update the `src/lib/emailjs.ts` file with your EmailJS User ID, Service ID, and Template IDs

For detailed setup instructions, please see the `EmailJS-SETUP.md` file.

## Progressive Web App (PWA)

CalmSpace is configured as a Progressive Web App, allowing users to:

- Install the app on mobile and desktop devices
- Access content offline
- Receive updates automatically

For PWA setup details, see the `PWA-SETUP.md` file.

## Android App (TWA)

CalmSpace can be converted into an Android app using Trusted Web Activities (TWA) technology, which provides a native app experience without code duplication:

- **Full-screen experience** without browser UI
- **Native look and feel** with splash screens and app icons
- **Google Sign-In** works seamlessly
- **Small app size** compared to native apps
- **Automatic updates** through the web app

To build the Android app:

1. Follow the instructions in `TWA-SETUP-GUIDE.md`
2. Run the `create-twa.bat` script (Windows) or `create-twa.sh` script (Linux/Mac)
3. Deploy the generated APK to Google Play Store or distribute directly

The TWA approach solves common authentication and redirection issues by leveraging the Chrome browser's capabilities.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
