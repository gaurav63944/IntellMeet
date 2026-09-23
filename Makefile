.PHONY: help infra-up infra-down backend-install backend-dev frontend-install frontend-dev install

help:
	@echo "IntellMeet — Day 1 commands"
	@echo "  make infra-up          Start MongoDB + Redis via Docker Compose"
	@echo "  make infra-down        Stop MongoDB + Redis"
	@echo "  make install           Install backend + frontend dependencies"
	@echo "  make backend-dev       Run backend dev server"
	@echo "  make frontend-dev      Run frontend dev server"

infra-up:
	docker compose -f infrastructure/docker/docker-compose.yml up -d

infra-down:
	docker compose -f infrastructure/docker/docker-compose.yml down

backend-install:
	cd backend && npm install

frontend-install:
	cd frontend && npm install

install: backend-install frontend-install

backend-dev:
	cd backend && npm run dev

frontend-dev:
	cd frontend && npm run dev
