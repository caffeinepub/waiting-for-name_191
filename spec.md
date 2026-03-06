# The Cosmos Network

## Current State
The app is a link-launcher portal with animated backgrounds, a settings panel, an onboarding flow (Welcome → Choose Background → Username), bookmarks (localStorage, password-protected), and a group chat tab. The group chat is broken because it uses localStorage — groups and messages only exist in the creator's browser so other users can never see or join groups.

The onboarding step 3 only has a Username field. The user wants a Password field added below the username so bookmarks are protected right from the start.

## Requested Changes (Diff)

### Add
- Backend canister APIs: createGroup, joinGroup (request), approveUser, denyUser, sendMessage, listGroups, getGroupMessages, getGroup — all persistent on-chain so any user can see and join groups.
- Password field in onboarding step 3, below the username input, so the bookmarks password can be set during onboarding (optional at onboarding, but stored if provided).

### Modify
- ChatTab: replace all localStorage group/message logic with backend actor calls. Groups are fetched from the canister. Joining sends a request to the canister. The creator approves/denies from the canister data. Messages are stored and fetched from the canister.
- OnboardingOverlay step 3: add a password input field below the username field with placeholder "Bookmarks password (optional)". On completion, if password is provided, store it as the bookmarks password hash in localStorage.

### Remove
- localStorage-based group storage (GROUPS_KEY, getGroups, saveGroups, getGroupMessages, saveGroupMessages).

## Implementation Plan
1. Generate Motoko backend with group chat data structures and APIs.
2. Update ChatTab to use backend actor calls instead of localStorage.
3. Add password field to onboarding step 3, wire it to save bookmark password hash on completion.
4. Keep bookmarks themselves still in localStorage (they are per-user by design).
