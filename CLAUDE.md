# CLAUDE.md — TikTak Mobile

This file describes the project's structure, patterns, and technical decisions for Claude Code. It's used both when writing Claude Code prompts and as a technical reference for team members (Malik, Babək, Nərmin).

## Project context

- **Project**: TikTak — Temu-style e-commerce mobile app, React Native (bare CLI)
- **Repo**: separate repo (distinct from the admin/client monorepo)
- **Backend**: `https://api.sarkhanrahimli.dev/api/tiktak` — pre-built REST API; the Postman collection (Stage 3-4 Final) is the source of truth
- **Language**: TypeScript
- **Sequence**: Figma design → Auth integration → REST API connection

## Key technical decisions

| Area          | Choice               | Note                                     |
| ------------- | -------------------- | ---------------------------------------- |
| RN setup      | Bare CLI             | No Expo                                  |
| Navigation    | React Navigation     | Auth stack + Bottom Tabs + nested stacks |
| Server state  | TanStack Query       | All API-driven data, including basket    |
| Client state  | Zustand              | Client-only state only                   |
| Local storage | MMKV                 | Token and other persisted data           |
| Styling       | Vanilla StyleSheet   | No NativeWind/Tailwind                   |
| Bottom sheet  | @gorhom/bottom-sheet | Product detail, theme/language selection |

## Structure

Screens live inside the feature they belong to — there is no separate top-level `screens/` folder. Navigation imports each screen directly from its feature and wires it into the relevant stack or tab; the routing logic itself doesn't change, only the import path.

```
src/
├── app/
│   ├── App.tsx
│   ├── providers/                  # QueryClientProvider, GestureHandlerRootView, BottomSheetModalProvider
│   └── navigation/
│       ├── RootNavigator.tsx       # Auth stack vs Main tab (based on auth store)
│       ├── AuthNavigator.tsx       # imports from features/auth/screens
│       ├── MainTabNavigator.tsx    # imports from features/{home,product,basket,profile}/screens
│       └── types.ts
│
├── features/                       # Business logic + screens, grouped by domain
│   ├── auth/
│   │   ├── screens/
│   │   ├── components/             # feature-local components, created as needed
│   │   ├── services/
│   │   │   └── auth.service.ts
│   │   ├── hooks/
│   │   │   └── auth.hooks.ts
│   │   ├── types/
│   │   │   └── auth.types.ts
│   │   └── store/
│   │       └── auth.store.ts       # token, role
│   │
│   ├── home/
│   │   ├── screens/
│   │   └── components/             # feature-local components, created as needed
│   │
│   ├── product/
│   │   ├── screens/                # ProductListScreen (no detail screen — bottom sheet instead)
│   │   ├── components/
│   │   │   ├── ProductCard.tsx
│   │   │   └── ProductDetailSheet.tsx
│   │   ├── services/
│   │   │   └── product.service.ts
│   │   ├── hooks/
│   │   │   └── product.hooks.ts
│   │   └── types/
│   │       └── product.types.ts
│   │
│   ├── basket/
│   │   ├── screens/
│   │   ├── components/
│   │   │   └── CompleteOrderBanner.tsx  # renders from other screens too, shares the ['basket'] query cache
│   │   ├── services/
│   │   │   └── basket.service.ts
│   │   └── hooks/
│   │       └── basket.hooks.ts     # NO store — server-driven (TanStack Query)
│   │
│   ├── profile/
│   │   ├── screens/                # Account screen: theme + language selection opens from here (bottom sheet)
│   │   └── components/             # feature-local components, created as needed
│   │
│   ├── favorites/
│   │   ├── components/             # feature-local components, created as needed
│   │   ├── store/
│   │   │   └── favorites.store.ts  # Zustand, Set<string> pattern
│   │   └── types/
│   │       └── favorites.types.ts
│   │
│   └── settings/
│       ├── components/
│       │   ├── ThemeSelectSheet.tsx
│       │   └── LanguageSelectSheet.tsx
│       └── store/
│           ├── theme.store.ts      # MMKV persist
│           └── locale.store.ts     # MMKV persist, wired to i18next
│
├── shared/
│   ├── types/
│   │   └── api-response.type.ts
│   ├── lib/
│   │   ├── axios.ts                # axiosInstance + interceptor (token read via MMKV/Zustand)
│   │   ├── api-fetch.ts            # generic apiFetch
│   │   └── storage.ts              # MMKV instance + helpers
│   ├── components/                 # only genuinely cross-feature UI (buttons, inputs, cards)
│   ├── hooks/
│   └── constants/
│       ├── api.constants.ts        # API.CLIENT.*, API.ADMIN.* grouped by domain
│       └── routes.constants.ts
│
└── assets/
```

## Core patterns

### Basket — server-driven, no store

Basket is managed entirely through TanStack Query; there's no Zustand store for it. TanStack Query's own cache mechanism (`staleTime`, `gcTime`) minimizes request count, so no manual sync loop is needed. Set an appropriate `staleTime` (e.g. 30s), and only call `invalidateQueries` after a mutation succeeds.

### Favorites — Set pattern

`favorites.store.ts` holds product IDs as a `Set<string>` for O(1) `has()` checks. `isFavorite` is not stored as a separate field — it's computed on the fly inside `ProductCard`. `toggleFavorite` adds/removes based on current Set state.

### Product detail — bottom sheet, not a screen

There is no `ProductDetailScreen`. Tapping a card opens `ProductDetailSheet` (`useRef<BottomSheetModal>` + `.present()`) — no new screen is pushed onto the navigation stack. The sheet consumes `product.hooks`, `basket.hooks`, and `favorites.store` together, and lives in `features/product/components/` since it belongs to the product feature.

### Theme & Language — opened from the Profile screen

Both open from `features/profile/screens/` as bottom sheets, but the sheets themselves live in `features/settings/components/` since they're a settings concern, not a profile concern:

- `ThemeSelectSheet` → `theme.store` (MMKV persist)
- `LanguageSelectSheet` → `locale.store` (MMKV persist) + wired to i18next

### Shared apiFetch — same pattern as the admin panel

The admin panel's 3-layer architecture (shared `apiFetch` + feature `service` + feature `hooks`) continues unchanged here. The only difference: the interceptor reads the token from Zustand via MMKV (the admin panel reads directly from Zustand).

## Known risks (from admin panel experience)

- **Type duplication**: `Order`, `OrderItem`, and similar domain types shouldn't be redefined across feature files — keep them in one central place.
- **`mutationFn` with multiple arguments**: requires an object wrapper — don't forget this.
- **API constants**: `apiFetch` endpoint constants must not duplicate the base URL (`/api/tiktak` shouldn't appear in both `API_BASE_URL` and the endpoint strings).

## Claude Code prompt convention

All Claude Code prompts are written in **English** (to reduce token usage).

## Planning vs. implementation

During planning phases, structure is shown as a directory tree and discussed conceptually — full file implementations aren't generated unless explicitly requested.
