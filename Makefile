COLOR_DEFAULT = \033[39;49m
COLOR_GREEN = \033[32;49;1m
COLOR_DEFAULT_BOLD_ITALIC = \033[39;49;1;3m
COLOR_RESET = \e[0m

default: 
	@echo "${COLOR_DEFAULT}> ${COLOR_GREEN}build${COLOR_DEFAULT}          |-----------------------------------------|  ${COLOR_DEFAULT_BOLD_ITALIC}Build Docker images${COLOR_RESET}"
	@echo "${COLOR_DEFAULT}> ${COLOR_GREEN}logs${COLOR_DEFAULT}           |-----------------------------------------|  ${COLOR_DEFAULT_BOLD_ITALIC}Show Logs${COLOR_RESET}"
	@echo "${COLOR_DEFAULT}> ${COLOR_GREEN}run${COLOR_DEFAULT}            |-----------------------------------------|  ${COLOR_DEFAULT_BOLD_ITALIC}Build and Run Docker images${COLOR_RESET}"
	@echo "${COLOR_DEFAULT}> ${COLOR_GREEN}up${COLOR_DEFAULT}             |-----------------------------------------|  ${COLOR_DEFAULT_BOLD_ITALIC}Up Docker images${COLOR_RESET}"
	@echo "${COLOR_DEFAULT}> ${COLOR_GREEN}down${COLOR_DEFAULT}           |-----------------------------------------|  ${COLOR_DEFAULT_BOLD_ITALIC}Down Docker images${COLOR_RESET}"
	@echo "${COLOR_DEFAULT}> ${COLOR_GREEN}init-pgadmin${COLOR_DEFAULT}   |-----------------------------------------|  ${COLOR_DEFAULT_BOLD_ITALIC}Init pgadmin folder${COLOR_RESET}"
	@echo "${COLOR_DEFAULT}> ${COLOR_GREEN}init-postgres${COLOR_DEFAULT}  |-----------------------------------------|  ${COLOR_DEFAULT_BOLD_ITALIC}Init postgres folder${COLOR_RESET}"
	@echo "${COLOR_DEFAULT}> ${COLOR_GREEN}init-volumes${COLOR_DEFAULT}   |-----------------------------------------|  ${COLOR_DEFAULT_BOLD_ITALIC}Init pgadmin AND postgres folder${COLOR_RESET}"

# ssh:
# 	echo password : CwABo9cI3aluyqcc
# 	ssh ubuntu@5.196.67.231

build:
	@docker-compose build

logs:
	@docker-compose logs -f db api pgadmin react

run:
	@docker-compose build
	@docker-compose up -d

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
