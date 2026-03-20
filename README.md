# dental clinic (Expo)

Mobile-first dashboard for dentists and clinic staff. Patients use external channels (e.g. WhatsApp); this app focuses on schedule, patients, and operations.

## Stack

- React Native (Expo) · TypeScript
- React Navigation (tabs + patient stack)
- Mock data under `data/` (swap for API calls later)

## Run

From this folder:

```bash
npm install
npx expo start
```

Then open in Expo Go or an emulator.

## Structure

| Path | Purpose |
|------|---------|
| `components/` | `Card`, `Button`, `SectionHeader`, `AppointmentItem`, `PatientItem` |
| `screens/` | Home, Schedule, Patients, Patient detail, Activity |
| `navigation/` | Tab navigator + patients stack |
| `data/` | Mock appointments, patients, activity |
| `types/` | Shared TypeScript types |
| `theme/` | Colors, spacing, shadows |

## Next steps (API)

Replace `resolveAppointmentDates()`, `patients`, and `activityFeed` with fetch hooks and keep the same types in `types/`.
