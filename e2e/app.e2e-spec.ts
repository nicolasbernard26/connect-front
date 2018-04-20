import { ConnectFrontEndPage } from './app.po';

describe('connect-front-end App', () => {
  let page: ConnectFrontEndPage;

  beforeEach(() => {
    page = new ConnectFrontEndPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
