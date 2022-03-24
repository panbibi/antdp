import React from 'react';
import { Menu } from 'antd';
import Link from '../Menu/Link';
import { useLocation } from 'react-router-dom';
import { getDiffIndex, filterMenus, getTreeList } from './../utils';
import { useHistory } from 'umi';
const HeaderMenu = (props) => {
  const location = useLocation();
  const history = useHistory();

  const { selectedKey = '', routes, childMenus } = props;

  const getChildMenu = React.useMemo(() => {
    return getTreeList(childMenus || []).filter((item) => {
      return item.name && !item.hideInMenu;
    });
  }, [childMenus]);

  const NavMenuItems = React.useMemo(() => {
    if (!routes) {
      return [];
    }
    return routes
      .filter((item) => item.name && !item.hideInMenu)
      .sort((a, b) => a.order - b.order);
  }, [routes]);

  const getNavMenuItems = (menusData = []) => {
    if (!menusData) {
      return [];
    }
    return menusData
      .map((item) => {
        return (
          <Menu.Item key={item.path}>
            <Link path={item.path} name={item.name} icon={item.icon} />
          </Menu.Item>
        );
      })
      .filter((item) => item);
  };

  React.useEffect(() => {
    if (NavMenuItems.length && (getChildMenu || []).length) {
      const index = getDiffIndex(getChildMenu, location.pathname);
      if (index !== location.pathname && index) {
        history.push(index);
      }
    }
  }, [selectedKey]);

  return (
    <Menu
      theme="light"
      mode="horizontal"
      onOpenChange={() => {}}
      selectedKeys={[selectedKey]}
      defaultOpenKeys={[]}
      style={{ width: '100%' }}
    >
      {getNavMenuItems(NavMenuItems)}
    </Menu>
  );
};

export default HeaderMenu;
