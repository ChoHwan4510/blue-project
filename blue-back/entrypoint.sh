#!/bin/sh

echo "🚀 Starting NestJS application with auto-migration..."

# 데이터베이스 연결 대기
echo "⏳ Waiting for database connection..."
timeout=60
counter=0

while ! nc -z $DB_HOST $DB_PORT; do
  echo "Database is unavailable - sleeping (${counter}/${timeout})"
  sleep 2
  counter=$((counter + 2))
  
  if [ $counter -ge $timeout ]; then
    echo "❌ Database connection timeout after ${timeout} seconds"
    exit 1
  fi
done

echo "✅ Database is ready!"

# TypeORM CLI 확인 및 설치
if ! command -v typeorm >/dev/null 2>&1; then
  echo "📦 Installing TypeORM CLI..."
  npm install -g typeorm typeorm-ts-node-commonjs
fi

# 애플리케이션 빌드
echo "🔨 Building application..."
if npm run build; then
  echo "✅ Build successful"
else
  echo "❌ Build failed"
  exit 1
fi

# 마이그레이션 자동 생성 및 실행
echo "📊 Checking for entity changes..."

# 마이그레이션 생성 (변경사항이 있는 경우에만)
echo "🔄 Generating migration for any entity changes..."
npm run typeorm -- migration:generate src/migrations/AutoMigration -d src/data-source.ts 2>/dev/null || echo "No entity changes detected"

# 대기 중인 모든 마이그레이션 실행
echo "🚀 Running all pending migrations..."
if npm run migration:run; then
  echo "✅ All migrations completed successfully"
else
  echo "⚠️ Migration execution completed (may be no pending migrations)"
fi

# 마이그레이션 상태 출력
echo "📋 Current migration status:"
npm run migration:show || echo "Could not show migration status"

# 개발 서버 시작
echo "🎯 Starting development server..."
exec npm run start:dev