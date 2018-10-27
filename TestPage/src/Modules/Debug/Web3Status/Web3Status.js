import React from 'react';
import * as Web3Wrapper from '../../Middleware/Web3Wrapper'

const Web3Status = () => {
  let web3 = await Web3Wrapper.getWeb3()
  const web3Available = web3 !== undefined ? 'yes' : 'no';
  var defaultAccountAvailable = 'no';
  Web3Wrapper.getDefaultAccount().then(account => { defaultAccountAvailable = account !== undefined ? 'yes' : 'no';});
  return (
    <div>
      <dl className="dl-horizontal text-light">
        <dt>web3 available</dt>
        <dd>{web3Available}</dd>
        <dt>account available</dt>
        <dd>{defaultAccountAvailable}</dd>
      </dl>
    </div>
  );
};

export default Web3Status
