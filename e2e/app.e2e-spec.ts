import { KumpletoPage } from './app.po';

describe('kumpleto App', () => {
  let page: KumpletoPage;

  beforeEach(() => {
    page = new KumpletoPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
