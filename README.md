# kweb-simple-board
KWEB backend study project


## Execution Guides
### .env Configuration
프로젝트 최상위 폴더에 `.env` 파일을 생성하여 다음 항목들을 작성합니다.

`MODE`: "dev" for development OR "prod" for production
`DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASS`, `DB_NAME`: database configuration

#### Example .env
```
MODE=dev

PORT=3000

SESSION_SECRET=abcdef

DB_HOST=localhost
DB_PORT=3306
DB_USER=kwebuser
DB_PASS=kwebpw
DB_NAME=kweb_db
```
