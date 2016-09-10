export default () => {};

// Interface declaration for AboutItem
interface MenuItemInterface {
  title: string,
  state: string,
  access: string,
  hideLogged: boolean,
  params: any,
  items: MenuItemInterface[],
  open: boolean,
}
