# The Cosmos Network

## Current State
Full-featured browser app with animated backgrounds, cursor follower, onboarding, and tabs: Links, Space, Day Dream X, Rosin, Galaxy V6, Cherri, ElderRocks, BookMarks, Chat. The Chat tab is localStorage-based group chat. All links open in an iframe panel inside The Cosmos.

## Requested Changes (Diff)

### Add
- New "Cosmos" tab with a built-in AI chat assistant named Cosmos that can answer questions, write code, tell stories, do math, translate, summarize, create poems, plan, and more — all client-side, no external API required.
- Cosmos AI should feel like a powerful assistant with a unique persona tied to The Cosmos brand.
- Chat UI: message history, input bar, send button. Cosmos responds with helpful, thoughtful answers.
- Use a deterministic rule-based + template response engine that handles many categories: greetings, math, coding, jokes, stories, translation hints, weather (can't do real-time but explain), current time, facts, advice, etc.

### Modify
- Remove the "Chat" tab (group chat) from MAIN_TABS and the ChatTab component.
- Add "Cosmos" tab in its place (same position in the tab bar).

### Remove
- ChatTab component and all associated types/helpers (GroupData, ChatMessage, MY_ROOMS_KEY, getMyRooms, saveMyRooms, getRoomMessages, saveRoomMessages, computeRoomCode, encodeRoomCode, decodeRoomCode, formatTime, and unused school bypass link data).

## Implementation Plan
1. Remove the chat tab entry from MAIN_TABS, replace with `cosmos` tab.
2. Remove the MainTab union type `chat` entry, add `cosmos`.
3. Remove all chat-related state/types/functions and the ChatTab component.
4. Remove unused _schoolBypassLinks array.
5. Build a CosmosAI component with:
   - Message list (user + assistant bubbles) with scroll-to-bottom
   - Input field + Send button
   - Client-side response engine covering: math expressions, greetings, time/date, jokes, facts, coding help, creative writing, translation, definitions, advice, and a fallback.
6. Wire CosmosAI into the activeTab === "cosmos" render branch.
7. Remove unused imports (Users, Shield icons etc. that were only used in chat).
