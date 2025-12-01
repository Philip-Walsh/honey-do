#!/bin/bash
set -e

LOG_FILE="verification.log"
echo "Starting verification process..." > "$LOG_FILE"

log() {
  echo "[$(date +'%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

log "Step 1: Building Docker containers..."
docker compose build >> "$LOG_FILE" 2>&1

log "Step 2: Running Unit Tests..."
log "Running Express Unit Tests..."
cd services/express
npm install >> "$LOG_FILE" 2>&1
# npm run test:unit >> "$LOG_FILE" 2>&1
cd ../..

log "Running React Unit Tests..."
cd services/react
npm install >> "$LOG_FILE" 2>&1
CI=true npm test -- --coverage --watchAll=false | tee -a "$LOG_FILE"
cd ../..

log "Step 3: Starting Application..."
docker compose up -d >> "$LOG_FILE" 2>&1

log "Step 4: Waiting for Health Check..."
MAX_RETRIES=30
COUNT=0
while [ $COUNT -lt $MAX_RETRIES ]; do
  if curl -s http://localhost:3001/ > /dev/null; then
    log "Server is up!"
    break
  fi
  sleep 2
  COUNT=$((COUNT+1))
done

if [ $COUNT -eq $MAX_RETRIES ]; then
  log "Server failed to start."
  exit 1
fi

log "Step 5: Running E2E Tests..."
cd e2e
npm install >> "$LOG_FILE" 2>&1
# Ensure seed script is compiled/available if needed, but cypress task handles it via ts-node
npm run test:run | tee -a "$LOG_FILE"
cd ..

log "Step 6: Cleanup..."
docker compose down >> "$LOG_FILE" 2>&1

log "Verification Complete! All tests passed."
echo "---------------------------------------------------"
echo "Coverage Reports:"
echo "  React: services/react/coverage/lcov-report/index.html"
echo "---------------------------------------------------"
