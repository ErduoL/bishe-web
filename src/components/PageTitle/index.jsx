import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const PageTitleWrapper = styled.div`
  display: flex;
  height: 40px;
  width: 100%;
  align-items: center;
  .page-title-content {
    margin-left: 22px;
    font-size: 16px;
    font-weight: bold;
  }
`;

const PageTitle = (props) => {
  const { title } = props;
  return (
    <PageTitleWrapper>
      <div className="page-title-content">{title}</div>
    </PageTitleWrapper>
  );
};

PageTitle.propTypes = {
  title: PropTypes.string,
};

PageTitle.defaultProps = {
  title: '',
};

export default PageTitle;
