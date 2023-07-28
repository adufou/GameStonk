
default: 
	@echo "build                              | Build Docker images"
	@echo "logs                               | Show Logs"
	@echo "run                                | Build and Run Docker images"
	@echo "up                                 | Up Docker images"
	
# ssh:
# 	echo password : CwABo9cI3aluyqcc
# 	ssh ubuntu@5.196.67.231

build:
	@docker-compose build

logs:
	@docker-compose logs -f postgres react django

run:
	@docker-compose build
	@docker-compose up -d

up:
	@docker-compose up -d