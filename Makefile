COLOR_DEFAULT = \033[39;49m
COLOR_GREEN_BOLD = \033[32;49;1m
COLOR_YELLOW_BOLD_UNDERLINE = \033[33;49;1;4m
COLOR_DEFAULT_BOLD_ITALIC = \033[39;49;1;3m
COLOR_RESET = \e[0m

default: 
	@echo "${COLOR_YELLOW_BOLD_UNDERLINE}[Containers]${COLOR_RESET}"
	@echo "${COLOR_DEFAULT}> ${COLOR_GREEN_BOLD}build${COLOR_DEFAULT}               |-----------------------------------------|  ${COLOR_DEFAULT_BOLD_ITALIC}Build Docker images${COLOR_RESET}"
	@echo "${COLOR_DEFAULT}> ${COLOR_GREEN_BOLD}up${COLOR_DEFAULT}                  |-----------------------------------------|  ${COLOR_DEFAULT_BOLD_ITALIC}Up Docker images${COLOR_RESET}"
	@echo "${COLOR_DEFAULT}> ${COLOR_GREEN_BOLD}down${COLOR_DEFAULT}                |-----------------------------------------|  ${COLOR_DEFAULT_BOLD_ITALIC}Down Docker images${COLOR_RESET}"
	@echo "${COLOR_DEFAULT}> ${COLOR_GREEN_BOLD}run${COLOR_DEFAULT}                 |-----------------------------------------|  ${COLOR_DEFAULT_BOLD_ITALIC}Down, build and up Docker images${COLOR_RESET}"
	@echo "${COLOR_DEFAULT}> ${COLOR_GREEN_BOLD}restart${COLOR_DEFAULT}             |-----------------------------------------|  ${COLOR_DEFAULT_BOLD_ITALIC}Build and restart Docker images${COLOR_RESET}"
	@echo "${COLOR_DEFAULT}> ${COLOR_GREEN_BOLD}restart-api${COLOR_DEFAULT}         |-----------------------------------------|  ${COLOR_DEFAULT_BOLD_ITALIC}Build and restart API Docker images${COLOR_RESET}"
	@echo "${COLOR_DEFAULT}> ${COLOR_GREEN_BOLD}restart-db${COLOR_DEFAULT}          |-----------------------------------------|  ${COLOR_DEFAULT_BOLD_ITALIC}Build and restart Database Docker images${COLOR_RESET}"
	@echo "${COLOR_DEFAULT}> ${COLOR_GREEN_BOLD}restart-front${COLOR_DEFAULT}       |-----------------------------------------|  ${COLOR_DEFAULT_BOLD_ITALIC}Build and restart Front Docker images${COLOR_RESET}"
	@echo "${COLOR_DEFAULT}> ${COLOR_GREEN_BOLD}logs${COLOR_DEFAULT}                |-----------------------------------------|  ${COLOR_DEFAULT_BOLD_ITALIC}Show Logs${COLOR_RESET}"
	@echo
	@echo "${COLOR_YELLOW_BOLD_UNDERLINE}[Pgadmin & Postgres (Volumes)]${COLOR_RESET}"
	@echo "${COLOR_DEFAULT}> ${COLOR_GREEN_BOLD}init-pgadmin${COLOR_DEFAULT}        |-----------------------------------------|  ${COLOR_DEFAULT_BOLD_ITALIC}Init pgadmin folder${COLOR_RESET}"
	@echo "${COLOR_DEFAULT}> ${COLOR_GREEN_BOLD}init-postgres${COLOR_DEFAULT}       |-----------------------------------------|  ${COLOR_DEFAULT_BOLD_ITALIC}Init postgres folder${COLOR_RESET}"
	@echo "${COLOR_DEFAULT}> ${COLOR_GREEN_BOLD}init-volumes${COLOR_DEFAULT}        |-----------------------------------------|  ${COLOR_DEFAULT_BOLD_ITALIC}Init pgadmin AND postgres folder${COLOR_RESET}"
	@echo "${COLOR_DEFAULT}> ${COLOR_GREEN_BOLD}logs-pgadmin${COLOR_DEFAULT}        |-----------------------------------------|  ${COLOR_DEFAULT_BOLD_ITALIC}Show Logs with Pgadmin logs${COLOR_RESET}"
	@echo
	@echo "${COLOR_YELLOW_BOLD_UNDERLINE}[Install]${COLOR_RESET}"
	@echo "${COLOR_DEFAULT}> ${COLOR_GREEN_BOLD}install${COLOR_DEFAULT}             |-----------------------------------------|  ${COLOR_DEFAULT_BOLD_ITALIC}Install npm packages for API and Front${COLOR_RESET}"
	@echo "${COLOR_DEFAULT}> ${COLOR_GREEN_BOLD}install-api${COLOR_DEFAULT}         |-----------------------------------------|  ${COLOR_DEFAULT_BOLD_ITALIC}Install npm packages for API${COLOR_RESET}"
	@echo "${COLOR_DEFAULT}> ${COLOR_GREEN_BOLD}install-front${COLOR_DEFAULT}       |-----------------------------------------|  ${COLOR_DEFAULT_BOLD_ITALIC}Install npm packages for Front${COLOR_RESET}"
	@echo "${COLOR_DEFAULT}> ${COLOR_GREEN_BOLD}uninstall${COLOR_DEFAULT}           |-----------------------------------------|  ${COLOR_DEFAULT_BOLD_ITALIC}Remove node modules for API and Front${COLOR_RESET}"
	@echo "${COLOR_DEFAULT}> ${COLOR_GREEN_BOLD}uninstall-api${COLOR_DEFAULT}       |-----------------------------------------|  ${COLOR_DEFAULT_BOLD_ITALIC}Remove node modules for API${COLOR_RESET}"
	@echo "${COLOR_DEFAULT}> ${COLOR_GREEN_BOLD}uninstall-front${COLOR_DEFAULT}     |-----------------------------------------|  ${COLOR_DEFAULT_BOLD_ITALIC}Remove node modules for Front${COLOR_RESET}"
	@echo
	@echo "${COLOR_YELLOW_BOLD_UNDERLINE}[Code]${COLOR_RESET}"
	@echo "${COLOR_DEFAULT}> ${COLOR_GREEN_BOLD}lint-all${COLOR_DEFAULT}            |-----------------------------------------|  ${COLOR_DEFAULT_BOLD_ITALIC}Lint all projects${COLOR_RESET}"
	@echo "${COLOR_DEFAULT}> ${COLOR_GREEN_BOLD}lint-all-api${COLOR_DEFAULT}        |-----------------------------------------|  ${COLOR_DEFAULT_BOLD_ITALIC}Lint whole api project${COLOR_RESET}"
	@echo "${COLOR_DEFAULT}> ${COLOR_GREEN_BOLD}lint-all-front${COLOR_DEFAULT}      |-----------------------------------------|  ${COLOR_DEFAULT_BOLD_ITALIC}Lint whole front project${COLOR_RESET}"
	@echo "${COLOR_DEFAULT}> ${COLOR_GREEN_BOLD}lint-fix-all${COLOR_DEFAULT}        |-----------------------------------------|  ${COLOR_DEFAULT_BOLD_ITALIC}Lint and fix all projects${COLOR_RESET}"
	@echo "${COLOR_DEFAULT}> ${COLOR_GREEN_BOLD}lint-fix-all-api${COLOR_DEFAULT}    |-----------------------------------------|  ${COLOR_DEFAULT_BOLD_ITALIC}Lint and fix whole api project${COLOR_RESET}"
	@echo "${COLOR_DEFAULT}> ${COLOR_GREEN_BOLD}lint-fix-all-front${COLOR_DEFAULT}  |-----------------------------------------|  ${COLOR_DEFAULT_BOLD_ITALIC}Lint and fix whole front project${COLOR_RESET}"

# ssh:
# 	echo password : CwABo9cI3aluyqcc
# 	ssh ubuntu@5.196.67.231

build:
	@docker-compose build

logs:
	@docker-compose logs -f db api react
	
logs-pgadmin:
	@docker-compose logs -f db api react pgadmin

run:
	@docker-compose down
	@docker-compose build
	@docker-compose up -d

restart:
	@docker-compose build
	@docker-compose up -d
	
restart-api:
	@docker-compose build api pgadmin
	@docker-compose restart api pgadmin
    	
restart-db:
	@docker-compose build db
	@docker-compose restart db

restart-front:
	@docker-compose build react
	@docker-compose restart react

up:
	@docker-compose up -d

down:
	@docker-compose down

init-pgadmin:
	@sudo rm -rf volumes/pgadmin
	@sudo mkdir -p volumes/pgadmin
	@sudo chmod 777 volumes/pgadmin
	
init-postgres:
	@sudo rm -rf volumes/postgres
	
init-volumes:
#Pgadmin
	@sudo rm -rf volumes/pgadmin
	@sudo mkdir -p volumes/pgadmin
	@sudo chmod 777 volumes/pgadmin
#Postgres
	@sudo rm -rf volumes/postgres

install:
	@npm i
	@cd api && npm i
	@cd front && npm i

install-api:
	@cd api && npm i

install-front:
	@cd front && npm i
	
uninstall:
	@rm -rf node_modules
	@cd api && rm -rf node_modules
	@cd front && rm -rf node_modules

uninstall-api:
	@cd api && rm -rf node_modules

uninstall-front:
	@cd front && rm -rf node_modules
	
lint-all:
	@npm run --prefix api lint-all
	@npm run --prefix front lint-all

lint-all-api:
	@npm run --prefix api lint-all

lint-all-front:
	@npm run --prefix front lint-all

lint-fix-all:
	@npm run --prefix api lint-fix-all
	@npm run --prefix front lint-fix-all

lint-fix-all-api:
	@npm run --prefix api lint-fix-all

lint-fix-all-front:
	@npm run --prefix front lint-fix-all
