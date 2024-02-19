"use strict";

// ---------- 1. Выход из личного кабинета: ----------
const logoutButton = new LogoutButton();

logoutButton.action = () => {
  ApiConnector.logout(response => {
    // console.log(response); // NOTE: <- проверка возвращаемого сервером ответа
    // { success: true } // удачный ответ
    // { success: false, error: "Пользователь не авторизован"} // неудачный ответ
    if (response.success) {
      location.reload();
    }
  });
};

// ---------- 2. Получение информации о пользователе: ----------
ApiConnector.current(response => {
  console.log(response); // NOTE: <- проверка возвращаемого сервером ответа
  // Полученный response:
  // { success: true,
  //   data: { created_at: "2019-10-15",
  //           login: "oleg@demo.ru",
  //           password: "demo",
  //           id: 1,
  //           balance: {EUR: 20, NTC: 3000, RUB: 1000, USD: 20}
  //         }
  // }
  if (response.success) {
    ProfileWidget.showProfile(response.data);
  }
});

// ---------- 3. Получение текущих курсов валюты: ----------
const ratesBoard = new RatesBoard();

function getCurrencyRate() {
  ApiConnector.getStocks( response => {
    console.log(response); // NOTE: <- проверка возвращаемого сервером ответа
    // { success: true,
    //   data: { RUB_USD: 92.4102, RUB_EUR: 99.4889, RUB_NTC: 12.2421,
    //           USD_RUB: 0.01082, USD_EUR: 0.92885, USD_NTC: 7.54856,
    //           EUR_RUB: 0.01005, EUR_USD: 1.0766, EUR_NTC: 8.12678,
    //           NTC_RUB: 0.08169, NTC_USD: 0.13248, NTC_EUR: 0.12305,
    //         }
    // }
    if (response.success) {
      ratesBoard.clearTable();
      ratesBoard.fillTable(response.data);
    }
  });

  setTimeout(getCurrencyRate, 1000 * 60);
}

getCurrencyRate();

// ---------- 4. Операции с деньгами: ----------
