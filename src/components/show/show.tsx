import React from 'react';
interface Props {
  title?: string;
  child: any;
}

export default (props: Props) => {
  return (
    <>
      <div
        style={{ margin: '5px', padding: '10px', border: '.5px dashed  pink' }}
      >
        {props.title ? <h2>{props.title}</h2> : null}
        {props.child}
      </div>
    </>
  );
};
