# Marsupial-Api

A api do projeto Marsupial, uma plataforma de estudos para o Enem

# Tratamento de erros

Todo erro vem com um código que pode ser utilizado para facilitar o tratamento no frontend, são eles:

# Estrutura de pastas

Este projeto se baseia em uma estrutura padronizada de divisão das pastas que permite uma melhor organização
e escalabilidade do mesmo.

**Veja como ela funciona**

-   Raiz do projeto
    -   src
        -   app
            -   controllers
            -   middlewares
            -   models
        -   database
        -   config
        -   routes
        -   services

### src

É onde deve ficar todo o código próprio da aplicação, para não confundir com outros códigos como dependências,
o package.json, .gitignore, etc.

### database

É onde obviamente ficam códigos relativos ao banco de dados como configurações, host, porta e a conexão com o mesmo

### config

Ficam configurações estáticas como o código hash da aplicação e quaisquer configurações úteis para a aplicação como um todo

### services

Aqui podem ficar alguns serviços extra-aplicação como códigos automatizadores e afins

### app

As pastas anteriores guardam configurações estáticas do app que não vão ser modificadas constantemente em tempo de
execução ou mesmo de desenvolvimento, a pasta app guarda arquivos dinâmicos que vão estar mais ativas durante o
desenvolvimento como os controllers, models e middlewares

# Padronizações no código

Com um pouco de testes relativos à estrutura do código, ficou decidido que seguir alguns padrões podem melhorar
a escalabilidade do projeto.

**Sobre eles:**

## Models

-   Nomes de schemas devem posuir a sintaxe NomeDoModelSchema (em camelCase e começando com letra maiúscula)
    ex: KnowledgeSchema
-   Models que tendem a possuir um volume grande de entradas devem ser paginados
-   Nomes de models sempre começando em maiúsculo e sendo exportados no fim do arquivo

ex de model:

```js
const mongoose = require("../../database");
const mongoosePaginate = require("mongoose-paginate");

const KnowledgeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    }
});

KnowledgeSchema.plugin(mongoosePaginate);

const Knowledge = mongoose.model("Knowledge", KnowledgeSchema);

module.exports = Knowledge;
```

## Controllers

-   O model desse controller deve ser importado de seu respectivo arquivo (Por isso models são sempre exportados no final)
-   Em controllers CRUD completos devem ser exportadas as funções index, show, store, update e destroy que
    correspondem respectivamente as funcionalidades: Exibir todos, exibir um, criar um, atualizar um e excluir um

ex de controller:

```js
const Section = require("../models/section");

module.exports = {
    async index(req, res) {
        const { page = 1, limit = 20 } = req.query;
        const section = await Section.paginate(
            {},
            { page: page, limit: limit }
        );

        return res.json(section);
    },
    async show(req, res) {
        const section = await Section.findById(req.params.id);

        return res.json(section);
    },
    async store(req, res) {
        const section = await Section.create(req.body);

        return res.json(section);
    },
    async update(req, res) {
        const section = await Section.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        return res.json(section);
    },
    async destroy(req, res) {
        await Section.findByIdAndRemove(req.params.id);

        return res.send();
    }
};
```

## Routes

-   Rotas prioritariamente não devem conter regras de negócio, essas devem ser importadas de outros arquivos
-   Rotas comuns devem exportar o seu router no final do arquivo
-   É ideal que elas executem métodos HTTP na sua raiz
    ex:
    ```js
    router.post("/", store); //Certo
    router.post("/lessons", store); //Errado
    ```
-   Como rotas comuns devem executar os métodos na raiz, elas devem possuir um index.js responsável por nomear rotas
-   O index.js não deve executar métodos HTTP, apenas usar router.use() para nomear rotas e importá-las de
    seus respectivos arquivos
    ex:
    ```js
    router.use("lessons", require("./lessons.js"));
    ```
-   O index.js também deve exportar um callback no final que usa como parâmetro um app do express (const app = express())
    pega esse app e executa app.use() passando o seu router
    ex:

    ```js
    module.exports = app => {
        app.use("/admin", router);
    };
    ```

    Note que ele também pode criar uma rota pai para as outras rotas, que nesse caso é admin
    (Caso não fosse necessário seria só usar '/')

    ex de route:

    ```js
    const express = require("express");
    const router = express.Router();

    router.use("/knowledges", require("./knowledges"));
    router.use("/subjects", require("./subjects"));
    router.use("/sections", require("./sections"));
    router.use("/lessons", require("./lessons"));
    router.use("/videos", require("./videos"));

    module.exports = app => {
        app.use("/admin", router);
    };
    ```

    ## Como importar rotas

    -   Basta fazer um require na pasta da rota e passar o app express como parâmetro
        ex:

        ```js
        const express = require("express");
        const app = express();

        require("./src/routes/admin")(app);

        //OU

        const express = require("express");
        const app = express();

        const admin = require("./src/routes/admin");
        admin(app);
        ```

        Notas:

        -   Repare que uma pasta está sendo importada, logo esta pasta deve conter um index.js de rota
        -   Um parâmetro está sendo passado porque o index.js dessa rota exporta um callback
        -   O app que está sendo passado deve ser único em toda a apliicação, então se o arquivo que
            importa a rota não for o index do projeto este app deve ser resgatado de lá e não criado um novo
