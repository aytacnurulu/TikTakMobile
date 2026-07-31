# TikTak Mobile

TikTak — the mobile app for a Temu-style e-commerce platform. Part of a university final project, built with React Native (bare CLI).

## About the project

TikTak is a fully functional e-commerce mobile app where users can browse products by category, add items to their basket, place orders, and manage their favorites. The backend is provided as a ready-made REST API; the team's job is to build the three frontend surfaces that consume it (client web, admin panel, mobile app). This repo covers only the **mobile app**.

The project is built by a four-person team, following an instructor-defined sequence (Figma design → Auth integration → REST API connection) and SOLID + AGILE principles.

## Tech stack

| Area                 | Technology                                                  |
| -------------------- | ----------------------------------------------------------- |
| Framework            | React Native (bare CLI, New Architecture)                   |
| Language             | TypeScript                                                  |
| Navigation           | React Navigation (Auth stack + Bottom Tabs + nested stacks) |
| Server state         | TanStack Query (React Query)                                |
| Client state         | Zustand                                                     |
| Local storage        | MMKV                                                        |
| HTTP client          | Axios                                                       |
| Forms                | Formik + Yup                                                |
| Bottom sheet         | @gorhom/bottom-sheet                                        |
| Internationalization | i18next / react-i18next                                     |

## Backend

The mobile app consumes the following pre-built REST API:

```
https://api.sarkhanrahimli.dev/api/tiktak
```

All endpoints and response shapes are documented in the project's Postman collection (Stage 3-4 Final) — this collection is the single source of truth for the API.

## Structure

The project follows a feature-based architecture: each feature owns its screens, business logic, and (where relevant) components, with a thin shared layer for cross-cutting code. See [`CLAUDE.md`](./CLAUDE.md) for the full structure and patterns.

## Getting started

```bash
npm install
npx react-native run-android
```

iOS builds aren't tested locally (no Mac available), but the code should still compile for iOS.
