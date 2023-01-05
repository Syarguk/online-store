import { routes } from '../common/constans';
import { goToPath } from '../router/router';

class AsideButtons {
  btnContainer: HTMLDivElement;

  constructor() {
    this.btnContainer = document.createElement('div');
  }

  init(): HTMLDivElement {
    this.render();
    this.attachEvents();
    return this.btnContainer;
  }

  render() {
    this.btnContainer.classList.add('d-flex', 'justify-content-around', 'flex-wrap', 'buttons');
    this.btnContainer.innerHTML = `<button type="button" class="btn btn-primary" data-btn="reset">Reset filters</button>
    <button type="button" class="btn btn-primary" data-btn="copy">Copy link</button>`;
  }

  private attachEvents() {
    this.btnContainer?.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      const btnType = target?.dataset.btn;
      if (btnType) {
        switch (btnType) {
          case 'reset':
            goToPath(routes.main);
            break;

          case 'copy':
            target.style.backgroundColor = 'green';
            navigator.clipboard.writeText(window.location.href);
            setTimeout(() => { target.removeAttribute('style'); }, 2000);
            break;

          default:
            throw new Error(`unknow button type ${btnType}`);
            break;
        }
      }
    });
  }
}

export default AsideButtons;
