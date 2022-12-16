const app = document.querySelector('#app');

const historyResolver = (title, location) => {
  //this.event.preventDefault();

//  console.log('click');

  history.pushState({}, title, location);

  switch (location) {
    case '/users/':
      app.innerHTML = `
                <h1>${location}</h1>
                <p>Страница с пользователями</p>
            `;
      break;
    case '/basket/':
      app.innerHTML = `
                <h1>${location}</h1>
                <p>basket</p>
            `;
      break;
    case '/':
      app.innerHTML = `
                <h1>${location}</h1>
                <p>Главная страница</p>
            `;
      break;
    default:
      break;
  }
};

const appCon = () => {
  const nav = document.querySelector('.nav');

  nav.addEventListener('click', (e) => {
    e.preventDefault();
    const link = e.target.closest('.nav-link')
    const id = link.dataset.rout;
    console.log(id);

    switch (id) {
      case 'main':
        historyResolver('Главная', '/');
        break;

      case 'basket':
// прі перезагрузке слетают стілі

        historyResolver('Basket', '/basket/');
        break;

      // case 'users':
      //   historyResolver('Пользователи', '/users/');
      //   break;
      default:
        //historyResolver('Not found', '/')
        break;
    }
  });
};

export default appCon;
