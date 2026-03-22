#!/usr/bin/env bash
# Waits for the iOS Simulator to finish booting before Expo runs `simctl openurl`,
# which often times out (NSPOSIXErrorDomain 60) if called too early.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

# Wrong hostname here breaks the URL Expo Go loads (symptom: "could not connect to server").
unset REACT_NATIVE_PACKAGER_HOSTNAME EXPO_PACKAGER_PROXY_URL 2>/dev/null || true

open -a Simulator 2>/dev/null || true

UDID=$(defaults read com.apple.iphonesimulator CurrentDeviceUDID 2>/dev/null || echo "")
if [[ -n "$UDID" ]]; then
  xcrun simctl bootstatus "$UDID" -b || sleep 15
else
  sleep 15
fi

sleep 3

HOST_ARGS=(--localhost)
if [[ "${EXPO_DEV_HOST:-localhost}" == "lan" ]]; then
  HOST_ARGS=(--lan)
fi

exec npx expo start "${HOST_ARGS[@]}" --ios --port 8091 "$@"
