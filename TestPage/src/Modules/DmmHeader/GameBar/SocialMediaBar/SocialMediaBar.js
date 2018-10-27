
import React from 'react'
import PropTypes from 'prop-types'
import Parser from 'html-react-parser'
import ReactTooltip from 'react-tooltip'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import canAccessContractData from '../../../AmberContractProvider/AmberContractInjector'
import HeaderBarElement from '../../../Layout/Header/HeaderBarElement/HeaderBarElement'
import HeaderBarButton from '../../../Layout/Header/HeaderBarButton/HeaderBarButton'
import canDispatchNotification from '../../../Layout/NotificationProvider/NotificationInjector'
import AmberSiteEventTypes from '../../../Layout/Types/AmberSiteEventTypes'

import "./SocialMediaBar.css"

import ContentJson from './SocialMediaBar.json'
import GlobalJson from '../../../../Global.json'


import DiscordLogo_White from '../../../../../media/images/icons/discord.svg'
import TelegramLogo from '../../../../../media/images/icons/telegram.svg'
import RedditLogo from '../../../../../media/images/icons/reddit.svg'
import HelpLogo from '../../../../../media/images/icons/help.svg'
import TwitterLogo from '../../../../../media/images/icons/twitter.svg'


const SocialMediaBar = (props) => {
  const {
    justification,
  } = props;
  const iconClasses = 'socialMediaBar-button-icon ';
  const tooltipDelay = 50;

  return (
    <HeaderBarElement justification={justification} id={ContentJson.socialMediaBarId}>
      <HeaderBarButton href={GlobalJson.redditLink} target="_blank" isEmphasized data-tip data-for={ContentJson.redditTooltipId}>
        <img src={RedditLogo} alt={ContentJson.alt} className={iconClasses}/>
      </HeaderBarButton>
      <ReactTooltip id={ContentJson.redditTooltipId} delayHide={tooltipDelay} effect='solid'>
        {Parser(ContentJson.redditToolTip)}
      </ReactTooltip>
      <HeaderBarButton href={GlobalJson.twitterLink} target="_blank" isEmphasized data-tip data-for={ContentJson.twitterTooltipId}>
        <img src={TwitterLogo} alt={ContentJson.alt} className={iconClasses}/>
      </HeaderBarButton>
      <ReactTooltip id={ContentJson.twitterTooltipId} delayHide={tooltipDelay} effect='solid'>
        {Parser(ContentJson.twitterToolTip)}
      </ReactTooltip>
      <HeaderBarButton href={GlobalJson.discordLink} target="_blank" isEmphasized data-tip data-for={ContentJson.discordTooltipId}>
        <img src={DiscordLogo_White} alt={ContentJson.alt} className={iconClasses}/>
      </HeaderBarButton>
      <ReactTooltip id={ContentJson.discordTooltipId} delayHide={tooltipDelay} effect='solid'>
        {Parser(ContentJson.discordToolTip)}
      </ReactTooltip>
      <HeaderBarButton href={GlobalJson.telegramLink} target="_blank" isEmphasized data-tip data-for={ContentJson.telegramTooltipId}>
        <img src={TelegramLogo} alt={ContentJson.alt} className={iconClasses}/>
      </HeaderBarButton>
      <ReactTooltip id={ContentJson.telegramTooltipId} delayHide={tooltipDelay} effect='solid'>
        {Parser(ContentJson.telegramToolTip)}
      </ReactTooltip>
      <HeaderBarButton href={GlobalJson.wikiLink} target="_blank" isEmphasized data-tip data-for={ContentJson.wikiTooltipId}>
        <img src={HelpLogo} alt={ContentJson.alt} className={iconClasses}/>
      </HeaderBarButton>
      <ReactTooltip id={ContentJson.wikiTooltipId} delayHide={tooltipDelay} effect='solid'>
        {Parser(ContentJson.wikiToolTip)}
      </ReactTooltip>
    </HeaderBarElement>
  );
}

SocialMediaBar.propTypes = {
  justification: PropTypes.string,
}

SocialMediaBar.defaultProps = {
  justification: 'start',
}

export default SocialMediaBar
