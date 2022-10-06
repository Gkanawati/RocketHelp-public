<h1 align="center">
  🔧📱 Rocket Help
</h1>

## :rocket: Sobre o projeto

Rocket Help é um App de chamados de Serviços, ideal para empresas de médio e grande porte, com uma equipe de T.I especialmente destinada à manutenção e assistência! É um grande facilitador no gerenciamento da equipe de prestação de serviços.

O App foi construído com React Native, uma biblioteca Javascript, utilizada para criação de aplicativos móveis de maneira nativa. O projeto foi desenvolvido para ambas as plataformas operacionais, tanto Android, quando IOS, em um único código base, e ainda sim mantendo um bom desempenho e responsividade.

A tela inicial do app mostra as Solicitações dividias filtradas de acordo com o seu respectivo status, "Em andamento" ou "Finalizados", que permite um controle e visualização melhor sobre as solicitações. Na página inicial é possível solicitar uma nova solicitação, clicando no botão que redirecionará para a tela de preenchimento das informações.

Clicando sobre cada solicitação é aberta uma tela com detalhes e status referentes à solicitação. Caso o Status seja de Andamento, o técnico é capaz de preencher o campo de solução e postar como concluída o serviço.

Para armazenamento em banco de dados e autenticação de usuários, foi utilizado o banco de dados não relacionais (firestore) do Firebase, plataforma de serviço do google para construção de back-end de aplicações, entre outras funcionalidades.

O App foi construído durante o evento Ignite Lab React-Native da Rocketseat, evento que durou uma semana de muito aprendizado com Typescript e mão na massa. 🚀🧑‍🚀

Para construção desse projeto também foram utilizadas bibliotecas muito interessantes para produtividade e estilização, como por exemplo o Native-Base, que é um biblioteca de componentes que permite uma maior produtividade e uma estilização completa e aperfeiçoada. Além disso, foi necessário a utilização do expo bare workflow, por conta da integração com o firebase, que não é possível ser realizada emulando o app via Expo go. 


## :bulb: Tecnologias usadas:

- `React Native`
- `Expo Bare Workflow`
- `Firebase`
- `Typescript`

## :gear: Como rodar o Projeto:


-Para instalar todas as bibliotecas usadas no projeto rode o comando:

```
npm install --only=prod --only=dev
```

-Para rodar o app:

```
npm run --android
```

## :computer: Telas

<div align='center' style="justify-content: center; align-items: center;">

<img src='https://user-images.githubusercontent.com/87530595/183063123-3ca92dd7-9c9c-4821-b6de-f8eba5c951f8.png' height='450' />

<img src='https://user-images.githubusercontent.com/87530595/183063109-e5e81aa5-33d4-4255-8e3e-4c7bc408e54e.png' height='450' />

<img src='https://user-images.githubusercontent.com/87530595/183063113-cc52f600-ab5c-4609-b946-10ec91b3d09b.png' height='450' />

<br>
<br>

<img src='https://user-images.githubusercontent.com/87530595/183063115-fe76e690-34ff-4a92-b91b-c976221e53e7.png' height='450' />

<img src='https://user-images.githubusercontent.com/87530595/183063117-759a460d-24e6-4147-9750-69ede284d718.png' height='450' />

<img src='https://user-images.githubusercontent.com/87530595/183063118-43e14e74-c436-4176-ac91-62ec3606f12f.png' height='450' />

</div>
