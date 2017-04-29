import { AxlProjectsLitePage } from './app.po';

describe('axl-projects-lite App', () => {
  let page: AxlProjectsLitePage;

  beforeEach(() => {
    page = new AxlProjectsLitePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
