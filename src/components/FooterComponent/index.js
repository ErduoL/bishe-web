import React from 'react';
import { withRouter, matchPath } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FOOTER_TEXT, headerBlacklist } from '../../common/constants';

export const FooterStyle = styled.div`
  height: 5vh;
  display: flex;
  justify-content: center;
  align-content: center;
`;

const FooterComponent = (props) => {
  const { location } = props;

  const inHeaderBlacklist = headerBlacklist.some((item) => !!matchPath(location.pathname, item));

  return (
    <>
      {!inHeaderBlacklist && (
      <FooterStyle>
        <div>
          { FOOTER_TEXT }
        </div>
      </FooterStyle>
      )}
    </>
  );
};

FooterComponent.propTypes = {
  location: PropTypes.object.isRequired,
};

export default withRouter(FooterComponent);
