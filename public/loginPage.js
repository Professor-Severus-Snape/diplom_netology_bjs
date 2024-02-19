"use strict";

const userForm = new UserForm();

// ---------- 1. Регистрация на сайте: ---------- 
userForm.loginFormCallback = data => {
  console.log(data); // NOTE: { login: "oleg@demo.ru", password: "demo" }
  ApiConnector.login( data, response => {
    console.log(response); // NOTE: <- проверка возвращаемого сервером ответа
    // {success: true, userId: 1} <- верные логин и пароль
    // {success: false, error: "Пользователь с логином и указанным паролем не найден"} <- неверные логин и пароль
    response.success ? location.reload() : userForm.setLoginErrorMessage(response.error);
  } );
};

// ----------  2. Авторизация на сайте: ---------- 
userForm.registerFormCallback = data => {
  console.log(data); // NOTE: как проверить ???
  ApiConnector.register( data, response => {
    console.log(response); // NOTE: как проверить ???
    response.success ? location.reload() : userForm.setRegisterErrorMessage(response.error);
  } );
};
