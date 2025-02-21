# FileRename-AI

Harness the power of AI to automatically organize and rename your files with meaningful, context-aware names. Perfect for professionals, teams, and content creators.

[Live Demo](https://filerenameai.vercel.app) • [GitHub Repository](https://github.com/MehtabAsHellic/FileRename-AI)

## Overview

**FileRename-AI** is an innovative web application that leverages artificial intelligence to automatically rename and organize your files. Using advanced machine learning models, the platform analyzes file content—including images, documents, and PDFs—and renames them with descriptive, context-aware titles. Designed with a modern, responsive UI and smooth animations, FileRename-AI is perfect for anyone who needs to manage large numbers of files, whether you're a creative professional, a business team, or an individual looking to streamline your digital life.

---
**Harness AI to Automatically Organize and Rename Your Files.**

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen)](https://filerename.netlify.app)  
[![GitHub Repo](https://img.shields.io/badge/GitHub-Repo-blue)](https://github.com/MehtabAsHellic/FileRename-AI)  
[![License](https://img.shields.io/badge/License-MIT-yellow)](LICENSE)

---

## Technologies

[![React](https://img.shields.io/badge/React-17.0.2-blue?logo=react)](https://reactjs.org)  
[![TypeScript](https://img.shields.io/badge/TypeScript-4.5-blue?logo=typescript)](https://www.typescriptlang.org)  
[![Vite](https://img.shields.io/badge/Vite-2.9.0-ff69b4?logo=vite)](https://vitejs.dev)  
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-2.2.19-teal?logo=tailwind-css)](https://tailwindcss.com)  
[![TensorFlow.js](https://img.shields.io/badge/TensorFlow.js-3.0.0-orange?logo=tensorflow)](https://www.tensorflow.org/js)  
[![Firebase](https://img.shields.io/badge/Firebase-9.6.1-yellow?logo=firebase)](https://firebase.google.com)


## Features

- **AI-Powered File Renaming**  
  Automatically analyze file content using state-of-the-art models (e.g., Universal Sentence Encoder, Transformers) to generate meaningful names.

- **Document Analysis & Summarization**  
  Extract text from PDFs, DOCX, and image files, and provide concise summaries to help users quickly understand document contents.

- **File Conversion**  
  Seamlessly convert between file formats (PDF ↔ DOCX) to ensure your files are in the optimal format for renaming and analysis.

- **Custom Renaming Patterns**  
  Users can define their own naming patterns using tokens like `{date}`, `{category}`, `{original}`, and more for personalized file organization.

- **Firebase Authentication (Google Sign-In)**  
  Secure and optional login via Firebase, allowing users to access premium features such as file history, bulk renaming, and custom settings.

- **Modern UI/UX with Animations**  
  A visually appealing, responsive design featuring smooth animations, intuitive navigation, and interactive elements that enhance user engagement.

- **Open Source & Free**  
  Built entirely using free and open-source tools, ensuring transparency and fostering community contributions.

---

## Tech Stack

- **Frontend:**  
  - **Framework:** React with TypeScript  
  - **Bundler:** Vite  
  - **Styling:** Tailwind CSS  
  - **Animations:** CSS transitions and libraries like Framer Motion (optional)

- **Backend & AI Integration:**  
  - **AI/ML:** TensorFlow.js, Hugging Face Transformers, Universal Sentence Encoder  
  - **Document Analysis:** pdfminer.six, docx2txt, Tesseract OCR (if needed)  
  - **API Framework:** FastAPI (for server-side tasks, if applicable)

- **File Conversion:**  
  - Libraries/tools for PDF to DOCX conversion and vice versa (e.g., pdf2docx, unoconv)

- **Authentication:**  
  - Firebase Authentication (Google Sign-In)

- **Deployment:**  
  - Frontend hosted on Netlify  
  - Backend and AI services can be deployed via Docker or serverless platforms
