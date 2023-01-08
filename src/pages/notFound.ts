const notFoundPage = (): HTMLDivElement => {
  const div = document.createElement('div');
  div.classList.add('text-center', 'fs-1', 'w-bold', 'mt-4');
  div.textContent = 'PAGE NOT FOUND';
  return div;
};

export default notFoundPage;
