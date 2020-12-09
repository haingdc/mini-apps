import React from 'react';
import { LockBody, Spinner, ReleaseBody, Picture } from './styles/loading';

export default function Loading(props) {
  var { src, ...rest } = props;
  return (
    <Spinner {...rest}>
      <LockBody />
      <Picture src={`/images/users/${src}.png`} />
    </Spinner>
  );
}

Loading.ReleaseBody = function LoadingReleaseBody() {
  return <ReleaseBody />
}