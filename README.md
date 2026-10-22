# Tutoring Ledger

A small installable web app for logging tutoring sessions, hours and payments.
It runs entirely on your phone: no account, no server, and it works offline.

## Put it online (one time, free, about 5 minutes)

The phone can only install the app from a web address, so the files need a home.
GitHub Pages is free and you already use GitHub.

1. On github.com, create a new **public** repository called `tutoring-ledger`.
2. On the empty repository page, click **uploading an existing file** and drag in
   everything from this folder: `index.html`, `sw.js`, `manifest.webmanifest`,
   and the `fonts` and `icons` folders. Click **Commit changes**.
3. Go to **Settings → Pages**. Under "Build and deployment", choose
   **Deploy from a branch**, pick `main` and `/ (root)`, and click **Save**.
4. After a minute or two the app is live at
   `https://<your-github-username>.github.io/tutoring-ledger/`

The repository only holds the app's code. Your students and sessions never leave the phone.

## Install it on the phone

1. Open the address above in Chrome or Samsung Internet.
2. Tap **Install app** on the blue banner. If there's no banner, open the browser menu
   and choose **Add to Home screen** / **Install app**
   (Samsung Internet: **Add page to → Home screen**).
3. Open **Tutoring** from the home screen. It runs full-screen, like any other app.

## Your data

- Everything is saved on the phone, inside the app.
- Use **Data & settings → Back up** now and then. It saves a `.json` file to Downloads;
  move it to Google Drive or email it to yourself. The app reminds you after two weeks.
- **Restore from file** loads a backup on a new phone, or after a reset.
- Uninstalling the app or clearing the browser's site data deletes the entries, so back up first.

## Updating the app later

Upload the changed files to the same repository. In `sw.js`, change
`tutoring-ledger-v1` to `v2` (and so on) so phones fetch the new version.
The update shows the next time you open the app, or the time after.

## Files

- `index.html`: the whole app (layout, styles and logic)
- `sw.js`: offline support
- `manifest.webmanifest`: app name, icon and colours for installing
- `icons/`: home-screen icons
- `fonts/`: Familjen Grotesk, Atkinson Hyperlegible and IBM Plex Mono (SIL Open Font License, see the LICENSE files)
