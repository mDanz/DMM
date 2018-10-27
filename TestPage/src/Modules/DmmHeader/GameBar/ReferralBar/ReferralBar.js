import React from 'react'
import PropTypes from 'prop-types'
import Parser from 'html-react-parser'
import ReactTooltip from 'react-tooltip'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { canAccessReferralLink } from '../../../AmberContractProvider/AmberContractInjector'
import HeaderBarElement from '../../../Layout/Header/HeaderBarElement/HeaderBarElement'
import HeaderBarButton from '../../../Layout/Header/HeaderBarButton/HeaderBarButton'
import canDispatchNotification from '../../../Layout/NotificationProvider/NotificationInjector'
import AmberSiteEventTypes from '../../../Layout/Types/AmberSiteEventTypes'

import "./ReferralBar.css"

import ContentJson from './ReferralBar.json'

import Waypoint from '../../../../../media/images/icons/waypoint.svg'

const ReferralBar = (props) => {
  const {
    referralLink,
    justification,
    dispatchNotification,
  } = props;
  const iconClasses = 'referralBar-button-icon ';

  return (
    <HeaderBarElement justification={justification} id={ContentJson.refBarId}>
  		<CopyToClipboard text={referralLink}
                      onCopy={() => dispatchNotification(AmberSiteEventTypes.LinkCopiedEvent)}>
        <HeaderBarButton data-tip data-for={ContentJson.tooltipId}>
          <img src={Waypoint} alt={ContentJson.alt} className={iconClasses}/>
          <span>{Parser(ContentJson.referralText)}</span>
        </HeaderBarButton>
      </CopyToClipboard>
      <ReactTooltip id={ContentJson.tooltipId} delayHide={1000} effect='solid'>
        {Parser(ContentJson.referralToolTip) + referralLink}
      </ReactTooltip>
    </HeaderBarElement>
  );
}

ReferralBar.propTypes = {
  justification: PropTypes.string,
  referralLink: PropTypes.string.isRequired,
}

ReferralBar.defaultProps = {
  justification: 'start',
}

export default canAccessReferralLink(canDispatchNotification(ReferralBar))
