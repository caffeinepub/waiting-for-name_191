# The Cosmos Network

## Current State
A full-stack React + Motoko app called "The Cosmos Network" with:
- Onboarding screen (welcome, background picker, username)
- Multiple link tabs: Links, Space, Day Dream X, Rosin, Galaxy V6, Cherri, ElderRocks
- IframePanel for opening links inside The Cosmos with a multi-tab browser bar
- ProxyContent for private searching
- Settings panel for cursor color and animated background (40 backgrounds)
- Username stored in localStorage, shown top-left
- Animated canvas backgrounds, cursor glow follower

## Requested Changes (Diff)

### Add
- A new "BookMarks" tab in the main tab navigation
- BookMarks tab UI: a password-gated view where:
  - On first visit (or when not unlocked), user sees a password prompt
  - If a password has never been set, user is prompted to create one (set password flow)
  - Once password is set and correct, bookmarks are shown
  - User can add a bookmark (title + URL)
  - User can delete individual bookmarks
  - Bookmarks are stored in localStorage encrypted/hashed with the password
  - Each new visit to the BookMarks tab requires entering the password to unlock
  - Bookmarks persist across sessions (tied to the password)
  - A "Lock" button to re-lock the bookmarks view

### Modify
- MAIN_TABS array: add `{ id: "bookmarks", label: "BookMarks" }` at the end
- MainTab type: add `"bookmarks"` variant
- AppInner render: add bookmarks tab case in AnimatePresence block

### Remove
- Nothing

## Implementation Plan
1. Add `bookmarks` to the `MainTab` union type and `MAIN_TABS` array
2. Create a `BookmarkItem` interface: `{ id: string; title: string; url: string }`
3. Implement password storage: hash the password with a simple deterministic hash (SHA-256 via Web Crypto API) and store the hash in localStorage under `cosmos_bm_pw_hash`. Store bookmarks JSON in localStorage under `cosmos_bookmarks` (plaintext is fine — the password just gates access in the UI).
4. Build `BookmarksTab` component with three views:
   - **Set Password view**: shown when no password hash is stored. User enters + confirms a new password. On submit, hash is saved.
   - **Unlock view**: shown when password hash exists but tab is locked. User enters password, hash is compared. On match, unlock.
   - **Bookmarks view**: shown when unlocked. Displays list of saved bookmarks as cards (title + URL). "Add Bookmark" button opens a small inline form (title + URL inputs). Each bookmark has a delete button. A "Lock" button re-locks the view.
5. Clicking a bookmark card opens it via `setOpenedLink` (same as other link cards — opens in IframePanel inside The Cosmos).
6. Wire up the bookmarks tab in the main render in AppInner, passing `setOpenedLink` as a prop.
