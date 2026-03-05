# The Cosmos Network

## Current State
- App has a Tabs layout with three tabs: Links, Movies, Proxy
- Links tab shows 5 link cards (Space, DayDream X, Galaxy V6 Classroom, Nebulo OS, Duck Duck Go) in a vertical grid
- Movies tab shows 5 free movie streaming cards (Tubi, Pluto TV, Crackle, Kanopy, Plex)
- Proxy tab shows an iframe embedding https://team.londonwhiteeagles.ca/
- Animated star particles in background
- Ambient glowing orbs in background

## Requested Changes (Diff)

### Add
- Cursor follower effect: a glowing orb that follows the mouse cursor, default color blue
- Settings panel (gear icon button, opens a modal/sheet): 
  - Color picker for cursor follower with at least 15 color options
  - Background selector with 10 animated futuristic/spooky backgrounds (e.g. moving grid, floating particles, glitch, holographic waves, nebula, matrix rain, dark forest fog, haunted static, neon city rain, void spiral)
- Animated background system: replace static orbs+stars with one of 10 selectable animated backgrounds rendered on a canvas or via CSS/JS animations

### Modify
- Remove Duck Duck Go card from the Links list (keep Space, DayDream X, Galaxy V6 Classroom, Nebulo OS — 4 links)
- Remove the Tabs component entirely (no more Movies or Proxy tabs)
- Change links layout from vertical stack to horizontal flex-wrap row (cards side by side)
- Links cards should be more compact/horizontal to fit side by side

### Remove
- Movies tab and all movie link cards
- Proxy tab and iframe
- Duck Duck Go link card

## Implementation Plan
1. Remove Tabs component; render links directly as the main content
2. Remove Duck Duck Go from links array
3. Remove movies array and PROXY_URL constant
4. Change links grid to `flex flex-wrap gap-4 justify-center` so cards sit horizontally
5. Make LinkCard more compact (smaller padding, fixed width ~280px) for horizontal layout
6. Add CursorFollower component: tracks mousemove, renders a blurred circle at cursor position, color from state
7. Add Settings state: cursorColor (default blue), backgroundIndex (default 0)
8. Add SettingsPanel component (dialog/sheet with gear button trigger):
   - 15+ color swatches for cursor follower
   - 10 background thumbnails/buttons to select animated background
9. Add AnimatedBackground component with 10 variants rendered as fixed full-screen layers
10. Wire settings state to CursorFollower and AnimatedBackground
