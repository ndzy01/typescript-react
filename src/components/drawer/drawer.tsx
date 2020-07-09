import React, { forwardRef, useImperativeHandle } from 'react';
import { useBoolean } from 'ahooks';
import { Drawer } from 'antd';
import Show from '../show';
type Placement = 'right' | 'top' | 'bottom' | 'left' | undefined;
interface Props {
  title?: React.ReactNode;
  placement?: Placement;
  mask?: boolean | undefined;
  getContainer?: string | false | HTMLElement | undefined;
  destroyOnClose?: boolean | undefined;
  maskClosable?: boolean | undefined;
  childen?: React.ReactNode;
  _close?: () => {};
}

export default forwardRef(
  (
    props: Props,
    ref:
      | ((instance: unknown) => void)
      | React.RefObject<unknown>
      | null
      | undefined
  ) => {
    const [visible, { setTrue, setFalse }] = useBoolean(false);
    const showDrawer = () => {
      setTrue();
    };
    useImperativeHandle(ref, () => {
      return {
        showDrawer,
      };
    });
    const onClose = () => {
      props._close && props._close();
      setFalse();
    };
    return (
      <div>
        <Drawer
          title={props.title || 'drawer组件'}
          placement={props.placement || 'right'}
          closable={false}
          onClose={onClose}
          visible={visible}
          mask={props.mask || true}
          getContainer={props.getContainer || document.body}
          destroyOnClose={props.destroyOnClose || true}
          maskClosable={props.maskClosable || true}
        >
          {<Show child={props.childen && props.childen}></Show> || '暂无数据'}
        </Drawer>
      </div>
    );
  }
);
